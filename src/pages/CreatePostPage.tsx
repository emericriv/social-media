import { CreatePost } from "../components/CreatePost";

export const CreatePostPage = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-amber-500">
        Create New Post
      </h2>
      <CreatePost />
    </div>
  );
};
