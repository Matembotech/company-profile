"use client";

import React, { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  type?: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({
  message,
  isOpen,
  onClose,
  type = "success",
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-right-10 fade-in duration-500">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 min-w-[300px] backdrop-blur-xl">
        <div
          className={`p-2 rounded-full ${type === "success" ? "bg-[#0F9BD0]/20" : "bg-red-500/20"}`}
        >
          {type === "success" ? (
            <CheckCircle className="w-6 h-6 text-[#0F9BD0]" />
          ) : (
            <CheckCircle className="w-6 h-6 text-red-500 rotate-45" />
          )}
        </div>

        <div className="flex-1">
          <p className="text-white text-sm font-semibold">
            {type === "success" ? "Success" : "Error"}
          </p>
          <p className="text-white/60 text-xs">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="p-1 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white/70"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
