import { Suspense } from "react";

import { useViewerQuery } from "graphql/generated";

import client from "lib/github-client";

import GithubCard from "ui/components/GithubCard";
import Loading from "ui/components/Loading";
import ErrorBoundaryWithFallback from "ui/components/ErrorBoundaryWithFallback";

import TopRepositories from "./TopRepositories";

const Authenticated: React.FC = () => {
  const { data } = useViewerQuery(client);

  if (!data) {
    return null;
  }

  return (
    <div className="max-w-md">
      <GithubCard viewer={data.viewer} />
      <TopRepositories />
    </div>
  );
};

export default function AuthenticatedLoader() {
  return (
    <ErrorBoundaryWithFallback>
      <Suspense fallback={<Loading>Loading viewer...</Loading>}>
        <Authenticated />
      </Suspense>
    </ErrorBoundaryWithFallback>
  );
}
