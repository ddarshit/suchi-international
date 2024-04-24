import React, {useState} from 'react'
import LoginPic from '../assests/loginPic.png'
import { CgProfile } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import {showToast} from '../features/toastSlice'

const Login = () => {
    const dispatch=useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("url",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            var res = await response.json();
            console.log(res);
        } catch (err) {
            console.log(err);
            alert("Something Went Wrong");
        }
        setEmail("");
        setPassword("");
    }

    return (
        <React.Fragment>
            <div className='grid lg:grid-cols-2 bg-gray-50'>
                <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto lg:pl-28 md:h-screen lg:py-0">
                    <div className="md:w-[500px] bg-white rounded-lg drop-shadow-lg">
                        <div className="space-y-4 py-10 px-10">
                            <h1 className="text-2xl flex flex-row items-center justify-center pb-3 font-bold leading-tight tracking-tight text-violet-600 md:text-4xl">
                                <CgProfile className='pt-1 text-5xl'/> Login
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Your email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-400 text-gray-900 text-sm md:text-base rounded-md focus:ring-primary-400 focus:border-primary-400 block w-full p-2" placeholder="name@xyz.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Enter your password" className="bg-gray-50 border border-gray-400 text-gray-900 text-sm md:text-base rounded-md focus:ring-primary-400 focus:border-primary-400 block w-full p-2" required />
                                </div>


                                <button type="submit" className="w-full text-white bg-violet-600 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center mt-4">Login</button>
                                <hr />
                                <p className="text-base font-normal text-gray-800">
                                    Don't have an account yet ? <a href="/signup" className="font-medium text-lg text-violet-600 hover:underline dark:text-primary-500">Sign Up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='hidden lg:block mt-8 mr-28'>
                    <img src={LoginPic} alt="" />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login