import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        'primary-50': 'hsl(var(--primary-50))',
        'primary-100': 'hsl(var(--primary-100))',
        'primary-200': 'hsl(var(--primary-200))',
        'primary-300': 'hsl(var(--primary-300))',
        'primary-400': 'hsl(var(--primary-400))',
        'primary-500': 'hsl(var(--primary-500))',
        'primary-600': 'hsl(var(--primary-600))',
        'primary-700': 'hsl(var(--primary-700))',
        'primary-800': 'hsl(var(--primary-800))',
        'primary-900': 'hsl(var(--primary-900))',
        'accent-50': 'hsl(var(--accent-50))',
        'accent-100': 'hsl(var(--accent-100))',
        'accent-200': 'hsl(var(--accent-200))',
        'accent-500': 'hsl(var(--accent-500))',
        'accent-600': 'hsl(var(--accent-600))',
        'neutral-50': 'hsl(var(--neutral-50))',
        'neutral-100': 'hsl(var(--neutral-100))',
        'neutral-200': 'hsl(var(--neutral-200))',
        'neutral-300': 'hsl(var(--neutral-300))',
        'neutral-400': 'hsl(var(--neutral-400))',
        'neutral-500': 'hsl(var(--neutral-500))',
        'neutral-600': 'hsl(var(--neutral-600))',
        'neutral-700': 'hsl(var(--neutral-700))',
        'neutral-800': 'hsl(var(--neutral-800))',
        'neutral-900': 'hsl(var(--neutral-900))',
        'success-50': 'hsl(var(--success-50))',
        'success-100': 'hsl(var(--success-100))',
        'success-500': 'hsl(var(--success-500))',
        'success-600': 'hsl(var(--success-600))',
        'success-700': 'hsl(var(--success-700))',
        'warning-50': 'hsl(var(--warning-50))',
        'warning-100': 'hsl(var(--warning-100))',
        'warning-500': 'hsl(var(--warning-500))',
        'warning-600': 'hsl(var(--warning-600))',
        'warning-700': 'hsl(var(--warning-700))',
        'error-50': 'hsl(var(--error-50))',
        'error-100': 'hsl(var(--error-100))',
        'error-500': 'hsl(var(--error-500))',
        'error-600': 'hsl(var(--error-600))',
        'error-700': 'hsl(var(--error-700))',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
