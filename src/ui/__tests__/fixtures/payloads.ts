import * as codegen from "graphql/generated";

export function createValidUseViewerQueryResponse(
  overwrite: Partial<codegen.ViewerQuery["viewer"]> = {}
) {
  return {
    viewer: {
      login: "login-asdf",
      name: "name-asdf",
      bio: "bio-asdf",
      email: "",
      location: "location-asdf",
      avatarUrl: "avatarUrl-asdf",
      websiteUrl: "websiteUrl-asdf",
      company: "company-asdf",
      followers: {
        totalCount: 10,
      },
      repositories: {
        totalCount: 10,
      },
      ...overwrite,
    },
  };
}

export function createValidViewerPopularRepositoriesResponse(
  overwrite: Partial<codegen.ViewerPopularRepositoriesQuery["viewer"]> = {}
) {
  return {
    viewer: {
      repositories: {
        nodes: [
          {
            languages: ["node", "html"],
            name: "my-repo-name",
            stargazerCount: 959595,
          },
        ],
      },
      ...overwrite,
    },
  };
}
