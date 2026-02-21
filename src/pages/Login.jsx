import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/loginSchema";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      navigate("/dashboard");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f0f13] text-white font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* --- NEO-FUTURISTIC GRADIENT ELEMENTS --- */}
      <div className="absolute -top-[10%] -left-[10%] w-[45%] h-[45%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-[35%] h-[55%] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute -bottom-[5%] left-[15%] w-[40%] h-[30%] bg-[#7c5dfa]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Left Side: Branding & Hero Content */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12">
        <div className="flex items-center gap-2 mb-16">
          <div className="w-8 h-8 bg-[#7c5dfa] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(124,93,250,0.4)]">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight">MFP</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8">
          Master the <span className="bg-gradient-to-r from-[#7c5dfa] to-blue-400 bg-clip-text text-transparent">Social Universe.</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-md mb-16 leading-relaxed">
          Connect your accounts, automate your content, and scale your influence with the world's most advanced AI-driven management platform.
        </p>

        {/* Creator Avatars Section */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0f0f13] bg-gray-800 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            Joined by <span className="text-white font-bold">12,000+</span> creators this month
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="bg-[#16161d]/80 backdrop-blur-xl p-10 rounded-3xl border border-gray-800 shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-3">Welcome Back</h2>
              <p className="text-gray-500 text-sm">Enter your credentials to access your workspace</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <EnvelopeIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#7c5dfa] transition-colors" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    {...register("email")}
                    className="w-full bg-[#0f0f13] border border-gray-800 rounded-xl py-4 px-12 focus:outline-none focus:border-[#7c5dfa] focus:ring-1 focus:ring-[#7c5dfa]/40 transition-all text-white placeholder-gray-700"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Password</label>
                  <span className="text-[10px] font-bold text-[#7c5dfa] cursor-pointer hover:underline uppercase tracking-widest">Forgot password?</span>
                </div>
                <div className="relative group">
                  <LockClosedIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#7c5dfa] transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full bg-[#0f0f13] border border-gray-800 rounded-xl py-4 px-12 focus:outline-none focus:border-[#7c5dfa] focus:ring-1 focus:ring-[#7c5dfa]/40 transition-all text-white placeholder-gray-700"
                  />
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Remember Device Checkbox */}
              <div className="flex items-center gap-3 py-1">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-800 bg-[#0f0f13] text-[#7c5dfa] focus:ring-[#7c5dfa] focus:ring-offset-0" id="remember" />
                <label htmlFor="remember" className="text-xs text-gray-500">Remember this device for 30 days</label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#7c5dfa] to-[#6a4df4] hover:brightness-110 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_10px_20px_rgba(124,93,250,0.2)] active:scale-[0.98]"
              >
                {isSubmitting ? "Logging in..." : "Sign In to Dashboard"} 
                {!isSubmitting && <span className="text-xl">→</span>}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm text-gray-500">
                Don’t have an account yet?{" "}
                <Link to="/register" className="text-[#7c5dfa] font-bold hover:text-[#917afe] transition-colors">
                  Create an account
                </Link>
              </p>
            </div>

            {/* Social Trust Icons */}
            <div className="mt-12 pt-8 border-t border-gray-800/50 text-center">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-6">Trusted by growth teams worldwide</p>
              <div className="flex justify-center gap-6 text-gray-600">
                {/* Placeholder circles for the small icons in your screenshot */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center text-[8px]">✓</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="absolute bottom-8 w-full hidden md:flex justify-between px-12 text-[10px] text-gray-600 font-bold tracking-widest uppercase">
        <p>© 2024 MFP PLATFORM. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <span className="cursor-pointer hover:text-gray-400 transition-colors">Privacy Policy</span>
          <span className="cursor-pointer hover:text-gray-400 transition-colors">Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}