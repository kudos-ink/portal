"use client";

import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Spinner } from "@nextui-org/spinner";
import { WishCard } from "./wish-card";
import { fetchWishes, WishSortKey } from "@/lib/api/tasks";
import { coreApiClient } from "@/api/core/_client";
import { Task } from "@/types/task";

type UserVoteState = Record<number, 'up' | 'down' | null>;

export const Wishlist = () => {
  const [wishes, setWishes] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [votingTaskId, setVotingTaskId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<WishSortKey>('new');
  const [userVotes, setUserVotes] = useState<UserVoteState>({});

  useEffect(() => {
    const loadWishes = async () => {
      setIsLoading(true);
      try {
        const response = await fetchWishes(selectedTab);
        setWishes(response.data);
        const initialVotes: UserVoteState = {};
        response.data.forEach(wish => {
          if (wish.user_vote) {
            initialVotes[wish.id] = wish.user_vote === 1 ? 'up' : 'down';
          }
        });
        console.log(initialVotes);
        setUserVotes(initialVotes);
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
    if (votingTaskId) return;
    setVotingTaskId(taskId);
    
    const originalWishes = [...wishes];
    const originalUserVotes = { ...userVotes };
    const currentVote = userVotes[taskId];

    // If the user clicks the same vote button, we'll treat it as a retract action in the future.
    // For now, it does nothing, which is the correct behavior with the current backend.
    if (currentVote === voteType) {
        setVotingTaskId(null);
        return;
    }

    // Optimistic UI Update
    setWishes(currentWishes => 
      currentWishes.map(wish => {
        if (wish.id === taskId) {
            let newUpvotes = wish.upvotes || 0;
            let newDownvotes = wish.downvotes || 0;

            if (currentVote === 'down' && voteType === 'up') { newDownvotes--; newUpvotes++; } 
            else if (currentVote === 'up' && voteType === 'down') { newUpvotes--; newDownvotes++; }
            else { if (voteType === 'up') newUpvotes++; if (voteType === 'down') newDownvotes++; }
            
            return { ...wish, upvotes: newUpvotes, downvotes: newDownvotes };
        }
        return wish;
      })
    );
    
    // Update the user's vote state using the functional update form for safety.
    setUserVotes(prevVotes => ({
      ...prevVotes,
      [taskId]: voteType, 
    }));

    try {
      const endpoint = voteType === 'up' ? '/tasks/upvotes' : '/tasks/downvotes';
      await coreApiClient.post(endpoint, { task_id: taskId });
    } catch (error) {
      console.error("Vote failed:", error);
      // Revert state on failure
      setWishes(originalWishes);
      setUserVotes(originalUserVotes);
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
                downvotes={wish.downvotes || 0}
                project={wish.project}
                onVote={handleVote}
                isVoting={votingTaskId === wish.id}
                userVote={userVotes[wish.id] || null}
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