import { useViewerQuery } from "graphql/generated";

import client from "lib/github-client";
import GithubCard from "ui/components/GithubCard";
import Loading from "ui/components/Loading";
import TopRepositories from "./TopRepositories";

const Authenticated: React.FC = () => {
  const { data, isLoading, error } = useViewerQuery(client);

  if (isLoading) {
    return <Loading>Loading viewer...</Loading>;
  }

  if (error || !data) {
    if (error) {
      console.log("Something went wrong!", error);
    }

    return <Loading>Something went wrong!</Loading>;
  }

  return (
    <div>
      <GithubCard viewer={data.viewer} />
      <TopRepositories />
    </div>
  );
};

export default Authenticated;
