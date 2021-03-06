import { APIGatewayEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

import * as githubOAuth from "../lib/github-oauth";

export type GHOAuthHandler = Handler<APIGatewayEvent, APIGatewayProxyResult>;

const handler: GHOAuthHandler = async (event) => {
  try {
    const { code } = JSON.parse(event.body ?? "{}");

    if (code) {
      const result = await githubOAuth.exchangeCodeForAccessToken(
        code,
        process.env.GH_CLIENT_SECRET || ""
      );

      if (result) {
        return {
          statusCode: 200,
          body: JSON.stringify(result.data),
        };
      }
    }

    return {
      statusCode: 400,
      body: "parameter 'code' is required.",
    };
  } catch (error) {}

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World", event }),
  };
};

export { handler };
