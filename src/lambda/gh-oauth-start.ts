import { APIGatewayEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

import * as githubOAuth from "../lib/github-oauth-client";

export type GHOAuthHandler = Handler<APIGatewayEvent, APIGatewayProxyResult>;

const handler: GHOAuthHandler = async (event) => {
  try {
    const { code } = JSON.parse(event.body ?? "{}");

    if (!code) {
      return {
        statusCode: 400,
        body: "parameter 'code' is required.",
      };
    }

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

    throw new Error("Failed to process auth request.");
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Something went wrong: ${error.message}`,
      }),
    };
  }
};

export { handler };
