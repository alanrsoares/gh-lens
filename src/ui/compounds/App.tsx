import { useEffect } from "react";
import qs from "query-string";

import "./App.css";

import { GH_AUTHORIZE_ENDPOINT } from "lib/github-oauth";
import * as client from "lib/netlify-lambda-client";

import { useContainer } from "state/app";

import Authenticated from "./Authenticated";

function App() {
  const [state, actions] = useContainer();

  useEffect(() => {
    if (state.isAuthenticated) {
      return;
    }

    async function task() {
      const { code } = qs.parse(window.location.search);

      if (!code || typeof code !== "string") {
        return;
      }

      const response = await client.startGithubOauth(code);

      if (response.data.access_token) {
        actions.signIn(response.data.access_token);
      }
    }

    task();
  }, [actions, state.isAuthenticated]);

  return (
    <section className="App h-screen w-full flex justify-center items-center bg-gray-600">
      {state.isAuthenticated ? (
        <Authenticated />
      ) : (
        <a
          href={GH_AUTHORIZE_ENDPOINT}
          className="w-full max-w-xs bg-gray-800 p-4 rounded-md text-white"
        >
          Sign in with Github
        </a>
      )}
    </section>
  );
}

export default App;
