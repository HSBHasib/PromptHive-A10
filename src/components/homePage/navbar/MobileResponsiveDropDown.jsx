import Link from "next/link";
import { Button, Skeleton, Avatar } from "@heroui/react";

const MobileResponsiveDropDown = ({
  menuItems,
  isMenuOpen,
  setIsMenuOpen,
  pathName,
  isPending,
  user,
  isBlocked,
  handleSignOut,
}) => {
  return (
    <>
      {/* Background Blur Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/10 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Styled Modern Drop-down Panel */}
      <div
        className={`fixed top-16 right-0 w-[75%] sm:w-[50%] h-[calc(100vh-4rem)] bg-[#F5EBEB] border-l border-[#86707020] p-6 flex flex-col justify-between md:hidden shadow-2xl z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Top Section: Navigation Items */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold tracking-wider text-[#6B5656] uppercase mb-2">
            Navigation
          </p>

          {isPending ? (
            <>
              <div className="w-full h-12 flex items-center px-4 text-sm font-medium text-[#867070]">
                Home
              </div>
              <div className="w-full h-12 flex items-center px-4 text-sm font-medium text-[#867070]">
                All Prompts
              </div>
              <div className="w-full h-12 flex items-center px-4">
                <Skeleton className="h-6 w-24 rounded bg-[#86707020]" />
              </div>
            </>
          ) : (
            menuItems.map((item, idx) => (
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
            ))
          )}
        </div>

        {/* Bottom Section: Action Buttons */}
        <div className="flex flex-col gap-3 pb-8 border-t border-[#86707020] pt-6">
          {isPending ? (
            <div className="flex flex-col items-center justify-center gap-3 p-3 bg-[#86707010] rounded-2xl w-full">
              <Skeleton className="h-14 w-14 rounded-full bg-[#86707020]" />
              <Skeleton className="h-3.5 w-24 rounded bg-[#86707020]" />
              <Skeleton className="h-2.5 w-16 rounded bg-[#86707020]" />
              <Skeleton className="h-11 w-full rounded-xl bg-[#86707020] mt-1" />
            </div>
          ) : user ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center justify-center gap-2 p-3 bg-[#86707010] rounded-2xl">
                <Avatar className="w-14 h-14 border-2 border-[#867070] bg-[#E4D0D0] transition-all duration-300">
                  <Avatar.Image
                    className="object-cover"
                    alt={`${user?.name}-ProfileImg`}
                    src={user?.image}
                  />
                  <Avatar.Fallback className="text-[#867070] font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </Avatar.Fallback>
                </Avatar>

                <div className="text-center">
                  <p className="text-sm font-bold text-[#867070]">
                    {user?.name || "User"}
                  </p>
                  {isBlocked ? (
                    <span className="inline-block text-[9px] bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-full text-red-500 font-bold uppercase tracking-wider mt-1">
                      Account Blocked
                    </span>
                  ) : (
                    <span className="inline-block text-[9px] bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 rounded-full text-teal-600 font-bold uppercase tracking-wider mt-1">
                      {user?.role || "User"}
                    </span>
                  )}
                </div>
              </div>

              {/* 💡 LogOut Button */}
              <Button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="w-full h-11 bg-[#867070] hover:bg-[#705C5C] text-white font-semibold rounded-xl text-sm shadow-sm transition-colors active:scale-98"
              >
                LogOut
              </Button>
            </div>
          ) : (
            <>
              <Link
                className="w-full flex items-center justify-center h-11 font-semibold text-[#867070] hover:text-[#6B5656] hover:bg-[#86707010] text-sm rounded-xl transition-colors border border-[#86707040]"
                href="/auth/login"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="w-full flex items-center justify-center h-11 bg-[#867070] hover:bg-[#705C5C] text-white font-semibold rounded-xl text-sm shadow-sm transition-colors active:scale-98"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileResponsiveDropDown;
