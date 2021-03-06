import { GraphQLClient as GraphQLClientBase } from "graphql-request";

class GraphQLClient extends GraphQLClientBase {
  private _isAuthenticated = false;

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  public setAuthorizationToken(token: string) {
    if (!token) {
      this._isAuthenticated = false;
      throw new Error("Token is required");
    }
    this.setHeader("Authorization", token ? `token ${token}` : "");
    this._isAuthenticated = true;
  }
}

const GH_BASE_URL = "https://api.github.com/graphql";

const client = new GraphQLClient(GH_BASE_URL, {
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

export default client;
