import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon, MenuIcon, UsersIcon, HomeIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();

  const isChatPage = location.pathname.startsWith("/chat");
  const isNotificationsPage = location.pathname === "/notifications";
  const isMobile = window.innerWidth <= 768; // Assuming 768px is the mobile breakpoint

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* MOBILE DROPDOWN MENU (VISIBLE ON SMALL SCREENS) */}
          {isMobile && (
            <div className="dropdown dropdown-bottom dropdown-start">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <MenuIcon className="h-6 w-6" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu w-52 rounded-box bg-base-100 p-2 shadow z-10">
                <li>
                  <Link to="/">
                    <HomeIcon className="w-5 h-5" />
                    Home
                  </Link>
                </li>
                {/* <li>
                  <Link to="/friends">
                    <UsersIcon className="w-5 h-5" />
                    Friends
                  </Link>
                </li> */}
                <li>
                  <Link to="/notifications">
                    <BellIcon className="w-5 h-5" />
                    Notifications
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* CHATTER LOGO */}
          {isChatPage && !isMobile && (
            <div className="ml-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Chatter
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* NOTIFICATIONS BUTTON */}
            <Link to="/notifications" className="btn btn-ghost btn-circle">
              <BellIcon className="h-6 w-6 text-base-content opacity-70" />
            </Link>

            {/* THEME SELECTOR */}
            <ThemeSelector />

            {/* USER AVATAR & DROPDOWN */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full">
                  <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-200 p-2 shadow"
              >
                <li>
                  <button onClick={logoutMutation}>
                    <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;