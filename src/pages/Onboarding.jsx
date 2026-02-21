import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "../validation/onboardingSchema";
import { createOrganization } from "../services/authService"; // Assume you have a getIndustries service
import { useNavigate } from "react-router-dom";
import { BuildingOfficeIcon, TagIcon, BriefcaseIcon, CloudArrowUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { getIndustries } from "../services/authService";
export default function Onboarding() {
  const navigate = useNavigate();
  const [industries, setIndustries] = useState([]);
  const [loadingIndustries, setLoadingIndustries] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  // Fetch industries from your DB/API on component mount
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        // Replace with your actual API call, e.g., await axios.get('/api/industries')
        // await industries()
        const response = await getIndustries();
        setIndustries(response.data);
        
       
      } catch (error) {
        console.error("Failed to fetch industries", error);
      } finally {
        setLoadingIndustries(false);
      }
    };

    fetchIndustries();
  }, []);

  const onSubmit = async (data) => {
    try {
      await createOrganization(data);
      navigate("/dashboard");
    } catch {
      alert("Organization creation failed");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f0f13] text-white font-sans flex items-center justify-center overflow-hidden p-6">
      
      {/* --- BACKGROUND GLOWS --- */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-[#16161d]/90 backdrop-blur-2xl rounded-[2.5rem] border border-gray-800 shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="p-10 pb-0 flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#7c5dfa] uppercase tracking-[0.3em]">Workspace Setup</span>
              <h2 className="text-4xl font-bold">Tell us about your organization</h2>
              <p className="text-gray-500 text-sm">This helps us customize your workspace and brand settings.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-[#7c5dfa] uppercase tracking-widest">100% Complete</span>
              <div className="w-32 h-1.5 bg-gray-800 rounded-full mt-2 overflow-hidden">
                <div className="w-full h-full bg-[#7c5dfa] shadow-[0_0_10px_#7c5dfa]"></div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Left Column: Form Fields */}
              <div className="space-y-6">
                {/* Org Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    <BuildingOfficeIcon className="w-4 h-4" /> Organization Name
                  </label>
                  <input
                    placeholder="e.g. Acme Creative Agency"
                    {...register("name")}
                    className="w-full bg-[#1c1c24] border border-gray-800 rounded-xl py-4 px-5 focus:outline-none focus:border-[#7c5dfa] focus:ring-1 focus:ring-[#7c5dfa]/40 transition-all text-white placeholder-gray-700"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Industry Dropdown */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    <BriefcaseIcon className="w-4 h-4" /> Industry
                  </label>
                  <div className="relative">
                    <select
                      {...register("industry")}
                      className="w-full bg-[#1c1c24] border border-gray-800 rounded-xl py-4 px-5 focus:outline-none focus:border-[#7c5dfa] focus:ring-1 focus:ring-[#7c5dfa]/40 transition-all text-white appearance-none cursor-pointer disabled:opacity-50"
                      disabled={loadingIndustries}
                      defaultValue=""
                    >
                      <option value="" disabled className="bg-[#1c1c24]">
                        {loadingIndustries ? "Loading industries..." : "Select an industry"}
                      </option>
                      {industries.map((item) => (
                        <option key={item.id} value={item.id} className="bg-[#1c1c24]">
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                  {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry.message}</p>}
                </div>

                {/* Tagline */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    <TagIcon className="w-4 h-4" /> Tagline (Optional)
                  </label>
                  <input
                    placeholder="Briefly describe your mission"
                    {...register("tagline")}
                    className="w-full bg-[#1c1c24] border border-gray-800 rounded-xl py-4 px-5 focus:outline-none focus:border-[#7c5dfa] focus:ring-1 focus:ring-[#7c5dfa]/40 transition-all text-white placeholder-gray-700"
                  />
                </div>

                <div className="bg-[#1c1c24]/50 border border-gray-800/50 p-4 rounded-xl flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-[#7c5dfa] flex items-center justify-center text-[10px] text-[#7c5dfa]">✓</div>
                  <p className="text-[10px] text-gray-500 font-medium">Settings can be modified later in the dashboard.</p>
                </div>
              </div>

              {/* Right Column: Visual Upload */}
              {/* <div className="flex flex-col justify-center items-center border-2 border-dashed border-gray-800 rounded-[2rem] p-8 bg-[#0f0f13]/30 group hover:border-[#7c5dfa]/50 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-[#1c1c24] border border-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CloudArrowUpIcon className="w-8 h-8 text-[#7c5dfa]" />
                </div>
                <h3 className="font-bold text-lg mb-1">Click to upload logo</h3>
                <p className="text-gray-500 text-xs uppercase tracking-tighter">PNG, JPG up to 5MB</p>
              </div> */}
            </div>

            {/* Form Footer */}
            <div className="mt-12 pt-8 border-t border-gray-800/50 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#7c5dfa] hover:bg-[#6a4df4] disabled:opacity-50 text-white font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_10px_20px_rgba(124,93,250,0.2)] active:scale-[0.98]"
              >
                {isSubmitting ? "Saving..." : "Complete Setup"} 
                {!isSubmitting && <span className="text-xl">→</span>}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Trust Icons */}
        <div className="mt-10 flex justify-center items-center gap-10 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center text-[10px] text-purple-400">SOC2</div>
            <span className="text-[9px] font-bold tracking-widest uppercase">SOC2 COMPLIANT</span>
          </div>
          <div className="flex items-center gap-2 font-bold tracking-widest text-[9px]">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            GDPR READY
          </div>
          <div className="flex items-center gap-1 font-bold tracking-widest text-[9px]">
            <span className="text-green-500 text-lg leading-none">✓</span>
            SSL SECURED
          </div>
        </div>
      </div>

      <footer className="absolute bottom-6 w-full flex justify-between px-10 text-[9px] text-gray-600 font-bold tracking-[0.2em] uppercase">
        <p>© 2026 MFP Platform. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}