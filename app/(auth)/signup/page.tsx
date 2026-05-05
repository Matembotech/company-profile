import SignupForm from "@/components/Auth/signupform";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Matembo Signup Page Template",
  description: "This is MatemboDev+ Signup Page Template",
};


export default function SignupPage() {
  return <SignupForm />;
}