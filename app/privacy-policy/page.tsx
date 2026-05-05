import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-[#242424]">
      <NavBar />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tighter">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#b9b9b9] mb-12 uppercase tracking-widest font-semibold">
          Last updated: February 25, 2026
        </p>

        <section className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-[#b9b9b9] leading-relaxed">
              At Matembo Tech, we are committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, and safeguard your
              information when you visit our website or use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Information We Collect
            </h2>
            <p className="text-[#b9b9b9] leading-relaxed">
              We may collect personal information that you provide to us, such
              as your name, email address, and any other information you choose
              to provide when contacting us or signing up for our newsletter.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-[#b9b9b9] leading-relaxed">
              We use your information to provide and improve our services,
              communicate with you, send you updates, and for other internal
              business purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Data Protection
            </h2>
            <p className="text-[#b9b9b9] leading-relaxed">
              We implement a variety of security measures to maintain the safety
              of your personal information. However, no method of transmission
              over the Internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Contact Us
            </h2>
            <p className="text-[#b9b9b9] leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at support@matembotech.com.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
