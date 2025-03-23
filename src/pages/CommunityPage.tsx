import { useParams } from "react-router";
import { CommunityDisplay } from "../components/CommunityDisplay";

export const CommunityPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col items-center space-y-4">
      <CommunityDisplay communityId={Number(id)} />
    </div>
  );
};
