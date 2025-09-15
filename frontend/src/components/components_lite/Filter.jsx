import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    Options: [
      "Mumbai",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Noida",
      "Gurugram",
      "Bhubaneswar",
      "USA",
      "Canada",
      "UK",
      "Germany",
      "France",
      "Italy",
    ],
  },
  {
    filterType: "Industry",
    Options: ["IT", "Finance", "Marketing", "Healthcare", "Education", "Manufacturing"],
  },
  {
    filterType: "Experience Level",
    Options: ["0-1 years", "1-3 years", "3-5 years", "5-7 years", "7-10 years", "10+ years"],
  },
  // {
  //   filterType: "Salary",
  //   Options: ["3", "6", "10", "15", "25", "55"],
  // },
  {
    filterType: "Job Type",
    Options: ["Full-time", "Part-time", "Contract", "Freelance", "Remote"],
  },
  {
    filterType: "Technology",
    Options: ["React", "Angular", "Vue", "Node.js", "Python", "Java", "C++", "SQL", "NoSQL" , "Front-end", "Back-end", "DevOps", "Data Science", "Machine Learning", "AI", "ML/DL", "Cybersecurity", "Cloud", "DevOps", "QA", "UX/UI",],
  }
];

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  const handleChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      if(value === "none") {
      const updated = {...prev };
      delete updated[filterType];
      return updated;
    }
    return{
      ...prev,
      [filterType]: value,
    }
  });
  };

  useEffect(() => {
    // combine all selected filters into one string for searching
    const query = Object.values(selectedFilters).join(" ");
    dispatch(setSearchQuery(query));
  }, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white rounded-md p-4">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 mb-4" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-bold text-md mb-2">{data.filterType}</h2>

          <Select
            value={selectedFilters[data.filterType] || "none"}
            onValueChange={(value) => handleChange(data.filterType, value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={`Select ${data.filterType}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{data.filterType}</SelectLabel>
                <SelectItem value="none">None</SelectItem>
                {data.Options.map((option, idx) => (
                  <SelectItem key={`${data.filterType}-${idx}`} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
};

export default Filter;
