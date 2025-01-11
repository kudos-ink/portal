"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Form } from "@nextui-org/form";
import { container } from "@/components/primitives";
import { Project } from "@/types/project";
import { getIconSrc } from "@/utils/icons";
import { Avatar } from "@nextui-org/avatar";

export default function TaskForm({ projects }: { projects: Project[] }) {
  const [submitted, setSubmitted] = React.useState<any>(null);
  const [errors, setErrors] = React.useState<any>({});

  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors: any = {};

    // Username validation
    if (data.title === "admin") {
      newErrors.title = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };

  return (
    <Form
      className={`${container()} max-w-[768px]`}
      validationBehavior="native"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <div>
        <div className="border-default-100 border-b-1 pb-2 mb-2">
          <h1
            id="guidelines"
            className="text-foreground text-2xl font-semibold"
          >
            Create a new task
          </h1>
          <span className="text-default-200">
            Submit a task manually for a project you maintain or{" "}
            <a className="text-primary underline" href="/import/github-task">
              import directly from a GitHub issue
            </a>{" "}
            for faster input.
          </span>
        </div>
        <span className="italic">
          Required fields are marked with an asterisk (*).
        </span>
      </div>
      <div className="flex flex-col gap-4 w-full mt-4">
        <div className="flex gap-4">
          <Select
            className="basis-1/4"
            isRequired
            items={projects}
            label="Project"
            labelPlacement="outside"
            name="project"
            placeholder="Select project"
            classNames={{
              value: "capitalize",
              trigger: "data-[hover=true]:bg-opacity-hover",
            }}
            renderValue={(items) =>
              items.map((item) => {
                if (item.data == null) {
                  return undefined;
                }
                const { avatar, id, name, slug } = item.data;
                const avatarSrc = getIconSrc(slug, avatar) ?? undefined;
                return (
                  <div key={id} className="flex items-center gap-2">
                    <Avatar
                      alt={`${item.data?.name}'s avatar`}
                      className="bg-foreground p-0.5 w-5 h-5"
                      classNames={{
                        img: "rounded-full",
                      }}
                      src={avatarSrc}
                    />
                    <span>{name}</span>
                  </div>
                );
              })
            }
          >
            {({ avatar, id, name, slug }) => {
              const avatarSrc = getIconSrc(slug, avatar) ?? undefined;
              return (
                <SelectItem
                  key={id}
                  value={slug}
                  startContent={
                    <Avatar
                      alt={`${name}'s avatar`}
                      className="bg-foreground p-0.5 w-5 h-5"
                      classNames={{
                        img: "rounded-full",
                      }}
                      src={avatarSrc}
                    />
                  }
                  classNames={{
                    title: "whitespace-break-spaces",
                  }}
                >
                  {name}
                </SelectItem>
              );
            }}
          </Select>

          <Input
            isRequired
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Please enter the task's title";
              }

              return errors.name;
            }}
            label="Title"
            labelPlacement="outside"
            name="title"
            placeholder="Enter task title"
            type="text"
            classNames={{
              base: "basis-3/4",
              inputWrapper: "data-[hover=true]:bg-opacity-hover",
            }}
          />
        </div>

        <Textarea
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return "Please enter the task's description";
            }
          }}
          classNames={{
            inputWrapper: "data-[hover=true]:bg-opacity-hover",
          }}
          label="Description"
          labelPlacement="outside"
          name="description"
          placeholder="What's this task about?"
        />

        <div className="flex gap-4 justify-end">
          <Button color="primary" type="submit">
            Submit
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}
