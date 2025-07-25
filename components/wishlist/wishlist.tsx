"use client";

import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Spinner } from "@nextui-org/spinner";
import { WishCard } from "./wish-card";
import { fetchWishes, WishSortKey } from "@/lib/api/tasks";
import { coreApiClient } from "@/api/core/_client";
import { Task } from "@/types/task";

export const Wishlist = () => {
  const [wishes, setWishes] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [votingTaskId, setVotingTaskId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<WishSortKey>('new');

  useEffect(() => {
    const loadWishes = async () => {
      setIsLoading(true);
      try {
        const response = await fetchWishes(selectedTab);
        setWishes(response.data);
      } catch (error) {
        console.error("Failed to fetch wishes:", error);
        // Here you would show a toast or error message to the user
      } finally {
        setIsLoading(false);
      }
    };

    loadWishes();
  }, [selectedTab]);

  const handleVote = async (taskId: number, voteType: 'up' | 'down') => {
    setVotingTaskId(taskId);
    
    // Optimistic UI Update
    setWishes(currentWishes => 
      currentWishes.map(wish => 
        wish.id === taskId ? { ...wish, upvotes: (wish.upvotes || 0) + 1 } : wish
      )
    );

    try {
      // Assuming a simplified vote call. In a real app, you'd get the current user's ID.
      // For now, let's hardcode a user_id for testing. The backend needs it.
      const MOCK_USER_ID = 1; // Replace with actual authenticated user ID
      
      if (voteType === 'up') {
        await coreApiClient.post('/tasks/upvotes', { task_id: taskId, user_id: MOCK_USER_ID });
      } else {
        // await coreApiClient.post('/tasks/downvotes', { task_id: taskId, user_id: MOCK_USER_ID });
      }
    } catch (error: any) {
      console.error("Vote failed:", error.response?.message);
      // Revert optimistic update on failure
      setWishes(currentWishes => 
        currentWishes.map(wish => 
          wish.id === taskId ? { ...wish, upvotes: (wish.upvotes || 0) - 1 } : wish
        )
      );
      // Show an error toast to the user
    } finally {
      setVotingTaskId(null);
    }
  };


  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex w-full flex-col items-start">
        <Tabs 
          aria-label="Wishlist Sorting" 
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as WishSortKey)}
          color="primary"
          variant="underlined"
        >
          <Tab key="new" title="New" />
          <Tab key="top" title="Top" />
        </Tabs>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner label="Loading wishes..." color="primary" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-6">
          {wishes.length > 0 ? (
            wishes.map((wish) => (
              <WishCard
                key={wish.id}
                id={wish.id}
                title={wish.title || "Untitled Wish"}
                description={wish.description}
                upvotes={wish.upvotes || 0}
                project={wish.project}
                onVote={handleVote}
                isVoting={votingTaskId === wish.id}
              />
            ))
          ) : (
             <div className="text-center text-default-500 py-16">
                <h3 className="text-xl font-semibold">No wishes yet!</h3>
                <p>Be the first to submit an idea to the community.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};