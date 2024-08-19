import React from 'react';
import facebookIcon from "~/assets/facebookIcon.png";
import googleIcon from "~/assets/googleIcon.png";
import instagramIcon from "~/assets/instagramIcon.png";

function SignIn() {
    return (
        <div className="max-w-md mx-auto mt-2 p-6 bg-white">
            <h1 className="text-center font-bold text-3xl text-black mb-2">Welcome back!</h1>
            <p className="text-center text-base pt-1">Let's customize your style</p>
            <div className="mt-10">
                <label htmlFor="email" className="text-base font-semibold text-gray-600 ">E-mail or phone number</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Enter your email or phone number"
                    className="block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm bg-gray-100 p-2"
                />
            </div>
            <div className="mt-4">
                <label htmlFor="password" className="text-base font-semibold text-gray-600">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm bg-gray-100 p-2"
                />
            </div>
            <div className="mt-8">
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-black border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-orange-600"
                >
                    Sign in
                </button>
            <div className="mt-4 text-sm text-gray-600 text-right italic">
                Don't have an account? 
            <span className="hover:text-orange-500 text-sm m-1 font-medium">Sign Up</span>
            </div>
            </div>
            <div className="mt-8 flex justify-between">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 bg-white border border-gray-200 border-opacity-50 rounded-md px-3 py-1 shadow-md hover:bg-gray-100 hover:border-gray-300">
                    <img src={googleIcon} alt="Google Icon" className="h-5 w-5 m-1 fill-current" />
                    Google
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 bg-white border border-gray-200 border-opacity-50 rounded-md px-3 py-1 shadow-md hover:bg-gray-100 hover:border-gray-300">
                    <img src={facebookIcon} alt="Facebook Icon" className="h-5 w-5 m-1 fill-current" />
                    Facebook
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 bg-white border border-gray-200 border-opacity-50 rounded-md px-3 py-1 shadow-md hover:bg-gray-100 hover:border-gray-300">
                    <img src={instagramIcon} alt="Instagram Icon" className="h-5 w-5 m-1 fill-current" />
                    Instagram
                </button>
            </div>
        </div>
    );
}

export default SignIn;
