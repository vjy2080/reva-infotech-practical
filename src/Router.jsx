import { createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from './Components/SignUp';
import Navbar from './Components/Navbar';
import MapModal from "./Components/MapModal";


const Router = createBrowserRouter([

    {
        path: "/home",
        element: <><Navbar /><Home /></>,
    },
    {
        path: "/signUp",
        element: <><Navbar /><SignUp /></>,
    },
    {
        path: "/",
        element: <><Navbar /><Login /></>,
    }
    ,
    {
        path: "/map",
        element: <><Navbar /><MapModal /></>,
    }
]);

export default Router;
