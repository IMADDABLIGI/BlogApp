import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./login/Register";
import { useState ,useEffect} from "react";
import About from "./about/About";
import Blogs from "./blogs/Blogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
	path: "/login",
	  element: <Login />
  },
  {
	path: "/register",
	  element: <Register />
  },
  {
	path: "/blogs",
	  element: <Blogs />
  },
  {
	path: "/about",
	  element: <About />
  },
]);

function App() {
  const [backData, setBackData] = useState([{}]);
  useEffect(() => {
    fetch("http://localhost:4000/api/")
      .then((res) => res.json())
      .then((data => {
        setBackData(data);
        console.log(data);
        console.log("Data fetched from backend");
      }
      ))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <RouterProvider router={router} />;
}

export default App