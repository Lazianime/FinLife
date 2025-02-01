import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "../configuration/firebaseConfig.jsx";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRecipesMenuOpen, setIsRecipesMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Check if the user is authenticated and fetch the user's data
  useEffect(() => {
    const authInstance = getAuth();

    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      if (user) {
        setIsAuthenticated(true);

        // Fetch the current user's data
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setCurrentUserData(userDoc.data());
          } else {
            console.error("User data not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUserData(null); // Clear user data on logout
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsRecipesMenuOpen(false);
  };

  const toggleRecipesMenu = () => {
    setIsRecipesMenuOpen((prev) => !prev);
    setIsMenuOpen(false);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsRecipesMenuOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    signOut(auth);
    closeAllMenus();
    navigate("/");
  };

  return (
    <nav className="bg-gray-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={closeAllMenus}>
          <img src="/images/LetHimCookLogo.svg" alt="Logo" className="h-12" />
        </Link>

        {/* Navbar Links */}
        <div className="flex items-center space-x-4">
          {/* Show Sign Up or Login if not authenticated */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900"
                onClick={closeAllMenus}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-700 hover:text-gray-900"
                onClick={closeAllMenus}
              >
                Sign Up
              </Link>
            </>
          ) : (
            // Show user menu when authenticated
            <>
              {currentUserData && (
                <div
                  className="relative"
                  onClick={toggleMenu}
                  aria-hidden="true"
                >
                  <div
                    className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer overflow-hidden border border-gray-400 flex items-center justify-center"
                  >
                    <img
                      src={currentUserData.profilePhoto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Main Menu (only when authenticated) */}
        {isAuthenticated && currentUserData && (
          <div
            className={`fixed top-0 right-0 w-80 h-full bg-white z-40 transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 shadow-lg`}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-600 text-3xl hover:text-gray-900 focus:outline-none"
            >
              &times;
            </button>
            <div className="h-full flex flex-col justify-between">
              <div className="p-6 text-center bg-gray-100 border-b border-gray-300">
                <div className="w-24 h-24 mx-auto rounded-full border border-gray-400 cursor-pointer overflow-hidden flex items-center justify-center">
                  <Link
                    to={`/userProfile/${auth.currentUser?.uid}`}
                    onClick={closeAllMenus}
                  >
                    <img
                      src={currentUserData.profilePhoto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
                <h2 className="mt-4 text-lg font-semibold">{currentUserData.username}</h2>
              </div>
              <div className="flex-grow overflow-y-auto px-4 py-6">
                <Link
                  to={`/fridge/${auth.currentUser?.uid}`}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-md"
                  onClick={closeAllMenus}
                >
                  Stocks
                </Link>
                <button
                  onClick={toggleRecipesMenu}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  Recipes
                </button>
              </div>
              <div className="p-4 bg-gray-100 border-t border-gray-300">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recipes Menu (only when authenticated) */}
        {isAuthenticated && (
          <div
            className={`fixed top-0 right-0 w-80 h-full bg-gray-50 z-50 transform ${
              isRecipesMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 shadow-lg`}
          >
            <button
              onClick={() => setIsRecipesMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-600 text-3xl hover:text-gray-900 focus:outline-none"
            >
              &times;
            </button>
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recipes</h2>
              <Link
                to={`/recipeBook/${auth.currentUser?.uid}`}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-md"
                onClick={closeAllMenus}
              >
                AI Generation
              </Link>
              <Link
                to="/addRecipe"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-md"
                onClick={closeAllMenus}
              >
                Add Recipe
              </Link>
              <Link
                to="/generateRecipes"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-md"
                onClick={closeAllMenus}
              >
                Generate Recipes
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
