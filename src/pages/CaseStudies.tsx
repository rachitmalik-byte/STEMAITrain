import { PageTransition } from '../components/PageTransition';
import { AnimatedSection } from '../components/AnimatedSection';
import { TiltCard } from '../components/TiltCard';
import { ArrowUpRight, BrainCircuit, Code2, Zap } from 'lucide-react';

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "LLM Reasoning Optimization",
      client: "Leading AI Research Lab",
      metric: "47%",
      metricDesc: "Improvement on GSM8K Benchmark",
      tags: ["Mathematics", "LLM Eval", "RLHF"],
      icon: Zap,
      challenge: "The lab's flagship model struggled with multi-step mathematical reasoning. Standard outsourced RLHF data contained subtle logical leaps and hidden errors that confused the model during the fine-tuning phase.",
      solution: "We deployed a specialized cohort of 50 Ph.D. mathematicians. They created thousands of step-by-step proofs with intentionally injected adversarial errors to train the model's self-correction capabilities. Real-time verification loops ensured 100% logical consistency across the dataset.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Biomedical Data Structuring",
      client: "Global Healthcare AI Startup",
      metric: "60%",
      metricDesc: "Reduction in Clinical Hallucinations",
      tags: ["Biology", "Healthcare", "Data Structuring"],
      icon: BrainCircuit,
      challenge: "Extracting structured relationship data from complex, unstructured clinical trial documents resulted in high hallucination rates when facts were queried by medical staff. Previous solutions could not distinguish between nuanced assertions.",
      solution: "Our network of certified biomedical researchers manually mapped thousands of clinical assertions into structured graphs. We enforced strict semantic rules, catching nuances that automated NER pipelines completely missed. The structured data served as a pristine fine-tuning base.",
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Vulnerability Patching AI",
      client: "Enterprise Security Firm",
      metric: "3x",
      metricDesc: "Faster Vulnerability Detection",
      tags: ["Cybersecurity", "Computer Science", "Code Review"],
      icon: Code2,
      challenge: "Training an AI to autonomously detect and propose patches for zero-day vulnerabilities required a dataset of highly complex, undocumented exploits that didn't exist in open-source repositories.",
      solution: "Senior security engineers in our network generated novel, synthetic vulnerabilities across multiple languages and architectures. They paired each exploit with a formally verified patch, providing the model with a robust, adversarial training ground.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-secondary font-mono text-sm tracking-wider uppercase">Resources</span>
            <span className="text-subtle">/</span>
            <span className="text-[var(--accent)] font-mono text-sm tracking-wider uppercase">Case Studies</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-sans tracking-tight text-primary font-medium mb-6">
            Case Studies
          </h1>
          <p className="text-xl md:text-2xl text-secondary font-light max-w-3xl leading-relaxed mb-20">
            Discover how leading AI labs and enterprises leverage our rigorous data verification loops to achieve breakthrough model performance.
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-32">
          {caseStudies.map((study, idx) => (
            <div key={idx} className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative border-t border-subtle pt-16">
              
              {/* Sticky Left Sidebar with Case Study Details */}
              <div className="w-full lg:w-1/3 flex-shrink-0">
                <div className="lg:sticky lg:top-32 flex flex-col gap-8">
                  <div className="w-16 h-16 rounded-3xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shadow-sm">
                    <study.icon className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <div className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">{study.client}</div>
                    <h2 className="text-3xl md:text-4xl font-medium text-primary leading-tight">
                      {study.title}
                    </h2>
                  </div>
                  
                  <div className="p-6 bg-secondary border border-subtle rounded-3xl mt-4">
                    <div className="text-5xl font-bold text-primary mb-2 tracking-tight">{study.metric}</div>
                    <div className="text-sm text-secondary font-medium">{study.metricDesc}</div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {study.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono px-3 py-1.5 bg-[var(--bg-primary)] text-primary rounded-full border border-subtle">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scrollable Right Content */}
              <div className="w-full lg:w-2/3 flex flex-col gap-10">
                <TiltCard className="w-full h-[350px] md:h-[500px] p-0 overflow-hidden rounded-[2rem] border border-subtle shadow-sm group">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </TiltCard>

                <AnimatedSection delay={0.2} className="flex flex-col gap-10">
                  <div>
                    <h3 className="text-2xl font-medium text-primary mb-6 flex items-center">
                      <span className="w-8 h-px bg-[var(--accent)] mr-4"></span> The Challenge
                    </h3>
                    <p className="text-lg text-secondary font-light leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-medium text-primary mb-6 flex items-center">
                      <span className="w-8 h-px bg-[var(--accent)] mr-4"></span> The Solution
                    </h3>
                    <p className="text-lg text-secondary font-light leading-relaxed">
                      {study.solution}
                    </p>
                  </div>

                  <button className="flex items-center justify-center gap-2 text-[var(--bg-primary)] bg-[var(--text-primary)] px-8 py-4 rounded-full font-bold w-fit hover:opacity-90 transition-opacity mt-4">
                    Read Full Technical Report <ArrowUpRight className="w-5 h-5" />
                  </button>
                </AnimatedSection>
              </div>

            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
