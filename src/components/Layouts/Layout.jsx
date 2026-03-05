import { Outlet } from "react-router-dom"; 
import Navbar from "../navbar/Navbar.jsx"
import Header from "../header/Header.jsx"
// import Footer from "../footer/Footer.jsx"

export default function Layout (){
    return (
        <>
            <Navbar />
            <Header />
            <Outlet />
            {/* <Footer /> */}
        </>
    )
}