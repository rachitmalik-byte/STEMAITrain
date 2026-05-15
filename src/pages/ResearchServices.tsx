import { PageTransition } from '../components/PageTransition';
import { AnimatedSection } from '../components/AnimatedSection';
import { ArrowRight, CheckCircle2, Users, FileText, Database, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResearchServices() {
  const steps = [
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      title: "1. Consultation & Scoping",
      desc: "We discuss your specific STEM data requirements, required expertise levels, and project timeline."
    },
    {
      icon: <FileText className="w-6 h-6 text-orange-500" />,
      title: "2. Custom Recruitment",
      desc: "Our team sources and verifies experts matching your exact criteria from our network and beyond."
    },
    {
      icon: <Database className="w-6 h-6 text-orange-500" />,
      title: "3. Workflow Design",
      desc: "We design and test the annotation or generation workflow to ensure high-quality data output."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
      title: "4. Execution & QA",
      desc: "Experts complete the tasks while our QA team continuously monitors for accuracy and consistency."
    },
    {
      icon: <Zap className="w-6 h-6 text-orange-500" />,
      title: "5. Delivery",
      desc: "You receive clean, formatted, and verified STEM data ready for model training or evaluation."
    }
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-20 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 tracking-wide text-primary leading-tight">
                Scale your research with <span className="font-sans font-semibold text-[var(--accent)] not-italic tracking-normal">Managed Services</span>
              </h1>
              <p className="text-xl text-secondary font-light leading-relaxed mb-8">
                Offload the operational complexity of sourcing, verifying, and managing specialized STEM data collection. Our dedicated team handles everything from custom recruitment to advanced quality assurance.
              </p>
              <Link to="/contact" className="inline-flex flex-row items-center gap-2 bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity">
                Discuss Your Project <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
            
            <AnimatedSection className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
                  alt="Research team planning"
                  className="w-full h-full object-cover filter contrast-[1.1] grayscale-[20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[var(--bg-secondary)] border border-subtle p-6 rounded-2xl shadow-xl w-64 backdrop-blur-md">
                <p className="text-sm font-semibold text-primary mb-2">Saved Time per Project</p>
                <div className="text-4xl font-light text-[var(--accent)]">40+ hours</div>
                <p className="text-xs text-secondary mt-2">On average compared to self-serve recruitment.</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Why Managed Services */}
          <AnimatedSection className="mb-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif text-primary mb-4">When to choose Managed Services?</h2>
              <p className="text-secondary text-lg">Perfect for enterprise labs and teams with complex workflow requirements.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Niche Recruitment", desc: "You need extremely specific expertise (e.g., Post-Docs in Quantum Cryptography) that requires active, custom sourcing." },
                { title: "Complex Logistics", desc: "Your project involves multi-step workflows, longitudinal studies, or specialized software environments." },
                { title: "Rigorous QA Needs", desc: "You require strict adherence to formatting, custom rubrics, and dedicated peer-review layers before delivery." }
              ].map((item, i) => (
                <div key={i} className="bg-primary border border-subtle p-8 rounded-3xl shadow-sm hover:border-[var(--accent)]/50 transition-colors">
                  <CheckCircle2 className="w-8 h-8 text-[var(--accent)] mb-6" />
                  <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
                  <p className="text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* How it works */}
          <AnimatedSection className="bg-[var(--bg-secondary)] rounded-[40px] p-10 lg:p-16 border border-subtle mb-32">
            <h2 className="text-3xl lg:text-4xl font-serif text-primary mb-12 text-center">Our End-to-End Process</h2>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[27px] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:-translate-x-px md:before:w-0.5 before:bg-[var(--accent)]/30">
              {steps.map((step, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-[var(--bg-secondary)] bg-white dark:bg-gray-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 mx-auto">
                    {step.icon}
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-primary p-6 rounded-2xl border border-subtle shadow-sm">
                    <h4 className="text-lg font-semibold text-primary mb-2">{step.title}</h4>
                    <p className="text-secondary text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  );
}
