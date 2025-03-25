import { PostList } from "../components/PostList";

export const Home = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-amber-500">Recent Posts</h2>
      <div>
        <PostList />
      </div>
    </div>
  );
};
