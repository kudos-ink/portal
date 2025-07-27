import { container } from "@/components/primitives";
import { fetchTaskById } from "@/lib/api/tasks";
import { fetchCommentsForTask } from "@/lib/api/comments";
import { WishDetailView } from "@/components/wishlist/wish-detail-view";
import { notFound } from "next/navigation";

interface WishDetailPageProps {
  params: {
    id: string;
  };
}

export default async function WishDetailPage({ params }: WishDetailPageProps) {
  const { id } = await params;
  const taskId = parseInt(id, 10);

  if (isNaN(taskId)) {
    notFound();
  }

  const [wish, comments] = await Promise.all([
    fetchTaskById(taskId),
    fetchCommentsForTask(taskId),
  ]);

  if (!wish) {
    notFound();
  }

  return (
    <section className={`pt-10 pb-24 ${container()}`}>
      <WishDetailView initialWish={wish} initialComments={comments} />
    </section>
  );
}