import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

const AuthForm = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true); // Start on LoginForm

    const toggleForm = () => {
        setIsLogin(!isLogin); // Toggle between LoginForm and RegisterForm
    };

    return (
        <div className="w-full h-screen relative overflow-hidden">
            {/* Background Images */}
            {/* Back Arrow */}
            <div
                className="absolute top-5 left-5 text-5xl text-white cursor-pointer group z-50"
                onClick={() => navigate("/")}
            >
                <div className="w-10 h-10 flex items-center justify-center rounded-full border-3 border-transparent group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                    <i className="bx bx-chevron-left"></i>
                </div>
            </div>


            {/* Form Container */}
            <div className="relative z-10 flex justify-center items-center h-full">
                {/* Login and Register Forms */}
                <div className="relative w-full h-full">
                    {/* LoginForm */}
                    <div
                        className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center px-10 space-y-6 transition-all duration-500 ${
                            isLogin ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        <LoginForm toggleRegister={toggleForm} />
                    </div>

                    {/* RegisterForm */}
                    <div
                        className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center px-10 space-y-6 transition-all duration-500 ${
                            isLogin ? "translate-x-full" : "translate-x-0"
                        }`}
                    >
                        <RegisterForm toggleLogin={toggleForm}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
