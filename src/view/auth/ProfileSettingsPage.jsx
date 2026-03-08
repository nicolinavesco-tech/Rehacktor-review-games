import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import router from "../../router/router";
import supabase from "../../database/supabase";

export default function ProfileSettingsPage(){
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const {profile, getUser} = useContext(UserContext);

    const handleChange=(e)=>{
        setFile(()=>e.target.files[0]);
    };

    useEffect(()=>{
        if(file){
            const imageUrl = URL.createObjectURL(file);
            setPreview(()=>imageUrl);
        }
    }, [file]);

    const handleAvatarSubmit = async(e)=>{
        e.preventDefault();
        const fileExt = file.name.split(".").pop();
        const fileName = `${profile.id}${Math.random()}.${fileExt}`;
        await supabase.storage.from("avatars").upload(fileName, file);
        await supabase.from("profiles").upsert({id:profile.id, avatar_url: fileName}).select();
        await getUser();
    }
    const { updateProfile } = useContext(UserContext);

    const{register, handleSubmit, formState: {errors}, } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        updateProfile(data);
        navigate('/auth/profile')
    };

    return (
        <main className="h-screen p-24 flex flex-col justify-center items-center pt-24 bg-[url('/media/background-reg-and-log.png')] bg-cover bg-center">
            <form action="" className="p-10 bg-nav-gray w-100" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Nome" className="input input-lg mb-5 w-full" 
                {...register("first_name", {required: "Questo campo è obbligatorio"})}
                />
                {errors.first_name && (
                    <p className="text-red-500 mb-6">{errors.first_message}</p>
                )}

                <input type="text" placeholder="Cognome" className="input input-lg mb-5 w-full" 
                {...register("last_name", {required: "Questo campo è obbligatorio"})}
                />
                {errors.last_name && (
                    <p className="text-red-500 mb-6">{errors.last_message}</p>
                )}

                <input type="text" placeholder="Username" className="input input-lg mb-5 w-full" 
                {...register("username", {required: "Questo campo è obbligatorio"})}
                />
                {errors.username && (
                    <p className="text-red-500 mb-6">{errors.username_message}</p>
                )}

                <button className="btn p-5 bg-(--color-btn) hover:bg-(--color-btn-hover)">Modifica</button>
            </form>
            <form action="" className="p-10 bg-nav-gray w-1/2" onSubmit={handleAvatarSubmit}>
                <input type="file" className="file-input file-input-lg w-full mb-5" onChange={handleChange}/>
                <button className="btn p-5  bg-(--color-btn) hover:bg-(--color-btn-hover)">Cambia immagine profilo</button>
            </form>
            <img src={preview} alt="modifica immagine" className="w-50" />
        </main>
    )
}