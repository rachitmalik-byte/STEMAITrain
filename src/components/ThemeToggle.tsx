import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-subtle bg-transparent overflow-hidden transition-colors hover:bg-secondary"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ 
          y: theme === 'dark' ? 24 : 0, 
          opacity: theme === 'dark' ? 0 : 1 
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute"
      >
        <Sun className="w-4 h-4 text-primary" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          y: theme === 'dark' ? 0 : -24, 
          opacity: theme === 'dark' ? 1 : 0 
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute"
      >
        <Moon className="w-4 h-4 text-primary" />
      </motion.div>
    </button>
  );
}
