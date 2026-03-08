import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import router from "../../router/router";
import supabase from "../../database/supabase";
import Default from "../../assets/default.png"
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProfileSettingsPage() {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const { profile, getUser } = useContext(UserContext);
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

    const handleChange = (e) => {
        setFile(() => e.target.files[0]);
    };

    useEffect(() => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(() => imageUrl);
        }
    }, [file]);

    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        const fileExt = file.name.split(".").pop();
        const fileName = `${profile.id}${Math.random()}.${fileExt}`;
        await supabase.storage.from("avatars").upload(fileName, file);
        await supabase.from("profiles").upsert({ id: profile.id, avatar_url: fileName }).select();
        await getUser();
    }
    const { updateProfile } = useContext(UserContext);

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        updateProfile(data);
        navigate('/auth/profile')
    };

    return (
        <main className="h-screen flex flex-col justify-center items-center pt-10 bg-[url('/media/background-reg-and-log.png')] bg-cover bg-center">
            <h1 className="text-3xl font-bold mb-8">Impostazioni profilo</h1>
            <section className="flex">
                <form action="" className="p-10 bg-nav-gray w-200 flex justify-between items-center" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center flex-col">

                        <input type="text" placeholder="Nome" className="input input-lg mb-5 w-100"
                            {...register("first_name", { required: "Questo campo è obbligatorio" })}
                        />
                        {errors.first_name && (
                            <p className="text-red-500 mb-6">{errors.first_message}</p>
                        )}

                        <input type="text" placeholder="Cognome" className="input input-lg mb-5 w-full"
                            {...register("last_name", { required: "Questo campo è obbligatorio" })}
                        />
                        {errors.last_name && (
                            <p className="text-red-500 mb-6">{errors.last_message}</p>
                        )}

                        <input type="text" placeholder="Username" className="input input-lg mb-5 w-full"
                            {...register("username", { required: "Questo campo è obbligatorio" })}
                        />
                        {errors.username && (
                            <p className="text-red-500 mb-6">{errors.username_message}</p>
                        )}
                        <button className="btn p-5 bg-(--color-btn) hover:bg-(--color-btn-hover)">Modifica</button>
                    </div>


                </form>
                <form action="" className="p-10 bg-nav-gray w-1/2" onSubmit={handleAvatarSubmit}>
                    <div className=" flex flex-col items-end w-50 ">
                        <h4 className="pe-8 font-bold">Immagine di profilo</h4>
                        <img src={avatarUrl ?? Default} alt="Profile Image" className="rounded-full w-[200px] h-[200px] mt-2  border-4 border-gray-700 shadow-xl" />

                        <details className="dropdown">
                            <summary className="btn h-[30px] -translate-y-10 -translate-x-20"><MdOutlineEdit size={18} /> Modifica</summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm -translate-y-10 -translate-x-20 mt-2">
                                <li><input type="file" className="file-input file-input-ghost w-full border-none " onChange={handleChange} /></li>
                                <li><a>Rimuovi foto</a></li>
                            </ul>
                        </details>

                    </div>
                </form>
            </section>

        </main >
    )
}