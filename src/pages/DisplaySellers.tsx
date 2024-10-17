import Header from "@/components/Header"
import { useState } from "react";


const DisplaySellers = () => {
    const [search, setSearch] = useState("");
  return (
    <div className="p-5 bg-slate-100 min-h-screen">
         {/* <!-- Header --> */}
      <Header search={search} setSearch={setSearch} heading="Sellers Listing"/>
    </div>
  )
}

export default DisplaySellers