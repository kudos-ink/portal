import { getAllProjects } from "@/lib/api/projects";
import TaskForm from "./_components/form";

export default async function CreateTask() {
  const projects = await getAllProjects().catch((error) => {
    console.error("Error fetching all projects:", error);
    return [];
  });

  return (
    <>
      <TaskForm projects={projects} />
    </>
  );
}
