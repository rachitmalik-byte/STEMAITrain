import { PageTransition } from '../components/PageTransition';
import { AnimatedSection, AnimatedItem } from '../components/AnimatedSection';
import { DepthElement } from '../components/DepthElement';
import { InteractivePixels } from '../components/InteractivePixels';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { AnimatedTextReveal } from '../components/AnimatedTextReveal';
import { TiltCard } from '../components/TiltCard';
import { ArrowRight, Brain, Network, Microchip, Microscope, ChevronRight, Activity, Database, CheckSquare, Zap, Target, Code2, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { NetworkMap } from '../components/NetworkMap';
import { MagneticElement } from '../components/MagneticElement';
import { OrbitalRings } from '../components/OrbitalRings';
import { ClientSlider } from '../components/ClientSlider';

export default function Home() {
  const { scrollY } = useScroll();
  const auraY = useTransform(scrollY, [0, 1000], [0, 300]);
  const auraScale = useTransform(scrollY, [0, 1000], [1, 1.5]);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col justify-center px-6 overflow-hidden pt-32 pb-20 dark">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black"
        >
          <iframe 
            src="https://player.vimeo.com/video/1193170703?background=1&autoplay=1&loop=1&byline=0&title=0"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60" 
            allow="autoplay; fullscreen" 
            frameBorder="0"
          ></iframe>
        </motion.div>
        {/* Orange glow aura */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-orange-500/40 blur-[120px] md:blur-[180px] rounded-full z-0 pointer-events-none transform-gpu mix-blend-screen"
          style={{ y: auraY, scale: auraScale }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Dark overlay to ensure readability */}
        <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>
        
        {/* Light 3D Orbital Elements */}
        <OrbitalRings />

        <div className="max-w-[1600px] w-full mx-auto relative z-10 flex flex-col justify-center min-h-[60vh]">
          <AnimatedSection className="w-full flex flex-col items-center justify-center text-center mt-12 lg:mt-0">
             {/* STEM ai Trainer Logo Text Moved From Navbar */}
             <motion.div 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="flex flex-row items-center justify-center gap-2 font-sans tracking-tight leading-none mb-10"
             >
               <span className="text-[32px] md:text-[40px] font-normal text-[var(--text-primary)] relative z-10 drop-shadow-md">STEM</span>
               <motion.span 
                 animate={{ 
                   color: ['#f97316', '#fb923c', '#f97316']
                 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="text-[32px] md:text-[40px] font-bold text-orange-500 relative z-10 drop-shadow-md mx-2"
               >
                 AI
               </motion.span>
               <span className="text-[32px] md:text-[40px] font-normal text-[var(--text-primary)] relative z-10 drop-shadow-md">TRAINERS</span>
             </motion.div>

             {/* Expert Stats Centered */}
             <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-12">
               <p className="text-xl text-[var(--text-primary)] font-medium">
                 <span className="text-[var(--accent)]">1000+</span> Pool of experts.
               </p>
               <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)] opacity-50"></div>
               <p className="text-xl text-[var(--text-secondary)]">
                 <span className="text-[var(--text-primary)]">12+</span> STEM domains.
               </p>
             </div>

            {/* Massive Bold Typography */}
            <div className="relative z-10 w-full mb-12 flex flex-col items-center">
               <span className="text-sm uppercase tracking-[0.3em] font-bold text-[var(--accent)] mb-8 block relative z-20 text-center">STEM Intelligence Network</span>
               
               <div className="relative inline-block group cursor-default text-center">
                 {/* Pulsing Animated Glow */}
                 <motion.div 
                   className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-blue-500 to-purple-600 -z-10 group-hover:opacity-60 transition-opacity duration-1000 blur-[80px]"
                   animate={{ 
                     opacity: [0.15, 0.5, 0.15],
                     scale: [0.9, 1.2, 0.9],
                   }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 />
                 
                 <h1 className="font-sans font-black uppercase text-[5vw] lg:text-[4vw] xl:text-[3.5vw] leading-[1.1] tracking-tighter relative z-10 group-hover:scale-[1.01] transition-transform duration-700 ease-out text-center drop-shadow-xl text-[#fafafa]">
                   THE HUMAN REASONING<br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 relative z-10 drop-shadow-[0_4px_12px_rgba(255,165,0,0.4)]">
                     BEHIND FRONTIER AI
                   </span>
                 </h1>
               </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="w-full max-w-4xl mx-auto mt-12 relative z-20 flex flex-col items-center">
             <div className="flex flex-col sm:flex-row gap-6 md:gap-8 w-full justify-center px-4">
                 <MagneticElement strength={0.3} className="w-full sm:w-auto">
                   <Link to="/contact" className="w-full sm:w-auto min-w-[200px] h-16 rounded-[40px] bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center font-bold tracking-wide hover:scale-105 hover:bg-[var(--accent)] hover:text-white transition-all shadow-xl group">
                     Talk to an Expert
                     <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                   </Link>
                 </MagneticElement>

                 <MagneticElement strength={0.3} className="w-full sm:w-auto">
                   <Link to="/contact" className="w-full sm:w-auto min-w-[200px] h-16 rounded-[40px] bg-transparent border-2 border-[rgba(255,255,255,0.2)] text-white hover:border-white flex items-center justify-center font-bold tracking-wide hover:scale-105 transition-all backdrop-blur-sm group">
                     Contact Us
                     <Phone className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                   </Link>
                 </MagneticElement>
             </div>
             
             <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[var(--text-secondary)] font-medium">
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Available 24/7</span>
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Global Network</span>
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Managed Services</span>
             </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Clients Slider */}
      <ClientSlider />

      {/* Manifesto / Text Reveal Section */}
      <section className="py-40 px-6 bg-glass border-y border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] relative overflow-hidden flex items-center min-h-[60vh]">
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTextReveal 
            text="The era of scraped logic is over. For frontier AI to evolve, it requires ground-truth reasoning verified by human intellect. We provide the intelligence constraint."
            className="text-2xl md:text-4xl lg:text-5xl font-serif font-light leading-[1.3] text-primary tracking-wide" 
          />
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-32 px-6 bg-glass border-b border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-20" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection className="max-w-3xl mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light tracking-wide text-primary mb-6">
              Infrastructure for <span className="italic text-[var(--accent)] font-medium">scientific AI.</span>
            </h2>
            <p className="text-xl text-secondary font-light leading-relaxed">
              We are not a freelance marketplace. We are a distributed STEM intelligence workforce powering annotation, RLHF, and reasoning verification for the world's most advanced models.
            </p>
          </AnimatedSection>

          <AnimatedSection staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-subtle pt-16">
            <AnimatedItem className="h-full">
              <TiltCard className="h-full border border-[rgba(26,26,26,0.03)] dark:border-[rgba(255,255,255,0.03)] rounded-[40px] bg-[var(--bg-primary)] hover:border-[var(--accent)] transition-all duration-500 shadow-sm hover:shadow-[0_0_40px_-10px_var(--accent)] group">
                <div className="flex flex-col h-full gap-4 p-10">
                  <Brain className="w-6 h-6 text-[var(--accent)] mb-2 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-500 ease-out" />
                  <h3 className="text-base md:text-lg font-medium tracking-wide text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-500">AI Training & RLHF</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Deep scientific reinforcement learning with human feedback from domain specialists to improve reasoning paths and correctness.</p>
                </div>
              </TiltCard>
            </AnimatedItem>
            <AnimatedItem className="h-full">
              <TiltCard className="h-full border border-[rgba(26,26,26,0.03)] dark:border-[rgba(255,255,255,0.03)] rounded-[40px] bg-[var(--bg-primary)] hover:border-[var(--accent)] transition-all duration-500 shadow-sm hover:shadow-[0_0_40px_-10px_var(--accent)] group">
                <div className="flex flex-col h-full gap-4 p-10">
                  <Microscope className="w-6 h-6 text-[var(--accent)] mb-2 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 ease-out" />
                  <h3 className="text-base md:text-lg font-medium tracking-wide text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-500">Model Evaluation</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Rigorous human-in-the-loop evaluation for model outputs, ensuring scientific accuracy, safety, and alignment before deployment.</p>
                </div>
              </TiltCard>
            </AnimatedItem>
            <AnimatedItem className="h-full">
              <TiltCard className="h-full border border-[rgba(26,26,26,0.03)] dark:border-[rgba(255,255,255,0.03)] rounded-[40px] bg-[var(--bg-primary)] hover:border-[var(--accent)] transition-all duration-500 shadow-sm hover:shadow-[0_0_40px_-10px_var(--accent)] group">
                <div className="flex flex-col h-full gap-4 p-10">
                  <Network className="w-6 h-6 text-[var(--accent)] mb-2 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-500 ease-out" />
                  <h3 className="text-base md:text-lg font-medium tracking-wide text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-500">Synthetic Data</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Creation of highly specialized, high-fidelity synthetic datasets seeded by PhD-level experts across mathematics and physical sciences.</p>
                </div>
              </TiltCard>
            </AnimatedItem>
            <AnimatedItem className="h-full">
              <TiltCard className="h-full border border-[rgba(26,26,26,0.03)] dark:border-[rgba(255,255,255,0.03)] rounded-[40px] bg-[var(--bg-primary)] hover:border-[var(--accent)] transition-all duration-500 shadow-sm hover:shadow-[0_0_40px_-10px_var(--accent)] group">
                <div className="flex flex-col h-full gap-4 p-10">
                  <CheckSquare className="w-6 h-6 text-[var(--accent)] mb-2 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 ease-out" />
                  <h3 className="text-base md:text-lg font-medium tracking-wide text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-500">Complex Annotation</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Multimodal evaluation and deep structuring of complex datasets utilizing LaTeX, raw data tables, and structural blueprints.</p>
                </div>
              </TiltCard>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* Deep Dive AI Workflows */}
      <section className="py-40 px-6 relative bg-glass border-b border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        {/* Background & Decorative Wrapper */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] transform-gpu"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary" />
          
          <DepthElement offset={120} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 dark:opacity-40 text-[40rem] lg:text-[70rem] font-serif text-[var(--accent)] drop-shadow-2xl">
            Σ
          </DepthElement>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <div className="relative h-full">
            <div className="lg:sticky lg:top-32 relative z-20">
              <AnimatedSection>
                 <h2 className="text-2xl md:text-4xl font-serif font-light tracking-wide text-primary mb-8">
                   Bridging logic gaps in <span className="italic font-medium">chain-of-thought.</span>
                 </h2>
                 <p className="text-lg text-secondary font-light leading-relaxed mb-6">
                   Generalist annotators cannot evaluate multi-step algebraic geometry or quantum physics algorithms. Our workflows ensure that the reasoning steps taught to the model are mathematically sound and scientifically valid.
                 </p>
                 <div className="space-y-6 mt-10">
                    <div className="flex gap-4">
                      <div className="mt-1"><Target className="w-5 h-5 text-[var(--accent)]" /></div>
                      <div>
                        <h4 className="font-medium tracking-wide text-primary">Mathematical Proofing</h4>
                        <p className="text-sm text-secondary leading-relaxed mt-1">Verification of formal proofs, limit formulations, and topological mapping accuracy.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1"><Activity className="w-5 h-5 text-[var(--accent)]" /></div>
                      <div>
                        <h4 className="font-medium tracking-wide text-primary">Physics Validation</h4>
                        <p className="text-sm text-secondary leading-relaxed mt-1">Reviewing reasoning against thermodynamic laws, classical mechanics, and dynamic systems.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1"><Database className="w-5 h-5 text-[var(--accent)]" /></div>
                      <div>
                        <h4 className="font-medium tracking-wide text-primary">Multimodal Assessment</h4>
                        <p className="text-sm text-secondary leading-relaxed mt-1">Grounding charts, graphs, and simulation data to textual output explanations.</p>
                      </div>
                    </div>
                 </div>
              </AnimatedSection>
            </div>
          </div>
          <AnimatedSection className="relative lg:h-full lg:min-h-[1200px] flex flex-col gap-8">
            <div className="w-full aspect-[4/5] object-cover rounded-[32px] overflow-hidden bg-secondary border border-subtle relative p-8 shadow-2xl group flex flex-col justify-between">
               <div className="absolute inset-0 z-0">
                 <img 
                   src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600" 
                   alt="AI Logic Analysis"
                   width="1200"     // Tells the browser to reserve an aspect ratio space
  height="800"    // Prevents text from jumping when the image pops in
  loading="lazy"  // Delays download until the user scrolls close to it
                   className="w-full h-full object-cover filter grayscale-[50%] opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)]/80 to-[var(--bg-secondary)]/90 mix-blend-multiply" />
               </div>
               <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--bg-primary)] to-transparent z-10"></div>
               
               {/* Mock UI Elements floating inside */}
               <div className="relative z-20 h-full flex flex-col justify-between">
                  {/* Top: Status bar */}
                  <div className="flex justify-between items-center bg-white/95 dark:bg-black/80 backdrop-blur-md border border-subtle rounded-full px-4 py-2 text-xs font-mono shadow-sm">
                     <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> SYSTEM PROMPT</span>
                     <span className="text-secondary opacity-60">ID: 409-MATH</span>
                  </div>

                  {/* Middle: Data chunk */}
                  <div className="space-y-4 my-auto mt-12 mb-8">
                     <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md border border-subtle rounded-3xl p-6 shadow-lg transform translate-y-2 group-hover:-translate-y-2 transition-transform duration-500">
                        <p className="text-[10px] font-mono text-[var(--accent)] mb-3 uppercase tracking-widest">Input Generation</p>
                        <p className="font-serif text-primary text-base leading-relaxed line-clamp-3">
                           "Prove that every bounded sequence in R^n has a convergent subsequence (Bolzano-Weierstrass theorem)."
                        </p>
                     </div>
                     <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md border border-[var(--accent)]/30 rounded-3xl p-6 shadow-xl transform translate-x-4 group-hover:-translate-x-2 transition-transform duration-500 delay-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]"></div>
                        <p className="text-[10px] font-mono mb-4 uppercase flex items-center justify-between">
                           <span className="tracking-widest text-[var(--accent)]">Expert Verification</span>
                           <span className="bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full font-bold">APPROVED</span>
                        </p>
                        <div className="font-mono text-xs text-secondary opacity-80 space-y-2">
                           <p className="flex gap-2"><span>1.</span> Validate Topological Space</p>
                           <p className="text-[var(--accent)] flex gap-2"><span>&gt;</span> Confirmed R^n metric properties.</p>
                           <p className="flex gap-2"><span>2.</span> Sequential Compactness verified</p>
                        </div>
                     </div>
                  </div>

                  {/* Bottom: Caption */}
                  <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md border border-subtle p-6 rounded-2xl mt-4">
                     <p className="text-[10px] uppercase font-bold font-mono tracking-widest text-[var(--accent)] mb-2">Workflow Alpha</p>
                     <p className="text-lg font-serif italic text-primary">Abstract Mathematics Verification</p>
                     <p className="text-xs text-secondary mt-2">Human-in-the-loop logic tracing.</p>
                  </div>
               </div>
            </div>

            <div className="w-full aspect-[4/5] object-cover rounded-[32px] overflow-hidden bg-secondary border border-subtle relative p-8 shadow-2xl group flex flex-col justify-between mt-8">
               <div className="absolute inset-0 z-0">
                 <img 
                   src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600" 
                   alt="Software Code Analysis"
                   width="1200"     // Tells the browser to reserve an aspect ratio space
  height="800"    // Prevents text from jumping when the image pops in
  loading="lazy"  // Delays download until the user scrolls close to it
                   className="w-full h-full object-cover filter grayscale-[50%] opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)]/80 to-[var(--bg-secondary)]/90 mix-blend-multiply" />
               </div>
               <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--bg-primary)] to-transparent z-10"></div>
               
               <div className="relative z-20 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center bg-white/95 dark:bg-black/80 backdrop-blur-md border border-subtle rounded-full px-4 py-2 text-xs font-mono shadow-sm">
                     <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> ALGORITHM REVIEW</span>
                     <span className="text-secondary opacity-60">ID: 802-CODE</span>
                  </div>

                  <div className="space-y-4 my-auto mt-12 mb-8">
                     <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md border border-subtle rounded-3xl p-6 shadow-lg transform translate-y-2 group-hover:-translate-y-2 transition-transform duration-500">
                        <p className="text-[10px] font-mono text-[var(--accent)] mb-3 uppercase tracking-widest">Model Output</p>
                        <p className="font-mono text-primary text-sm leading-relaxed line-clamp-3">
                           def calculate_complexity(graph):<br/>
                           &nbsp;&nbsp;visited = set()<br/>
                           &nbsp;&nbsp;# Incomplete depth-first search
                        </p>
                     </div>
                     <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md border border-red-500/30 rounded-3xl p-6 shadow-xl transform translate-x-4 group-hover:-translate-x-2 transition-transform duration-500 delay-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                        <p className="text-[10px] font-mono mb-4 uppercase flex items-center justify-between">
                           <span className="tracking-widest text-[var(--accent)]">Expert Verification</span>
                           <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full font-bold">REJECTED</span>
                        </p>
                        <div className="font-mono text-xs text-secondary opacity-80 space-y-2">
                           <p className="flex gap-2"><span>1.</span> Inefficient traversal detected</p>
                           <p className="text-red-500 flex gap-2"><span>&gt;</span> O(V^2) complexity instead of O(V+E)</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md border border-subtle p-6 rounded-2xl mt-4">
                     <p className="text-[10px] uppercase font-bold font-mono tracking-widest text-[var(--accent)] mb-2">Workflow Beta</p>
                     <p className="text-lg font-serif italic text-primary">Algorithmic Code Optimization</p>
                     <p className="text-xs text-secondary mt-2">Adversarial stress-testing.</p>
                  </div>
               </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Global Impact / Metrics Section */}
      <section className="py-40 px-6 border-b border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] bg-glass relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-20">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-4 lg:mb-6">Scale & Precision</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light tracking-wide text-primary">
              Measured by <span className="italic font-medium text-[var(--accent)]">scientific rigor.</span>
            </h2>
          </AnimatedSection>
          
          <AnimatedSection staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 1000, suffix: '+', label: 'Pool of Experts', desc: 'Active contributors across global top-tier institutions.' },
              { value: 5, suffix: '+', label: 'Years Experience', desc: 'Pioneering AI training and complex data structuring.' },
              { value: 20, suffix: '+', label: 'Domains', desc: 'Specialized across STEM, coding, and logical reasoning.' },
              { value: 99, suffix: '%', label: 'Logical Accuracy', desc: 'Peer-reviewed precision in every delivered dataset.' },
            ].map((stat, i) => (
              <AnimatedItem key={i} className="border border-subtle bg-primary rounded-[40px] p-8 hover:border-[var(--accent)] transition-all group overflow-hidden relative shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity" />
                <p className="text-5xl lg:text-6xl font-serif text-[var(--accent)] mb-6 transition-transform group-hover:-translate-y-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <div className="h-px w-full bg-border-color mb-6 group-hover:bg-[var(--accent)] transition-colors opacity-30" />
                <h4 className="text-base md:text-lg font-medium text-primary mb-3 tracking-wide">{stat.label}</h4>
                <p className="text-sm text-secondary leading-relaxed">{stat.desc}</p>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Structural Data Capabilities */}
      <section className="py-40 px-6 relative bg-glass border-b border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] overflow-hidden">
         <div className="absolute inset-0 bg-blue-500/5 pointer-events-none transform-gpu" />
         <div 
           className="absolute inset-0 opacity-[0.05] dark:opacity-[0.05] pointer-events-none transform-gpu"
           style={{
             backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
           }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary pointer-events-none" />
         
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <AnimatedSection className="w-full lg:w-1/2 order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-6 relative">
                   {/* Decorative background blob */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--accent)] rounded-full blur-[100px] opacity-[0.03] pointer-events-none" />
                   
                   <div className="bg-secondary rounded-[40px] p-8 aspect-square flex flex-col justify-between border border-subtle hover:border-[var(--accent)] transition-all relative z-10 shadow-lg group overflow-hidden">
                       <img 
                         src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800" 
                         alt="Raw pipeline"
                         width="1200"     // Tells the browser to reserve an aspect ratio space
  height="800"    // Prevents text from jumping when the image pops in
  loading="lazy"  // Delays download until the user scrolls close to it
                         className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 grayscale"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10" />
                       <Database className="w-8 h-8 text-[var(--accent)] relative z-20" />
                       <div className="relative z-20">
                           <p className="font-medium text-primary mb-1 tracking-wide">Raw Pipeline</p>
                           <p className="text-xs text-secondary leading-relaxed">JSONL, Parquet structured delivery.</p>
                       </div>
                   </div>
                   <div className="bg-primary rounded-[40px] p-8 aspect-square flex flex-col justify-between border border-subtle hover:border-[var(--accent)] transition-all mt-12 relative z-10 shadow-xl group overflow-hidden">
                       <img 
                         src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800" 
                         alt="Code parsing"
                         className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 grayscale"
                       />
                       <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/10 to-transparent z-10 mix-blend-overlay group-hover:opacity-100 transition-opacity" />
                       <Code2 className="w-8 h-8 text-primary group-hover:text-[var(--accent)] transition-colors relative z-20" />
                       <div className="relative z-20">
                           <p className="font-medium text-primary mb-1 tracking-wide group-hover:text-[var(--accent)] transition-colors">Code Parsing</p>
                           <p className="text-xs text-secondary leading-relaxed">Jupyter, lean, Python environments.</p>
                       </div>
                   </div>
                </div>
            </AnimatedSection>
            <AnimatedSection className="w-full lg:w-1/2 order-1 lg:order-2">
               <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light tracking-wide text-primary mb-8">
                  Ready for <span className="italic text-[var(--accent)] font-medium">frontier scale.</span>
               </h2>
               <p className="text-xl text-secondary font-light leading-relaxed mb-8">
                  We don't just supply human feedback; we architect the data structures that house it. Our systems integrate directly into enterprise machine learning operations.
               </p>
               <ul className="space-y-6 bg-secondary p-8 rounded-[40px] border border-subtle shadow-sm">
                  <li className="flex items-start gap-4 text-primary font-medium">
                    <CheckSquare className="w-6 h-6 text-[var(--accent)] shrink-0 mt-0.5" /> 
                    <span><span className="block text-primary font-medium tracking-wide">Custom API integration</span><span className="font-normal text-sm text-secondary mt-1 block">Connect directly to our verification backend.</span></span>
                  </li>
                  <li className="flex items-start gap-4 text-primary font-medium">
                    <CheckSquare className="w-6 h-6 text-[var(--accent)] shrink-0 mt-0.5" /> 
                    <span><span className="block text-primary font-medium tracking-wide">Pre-formatted context windows</span><span className="font-normal text-sm text-secondary mt-1 block">Contextual chunking optimized for token limits.</span></span>
                  </li>
                  <li className="flex items-start gap-4 text-primary font-medium">
                    <CheckSquare className="w-6 h-6 text-[var(--accent)] shrink-0 mt-0.5" /> 
                    <span><span className="block text-primary font-medium tracking-wide">Secure on-prem workflow options</span><span className="font-normal text-sm text-secondary mt-1 block">Enterprise environments requiring VPC boundaries.</span></span>
                  </li>
               </ul>
            </AnimatedSection>
         </div>
      </section>

      {/* Expert Network Dashboard Callout */}
      <section className="py-40 px-6 bg-glass border-b border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedSection className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-primary rounded-[40px] border border-subtle overflow-hidden p-8 flex flex-col justify-between shadow-xl">
              <NetworkMap />
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40 mb-2">Network Status</p>
                  <p className="text-3xl font-serif tracking-wide text-primary"><AnimatedCounter value={500} suffix="+" /> <span className="italic">Experts</span></p>
                </div>
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_10px_var(--accent)]"></div>
              </div>
              
              <div className="space-y-4 w-full mt-auto mb-8 relative z-10">
                {['Mathematics (PhD Level)', 'Computational Biology', 'Quantum Physics', 'Materials Science'].map((skill, i) => (
                  <div key={i} className="flex justify-between items-center pb-3 border-b border-subtle">
                    <span className="text-sm font-medium text-primary">{skill}</span>
                    <span className="text-[10px] font-mono text-secondary">ACTIVE</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <p className="text-xs text-secondary font-mono">Global nodes: 30+ countries</p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden group shadow-2xl mb-12">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600" 
                  alt="Scientist in lab"
                  width="1200"     // Tells the browser to reserve an aspect ratio space
  height="800"    // Prevents text from jumping when the image pops in
  loading="lazy"  // Delays download until the user scrolls close to it
                  className="w-full h-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80 pointer-events-none z-10" />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)] bg-[var(--accent)]/20 backdrop-blur-md mb-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#fafafa]">Verified Annotators</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 opacity-80">Research-Level Talent</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light tracking-wide text-primary mb-8">
                Olympiad medalists, PhDs, and domain specialists.
              </h2>
              <p className="text-lg text-secondary font-light leading-relaxed mb-6">
                Our network consists of rigorously vetted researchers, masters graduates, and scientific contributors. Each expert is evaluated not just on knowledge, but on their ability to structure reasoning correctly for AI pipelines.
              </p>
              <p className="text-md text-secondary font-light leading-relaxed mb-10">
                They operate as a distributed intelligence layer, turning complex scientific realities into structured data for machine learning algorithms.
              </p>
              <ul className="space-y-4 mb-10">
                {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Engineering'].map((domain) => (
                  <li key={domain} className="flex items-center gap-3 text-sm font-medium text-primary">
                    <ChevronRight className="w-4 h-4 text-[var(--accent)]" /> {domain}
                  </li>
                ))}
              </ul>
              <Link to="/experts" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--accent)] hover:text-blue-500 transition-colors group">
                Explore the Network <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Tools & Workflows */}
      <section className="py-40 px-6 relative overflow-hidden bg-glass border-b border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto text-center max-w-4xl relative z-10">
          <AnimatedSection>
            <Microchip className="w-10 h-10 text-[var(--accent)] mx-auto mb-8" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light tracking-wide text-primary mb-8">
              Fluency in <span className="italic text-[var(--accent)] font-medium">scientific tooling.</span>
            </h2>
            <p className="text-lg text-secondary leading-relaxed mb-12 max-w-2xl mx-auto">
              Modern AI systems write code to verify math and run simulations to test physics. Our experts are natively fluent in the tools your models use to execute their logic.
            </p>
            
            <div className="relative w-full overflow-hidden mt-12 py-4">
              {/* Left and Right Fade overlays */}
              <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

              <div className="flex">
                <motion.div
                  className="flex gap-4 md:gap-6 items-center pl-4 md:pl-6"
                  animate={{
                    x: ["0%", "-50%"],
                  }}
                  transition={{
                    ease: "linear",
                    duration: 25,
                    repeat: Infinity,
                  }}
                >
                  {[...['Python', 'MATLAB', 'Wolfram', 'TensorFlow', 'PyTorch', 'CAD Systems', 'LaTeX', 'R', 'Simulation Engines', 'C++'], ...['Python', 'MATLAB', 'Wolfram', 'TensorFlow', 'PyTorch', 'CAD Systems', 'LaTeX', 'R', 'Simulation Engines', 'C++']].map((tool, index) => (
                    <span 
                      key={`${tool}-${index}`}
                      className="flex-shrink-0 px-6 py-3 border border-subtle rounded-full text-sm font-medium bg-secondary text-primary hover:border-[var(--accent)] transition-colors cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Alignment / Text Reveal Section */}
      <section className="py-40 px-6 bg-glass border-b border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] relative overflow-hidden">
        <DepthElement offset={80} className="absolute inset-0 pointer-events-none grid grid-cols-2 lg:grid-cols-4 gap-8 p-12 opacity-30">
           <div className="border border-[var(--text-primary)] rounded-full w-full aspect-square opacity-5"></div>
           <div className="bg-[var(--accent)] rounded-[40px] w-full aspect-square opacity-[0.02]"></div>
        </DepthElement>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
           <AnimatedTextReveal 
             text="Intelligence mapping operates at the boundaries of human knowledge. We bridge the gap between machine approximation and scientific truth."
             className="text-3xl md:text-4xl lg:text-5xl font-serif font-light leading-[1.3] text-primary tracking-wide justify-center text-center" 
           />
        </div>
      </section>

      {/* Industries CTA */}
      <section className="py-32 px-6 border-t border-[rgba(255,255,255,0.1)] relative overflow-hidden bg-gradient-to-br from-orange-500/90 to-orange-600/90 backdrop-blur-2xl text-white">
        {/* Glassmorphism elements */}
        <div className="absolute inset-0 bg-white/5 opacity-50 pointer-events-none transform-gpu"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-400/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 glass-panel p-12 rounded-[40px] bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md">
          <AnimatedSection>
            <Zap className="w-10 h-10 text-white mx-auto mb-6 opacity-90 drop-shadow-md" />
            <h2 className="text-2xl lg:text-4xl font-serif italic font-light tracking-wide text-white mb-8 drop-shadow-sm">
              Powering AI Labs, Scientific Computing, and Enterprise Intelligence.
            </h2>
            <p className="text-lg text-white/90 mb-12 drop-shadow-sm">
               Connect with our technical team to discuss custom data pipelines, reasoning verification workflows, or evaluation benchmarks.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center bg-white/10 border border-white/30 text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-orange-600 shadow-sm hover:shadow-lg transition-all duration-300 group backdrop-blur-md">
              Discuss enterprise requirements <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}
