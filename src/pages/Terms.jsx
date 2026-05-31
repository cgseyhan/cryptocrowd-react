import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';

export default function Terms() {
  return (
    <div className="brutalist-container min-h-screen flex flex-col bg-background text-[rgb(var(--color-text))] selection:bg-accentBlue selection:text-white relative">
      <ThemeToggle />
      <Navbar />
      <main className="w-full flex-1 py-20 px-4 md:px-12 font-mono">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-16 border-b border-[color:var(--color-border)] pb-8">
            <h1 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4">
              Terms <span className="text-accentBlue italic">&</span> Conditions
            </h1>
            <p className="opacity-60 text-sm tracking-widest uppercase">Last Updated: April 13, 2026</p>
          </div>

          <div className="space-y-12 text-sm md:text-base leading-relaxed opacity-80">
            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Introduction</h2>
              <p>
                Welcome to CryptoCrowd (“CryptoCrowd”, “we”, “our”, or “us”). By accessing or using our website and its services, including but not limited to the blog and client portal, you (“you”, “your”, or “client”) agree to comply with and be bound by these Terms of Service (“Terms”).
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Terminology</h2>
              <p className="mb-4">
                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person using this website and compliant with the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to CryptoCrowd. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves.
              </p>
              <p>
                All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Services & Service Terms</h2>
              <p className="mb-4">
                CryptoCrowd offers a range of marketing services which may be purchased via our client portal or website. Details of our services will be provided at the point of sale or as otherwise communicated to you. In the absence of a signed agreement at the point of sale, the following terms apply:
              </p>
              <ul className="list-disc pl-6 space-y-3 opacity-90">
                <li>All payments are non-refundable.</li>
                <li>By using our services, you grant CryptoCrowd the right to use your name, company logo, and testimonials (public or private) for showcasing and marketing purposes. You may opt out via written notice.</li>
                <li>Some services may auto-renew (daily, weekly, monthly, quarterly, semi-annually, or annually). Unless otherwise agreed, services renew automatically unless canceled at least 7 days before renewal.</li>
                <li>CryptoCrowd’s maximum liability is limited to 100% of the amount paid by the client in the previous 12 months.</li>
                <li>Services are provided on a non-exclusive basis.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Payment Processing Acknowledgement</h2>
              <p>
                We may use third-party payment processors. By making a payment, you authorize their use and acknowledge that we are not responsible for their actions.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Content</h2>
              <p>
                We may publish content (articles, images, etc.) for informational purposes only. We do not guarantee accuracy or completeness.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Termination</h2>
              <p className="mb-4">
                CryptoCrowd may suspend or terminate access to services at any time, with or without notice.
              </p>
              <p>
                By using our services, you confirm that you have read and agreed to these Terms. If you do not agree, you must not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Cookies</h2>
              <p>
                We use cookies. By accessing cryptocrowd.agency, you agree to our use of cookies in accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">License</h2>
              <p className="mb-4">
                All intellectual property on cryptocrowd.agency belongs to CryptoCrowd or its licensors. You may use the site for personal purposes only.
              </p>
              <p className="mb-2">You must not:</p>
              <ul className="list-disc pl-6 space-y-2 opacity-90 mb-4">
                <li>Republish content</li>
                <li>Sell or sublicense content</li>
                <li>Copy or duplicate materials</li>
                <li>Redistribute content</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">User Comments</h2>
              <p className="mb-4">
                Users may post comments in certain areas. CryptoCrowd does not pre-moderate content and is not responsible for user-generated content. We reserve the right to remove inappropriate content.
              </p>
              <p className="mb-2">By posting, you confirm that:</p>
              <ul className="list-disc pl-6 space-y-2 opacity-90 mb-4">
                <li>You have the right to post the content</li>
                <li>It does not violate any rights</li>
                <li>It is not unlawful or offensive</li>
              </ul>
              <p>
                You grant CryptoCrowd a non-exclusive license to use your content.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Hyperlinking</h2>
              <p className="mb-4">
                Certain organizations may link to our website without approval (e.g. search engines, news sites). Others may request permission.
              </p>
              <p>
                Use of CryptoCrowd branding requires explicit permission.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Reservation of Rights</h2>
              <p>
                We may request removal of any links to our website and update these terms at any time.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Disclaimer</h2>
              <p>
                We provide our website and services “as is” without warranties. We are not liable for any damages to the fullest extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Changes to These Terms</h2>
              <p>
                We may update these Terms at any time. Continued use of the website means you accept the changes.
              </p>
            </section>

            <section className="mt-20 pt-12 border-t border-[color:var(--color-border)]">
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Contact</h2>
              <p>
                For any questions, contact: <a href="mailto:hello@cryptocrowd.agency" className="text-[rgb(var(--color-text))] hover:text-accentBlue transition-colors font-bold border-b border-accentBlue/30 pb-1">hello@cryptocrowd.agency</a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
