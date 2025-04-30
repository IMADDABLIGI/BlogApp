import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./login/Register";
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

  return <RouterProvider router={router} />;
}

export default App