import axios from "axios";
import qs from "query-string";

const GH_CLIENT_ID = process.env.REACT_APP_GH_CLIENT_ID;

const GH_OAUTH_REDIRECT_URL = process.env.REACT_APP_GH_OAUTH_REDIRECT_URL;

const GH_OAUTH_URL = "https://github.com/login/oauth";

const GH_SCOPES = ["user", "public_repo", "repo"];

const params = qs.stringify({
  scope: GH_SCOPES.join(" "),
  client_id: GH_CLIENT_ID,
  redirect_uri: GH_OAUTH_REDIRECT_URL,
});

export const GH_AUTHORIZE_ENDPOINT = `${GH_OAUTH_URL}/authorize?${params}`;

const GH_ACCESS_TOKEN_ENDPOINT = `${GH_OAUTH_URL}/access_token`;

axios.defaults.headers = {
  accept: "application/json",
};

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export async function exchangeCodeForAccessToken(code: string, secret: string) {
  try {
    return await axios.post<AccessTokenResponse>(GH_ACCESS_TOKEN_ENDPOINT, {
      code,
      client_secret: secret,
      client_id: GH_CLIENT_ID,
      redirect_uri: GH_OAUTH_REDIRECT_URL,
    });
  } catch (error) {
    console.log(error.message);
  }
}
