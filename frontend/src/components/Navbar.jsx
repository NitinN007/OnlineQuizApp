import { useState, useEffect } from "react";
import { Link,NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );

  const navigate = useNavigate();

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.clear();

    window.dispatchEvent(
      new CustomEvent("authchanged", { detail: { user: null } })
    );

    setLoggedIn(false);
   
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <Link to="/">Quizze</Link>
          </div>

          

          {/* Auth Buttons */}
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
