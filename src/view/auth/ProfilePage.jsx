import Default from "../../assets/default.png"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom";
import router from "../../router/router";
import supabase from "../../database/supabase";
import { BsSearch } from "react-icons/bs";
import { FaStar, FaClock } from "react-icons/fa";



export default function ProfilePage() {
    const { user, profile } = useContext(UserContext);
    const [avatarUrl, setAvatarUrl] = useState();
    const [slug, setSlug] = useState();
    const [userFavourites, setUserFavourites] = useState();


    const download_avatar = async () => {
        if (profile) {
            const { data, error } = await supabase.storage.from("avatars").download(profile.avatar_url);
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        }
    };

    const get_favourites = async () => {
        if (profile) {
            let { data: favourites, error } = await supabase.from("favourites").select("*").eq("profile_id", profile.id);
            setUserFavourites(favourites);
        }
    };

    useEffect(() => {
        download_avatar();
        get_favourites();
    }, [profile]);

    const handleChange = (e) => {
        setSlug(e.target.value);
    }

    return (
        <main className="min-h-screen pb-10 pt-24 bg-[url('/media/background-reg-and-log.png')] bg-cover bg-center bg-fixed">
            {user && profile && (
                <>
                    <section className="flex flex-col md:flex-row md:justify-evenly items-center px-36 profilePage">
                        <div className="flex justify-center flex-col-reverse items-center">
                            <article className=" bg-black/70 backdrop-blur-md border-gray-700 rounded-2xl border text-center p-10 w-[320px] md:w-[350px]  h-[350px] space-y-3">
                                <h3 className="font-bold text-2xl mt-3 text-white">Your profile detail: </h3>
                                <p className="mt-5 text-white">Name and Surname: {profile.first_name} {profile.last_name}</p>
                                <p className="text-white">Username: {profile.username}</p>
                                <p className="text-white">Email: {user.email}</p>

                                <Link to="/auth/profile/settings" className="mt-4 btn bg-(--color-btn) hover:bg-(--color-btn-hover) text-white">Settings</Link>
                            </article>
                            <article className="pt-5 md:pt-20 flex flex-col items-center w-[350px]">
                                <img src={avatarUrl ?? Default} alt="Profile Image" className="rounded-full w-[100px] h-[100px] md:w-[200px] md:h-[200px] mx-auto -translate-y-[-30px] border-4 border-gray-700 shadow-xl" />
                            </article>
                            <label className="input mt-10 searchBarProfile md:hidden">
                                <input type="search" required placeholder="Search" onChange={handleChange} />
                                <Link to={`/search/${slug}`}><BsSearch /></Link>
                            </label>
                        </div>
                        <div className="flex flex-col mt-5 lg:mt-50 favouriteReview">
                            <ul className="list bg-base-100 rounded-box shadow-md w-75 md:w-200" >

                                <li className="px-6 pt-5 pb-3 text-sm tracking-wide text-white font-semibold">Your favourite games</li>
                                {userFavourites && userFavourites.map((game) => {
                                    return (


                                        <li className="sm:flex sm:flex-col md:flex-row list-row border border-white/5" key={game.id}>
                                            <div><img className="size-10 md:size-20 rounded-box" src={game.game_image} alt={game.game_name} /></div>
                                            <div className="space-y-2">
                                                <div className="font-bold">{game.game_name}</div>
                                                <div className="text-xs uppercase font-semibold text-orange-400 tracking-wide mt-1">About this game</div>
                                                <p className="list-col-wrap text-xs">
                                                    {game.game_description || "No description available."}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-center gap-5 md:gap-0 md:flex-row">

                                                <button className="flex flex-col md:flex-row btn btn-square btn-ghost  md:w-25">
                                                    <FaClock className="text-orange-400" /> {game.game_playtime} H

                                                </button>
                                                <button className="flex flex-col md:flex-row btn btn-square btn-ghost md:w-25">
                                                    <FaStar className="text-yellow-400" /> {game.game_rating}
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                        </div>
                    </section>
                </>
            )}
        </main>
    )
}