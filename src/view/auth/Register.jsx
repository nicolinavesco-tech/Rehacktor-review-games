import { useForm } from "react-hook-form";

export default function Register() {
    const { register, handleSubmit, formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    return (
        <main className="h-screen flex justify-center items-center">
            <form action="" className="p-10 bg-nav-gray w-1/2 " onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border mt-[50px] text-center p-4">
                    <legend className="fieldset-legend">Register</legend>

                    <div>
                        <input
                            type="text"
                            className="input"
                            placeholder="Nome"
                            {...register("name", {
                                required: "Il nome è obbligatorio",
                                maxLength: { value: 50, message: "Massimo 50 caratteri" },
                            })}
                        />
                        {errors.name && <p className="text-error">{errors.name.message}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            className="input"
                            placeholder="Cognome"
                            {...register("surname", {
                                required: "Il cognome è obbligatorio",
                                maxLength: { value: 50, message: "Massimo 50 caratteri" },
                            })}
                        />
                        {errors.surname && <p className="text-error">{errors.surname.message}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            className="input"
                            placeholder="mario@rossi.com"
                            {...register("email", { required: "Questo campo è obligatorio" })}
                        />
                        {errors.email && <p className="text-error">{errors.email.message}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password obbligatoria",
                                minLength: { value: 6, message: "Minimo 6 caratteri" },
                            })}
                        />
                        {errors.password && <p className="text-error">{errors.password.message}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            className="input"
                            placeholder="Conferma Password"
                            {...register("confirm_password", {
                                required: "Password obbligatoria", minLength: { value: 6, message: "Minimo 6 caratteri" },
                            })}
                        />
                        {errors.password && <p className="text-error">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-neutral mt-4">
                        Registrati
                    </button>
                </fieldset>


            </form>

        </main>
    )

}