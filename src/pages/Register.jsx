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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create your account
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Start your 14-day free trial. No credit card required.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Organization Section (UI only, not registered) */}
         

          {/* Admin Access Section */}
          <div className="space-y-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Administrator Access
            </label>

            {/* Email */}
            <div>
              <div className="relative">
                <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="work@company.com"
                  {...register("email")}
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Security
            </label>

            {/* Password */}
            <div>
              <div className="relative">
                <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Create password"
                  {...register("password")}
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <p className="text-xs text-gray-400">
              Password must be at least 12 characters and include a mix of uppercase, numbers, and symbols.
            </p>
          </div>

          {/* Enterprise Notice (UI Only) */}
          

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-xs text-gray-600">
              I agree to the{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Privacy Policy
              </span>.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200"></div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </div>

        <div className="mt-10 text-center text-xs text-gray-400">
          <div className="flex justify-center gap-8">
            <div>
              <div className="font-semibold text-gray-800">LinkedIn Ads</div>
            </div>
            <div>
              <div className="font-semibold text-gray-800">Meta Business</div>
            </div>
            <div>
              <div className="font-semibold text-gray-800">YouTube Analytics</div>
            </div>
          </div>
          <p className="mt-4">
            Connect your social accounts in Step 3 of onboarding to sync marketing data.
          </p>
        </div>
      </div>
    </div>
  );
}