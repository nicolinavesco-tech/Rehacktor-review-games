import Default from "../../assets/default.png"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom";
import router from "../../router/router";
import supabase from "../../database/supabase";

export default function ProfilePage() {
    const { user, profile } = useContext(UserContext);
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
        <main className="h-screen pt-24 bg-[url('/media/background-reg-and-log.png')] bg-cover bg-center">
            {user && profile && (
                <>
                    <section className="flex px-36">
                        <div className="flex justify-center flex-col-reverse items-center">
                            <article className=" bg-black/70 backdrop-blur-md border-gray-700 rounded-2xl w-100 border text-center p-10 w-[350px] h-[350px] space-y-3">
                                <h3 className="font-bold text-2xl mt-3">I tuoi dati: </h3>
                                <p className="mt-5">Nome e Cognome: {profile.first_name} {profile.last_name}</p>
                                <p>Username: {profile.username}</p>
                                <p>Email: {user.email}</p>

                                <Link to="/auth/profile/settings" className="mt-4 btn bg-(--color-btn) hover:bg-(--color-btn-hover)">Impostazioni</Link>
                            </article>
                            <article className="pt-20 flex flex-col items-center w-100">
                                <img src={avatarUrl ?? Default} alt="Profile Image" className="rounded-full w-[200px] h-[200px] mx-auto -translate-y-[-30px] border-4 border-gray-700 shadow-xl" />
                            </article>
                        </div>
                    </section>
                </>
            )}
        </main>
    )
}