import { GoRepo, GoPerson } from "react-icons/go";
import { GiShadowFollower } from "react-icons/gi";

import { ViewerQuery } from "graphql/generated";

import CenteredWithIcon from "./CenteredWithIcon";
import { Fragment } from "react";

const toSlug = (x: string) => x.toLowerCase().split(" ").join("-");

const toRows = (x: string) =>
  x.split("\n").map((x) => (
    <Fragment key={toSlug(x)}>
      {x}
      <br />
    </Fragment>
  ));

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
    <div className="py-2">
      <h2 className="text-4xl text-center">{viewer.name}</h2>
      <CenteredWithIcon IconComponent={GoPerson}>
        <a
          href={`https://github.com/${viewer.login}`}
          target="__blank"
          rel="noreferrer"
          className="text-gray-300"
          title={`View '${viewer.name}' profile on github`}
        >
          @{viewer.login}
        </a>
      </CenteredWithIcon>
    </div>
    {viewer.bio && (
      <div className="text-sm bg-gray-50 rounded-md text-gray-700 p-2">
        <em>{toRows(viewer.bio)}</em>
      </div>
    )}
    <div className="p-2">
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
