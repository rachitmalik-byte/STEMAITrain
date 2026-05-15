import { PageTransition } from '../components/PageTransition';
import { AnimatedSection } from '../components/AnimatedSection';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { BrainCircuit, Globe as GlobeIcon, Code2, GraduationCap, ShieldCheck, AlignLeft, Users, Zap, CheckCircle2 } from 'lucide-react';
import { NetworkMap } from '../components/NetworkMap';
import { Link } from 'react-router-dom';

export default function Experts() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden bg-primary border-b border-subtle">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-[var(--accent)] opacity-[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <AnimatedSection className="w-full lg:w-1/2 relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold tracking-[0.2em] uppercase mb-8">
                 <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                 Global Network Active
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight leading-[1.1] mb-8 text-primary">
                The <span className="italic text-[var(--accent)] font-medium">Expert</span> Network
              </h1>
              <p className="text-xl md:text-2xl text-secondary font-light max-w-2xl leading-relaxed mb-10">
                A highly-vetted, globally distributed intelligence layer of independent researchers, PhDs, and domain specialists. Kept anonymous to preserve integrity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <Link to="/contact" className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                   Deploy a Team
                 </Link>
                 <Link to="/research-services" className="border border-subtle bg-secondary text-primary px-8 py-4 rounded-full font-bold hover:border-[var(--accent)] transition-colors text-center">
                   Explore Capabilities
                 </Link>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0">
              <div className="relative w-full max-w-lg aspect-square md:aspect-[4/3] lg:aspect-square bg-primary rounded-[40px] border border-subtle overflow-hidden p-8 flex flex-col justify-between shadow-xl">
                <NetworkMap />
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40 mb-2">Network Status</p>
                    <p className="text-3xl font-serif tracking-wide text-primary"><AnimatedCounter value={1000} suffix="+" /> <span className="italic">Experts</span></p>
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
                
                <div className="mt-4 flex justify-between items-center relative z-10">
                  <p className="text-xs text-secondary font-mono">Global nodes: 30+ countries</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Network Metrics Ribbon */}
      <section className="py-12 bg-[var(--bg-secondary)] border-b border-subtle overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
             <AnimatedSection delay={0.1} className="flex items-center gap-4">
                <Users className="w-8 h-8 text-[var(--accent)] opacity-80" />
                <div>
                   <p className="text-3xl font-serif text-primary">1,200+</p>
                   <p className="text-xs uppercase tracking-widest text-secondary font-bold">Active Nodes</p>
                </div>
             </AnimatedSection>
             <AnimatedSection delay={0.2} className="flex items-center gap-4">
                <GlobeIcon className="w-8 h-8 text-[var(--accent)] opacity-80" />
                <div>
                   <p className="text-3xl font-serif text-primary">45</p>
                   <p className="text-xs uppercase tracking-widest text-secondary font-bold">Countries</p>
                </div>
             </AnimatedSection>
             <AnimatedSection delay={0.3} className="flex items-center gap-4">
                <GraduationCap className="w-8 h-8 text-[var(--accent)] opacity-80" />
                <div>
                   <p className="text-3xl font-serif text-primary">82%</p>
                   <p className="text-xs uppercase tracking-widest text-secondary font-bold">PhD / Postdoc</p>
                </div>
             </AnimatedSection>
             <AnimatedSection delay={0.4} className="flex items-center gap-4">
                <Zap className="w-8 h-8 text-[var(--accent)] opacity-80" />
                <div>
                   <p className="text-3xl font-serif text-primary">&lt; 48h</p>
                   <p className="text-xs uppercase tracking-widest text-secondary font-bold">Deployment Time</p>
                </div>
             </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Domain Coverage */}
      <section className="py-32 px-6 bg-primary border-b border-subtle relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-primary mb-6">Unrivaled Domain Coverage</h2>
            <p className="text-xl text-secondary leading-relaxed font-light">
              We abstract away the complexity of sourcing. Our network covers over 50 specific STEM verticals, deeply specialized to ensure mathematically and logically rigorous output.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               {
                 title: "Advanced Mathematics",
                 fields: ["Algebraic Geometry", "Number Theory", "Category Theory", "Topology"],
                 icon: BrainCircuit
               },
               {
                 title: "Physics & Cosmology",
                 fields: ["Quantum Computing", "Astrophysics", "Fluid Dynamics", "Particle Physics"],
                 icon: GlobeIcon
               },
               {
                 title: "Computer Science",
                 fields: ["Machine Learning", "Cryptography", "Algorithms", "Systems Architecture"],
                 icon: Code2
               },
               {
                 title: "Biological Sciences",
                 fields: ["Computational Genomics", "Molecular Biology", "Neuroscience", "Bioinformatics"],
                 icon: ShieldCheck
               },
               {
                 title: "Chemistry & Materials",
                 fields: ["Physical Chemistry", "Materials Science", "Crystallography", "Organic Synthesis"],
                 icon: AlignLeft
               },
               {
                 title: "Engineering",
                 fields: ["Aerospace", "Robotics", "Microelectronics", "Civil Engineering"],
                 icon: CheckCircle2
               }
             ].map((domain, i) => (
               <AnimatedSection key={i} delay={i * 0.1} className="bg-[var(--bg-secondary)] border border-subtle rounded-[32px] p-8 md:p-10 group hover:border-[var(--accent)]/50 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-primary shadow-sm border border-subtle flex items-center justify-center text-[var(--accent)] mb-8 group-hover:scale-110 transition-transform">
                    <domain.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif text-primary mb-6">{domain.title}</h3>
                  <ul className="space-y-4">
                     {domain.fields.map((field, idx) => (
                       <li key={idx} className="flex items-center gap-3 text-secondary text-sm">
                         <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-50" />
                         {field}
                       </li>
                     ))}
                  </ul>
               </AnimatedSection>
             ))}
          </div>
        </div>
      </section>

      {/* Vetting Standard */}
      <section className="py-32 px-6 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
             <AnimatedSection className="w-full lg:w-1/2">
                <p className="inline-block px-4 py-1.5 rounded-full border border-subtle text-xs font-bold tracking-[0.2em] uppercase mb-8 text-[var(--accent)] bg-primary">The Standard</p>
                <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-primary mb-8 leading-tight">Rigorous Vetting Process</h2>
                <p className="text-xl text-secondary leading-relaxed mb-12 font-light">
                  A high-functioning intelligence network is bounded by the quality of its worst node. We operate extreme vetting parameters to ensure data integrity and prevent hallucination bleed from the annotator layer.
                </p>
                <div className="space-y-8">
                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary shadow-sm border border-subtle flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-6 h-6 text-[var(--accent)]" />
                        </div>
                        <div>
                            <h4 className="text-xl font-serif text-primary mb-2">Identity & Credential Verification</h4>
                            <p className="text-base text-secondary leading-relaxed font-light">Manual validation of institutional affiliations, degrees, published papers, and research history.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary shadow-sm border border-subtle flex items-center justify-center shrink-0">
                            <BrainCircuit className="w-6 h-6 text-[var(--accent)]" />
                        </div>
                        <div>
                            <h4 className="text-xl font-serif text-primary mb-2">Technical Assessments</h4>
                            <p className="text-base text-secondary leading-relaxed font-light">Domain-specific tests graded by existing senior network peers. Not just multiple-choice, but real reasoning derivation.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary shadow-sm border border-subtle flex items-center justify-center shrink-0">
                            <AlignLeft className="w-6 h-6 text-[var(--accent)]" />
                        </div>
                        <div>
                            <h4 className="text-xl font-serif text-primary mb-2">Formatting Fluency</h4>
                            <p className="text-base text-secondary leading-relaxed font-light">Verification of correct LaTeX syntax, markdown structuring, and the ability to strictly follow rubric architectures.</p>
                        </div>
                    </div>
                </div>
             </AnimatedSection>

             <AnimatedSection className="w-full lg:w-1/2">
                 <div className="bg-primary p-12 md:p-16 rounded-[40px] border border-subtle relative overflow-hidden group hover:border-[var(--accent)]/30 transition-colors">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity" />
                     
                     <p className="text-xs uppercase font-bold tracking-[0.2em] text-[var(--accent)] mb-6">Acceptance Rate</p>
                     <p className="text-8xl md:text-[9rem] font-serif font-light text-primary mb-8 leading-none tracking-tighter">4.2<span className="text-6xl">%</span></p>
                     <p className="text-primary text-xl md:text-2xl font-light leading-relaxed mb-6">Of all academic applicants are successfully onboarded to active projects.</p>
                     <p className="text-base text-secondary font-light leading-relaxed">We maintain a lean, highly active pool of verified contributors rather than an inflated, inactive database.</p>
                     
                     <div className="mt-12 pt-12 border-t border-subtle">
                        <p className="text-xs uppercase font-bold tracking-[0.2em] text-secondary mb-4">Average Project Rating</p>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-8 h-8 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                     </div>
                 </div>
             </AnimatedSection>
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-subtle bg-primary">
          <div className="max-w-4xl mx-auto text-center">
             <AnimatedSection>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-8">Ready to utilize the network?</h2>
                <p className="text-xl text-secondary mb-12 font-light">Stop sourcing randomly. Start training with verifiable truth.</p>
                <Link to="/contact" className="inline-block bg-[var(--accent)] text-white px-10 py-5 rounded-full font-bold hover:bg-opacity-90 transition-all text-lg shadow-xl hover:-translate-y-1">
                   Get in Touch
                </Link>
             </AnimatedSection>
          </div>
      </section>
    </PageTransition>
  );
}
