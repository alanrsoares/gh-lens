import { darken } from "polished";

import { Language, Maybe } from "graphql/generated";
import { isSome } from "lib/maybe";

interface Props {
  languages: Maybe<Pick<Language, "name" | "color">>[];
  onLanguageClick?: (lang: string) => void;
}

const RepoLanguages: React.FC<Props> = ({
  languages,
  onLanguageClick = () => {},
}) => {
  return (
    <div className="border-dotted border-gray-300 border-t-2 mt-2 pt-1">
      <ul className="flex">
        {languages.filter(isSome).map((node) => (
          <li
            key={node.name}
            className="rounded-xl bg-red-50 my-1 mr-1 px-2 text-white font-bold"
            style={{
              backgroundColor: darken(0.1, node.color || ""),
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onLanguageClick(node.name);
            }}
          >
            {node.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoLanguages;
