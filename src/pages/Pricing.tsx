import { useState, useMemo } from 'react';
import { PageTransition } from '../components/PageTransition';
import { AnimatedSection } from '../components/AnimatedSection';
import { Check, Info, Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [participants, setParticipants] = useState<number>(100);
  const [studyDuration, setStudyDuration] = useState<number>(30); // in minutes
  const [expertLevel, setExpertLevel] = useState<'standard' | 'phd' | 'postdoc'>('phd');
  const [complexity, setComplexity] = useState<'simple' | 'moderate' | 'complex'>('moderate');
  const [turnaround, setTurnaround] = useState<'standard' | 'expedited' | 'urgent'>('standard');
  
  const hourlyRates = {
    standard: 45,
    phd: 90,
    postdoc: 150
  };

  const calculatedPrice = useMemo(() => {
    const hoursPerParticipant = studyDuration / 60;
    
    let rate = hourlyRates[expertLevel];
    
    // Complexity multipliers
    if (complexity === 'moderate') rate *= 1.2;
    if (complexity === 'complex') rate *= 1.5;

    // Turnaround multipliers
    if (turnaround === 'expedited') rate *= 1.25;
    if (turnaround === 'urgent') rate *= 1.6;

    const baseCost = participants * hoursPerParticipant * rate;
    const platformFee = baseCost * 0.25; // 25% platform fee
    return baseCost + platformFee;
  }, [participants, studyDuration, expertLevel, complexity, turnaround]);

  return (
    <PageTransition>
      <div className="pt-32 pb-20 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center max-w-4xl mx-auto mb-24 mt-10">
            <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 tracking-tight text-primary">
              Acquire top-tier human feedback, <br className="hidden md:block" />
              <span className="font-sans font-semibold text-[var(--accent)] not-italic tracking-normal">delivered fast.</span>
            </h1>
            <p className="text-xl text-secondary font-light leading-relaxed mb-10 max-w-3xl mx-auto">
              Versatile options for premium data collection. Choose from our transparent pay-as-you-go packages, or explore our specialized, expert-led business and enterprise solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/contact" className="w-full sm:w-auto bg-[var(--accent)] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl">
                Talk to an expert
              </Link>
              <Link to="/contact" className="w-full sm:w-auto border-2 border-[var(--accent)] text-[var(--accent)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--accent)] hover:bg-opacity-5 transition-all">
                Get started for free
              </Link>
            </div>
            <p className="text-sm font-semibold text-secondary/70 uppercase tracking-widest">
              Trusted by thousands of innovative organizations
            </p>
          </AnimatedSection>
          
          {/* Price Estimator */}
          <AnimatedSection className="mb-32">
            <div className="bg-[var(--bg-secondary)] border border-subtle rounded-3xl p-8 lg:p-12 shadow-sm max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-3/5 space-y-8">
                <div>
                  <h3 className="text-2xl font-serif mb-2 text-primary flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-[var(--accent)]" /> Price Estimator
                  </h3>
                  <p className="text-secondary text-sm">Estimate the cost of your STEM data collection or RLHF project.</p>
                </div>
                
                <div className="space-y-6">
                  {/* Participants Slider */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-primary rounded-lg p-4 border border-subtle">
                      <label className="text-sm font-semibold text-primary">Number of Experts / Annotators</label>
                      <span className="font-mono text-lg font-medium text-[var(--accent)]">{participants}</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="1000" 
                      value={participants}
                      onChange={(e) => setParticipants(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                    />
                  </div>

                  {/* Duration Slider */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-primary rounded-lg p-4 border border-subtle">
                      <label className="text-sm font-semibold text-primary">Average Time per Task (Minutes)</label>
                      <span className="font-mono text-lg font-medium text-[var(--accent)]">{studyDuration} min</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="180" 
                      step="5"
                      value={studyDuration}
                      onChange={(e) => setStudyDuration(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                    />
                  </div>

                  {/* Level Slider */}
                  <div className="space-y-4 pt-4 border-t border-subtle">
                    <label className="text-sm font-semibold text-primary block mb-4">Required Expertise Level</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {([
                        { id: 'standard', label: 'Graduate Level', rate: 'Base Rate' },
                        { id: 'phd', label: 'PhD Expert', rate: '2x Base Rate' },
                        { id: 'postdoc', label: 'Post-Doc', rate: '3.3x Base Rate' }
                      ] as const).map((level) => (
                        <button
                          key={level.id}
                          onClick={() => setExpertLevel(level.id)}
                          className={`p-4 rounded-xl text-left border transition-all ${
                            expertLevel === level.id 
                              ? 'border-[var(--accent)] bg-[var(--accent)]/5' 
                              : 'border-subtle hover:border-[var(--accent)]/50'
                          }`}
                        >
                          <div className={`font-semibold text-sm mb-1 ${expertLevel === level.id ? 'text-[var(--accent)]' : 'text-primary'}`}>
                            {level.label}
                          </div>
                          <div className="text-xs text-secondary font-mono">{level.rate}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Complexity & Turnaround */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-subtle">
                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-primary block">Data Complexity</label>
                      <div className="flex flex-col gap-3">
                        {([
                          { id: 'simple', label: 'Standard', desc: 'Basic data matching' },
                          { id: 'moderate', label: 'Moderate (+20%)', desc: 'Multi-step reasoning' },
                          { id: 'complex', label: 'Complex (+50%)', desc: 'Deep custom logic' }
                        ] as const).map((level) => (
                          <button
                            key={level.id}
                            onClick={() => setComplexity(level.id)}
                            className={`p-3 rounded-lg text-left border transition-all ${
                              complexity === level.id 
                                ? 'border-[var(--accent)] bg-[var(--accent)]/5' 
                                : 'border-subtle hover:border-[var(--accent)]/50'
                            }`}
                          >
                            <div className={`font-semibold text-sm ${complexity === level.id ? 'text-[var(--accent)]' : 'text-primary'}`}>
                              {level.label}
                            </div>
                            <div className="text-xs text-secondary mt-1">{level.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-primary block">Turnaround Time</label>
                      <div className="flex flex-col gap-3">
                        {([
                          { id: 'standard', label: 'Flexible', desc: 'Standard queues' },
                          { id: 'expedited', label: 'Expedited (+25%)', desc: 'Priority access' },
                          { id: 'urgent', label: 'Urgent (+60%)', desc: '24-48h Guaranteed' }
                        ] as const).map((level) => (
                          <button
                            key={level.id}
                            onClick={() => setTurnaround(level.id)}
                            className={`p-3 rounded-lg text-left border transition-all ${
                              turnaround === level.id 
                                ? 'border-[var(--accent)] bg-[var(--accent)]/5' 
                                : 'border-subtle hover:border-[var(--accent)]/50'
                            }`}
                          >
                            <div className={`font-semibold text-sm ${turnaround === level.id ? 'text-[var(--accent)]' : 'text-primary'}`}>
                              {level.label}
                            </div>
                            <div className="text-xs text-secondary mt-1">{level.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Result Card */}
              <div className="w-full lg:w-2/5 flex flex-col h-full justify-center">
                <div className="bg-primary rounded-3xl p-8 border border-subtle shadow-md relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-50 z-0"></div>
                  <div className="relative z-10">
                    <p className="text-sm text-secondary uppercase tracking-widest font-semibold mb-2">Estimated Total Cost</p>
                    <h2 className="text-5xl lg:text-6xl font-light font-serif mb-6 text-primary flex items-start">
                      <span className="text-2xl mt-2 text-[var(--accent)]">$</span>
                      {calculatedPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </h2>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-sm text-secondary">
                        <span>Participant Reward</span>
                        <span>${(calculatedPrice * 0.8).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="flex justify-between text-sm text-secondary">
                        <span className="flex items-center gap-1">Platform Fee (25%) <Info className="w-3 h-3" /></span>
                        <span>${(calculatedPrice * 0.2).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>
                    
                    <Link to="/contact" className="w-full flex items-center justify-center gap-2 bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-4 rounded-full font-bold hover:opacity-90 transition-opacity">
                      Start Your Project <ArrowRight className="w-4 h-4" />
                    </Link>
                    <p className="text-xs text-secondary mt-4 text-center">Results are estimates. Final pricing may vary based on exact requirements and custom screening.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-32">
            <AnimatedSection className="bg-[var(--bg-secondary)] border border-subtle rounded-3xl p-10 flex flex-col hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <h3 className="text-2xl font-semibold mb-2 text-primary">Self-Serve</h3>
              <p className="text-secondary mb-6 h-12">For teams ready to configure, launch, and manage their own studies on our platform.</p>
              <div className="text-4xl font-light mb-8 text-primary">
                Pay as you go
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  'Access to 1000+ verified STEM experts',
                  'Basic demographic & academic screening',
                  'Standard data quality checks',
                  'Email support',
                  'No subscription required'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-primary text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="w-full block text-center border border-[var(--text-primary)] text-primary px-6 py-3 rounded-full font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors">
                Get Started
              </Link>
            </AnimatedSection>

            <AnimatedSection className="bg-[var(--bg-primary)] border-2 border-[var(--accent)] rounded-3xl p-10 flex flex-col relative shadow-lg">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-[var(--accent)] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Recommended
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-primary">Managed Services</h3>
              <p className="text-secondary mb-6 h-12">End-to-end project management, custom recruitment, and advanced quality assurance.</p>
              <div className="text-4xl font-light mb-8 text-primary">
                Custom Quote
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  'Dedicated Project Manager',
                  'Customized expert sourcing',
                  'Complex multi-step workflows',
                  'Advanced quality assurance protocols',
                  'Custom data formatting & API endpoints',
                  'Priority support & SLA'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-primary text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="w-full block text-center bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                Contact Sales
              </Link>
            </AnimatedSection>
          </div>

          {/* New Enterprise Call to Action */}
          <AnimatedSection className="max-w-5xl mx-auto bg-primary border bg-[var(--bg-secondary)] border-subtle rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-lg text-center md:text-left mb-32">
            <div className="max-w-2xl">
               <h2 className="text-3xl md:text-5xl font-serif text-primary font-light mb-4">
                 Require an <span className="font-sans font-semibold text-[var(--accent)] tracking-tight">Enterprise Solution?</span>
               </h2>
               <p className="text-lg text-secondary leading-relaxed">
                 For high-volume operations, custom SLAs, dedicated infrastructure, and advanced compliance needs, our enterprise team is ready to build a bespoke pipeline tailored to your exacting constraints.
               </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
               <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-white px-8 py-5 rounded-full font-bold hover:bg-opacity-90 transition-all text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full md:w-auto">
                 Contact Sales <ArrowRight className="w-5 h-5" />
               </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  );
}
