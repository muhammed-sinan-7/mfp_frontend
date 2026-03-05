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
      const { access, refresh, org_id, org_name, role } = response.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      if (org_id) {
        localStorage.setItem("orgId", org_id);
        localStorage.setItem("orgName", org_name);
        localStorage.setItem("role", role);
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Sign in to MFP
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Enter your credentials to access your marketing dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="name@company.com"
                {...register("email")}
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <span className="text-xs text-blue-600 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Keep me signed in for 30 days
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-3 text-xs text-gray-400 uppercase">
            OR CONTINUE WITH
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Social Buttons (UI Only) */}
        {/* <div className="space-y-3">
          <button className="w-full border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50">
            Sign in with LinkedIn
          </button>
          <button className="w-full border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50">
            Sign in with Meta
          </button>
          <button className="w-full border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50">
            Sign in with YouTube
          </button>
        </div> */}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Don’t have an account yet?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Create an organization
          </Link>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <div className="text-xs text-gray-400 uppercase mb-4">
            Systems Operational
          </div>
          <div className="flex justify-center gap-8 text-sm text-gray-700">
            <div>
              <div className="font-semibold">99.9%</div>
              <div className="text-xs text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="font-semibold">SOC2</div>
              <div className="text-xs text-gray-400">Certified</div>
            </div>
            <div>
              <div className="font-semibold">256-bit</div>
              <div className="text-xs text-gray-400">AES</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}