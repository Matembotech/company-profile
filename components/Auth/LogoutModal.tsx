"use client";

import React from "react";
import { LogOut } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      {/* Backdrop blur separately to ensure it works */}
      <div className="absolute inset-0 backdrop-blur-sm" />

      <div
        className="relative bg-[#0f0f0f] border border-white/[0.09] rounded-2xl p-7 max-w-sm w-full shadow-2xl flex flex-col gap-5 animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <LogOut size={20} className="text-red-400" />
        </div>

        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Sign out?
          </h2>
          <p className="text-white/40 text-sm leading-relaxed">
            You&apos;ll need to sign in again to access your account and
            projects.
          </p>
        </div>

        <div className="flex gap-2.5 mt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.07] hover:border-white/[0.12] text-white/70 hover:text-white text-sm font-medium rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 bg-red-500/90 hover:bg-red-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] shadow-lg shadow-red-500/20"
          >
            Yes, sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

// "use client";

// import React from "react";
// import { RaisedButton } from "../ui/raised-button";

// interface LogoutModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
// }

// const LogoutModal: React.FC<LogoutModalProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-300">
//       <div
//         className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col gap-6 animate-in zoom-in-95 duration-300"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex flex-col gap-2">
//           <h2 className="text-2xl font-bold text-white tracking-tight">
//             Confirm Logout
//           </h2>
//           <p className="text-white/60 text-sm">
//             Are you sure you want to sign out from your account?
//           </p>
//         </div>

//         <div className="flex flex-row gap-3 mt-2">
//           <button
//             onClick={onClose}
//             className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl transition duration-200"
//           >
//             No, stay
//           </button>
//           <div className="flex-1">
//             <RaisedButton
//               onClick={onConfirm}
//               color="#0F9BD0"
//               className="w-full"
//             >
//               Yes, logout
//             </RaisedButton>
//           </div>
//         </div>
//       </div>
//       {/* Overlay click to close */}
//       <div className="absolute inset-0 -z-10" onClick={onClose} />
//     </div>
//   );
// };

// export default LogoutModal;
