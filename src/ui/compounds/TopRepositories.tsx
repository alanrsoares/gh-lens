import { Suspense, useState } from "react";
import { GoStar } from "react-icons/go";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "react-query";

import client from "lib/github-client";
import { isSome } from "lib/maybe";
import { padSingleDigit, unique } from "lib/utils";

import { useViewerPopularRepositoriesQuery } from "graphql/generated";

import RepoLanguages from "ui/components/RepoLanguages";
import Loading from "ui/components/Loading";

const TopRepositories: React.FC = () => {
  const { data } = useViewerPopularRepositoriesQuery(client, {
    topRepositories: 50,
  });

  const [selectedLanguage, selectLanguage] = useState("");
  const [filterText, setFilterText] = useState("");

  if (!data?.viewer?.repositories?.nodes) {
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

  const filteredByText = filterText
    ? repositories.filter((x) => x.name.includes(filterText))
    : repositories;

  const filteredByLanguage = !selectedLanguage
    ? filteredByText
    : filteredByText.filter((repo) =>
        repo.languages?.nodes?.some((lang) => lang?.name === selectedLanguage)
      );

  return (
    <section className="bg-white md:rounded-md p-2 mt-4">
      <div className="p-2 font-bold text-lg text-gray-600 flex justify-between">
        Top Repos
        <select
          className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={(e) => selectLanguage(e.target.value)}
          value={selectedLanguage}
        >
          <option value="">Pick a language</option>
          {langsWithCount.map(({ name, count }) => (
            <option value={name} key={name}>
              {name} ({padSingleDigit(count)})
            </option>
          ))}
        </select>
      </div>
      <div className="p-2">
        <input
          type="text"
          placeholder="filter by name"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <ul className="max-h-56 overflow-x-scroll">
        {filteredByLanguage.map((repo) => (
          <a
            href={`https://github.com/${data.viewer.login}/${repo.name}`}
            target="__blank"
            rel="noopener noreferrer"
            title={`Go to repository ${repo.name}`}
            key={repo.name}
          >
            <li className="p-2 bg-gray-100 mb-2 rounded-md">
              <div className="flex items-center justify-between">
                <div className="text-blue-800 font-bold">{repo.name}</div>
                <div className="ml-1 flex items-center text-white bg-gray-500 rounded-xl px-2">
                  {repo.stargazerCount} <GoStar className="text-yellow-400" />
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

export default function TopRepositoriesLoader() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <button onClick={() => resetErrorBoundary()}>Try again</button>
        </div>
      )}
    >
      <Suspense fallback={<Loading>Loading repositories...</Loading>}>
        <TopRepositories />
      </Suspense>
    </ErrorBoundary>
  );
}
