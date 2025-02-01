import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../../configuration/firebaseConfig.jsx"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import RecaptchaVerification from "./Recaptcha.jsx";

const RegisterForm = ({ toggleForm, toggleLogin }) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [emailSent, setEmailSent] = useState(false); 
    const toggleDone = useRef(false);
    const intervalRef = useRef(null);

    const defaultProfilePhoto = "/characters/Default.png";

    // Clears the current user on page load
    useEffect(() => {
        const clearAuthUser = async () => {
        try {
            await auth.signOut(); 
        } catch (error) {
            console.error("Error signing out the user:", error);
        }
        };

        clearAuthUser(); // Call the function to clear the current user

        return () => {}; // No cleanup needed for this effect
    }, []);

    // Check if the user has verified their email after checkEmailVerification runs
    useEffect(() => {
        const checkEmailVerification = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload(); // Reload user info from Firebase
            console.log("Email verified: ", auth.currentUser.emailVerified);
            if (auth.currentUser.emailVerified && !toggleDone.current) {
            toggleForm(); // Toggle the form
            toggleDone.current = true; // Mark that the toggle has been done
            if (intervalRef.current) {
                clearInterval(intervalRef.current); // Clear the interval
            }
            }
        }
        };

        // Check email verification every 5 seconds
        intervalRef.current = setInterval(() => {
        checkEmailVerification();
        }, 5000);

        // Cleanup interval when component unmounts or toggleDone is set
        return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current); // Clear interval on cleanup
        }
        };
    }, [toggleForm]);


    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        if (!isVerified) {
        setErrorMessage("Please complete the reCAPTCHA.");
        setLoading(false);
        return;
        }

        const { username, email, password, confirmPassword } = formData;

        if (!username || !email || !password || !confirmPassword) {
        setErrorMessage("Please fill in all fields.");
        setLoading(false);
        return;
        }

        if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        setLoading(false);
        return;
        }

        try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;

        await setDoc(doc(db, "LHC_users", currentUser.uid), {
            amountOfIngredients: [],
            amountOfRecipes: [],
            backgroundColor: "#FECA98",
            createdAt: new Date(),    
            email: email,
            profilePhoto: defaultProfilePhoto,
            userId: currentUser.uid,
            username: username, 
        });

        await sendEmailVerification(currentUser);
        setEmailSent(true); // Indicate that email was sent successfully
        } catch (err) {
        switch (err.code) {
            case "auth/email-already-in-use":
            setErrorMessage("Email is already in use.");
            break;
            case "auth/weak-password":
            setErrorMessage("Password should be at least 6 characters.");
            break;
            case "auth/invalid-email":
            setErrorMessage("Invalid email address.");
            break;
            default:
            setErrorMessage("Error creating account. Please try again.");
        }
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen max-w-md flex flex-col justify-center space-y-8 px-4">
            {emailSent ? (
            <div className="text-center space-y-6">
            <p className="text-green-600 font-semibold text-4xl">
            Verification email sent! Please check your inbox.
            </p>
        

            <p className="text-white text-sm bottom-1">
                Didn&apos;t get your email? 
                <span className="font-semibold ml-1 underline cursor-pointer transition-colors duration-300" onClick={sendEmailVerification}>
                Send verification link again.
                </span>
            </p>

        </div>
        
            ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h2 className="font-bold text-4xl text-center text-white">Join us now!</h2>
                <div className="relative">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="p-4 rounded-xl border w-full"
                />
                <i className="bx bx-user absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"></i>
                </div>
                <div className="relative">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-4 rounded-xl border w-full"
                />
                <i className="bx bx-envelope absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"></i>
                </div>
                <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="p-4 rounded-xl border w-full"
                />
                <i
                    className={`bx ${showPassword ? "bx-show" : "bx-hide"} absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer`}
                    onClick={togglePasswordVisibility}
                ></i>
                </div>
                <div className="relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="p-4 rounded-xl border w-full"
                />
                <i
                    className={`bx ${showConfirmPassword ? "bx-show" : "bx-hide"} absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer`}
                    onClick={toggleConfirmPasswordVisibility}
                ></i>
                </div>

                <RecaptchaVerification onVerify={setIsVerified} />

                {/* Error message */}
                {errorMessage && (
                    <p className="text-red-500 text-center">{errorMessage}</p>
                )}

                {/* Register button */}
                <button
                type="submit"
                className={`bg-gray-800 rounded-xl text-white py-4 hover:bg-gray-700 hover:scale-105 transition-transform duration-300 ${loading ? "opacity-50" : ""}`}
                disabled={loading}
                >
                {loading ? "Registering..." : "Register"}
                </button>

                {/* Link to go back to Register form */}
                <div className="text-center">
                    <a
                        className="cursor-pointer text-white font-semibold text-sm md:text-base hover:underline"
                        onClick={toggleLogin}
                    >
                        Already have an account? Login here.
                    </a>
                </div>
            </form>
            )}
        </div>
    );
};

export default RegisterForm;
