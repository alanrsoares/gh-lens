import { useViewerQuery } from "graphql/generated";

import client from "lib/github-client";
import GithubCard from "ui/components/GithubCard";
import TopRepositories from "./TopRepositories";

const Authenticated: React.FC = () => {
  const { data, isLoading, error } = useViewerQuery(client);

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

  return (
    <div>
      <GithubCard viewer={data.viewer} />
      <TopRepositories />
    </div>
  );
};

export default Authenticated;
