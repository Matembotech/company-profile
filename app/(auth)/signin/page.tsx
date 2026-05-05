import SigninForm from "@/components/Auth/signinform"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Matembo Signin Page Template",
  description: "This is MatemboDev+ Signin Page Template",
};

export default function SigninPage() {
  return (
    <Suspense>
      <SigninForm />
    </Suspense>
  );
}