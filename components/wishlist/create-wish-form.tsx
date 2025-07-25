"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Textarea  } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";

import { createTask } from "@/lib/api/tasks";
import { Project } from "@/types/project";

interface CreateWishFormInputs {
  title: string;
  description: string;
  project_id: string; // react-hook-form select works best with strings
}

interface CreateWishFormProps {
  projects: Project[]; // Pass projects for the dropdown
  onSuccess: (newTask: any) => void;
  onClose: () => void;
}

export const CreateWishForm = ({ projects, onSuccess, onClose }: CreateWishFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWishFormInputs>({
    defaultValues: {
      title: "",
      description: "",
      project_id: "",
    },
  });

  const onSubmit = async (data: CreateWishFormInputs) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const payload = {
        title: data.title,
        description: data.description,
        type_: "wish" as const,
        project_id: data.project_id ? parseInt(data.project_id, 10) : undefined,
      };

      const newTask = await createTask(payload);
      onSuccess(newTask); // Call the success callback
    } catch (error: any) {
      console.error("Failed to create wish:", error);
      setServerError(error.response?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Controller
        name="title"
        control={control}
        rules={{
          required: "A title is required for your idea.",
          maxLength: { value: 120, message: "Title must be 120 characters or less." },
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Your Idea / Wish"
            placeholder="e.g., On-chain developer reputation system"
            variant="bordered"
            isInvalid={!!errors.title}
            errorMessage={errors.title?.message}
            autoFocus
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{
          maxLength: { value: 5000, message: "Description must be 5000 characters or less." },
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            label="Description (Optional)"
            placeholder="Describe your idea in more detail. What problem does it solve? How would it work?"
            variant="bordered"
            isInvalid={!!errors.description}
            errorMessage={errors.description?.message}
            minRows={5}
            maxRows={10}
          />
        )}
      />

      <Controller
        name="project_id"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Associate with a Project (Optional)"
            placeholder="Select a project"
            variant="bordered"
          >
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id.toString()}>
                {project.name}
              </SelectItem>
            ))}
          </Select>
        )}
      />
      
      {serverError && <p className="text-danger text-sm">{serverError}</p>}

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="flat" color="danger" onPress={onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" isLoading={isLoading}>
          Submit Idea
        </Button>
      </div>
    </form>
  );
};