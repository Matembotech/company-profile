"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Mail,
  Phone,
  MapPin,
  Globe,
  Smartphone,
  Palette,
  Loader2,
  Send,
  ChevronRight,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */

type FormData = {
  name: string;
  email: string;
  phone: string;
  projectType: "website" | "app" | "graphics" | "";
  budget: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const BUDGET_OPTIONS = [
  "Under Tsh 150,000",
  "Tsh 150,000 – Tsh 1,000,000",
  "Tsh 1,000,000 – Tsh 2,000,000",
  "Tsh 2,000,000+",
];

const PROJECT_TYPES = [
  { value: "website" as const, label: "Web Design", icon: Globe },
  { value: "app" as const, label: "App Design", icon: Smartphone },
  { value: "graphics" as const, label: "Graphics Design", icon: Palette },
];

const TOTAL_STEPS = 4;

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setTouched((prev) => new Set(prev).add(field));
      // Clear error on change
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors],
  );

  /* ── Validation per step ── */
  const validateStep = useCallback(
    (s: number): boolean => {
      const errs: FormErrors = {};
      if (s === 1) {
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.email.trim()) errs.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
          errs.email = "Enter a valid email";
      }
      if (s === 2) {
        if (!form.projectType) errs.projectType = "Select a project type";
      }
      if (s === 3) {
        if (!form.budget) errs.budget = "Select a budget range";
        if (!form.message.trim()) errs.message = "Describe your project";
      }
      setErrors(errs);
      setTouched(
        (prev) =>
          new Set([...prev, ...Object.keys(errs)]),
      );
      return Object.keys(errs).length === 0;
    },
    [form],
  );

  const goNext = () => {
    if (validateStep(step)) {
      if (step === 3) {
        handleSubmit();
      } else {
        setStep((s) => s + 1);
      }
    }
  };

  const goBack = () => {
    setApiError("");
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          project_type: form.projectType,
          budget: form.budget,
          message: form.message.trim(),
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Submission failed");
      setStep(4);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Try again.";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (field: keyof FormData) =>
    touched.has(field) && errors[field] ? errors[field] : null;

  /* ── Styles ── */
  const inputClass = (field: keyof FormData) =>
    `w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors duration-200 ${
      fieldError(field)
        ? "border-red-500/60 focus:border-red-400"
        : "border-white/[0.08] focus:border-[#0F9BD0]"
    }`;

  return (
    <div className="relative bg-[#242424] min-h-screen overflow-x-hidden">
      <NavBar />
      <hr className="w-full border-[#0F9BD0] border-t-1 rounded-full" />

      <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* ── Two-column layout ── */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* LEFT — Branding */}
            <div className="flex-1 lg:w-2/5 pt-0 lg:pt-4 gap-2 flex flex-col">
              <motion.h6
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[0.85rem] font-semibold text-[#0F9BD0] tracking-[0.2em] uppercase mb-4"
              >
                Get In Touch
              </motion.h6>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[2.5rem] sm:text-[3.5rem] font-extrabold text-[#FFFFFF] tracking-tighter leading-[1.05] mb-6"
              >
                Let&apos;s Work
                <br />
                Together
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#b9b9b9] text-base leading-relaxed mb-10 max-w-md"
              >
                Have a project in mind or a question about our services?
                We&apos;d love to hear from you. Fill out the form and our team
                will get back to you within 24–48 hours.
              </motion.p>

              {/* Contact details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-5 mb-10"
              >
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    detail: "ibrahimmaulid551@gmail.com",
                  },
                  { icon: Phone, label: "Phone", detail: "+255 694 228 418" },
                  {
                    icon: MapPin,
                    label: "Location",
                    detail: "Temeke, Dar es Salaam, Tanzania",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0F9BD0]/10 border border-[#0F9BD0]/20 flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-[#0F9BD0]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">
                        {item.label}
                      </span>
                      <span className="text-xs text-[#b9b9b9]">
                        {item.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Form card */}
            <div className="flex-1 lg:w-3/5">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="rounded-2xl sm:rounded-2xl border overflow-hidden"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.02)",
                }}
              >
                {/* Progress indicator */}
                <div
                  className="px-6 sm:px-8 py-5 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#b9b9b9] uppercase tracking-wider">
                      Step {step} of {TOTAL_STEPS}
                    </span>
                    <span className="text-xs text-[#b9b9b9]/50">
                      {step === 1
                        ? "About You"
                        : step === 2
                          ? "Project Type"
                          : step === 3
                            ? "Details"
                            : "Done"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                      <div
                        key={i}
                        className="h-1.5 rounded-full flex-1 transition-all duration-300"
                        style={{
                          backgroundColor:
                            step === TOTAL_STEPS
                              ? "#0F9BD0"
                              : i + 1 <= step
                                ? "#0F9BD0"
                                : "rgba(255,255,255,0.08)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Step content */}
                <div className="px-6 sm:px-8 py-8 min-h-[360px]">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <StepWrapper key="step1">
                        <h3 className="text-xl font-bold text-white mb-6">
                          Who are you?
                        </h3>
                        <div className="flex flex-col gap-5">
                          <Field label="Full Name" error={fieldError("name")}>
                            <input
                              type="text"
                              value={form.name}
                              onChange={(e) =>
                                updateField("name", e.target.value)
                              }
                              placeholder="John Doe"
                              className={inputClass("name")}
                            />
                          </Field>
                          <Field label="Email Address" error={fieldError("email")}>
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) =>
                                updateField("email", e.target.value)
                              }
                              placeholder="john@example.com"
                              className={inputClass("email")}
                            />
                          </Field>
                          <Field label="Phone Number" hint="Optional">
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) =>
                                updateField("phone", e.target.value)
                              }
                              placeholder="+255 7XX XXX XXX"
                              className={inputClass("phone")}
                            />
                          </Field>
                        </div>
                        <StepNav onNext={goNext} />
                      </StepWrapper>
                    )}

                    {step === 2 && (
                      <StepWrapper key="step2">
                        <h3 className="text-xl font-bold text-white mb-2">
                          What do you need?
                        </h3>
                        <p className="text-sm text-[#b9b9b9] mb-6">
                          Select the type of project you&apos;re interested in.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                          {PROJECT_TYPES.map((pt) => {
                            const selected = form.projectType === pt.value;
                            return (
                              <button
                                key={pt.value}
                                type="button"
                                onClick={() =>
                                  updateField("projectType", pt.value)
                                }
                                className={`flex flex-col items-center gap-3 p-5 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                                  selected
                                    ? "border-[#0F9BD0] bg-[#0F9BD0]/10 shadow-[0_0_16px_rgba(15,155,208,0.15)]"
                                    : "border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02]"
                                }`}
                              >
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                                    selected
                                      ? "bg-[#0F9BD0] text-white"
                                      : "bg-white/[0.04] text-[#b9b9b9]"
                                  }`}
                                >
                                  <pt.icon size={22} />
                                </div>
                                <span
                                  className={`text-sm font-semibold ${
                                    selected ? "text-white" : "text-[#b9b9b9]"
                                  }`}
                                >
                                  {pt.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        {fieldError("projectType") && (
                          <p className="text-red-400 text-xs -mt-4 mb-4">
                            {fieldError("projectType")}
                          </p>
                        )}
                        <StepNav onNext={goNext} onBack={goBack} />
                      </StepWrapper>
                    )}

                    {step === 3 && (
                      <StepWrapper key="step3">
                        <h3 className="text-xl font-bold text-white mb-2">
                          Project details
                        </h3>
                        <p className="text-sm text-[#b9b9b9] mb-6">
                          Tell us about your budget and what you need.
                        </p>
                        <div className="flex flex-col gap-5">
                          <Field label="Budget Range" error={fieldError("budget")}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {BUDGET_OPTIONS.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => updateField("budget", opt)}
                                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium text-left transition-all duration-200 cursor-pointer ${
                                    form.budget === opt
                                      ? "border-[#0F9BD0] bg-[#0F9BD0]/10 text-white"
                                      : "border-white/[0.08] text-[#b9b9b9] hover:border-white/[0.15]"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </Field>
                          <Field
                            label="Describe your project"
                            error={fieldError("message")}
                          >
                            <textarea
                              value={form.message}
                              onChange={(e) =>
                                updateField("message", e.target.value)
                              }
                              placeholder="Tell us about your goals, timeline, and any specific requirements..."
                              rows={5}
                              maxLength={1000}
                              className={`${inputClass("message")} resize-none`}
                            />
                            <span className="text-[10px] text-[#b9b9b9]/40 mt-1 block text-right">
                              {form.message.length} / 1000
                            </span>
                          </Field>
                        </div>
                        {apiError && (
                          <p className="text-red-400 text-xs mt-4 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {apiError}
                          </p>
                        )}
                        <StepNav
                          onNext={goNext}
                          onBack={goBack}
                          nextLabel="Submit"
                          loading={loading}
                        />
                      </StepWrapper>
                    )}

                    {step === 4 && (
                      <StepWrapper key="step4">
                        <div className="flex flex-col items-center text-center py-8">
                          {/* Checkmark animation */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 16,
                            }}
                            className="w-20 h-20 rounded-full bg-[#0F9BD0]/10 border-2 border-[#0F9BD0] flex items-center justify-center mb-6"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <Check size={36} className="text-[#0F9BD0]" />
                            </motion.div>
                          </motion.div>

                          <h3 className="text-2xl font-extrabold text-white mb-3">
                            Thank You!
                          </h3>
                          <p className="text-sm text-[#b9b9b9] leading-relaxed max-w-sm mb-8">
                            Your message has been received. Our team will review
                            your request and get back to you within 24–48 hours.
                          </p>

                          <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-[#0F9BD0] hover:bg-[#0c7ea9] text-white font-bold py-3 px-7 rounded-full transition-colors duration-300 shadow-[0_0_20px_rgba(15,155,208,0.25)] cursor-pointer"
                          >
                            Back to Home
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      </StepWrapper>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────── */

function StepWrapper({
  children,
  ...rest
}: { children: React.ReactNode } & Record<string, unknown>) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-white">{label}</span>
        {hint && (
          <span className="text-[10px] text-[#b9b9b9]/50">{hint}</span>
        )}
      </div>
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

function StepNav({
  onNext,
  onBack,
  nextLabel = "Next",
  loading = false,
}: {
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  loading?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-[#b9b9b9] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} />
          Back
        </button>
      ) : (
        <div />
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={loading}
        className="flex items-center gap-2 bg-[#0F9BD0] hover:bg-[#0c7ea9] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2.5 px-6 rounded-full transition-colors duration-300 shadow-[0_0_16px_rgba(15,155,208,0.25)] cursor-pointer text-sm"
      >
        {loading ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            {nextLabel}
            {nextLabel !== "Submit" ? (
              <ChevronRight size={15} />
            ) : (
              <Send size={14} />
            )}
          </>
        )}
      </button>
    </div>
  );
}
