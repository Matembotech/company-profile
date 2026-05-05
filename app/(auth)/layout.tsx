import { AuthProvider } from "../context/AuthContext";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#181818] min-h-screen">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
