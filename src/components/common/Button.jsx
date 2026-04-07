import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const variants = {
  primary: 'bg-civic-500 hover:bg-civic-600 text-white shadow-sm hover:shadow-glow-green',
  secondary: 'bg-ocean-500 hover:bg-ocean-600 text-white shadow-sm hover:shadow-glow-blue',
  outline: 'border-2 border-civic-500 text-civic-600 dark:text-civic-400 hover:bg-civic-50 dark:hover:bg-civic-500/10',
  ghost: 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]',
  danger: 'bg-danger-500 hover:bg-danger-600 text-white',
  teal: 'bg-teal-500 hover:bg-teal-600 text-white shadow-sm hover:shadow-glow-teal',
  warm: 'bg-gradient-to-r from-warm-400 to-blush-500 text-white hover:from-warm-500 hover:to-blush-600',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-[var(--radius-btn)]',
  lg: 'px-7 py-3 text-base rounded-[var(--radius-btn)]',
  xl: 'px-8 py-4 text-lg rounded-xl',
};

const Button = forwardRef(({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className, 
  loading, 
  disabled, 
  icon: Icon,
  iconRight: IconRight,
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-civic-500/50 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!loading && Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;
