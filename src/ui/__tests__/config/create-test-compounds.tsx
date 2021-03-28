import * as React from "react";
import * as ReactQuery from "react-query";

import { createTest } from "./create-test";

import { Provider } from "state/app";

ReactQuery.setLogger({
  error() {},
  log() {},
  warn() {},
});

export function createTestCompounds(children: React.ReactElement) {
  let queryClient = new ReactQuery.QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        suspense: true,
      },
    },
  });

  let scenario = createTest(
    <Provider>
      <ReactQuery.QueryClientProvider client={queryClient}>
        {children}
      </ReactQuery.QueryClientProvider>
    </Provider>
  );

  return scenario;
}
