import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/lemonpayLogo.svg";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
  className="min-h-screen w-full relative overflow-hidden text-white flex flex-col md:flex-row"
  style={{
    background: "linear-gradient(135deg, #FEFEFE, #9BAAD7, #445FB4, #4444A3)",
  }}
>
      {/* Background Circles */}
      <div className="absolute w-[300px] h-[300px] bg-[#C3B3C0] rounded-full top-[-150px] right-[-150px] opacity-100"></div>
      <div className="absolute w-[300px] h-[300px] bg-[#755C89] rounded-full bottom-[-190px] left-[-190px] opacity-100"></div>
      <div className="absolute w-[300px] h-[300px] bg-[#755C8B] rounded-full bottom-[-150px] left-1/3 opacity-100"></div>

      
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 md:top-10 md:left-10 md:transform-none z-20">
          <img
            src={logo}
            alt="Lemon Pay"
            className="mt-5 w-[300px] md:w-[180px]"
          />
        </div>

        <div className="flex-1 hidden md:flex flex-col justify-end px-10 pb-20">
          <div className="text-4xl font-light mb-2">
            Join 1000<sup>+</sup> Businesses
          </div>
          <div className="text-yellow-400 font-semibold text-3xl mb-2">
            Powering Growth with
          </div>
          <div className="text-white font-semibold text-3xl">Lemonpay!</div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 md:px-10 py-10 z-10">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome Login System</h1>
            <p className="text-sm md:text-base text-center md:text-left mb-6">
              Your gateway to seamless <br /> transactions and easy payments.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md text-black focus:outline-none"
                  placeholder="mail@lemonpay.tech"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 8 characters"
                    className="w-full px-3 py-2 rounded-md text-black pr-10 focus:outline-none"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-blue-200 hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-white text-[#2D3D9B] font-semibold py-2 rounded-md hover:bg-gray-200 transition"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      
    </div>
  );
};

export default Login;
