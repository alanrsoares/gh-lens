import { useState } from "react";
import { GoStar } from "react-icons/go";

import client from "lib/github-client";
import { isSome } from "lib/maybe";
import { padSingleDigit, unique } from "lib/utils";

import RepoLanguages from "ui/components/RepoLanguages";

import { useViewerPopularRepositoriesQuery } from "graphql/generated";

const TopRepositories: React.FC = () => {
  const { data, isLoading, error } = useViewerPopularRepositoriesQuery(client, {
    topRepositories: 50,
  });

  const [selectedLanguage, selectLanguage] = useState("");

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

  const uniqueLanguages = unique(
    repositories.flatMap((repo) =>
      (repo.languages?.nodes ?? []).filter(isSome).map((node) => node.name)
    )
  );

  const getReposByLanguage = (language: string) =>
    repositories.filter((repo) =>
      repo.languages?.nodes?.some((lang) => lang?.name === language)
    );

  const repoCountByLanguage = uniqueLanguages.reduce<Record<string, number>>(
    (acc, lang) => ({
      ...acc,
      [lang]: getReposByLanguage(lang).length,
    }),
    {}
  );

  const langsWithCount = uniqueLanguages
    .map((name) => ({
      name,
      count: repoCountByLanguage[name],
    }))
    // sort by count descending
    .sort((a, b) => b.count - a.count);

  const filteredRepos = selectedLanguage
    ? repositories.filter((repo) =>
        repo.languages?.nodes?.some((lang) => lang?.name === selectedLanguage)
      )
    : repositories;

  return (
    <section className="bg-white rounded-md p-2 my-4">
      <div className="p-2 font-bold text-lg text-gray-600 flex justify-between">
        Top Repos
        <select
          onChange={(e) => selectLanguage(e.target.value)}
          value={selectedLanguage}
        >
          <option value="">Select</option>
          {langsWithCount.map(({ name, count }) => (
            <option value={name} key={name}>
              {name} ({padSingleDigit(count)})
            </option>
          ))}
        </select>
      </div>
      <ul className="h-56 overflow-x-scroll">
        {filteredRepos.map((repo) => (
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
                  {padSingleDigit(repo.stargazerCount)}{" "}
                  <GoStar className="text-yellow-400" />
                </div>
              </div>
              {isSome(repo.languages) && isSome(repo.languages.nodes) && (
                <RepoLanguages
                  languages={repo.languages.nodes}
                  onLanguageClick={selectLanguage}
                />
              )}
            </li>
          </a>
        ))}
      </ul>
    </section>
  );
};

export default TopRepositories;
