import { HiMiniSquares2X2 } from "react-icons/hi2";
import { FaBuilding } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useLocation } from "react-router-dom";

const iconSize=20
const iconColor='#939393'
const selectedIconColor='white'

const data = [
    {
        name:"Dashboard",
        icon: <HiMiniSquares2X2 size={iconSize} color={iconColor}/>,
        selectedIcon:<HiMiniSquares2X2 size={iconSize} color={selectedIconColor}/>,
        link:'/home'
    },
    {
        name:"Properties Listing",
        icon: <FaBuilding size={iconSize} color={iconColor}/>,
        selectedIcon:<FaBuilding size={iconSize} color={selectedIconColor}/>,
        link:'/home/listings'
    },
    {
        name:"Add Property",
        icon: <FaBuilding size={iconSize} color={iconColor}/>,
        selectedIcon:<FaBuilding size={iconSize} color={selectedIconColor}/>,
        link:'/home/addProperty'
    },
    {
        name:"Setting",
        icon: <IoMdSettings size={iconSize} color={iconColor}/>,
        selectedIcon:<IoMdSettings size={iconSize} color={selectedIconColor}/>,
        link:'/home/settings'
    },
]

const Sidebar = () => {
    const {pathname} = useLocation();

  return (
    <div className="w-full min-h-screen bg-black flex flex-col justify-between">
        <div className="flex flex-col gap-3">
            {
                data.map((option,index) => (
                    <div className="flex gap-3" key={index}>
                        {pathname === option.link ? option.selectedIcon : option.icon}
                        <p className={`${pathname === option.link ? `text-${selectedIconColor}` : `text-[${iconColor}]`}`}>{option.name}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Sidebar