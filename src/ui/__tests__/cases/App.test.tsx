import { createTestCompounds } from "../config/create-test-compounds";

import App from "../../pages/App";

test("renders github sign in correctly", () => {
  let { screen } = createTestCompounds(<App />);
  expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
});
