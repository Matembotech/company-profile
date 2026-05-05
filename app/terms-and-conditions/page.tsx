import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col min-h-screen bg-[#242424]">
      <NavBar />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tighter">
          Terms & Conditions
        </h1>
        <p className="text-sm text-[#b9b9b9] mb-12 uppercase tracking-widest font-semibold">
          Last updated: February 25, 2026
        </p>

        <section className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-[#b9b9b9] leading-relaxed">
              By accessing or using the services provided by Matembo Tech, you
              agree to be bound by these Terms & Conditions. If you do not agree
              to these terms, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Use of Services
            </h2>
            <p className="text-[#b9b9b9] leading-relaxed">
              You agree to use our services only for lawful purposes and in a
              way that does not infringe the rights of others or restrict or
              inhibit anyone else&apos;s use and enjoyment of the services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. Intellectual Property
            </h2>
            <p className="text-[#b9b9b9] leading-relaxed">
              All content on our website and provided through our services,
              including text, graphics, logos, and software, is the property of
              Matembo Tech and is protected by intellectual property laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Limitation of Liability
            </h2>
            <p className="text-[#b9b9b9] leading-relaxed">
              Matembo Tech shall not be liable for any indirect, incidental,
              special, or consequential damages resulting from the use or
              inability to use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Termination
            </h2>
            <p className="text-[#b9b9b9] leading-relaxed">
              We reserve the right to terminate or suspend your access to our
              services at any time, without prior notice, for conduct that we
              believe violates these terms or is harmful to other users.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
