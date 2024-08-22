import React from 'react';
import { Link } from 'react-router-dom';
import signup from '~/assets/signup.jpg';
import google from '~/assets/google.svg';

function SignUp() {
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >
        <div class="flex flex-col justify-center p-8 md:p-14">
          <span class="mb-3 text-4xl font-bold">Create an account</span>
          <span class="font-light text-gray-400 mb-8">
            Sign up to get started!
          </span>
          <div class="py-4">
            <span class="text-base font-semibold text-gray-600">Full Name</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="fullname"
              id="fullname"
            />
          </div>
          <div class="py-4">
            <span class="text-base font-semibold text-gray-600">Email</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
            />
          </div>
          <div class="py-4">
            <span class="text-base font-semibold text-gray-600">Password</span>
            <input
              type="password"
              name="password"
              id="password"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div class="py-4">
            <span class="text-base font-semibold text-gray-600">Confirm Password</span>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <button
            class="w-full p-2 mb-6 bg-black text-white border border-transparent rounded-lg shadow-sm text-base font-medium hover:bg-orange-600"
          >
            Sign up
          </button>
          <button
            class="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
          >
            <img src={google} alt="img" class="w-6 h-6 inline mr-2 test-base" />
            Sign up with Google
          </button>
          <div class="text-center text-gray-400">
            Already have an account?
            <Link to="/signin" className="font-bold text-black hover:text-orange-500"> Sign in</Link>
          </div>
        </div>

        <div class="relative">
          <img
            src={signup}
            alt="img"
            class="w-[380px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
