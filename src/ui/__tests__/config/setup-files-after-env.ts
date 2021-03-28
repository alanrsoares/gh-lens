import "@testing-library/jest-dom/extend-expect";

// *****
// We are testing errors returned by "ErrorBoundary"
// But we don't want the logs on our tests
// *****
let suppressErrors: jest.SpyInstance;
beforeAll(() => {
  suppressErrors = jest.spyOn(console, "error");
});

afterAll(() => {
  suppressErrors.mockRestore();
});
