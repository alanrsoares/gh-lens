import { GoRepo, GoPerson } from "react-icons/go";
import { GiShadowFollower } from "react-icons/gi";

import { ViewerQuery } from "generated/graphql";

import CenteredWithIcon from "./CenteredWithIcon";

interface Props {
  viewer: ViewerQuery["viewer"];
}

const GithubCard: React.FC<Props> = ({ viewer }) => (
  <div className="max-w-xs border border-black rounded-lg p-4 bg-gray-800 text-white">
    <figure className="p-2">
      <img
        src={viewer.avatarUrl}
        alt="Github avatar"
        className="h-36 w-36 rounded-full mx-auto"
      />
    </figure>
    <h2 className="text-4xl py-2">{viewer.name}</h2>
    <div className="text-sm bg-gray-50 rounded-md text-gray-700 p-2">
      {viewer.bio}
    </div>
    <div className="py-2">
      <CenteredWithIcon IconComponent={GoPerson}>
        @{viewer.login}
      </CenteredWithIcon>
    </div>
    <div className="p-4">
      <CenteredWithIcon IconComponent={GiShadowFollower}>
        {viewer.followers.totalCount} followers
      </CenteredWithIcon>
      <CenteredWithIcon IconComponent={GoRepo}>
        {viewer.repositories.totalCount} repositories
      </CenteredWithIcon>
    </div>
  </div>
);

export default GithubCard;
