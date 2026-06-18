import { HiMiniBars3, HiXMark } from "react-icons/hi2";

const MobileMenuIcon = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="md:hidden text-[#867070] hover:bg-[#86707015] p-2 rounded-lg transition-colors"
      aria-label="Toggle menu"
    >
      {isMenuOpen ? (
        <HiXMark className="w-6 h-6" />
      ) : (
        <HiMiniBars3 className="w-6 h-6" />
      )}
    </button>
  );
};

export default MobileMenuIcon;
