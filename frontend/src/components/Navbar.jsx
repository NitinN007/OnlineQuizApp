import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("authToken"));
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.clear();

    window.dispatchEvent(
      new CustomEvent("authchanged", { detail: { user: null } })
    );

    setLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Listen auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      setLoggedIn(!!localStorage.getItem("authToken"));
    };

    window.addEventListener("authchanged", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("authchanged", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Quizze
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive ? "text-purple-700" : "text-gray-700 hover:text-purple-700"
                }`
              }
            >
              Home
            </NavLink>

            {/* Auth Buttons Desktop */}
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-3xl text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* ✅ Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <div className="mt-2 flex flex-col gap-3 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg">
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-800 hover:bg-gray-100"
                  }`
                }
              >
                Home
              </NavLink>

              {/* Auth Buttons Mobile */}
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full px-5 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition font-semibold"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-center w-full px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
