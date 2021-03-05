import { sdk } from "lib/github-client";
import { useQuery } from "react-query";

const Authenticated: React.FC = () => {
  const { data, isLoading } = useQuery("viewer", () => sdk.viewer());

  if (isLoading || !data) {
    return <div>Loading viewer...</div>;
  }

  return (
    <div className="max-w-xs border border-black rounded-lg p-4 bg-gray-800 text-white">
      <figure className="p-2">
        <img
          src={data.viewer.avatarUrl}
          alt="Github avatar"
          className="h-36 w-36 rounded-full mx-auto"
        />
      </figure>
      <h2 className="text-4xl py-2">{data.viewer.name}</h2>
      <div className="text-sm bg-gray-50 rounded-md text-gray-700 p-2">
        {data.viewer.bio}
      </div>
      <div className="py-2">@{data.viewer.login}</div>
      <div className="p-4">
        <div>{data.viewer.followers.totalCount} followers</div>
        <div>{data.viewer.repositories.totalCount} repositories</div>
      </div>
    </div>
  );
};

export default Authenticated;
