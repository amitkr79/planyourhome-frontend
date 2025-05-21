import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GalleryUploadPannel from "../components/admin/GalleryUploadPannel.jsx";
import AddNestedImages from "../components/admin/AddNestedImages.jsx";

const AdminPannel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const navigate = useNavigate();

  // Hardcoded admin credentials
  const ADMIN_CREDENTIALS = {
    email: "amitkr@gmail.com",
    password: "amitkr123",
  };

   const handleLogin = (e) => {
    e.preventDefault();
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      // Store authentication status in localStorage
      localStorage.setItem("isAuthenticated", "true");
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Remove authentication status from localStorage
    localStorage.removeItem("isAuthenticated");
    setEmail("");
    setPassword("");
    navigate("/admin-pannel");
  };

if (isAuthenticated) {
  return (
    <div className="min-h-screen bg-[#2b2b2b] pt-20"> {/* Changed from mt-30 to pt-20 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center pb-6 border-b border-gray-200"> {/* Removed mt-20 */}
          <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
        <div className="py-8">
          <GalleryUploadPannel />
        </div>
        <div className="py-8">
          <AddNestedImages/>
        </div>
      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2b2b2b] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden ">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
          <p className="text-blue-100 mt-1">
            Enter your credentials to continue
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02]"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              For authorized personnel only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPannel;
