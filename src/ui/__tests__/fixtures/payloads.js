export function createValidUseViewerQueryResponse() {
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
    },
  };
}
