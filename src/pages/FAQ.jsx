import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveHoverText from '../components/InteractiveHoverText';

const FALLBACK_FAQ = [
  {
    question: "Do you offer ongoing support?",
    answer: "Absolutely, our commitment extends beyond the initial strategy implementation. We offer continuous support, including regular reporting and analysis to ensure our clients not only meet but surpass their objectives. As a proactive partner, we provide ongoing recommendations to fine-tune and optimize your digital marketing strategies."
  },
  {
    question: "What advantages would my business gain through a collaboration with your agency?",
    answer: "Navigating the digital marketing landscape can be challenging without a solid foundation. Our agency specializes in creating customized strategic plans and providing expert guidance. By choosing our services, your brand can overcome common challenges, ensuring a streamlined path to sustained, long-term growth in the dynamic digital arena."
  },
  {
    question: "What's the expected timeframe to witness tangible results from our partnership?",
    answer: "The timeline for results depends on the specific services and goals. Content marketing may necessitate several months for noticeable impact, while influencer marketing and paid advertising can yield immediate results. Throughout the process, transparent communication is maintained, with regular reporting and updates to manage expectations effectively."
  },
  {
    question: "What metrics or criteria do you use to gauge the success of your strategies?",
    answer: "Success, in our perspective, hinges on achieving our clients' goals. We rely on data-driven metrics such as website traffic, token/NFT sales and engagement rates to assess the efficacy of our strategies. Regular reporting and in-depth analysis empower our clients to make informed, data-driven decisions, fostering an environment where success is not just a goal but a tangible outcome."
  }
];

/**
 * Extract plain text from a Storyblok rich text field.
 * If the value is already a string, return it directly.
 */
function extractAnswer(answer) {
  if (typeof answer === 'string') return answer;
  // Storyblok rich text object — extract text from content[].content[].text
  if (answer?.content) {
    return answer.content
      .map((block) =>
        block.content?.map((inline) => inline.text || '').join('') || ''
      )
      .join(' ');
  }
  return '';
}

export default function FAQ({ blok }) {
  const FAQ_DATA = blok?.items?.length
    ? blok.items.map((item) => ({
        question: item.question,
        answer: extractAnswer(item.answer),
      }))
    : FALLBACK_FAQ;
  const subtitle = blok?.subtitle || 'Intelligence';

  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="w-full py-32 brutalist-border-b bg-transparent relative z-10 overflow-hidden">
      {/* Dot-matrix background — CSS utility, no inline style */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none gpu-layer bg-dot-matrix" />

      <div className="container mx-auto max-w-[1200px] px-4 md:px-12 relative z-10 flex flex-col">
        {/* Header */}
        <motion.div
          id="faq"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <p className="text-accentBlue tracking-[0.3em] font-mono text-base uppercase mb-8 flex items-center justify-center gap-4 neon-glow-blue select-none">
            <span className="w-8 md:w-16 h-px bg-accentBlue/40" />
            {subtitle}
            <span className="w-8 md:w-16 h-px bg-accentBlue/40" />
          </p>
          <div className="mb-4">
            <InteractiveHoverText
              as="h2"
              align="items-center"
              lines={['FAQ']}
              hoverColor="#343cbb"
              className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-center"
            />
          </div>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="border-t border-[color:var(--color-border)]"
        >
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-[color:var(--color-border)]">
                <button
                  onClick={() => toggleOpen(idx)}
                  aria-expanded={isOpen}
                  className="w-full py-8 px-4 flex justify-between items-center text-left focus:outline-none group hover:bg-[color:var(--color-surface-variant)] transition-colors duration-300"
                >
                  <div className="flex items-start md:items-center gap-6">
                    <span className="font-mono text-sm opacity-40 group-hover:opacity-100 group-hover:text-accentBlue transition-colors w-6 mt-1 md:mt-0">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-lg md:text-2xl font-bold tracking-tight group-hover:text-accentBlue transition-colors pr-8">
                      {item.question}
                    </h3>
                  </div>
                  <div className={`shrink-0 relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isOpen ? 'border-accentBlue rotate-45' : 'border-[color:var(--color-border)]'}`}>
                    <span className={`absolute w-3 h-[2px] transition-colors ${isOpen ? 'bg-accentBlue' : 'bg-[color:var(--color-text)]'}`} />
                    <span className={`absolute h-3 w-[2px] transition-colors ${isOpen ? 'bg-accentBlue' : 'bg-[color:var(--color-text)]'}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pb-12 md:pl-[5.5rem] font-mono text-sm md:text-base tracking-wide leading-relaxed opacity-80 max-w-4xl border-t border-[color:var(--color-border)] border-dashed">
                        <p className="border-l-2 border-accentBlue pl-4">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
