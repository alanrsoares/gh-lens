import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";

import { Provider } from "state/app";

setLogger({
  error() {},
  log() {},
  warn() {},
});

export function createTestCompounds(children: any) {
  let queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        suspense: true,
      },
    },
  });

  let screen = render(
    <Provider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
  return screen;
}
