import * as React from "react";
import * as ReactTesting from "@testing-library/react";

export function createTest(children: React.ReactElement) {
  let screen = ReactTesting.render(children);

  return {
    screen,
    waitForElementToBeRemoved: ReactTesting.waitForElementToBeRemoved,
    waitFor: ReactTesting.waitFor,
  };
}
