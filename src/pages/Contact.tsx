import { PageTransition } from '../components/PageTransition';
import { AnimatedSection, AnimatedItem } from '../components/AnimatedSection';
import { ArrowUpRight, Loader2, CheckCircle2, AlertCircle, Building2, UserCircle2, Mail, Briefcase, GraduationCap, Link as LinkIcon, Wrench, MessageSquare, MapPin } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// import {Turnstile} from '@marsidev/react-turnstile'; // Optional bot protection

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
    // Turnstile verification removed - install @marsidev/react-turnstile to enable bot protection

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
      if (formType === 'enterprise') {
        // Submit Enterprise Form to Google Forms
        const enterpriseFormData = new FormData();
        enterpriseFormData.append('entry.157807120', entForm.name);
        enterpriseFormData.append('entry.800572658', entForm.company);
        enterpriseFormData.append('entry.1030955062', entForm.email);
        enterpriseFormData.append('entry.483721231', entForm.requirement);
        enterpriseFormData.append('entry.1500569326', entForm.message);

        const enterpriseFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSfC3GuziOcTUB6uUu7zEARHwdA3OwASh5OYlAs1IkfpNpHnYw/formResponse';

        const response = await fetch(enterpriseFormURL, {
          method: 'POST',
          mode: 'no-cors',
          body: enterpriseFormData
        });

        // no-cors mode returns opaque response, but form submission is still processed
        console.log('Enterprise form submission initiated');

      } else {
        // Submit Expert Form to Google Forms
        const expertFormData = new FormData();
        expertFormData.append('entry.1132860551', expForm.name);
        expertFormData.append('entry.1099594640', expForm.email);
        expertFormData.append('entry.1740919847', expForm.area);
        expertFormData.append('entry.297797108', expForm.qual);
        expertFormData.append('entry.117201284', expForm.tools);
        expertFormData.append('entry.603129646', expForm.portfolio);
        expertFormData.append('entry.1158572007', expForm.message);

        const expertFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSclZmHLsA3uruaT5fQV3yNjtQcMTVVBfvNPlmtxWc_IxIYYSQ/formResponse';

        const response = await fetch(expertFormURL, {
          method: 'POST',
          mode: 'no-cors',
          body: expertFormData
        });

        // no-cors mode returns opaque response, but form submission is still processed
        console.log('Expert form submission initiated');
      }

      // Show success message
      setStatus('success');

      // Reset forms
      if (formType === 'enterprise') {
        setEntForm({ name: '', company: '', email: '', requirement: '', message: '' });
        setEntTouched({});
      } else {
        setExpForm({ name: '', email: '', area: '', qual: '', tools: '', portfolio: '', message: '' });
        setExpTouched({});
      }
      
      // Auto-reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);

    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16 relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-8">
              <AnimatedSection className="space-y-4">
                <span className="text-xs font-semibold tracking-widest text-orange-400 uppercase bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                  Connect
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Start a conversation with STEM AI Trainers.
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Whether you need dedicated enterprise AI training operations or you're a domain expert looking to join our intelligence network.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className="space-y-6 pt-4 border-t border-slate-800">
                <h2 className="text-lg font-semibold text-slate-200">Contact Channels</h2>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 text-orange-400 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Enterprise Inquiries</h3>
                    <p className="text-base text-slate-200 font-medium mt-1">info@stemaitrainers.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400 shrink-0">
                    <UserCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Join Network</h3>
                    <p className="text-base text-slate-200 font-medium mt-1">info@stemaitrainers.com</p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4} className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800/80 backdrop-blur-sm space-y-3">
                <div className="flex items-center gap-2 text-orange-400">
                  <MapPin className="w-4 h-4" />
                  <h4 className="text-sm font-semibold tracking-wide uppercase">Global Operations</h4>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Our intelligence network spans over 30 countries, providing localized and multilingual AI training securely worldwide.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-300 pt-2">
                  <span className="px-2 py-1 bg-slate-800 rounded">North America</span>
                  <span className="px-2 py-1 bg-slate-800 rounded">Europe</span>
                  <span className="px-2 py-1 bg-slate-800 rounded">Asia Pacific</span>
                  <span className="px-2 py-1 bg-slate-800 rounded">Remote</span>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <AnimatedSection delay={0.2} className="bg-slate-900/40 rounded-3xl border border-slate-800/80 p-6 sm:p-8 backdrop-blur-md shadow-xl relative">
                
                {/* Tab Switcher */}
                <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-850 mb-8">
                  <button
                    onClick={() => { setFormType('enterprise'); setErrorMessage(''); }}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
  formType === 'enterprise'
    ? 'bg-gradient-to-r from-orange-500/10 to-orange-600/10 text-orange-400 border border-orange-500/20 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Enterprise Partner
                  </button>
                  <button
                    onClick={() => { setFormType('expert'); setErrorMessage(''); }}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      formType === 'expert'
                        ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-400 border border-blue-500/20 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Individual Expert
                  </button>
                </div>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start gap-3 text-orange-400">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Submission successful!</h4>
                        <p className="text-xs text-orange-500/80 mt-1">>Thank you for connecting. Our specialized team will contact you shortly.</p>
                      </div>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 text-rose-400">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Submission Failed</h4>
                        <p className="text-xs text-rose-500/80 mt-1">{errorMessage || 'Please correct the issues highlighted below.'}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Interactive Form Tag without action/mailto overrides */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formType === 'enterprise' ? (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="ent_name" className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5"><UserCircle2 className="w-3.5 h-3.5" /> Full Name</label>
                          <input type="text" id="ent_name" value={entForm.name} onChange={handleEntChange} onBlur={handleEntBlur} placeholder="Jane Doe" className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${entErrors.name && entTouched.name ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:border-orange-500/50 focus:ring-orange-500/30'}`} />
                          {entErrors.name && entTouched.name && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {entErrors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="ent_company" className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> Company</label>
                          <input type="text" id="ent_company" value={entForm.company} onChange={handleEntChange} onBlur={handleEntBlur} placeholder="Acme AI Labs" className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${entErrors.company && entTouched.company ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:border-orange-500/50 focus:ring-orange-500/30'}`} />
                          {entErrors.company && entTouched.company && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {entErrors.company}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="ent_email" className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Work Email</label>
                        <input type="email" id="ent_email" value={entForm.email} onChange={handleEntChange} onBlur={handleEntBlur} placeholder="jane@company.com" className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${entErrors.email && entTouched.email ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:border-orange-500/50 focus:ring-orange-500/30'}`} />
                        {entErrors.email && entTouched.email && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {entErrors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="ent_requirement" className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Requirement Area</label>
                        <select id="ent_requirement" value={entForm.requirement} onChange={handleEntChange} onBlur={handleEntBlur} className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all appearance-none ${entErrors.requirement && entTouched.requirement ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:border-orange-500/50 focus:ring-orange-500/30'}`}>
                          <option value="">Select an area of interest</option>
                          <option value="AI Training / RLHF">AI Training / RLHF</option>
                          <option value="Model Evaluation">Model Evaluation</option>
                          <option value="Synthetic Data Generation">Synthetic Data Generation</option>
                          <option value="Other Services">Other Services</option>
                        </select>
                        {entErrors.requirement && entTouched.requirement && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {entErrors.requirement}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="ent_message" className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> Project Details</label>
                        <textarea id="ent_message" value={entForm.message} onChange={handleEntChange} onBlur={handleEntBlur} rows={4} placeholder="Describe the scale, domain, and specific needs of your AI initiative..." className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all resize-none ${entErrors.message && entTouched.message ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:border-orange-500/50 focus:ring-orange-500/30'}`} />
                        {entErrors.message && entTouched.message && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {entErrors.message}</p>}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="exp_name" className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5"><UserCircle2 className="w-3.5 h-3.5" /> Full Name</label>
                          <input type="text" id="exp_name" value={expForm.name} onChange={handleExpChange} onBlur={handleExpBlur} placeholder="Dr. Alan Turing" className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${expErrors.name && expTouched.name ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:border-orange-500/50 focus:ring-orange-500/30'}`} />
                          {expErrors.name && expTouched.name && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {expErrors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="exp_email" className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Professional Email</label>
                          <input type="email" id="exp_email" value={expForm.email} onChange={handleExpChange} onBlur={handleExpBlur} placeholder="alan@university.edu" className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${expErrors.email && expTouched.email ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:border-orange-500/50 focus:ring-orange-500/30'}`} />
                          {expErrors.email && expTouched.email && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {expErrors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="exp_area" className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Area of Expertise</label>
                          <select id="exp_area" value={expForm.area} onChange={handleExpChange} onBlur={handleExpBlur} className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all appearance-none ${expErrors.area && expTouched.area ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:border-orange-500/50 focus:ring-orange-500/30'}`}>
                            <option value="">Select your core domain</option>
                            <option value="Mathemetics">Mathematics</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Biology">Biology</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="engineering">Engineering</option>
                            <option value="Medicine">Medicine</option>
                          </select>
                          {expErrors.area && expTouched.area && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {expErrors.area}</p>}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="exp_qual" className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" /> Highest Qualification</label>
                          <select id="exp_qual" value={expForm.qual} onChange={handleExpChange} onBlur={handleExpBlur} className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all appearance-none ${expErrors.qual && expTouched.qual ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:border-orange-500/50 focus:ring-orange-500/30'}`}>
                            <option value="">Select your credential</option>
                            <option value="PhD">PhD</option>
                            <option value="Masters / MSc">Masters / MSc</option>
                            <option value="Postdoctoral Researcher">Postdoctoral Researcher</option>
                            <option value="Olympiad Medalist">Olympiad Medalist</option>
                            <option value="Industry Expert">Industry Expert</option>
                          </select>
                          {expErrors.qual && expTouched.qual && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {expErrors.qual}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="exp_tools" className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5" /> Tools Mastered</label>
                        <input type="text" id="exp_tools" value={expForm.tools} onChange={handleExpChange} onBlur={handleExpBlur} placeholder="LaTeX, MATLAB, Python, R, etc." className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${expErrors.tools && expTouched.tools ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:border-orange-500/50 focus:ring-orange-500/30'}`} />
                        {expErrors.tools && expTouched.tools && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {expErrors.tools}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="exp_portfolio" className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5"><LinkIcon className="w-3.5 h-3.5" /> Portfolio / LinkedIn</label>
                        <input type="text" id="exp_portfolio" value={expForm.portfolio} onChange={handleExpChange} onBlur={handleExpBlur} placeholder="https://linkedin.com/in/username" className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${expErrors.portfolio && expTouched.portfolio ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:border-orange-500/50 focus:ring-orange-500/30'}`} />
                        {expErrors.portfolio && expTouched.portfolio && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {expErrors.portfolio}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="exp_message" className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> Background Introduction</label>
                        <textarea id="exp_message" value={expForm.message} onChange={handleExpChange} onBlur={handleExpBlur} rows={4} placeholder="Briefly detail your specialized academic research or practical industry background..." className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all resize-none ${expErrors.message && expTouched.message ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:border-orange-500/50 focus:ring-orange-500/30'}`} />
                        {expErrors.message && expTouched.message && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {expErrors.message}</p>}
                      </div>
                    </div>
                  )}

                  {/* Removed Cloudflare Turnstile - install @marsidev/react-turnstile to add bot protection */}

                  {/* Action Button layout handling */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`w-full rounded-xl py-3.5 px-4 font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 border disabled:opacity-50 disabled:cursor-not-allowed ${
                      formType === 'enterprise'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-slate-950 border-orange-400 hover:brightness-110'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-400 hover:brightness-110'
                    }`}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing Request...
                      </>
                    ) : formType === 'enterprise' ? (
                      <>
                        Submit Enterprise Inquiry
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}

// Ensure the icon matches Lucide React's name
const Arr0wUpRightIcon = ArrowUpRight;
