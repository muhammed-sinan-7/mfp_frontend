import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/registerSchema";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
      });
      navigate("/verify-otp", { state: { email: data.email } });
    } catch (error) {
      console.log(error.response?.data);
      alert(JSON.stringify(error.response?.data));
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f0f13] text-white font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* --- BACKROUND GRADIENT ELEMENTS --- */}
      {/* Top Left Glow */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      {/* Center/Right Glow */}
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      {/* Bottom Glow */}
      <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] bg-[#7c5dfa]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Left Side: Branding & Info */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-12">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-[#5a3adb] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(124,93,250,0.5)]">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight">MFP</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          The Future of <br />
          <span className="bg-gradient-to-r from-[#7c5dfa] to-blue-400 bg-clip-text text-transparent">
            Social Automation
          </span>
        </h1>

        <p className="text-gray-400 text-lg max-w-md mb-16 leading-relaxed">
          Empowering modern teams to orchestrate their social presence with 
          neo-futuristic precision and intelligent scheduling.
        </p>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="h-1 w-8 bg-[#7c5dfa] mb-4 shadow-[0_0_8px_#7c5dfa]"></div>
            <h3 className="font-bold mb-2">Multi-Platform</h3>
            <p className="text-sm text-gray-500">Sync LinkedIn, Instagram, and more in one unified workspace.</p>
          </div>
          <div>
            <div className="h-1 w-8 bg-blue-400 mb-4 shadow-[0_0_8px_#60a5fa]"></div>
            <h3 className="font-bold mb-2">Team Power</h3>
            <p className="text-sm text-gray-500">Collaborate seamlessly with advanced role permissions.</p>
          </div>
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Create your account</h2>
          <p className="text-gray-400 mb-8">Join 2,000+ teams automating their growth on MFP.</p>

          {/* Form Card with subtle border glow */}
          <div className="bg-[#16161d]/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 shadow-2xl relative">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Work Email</label>
                <div className="relative group">
                  <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#7c5dfa] transition-colors" />
                  <input 
                    type="email" 
                    placeholder="alex@company.com"
                    {...register("email")}
                    className="w-full bg-[#1c1c24] border border-gray-700 rounded-lg py-3 px-10 focus:outline-none focus:border-[#7c5dfa] focus:ring-1 focus:ring-[#7c5dfa]/50 transition-all text-white placeholder-gray-600"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email?.message}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                <div className="relative group">
                  <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#7c5dfa] transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full bg-[#1c1c24] border border-gray-700 rounded-lg py-3 px-10 focus:outline-none focus:border-[#7c5dfa] focus:ring-1 focus:ring-[#7c5dfa]/50 transition-all text-white placeholder-gray-600"
                  />
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password?.message}</p>}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
                <div className="relative group">
                  <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#7c5dfa] transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className="w-full bg-[#1c1c24] border border-gray-700 rounded-lg py-3 px-10 focus:outline-none focus:border-[#7c5dfa] focus:ring-1 focus:ring-[#7c5dfa]/50 transition-all text-white placeholder-gray-600"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword?.message}</p>}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 py-2">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-700 bg-[#1c1c24] text-[#7c5dfa] focus:ring-[#7c5dfa]" id="terms" required />
                <label htmlFor="terms" className="text-xs text-gray-400 leading-tight">
                  I agree to the <span className="text-[#7c5dfa] cursor-pointer hover:underline">Terms of Service</span> and <span className="text-[#7c5dfa] cursor-pointer hover:underline">Privacy Policy</span>.
                </label>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#7c5dfa] to-[#6a4df4] hover:brightness-110 disabled:opacity-50 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(124,93,250,0.3)] active:scale-[0.98]"
              >
                {isSubmitting ? "Creating..." : "Create Account"} 
                {!isSubmitting && <span className="text-xl">→</span>}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-gray-800/50 pt-6">
              <p className="text-sm text-gray-400">
                Already have an account? <span onClick={() => navigate('/login')} className="text-[#7c5dfa] cursor-pointer font-medium hover:text-[#917afe] transition-colors">Sign in here</span>
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex justify-center items-center gap-8 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-gray-700 flex items-center justify-center text-[8px] text-[#7c5dfa]">✓</div>
              BANK-GRADE SECURITY
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
              GDPR COMPLIANT
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="absolute bottom-6 w-full hidden md:flex justify-between px-10 text-[10px] text-gray-600 font-medium tracking-wider">
        <p>© 2026 MFP PLATFORM. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-gray-400 transition-colors">PRIVACY POLICY</span>
          <span className="cursor-pointer hover:text-gray-400 transition-colors">TERMS OF SERVICE</span>
        </div>
      </footer>
    </div>
  );
}