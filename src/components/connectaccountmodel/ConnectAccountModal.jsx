import { XMarkIcon } from "@heroicons/react/24/outline";
import { metaConnect, linkedinConnect } from "../../services/accountService";

function ConnectAccountModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleMetaConnect = async () => {
    try {
      const { authorization_url } = await metaConnect();
      window.location.href = authorization_url;
    } catch (error) {
      console.error("Meta connect failed:", error);
      alert("Failed to start Meta authentication.");
    }
  };

  const handleLinkedInConnect = async () => {
    try {
      const { authorization_url } = await linkedinConnect();
      window.location.href = authorization_url;
    } catch (error) {
      console.error("LinkedIn connect failed:", error);
      alert("Failed to start LinkedIn authentication.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#15151e] w-[500px] rounded-2xl p-8 border border-gray-800 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-6">Connect New Account</h2>

        <div className="space-y-4">

          {/* Meta */}
          <button
            onClick={handleMetaConnect}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl p-4 flex flex-col items-start"
          >
            <span className="font-semibold text-white">
              Facebook & Instagram
            </span>
            <span className="text-sm text-blue-100">
              Connect Meta business accounts
            </span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={handleLinkedInConnect}
            className="w-full bg-[#0A66C2] hover:bg-[#004182] transition rounded-xl p-4 flex flex-col items-start"
          >
            <span className="font-semibold text-white">
              LinkedIn
            </span>
            <span className="text-sm text-blue-100">
              Connect LinkedIn profile or organization
            </span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default ConnectAccountModal;