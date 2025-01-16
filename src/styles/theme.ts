import { type Config } from 'tailwindcss';

export const themeConfig = {
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6',  // Blue
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        accent: {
          light: '#8b5cf6',  // Purple
          DEFAULT: '#7c3aed',
          dark: '#6d28d9',
        },
        background: {
          light: '#0f172a',  // Dark blue
          DEFAULT: '#1e293b',
          dark: '#1e1b4b',
        },
        surface: {
          light: '#1e293b',  // Slate
          DEFAULT: '#0f172a',
          dark: '#020617',
        },
        market: {
          up: '#22c55e',     // Green
          down: '#ef4444',   // Red
          neutral: '#6b7280', // Gray
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(to right, var(--accent-light), var(--accent-dark))',
        'gradient-primary': 'linear-gradient(to right, var(--primary-light), var(--primary-dark))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-in',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)' },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      zIndex: {
        'toast': '1000',
        'modal': '1001',
        'tooltip': '1002',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
} satisfies Config['theme']; 