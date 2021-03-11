import {
  GoRepo,
  GoLocation,
  GoOrganization,
  GoBriefcase,
  GoGlobe,
} from "react-icons/go";

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
  <div className="md:border md:border-black md:rounded-lg p-4 bg-gray-800 text-white">
    <figure className="p-2">
      <img
        src={viewer.avatarUrl}
        alt="Github avatar"
        className="h-36 w-36 rounded-full mx-auto"
      />
    </figure>
    <div className="py-2 text-center">
      <h2 className="text-4xl text-center">{viewer.name}</h2>
      <a
        className="text-gray-300 text-sm"
        href={`https://github.com/${viewer.login}`}
        target="__blank"
        rel="noreferrer noopener"
        title={`View ${viewer.name}'s profile on Github`}
      >
        {viewer.login}
      </a>
    </div>
    {viewer.bio && (
      <div className="text-sm bg-gray-50 rounded-md text-gray-700 p-2">
        <em>{toRows(viewer.bio)}</em>
      </div>
    )}
    <div className="p-2">
      {viewer.websiteUrl && (
        <CenteredWithIcon IconComponent={GoGlobe}>
          <a
            href={viewer.websiteUrl}
            target="__blank"
            rel="noreferrer noopener"
            title={`Go to '${viewer.name}' website`}
          >
            {viewer.websiteUrl}
          </a>
        </CenteredWithIcon>
      )}
      {viewer.company && (
        <CenteredWithIcon IconComponent={GoBriefcase}>
          {viewer.company}
        </CenteredWithIcon>
      )}
      {viewer.location && (
        <CenteredWithIcon IconComponent={GoLocation}>
          {viewer.location}
        </CenteredWithIcon>
      )}
      {viewer.followers.totalCount && (
        <CenteredWithIcon IconComponent={GoOrganization}>
          {viewer.followers.totalCount} followers
        </CenteredWithIcon>
      )}
      <div className="flex justify-between">
        <CenteredWithIcon IconComponent={GoRepo}>
          {viewer.repositories.totalCount} repositories
        </CenteredWithIcon>
        <CenteredWithIcon IconComponent={GoOrganization}>
          {viewer.followers.totalCount} followers
        </CenteredWithIcon>
      </div>
    </div>
  </div>
);

export default GithubCard;
