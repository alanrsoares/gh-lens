import Authenticated from "../../compounds/Authenticated";

// *****
// Test Utilities
// *****
import { createTestCompounds } from "../config/create-test-compounds";
import {
  createValidUseViewerQueryResponse,
  createValidViewerPopularRepositoriesResponse,
} from "../fixtures/payloads";

// *****
// GitHub Client Request Mock
// *****
import client from "lib/github-client";
jest.mock("lib/github-client");

describe("<Authenticated />", () => {
  let clientRequestMock = client.request as jest.Mock;

  afterEach(() => {
    clientRequestMock.mockReset();
  });

  test("loading => error boundary", async () => {
    clientRequestMock.mockImplementation(() => {
      return Promise.reject();
    });

    let { screen, waitForElementToBeRemoved } = createTestCompounds(
      <Authenticated />
    );
    expect(screen.queryByText("Loading viewer...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading viewer...")
    );

    expect(screen.queryByText("Something went wrong!")).toBeInTheDocument();
    expect(
      screen.container.querySelector(`[class="rounded-md bg-red-50 p-4"]`)
    ).toBeInTheDocument();
  });

  test("loading => data eq undefined", async () => {
    clientRequestMock.mockImplementation(() => {
      return Promise.resolve();
    });

    let { screen, waitForElementToBeRemoved } = createTestCompounds(
      <Authenticated />
    );
    expect(screen.queryByText("Loading viewer...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading viewer...")
    );

    expect(screen.queryByText("Loading viewer...")).not.toBeInTheDocument();
    expect(screen.container.innerHTML).toBe("");
  });

  test("loading => data => github card", async () => {
    clientRequestMock.mockImplementation(() => {
      return Promise.resolve(createValidUseViewerQueryResponse());
    });

    let { screen, waitForElementToBeRemoved } = createTestCompounds(
      <Authenticated />
    );
    expect(screen.queryByText("Loading viewer...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading viewer...")
    );

    expect(screen.queryByText("Loading viewer...")).not.toBeInTheDocument();
    expect(screen.queryByText("login-asdf")).toBeInTheDocument();
    expect(screen.queryByText("name-asdf")).toBeInTheDocument();
    expect(screen.queryByText("bio-asdf")).toBeInTheDocument();

    expect(screen.queryByText("location-asdf")).toBeInTheDocument();
    expect(screen.queryByText("websiteUrl-asdf")).toBeInTheDocument();
    expect(
      screen.container.querySelector(`img[src="avatarUrl-asdf"]`)
    ).toBeInTheDocument();
    expect(screen.queryByText("company-asdf")).toBeInTheDocument();
    expect(screen.queryByText("10 followers")).toBeInTheDocument();
    expect(screen.queryByText("10 repositories")).toBeInTheDocument();
    expect(screen.queryByText("Loading repositories...")).toBeInTheDocument();
  });

  test("loading => data => failed to load top repositories", async () => {
    clientRequestMock.mockImplementation((params) => {
      if (params.includes("viewerPopularRepositories")) {
        return Promise.reject();
      }
      return Promise.resolve(createValidUseViewerQueryResponse());
    });

    let { screen, waitForElementToBeRemoved } = createTestCompounds(
      <Authenticated />
    );
    expect(screen.queryByText("Loading viewer...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading viewer...")
    );

    expect(screen.queryByText("Loading viewer...")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading repositories...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading repositories...")
    );

    expect(
      screen.queryByText("Loading repositories...")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("There was an error!")).toBeInTheDocument();
    expect(screen.queryByText("Try again")).toBeInTheDocument();
  });

  test("loading => data => no top repositories to display", async () => {
    clientRequestMock.mockImplementation((params) => {
      if (params.includes("viewerPopularRepositories")) {
        return Promise.resolve(
          createValidViewerPopularRepositoriesResponse({
            repositories: { nodes: undefined },
          })
        );
      }

      return Promise.resolve(createValidUseViewerQueryResponse());
    });

    let { screen, waitForElementToBeRemoved } = createTestCompounds(
      <Authenticated />
    );
    expect(screen.queryByText("Loading viewer...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading viewer...")
    );

    expect(screen.queryByText("Loading viewer...")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading repositories...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading repositories...")
    );

    expect(
      screen.queryByText("Loading repositories...")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Something went wrong...")
    ).not.toBeInTheDocument();
  });

  test("loading => data => show top repositories", async () => {
    clientRequestMock.mockImplementation((params) => {
      if (params.includes("viewerPopularRepositories")) {
        return Promise.resolve(createValidViewerPopularRepositoriesResponse());
      }

      return Promise.resolve(createValidUseViewerQueryResponse());
    });

    let { screen, waitForElementToBeRemoved } = createTestCompounds(
      <Authenticated />
    );
    expect(screen.queryByText("Loading viewer...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading viewer...")
    );

    expect(screen.queryByText("Loading viewer...")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading repositories...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading repositories...")
    );

    expect(
      screen.queryByText("Loading repositories...")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Something went wrong...")
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Top Repos")).toBeInTheDocument();
    expect(screen.queryByText("Pick a language")).toBeInTheDocument();
    expect(screen.queryByText("my-repo-name")).toBeInTheDocument();
    expect(screen.queryByText("959595")).toBeInTheDocument();
  });
});
