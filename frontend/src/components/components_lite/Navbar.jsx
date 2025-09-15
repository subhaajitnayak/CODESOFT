import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../utils.js";
import { toast } from "sonner";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/logout`);
      if (response.data.success) {
        dispatch(setUser(null));
        // Clear token from localStorage
        localStorage.removeItem("token");
        navigate("/");
        toast.success("Logged out successfully.");
      } else {
        toast.error("Failed to log out.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out.");
    }
  };

  const { user } = useSelector((state) => state.auth);

  // Helper to get initials from user's full name
  const getInitials = (name) => {
    if (!name) return "UN";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
  };

  return (
    <div className="bg-[#E9E294] ">
      <div className="flex items-center justify-between mx-auto max-w-7xl  h-16">
        <div>
          <h1 className="text-2xl text-[#F14A00] font-bold">
            Hiring
            <span className="text-[#9112BC]">Division</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"} className="text-[#7d0fa1] font-bold">Home</Link>
                </li>
                <li>
                  <Link to={"/Browse"} className="text-[#7d0fa1] font-bold">Browse</Link>
                </li>
                <li>
                  <Link to={"/Jobs"} className="text-[#7d0fa1] font-bold">Jobs</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button variant="outline" className={"cursor-pointer"}>
                  Login
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button
                  className={"bg-red-600 hover:bg-red-500 cursor-pointer"}
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover >
              <PopoverTrigger>
                <Avatar className={"cursor-pointer"}>
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>{getInitials(user?.fullname)}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className={"w-80 bg-[#FFFCB8]"}>
                <div className="flex items-center gap-5 space-y-2">
                  <Avatar className={"cursor-pointer"}>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>
                      {getInitials(user?.fullname)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {user?.fullname || "Unknown User"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio ||
                        "No profile description available."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {
                    user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      <Link to={"/Profile"}>View Profile</Link>
                    </Button>
                  </div>
                    )
                  }
                  
                  <div className="flex w-fit items-center gap-2 ">
                    <LogOut />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className={"cursor-pointer"}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
