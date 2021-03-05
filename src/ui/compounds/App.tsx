import { useEffect } from "react";
import qs from "query-string";

import "./App.css";

import { GH_AUTHORIZE_ENDPOINT } from "lib/github-oauth";
import ntlFunctionsClient from "lib/ntl-functions-client";

function App() {
  useEffect(() => {
    async function task() {
      const { code } = qs.parse(window.location.search);

      if (code) {
        ntlFunctionsClient.post("/gh-oauth-start", { code });
      }
    }
    task();
  }, []);

  return (
    <section className="App h-screen w-full flex justify-center items-center">
      <a
        href={GH_AUTHORIZE_ENDPOINT}
        className="w-full max-w-md bg-gray-800 p-4 rounded-md text-white"
      >
        Sign in with Github
      </a>
    </section>
  );
}

export default App;
