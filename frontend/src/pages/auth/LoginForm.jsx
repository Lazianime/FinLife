import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, sendEmailVerification } from "firebase/auth";
import { getFirestore, collection, query, where, doc, setDoc, getDoc, getDocs } from "firebase/firestore"; // For Firestore

const LoginForm = ({toggleRegister}) => {
    const [currentUserData, setCurrentUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loginIdentifier, setLoginIdentifier] = useState("");
    const [password, setPassword] = useState(""); 
    const [emailSent, setEmailSent] = useState(false); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    
    // Check if user has remembered their email and password
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        const savedPassword = localStorage.getItem("rememberedPassword");

        if (savedEmail && savedPassword) {
        setLoginIdentifier(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true); // Mark "Remember Me" checkbox as checked
        }
    }, []);

    // Firebase Authentication Methods (Google, Facebook)
    const handleGoogleLogin = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider()
        ;
    
        try {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
        console.log(result.user.displayName);
        await handleSocialLogin(result.user); 
        } catch (error) {
        console.error('Error during Google login:', error.message);
        setErrorMessage("Error logging in with Google.");
        }
    };

const handleFacebookSignIn = async () => {
  const auth = getAuth();
  const provider = new FacebookAuthProvider();
  provider.addScope("public_profile"); // Ensures access to profile data

  try {
    // Step 1: Sign in via popup
    const result = await signInWithPopup(auth, provider);

    // Step 2: Get Facebook Access Token
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // Step 3: Extract user info
    console.log("User Info:", result.user);

    // Step 4: Build the photo URL using Facebook's Graph API
    const pictureUrl = `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?height=500&access_token=${accessToken}`;
    
    // Step 5: Check if the email is verified
    if (!result.user.emailVerified) {
      await sendEmailVerification(result.user);

      setEmailSent(true); // shows other page
      return; 
    }

    // Step 6: Save the user's details in Firestore
    await handleSocialLogin({
      ...result.user,
      photoURL: pictureUrl, // Override default photoURL with high-res version
    });

  } catch (error) {
    console.error("Error during Facebook login:", error.message);
    setErrorMessage("Error logging in with Facebook.");
  }
};

// Handle storing username in Firestore only if email is verified
const handleSocialLogin = async (user) => {
  const db = getFirestore();
  try {
    if (!user.emailVerified) {
      setErrorMessage("Email is not verified. Please verify your email first.");
      return; // Do not proceed if email is not verified
    }

    const userRef = doc(db, "LHC_users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      // User already exists, retain current data
      await setDoc(userRef, {
        ...userSnapshot.data(),
        email: user.email,
      }, { merge: true });
    } else {
      // First-time login, create user with default values
      await setDoc(userRef, {
        createdAt: new Date(),
        email: user.email,
        userId: user.uid,
        username: user.displayName || "New User",
      });
    }

    navigate("/home");
  } catch (err) {
    console.error("Error saving user data:", err);
    setErrorMessage("There was an error saving your profile.");
  }
};


    


    // Firestore Query to Map Username to Email
    const getEmailFromUsername = async (username) => {
        const db = getFirestore();
        const usersCollection = collection(db, "users"); 
        const q = query(usersCollection, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        return userDoc.email; 
        }
        return null;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true); // Start loading
    
        // Check if login fields are empty
        if (!loginIdentifier || !password) {
        setErrorMessage("Please fill in all fields.");
        setLoading(false);
        return;
        }
    
        // Remember email and password if "Remember Me" is checked
        if (rememberMe) {
        localStorage.setItem("rememberedEmail", loginIdentifier);
        localStorage.setItem("rememberedPassword", password);
        } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        }
    
        try {
        let emailToLogin = loginIdentifier;
    
        // If the login identifier is a username, get the associated email from Firestore
        if (!loginIdentifier.includes("@")) { 
            emailToLogin = await getEmailFromUsername(loginIdentifier);
            if (!emailToLogin) {
            setErrorMessage("Username not found.");
            setLoading(false);
            return;
            }
        }
    
        // Sign in with the resolved email and password
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, emailToLogin, password);
        const user = userCredential.user;
    
        // Check if the email is verified
        if (user.emailVerified) {
            navigate("/home");
        } else {
            setErrorMessage("Please verify your email before logging in.");
            setLoading(false);
        }
    
        } catch (err) {
        console.error("Error during login:", err);
        setErrorMessage("Invalid login credentials. Please try again.");
        } finally { 
        setLoading(false); // Stop loading in all cases (success or error)
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

      <div className="w-full min-h-screen max-w-md flex flex-col justify-center space-y-8 px-4">
        <h2 className="font-bold text-4xl text-center text-white">Welcome back!</h2>
          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              className="bg-white border w-12 h-12 rounded-full flex justify-center items-center hover:scale-105 duration-300 text-gray-800"
              onClick={handleGoogleLogin} 
              aria-label="Google login"
            >
              <i className="bx bxl-google text-2xl"></i>
            </button>

            <button 
              className="bg-white border w-12 h-12 rounded-full flex justify-center items-center hover:scale-105 duration-300 text-gray-800"
              onClick={handleFacebookSignIn} 
              aria-label="Facebook login"
            >
              <i className="bx bxl-facebook text-2xl"></i>
            </button>
          </div>


          {/* Login Form */}
          <form className="flex flex-col gap-6 mt-6" onSubmit={handleLogin}>
            <div className="grid grid-cols-3 items-center text-[#330828]">
              <hr className="border-white" />
              <p className="text-center text-sm text-white">OR</p>
              <hr className="border-white" />
            </div>  
            {/* Login Identifier input */}
            <div className="relative">
              <input
                className="p-4 rounded-xl border w-full focus:outline-none focus:ring-2 focus:ring-[#523F8C] transition duration-300"
                type="text"
                name="loginIdentifier"
                placeholder="Username or Email"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
              />
              <i className="bx bx-user absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" aria-label="Username or Email icon"></i>
            </div>

            {/* Password input */}
            <div className="relative">
              <input
                className="p-4 rounded-xl border w-full focus:outline-none focus:ring-2 focus:ring-[#523F8C] transition duration-300"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`bx ${showPassword ? "bx-show" : "bx-hide"} absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer`}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              ></i>
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-sm text-white">
                Remember Me
              </label>
            </div>

            {/* Error message */}
            {errorMessage && (
                  <p className="text-red-500 text-center">{errorMessage}</p>
              )}
              
            {/* Login Button */}
            <button 
              className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 hover:scale-105 transition-transform duration-300">      
              Login
            </button>

            

            {/* Link to go back to Register form */}
            <div className="text-center">
                <a
                    className="cursor-pointer text-white font-semibold text-sm md:text-base hover:underline"
                    onClick={toggleRegister}
                >
                    Don&apos;t have an account? Register here
                </a>
            </div>
          </form>
      </div>
      )}
    </div>
  );
};

export default LoginForm;
