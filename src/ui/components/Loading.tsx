import { CgSpinner } from "react-icons/cg";

const Loading: React.FC = ({ children }) => {
  return (
    <div className="border border-black rounded-lg p-4 bg-gray-800 text-white my-2 flex place-items-center">
      <CgSpinner className="animate-spin mr-2" /> {children}
    </div>
  );
};

export default Loading;
