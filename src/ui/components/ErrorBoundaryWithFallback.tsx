import { ErrorBoundary } from "react-error-boundary";
import { HiXCircle } from "react-icons/hi";
import { useQueryErrorResetBoundary } from "react-query";

interface ErrorFallbackProps {
  error?: Error;
  onDismiss?: () => any;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = (props) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <HiXCircle />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Something went wrong!
          </h3>
          <div className="mt-2 text-sm text-red-700">{props.children}</div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                className="ml-3 bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                onClick={props.onDismiss}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {}

const ErrorBoundaryWithFallback: React.FC<Props> = (props) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary, error }) => (
        <ErrorFallback onDismiss={resetErrorBoundary}>
          {error.message}
        </ErrorFallback>
      )}
    >
      {props.children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWithFallback;
