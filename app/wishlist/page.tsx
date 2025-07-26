import { container, title, subtitle } from "@/components/primitives";
import { CreateWishButton } from "@/components/wishlist/create-wish-button";
import { Wishlist } from "@/components/wishlist/wishlist";
import { getAllProjects } from "@/lib/api/projects"; // Function to fetch all projects

export default async function WishlistPage() {
  // Fetch projects on the server to pass to the client component
  const projects = await getAllProjects().catch((error) => {
    console.error("Failed to fetch projects for wishlist form:", error);
    return []; // Return empty array on failure
  });

  return (
    <section className={`flex flex-col items-center text-center pt-10 pb-24 ${container()}`}>
      <h1 className={title()}>Community <span className="text-primary">Wishlist</span></h1>
      <h2 className={`mt-8 ${subtitle()}`}>
        Post, discuss, and vote on feature requests and project ideas to guide the ecosystem's development.
      </h2>
      <div className="mt-8">
        <CreateWishButton projects={projects} />
      </div>

      <div className="mt-16 w-full text-left">
        {/* This is where the list of wishes will be displayed */}
       <Wishlist />
      </div>
    </section>
  );
}