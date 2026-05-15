import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { AnimatedSection } from '../components/AnimatedSection';
import { clsx } from 'clsx';
import { NetworkMap } from '../components/NetworkMap';
import { ChevronRight, ExternalLink, Zap, BrainCircuit, CheckCircle2, ArrowRight, BookOpen, Users, Target, Shield, FileSearch, Code, FileText } from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { motion, AnimatePresence } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

export default function Resources() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'Data quality';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
  const [expandedGuide, setExpandedGuide] = useState<number | null>(null);
  const [expandedAcademic, setExpandedAcademic] = useState<number | null>(null);

  const sidebarLinks = [
    'Data quality',
    'Audience Finder',
    'Academic research',
    'Managed Services',
    'Domain Experts',
    'Guides & Tutorials',
    'Articles',
    'FAQ & Help'
  ];

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && sidebarLinks.includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Data quality':
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-12"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-sans tracking-tight text-primary font-medium mb-6">
                Turn scientific expertise into smarter AI
              </h1>
              <p className="text-xl text-secondary font-light leading-relaxed mb-6">
                Join a remote STEM project. Design research-level challenges that train next-gen AI. Earn while advancing the field.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="px-4 py-2 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium border border-[var(--accent)]/20 shadow-sm">Remote Working</div>
                <div className="px-4 py-2 rounded-full bg-secondary text-primary text-sm font-medium border border-subtle shadow-sm">Flexible Hours</div>
                <div className="px-4 py-2 rounded-full bg-secondary text-primary text-sm font-medium border border-subtle shadow-sm">Top Tier Pay</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full h-px bg-subtle" />
            
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl tracking-tight font-medium text-primary mb-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-[var(--accent)]" />
                </div>
                About the project
              </h2>
              <p className="text-secondary font-light leading-relaxed mb-6 text-lg">
                We are building the intelligence layer for frontier AI models. Raw scale is no longer the differentiator. The mathematical logic underlying complex reasoning models is bottle-necked by human intelligence data that is highly accurate and expertly verified. 
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TiltCard className="p-8 rounded-3xl border border-subtle bg-[var(--bg-primary)] group h-full shadow-sm">
                <motion.div variants={itemVariants} className="flex flex-col h-full justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                      <Target className="w-6 h-6 text-primary group-hover:text-[var(--accent)] transition-colors" />
                    </div>
                    <h3 className="text-xl font-medium text-primary mb-3 transition-colors group-hover:text-[var(--accent)]">Mathematics & Physics</h3>
                    <p className="text-secondary font-light leading-relaxed mb-6">
                      Define rigorous proofs, evaluate theorems, and stress-test logical step-by-step reasoning for models.
                    </p>
                  </div>
                  <div className="flex items-center text-primary text-sm font-bold group-hover:text-[var(--accent)] transition-colors mt-auto w-fit">
                    Explore domain <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </TiltCard>
              <TiltCard className="p-8 rounded-3xl border border-subtle bg-[var(--bg-primary)] group h-full shadow-sm">
                <motion.div variants={itemVariants} className="flex flex-col h-full justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                      <Code className="w-6 h-6 text-primary group-hover:text-[var(--accent)] transition-colors" />
                    </div>
                    <h3 className="text-xl font-medium text-primary mb-3 transition-colors group-hover:text-[var(--accent)]">Computer Science</h3>
                    <p className="text-secondary font-light leading-relaxed mb-6">
                      Review generated code, assess complexity, patch vulnerabilities, and optimize algorithmic structures.
                    </p>
                  </div>
                  <div className="flex items-center text-primary text-sm font-bold group-hover:text-[var(--accent)] transition-colors mt-auto w-fit">
                    Explore domain <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </TiltCard>
            </div>

            <motion.div variants={itemVariants} className="p-10 rounded-3xl bg-[var(--accent)]/5 border border-[var(--accent)]/20 mt-4 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
               <div className="absolute top-0 right-0 p-8 transform translate-x-1/4 -translate-y-1/4 opacity-10 pointer-events-none transition-transform group-hover:scale-110">
                 <Zap className="w-48 h-48 text-[var(--accent)]" />
               </div>
               <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
                 <div>
                   <h3 className="text-2xl tracking-tight font-medium text-primary mb-4">Current opportunities</h3>
                   <p className="text-secondary font-light leading-relaxed max-w-xl">
                     AI training opportunities open regularly. Be the first to hear about them and contribute to complex domain scaling.
                   </p>
                 </div>
                 <button className="bg-[var(--accent)] text-white px-8 py-4 rounded-full text-sm font-bold tracking-wide shadow-lg hover:shadow-[0_10px_25px_-5px_var(--accent)] hover:-translate-y-1 transition-all duration-300">
                   Apply as an Expert
                 </button>
               </div>
            </motion.div>
          </motion.div>
        );
      case 'Domain Experts':
        return (
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl md:text-5xl font-sans tracking-tight text-primary font-medium mb-4">
              Domain Experts
            </h1>
            <p className="text-xl text-secondary font-light leading-relaxed">
              We recruit verified professionals across Medicine, Law, Engineering, and Hard Sciences. Our network performs adversarial testing and deep-reasoning verification for the world's most advanced LLMs.
            </p>
            <div className="bg-secondary rounded-[2.5rem] p-8 border border-subtle overflow-hidden relative min-h-[400px] md:min-h-[500px]">
              <NetworkMap />
            </div>
          </div>
        );
      case 'Pricing & Tiers':
        return (
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl md:text-5xl font-sans tracking-tight text-primary font-medium mb-4">
              Pricing Options
            </h1>
            <p className="text-xl text-secondary font-light leading-relaxed">
              Flexible sourcing models for scalable AI projects and academic research. Pay for verified outputs, not just time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="p-8 rounded-3xl border border-subtle bg-[var(--bg-primary)] flex flex-col">
                <h3 className="text-xl font-medium text-primary mb-2">Pay-As-You-Go</h3>
                <div className="text-3xl font-bold text-primary mb-4">$0.15<span className="text-base font-normal text-secondary"> / annotation</span></div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                   <li className="flex items-center text-sm text-secondary"><CheckCircle2 className="w-4 h-4 mr-2 text-[var(--accent)]" /> Standard QA loop</li>
                   <li className="flex items-center text-sm text-secondary"><CheckCircle2 className="w-4 h-4 mr-2 text-[var(--accent)]" /> 48-hour delivery</li>
                   <li className="flex items-center text-sm text-secondary"><CheckCircle2 className="w-4 h-4 mr-2 text-[var(--accent)]" /> Basic demographic filtering</li>
                </ul>
                <button className="w-full py-3 rounded-full bg-secondary text-primary font-semibold text-sm hover:opacity-80 transition">Get Started</button>
              </div>
              <div className="p-8 rounded-3xl border-2 border-[var(--accent)] bg-[var(--accent)]/5 relative flex flex-col">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">Recommended form Enterprise</div>
                <h3 className="text-xl font-medium text-primary mb-2">Dedicated Experts</h3>
                <div className="text-3xl font-bold text-primary mb-4">Custom<span className="text-base font-normal text-secondary"> / month</span></div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                   <li className="flex items-center text-sm text-secondary"><CheckCircle2 className="w-4 h-4 mr-2 text-[var(--accent)]" /> Verified PhD-level talent</li>
                   <li className="flex items-center text-sm text-secondary"><CheckCircle2 className="w-4 h-4 mr-2 text-[var(--accent)]" /> Multi-stage adversarial reasoning</li>
                   <li className="flex items-center text-sm text-secondary"><CheckCircle2 className="w-4 h-4 mr-2 text-[var(--accent)]" /> Dedicated Program Manager</li>
                </ul>
                <button className="w-full py-3 rounded-full bg-[var(--accent)] text-white font-semibold text-sm hover:opacity-90 transition">Contact Sales</button>
              </div>
            </div>
          </div>
        );
      case 'Audience Finder':
        return (
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl md:text-5xl font-sans tracking-tight text-primary font-medium mb-4">Audience Finder</h1>
            <p className="text-xl text-secondary font-light leading-relaxed">Pinpoint exactly the demographic or expertise profile your project requires with our proprietary screening algorithms.</p>
            <div className="p-8 rounded-3xl bg-secondary border border-subtle">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <Users className="w-16 h-16 text-[var(--accent)] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-medium text-primary mb-2">120+ Demographic Filters</h3>
                  <p className="text-secondary font-light">From professional certifications to cognitive assessment scores, source exactly who you need for your evaluations.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {['Code verification', 'Medical reasoning', 'Legal document analysis', 'Multilingual transcription'].map(t => (
                <div key={t} className="flex items-center p-4 border border-subtle rounded-2xl bg-[var(--bg-primary)]">
                  <Target className="w-5 h-5 text-secondary mr-3" />
                  <span className="text-primary font-medium text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Academic research':
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-12">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-sans tracking-tight text-primary font-medium mb-4">Academic Research</h1>
              <p className="text-xl text-secondary font-light leading-relaxed max-w-2xl">Trusted by top universities. We provide the infrastructure for behavioral studies, cognitive testing, and HCI research.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full min-h-[400px] md:min-h-[500px] rounded-[2.5rem] overflow-hidden relative border border-subtle bg-[var(--bg-primary)] shadow-sm">
              <div className="absolute inset-0 z-0">
                <NetworkMap />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/40 to-transparent z-10 pointer-events-none" />
              
              <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center flex-col text-center px-8">
                <div className="w-16 h-16 bg-[var(--bg-primary)] rounded-full flex items-center justify-center shadow-lg border border-subtle mb-4 cursor-pointer hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_var(--accent)] transition-all duration-300">
                  <BookOpen className="w-8 h-8 text-[var(--accent)]" />
                </div>
                <span className="text-primary font-medium text-xl md:text-2xl mb-2">Download the Academic Grant Guide</span>
                <span className="text-secondary text-sm font-mono flex items-center gap-2">
                  <FileText className="w-4 h-4" /> PDF • 2.4 MB
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <h3 className="text-2xl font-medium text-primary">Example Research Topics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Cognitive Load in LLM Interaction",
                    desc: "Measuring the cognitive effort required to prompt and verify complex models.",
                    content: "This research involves recruiting software engineers to interact with various coding assistants while tracking task completion time, perceived load, and eye-tracking metrics to identify periods of high cognitive strain.",
                    icon: BrainCircuit
                  },
                  {
                    title: "Algorithmic Bias in Healthcare AI",
                    desc: "Evaluating demographic disparities in diagnostic algorithms.",
                    content: "Using our medical expert panel, this study assesses how clinical LLMs respond to identical patient histories that only differ in demographic variables. The goal is to quantify bias and establish safe deployment guidelines.",
                    icon: Shield
                  },
                  {
                    title: "Trust and Reliance in Automated Systems",
                    desc: "Understanding why humans over-trust or under-trust AI outputs.",
                    content: "Through controlled behavioral experiments, participants are given a series of tasks with varying levels of AI assistance. By manipulating the AI's expressed confidence and actual accuracy, researchers study reliance behaviors.",
                    icon: Users
                  },
                  {
                    title: "Linguistic Alignment in Human-AI Chat",
                    desc: "Studying how human speech patterns adapt to conversational agents.",
                    content: "This study collects dialogue transcripts between users and customized chatbots to analyze lexical, syntactic, and semantic entrainment. It provides insights for designing more natural and persuasive AI personas.",
                    icon: BookOpen
                  }
                ].map((topic, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants} 
                    onClick={() => setExpandedAcademic(expandedAcademic === index ? null : index)}
                    className={clsx("p-6 rounded-3xl bg-secondary/50 border border-subtle flex flex-col cursor-pointer transition-all duration-300 group", expandedAcademic === index ? "shadow-md ring-1 ring-[var(--accent)] bg-[var(--bg-primary)] md:col-span-2" : "hover:border-[var(--accent)] hover:bg-[var(--bg-primary)] shadow-sm hover:shadow-md")}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-[var(--bg-primary)] border border-subtle flex items-center justify-center shrink-0">
                          <topic.icon className="w-6 h-6 text-secondary group-hover:text-[var(--accent)] transition-colors" />
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                          <span className={clsx("font-semibold text-lg transition-colors", expandedAcademic === index ? "text-[var(--accent)] text-2xl" : "text-primary group-hover:text-[var(--accent)]")}>{topic.title}</span>
                          <span className="text-sm font-light text-secondary">{topic.desc}</span>
                        </div>
                      </div>
                      <div className={clsx("w-10 h-10 rounded-full border border-subtle flex items-center justify-center transition-colors shrink-0", expandedAcademic === index ? "bg-[var(--accent)] border-[var(--accent)]" : "bg-[var(--bg-primary)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]")}>
                        <ArrowRight className={clsx("w-5 h-5 transition-transform duration-300", expandedAcademic === index ? "text-white rotate-90" : "text-secondary group-hover:text-white")} />
                      </div>
                    </div>
                    {expandedAcademic === index && (
                      <div className="mt-8 pt-6 border-t border-subtle animate-in slide-in-from-top-4 fade-in duration-300 flex flex-col gap-4">
                        <p className="text-secondary leading-relaxed font-light text-lg">
                          {topic.content}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-2">
                           <button className="px-5 py-2.5 rounded-full bg-[var(--accent)] text-white hover:opacity-90 shadow-[0_4px_14px_0_var(--accent)] hover:shadow-[0_6px_20px_rgba(255,107,43,0.4)] hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium flex items-center gap-2">View Study Design</button>
                           <button className="px-5 py-2.5 rounded-full border border-subtle hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-colors text-sm font-medium flex items-center gap-2"><ExternalLink className="w-4 h-4" /> Download Dataset</button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <h3 className="text-2xl font-medium text-primary">Featured Expert Profiles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Dr. Elena Rostova",
                    title: "Cognitive Psychologist",
                    affiliation: "Stanford University",
                    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                  },
                  {
                    name: "James Chen",
                    title: "Machine Learning Researcher",
                    affiliation: "MIT CSAIL",
                    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=200&auto=format&fit=crop"
                  },
                  {
                    name: "Dr. Sarah Jenkins",
                    title: "Bioethics Consultant",
                    affiliation: "Oxford University",
                    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
                  }
                ].map((expert, idx) => (
                  <div key={idx} className="p-6 rounded-3xl border border-subtle bg-[var(--bg-primary)] flex flex-col items-center text-center hover:border-[var(--accent)]/50 transition-colors cursor-pointer group shadow-sm hover:shadow-md">
                    <img src={expert.img} alt={expert.name} className="w-24 h-24 rounded-full object-cover mb-4 ring-2 ring-transparent group-hover:ring-[var(--accent)] transition-all" />
                    <h4 className="text-lg font-medium text-primary">{expert.name}</h4>
                    <p className="text-sm font-medium text-[var(--accent)] mt-1">{expert.title}</p>
                    <p className="text-sm text-secondary font-light mt-1">{expert.affiliation}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        );
      case 'Managed Services':
        return (
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl md:text-5xl font-sans tracking-tight text-primary font-medium mb-4">Managed Services</h1>
            <p className="text-xl text-secondary font-light leading-relaxed">Let our expert program managers handle the complexity of large-scale data collection. You define the goals; we deliver the datasets.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { i: FileSearch, t: '1. Scoping', d: 'We translate your metrics into discrete tasks.'},
                { i: Users, t: '2. Sourcing', d: 'We recruit the top 1% of required talent.'},
                { i: Shield, t: '3. QA Delivery', d: 'Multi-stage review guarantees 99.9% accuracy.'}
              ].map(step => (
                <div key={step.t} className="p-6 rounded-3xl border border-subtle bg-[var(--bg-primary)] flex flex-col items-center text-center">
                  <step.i className="w-8 h-8 text-[var(--accent)] mb-4" />
                  <h4 className="text-lg font-medium text-primary mb-2">{step.t}</h4>
                  <p className="text-sm text-secondary font-light">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Guides & Tutorials':
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-sans tracking-tight text-primary font-medium mb-4">Guides & Tutorials</h1>
              <p className="text-xl text-secondary font-light leading-relaxed max-w-2xl">Step-by-step walkthroughs for setting up tasks, configuring quality controls, and exporting data.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  t: 'Writing Effective Instructions for RLHF', 
                  cat: 'Prompt Engineering', 
                  content: 'In this guide, we explore the essential structures of prompts to guide models accurately. We provide templates for generating variations, setting tone restrictions, and examples of multi-stage RLHF instructions used by top tier teams.',
                  img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop'
                },
                {
                  t: 'Setting up Attention Checks', 
                  cat: 'Quality Control', 
                  content: 'Attention checks are questions designed to ensure the participant is actively reading the instructions. Learn how to strategically insert these checks, evaluate the time spent per task, and configure automated rejection rules for low-quality responses.',
                  img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'
                },
                {
                  t: 'Automating Data Retrieval with Python', 
                  cat: 'API Integration', 
                  content: 'Integrate your internal systems with our API. We cover authentication, retrieving completed batches, webhooks for real-time notifications on task completion, and sample Python scripts to start exporting data directly into your SQL databases.',
                  img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'
                }
              ].map((guide, i) => (
                <motion.div 
                  variants={itemVariants}
                  key={guide.t} 
                  onClick={() => setExpandedGuide(expandedGuide === i ? null : i)}
                  className={clsx("rounded-3xl border border-subtle bg-[var(--bg-primary)] cursor-pointer transition-all duration-500 overflow-hidden group flex flex-col", expandedGuide === i ? "shadow-md ring-1 ring-[var(--accent)] md:col-span-2" : "hover:border-[var(--accent)]/50 shadow-sm")}
                >
                  <div className={clsx("flex flex-col h-full", expandedGuide === i ? "md:flex-row" : "")}>
                    <div className={clsx("relative overflow-hidden shrink-0", expandedGuide === i ? "md:w-2/5 h-64 md:h-auto" : "h-48 w-full")}>
                      <img src={guide.img} alt={guide.t} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-mono border border-white/20 shadow-sm">{guide.cat}</span>
                      </div>
                    </div>
                    <div className={clsx("p-6 flex flex-col flex-1", expandedGuide === i ? "justify-center md:px-10" : "")}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={clsx("font-medium transition-colors leading-snug", expandedGuide === i ? "text-[var(--accent)] text-2xl lg:text-3xl lg:leading-tight" : "text-primary text-xl")}>{guide.t}</h3>
                      </div>
                      
                      {expandedGuide === i ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-2">
                          <p className="text-secondary leading-relaxed font-light text-lg">{guide.content}</p>
                          <div className="mt-8 flex flex-wrap gap-4">
                             <button className="px-6 py-2.5 rounded-full bg-primary text-[var(--bg-primary)] hover:opacity-90 transition-opacity text-sm font-medium">Start Guide</button>
                             <button className="px-6 py-2.5 rounded-full border border-subtle bg-secondary hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-colors text-sm font-medium flex items-center gap-2">View Source <Code className="w-4 h-4" /></button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center text-secondary text-sm font-medium mt-auto pt-4 group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all">
                          Read guide <ArrowRight className="w-4 h-4 ml-1.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case 'Articles':
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-sans tracking-tight text-primary font-medium mb-4">Articles & Insights</h1>
              <p className="text-xl text-secondary font-light leading-relaxed max-w-2xl">Stay updated with our latest thought leadership, engineering deep-dives, and AI trends.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 {
                   t: "Why Scale Isn't Enough: The Need for Human Logic", 
                   d: "Large scale models are hitting an intelligence plateau. Here's why expert-in-the-loop validation is the next frontier.", 
                   date: "Oct 12, 2026", 
                   content: "As organizations push the limits of parameters and pre-training data, they're discovering that raw computational scale doesn't necessarily produce logical deduction. The next leap in AI capabilities requires high-quality, verified cognitive data—data that can only be generated by domain experts actively breaking and fixing model reasoning paths. In this article, we cover how injecting verified logic at crucial fine-tuning stages outperforms purely scaled models.",
                   img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop'
                 },
                 {
                   t: "Adversarial Testing in Medical AI Models", 
                   d: "How our network of verified physicians breaks clinical diagnostic models to make them safer.", 
                   date: "Sep 28, 2026", 
                   content: "To build a safe medical LLM, you have to try and break it. We tasked over 500 board-certified physicians with generating adversarial prompt injections, contradictory patient histories, and edge-case symptom presentations. This piece breaks down the most surprisingly brittle areas of modern medical models and how human-guided adversarial testing patches these critical vulnerabilities.",
                   img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop'
                 },
                 {
                   t: "The Math Behind Better Data Quality", 
                   d: "Algorithmic approaches to measuring inter-rater reliability among domain experts.", 
                   date: "Sep 15, 2026", 
                   content: "When dealing with complex reasoning tasks, 'ground truth' is rarely binary. Measuring consensus requires more than simple agreement percentages. We explore advanced statistical techniques like Fleiss' Kappa and Bayesian models used on our platform to score expert annotator reliability, ensuring high-fidelity data feeds into frontier model training without drowning in noise.",
                   img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'
                 }
               ].map((article, i) => (
                 <motion.div 
                   variants={itemVariants}
                   key={i} 
                   onClick={() => setExpandedArticle(expandedArticle === i ? null : i)}
                   className={clsx("rounded-3xl border border-subtle bg-[var(--bg-primary)] cursor-pointer transition-all duration-500 overflow-hidden flex flex-col group", expandedArticle === i ? "shadow-md ring-1 ring-[var(--accent)] row-span-2 md:col-span-2" : "hover:border-[var(--accent)]/50 shadow-sm")}
                 >
                   <div className={clsx("flex flex-col h-full", expandedArticle === i ? "md:flex-row" : "")}>
                     <div className={clsx("relative overflow-hidden shrink-0", expandedArticle === i ? "md:w-2/5 h-64 md:h-auto" : "h-48 w-full")}>
                       <img src={article.img} alt={article.t} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                       <div className="absolute top-4 left-4">
                         <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[#fff] text-xs font-mono border border-white/10">{article.date}</span>
                       </div>
                     </div>
                     <div className={clsx("p-6 flex flex-col justify-between flex-1", expandedArticle === i ? "md:p-10" : "")}>
                       <div>
                         <h3 className={clsx("font-medium mb-3 leading-snug transition-colors", expandedArticle === i ? "text-[var(--accent)] text-2xl lg:text-3xl" : "text-primary text-xl")}>{article.t}</h3>
                         <p className={clsx("font-light leading-relaxed", expandedArticle === i ? "text-primary text-lg" : "text-secondary text-sm")}>{article.d}</p>
                         
                         {expandedArticle === i && (
                           <div className="mt-6 pt-6 border-t border-subtle animate-in slide-in-from-top-4 fade-in duration-300">
                             <p className="text-secondary leading-relaxed font-light text-lg">{article.content}</p>
                             <div className="mt-8">
                               <button className="px-8 py-3 rounded-full bg-primary text-[var(--bg-primary)] hover:opacity-90 transition-opacity text-sm font-medium flex items-center gap-2">
                                 Read Full Article
                                 <ExternalLink className="w-4 h-4" />
                               </button>
                             </div>
                           </div>
                         )}
                       </div>
                       {expandedArticle !== i && (
                         <div className="mt-6 flex items-center text-sm font-semibold text-secondary group-hover:text-[var(--accent)] transition-colors">Read abstract <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" /></div>
                       )}
                     </div>
                   </div>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        );
      case 'FAQ & Help':
        return (
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl md:text-5xl font-sans tracking-tight text-primary font-medium mb-4">FAQ & Help Center</h1>
            <p className="text-xl text-secondary font-light leading-relaxed">Answers to common questions about participation, data privacy, and platform mechanics.</p>
            <div className="flex flex-col gap-4">
              {[
                {q: "How do you verify domain experts?", a: "We use a multi-step verification process including identity checks, academic credential verification, and practical skills assessments."},
                {q: "What data formats do you support?", a: "We support standard outputs like JSON, CSV, and optimized parquet formats. Images and audio can be securely transmitted via signed URLs."},
                {q: "Is my proprietary data secure?", a: "Yes. All data is encrypted at rest and in transit. We maintain SOC2 Type II compliance and offer on-prem deployment options for Enterprise clients."}
              ].map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-subtle">
                  <h4 className="text-lg font-medium text-primary mb-2">{faq.q}</h4>
                  <p className="text-secondary font-light leading-relaxed text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-6 bg-secondary rounded-2xl flex justify-between items-center flex-wrap gap-4">
               <span className="text-primary font-medium">Still have questions?</span>
               <button className="px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-bold tracking-wide hover:opacity-90 transition-opacity">Contact Support</button>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-sans tracking-tight text-primary font-medium mb-4">
              {activeTab}
            </h1>
            <p className="text-xl text-secondary font-light leading-relaxed">
              Explore resources and documentation related to {activeTab.toLowerCase()}. We provide extensive guides and data to support your workflows.
            </p>
            <div className="h-64 border border-dashed border-subtle rounded-3xl flex items-center justify-center bg-secondary/50">
               <span className="text-secondary font-mono text-sm">Content for {activeTab} coming soon</span>
            </div>
          </div>
        );
    }
  };

  return (
    <PageTransition>
      <section className="pt-32 pb-20 px-6 border-b border-subtle relative overflow-hidden min-h-[90vh]">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left Sidebar / Menu */}
            <div className="w-full lg:w-64 flex-shrink-0 relative">
              <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto pb-12 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
                <AnimatedSection>
                <h3 className="text-xl font-medium tracking-tight text-primary mb-6">Resources</h3>
                <nav className="flex flex-col gap-1 relative">
                  {sidebarLinks.map((link) => (
                    <button
                      key={link}
                      onClick={() => handleTabChange(link)}
                      className={clsx(
                        'text-left px-4 py-2.5 rounded-xl text-[15px] font-medium transition-all duration-200',
                        activeTab === link 
                          ? 'bg-[var(--accent)]/10 text-[var(--accent)]' 
                          : 'text-secondary hover:text-primary hover:bg-secondary'
                      )}
                    >
                      {link}
                    </button>
                  ))}
                </nav>
              </AnimatedSection>
              
              <AnimatedSection className="mt-12 p-6 rounded-3xl border border-subtle bg-secondary/50">
                 <h4 className="text-sm font-semibold text-primary mb-2">Need Help?</h4>
                 <p className="text-xs text-secondary mb-4 leading-relaxed">Have questions about our resources or want to contribute?</p>
                 <a href="/contact" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[var(--accent)] hover:opacity-80 transition-opacity">
                   Contact Support <ExternalLink className="w-3 h-3 ml-1.5" />
                 </a>
              </AnimatedSection>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 max-w-4xl relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
          
        </div>
      </section>
    </PageTransition>
  );
}
