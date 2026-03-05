import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layouts/Layout.jsx"
import Homepage from "../view/Homepage.jsx"
import { getAllGamesLoader } from "./loaders.jsx";
// import Login from "../view/auth/Login.jsx"
// import Register from "../view/auth/Register.jsx"

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
            children: [
                {
                    path: '/',
                    Component: Homepage,
                    loader: getAllGamesLoader
                },
                // {
                //     path: 'login',
                //     Component: Login
                // },
                // {
                //     path: 'register',
                //     Component: Register
                // }
            ]
    }
]);

export default router;