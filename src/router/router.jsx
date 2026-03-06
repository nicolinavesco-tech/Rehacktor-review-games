import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layouts/Layout.jsx"
import Homepage from "../view/Homepage.jsx"
import { getAllGamesLoader, getFilteredByGenreGames } from "./loaders.jsx";
import SearchPage from "../view/SearchPage.jsx";
import { getSearchedGames } from "./loaders.jsx";
import { getAllGenres } from "./loaders.jsx";
import GenrePage from "../view/GenrePage.jsx";
import AuthenticationLayout from "../components/Layouts/AuthenticationLayout.jsx";
import Login from "../view/auth/Login.jsx"
import Register from "../view/auth/Register.jsx"

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        loader: getAllGenres,
        children: [
            {
                path: '/',
                Component: Homepage,
                loader: getAllGamesLoader
            },
            {
                path: "/search/:slug",
                Component: SearchPage,
                loader: getSearchedGames,
            },
            {
                path: "/genres/:slug",
                Component: GenrePage,
                loader: getFilteredByGenreGames
            }
        ]
    },
    {
        path: '/auth',
        Component: AuthenticationLayout,
        children: [
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login
            }
        ]
    }

]);

export default router;