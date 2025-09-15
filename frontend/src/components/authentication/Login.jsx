import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
// import { USER_API_ENDPOINT } from "../../../utils/data.js";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Button } from "../ui/button";
import { Loader, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  // const changeFileHandler = (e) => {
  //     setInput({...input, file: e.target.files?.[0] });
  // }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email.trim() || !input.password.trim() || !input.role) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        // Store token in localStorage for API requests
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          // Also set token as cookie for backend middleware compatibility
          document.cookie = `token=${res.data.token}; path=/;`;
        }
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Network error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  })

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-500 rounded-md p-4 m-10"
        >
          <h1 className="font-bold  text-xl mb-5 text-center text-red-600">
            Login
          </h1>
          {/* <div className="my-2">
            <Label>Name</Label>
            <Input type="text" placeholder="Richard Doe"></Input>
          </div> */}
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="richarddoe@gmail.com"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="************"
            ></Input>
          </div>
          {/* <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="tel" placeholder="+1234567890"></Input>
          </div> */}
          <div className="flex items-center justify-between">
            {/* <Label>Role</Label> */}
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="recruiter"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {/* <div className="flex items-center gap-2">
              <Label>Profile Photo</Label>
              <Input type = "file" accept = "image/*" className={"cursor-pointer"}></Input>
            </div> */}
          {loading ? (
            <Button className={"w-full my-4"}>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </Button>
          ) : (
            <button
              type="submit"
              className="block w-full py-3 my-3 text-white bg-red-600 hover:bg-red-500 rounded-md"
            >
              Login
            </button>
          )}

          {/** account not exist */}
          <p className="text-center text-sm">
            Don't have an account ?{" "}
            <Link to="/register" className="text-blue-700 font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
