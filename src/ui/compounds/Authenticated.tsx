import { sdk } from "lib/github-client";
import { useQuery } from "react-query";

import GithubCard from "ui/components/GithubCard";

const Authenticated: React.FC = () => {
  const { data, isLoading, error } = useQuery("viewer", () => sdk.viewer());

  if (isLoading) {
    return (
      <div className="max-w-xs border border-black rounded-lg p-4 bg-gray-800 text-white">
        Loading viewer...
      </div>
    );
  }

  if (error || !data) {
    if (error) {
      console.log("Something went wrong!", error);
    }

    return (
      <div className="max-w-xs border border-black rounded-lg p-4 bg-gray-800 text-white">
        Something went wrong!
      </div>
    );
  }

  return <GithubCard viewer={data.viewer} />;
};

export default Authenticated;
