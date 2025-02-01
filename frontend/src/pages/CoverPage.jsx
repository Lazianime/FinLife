import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';

function CoverPage() {
    const [error] = useState(null);
    const navigate = useNavigate();
      
    return (
        <div className="w-full m-0 p-0">
            <section className="w-full">
                <Navbar />
            </section>
            
            {/* Hero Section */}
            <section className="relative w-full h-[500px] flex items-center justify-center text-center">
                {/* Video Background */}
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src="/FinLifeHero.mp4" // Replace with a finance-related video or image
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    controls={false}
                ></video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
                {/* Content */}
                <div className="relative z-20 text-white max-w-2xl px-4">
                    <h1 className="text-5xl font-bold">
                        <span className="block sm:inline">Welcome to </span>
                        <span className="block sm:inline">FinLife</span>
                    </h1>
                    <p className="text-lg mt-4">
                        Take control of your personal finances with FinLife. Track your expenses, set budgets, and achieve financial goals!
                    </p>
                    <button
                        onClick={() => navigate('/auth')}
                        className="bg-blue-500 text-white font-semibold py-3 px-6 mt-6 rounded-lg shadow-lg hover:bg-blue-400 hover:scale-105 transition-transform duration-300"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full">
                {/* First Feature */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-16 sm:py-20 p-10 bg-blue-100">
                    <div className="flex-1 sm:w-1/4">
                        <img
                            src="/images/budgeting.jpg" // Replace with finance-related images
                            alt="Budgeting"
                            className="w-3/5 h-3/5 mx-auto rounded-lg shadow-xl"
                        />
                    </div>
                    <div className="flex-1 sm:w-3/4 text-center sm:text-left">
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                            BUDGET & EXPENSE TRACKING
                        </h3>
                        <p className="text-gray-600 mt-4">
                            Keep track of your income, expenses, and savings with FinLife's intuitive budgeting tools.
                        </p>
                    </div>
                </div>

                {/* Second Feature */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-16 sm:py-20 p-10 bg-green-50">
                    <div className="flex-1 sm:w-1/4">
                        <img
                            src="/images/ai_finance.png" // Replace with AI or finance-related images
                            alt="AI Integration"
                            className="w-3/5 h-3/5 mx-auto rounded-lg shadow-xl"
                        />
                    </div>
                    <div className="flex-1 sm:w-3/4 text-center sm:text-left">
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                            AI-POWERED EXPENSE CATEGORIZATION
                        </h3>
                        <p className="text-gray-600 mt-4">
                            Automatically categorize your expenses with the power of AI, simplifying financial management.
                        </p>
                    </div>
                </div>

                {/* Third Feature */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-16 sm:py-20 p-10 bg-blue-100">
                    <div className="flex-1 sm:w-1/4">
                        <img
                            src="/images/financial_goals.jpg" // Replace with financial goal setting images
                            alt="Financial Goals"
                            className="w-3/5 h-3/5 mx-auto rounded-lg shadow-xl"
                        />
                    </div>
                    <div className="flex-1 sm:w-3/4 text-center sm:text-left">
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                            ACHIEVE FINANCIAL GOALS
                        </h3>
                        <p className="text-gray-600 mt-4">
                            Set personalized financial goals and track your progress to make your dreams a reality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Authentication Section */}
            <section className="bg-gray-50 py-12 px-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Take Control?</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Don't wait any longer to manage your finances. Sign up today and start achieving your financial goals!
                </p>
                <button
                    onClick={() => navigate('/auth')}
                    className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 hover:scale-105 transition-transform duration-300"
                >
                    Create Your Account
                </button>
            </section>

            <Footer />
        </div>
    );
};

export default CoverPage;
