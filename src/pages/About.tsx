import { PageTransition } from '../components/PageTransition';
import { AnimatedSection } from '../components/AnimatedSection';
import { DepthElement } from '../components/DepthElement';
import { Network, Microscope, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden min-h-[80vh] flex items-center">
        <DepthElement offset={20} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-luminosity dark:mix-blend-lighten grayscale filter" />
        </DepthElement>
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-[var(--accent)] opacity-[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <AnimatedSection className="max-w-5xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold tracking-[0.2em] uppercase mb-8">
               <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
               Building the Truth Layer
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-[1.1] mb-10 text-primary">
              Scientific infrastructure driven by <br/>
              <span className="font-sans font-semibold text-[var(--accent)] not-italic tracking-normal">human intellect.</span>
            </h1>
            <div className="max-w-3xl">
              <p className="text-xl md:text-2xl text-secondary font-light leading-relaxed mb-10">
                STEM AI TRAINERS isolates signal from noise. We provide the critical human intelligence—vetted PhDs, researchers, and domain experts—required to structure, train, and verify the world's most advanced reasoning operations.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Metrics / Impact Ribbon */}
      <section className="py-20 px-6 bg-[var(--bg-secondary)] border-y border-subtle overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {[
            { metric: "20+", label: "Domains including STEM+coding" },
            { metric: "99.9%", label: "Accuracy Target" },
            { metric: "5M+", label: "Tokens Verified" },
            { metric: "24/7", label: "Global Coverage" },
          ].map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.1} className={`flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-transparent hover:border-subtle hover:bg-primary transition-all duration-500`}>
               <div className="text-5xl md:text-6xl font-serif font-light text-[var(--accent)] mb-4 drop-shadow-sm">
                 {stat.metric}
               </div>
               <div className="text-sm uppercase tracking-[0.2em] font-bold text-secondary">{stat.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Philosophy Stack */}
      <section className="py-32 px-6 relative bg-primary">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-24 text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-primary leading-tight">
              A paradigm shift in <br className="hidden md:block" /> <span className="font-sans font-semibold text-[var(--accent)] not-italic tracking-normal">model evaluation.</span>
            </h2>
          </AnimatedSection>
          
          <div className="space-y-8">
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 bg-[var(--bg-secondary)] rounded-[40px] p-8 md:p-12 lg:p-0 overflow-hidden border border-subtle group hover:border-[var(--accent)]/30 transition-colors">
                <div className="flex-1 lg:p-16 flex flex-col justify-center relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary shadow-sm border border-subtle flex items-center justify-center text-[var(--accent)] mb-8">
                    <Network className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif italic mb-6 text-primary">Beyond Gig Work</h3>
                  <p className="text-xl text-secondary leading-relaxed font-light">
                    We believe that the next breakthrough in AI requires more than just compute. It requires high-fidelity, structured human reasoning. We do not treat annotation as a low-skill task. We implement peer-review structures akin to academic publishing.
                  </p>
                </div>
                <div className="flex-1 lg:min-h-[500px] relative rounded-3xl lg:rounded-none overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" alt="Laboratory work" className="absolute inset-0 w-full h-full object-cover filter grayscale mix-blend-multiply dark:mix-blend-lighten opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r lg:from-[var(--bg-secondary)] to-transparent lg:w-32 opacity-0 lg:opacity-100" />
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-0 bg-[var(--bg-secondary)] rounded-[40px] p-8 md:p-12 lg:p-0 overflow-hidden border border-subtle group hover:border-[var(--accent)]/30 transition-colors">
                <div className="flex-1 lg:p-16 flex flex-col justify-center relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary shadow-sm border border-subtle flex items-center justify-center text-[var(--accent)] mb-8">
                    <Microscope className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif italic mb-6 text-primary">Quality Absolute First</h3>
                  <p className="text-xl text-secondary leading-relaxed font-light">
                    Every training data point is validated. From verifying topology theorems to translating differential geometry, our network ensures scientific precision over sheer volume. There is no compromise on correctness.
                  </p>
                </div>
                <div className="flex-1 lg:min-h-[500px] relative rounded-3xl lg:rounded-none overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1200" alt="Microscope analysis" className="absolute inset-0 w-full h-full object-cover filter grayscale mix-blend-multiply dark:mix-blend-lighten opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-l lg:from-[var(--bg-secondary)] to-transparent lg:w-32 opacity-0 lg:opacity-100" />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 bg-[var(--bg-secondary)] rounded-[40px] p-8 md:p-12 lg:p-0 overflow-hidden border border-subtle group hover:border-[var(--accent)]/30 transition-colors">
                <div className="flex-1 lg:p-16 flex flex-col justify-center relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary shadow-sm border border-subtle flex items-center justify-center text-[var(--accent)] mb-8">
                    <Activity className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif italic mb-6 text-primary">Agile Deployment</h3>
                  <p className="text-xl text-secondary leading-relaxed font-light">
                    Scale expert teams dynamically. As ingestion demands fluctuate, our proprietary orchestration software seamlessly routes complex subtasks to the most qualified available scientists.
                  </p>
                </div>
                <div className="flex-1 lg:min-h-[500px] relative rounded-3xl lg:rounded-none overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" alt="Data orchestration" className="absolute inset-0 w-full h-full object-cover filter grayscale mix-blend-multiply dark:mix-blend-lighten opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r lg:from-[var(--bg-secondary)] to-transparent lg:w-32 opacity-0 lg:opacity-100" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Foundational Layer Hero */}
      <section className="py-40 px-6 relative overflow-hidden bg-primary border-t border-subtle">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-fixed bg-center opacity-10 mix-blend-luminosity dark:mix-blend-lighten grayscale pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-5xl md:text-7xl font-serif font-light text-primary mb-8">The Foundational <span className="font-sans font-semibold text-[var(--accent)] tracking-tight">Layer.</span></h2>
            <p className="text-2xl text-secondary leading-relaxed font-light mb-12">
               As computational models tackle harder problems—from drug discovery to advanced physics—they need a reliable arbiter of truth. We provide the infrastructure that makes empirical sense of the abstract.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center bg-[var(--accent)] text-white px-10 py-5 rounded-full font-bold hover:bg-opacity-90 transition-all text-lg shadow-xl hover:-translate-y-1 hover:shadow-2xl">
               Join the Network
            </Link>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Operations Model Steps */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-24 max-w-4xl mx-auto">
            <p className="inline-block px-4 py-1.5 rounded-full border border-subtle text-xs font-bold tracking-[0.2em] uppercase mb-8 text-[var(--accent)] bg-[var(--bg-secondary)]">The Pipeline</p>
            <h2 className="text-5xl md:text-6xl font-serif font-light tracking-tight text-primary mb-8">Systematic Operations</h2>
            <p className="text-2xl text-secondary leading-relaxed font-light">
              We replace chaotic, opaque data crowd-sourcing with a precise, auditable managed pipeline ensuring high-signal yields.
            </p>
          </AnimatedSection>
          
          <div className="relative">
             <div className="absolute top-1/2 left-0 right-0 h-px bg-subtle hidden md:block -z-10" />
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
               {[
                 {
                   step: "01",
                   title: "Scoping & Curation",
                   desc: "We analyze your domains (e.g., topology, quantum mechanics) and actively curate a bespoke cohort from our proprietary network of verified academic authors."
                 },
                 {
                   step: "02",
                   title: "Workflow Engineering",
                   desc: "We develop precise annotation guidelines, LaTeX-native interfaces, and integration paths ensuring our output perfectly matches your system's ingestion formats."
                 },
                 {
                   step: "03",
                   title: "Execution & Audit",
                   desc: "Continuous delivery supported by multi-pass reviews. Our automated adversarial tracking stops drift and guarantees mathematical soundness and alignment."
                 }
               ].map((item, i) => (
                 <AnimatedSection key={i} delay={0.1 * (i + 1)} className="bg-[var(--bg-secondary)] p-10 lg:p-14 border border-subtle rounded-[40px] relative shadow-sm hover:shadow-xl transition-shadow mt-12 md:mt-0 group">
                    <div className="absolute -top-10 left-10 w-20 h-20 rounded-[24px] bg-[var(--accent)] text-white flex items-center justify-center font-serif text-3xl shadow-lg group-hover:-translate-y-2 transition-transform duration-500">
                      {item.step}
                    </div>
                    <h3 className="text-3xl font-serif italic tracking-tight text-primary mt-8 mb-6">{item.title}</h3>
                    <p className="text-lg text-secondary leading-relaxed font-light">{item.desc}</p>
                 </AnimatedSection>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 border-t border-subtle bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)] opacity-[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
           <AnimatedSection>
              <h2 className="text-5xl md:text-7xl font-serif font-light text-primary mb-8">Ready to <span className="text-[var(--accent)] font-semibold font-sans tracking-tight">supercharge</span> your model?</h2>
              <p className="text-2xl text-secondary mb-14 font-light max-w-3xl mx-auto">Whether scaling an RLHF campaign or bootstrapping specialized benchmarks, we have the human infrastructure to support you.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Link to="/contact" className="bg-[var(--accent)] text-white px-10 py-5 rounded-full font-bold hover:bg-opacity-90 transition-all text-lg shadow-xl hover:-translate-y-1">
                   Schedule a Consultation
                 </Link>
                 <Link to="/pricing" className="border border-subtle bg-primary text-primary px-10 py-5 rounded-full font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all text-lg shadow-sm hover:shadow-md">
                   Explore Pricing
                 </Link>
              </div>
           </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}

