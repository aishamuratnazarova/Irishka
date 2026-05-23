import React from "react";
import { motion } from "motion/react";

interface SectionWithMockupProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  primaryImageSrc: string;
  secondaryImageSrc: string;
  reverseLayout?: boolean;
}

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({
  title,
  description,
  primaryImageSrc,
  secondaryImageSrc,
  reverseLayout = false,
}) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const layoutClasses = reverseLayout
    ? "md:grid-cols-2 md:grid-flow-col-dense"
    : "md:grid-cols-2";

  const textOrderClass = reverseLayout ? "md:col-start-2" : "";
  const imageOrderClass = reverseLayout ? "md:col-start-1" : "";

  return (
    <section className="relative py-24 bg-stone-950 rounded-3xl overflow-hidden my-12 border border-stone-800 shadow-2xl">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-rose-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
        <motion.div
          className={`grid grid-cols-1 gap-16 md:gap-8 w-full items-center ${layoutClasses}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Text Content */}
          <motion.div
            className={`flex flex-col items-start gap-4 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0 ${textOrderClass}`}
            variants={itemVariants}
          >
            <div className="space-y-2 md:space-y-1">
              <h2 className="text-white text-3xl md:text-[36px] font-display font-bold leading-tight md:leading-[45px] italic">
                {title}
              </h2>
            </div>

            <p className="text-stone-400 text-sm md:text-[15px] leading-relaxed font-sans font-light">
              {description}
            </p>
          </motion.div>

          {/* App mockup/Image Content */}
          <motion.div
            className={`relative mt-10 md:mt-0 mx-auto ${imageOrderClass} w-full max-w-[300px] md:max-w-[421px]`}
            variants={itemVariants}
          >
            {/* Decorative Background Element */}
            <motion.div
              className="absolute w-[300px] h-[300px] md:w-[420px] md:h-[420px] bg-rose-950/20 rounded-[32px] z-0"
              style={{
                top: reverseLayout ? 'auto' : '10%',
                bottom: reverseLayout ? '10%' : 'auto',
                left: reverseLayout ? 'auto' : '-10%',
                right: reverseLayout ? '-10%' : 'auto',
                transform: reverseLayout ? 'translate(0, 0)' : 'translateY(10%)',
                filter: 'blur(2px)'
              }}
              initial={{ y: reverseLayout ? 0 : 0 }}
              whileInView={{ y: reverseLayout ? -15 : -25 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div
                className="relative w-full h-full bg-cover bg-center rounded-[32px] opacity-60 border border-stone-800"
                style={{
                  backgroundImage: `url(${secondaryImageSrc})`,
                }}
              />
            </motion.div>

            {/* Main Mockup Card */}
            <motion.div
              className="relative w-full h-[380px] md:h-[480px] bg-stone-900/60 rounded-[32px] backdrop-blur-[15px] border border-stone-800/80 z-10 overflow-hidden shadow-2xl"
              initial={{ y: reverseLayout ? 0 : 0 }}
              whileInView={{ y: reverseLayout ? 15 : 25 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="p-0 h-full">
                <div className="h-full relative">
                  {/* Primary Image */}
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${primaryImageSrc})`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div
        className="absolute w-full h-px bottom-0 left-0 z-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(242,167,181,0.2) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
    </section>
  );
};

export default SectionWithMockup;
