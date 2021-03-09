import { GoStar } from "react-icons/go";
import { darken } from "polished";

import client from "lib/github-client";

import {
  useViewerPopularRepositoriesQuery,
  Language,
  Maybe,
} from "graphql/generated";
import { isSome } from "lib/maybe";

const RepoLanguages: React.FC<{
  languages: Maybe<Pick<Language, "name" | "color">>[];
}> = ({ languages }) => {
  return (
    <div className="border-dotted border-gray-300 border-t-2 mt-2 pt-1">
      <ul className="flex">
        {languages.filter(isSome).map((node) => (
          <li
            key={node.name}
            className="rounded-xl bg-red-50 my-1 mr-1 px-2 text-white font-bold"
            style={{
              backgroundColor: darken(0.1, node.color || ""),
            }}
          >
            {node.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

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
