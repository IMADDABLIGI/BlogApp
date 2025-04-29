import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./login/Register";

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
]);

function App() {

  return <RouterProvider router={router} />;
}

export default App