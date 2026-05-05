/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeCloseIcon } from "@/icons";
import Image from "next/image";
import Toast from "@/components/ui/Toast";

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const map = [
    { score: 1, label: "Weak", color: "#ef4444" },
    { score: 2, label: "Fair", color: "#f97316" },
    { score: 3, label: "Good", color: "#eab308" },
    { score: 4, label: "Strong", color: "#22c55e" },
  ];
  return map[score - 1] || { score: 0, label: "", color: "" };
}

export default function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setform] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({
    firstName: [],
    lastName: [],
    email: [],
    password: [],
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const pwStrength = getPasswordStrength(form.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setform({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: [] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ firstName: [], lastName: [], email: [], password: [] });
    try {
      await signup(form);
      router.push(
        "/signin?status=success&message=Account created successfully, please sign in",
      );
    } catch (err: any) {
      const validationErrors = err.response?.data?.errors;
      if (validationErrors && Array.isArray(validationErrors)) {
        const newErrors: Record<string, string[]> = {
          firstName: [],
          lastName: [],
          email: [],
          password: [],
        };
        validationErrors.forEach((error: any) => {
          const errorMsg = error.msg;
          if (errorMsg.toLowerCase().includes("first name"))
            newErrors.firstName.push(errorMsg);
          else if (errorMsg.toLowerCase().includes("last name"))
            newErrors.lastName.push(errorMsg);
          else if (errorMsg.toLowerCase().includes("email"))
            newErrors.email.push(errorMsg);
          else if (errorMsg.toLowerCase().includes("password"))
            newErrors.password.push(errorMsg);
        });
        setErrors(newErrors);
      } else {
        setToast({
          isOpen: true,
          message: err.response?.data?.message || "Signup failed",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-white/[0.04] border text-white text-sm rounded-xl px-4 py-3 outline-none transition-all duration-200 placeholder:text-white/20 focus:bg-white/[0.07] ${
      errors[field]?.length > 0
        ? "border-red-500/50 focus:border-red-500/70"
        : "border-white/[0.08] focus:border-[#0F9BD0]/60"
    }`;

  return (
    <div className="min-h-screen flex bg-[#000000]">
      {/* ── Left panel: Branding ── */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-12 relative overflow-hidden border-r border-white/[0.06]">
        <div className="absolute top-[-20%] right-[-20%] w-[70%] h-[70%] bg-[#0F9BD0]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#0F9BD0]/5 blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#0F9BD0 1px, transparent 1px), linear-gradient(90deg, #0F9BD0 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#0F9BD0] text-xl font-bold tracking-tight">
              MatemboDev+
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Start building in minutes
            </h2>
            <p className="text-white/40 text-base leading-relaxed">
              Create your account and get instant access to the full startup
              template — auth, dashboard, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                icon: "⚡",
                title: "Instant setup",
                desc: "Auth wired to your backend on day one.",
              },
              {
                icon: "🔒",
                title: "Secure by default",
                desc: "JWT tokens, Google OAuth, and protected routes.",
              },
              {
                icon: "🚀",
                title: "Ship-ready scaffold",
                desc: "Dashboard, profile, and settings pages included.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-white text-sm font-semibold">
                    {item.title}
                  </p>
                  <p className="text-white/35 text-xs mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} MatemboDev+. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Right panel: Form ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative overflow-y-auto">
        <div className="fixed inset-0 overflow-hidden pointer-events-none lg:hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0F9BD0]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0F9BD0]/5 blur-[120px] rounded-full" />
        </div>

        <div className="w-full max-w-md relative z-10 py-8">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <span className="text-[#0F9BD0] text-xl font-bold tracking-tight">
              MatemboDev+
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Create account
            </h1>
            <p className="text-white/40 text-sm">
              Join MatemboDev to start building with AI.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/60 ml-0.5">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  className={inputClass("firstName")}
                  value={form.firstName}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                {errors.firstName.length > 0 && (
                  <span className="text-red-400 text-[11px] ml-0.5">
                    {errors.firstName[0]}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/60 ml-0.5">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  className={inputClass("lastName")}
                  value={form.lastName}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                {errors.lastName.length > 0 && (
                  <span className="text-red-400 text-[11px] ml-0.5">
                    {errors.lastName[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/60 ml-0.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                className={inputClass("email")}
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
              {errors.email.length > 0 && (
                <span className="text-red-400 text-[11px] ml-0.5">
                  {errors.email[0]}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/60 ml-0.5">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={inputClass("password") + " pr-12"}
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Image
                      src={EyeIcon}
                      height={18}
                      width={18}
                      alt="show"
                      className="invert opacity-60"
                    />
                  ) : (
                    <Image
                      src={EyeCloseIcon}
                      height={18}
                      width={18}
                      alt="hide"
                      className="invert opacity-60"
                    />
                  )}
                </button>
              </div>

              {/* Password strength bar */}
              {form.password && (
                <div className="space-y-1.5 mt-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor:
                            i <= pwStrength.score
                              ? pwStrength.color
                              : "rgba(255,255,255,0.08)",
                        }}
                      />
                    ))}
                  </div>
                  <p
                    className="text-[11px] ml-0.5"
                    style={{ color: pwStrength.color }}
                  >
                    {pwStrength.label} password
                  </p>
                </div>
              )}

              {errors.password.length > 0 && (
                <span className="text-red-400 text-[11px] ml-0.5">
                  {errors.password[0]}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F9BD0] hover:bg-[#0F9BD0]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl mt-2 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#0F9BD0]/20 text-sm tracking-wide"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Creating account…
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/30 mt-8">
            Already have an account?{" "}
            <Link
              className="text-[#0F9BD0] font-medium hover:underline"
              href="/signin"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />
    </div>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useAuth } from "@/app/context/AuthContext";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { EyeIcon, EyeCloseIcon } from "@/icons";
// import Image from "next/image";
// import Toast from "@/components/ui/Toast";

// export default function SignupForm() {
//   const { signup } = useAuth();
//   const router = useRouter();
//   const [form, setform] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });
//   // const [errors, seterrors] = useState({
//   //   firstName: "",
//   //   lastName: "",
//   //   email: "",
//   //   password: "",
//   // });

//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string[]>>({
//     firstName: [],
//     lastName: [],
//     email: [],
//     password: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({
//     isOpen: false,
//     message: "",
//     type: "success" as "success" | "error",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setform({ ...form, [e.target.name]: e.target.value });
//     // Clear errors for this field when user starts typing
//     setErrors({ ...errors, [e.target.name]: [] });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors({
//       firstName: [],
//       lastName: [],
//       email: [],
//       password: [],
//     });

//     try {
//       await signup(form);
//       router.push(
//         "/signin?status=success&message=Account created successfully, please sign in",
//       );
//     } catch (err: any) {
//       const validationErrors = err.response?.data?.errors;

//       if (validationErrors && Array.isArray(validationErrors)) {
//         // Group errors by field - parse the field name from the error message
//         const newErrors: Record<string, string[]> = {
//           firstName: [],
//           lastName: [],
//           email: [],
//           password: [],
//         };

//         validationErrors.forEach((error: any) => {
//           const errorMsg = error.msg;

//           // Map error messages to their corresponding fields
//           if (errorMsg.toLowerCase().includes("first name")) {
//             newErrors.firstName.push(errorMsg);
//           } else if (errorMsg.toLowerCase().includes("last name")) {
//             newErrors.lastName.push(errorMsg);
//           } else if (errorMsg.toLowerCase().includes("email")) {
//             newErrors.email.push(errorMsg);
//           } else if (errorMsg.toLowerCase().includes("password")) {
//             newErrors.password.push(errorMsg);
//           }
//         });

//         setErrors(newErrors);
//       } else {
//         setToast({
//           isOpen: true,
//           message: err.response?.data?.message || "Signup failed",
//           type: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black p-4">
//       {/* Background Decorative Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0F9BD0]/10 blur-[120px] rounded-full" />
//         <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0F9BD0]/5 blur-[120px] rounded-full" />
//       </div>

//       <div className="w-full max-w-lg relative z-10">
//         <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
//           <div className="flex flex-col gap-2 mb-8 text-center sm:text-left">
//             <h1 className="text-3xl font-bold text-white tracking-tight">
//               Create an account
//             </h1>
//             <p className="text-white/50 text-sm">
//               Join MatemboDev to start building with AI.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-white/70 ml-1">
//                   First name
//                 </label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="John"
//                   className={`w-full bg-white/5 border text-white text-sm rounded-2xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white/10 ${
//                     errors.firstName.length > 0
//                       ? "border-red-500/50"
//                       : "border-white/10 focus:border-[#0F9BD0]/50"
//                   }`}
//                   value={form.firstName}
//                   onChange={handleChange}
//                   disabled={loading}
//                   required
//                 />
//                 {errors.firstName.length > 0 && (
//                   <span className="text-red-400 text-[11px] mt-1 ml-1 block animate-in fade-in duration-200">
//                     {errors.firstName[0]}
//                   </span>
//                 )}
//               </div>

//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-white/70 ml-1">
//                   Last name
//                 </label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   placeholder="Doe"
//                   className={`w-full bg-white/5 border text-white text-sm rounded-2xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white/10 ${
//                     errors.lastName.length > 0
//                       ? "border-red-500/50"
//                       : "border-white/10 focus:border-[#0F9BD0]/50"
//                   }`}
//                   value={form.lastName}
//                   onChange={handleChange}
//                   disabled={loading}
//                   required
//                 />
//                 {errors.lastName.length > 0 && (
//                   <span className="text-red-400 text-[11px] mt-1 ml-1 block animate-in fade-in duration-200">
//                     {errors.lastName[0]}
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-medium text-white/70 ml-1">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="name@company.com"
//                 className={`w-full bg-white/5 border text-white text-sm rounded-2xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white/10 ${
//                   errors.email.length > 0
//                     ? "border-red-500/50"
//                     : "border-white/10 focus:border-[#0F9BD0]/50"
//                 }`}
//                 value={form.email}
//                 onChange={handleChange}
//                 disabled={loading}
//                 required
//               />
//               {errors.email.length > 0 && (
//                 <span className="text-red-400 text-[11px] mt-1 ml-1 block animate-in fade-in duration-200">
//                   {errors.email[0]}
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-medium text-white/70 ml-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className={`w-full bg-white/5 border text-white text-sm rounded-2xl px-4 py-3 pr-12 outline-none transition-all duration-200 focus:bg-white/10 ${
//                     errors.password.length > 0
//                       ? "border-red-500/50"
//                       : "border-white/10 focus:border-[#0F9BD0]/50"
//                   }`}
//                   value={form.password}
//                   onChange={handleChange}
//                   disabled={loading}
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <Image
//                       src={EyeIcon}
//                       height={20}
//                       width={20}
//                       alt="show"
//                       className="opacity-70 invert"
//                     />
//                   ) : (
//                     <Image
//                       src={EyeCloseIcon}
//                       height={20}
//                       width={20}
//                       alt="hide"
//                       className="opacity-70 invert"
//                     />
//                   )}
//                 </button>
//               </div>
//               {errors.password.length > 0 && (
//                 <span className="text-red-400 text-[11px] mt-1 ml-1 block animate-in fade-in duration-200">
//                   {errors.password[0]}
//                 </span>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#0F9BD0] hover:bg-[#0F9BD0]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-2xl mt-4 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#0F9BD0]/20"
//             >
//               {loading ? "Creating account..." : "Create account"}
//             </button>
//           </form>

//           <p className="text-center text-sm text-white/50 mt-8">
//             Already have an account?{" "}
//             <Link
//               className="text-[#0F9BD0] font-medium hover:underline"
//               href="/signin"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>

//       <Toast
//         isOpen={toast.isOpen}
//         message={toast.message}
//         type={toast.type}
//         onClose={() => setToast({ ...toast, isOpen: false })}
//       />
//     </div>
//   );
// }
