import { motion } from "motion/react";

const genericPartners = [
  "Leading AI Service Enterprises",
  "Tier-1 Foundation Models",
  "Global Tech Conglomerates",
  "Healthcare AI Pioneers",
  "Autonomous Systems Labs",
  "Financial Data Innovators",
  "Enterprise Automation Giants",
];

export function ClientSlider() {
  const duplicatedPartners = [...genericPartners, ...genericPartners, ...genericPartners];

  return (
    <section className="py-16 md:py-24 px-6 overflow-hidden bg-glass border-b border-subtle shadow-[0_8px_32px_rgba(0,0,0,0.05)] relative">
      <div className="max-w-[1600px] mx-auto text-center relative z-10 mb-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">Confidential Partnerships</p>
        <h2 className="text-2xl md:text-4xl font-sans font-medium tracking-tight text-primary">
          Trusted by Top <span className="text-secondary italic">AI Service Enterprises</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

        <div className="flex">
          <motion.div
            className="flex gap-16 md:gap-32 items-center pl-16 md:pl-32"
            animate={{
              x: ["0%", "-33.333%"],
            }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="flex-shrink-0 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity duration-300"
              >
                <span className="font-sans font-bold text-lg md:text-2xl tracking-tight text-[var(--text-primary)]">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
