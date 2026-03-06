import { useForm } from "react-hook-form"


export default function Login() {
    const { register, handleSubmit, formState:{errors} } = useForm();

    const showData = (data) => console.log(data);
    return (
        <>
            
            <form id="login_form" onSubmit={handleSubmit(showData)}>

                <div className="flex justify-center">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border mt-[50px] text-center p-4">
                        <legend className="fieldset-legend">Login</legend>

                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" {...register('email', {required: "Questo campo è obligatorio"})}/>
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}


                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" {...register('password', {required: "La password è obligatoria"})} />
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </div>
            </form>
        </>
    )
}