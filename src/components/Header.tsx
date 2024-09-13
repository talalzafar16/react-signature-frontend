import { Input } from "./ui/input"
import { CiSearch } from "react-icons/ci";
import { GrNotification } from "react-icons/gr";
import maleAvatar from "@/assets/male-avatar.jpg"

type HeaderProps = {
    search: string;
    setSearch: (search: string) => void;
    heading: string;
    };

const Header = ({search,setSearch,heading}:HeaderProps) => {
  return (
    <div className="flex justify-between items-center">
    <h1 className="font-semibold text-xl">{heading}</h1>
    <div className="flex gap-5 items-center">
      <Input
        id="search"
        type="text"
        placeholder="Search..."
        className="border-none outline-none py-3 bg-white"
        value={search}
        icon={<CiSearch />}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="bg-white text-grayText rounded p-2">
        <GrNotification />
      </button>
      <div className="flex gap-5 items-center">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm"> Asad Khan</p>
          <p className="text-grayText text-sm">Sales Manager</p>
        </div>
        <img src={maleAvatar} alt="avatar" className="h-14 w-14" />
      </div>
    </div>
  </div>
  )
}

export default Header