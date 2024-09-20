import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { HiMiniSquares2X2 } from "react-icons/hi2";
import { FaBuilding } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { BsBuildingFillAdd } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const iconSize = 20;
const iconColor = "#939393";
const selectedIconColor = "#ffffff";

const data = [
  {
    name: "Dashboard",
    icon: <HiMiniSquares2X2 size={iconSize} color={iconColor} />,
    selectedIcon: (
      <HiMiniSquares2X2 size={iconSize} color={selectedIconColor} />
    ),
    link: "/home",
  },
  {
    name: "Properties Listing",
    icon: <FaBuilding size={iconSize} color={iconColor} />,
    selectedIcon: <FaBuilding size={iconSize} color={selectedIconColor} />,
    link: "/home/listings",
  },
  {
    name: "Add Property",
    icon: <BsBuildingFillAdd size={iconSize} color={iconColor} />,
    selectedIcon: (
      <BsBuildingFillAdd size={iconSize} color={selectedIconColor} />
    ),
    link: "/home/addProperty",
  },
  {
    name: "Setting",
    icon: <IoMdSettings size={iconSize} color={iconColor} />,
    selectedIcon: <IoMdSettings size={iconSize} color={selectedIconColor} />,
    link: "/home/settings",
  },
];

const MobileSideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (link: string) => {
    navigate(link);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Sheet>
      <SheetTrigger>
        <IoMenu className="text-3xl lg:hidden cursor-pointer" />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 border-none outline-none">
        <div className="w-full min-h-screen bg-black flex flex-col justify-between pb-10 pt-20">
          <div className="flex flex-col gap-8 mx-auto">
            {data.map((option, index) => (
              <div
                className="flex gap-5 cursor-pointer items-center"
                key={index}
                onClick={() => handleNavigation(option.link)}
              >
                {pathname === option.link ? option.selectedIcon : option.icon}
                <p
                  className={`${
                    pathname === option.link ? "font-semibold" : ""
                  }`}
                  style={{
                    color:
                      pathname === option.link ? selectedIconColor : iconColor,
                  }}
                >
                  {option.name}
                </p>
              </div>
            ))}
          </div>

          <div
            className="flex gap-5 cursor-pointer items-center justify-center"
            onClick={handleLogout}
          >
            <IoIosLogOut size={iconSize} color={iconColor} />
            <p style={{ color: iconColor }}>Logout</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
