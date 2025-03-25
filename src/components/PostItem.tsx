import { Link } from "react-router";
import { Post } from "./PostList";

interface Props {
  post: Post;
}

export const PostItem = ({ post }: Props) => {
  console.log(post);
  return (
    <Link to={`/post/${post.id}`} className="z-10">
      <div className="w-full h-76 bg-[rgb(24,27,32)] rounded-md p-5 text-white flex flex-col overflow-hidden transition-colors duration-300 border border-transparent hover:border-amber-300/30">
        {/* Header: Avatar and Title */}
        <div className="flex items-center gap-x-2 mb-5">
          {post.avatar_url ? (
            <img
              src={post.avatar_url}
              alt="User Avatar"
              className="w-[35px] h-[35px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[35px] h-[35px] rounded-full bg-amber-500/25" />
          )}
          <div className="text-amber-50 text-lg font-semibold">
            {post.title}
          </div>
        </div>

        {/* Image Banner */}
        <div className="flex-1">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full rounded-sm object-cover max-h-[150px] mx-auto"
          />
        </div>
        <div className="flex justify-around items-center">
          <span className="cursor-pointer h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg">
            ❤️ <span className="ml-2">{post.like_count ?? 0}</span>
          </span>
          <span className="cursor-pointer h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg">
            💬 <span className="ml-2">{post.comment_count ?? 0}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};
