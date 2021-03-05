import { IconType } from "react-icons/lib";

const CenteredWithIcon: React.FC<{ IconComponent: IconType }> = ({
  IconComponent,
  children,
}) => (
  <div className="flex items-center justify-center">
    <IconComponent className="mr-2" /> {children}
  </div>
);

export default CenteredWithIcon;
