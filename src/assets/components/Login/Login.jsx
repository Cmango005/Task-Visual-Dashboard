
/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"



const Login = () => {

    const { logIn, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password')
        logIn(email, password)
            .then(result => {
                console.log(result.user)

                toast.success('Login successful')
                navigate(location?.state ? location.state : "/dashboard")
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleSignInGoogle = () => {
        const provider = new GoogleAuthProvider();

        googleSignIn(provider)

            .then(Result => {

                console.log(Result);

                const userInfo = {
                    photoURL: Result.user.photoURL,
                    name: Result.user.displayName,
                    email: Result.user.email
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
                            toast('sign in with google successful')
                        }

                    })

                console.log(Result);


                navigate(location?.state ? location.state : "/dashboard")

            })

            .catch()

    }

    return (


        <div className="flex flex-col-reverse text-black lg:flex-row items-center justify-center space-y-14 lg:space-x-28 p-5 min-h-screen">



            <div style={{ background: "linear-gradient(135deg, #1ee3bf, #6e6bd8)" }} className="flex flex-col rounded-lg items-center justify-center login-form  w-96 p-5  inset-0  border bg-transparent backdrop-blur shadow-2xl">
                <p className="text-center text-xl font-bold ">Welcome </p>
                <div className="h-96">
                    <form onSubmit={handleLogin} >
                        <div className="mb-4">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-cyan-300 hover:bg-blue-300 w-full  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Login
                            </button>
                        </div>
                        <ToastContainer />
                    </form>

                    <div className="text-center mt-5">
                        <p className=" font-semibold space-y-1">
                            Don't have an account? Register Now{' '} <br />
                            <NavLink to="/registration">
                                <button className="bg-cyan-300 hover:bg-blue-300 w-full  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Registration
                                </button>

                            </NavLink>
                        </p>
                        <p className="text-center mb-1 p-1 ">OR Sign Up With</p>
                        <button onClick={handleSignInGoogle} className="btn btn-accent flex items-center w-full justify-center gap-3 mb-3 bg-cyan-300 hover:bg-cyan-700 px-4 py-2 rounded">
                            <FcGoogle /> GOOGLE
                        </button>
                        <ToastContainer></ToastContainer>
                    </div>
                </div>


            </div>


            <div>
                <p className="font-bold text-3xl  ">Login now...</p>
                <iframe className="h-96" src="https://lottie.host/embed/1c0c1636-26cf-454e-8600-8066ea4627db/hLhBs7dmJM.json"></iframe>
            </div>
        </div>


    );
};

export default Login;