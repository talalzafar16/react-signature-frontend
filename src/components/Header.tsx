import { Input } from "./ui/input";
import { CiSearch } from "react-icons/ci";
import { GrNotification } from "react-icons/gr";
import maleAvatar from "@/assets/male-avatar.jpg";
import { useLocation } from "react-router-dom";
import MobileSideBar from "./MobileSideBar";

type HeaderProps = {
  search: string;
  setSearch: (search: string) => void;
  heading?: string;
};

const Header = ({ search, setSearch, heading }: HeaderProps) => {
  const { pathname } = useLocation();

  return pathname === "/home" ? (
    <div className="flex items-center justify-between border-b-2 pb-10 max-sm:flex-col max-sm:items-start max-sm:gap-5">
      <div className="flex items-center gap-5 ">
        <MobileSideBar />
        <div>
          <h1 className="text-xl">
            Hello! <span className="font-bold">Asad</span>
          </h1>
          <p className="text-sm text-grayText max-sm:hidden">
            Amet minim mollit non deserunt ullamco est sit aliqua.
          </p>
        </div>
      </div>
      <Input
        id="search"
        type="text"
        placeholder="Search..."
        className="border-none outline-none py-3  bg-white"
        icon={<CiSearch />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  ) : (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-5">
        <MobileSideBar />
        <h1 className="font-semibold text-xl max-sm:text-sm max-sm:font-bold">
          {heading}
        </h1>
      </div>
      <div className="flex gap-5 items-center">
        <div className="max-sm:hidden">
          <Input
            id="search"
            type="text"
            placeholder="Search..."
            className="border-none outline-none py-3 bg-white"
            value={search}
            icon={<CiSearch />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="bg-white text-grayText rounded p-2">
          <GrNotification />
        </button>
        <div className="flex gap-5 items-center">
          <div className="flex flex-col gap-2 max-sm:hidden">
            <p className="font-bold text-sm"> Asad Khan</p>
            <p className="text-grayText text-sm">Sales Manager</p>
          </div>
          <img src={maleAvatar} alt="avatar" className="h-14 w-14" />
        </div>
      </div>
    </div>
  );
};

export default Header;
