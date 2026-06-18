import Link from "next/link";

const MobileResponsiveDropDown = ({ menuItems, isMenuOpen, setIsMenuOpen, pathName }) => {
  return (
    <>
      {/* Background Blur Overlay for Modern Layout Style */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 top-16 bg-black/10 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Styled Modern Drop-down Panel */}
      <div 
        className={`fixed top-16 right-0 w-[75%] sm:w-[50%] h-[calc(100vh-4rem)] bg-[#F5EBEB] border-l border-[#86707020] p-6 flex flex-col justify-between md:hidden shadow-2xl z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Top Section: Navigation Items */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold tracking-wider text-[#6B5656] uppercase mb-2">Navigation</p>
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              className={`w-full text-[#867070] flex items-center h-12 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathName === item.href 
                  ? "bg-[#86707010]" 
                  : "hover:bg-[#86707010] hover:text-[#6B5656]"
              }`}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.link}
            </Link>
          ))}
        </div>

        {/* Bottom Section: Action Buttons */}
        <div className="flex flex-col gap-3 pb-8 border-t border-[#86707020] pt-6">
          <Link
            className="w-full flex items-center justify-center h-11 font-semibold text-[#867070] hover:text-[#6B5656] hover:bg-[#86707010] text-sm rounded-xl transition-colors border border-[#86707040]"
            href="/auth/login"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="w-full h-11 bg-[#867070] hover:bg-[#705C5C] text-white font-semibold rounded-xl text-sm shadow-sm transition-colors active:scale-98"
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileResponsiveDropDown;
