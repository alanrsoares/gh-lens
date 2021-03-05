import axios from "axios";
import qs from "query-string";

export const GH_CLIENT_ID = "3c44cfed025aa0872b04";
export const GH_CLIENT_SECRET = "6c14d9384768c5d6c1f68d479879a1a1d84021c5";

export const GH_OAUTH_START_REDIRECT_URL = "http://localhost:8888";
export const GH_OAUTH_FINISH_REDIRECT_URL = "http://localhost:8888";

export const GH_OAUTH_URL = "https://github.com/login/oauth";

export const GH_SCOPES = [
  "user",
  "public_repo",
  "repo",
  "repo_deployment",
  "repo:status",
  "read:repo_hook",
  "read:org",
  "read:public_key",
  "read:gpg_key",
];

const params = qs.stringify({
  scope: GH_SCOPES.join(" "),
  client_id: GH_CLIENT_ID,
  redirect_uri: GH_OAUTH_START_REDIRECT_URL,
});

export const GH_AUTHORIZE_ENDPOINT = `${GH_OAUTH_URL}/authorize?${params}`;

export const GH_ACCESS_TOKEN_ENDPOINT = `${GH_OAUTH_URL}/access_token`;

axios.defaults.headers = {
  accept: "application/json",
};

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export async function exchangeCodeForAccessToken(code: string) {
  try {
    return await axios.post<AccessTokenResponse>(GH_ACCESS_TOKEN_ENDPOINT, {
      code,
      client_id: GH_CLIENT_ID,
      client_secret: GH_CLIENT_SECRET,
      redirect_uri: GH_OAUTH_FINISH_REDIRECT_URL,
    });
  } catch (error) {
    console.log(error.message);
  }
}
