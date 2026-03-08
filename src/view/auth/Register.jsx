import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import supabase from "../../database/supabase";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function Register() {
    const { register, handleSubmit, formState: { errors },
    } = useForm();
    const { signUp } = useContext(UserContext);

    const navigate = useNavigate();

    const onSubmit = async (user_data) => {
        await signUp({
            email: user_data.email,
            password: user_data.password,
            options: {
                data: {
                    first_name: user_data.first_name,
                    last_name: user_data.last_name,
                    username: user_data.username,
                }
            }
        })

        navigate('/')
    }
    return (
        <main className="flex justify-center items-center flex-col p-30 bg-[url('/media/background-reg-and-log.png')] bg-cover bg-center">
            <img src="/media/logo.png" alt="" className="logo-register w-40" />
            <form action="" className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset bg-black/70 backdrop-blur-md border-gray-700 rounded-2xl w-100 border mt-[10px] text-center p-4 space-y-3">
                    <legend className="fieldset-legend text-3xl mx-auto px-2">Registrati</legend>

                    <div>
                        <input
                            type="text"
                            className="input"
                            placeholder="Nome "
                            {...register("first_name", {
                                required: "Il nome è obbligatorio",
                                maxLength: { value: 20, message: "Massimo 20 caratteri" },
                            })}
                        />
                        {errors.first_name && <p className="text-error mt-1">{errors.first_name.message}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            className="input"
                            placeholder="Cognome"
                            {...register("last_name", {
                                required: "Il cognome è obbligatorio",
                                maxLength: { value: 20, message: "Massimo 20 caratteri" },
                            })}
                        />
                        {errors.last_name && <p className="text-error mt-1">{errors.last_name.message}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            className="input"
                            placeholder="Username"
                            {...register("username", {
                                required: "Username obbligatorio",
                                maxLength: { value: 20, message: "Massimo 20 caratteri" },
                            })}
                        />
                        {errors.username && <p className="text-error mt-1">{errors.username.message}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            className="input"
                            placeholder="mario@rossi.com"
                            {...register("email", { required: "Questo campo è obligatorio" })}
                        />
                        {errors.email && <p className="text-error mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password obbligatoria",
                                minLength: { value: 8, message: "Minimo 8 caratteri" },
                            })}
                        />
                        {errors.password && <p className="text-error mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            className="input"
                            placeholder="Conferma Password"
                            {...register("confirm_password", {
                                required: "Password obbligatoria", minLength: { value: 8, message: "Minimo 8 caratteri" },
                            })}
                        />
                        {errors.confirm_password && <p className="text-error mt-1">{errors.confirm_password.message}</p>}
                    </div>

                    <button type="submit" className="btn bg-(--color-btn) hover:bg-(--color-btn-hover) mt-4 text-l">
                        Registrati
                    </button>
                </fieldset>


            </form>

            <div className="mt-2">
                <span>Hai già un account di Rehacktor? <Link to="/auth/login" className="text-(--color-btn)">Accedi</Link></span>
            </div>
        </main>
    )

}