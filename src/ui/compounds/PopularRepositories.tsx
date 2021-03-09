import { GoStar } from "react-icons/go";

import client from "lib/github-client";
import { isSome } from "lib/maybe";

import RepoLanguages from "ui/components/RepoLanguages";

import { useViewerPopularRepositoriesQuery } from "graphql/generated";

const PopularRepositories: React.FC = () => {
  const { data, isLoading, error } = useViewerPopularRepositoriesQuery(client, {
    topRepositories: 50,
  });

  if (isLoading) {
    return <div>Loading repositories...</div>;
  }

  if (!data || error) {
    return <div>Something went wrong...</div>;
  }

  if (!data.viewer.repositories.nodes) {
    return null;
  }

  const repositories = data.viewer.repositories.nodes
    .filter(isSome)
    .filter((x) => x.stargazerCount);

  return (
    <section className="bg-white rounded-md p-2 my-4">
      <div className="p-2 font-bold text-lg text-gray-600">
        Popular Repositories:
      </div>
      <ul className="h-56 overflow-x-scroll">
        {repositories.map((repo) => (
          <a
            href={`https://github.com/${data.viewer.login}/${repo.name}`}
            target="__blank"
            rel="noopener noreferrer"
            title={`Go to repository ${repo.name}`}
          >
            <li key={repo.name} className="p-2 bg-gray-100 mb-2 rounded-md">
              <div className="flex items-center justify-between">
                <div className="text-blue-800 font-bold">{repo.name}</div>
                <div className="ml-1 flex items-center text-white bg-gray-500 rounded-xl px-2">
                  {repo.stargazerCount} <GoStar className="text-yellow-400" />
                </div>
              </div>
              {isSome(repo.languages) && isSome(repo.languages.nodes) && (
                <RepoLanguages languages={repo.languages.nodes} />
              )}
            </li>
          </a>
        ))}
      </ul>
    </section>
  );
};

export default PopularRepositories;
