import { useQuery } from "@tanstack/react-query";
import { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";

interface Props {
  communityId: number;
}

interface PostWithCommunity extends Post {
  community: { name: string };
}

export const fetchCommunityPost = async (
  communityId: number
): Promise<PostWithCommunity[]> => {
  const { data, error } = await supabase.rpc("get_posts_with_counts", {
    community_id_param: communityId,
  });

  if (error) throw new Error(error.message);

  return data as PostWithCommunity[];
};

export const CommunityDisplay = ({ communityId }: Props) => {
  const { data, error, isLoading } = useQuery<PostWithCommunity[], Error>({
    queryKey: ["communityPost", communityId],
    queryFn: () => fetchCommunityPost(communityId),
  });

  if (isLoading) return <div>Loading communities...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-amber-500">
        {data && data.length > 0 && data[0].community.name} - Community Posts
      </h2>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((post, key) => (
            <PostItem post={post} key={key} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No posts in this community yet.</p>
      )}
    </div>
  );
};
