import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import supabase from "../../database/supabase";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";


export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const { login } = useContext(UserContext);

    const onSubmit = async (user_data) => {
        await login({
            email: user_data.email,
            password: user_data.password,
        });
        navigate('/');
    };

    return (
        <>
            <main className="flex justify-center items-center flex-col p-59 bg-[url('/media/background-reg-and-log.png')] bg-cover bg-center">
                <img src="/media/logo.png" alt="" className="logo-register w-40" />

                <form className="login_form flex justify-center" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset bg-black/70 backdrop-blur-md border-gray-700 rounded-2xl w-100 border mt-[10px] text-center p-4 space-y-3">
                        <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
                        <div>

                            <label className="label"></label>
                            <input type="email" className="input" placeholder="Email" {...register('email', { required: "Questo campo è obligatorio" })} />
                            {errors.email && <p className="text-red-600 mt-2">{errors.email.message}</p>}
                        </div>

                        <div>

                            <label className="label"></label>
                            <input type="password" className="input" placeholder="Password" {...register('password', { required: "La password è obligatoria" })} />
                            {errors.password && <p className="text-red-600 mt-2">{errors.password.message}</p>}
                        </div>
                        <button className="btn bg-(--color-btn) hover:bg-(--color-btn-hover) mt-4 text-l">Login</button>
                    </fieldset>

                </form>
                <div className="mt-2">
                    <span>Non hai un account di Rehacktor? <Link to="/auth/register" className="text-(--color-btn)">Crea un nuovo account</Link></span>
                </div>
            </main>
        </>
    )
}