import { useQuery } from "@tanstack/react-query";
import { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";

interface Props {
  postId: number;
}

const fetchPostById = async (id: number): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as Post;
};

export const PostDetail = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) return <div>Loading posts...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-bold mb-6 text-amber-500">{data?.title}</h2>
      <div className="flex items-start gap-6">
        <div className="max-w-md self-start">
          <p className="text-amber-50 mb-3">{data?.content}</p>
          <p className="text-gray-500 text-sm">
            Posted on: {new Date(data!.created_at).toLocaleDateString()}
          </p>

          <LikeButton postId={postId} />
        </div>
        {data?.image_url && (
          <img
            src={data.image_url}
            alt={data?.title}
            className="rounded object-contain object-left w-1/2 max-h-96"
          />
        )}
      </div>

      <CommentSection postId={postId} />
    </div>
  );
};
