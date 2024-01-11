import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useContext } from "react";
import { updateProfile } from "firebase/auth";

import "./Registration.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Registration = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser } = useContext(AuthContext);

    const onSubmit = data => {
        createUser(data.email, data.password, data.name, data.photoURL, data.phoneNumber)
            .then(result => {
                const userInfo = {
                    photoURL: data?.photoURL,
                    name: data?.name,
                    email: data?.email,
                    phone: data?.phoneNumber
                }

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            toast('user added successfully')
                        }
                    })
                reset();
                updateProfile(result.user, {
                    displayName: data.name,
                    photoURL: data.photoURL
                })

            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="hero min-h-screen  ">
            <div className="hero-content flex-col lg:flex-row lg:space-x-60">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign up now!</h1>
                    <iframe src="https://lottie.host/embed/ba766bed-f707-45f5-9f95-55c02ec2a583/7NYsHptgLu.json" className="h-96"></iframe>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl p-3 bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="number"  {...register("phoneNumber", { required: true })} placeholder="Phone Number" className="input input-bordered" />
                            {errors.phoneNumber && <span className="text-red-600">Phone Number is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                            {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"  {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} placeholder="password" className="input input-bordered" />
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}

                        </div>
                        <div className="form-control mt-6">
                            <input className="unique-button" type="submit" value="Sign Up" />
                            <ToastContainer></ToastContainer>
                        </div>
                    </form>
                    <p className="ml-2 text-center">Already have an account <Link to="/"><span className="text-indigo-700">Login</span></Link></p>
                </div>
            </div>

        </div>
    );
};

export default Registration;