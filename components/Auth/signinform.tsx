"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Toast from "@/components/ui/Toast";

export default function SigninForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setform] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");
  const [errors, setErrors] = useState<Record<string, string[]>>({
    firstName: [],
    lastName: [],
    email: [],
    password: [],
  });
  const alertedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
    type: "success" as "success" | "error",
  });

  useEffect(() => {
    if (alertedRef.current || !status) return;
    if (status === "success" || status === "error") {
      setToast({
        isOpen: true,
        message:
          message ||
          (status === "success" ? "Operation successful" : "Operation failed"),
        type: status as "success" | "error",
      });
    }
    alertedRef.current = true;
  }, [status, message]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setform({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: [] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({
        email: form.email.toLowerCase().trim(),
        password: form.password.trim(),
      });
      router.push("/?status=success&message=Logged in successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const validationErrors = err.response?.data?.errors;
      if (validationErrors && Array.isArray(validationErrors)) {
        const newErrors: Record<string, string[]> = {
          firstName: [],
          lastName: [],
          email: [],
          password: [],
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          message: err.response?.data?.message || "Signin failed",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex bg-[#000000]">
      {/* ── Left panel: Branding ── */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-12 relative overflow-hidden border-r border-white/[0.06]">
        {/* Ambient glow */}
        <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-[#0F9BD0]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#0F9BD0]/5 blur-[100px] rounded-full" />
        {/* Grid */}
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
              Welcome back to your workspace
            </h2>
            <p className="text-white/40 text-base leading-relaxed">
              Sign in to continue building. Your projects, settings, and data
              are waiting.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "JWT & Google OAuth",
              "Protected dashboard routes",
              "Persistent session via localStorage",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#0F9BD0]/20 border border-[#0F9BD0]/40 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-[#0F9BD0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-white/50 text-sm">{item}</span>
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
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="fixed inset-0 overflow-hidden pointer-events-none lg:hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0F9BD0]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0F9BD0]/5 blur-[120px] rounded-full" />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <span className="text-[#0F9BD0] text-xl font-bold tracking-tight">
              MatemboDev+
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Sign in
            </h1>
            <p className="text-white/40 text-sm">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/60 ml-0.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                className={`w-full bg-white/[0.04] border text-white text-sm rounded-xl px-4 py-3.5 outline-none transition-all duration-200 placeholder:text-white/20 focus:bg-white/[0.07] ${
                  errors.email.length > 0
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/[0.08] focus:border-[#0F9BD0]/60"
                }`}
                value={form.email}
                onChange={handleChange}
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
              <div className="flex justify-between items-center ml-0.5">
                <label className="text-sm font-medium text-white/60">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-[#0F9BD0] hover:text-[#0F9BD0]/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-white/[0.04] border text-white text-sm rounded-xl px-4 py-3.5 pr-12 outline-none transition-all duration-200 placeholder:text-white/20 focus:bg-white/[0.07] ${
                    errors.password.length > 0
                      ? "border-red-500/50 focus:border-red-500/70"
                      : "border-white/[0.08] focus:border-[#0F9BD0]/60"
                  }`}
                  value={form.password}
                  onChange={handleChange}
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
                {errors.password.length > 0 && (
                  <span className="text-red-400 text-[11px] ml-0.5 mt-1 block">
                    {errors.password[0]}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0F9BD0] hover:bg-[#0F9BD0]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl mt-1 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#0F9BD0]/20 text-sm tracking-wide"
            >
              {isLoading ? (
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
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>

            <div className="relative my-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#000000] px-3 text-white/25 uppercase tracking-widest">
                  or
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.14] text-white text-sm font-medium py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <Image
                src="/Logo-google-icon-PNG.png"
                alt="Google"
                height={18}
                width={18}
              />
              Continue with Google
            </button>
          </form>

          <p className="text-center text-sm text-white/30 mt-8">
            Don&apos;t have an account?{" "}
            <Link
              className="text-[#0F9BD0] font-medium hover:underline"
              href="/signup"
            >
              Create one
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

// "use client";

// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { useAuth } from "@/app/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { EyeCloseIcon, EyeIcon } from "@/icons";
// import Toast from "@/components/ui/Toast";

// export default function SigninForm() {
//   const { login } = useAuth();
//   const router = useRouter();
//   const [form, setform] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const searchParams = useSearchParams();
//   const status = searchParams.get("status");
//   const message = searchParams.get("message");
//   const [errors, setErrors] = useState<Record<string, string[]>>({
//     firstName: [],
//     lastName: [],
//     email: [],
//     password: [],
//   });
//   const alertedRef = useRef(false);

//   const [toast, setToast] = useState({
//     isOpen: false,
//     message: "",
//     type: "success" as "success" | "error",
//   });

//   useEffect(() => {
//     if (alertedRef.current) return;
//     if (!status) return;

//     if (status === "success" || status === "error") {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setToast({
//         isOpen: true,
//         message:
//           message ||
//           (status === "success" ? "Operation successful" : "Operation failed"),
//         type: status as "success" | "error",
//       });
//     }

//     alertedRef.current = true;
//   }, [status, message]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setform({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login({
//         email: form.email.toLowerCase().trim(),
//         password: form.password.trim(),
//       });
//       router.push("/?status=success&message=Logged in successfully");
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
//           message: err.response?.data?.message || "Signin failed",
//           type: "error",
//         });
//       }
//     }
//   };

//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:4000/api/auth/google";
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black p-4">
//       {/* Background Decorative Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0F9BD0]/10 blur-[120px] rounded-full" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0F9BD0]/5 blur-[120px] rounded-full" />
//       </div>

//       <div className="w-full max-w-md relative z-10">
//         <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
//           <div className="flex flex-col gap-2 mb-8">
//             <h1 className="text-3xl font-bold text-white tracking-tight">
//               Welcome back
//             </h1>
//             <p className="text-white/50 text-sm">
//               Please enter your details to sign in.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-medium text-white/70 ml-1">
//                 Email address
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="name@company.com"
//                   className={`w-full bg-white/5 border text-white text-sm rounded-2xl px-4 py-3.5 outline-none transition-all duration-200 focus:bg-white/10 ${
//                     errors.email.length > 0
//                       ? "border-red-500/50"
//                       : "border-white/10 focus:border-[#0F9BD0]/50"
//                   }`}
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.email.length > 0 && (
//                   <span className="text-red-400 text-[11px] mt-1 ml-1 block animate-in fade-in duration-200">
//                     {errors.email[0]}
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <div className="flex justify-between items-center ml-1">
//                 <label className="text-sm font-medium text-white/70">
//                   Password
//                 </label>
//                 <Link
//                   href="#"
//                   className="text-xs text-[#0F9BD0] hover:text-[#0F9BD0]/80 transition-colors"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className={`w-full bg-white/5 border text-white text-sm rounded-2xl px-4 py-3.5 pr-12 outline-none transition-all duration-200 focus:bg-white/10 ${
//                     errors.password.length > 0
//                       ? "border-red-500/50"
//                       : "border-white/10 focus:border-[#0F9BD0]/50"
//                   }`}
//                   value={form.password}
//                   onChange={handleChange}
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
//                 {errors.password.length > 0 && (
//                   <span className="text-red-400 text-[11px] mt-1 ml-1 block animate-in fade-in duration-200">
//                     {errors.password[0]}
//                   </span>
//                 )}
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-[#0F9BD0] hover:bg-[#0F9BD0]/90 text-white font-semibold py-3.5 rounded-2xl mt-2 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#0F9BD0]/20"
//             >
//               Sign in
//             </button>

//             <div className="relative my-2">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-white/5"></div>
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-[#0a0a0a] px-2 text-white/30">
//                   Or continue with
//                 </span>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={handleGoogleLogin}
//               className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium py-3.5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer"
//             >
//               <Image
//                 src="/Logo-google-icon-PNG.png"
//                 alt="Google"
//                 height={20}
//                 width={20}
//               />
//               Continue with Google
//             </button>
//           </form>

//           <p className="text-center text-sm text-white/50 mt-8">
//             Don&apos;t have an account?{" "}
//             <Link
//               className="text-[#0F9BD0] font-medium hover:underline"
//               href="/signup"
//             >
//               Sign up
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
