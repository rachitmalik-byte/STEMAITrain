import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-subtle bg-secondary py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-primary text-2xl tracking-tighter mb-4 flex items-center gap-2">
            <span className="font-normal text-[var(--text-primary)]">STEM</span>
            <span className="font-bold text-orange-500">AI</span>
            <span className="font-normal text-[var(--text-primary)]">TRAINERS</span>
          </Link>
          <p className="text-secondary max-w-sm">
            A specialized B2B AI training and STEM intelligence company providing expert human contributors and workflows for scientific AI systems.
          </p>
        </div>
        
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary mb-4 opacity-50">Offerings</h4>
          <ul className="space-y-3 flex flex-col items-start">
            <li><Link to="/services" className="text-secondary hover:text-[var(--accent)] transition-colors text-sm">AI Training</Link></li>
            <li><Link to="/services" className="text-secondary hover:text-[var(--accent)] transition-colors text-sm">Reasoning Evaluation</Link></li>
            <li><Link to="/services" className="text-secondary hover:text-[var(--accent)] transition-colors text-sm">Synthetic Data</Link></li>
            <li><Link to="/experts" className="text-secondary hover:text-[var(--accent)] transition-colors text-sm">Expert Network</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary mb-4 opacity-50">Company</h4>
          <ul className="space-y-3 flex flex-col items-start">
            <li><Link to="/about" className="text-secondary hover:text-[var(--accent)] transition-colors text-sm">About Us</Link></li>
            <li><Link to="/contact" className="text-secondary hover:text-[var(--accent)] transition-colors text-sm">Contact</Link></li>
            <li><a href="#" className="text-secondary hover:text-[var(--accent)] transition-colors text-sm">Join the Network</a></li>
            <li><a href="#" className="text-secondary hover:text-[var(--accent)] transition-colors text-sm">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-subtle flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-[0.1em] text-secondary opacity-60 gap-4">
        <div>&copy; {new Date().getFullYear()} STEM AI TRAINERS. All rights reserved.</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-primary transition-colors">Privacy / Terms</a>
          <span>Singapore</span>
          <span>Mumbai</span>
          <span>London</span>
        </div>
        <div>EN / FR / HI / JP</div>
      </div>
    </footer>
  );
}
