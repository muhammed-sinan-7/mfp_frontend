import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "../validation/otpSchema";
import { verifyOtp,resendOtp } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheckIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [serverError, setServerError] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [isLocked, setIsLocked] = useState(false);
  const [cooldown, setCooldown] = useState(60);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // Safety check for email
  if (!email && typeof window !== "undefined") {
    navigate("/register");
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data) => {
    setServerError(null);

    try {
      const response = await verifyOtp({ email, otp: data.otp });
      const { access, refresh } = response.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      navigate("/onboarding");
    } catch (error) {
      const data = error.response?.data;

      setServerError(data?.error || "Verification failed");

      if (data?.attempts_left !== undefined) {
        setAttemptsLeft(data.attempts_left);
      }

      if (data?.locked) {
        setIsLocked(true);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f0f13] text-white font-sans flex items-center justify-center overflow-hidden">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Logo */}
      <div className="absolute top-12 flex items-center gap-2">
        <div className="w-8 h-8 bg-[#7c5dfa] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(124,93,250,0.5)]">
          <div className="w-4 h-4 border-2 border-white rotate-45"></div>
        </div>
        <span className="text-2xl font-bold tracking-tight">MFP</span>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-[#16161d]/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-gray-800 shadow-2xl text-center">
          {/* Shield Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#1c1c24] border border-gray-800 flex items-center justify-center">
              <ShieldCheckIcon className="w-6 h-6 text-[#7c5dfa]" />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-3">Verify Your Account</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            We've sent a 6-digit verification <br />
            code to{" "}
            <span className="text-white font-medium">
              {email || "your email"}
            </span>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative">
              {/* Note: For a true 6-box UI, you would typically map 6 inputs. 
                  To keep your code simple and working with your current schema, 
                  we use a single input with character-spacing tracking. */}
              <input
                {...register("otp")}
                maxLength={6}
                disabled={isSubmitting || isLocked}
                placeholder="000000"
                className="w-full bg-transparent border-none text-center text-4xl tracking-[0.5em] font-light focus:outline-none focus:ring-0 placeholder-gray-800 text-[#7c5dfa]"
              />
              {/* Visual Grid Underlay */}
              <div className="absolute inset-0 -z-10 flex justify-between pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-16 border border-gray-800 bg-[#1c1c24]/50 rounded-xl"
                  ></div>
                ))}
              </div>
            </div>

            {errors.otp && (
              <p className="text-red-400 text-xs">{errors.otp.message}</p>
            )}

            {serverError && (
              <div className="mt-3 p-3 rounded-lg bg-red-900/30 border border-red-700">
                <p className="text-red-400 text-sm font-medium">
                  {serverError}
                </p>

                {!isLocked && attemptsLeft < 5 && (
                  <p className="text-yellow-400 text-xs mt-1">
                    Attempts remaining: {attemptsLeft}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isLocked}
              className="w-full bg-[#1c1c24] hover:bg-[#25252e] border border-gray-700 text-gray-400 hover:text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all group"
            >
              {isSubmitting ? "Verifying..." : "Verify Account"}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
            {isLocked && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded-xl">
                <p className="text-red-400 text-sm font-semibold">
                  Too many invalid attempts.
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Please request a new OTP.
                </p>
              </div>
            )}
          </form>

          {/* Resend Section */}
          <div className="mt-10 flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>Didn't get the code?</span>
            <span className="w-px h-4 bg-gray-800"></span>
            <span className="text-[#7c5dfa]/60 font-mono">54s</span>
            <button
              disabled={cooldown > 0}
              onClick={async () => {
                try {
                  await resendOtp({ email });
                  setServerError(null);
                  setAttemptsLeft(5);
                  setIsLocked(false);
                  setCooldown(60);
                } catch {
                  setServerError("Failed to resend OTP");
                }
              }}
              className={`font-bold transition-colors ${
                cooldown > 0
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-white hover:text-[#7c5dfa]"
              }`}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Now"}
            </button>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-white transition-colors mx-auto"
          >
            <ArrowLeftIcon className="w-3 h-3" />
            Change Email Address
          </button>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-12 text-center space-y-6">
          <p className="text-[10px] text-gray-600 tracking-widest uppercase font-bold">
            Standard messaging rates may apply
          </p>
          <div className="flex justify-center gap-4">
            <span className="px-4 py-1.5 rounded-full border border-gray-800 text-[9px] text-gray-500 font-bold uppercase tracking-tighter bg-[#16161d]/50">
              Secure 256-bit AES
            </span>
            <span className="px-4 py-1.5 rounded-full border border-gray-800 text-[9px] text-gray-500 font-bold uppercase tracking-tighter bg-[#16161d]/50">
              GDPR Compliant
            </span>
          </div>
        </div>
      </div>

      {/* Grid Pattern Decoration (Bottom Left) */}
      <div className="absolute bottom-10 left-10 grid grid-cols-3 gap-1 opacity-20">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-[#7c5dfa] rounded-full"></div>
        ))}
      </div>
    </div>
  );
}
