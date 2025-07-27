"use client";

import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Spinner } from "@nextui-org/spinner";
import { WishCard } from "./wish-card";
import { fetchWishes, WishSortKey } from "@/lib/api/tasks";
import { coreApiClient } from "@/api/core/_client";
import { Task } from "@/types/task";
import { deleteVote } from "@/lib/api/tasks";
import { CreateWishButton } from "./create-wish-button";
import { Project } from "@/types/project";
import { CreateWishModal } from "./create-wish-modal";
import { useDisclosure } from "@nextui-org/modal";

type UserVoteState = Record<number, 'up' | 'down' | null>;

interface WishlistProps {
  projects: Project[]
}

export const Wishlist = ({ projects }: WishlistProps) => {
  const [wishes, setWishes] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [votingTaskId, setVotingTaskId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<WishSortKey>('new');
  const [userVotes, setUserVotes] = useState<UserVoteState>({});

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const loadWishes = async () => {
      setIsLoading(true);
      try {
        const response = await fetchWishes(selectedTab);
        console.log(response);
        setWishes(response.data);
        const initialVotes: UserVoteState = {};
        response.data.forEach(wish => {
          if (wish.user_vote) {
            initialVotes[wish.id] = wish.user_vote === 1 ? 'up' : 'down';
          }
        });
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

  const handleWishCreated = (newTask: Task) => {
    setWishes(prev => [newTask, ...prev]);
  };

  const handleVote = async (taskId: number, voteType: 'up' | 'down') => {
    if (votingTaskId) return;
    setVotingTaskId(taskId);
    
    const originalWishes = [...wishes];
    const originalUserVotes = { ...userVotes };
    const currentVote = userVotes[taskId];


    if (currentVote === voteType) {
      // Optimistically update the UI to retract the vote
      setWishes(currentWishes =>
          currentWishes.map(wish => {
              if (wish.id === taskId) {
                  const newUpvotes = (wish.upvotes || 0) - (voteType === 'up' ? 1 : 0);
                  const newDownvotes = (wish.downvotes || 0) - (voteType === 'down' ? 1 : 0);
                  return { ...wish, upvotes: newUpvotes, downvotes: newDownvotes };
              }
              return wish;
          })
      );
      setUserVotes(prev => ({ ...prev, [taskId]: null }));

      try {
          // Call the new DELETE endpoint
          await deleteVote(taskId);
      } catch (error) {
          console.error("Failed to delete vote:", error);
          // Revert state on failure
          setWishes(originalWishes);
          setUserVotes(originalUserVotes);
      } finally {
          setVotingTaskId(null);
      }
      return; // End execution here for retraction
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
    <>
   <div className="w-full max-w-4xl mx-auto mt-8 flex justify-center">
        <CreateWishButton onPress={onOpen} />
        <CreateWishModal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          projects={projects}
          onWishCreated={handleWishCreated}
        />
    </div>
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
    </>
  );
};