import axios from "axios";

import { AccessTokenResponse } from "lib/github-oauth";

const client = axios.create({
  baseURL: ".netlify/functions",
});

export default client;

export const startGithubOauth = (code: string) =>
  client.post<AccessTokenResponse>("/gh-oauth-start", { code });
