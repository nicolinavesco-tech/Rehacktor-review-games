import { Link } from "react-router-dom"
import { BsSearch } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { IoDiceOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgUserList } from "react-icons/cg";
import { IoMdLogIn } from "react-icons/io";


export default function Navbar() {
    const [slug, setSlug] = useState();
    const [genres, setGenres] = useState([]);

    const handleChange = (e) => {
        setSlug(e.target.value);
    }
    useEffect(() => {
        async function getAllGenres() {
            const promise = await fetch(`https://api.rawg.io/api/genres?key=${import.meta.env.VITE_API_KEY}`);
            const json = await promise.json();
            setGenres(json.results);
        }
        getAllGenres();
    }, []);

    return (
        <>
            <div className="navbar bg-transparent absolute z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <GiHamburgerMenu size={24} />
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to=''>New</Link></li>

                            <li>
                                <details>
                                    <summary className=''>Genres</summary>
                                    <ul className="p-5 bg-base-100 w-40 z-1">
                                        {genres.slice(0, 8).map((genre) => {
                                            return (
                                                <li className="mb-2" key={genre.id}>
                                                    <Link to={`/genres/${genre.slug}`}>{genre.name}</Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </details>
                            </li>
                            <li><Link to=''>Trending</Link></li>
                        </ul>
                    </div>
                    <Link to="/"><img src="/media/logo.png" alt="Logo sito" className="logo w-24 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex items-center">
                        <li className="text-xl"><Link to="/">Home</Link></li>
                        <li className='text-xl'><Link to="">New</Link></li>
                        <li>
                            <details>
                                <summary className='text-xl'>Genres</summary>
                                <ul className="p-5 bg-base-100 w-40 z-1">
                                    {genres.slice(0, 8).map((genre) => {
                                        return (
                                            <li className="mb-2" key={genre.id}>
                                                <Link to={`/genres/${genre.slug}`}>{genre.name}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </details>
                        </li>
                        <li className="text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"><Link to="">Trending</Link></li>
                        <li> <Link to=""><IoDiceOutline size={24} /> </Link></li>
                    </ul>
                </div>
                <div className="navbar-end gap-5 me-4">

                    <label className="input">
                        <input type="search" required placeholder="Search" onChange={handleChange} />
                        <Link to={`/search/${slug}`}><BsSearch /></Link>
                    </label>

                    <Link to="" className=""><FaRegStar size={24} /></Link>

                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="m-1">
                            <Link to="" className=""><FaUserAstronaut size={24} /></Link>
                        </div>
                        <ul tabindex="-1" class="mt-3 dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><Link to="/auth/login"><IoMdLogIn /> Login</Link></li>
                            <li><Link to="/auth/register"><CgUserList /> Registrati</Link></li>
                        </ul>
                    </div>
                    



                </div>
            </div>
        </>
    )
}