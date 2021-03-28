import { createTestCompounds } from "../config/create-test-compounds";

import App from "../../pages/App";

test("renders github sign in correctly", () => {
  const { screen } = createTestCompounds(<App />);
  expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
});
