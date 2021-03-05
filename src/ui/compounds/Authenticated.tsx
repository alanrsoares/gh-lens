import { sdk } from "lib/github-client";
import { useQuery } from "react-query";

const Authenticated: React.FC = () => {
  const { data, isLoading } = useQuery("viewer", () => sdk.viewer());

  if (isLoading) {
    return <div>Loading viewer...</div>;
  }

  return <div>{data?.viewer.name}</div>;
};

export default Authenticated;
