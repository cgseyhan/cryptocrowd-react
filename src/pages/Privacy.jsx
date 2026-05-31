import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';

export default function Privacy() {
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
              Privacy <span className="text-accentBlue italic">Policy</span>
            </h1>
            <p className="opacity-60 text-sm tracking-widest uppercase">Last Updated: February 09, 2026</p>
          </div>

          <div className="space-y-12 text-sm md:text-base leading-relaxed opacity-80">
            <section>
              <p>
                This Privacy Policy (“Policy”) applies to cryptocrowd.agency, and CryptoCrowd (“Company”) and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted, all references to the Company include cryptocrowd.agency. The Company’s website is a marketing services site. By using the Company website, you consent to the data practices described in this statement.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Collection of your Personal Information</h2>
              <p className="mb-4">
                In order to better provide you with products and services offered, the Company may collect personally identifiable information, such as your:
              </p>
              <ul className="list-disc pl-6 space-y-2 opacity-90 mb-4">
                <li>First and last name</li>
                <li>Mailing address</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Employer</li>
                <li>Job title</li>
              </ul>
              <p className="mb-4">
                The Company may also collect anonymous demographic information, which is not unique to you, such as your Age and Gender.
              </p>
              <p>
                We do not collect any personal information about you unless you voluntarily provide it to us. However, you may be required to provide certain personal information to us when you elect to use certain products or services. These may include: (a) registering for an account; (b) entering a sweepstakes or contest sponsored by us or one of our partners; (c) signing up for special offers from selected third parties; (d) sending us an email message. To wit, we will use your information for, but not limited to, communicating with you in relation to services and/or products you have requested from us. We also may gather additional personal or non-personal information in the future.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Use of your Personal Information</h2>
              <p className="mb-4">The Company collects and uses your personal information in the following ways:</p>
              <ul className="list-disc pl-6 space-y-2 opacity-90 mb-4">
                <li>to operate and deliver the services you have requested</li>
                <li>to provide you with information, products, or services that you request from us</li>
                <li>to provide you with notices about your account</li>
                <li>to carry out the Company’s obligations and enforce our rights arising from any contracts entered between you and us, including for collection</li>
                <li>to notify you about changes to our cryptocrowd.agency or any products or services we offer or provide through it</li>
                <li>in any other way we may describe when you provide the information</li>
                <li>for any other purpose with your consent.</li>
              </ul>
              <p>
                The Company may also use your personally identifiable information to inform you of other products or services available from the Company and its affiliates.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Sharing Information with Third Parties</h2>
              <p className="mb-4">The Company does not sell, rent, or lease its customer lists to third parties.</p>
              <p className="mb-4">
                The Company may, from time to time, contact you on behalf of external business partners about a particular offering that may be of interest to you. In those cases, your unique personally identifiable information (email, name, address, phone number) is transferred to the third party. The Company may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to the Company, and they are required to maintain the confidentiality of your information.
              </p>
              <p>
                The Company may disclose your personal information, without notice, if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on the Company or the site; (b) protect and defend the rights or property of the Company; and/or (c) act under exigent circumstances to protect the personal safety of users of the Company, or the public.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Opt-Out of Disclosure of Personal Information to Third Parties</h2>
              <p className="mb-4">
                In connection with any personal information we may disclose to a third party for a business purpose, you have the right to know the categories of personal information that we disclosed about you for a business purpose.
              </p>
              <p>
                You have the right under the California Consumer Privacy Act of 2018 (CCPA) and certain other privacy and data protection laws, as applicable, to opt out of the disclosure of your personal information. If you exercise your right to opt out of the disclosure of your personal information, we will refrain from disclosing your personal information, unless you subsequently provide express authorization for the disclosure of your personal information.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Tracking User Behavior & Automatically Collected Information</h2>
              <p className="mb-4">
                The Company may keep track of the websites and pages our users visit within the Company, in order to determine what the Company services are the most popular. This data is used to deliver customized content and advertising within the Company to customers whose behavior indicates that they are interested in a particular subject area.
              </p>
              <p>
                The Company may automatically collect information about your computer hardware and software. This information can include your IP address, browser type, domain names, access times, and referring website addresses. This information is used for the operation of the service, to maintain quality of the service, and to provide general statistics regarding the use of the Company’s website.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Use of Cookies</h2>
              <p className="mb-4">
                The Company’s website may use “cookies” to help you personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you.
              </p>
              <p className="mb-4">
                One of the primary purposes of cookies is to provide a convenience feature to save you time. The purpose of a cookie is to tell the web server that you have returned to a specific page. For example, if you personalize the Company’s pages, or register with Company’s site or services, a cookie helps the Company to recall your specific information on subsequent visits. This simplifies the process of recording your personal information, such as billing addresses, shipping addresses, and so on. When you return to the same website, the information you previously provided can be retrieved, so you can easily use the Company’s features that you customized.
              </p>
              <p>
                You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of the Company’s services or websites you visit.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Links</h2>
              <p>
                This website contains links to other sites. Please be aware that we are not responsible for the content or privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personally identifiable information.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Security of your Personal Information</h2>
              <p className="mb-4">The Company secures your personal information from unauthorized access, use, or disclosure using methods such as the SSL Protocol.</p>
              <p>
                When personal information is transmitted to other websites, it is protected through the use of encryption, such as the Secure Sockets Layer (SSL) protocol. We strive to take appropriate security measures to protect against unauthorized access to or alteration of your personal information. Unfortunately, no data transmission over the Internet or any wireless network can be guaranteed to be 100% secure. As a result, while we strive to protect your personal information, you acknowledge that: (a) there are security and privacy limitations inherent to the Internet that are beyond our control; and (b) the security, integrity, and privacy of any and all information and data exchanged between you and us through this site cannot be guaranteed.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Right to Deletion</h2>
              <p className="mb-4">Subject to certain exceptions set out below, on receipt of a verifiable request from you, we will:</p>
              <ul className="list-disc pl-6 space-y-2 opacity-90 mb-4">
                <li>Delete your personal information from our records; and</li>
                <li>Direct any service providers to delete your personal information from their records.</li>
              </ul>
              <p className="mb-4">Please note that we may not be able to comply with requests to delete your personal information if it is necessary to:</p>
              <ul className="list-disc pl-6 space-y-2 opacity-90">
                <li>Complete the transaction for which the personal information was collected, fulfill the terms of a written warranty or product recall conducted in accordance with federal law, and provide a good or service requested by you, or reasonably anticipated within the context of our ongoing business relationship with you, or otherwise perform a contract between you and us;</li>
                <li>Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity; or prosecute those responsible for that activity;</li>
                <li>Debug to identify and repair errors that impair existing intended functionality;</li>
                <li>Exercise free speech, ensure the right of another consumer to exercise his or her right of free speech, or exercise another right provided for by law;</li>
                <li>Comply with the California Electronic Communications Privacy Act;</li>
                <li>Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when our deletion of the information is likely to render impossible or seriously impair the achievement of such research, provided we have obtained your informed consent;</li>
                <li>Enable solely internal uses that are reasonably aligned with your expectations based on your relationship with us;</li>
                <li>Comply with an existing legal obligation; or</li>
                <li>Otherwise use your personal information, internally, in a lawful manner that is compatible with the context in which you provided the information.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Children Under Thirteen</h2>
              <p>
                The Company does not knowingly collect personally identifiable information from children under the age of 13. If you are under the age of 13, you must ask your parent or guardian for permission to use this website.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Email Communications & Opt Out</h2>
              <p className="mb-4">
                We respect your privacy and give you an opportunity to opt out of receiving announcements of certain information. Users may opt out of receiving any or all communications from third-party partners of the Company by contacting us at hello@cryptocrowd.com.
              </p>
              <p>
                From time to time, the Company may contact you via email for the purpose of providing announcements, promotional offers, alerts, confirmations, surveys, and/or other general communication. In order to improve our services, we may receive a notification when you open an email from the Company or click on a link therein. If you would like to stop receiving marketing or promotional communications via email from the Company, you may opt out of such communications by clicking on the unsubscribe button in an email.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Changes to This Statement</h2>
              <p>
                The Company reserves the right to change this Policy from time to time. For example, when there are changes in our services, changes in our data protection practices, or changes in the law. When changes to this Policy are significant, we will inform you. You may receive a notice by sending an email to the primary email address specified in your account, by placing a prominent notice on our website, and/or by updating any privacy information. Your continued use of the website and/or services available after such modifications will constitute your: (a) acknowledgment of the modified Policy; and (b) agreement to abide and be bound by that Policy.
              </p>
            </section>

            <section className="mt-20 pt-12 border-t border-[color:var(--color-border)]">
              <h2 className="font-display font-bold text-2xl uppercase tracking-widest mb-4 text-accentBlue">Contact Information</h2>
              <p className="mb-6">The Company welcomes your questions or comments regarding this Policy. If you believe that the Company has not adhered to this Policy, please contact the Company at:</p>
              <div className="font-bold mb-6">
                <p>CryptoCrowd</p>
                <p>Esentepe Mah. Kirgulu Sk. No: 4, Interior No: 4</p>
                <p>Sisli, Istanbul 34394</p>
                <p>Turkiye</p>
              </div>
              <p>
                Email Address: <a href="mailto:hello@cryptocrowd.com" className="text-[rgb(var(--color-text))] hover:text-accentBlue transition-colors font-bold border-b border-accentBlue/30 pb-1">hello@cryptocrowd.com</a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
