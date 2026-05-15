import { PageTransition } from '../components/PageTransition';
import { AnimatedSection, AnimatedItem } from '../components/AnimatedSection';
import { ArrowUpRight, Loader2, CheckCircle2, AlertCircle, Building2, UserCircle2, Mail, Briefcase, GraduationCap, Link as LinkIcon, Wrench, MessageSquare, MapPin } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import {Turnstile} from '@marsidev/react-turnstile';

export default function Contact() {
  const [formType, setFormType] = useState<'enterprise' | 'expert'>('enterprise');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Enterprise Form State
  const [entForm, setEntForm] = useState({ name: '', company: '', email: '', requirement: '', message: '' });
  const [entErrors, setEntErrors] = useState<Partial<Record<keyof typeof entForm, string>>>({});
  const [entTouched, setEntTouched] = useState<Partial<Record<keyof typeof entForm, boolean>>>({});

  // Expert Form State
  const [expForm, setExpForm] = useState({ name: '', email: '', area: '', qual: '', tools: '', portfolio: '', message: '' });
  const [expErrors, setExpErrors] = useState<Partial<Record<keyof typeof expForm, string>>>({});
  const [expTouched, setExpTouched] = useState<Partial<Record<keyof typeof expForm, boolean>>>({});
  const [turnstileToken, setTurnstileToken] = useState('');

  const validateEmail = (email: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const validateUrl = (url: string) => /^https?:\/\/.+/.test(url);

  const validateEntField = (field: keyof typeof entForm, value: string) => {
    if (!value.trim()) return 'This field is required';
    if (field === 'email' && !validateEmail(value)) return 'Please enter a valid email address';
    return '';
  };

  const validateExpField = (field: keyof typeof expForm, value: string) => {
    if (field !== 'portfolio' && !value.trim()) return 'This field is required';
    if (field === 'email' && !validateEmail(value)) return 'Please enter a valid email address';
    if (field === 'portfolio' && value && !validateUrl(value)) return 'Please enter a valid URL (http:// or https://)';
    return '';
  };

  const handleEntChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = e.target.id.replace('ent_', '') as keyof typeof entForm;
    const value = e.target.value;
    setEntForm(p => ({ ...p, [field]: value }));
    if (entTouched[field]) {
      setEntErrors(p => ({ ...p, [field]: validateEntField(field, value) }));
    }
  };

  const handleEntBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = e.target.id.replace('ent_', '') as keyof typeof entForm;
    setEntTouched(p => ({ ...p, [field]: true }));
    setEntErrors(p => ({ ...p, [field]: validateEntField(field, entForm[field]) }));
  };

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = e.target.id.replace('exp_', '') as keyof typeof expForm;
    const value = e.target.value;
    setExpForm(p => ({ ...p, [field]: value }));
    if (expTouched[field]) {
      setExpErrors(p => ({ ...p, [field]: validateExpField(field, value) }));
    }
  };

  const handleExpBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = e.target.id.replace('exp_', '') as keyof typeof expForm;
    setExpTouched(p => ({ ...p, [field]: true }));
    setExpErrors(p => ({ ...p, [field]: validateExpField(field, expForm[field]) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
  setStatus('error');
  setErrorMessage('Please complete the security verification.');
  return;
}
    
    // Final Validation
    let hasError = false;
    if (formType === 'enterprise') {
      const newErrors: any = {};
      const newTouched: any = {};
      (Object.keys(entForm) as Array<keyof typeof entForm>).forEach(key => {
        const error = validateEntField(key, entForm[key]);
        if (error) hasError = true;
        newErrors[key] = error;
        newTouched[key] = true;
      });
      setEntErrors(newErrors);
      setEntTouched(newTouched);
    } else {
      const newErrors: any = {};
      const newTouched: any = {};
      (Object.keys(expForm) as Array<keyof typeof expForm>).forEach(key => {
        const error = validateExpField(key, expForm[key]);
        if (error) hasError = true;
        newErrors[key] = error;
        newTouched[key] = true;
      });
      setExpErrors(newErrors);
      setExpTouched(newTouched);
    }

    if (hasError) {
      setErrorMessage('Please fix the errors in the form before submitting.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    
    try {
      let subject = '';
      let body = '';
      const targetEmail = 'info@stemaitrainers.com';
      
      if (formType === 'enterprise') {
        subject = `Enterprise Inquiry: ${entForm.company} - ${entForm.requirement}`;
        body = `Name: ${entForm.name}\nCompany: ${entForm.company}\nEmail: ${entForm.email}\nRequirement: ${entForm.requirement}\n\nProject Details:\n${entForm.message}`;
      } else {
        subject = `Expert Network Application: ${expForm.name} - ${expForm.area}`;
        body = `Name: ${expForm.name}\nEmail: ${expForm.email}\nArea of Expertise: ${expForm.area}\nQualification: ${expForm.qual}\nTools: ${expForm.tools}\nPortfolio: ${expForm.portfolio}\n\nIntroduction:\n${expForm.message}`;
      }
      
      // Simulate brief network delay for animation effect
if (formType === 'enterprise') {
  const { error } = await supabase
    .from('contacts')
    .insert([
      {
        name: entForm.name,
        email: entForm.email,
        company: entForm.company,
        requirement_area: entForm.requirement,
        message: entForm.message,
        created_at: new Date().toISOString(),
        turnstile_token: turnstileToken
      }
    ]);

  if (error) {
    console.log("ENTERPRISE ERROR:", error);
    throw error;
  }
} else {
  const { error } = await supabase
    .from('expert_applications')
    .insert([
      {
        full_name: expForm.name,
        email: expForm.email,
        expertise_domain: expForm.area,
        highest_qualification: expForm.qual,
        tools_mastered: expForm.tools,
        portfolio_link: expForm.portfolio || null,
        background_intro: expForm.message,
        turnstile_token: turnstileToken
      }
    ]);

  if (error) {
    console.log("EXPERT ERROR:", error);
    throw error;
  }
}

setStatus('success');
      
      // Reset forms safely
      if (formType === 'enterprise') {
        setEntForm({ name: '', company: '', email: '', requirement: '', message: '' });
        setEntTouched({});
      } else {
        setExpForm({ name: '', email: '', area: '', qual: '', tools: '', portfolio: '', message: '' });
        setExpTouched({});
      }

// ✅ RESET TURNSTILE TOKEN HERE
setTurnstileToken('');


      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  return (
    <PageTransition>
      {/* Hero Header Area */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden bg-glass border-b border-subtle dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--accent)] rounded-full blur-[120px] opacity-[0.05] pointer-events-none translate-x-1/3 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <AnimatedSection staggerChildren>
            <AnimatedItem>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 mb-8">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold">Connect</span>
              </div>
            </AnimatedItem>
            <AnimatedItem>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight leading-[1.1] mb-6 text-primary max-w-4xl mx-auto">
                Start a conversation with <br /> <span className="text-[var(--accent)]">STEM AI Trainers.</span>
              </h1>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-xl md:text-2xl text-secondary font-light max-w-2xl mx-auto leading-relaxed">
                Whether you need dedicated enterprise AI training operations or you're a domain expert looking to join our intelligence network.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 px-6 min-h-[70vh] flex items-start relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          
          {/* Left Column: Info Hub */}
          <AnimatedSection className="lg:col-span-4 flex flex-col gap-12">
            <div className="bg-[#FFFFFF]/40 dark:bg-[#111111]/40 backdrop-blur-md rounded-3xl p-8 border border-subtle">
              <h3 className="text-2xl font-serif font-medium text-primary mb-6">Contact Channels</h3>
              
              <div className="flex flex-col gap-8 text-primary">
                <div className="group">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-3 flex items-center gap-2">
                    <Building2 className="w-3 h-3 text-[var(--accent)]" /> Enterprise Inquiries
                  </p>
                  <a href="mailto:info@stemaitrainers.com" className="text-xl font-medium hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2">
                    info@stemaitrainers.com 
                    <Arr0wUpRightIcon className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--accent)]" />
                  </a>
                </div>
                
                <div className="h-px w-full bg-subtle" />
                
                <div className="group">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-3 flex items-center gap-2">
                    <UserCircle2 className="w-3 h-3 text-[var(--accent)]" /> Join Network
                  </p>
                  <a href="mailto:info@stemaitrainers.com" className="text-xl font-medium hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2">
                    info@stemaitrainers.com 
                    <Arr0wUpRightIcon className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--accent)]" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFFFF]/40 dark:bg-[#111111]/40 backdrop-blur-md rounded-3xl p-8 border border-subtle">
              <h3 className="text-lg font-serif font-medium text-primary mb-6 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[var(--accent)]" /> Global Operations
              </h3>
              <p className="text-secondary leading-relaxed font-light mb-4 text-sm">
                Our intelligence network spans over 30 countries, providing localized and multilingual AI training securely worldwide.
              </p>
              <div className="flex flex-wrap gap-2">
                {['North America', 'Europe', 'Asia Pacific', 'Remote'].map((region, idx) => (
                  <span key={idx} className="text-[10px] font-mono tracking-wider px-3 py-1 rounded-full bg-primary border border-subtle text-secondary">
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column: Dynamic Form */}
          <AnimatedSection delay={0.2} className="lg:col-span-8 bg-[#FFFFFF]/80 dark:bg-[#111111]/80 backdrop-blur-2xl rounded-[40px] p-8 md:p-12 lg:p-16 border border-[var(--accent)]/20 shadow-2xl relative overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[var(--accent)]/5 via-transparent to-transparent pointer-events-none" />

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-12"
              >
                <div className="w-24 h-24 bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border border-[var(--accent)]/30 shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)]">
                  <CheckCircle2 className="w-12 h-12 text-[var(--accent)]" />
                </div>
                <h3 className="text-3xl font-sans tracking-tight text-primary mb-4 font-medium">Request Received</h3>
                <p className="text-xl text-secondary max-w-md mx-auto mb-10 font-light leading-relaxed">
                  Thank you for reaching out. We have successfully received your information and a member of our team will contact you shortly.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-8 py-4 bg-primary border border-subtle rounded-full text-sm font-bold tracking-widest uppercase hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors shadow-lg"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <>
                <div className="flex gap-4 sm:gap-8 mb-12 border-b border-subtle pb-4 relative z-10">
                  <button 
                    onClick={() => { setFormType('enterprise'); setStatus('idle'); setErrorMessage(''); }}
                    className={`text-xs sm:text-sm font-bold uppercase tracking-widest pb-3 border-b-2 transition-all relative ${formType === 'enterprise' ? 'border-[var(--accent)] text-primary' : 'border-transparent text-secondary hover:text-primary'}`}
                  >
                    Enterprise Partner
                    {formType === 'enterprise' && (
                      <motion.div layoutId="underline" className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-[var(--accent)]" />
                    )}
                  </button>
                  <button 
                    onClick={() => { setFormType('expert'); setStatus('idle'); setErrorMessage(''); }}
                    className={`text-xs sm:text-sm font-bold uppercase tracking-widest pb-3 border-b-2 transition-all relative ${formType === 'expert' ? 'border-[var(--accent)] text-primary' : 'border-transparent text-secondary hover:text-primary'}`}
                  >
                    Individual Expert
                    {formType === 'expert' && (
                      <motion.div layoutId="underline" className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-[var(--accent)]" />
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-2 relative z-10">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-red-500 mb-1">Submission Failed</h4>
                      <p className="text-sm text-red-500/80">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  {formType === 'enterprise' ? (
                    <motion.form 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col gap-6" 
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2 group">
                          <label htmlFor="ent_name" className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                            <UserCircle2 className="w-4 h-4" /> Full Name
                          </label>
                          <input type="text" id="ent_name" value={entForm.name} onChange={handleEntChange} onBlur={handleEntBlur} disabled={status === 'submitting'} className={`bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm border ${entErrors.name ? 'border-red-500' : 'border-subtle hover:border-subtle/80'} rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:bg-primary transition-all text-primary disabled:opacity-50 placeholder:text-secondary/50`} placeholder="Jane Doe" />
                          {entErrors.name && <span className="text-xs text-red-500 mt-1">{entErrors.name}</span>}
                        </div>
                        <div className="flex flex-col gap-2 group">
                          <label htmlFor="ent_company" className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                            <Building2 className="w-4 h-4" /> Company
                          </label>
                          <input type="text" id="ent_company" value={entForm.company} onChange={handleEntChange} onBlur={handleEntBlur} disabled={status === 'submitting'} className={`bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm border ${entErrors.company ? 'border-red-500' : 'border-subtle hover:border-subtle/80'} rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:bg-primary transition-all text-primary disabled:opacity-50 placeholder:text-secondary/50`} placeholder="Acme AI Labs" />
                          {entErrors.company && <span className="text-xs text-red-500 mt-1">{entErrors.company}</span>}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 group">
                        <label htmlFor="ent_email" className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Work Email
                        </label>
                        <input type="email" id="ent_email" value={entForm.email} onChange={handleEntChange} onBlur={handleEntBlur} disabled={status === 'submitting'} className={`bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm border ${entErrors.email ? 'border-red-500' : 'border-subtle hover:border-subtle/80'} rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:bg-primary transition-all text-primary disabled:opacity-50 placeholder:text-secondary/50`} placeholder="jane@company.com" />
                        {entErrors.email && <span className="text-xs text-red-500 mt-1">{entErrors.email}</span>}
                      </div>
                      
                      <div className="flex flex-col gap-2 group">
                        <label htmlFor="ent_requirement" className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                          <Briefcase className="w-4 h-4" /> Requirement Area
                        </label>
                        <div className="relative">
                          <select id="ent_requirement" value={entForm.requirement} onChange={handleEntChange} onBlur={handleEntBlur} disabled={status === 'submitting'} className={`w-full bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm border ${entErrors.requirement ? 'border-red-500' : 'border-subtle hover:border-subtle/80'} rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:bg-primary transition-all text-primary appearance-none disabled:opacity-50`}>
                            <option value="">Select an area of interest</option>
                            <option value="AI Training / RLHF">AI Training / RLHF</option>
                            <option value="Model Evaluation">Model Evaluation</option>
                            <option value="Synthetic Data Generation">Synthetic Data Generation</option>
                            <option value="Other Services">Other Services</option>
                          </select>
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                            ▼
                          </div>
                        </div>
                        {entErrors.requirement && <span className="text-xs text-red-500 mt-1">{entErrors.requirement}</span>}
                      </div>

                      <div className="flex flex-col gap-2 group">
                        <label htmlFor="ent_message" className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" /> Project Details
                        </label>
                        <textarea id="ent_message" value={entForm.message} onChange={handleEntChange} onBlur={handleEntBlur} disabled={status === 'submitting'} rows={4} className={`bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm border ${entErrors.message ? 'border-red-500' : 'border-subtle hover:border-subtle/80'} rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:bg-primary transition-all resize-none text-primary disabled:opacity-50 placeholder:text-secondary/50`} placeholder="Describe the scale, domain, and specific needs of your AI initiative..." />
                        {entErrors.message && <span className="text-xs text-red-500 mt-1">{entErrors.message}</span>}
                      </div>
<Turnstile
  siteKey="0x4AAAAAADP3JYqicMa4Uevw"
  onSuccess={(token) => setTurnstileToken(token)}
/>
                      <button 
                        disabled={status === 'submitting'} 
                        className="w-full bg-[var(--accent)] text-white py-5 rounded-2xl text-sm font-bold uppercase tracking-widest hover:opacity-90 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] transition-all mt-4 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-80"
                      >
                        {status === 'submitting' ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting Request...</>
                        ) : (
                          'Submit Enterprise Inquiry'
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.form 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col gap-6" 
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2 group">
                          <label htmlFor="exp_name" className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                            <UserCircle2 className="w-4 h-4" /> Full Name
                          </label>
                          <input type="text" id="exp_name" value={expForm.name} onChange={handleExpChange} onBlur={handleExpBlur} disabled={status === 'submitting'} className={`bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm border ${expErrors.name ? 'border-red-500' : 'border-subtle hover:border-subtle/80'} rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:bg-primary transition-all text-primary disabled:opacity-50 placeholder:text-secondary/50`} placeholder="Dr. John Smith" />
                          {expErrors.name && <span className="text-xs text-red-500 mt-1">{expErrors.name}</span>}
                        </div>
                        <div className="flex flex-col gap-2 group">
                          <label htmlFor="exp_email" className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                            <Mail className="w-4 h-4" /> Professional Email
                          </label>
                          <input type="email" id="exp_email" value={expForm.email} onChange={handleExpChange} onBlur={handleExpBlur} disabled={status === 'submitting'} className={`bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm border ${expErrors.email ? 'border-red-500' : 'border-subtle hover:border-subtle/80'} rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:bg-primary transition-all text-primary disabled:opacity-50 placeholder:text-secondary/50`} placeholder="john.smith@university.edu" />
                          {expErrors.email && <span className="text-xs text-red-500 mt-1">{expErrors.email}</span>}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2 group">
                          <label htmlFor="exp_area" className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                            <Briefcase className="w-4 h-4" /> Area of Expertise
                          </label>
                          <div className="relative">
                            <select id="exp_area" value={expForm.area} onChange={handleExpChange} onBlur={handleExpBlur} disabled={status === 'submitting'} className={`w-full bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm border ${expErrors.area ? 'border-red-500' : 'border-subtle hover:border-subtle/80'} rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:bg-primary transition-all text-primary appearance-none disabled:opacity-50`}>
                              <option value="">Select Domain</option>
                              <option value="Mathematics">Mathematics</option>
                              <option value="Physics">Physics</option>
                              <option value="Chemistry">Chemistry</option>
                              <option value="Biology">Biology</option>
                              <option value="Computer Science">Computer Science</option>
                              <option value="Engineering">Engineering</option>
                              <option value="Medicine">Medicine</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
                          </div>
                          {expErrors.area && <span className="text-xs text-red-500 mt-1">{expErrors.area}</span>}
                        </div>
                        <div className="flex flex-col gap-2 group">
                          <label htmlFor="exp_qual" className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" /> Highest Qualification
                          </label>
                          <div className="relative">
                            <select id="exp_qual" value={expForm.qual} onChange={handleExpChange} onBlur={handleExpBlur} disabled={status === 'submitting'} className={`w-full bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm border ${expErrors.qual ? 'border-red-500' : 'border-subtle hover:border-subtle/80'} rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:bg-primary transition-all text-primary appearance-none disabled:opacity-50`}>
                              <option value="">Select Level</option>
                              <option value="PhD">PhD</option>
                              <option value="Masters / MSc">Masters / MSc</option>
                              <option value="Postdoctoral Researcher">Postdoctoral Researcher</option>
                              <option value="Olympiad Medalist">Olympiad Medalist</option>
                              <option value="Industry Expert">Industry Expert</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
                          </div>
                          {expErrors.qual && <span className="text-xs text-red-500 mt-1">{expErrors.qual}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2 group">
                          <label htmlFor="exp_tools" className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                            <Wrench className="w-4 h-4" /> Tools Mastered
                          </label>
                          <input type="text" id="exp_tools" value={expForm.tools} onChange={handleExpChange} onBlur={handleExpBlur} disabled={status === 'submitting'} className={`bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm border ${expErrors.tools ? 'border-red-500' : 'border-subtle hover:border-subtle/80'} rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:bg-primary transition-all text-primary disabled:opacity-50 placeholder:text-secondary/50`} placeholder="Python, LaTeX, MATLAB, etc." />
                          {expErrors.tools && <span className="text-xs text-red-500 mt-1">{expErrors.tools}</span>}
                        </div>
                        <div className="flex flex-col gap-2 group">
                          <label htmlFor="exp_portfolio" className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                            <LinkIcon className="w-4 h-4" /> Portfolio / LinkedIn <span className="opacity-50 ml-1">(Optional)</span>
                          </label>
                          <input type="url" id="exp_portfolio" value={expForm.portfolio} onChange={handleExpChange} onBlur={handleExpBlur} disabled={status === 'submitting'} className={`bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm border ${expErrors.portfolio ? 'border-red-500' : 'border-subtle hover:border-subtle/80'} rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:bg-primary transition-all text-primary disabled:opacity-50 placeholder:text-secondary/50`} placeholder="https://linkedin.com/in/..." />
                          {expErrors.portfolio && <span className="text-xs text-red-500 mt-1">{expErrors.portfolio}</span>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 group">
                        <label htmlFor="exp_message" className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" /> Background Introduction
                        </label>
                        <textarea id="exp_message" value={expForm.message} onChange={handleExpChange} onBlur={handleExpBlur} disabled={status === 'submitting'} rows={3} className={`bg-[#FDFCFB]/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm border ${expErrors.message ? 'border-red-500' : 'border-subtle hover:border-subtle/80'} rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:bg-primary transition-all resize-none text-primary disabled:opacity-50 placeholder:text-secondary/50`} placeholder="Briefly describe your research focus and experience..." />
                        {expErrors.message && <span className="text-xs text-red-500 mt-1">{expErrors.message}</span>}
                      </div>
<Turnstile
  siteKey="0x4AAAAAADP3JYqicMa4Uevw"
  onSuccess={(token) => setTurnstileToken(token)}
/>
                      <button 
                        disabled={status === 'submitting'} 
                        className="w-full bg-[var(--accent)] text-white py-5 rounded-2xl text-sm font-bold uppercase tracking-widest hover:opacity-90 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] transition-all mt-4 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-80"
                      >
                        {status === 'submitting' ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting Application...</>
                        ) : (
                          'Apply to Intelligence Network'
                        )}
                      </button>
                    </motion.form>
                  )}
                </div>
              </>
            )}
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}

// Ensure the icon matches Lucide React's name
const Arr0wUpRightIcon = ArrowUpRight;

