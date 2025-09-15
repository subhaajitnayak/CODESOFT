// src/components/Herocontainer.jsx
import React, { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { ImOffice } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../redux/jobSlice"; // use relative path to be safe

const Herocontainer = () => {
  const searchQuery = useSelector((state) => state.job.searchQuery);
  const [query, setQuery] = useState(searchQuery || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(searchQuery || "");
  }, [searchQuery]);

  const searchJobHandler = (e) => {
    e?.preventDefault?.();
    const trimmed = (query || "").trim();
    if (!trimmed) return; // prevent empty searches
    console.log("[Herocontainer] dispatching searchQuery:", trimmed);
    dispatch(setSearchQuery(trimmed));
    // you may clear input or keep it
    // setQuery("");
    navigate("/browse");
  };

  // allow Enter to submit
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="px-3 mx-auto py-2 rounded-full bg-gray-200 text-red-500 font-medium flex items-center gap-2 ">
          <ImOffice className="text-[#614232]" />N0.1 Job Hunt Website
        </span>

        <h2 className="text-5xl font-bold ">
          Find the job that is <br />
          perfect for <span className="text-[#9112BC]">your dream job</span>
        </h2>

        <form
          onSubmit={searchJobHandler}
          className="flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Find your dream job"
            className="w-full outline-none"
          />
          <button type="submit" className="rounded-r-full px-4 py-2 bg-[#9112BC] text-white hover:bg-[#8a4a9f]">
            <SearchIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Herocontainer;
