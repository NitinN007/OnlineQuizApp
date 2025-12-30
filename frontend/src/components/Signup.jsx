import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const API_BASE = "http://localhost:4000";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ---------- Validation ----------
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Invalid email format";
    return "";
  };

  const validateForm = () => ({
    name: !formData.name ? "Name is required" : "",
    email: validateEmail(formData.email),
    password: !formData.password ? "Password is required" : "",
  });

  // ---------- Handlers ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]:
          name === "email"
            ? validateEmail(value)
            : !value
            ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
            : "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "email"
          ? validateEmail(value)
          : !value
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
          : "",
    }));
  };

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setTouched({ name: true, email: true, password: true });

    if (
      validationErrors.name ||
      validationErrors.email ||
      validationErrors.password
    )
      return;

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data?.message || "Signup failed");
        return;
      }

      navigate("/login");
    } catch (err) {
      setSubmitError("Network error");
    } finally {
      setLoading(false);
    }
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        {submitError && (
          <p className="mb-4 text-red-600 text-center">
            {submitError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.name && touched.name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.email && touched.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.password && touched.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:scale-[1.02] transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:text-purple-600 transition"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
