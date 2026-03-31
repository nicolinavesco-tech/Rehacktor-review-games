import { Link, useNavigate } from "react-router-dom"
import { BsSearch } from "react-icons/bs";
import { FaRegStar, FaUserAstronaut } from "react-icons/fa";
import { IoDiceOutline } from "react-icons/io5";
import { useState, useEffect, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgUserList } from "react-icons/cg";
import { IoMdLogIn } from "react-icons/io";
import { UserContext } from "../../context/UserContext";
import Default from "../../assets/default.png";
import supabase from "../../database/supabase";


export default function Navbar() {
    const [slug, setSlug] = useState();
    const [genres, setGenres] = useState([]);

    const handleChange = (e) => {
        setSlug(e.target.value);
    }

    const navigate = useNavigate();
    const { user, profile, signOut } = useContext(UserContext);
    const handleLogout = async () => {
        await navigate('/');
        signOut();
    }

    useEffect(() => {
        async function getAllGenres() {
            const promise = await fetch(`https://api.rawg.io/api/genres?key=${import.meta.env.VITE_API_KEY}`);
            const json = await promise.json();
            setGenres(json.results);
        }
        getAllGenres();
    }, []);

    const [avatarUrl, setAvatarUrl] = useState();

    const download_avatar = async () => {
        if (profile) {
            const { data, error } = await supabase.storage.from("avatars").download(profile.avatar_url);
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        }
    };

    useEffect(() => {
        download_avatar();
    }, [profile]);

    return (
        <>
            <div className="navbar gap-2 md:gap-0 absolute z-50 bg-black/20">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <GiHamburgerMenu size={24} className="text-white" />
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content mt-3 w-56 rounded-2xl p-2 shadow-xl bg-slate-900/95 text-slate-100 border border-white/10">
                            <li><Link to='/' className="hover:bg-white/10 rounded-lg">Home</Link></li>
                            <li><Link to='/new' className="hover:bg-white/10 rounded-lg">New</Link></li>

                            <li>
                                <details>
                                    <summary className='hover:bg-white/10 rounded-lg'>Genres</summary>
                                    <ul className="p-5 bg-slate-950/90 w-40 z-1">
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
                            <li><Link to='/trending' className="hover:bg-white/10 rounded-lg">Trending</Link></li>
                        </ul>
                    </div>
                    <Link to="/"><img src="/media/logo.png" alt="Logo sito" className="logo w-24 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex items-center">
                        <li className="text-xl"><Link to="/" className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)">Home</Link></li>
                        <li className='text-xl'><Link to="/new" className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] text-white">New</Link></li>
                        <li>
                            <details>
                                <summary className='text-xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)'>Genres</summary>
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
                        <li className="text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"><Link to="/trending" className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)">Trending</Link></li>
                        <li className="text-xl"><Link to="" className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">FAQ</Link></li>
                    </ul>
                </div>
                <div className="navbar-end gap-2 md:gap-5 me-4 ">

                    <label className="input searchBar">
                        <input type="search" required placeholder="Search" onChange={handleChange} />
                        <Link to={`/search/${slug}`}><BsSearch /></Link>
                    </label>

                    <Link to="/auth/profile" className="starIcon"><FaRegStar size={24} /></Link>
                    {(!user && !profile && (
                        <>
                            <div className="dropdown dropdown-end">
                                <div tabIndex="0" role="button" className="m-1">
                                    <Link to="" className=""><FaUserAstronaut size={24} /></Link>
                                </div>
                                <ul tabIndex="-1" className="mt-3 dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><Link to="/auth/login"><IoMdLogIn /> Login</Link></li>
                                    <li><Link to="/auth/register"><CgUserList /> Register</Link></li>


                                </ul>
                            </div>
                        </>
                    )) || (
                            <>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex="0" role="button" className="m-1 flex items-center gap-3">
                                        <Link to="" className="shrink-0 w-10 h-10 md:w-12 md:h-12"><img src={avatarUrl ?? Default} alt="Profile Image" className="profileImg rounded-full w-full h-full object-cover block" />
                                        </Link>{profile?.username}
                                    </div>
                                    <ul tabIndex="-1" className="mt-3 dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                        <li><Link to="/auth/profile">Account</Link></li>
                                        <li onClick={handleLogout}>
                                            <button>Logout</button>
                                        </li>
                                    </ul>

                                </div>
                            </>

                        )}
                </div>
            </div >
        </>
    )
}