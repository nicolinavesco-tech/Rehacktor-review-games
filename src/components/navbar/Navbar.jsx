import { Link } from "react-router-dom"
import { BsSearch } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";


export default function Navbar() {
    return (
        <>
            <div className="navbar bg-transparent absolute z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to =''>New</Link></li>

                            <li>
                                <Link to=''>Genres</Link>
                                <ul className="p-2">
                                    <li><Link to=''>Submenu 1</Link></li>
                                    <li><Link to="">Submenu 2</Link></li>
                                </ul>
                            </li>
                            <li><Link to=''>Trending</Link></li>
                        </ul>
                    </div>
                    <img src="/media/logo.png" alt="Logo sito" className="logo w-24" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex items-center">
                        <li className="text-xl"><a>Home</a></li>
                        <li className='text-xl'><a>New</a></li>
                        <li>
                            <details>
                                <summary className='text-xl'>Genres</summary>
                                <ul className="p-2 bg-base-100 w-40 z-1">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li className="text-xl"><a>Trending</a></li>
                        <li><img src="./media/game.png" alt="icon game" className="demo-game w-24" /></li>
                    </ul>
                </div>
                <div className="navbar-end gap-5 me-4">
                    
                    <a className=""><FaRegStar size={24} /></a>
                    <a className=""><BsSearch size={24}/></a>
                    <a className=""><FaUserAstronaut size={24}/></a>


                    
                </div>
            </div>
        </>
    )
}