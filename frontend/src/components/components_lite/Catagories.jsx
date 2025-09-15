import { setSearchQuery } from "@/redux/jobSlice";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";




  

const Catagory = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "MERN Stack Developer",
  "MEAN Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Specialist",
  "Cloud Architect",
  "Cybersecurity Analyst",
  "Mobile App Developer",
  "UI/UX Designer",
  "Product Manager",
  "Project Manager",
  "Business Analyst",
  "Quality Assurance Engineer",
  "Database Administrator",
  "Network Engineer",
  "Systems Administrator",
];

const Catagories = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();
const searchJobHandler = (query) => {
  
    dispatch(setSearchQuery(query));
    // Navigate to search page
    // Example: navigate("/search", { state: { query } });
    navigate("/browse");
  }
  return (
    <div>
        <div>
            <h1 className="text-2xl font-black text-center text-[#954ecc]">
                Catagories
            </h1>
            <p className="text-center text-gray-600">
                Explore jobs by category and find the perfect fit for your skills and interests.
            </p>
        </div>
      <Carousel className={"my-5 w-full max-w-xl mx-auto "}>
        <CarouselContent className={''}>
          {Catagory.map((catagory, index) => {
            return (
              <CarouselItem key={index} className={" md:basis-1/2 lg-basis-1/3 "}>
                <Button onClick={() => searchJobHandler(catagory)} className={'bg-[#6A0066]'}>{catagory}</Button>
              </CarouselItem>
            );
          })}
          ;
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Catagories;
