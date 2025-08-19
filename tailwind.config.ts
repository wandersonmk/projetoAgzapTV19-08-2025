import type { Config } from 'tailwindcss'

const config: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core semantic tokens
        background: '#141518',
        foreground: '#FFFFFF',

        // Brand / primary actions
        primary: {
          DEFAULT: '#8162FF',
          foreground: '#FFFFFF'
        },

        // Secondary surfaces
        secondary: {
          DEFAULT: '#1A1B1F',
          foreground: '#FFFFFF'
        },

        // Accent (deep purple)
        accent: {
          DEFAULT: '#221C3D',
          foreground: '#FFFFFF'
        },

        // Muted content and surfaces
        muted: {
          DEFAULT: '#26272B',
          foreground: '#4E525B'
        },

        // Cards / popovers
        card: {
          DEFAULT: '#1A1B1F',
          foreground: '#FFFFFF'
        },
        popover: {
          DEFAULT: '#1A1B1F',
          foreground: '#FFFFFF'
        },

        // Status / feedback
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF'
        },
        destructiveSurface: '#2F1F1F',

        // UI primitives
        border: '#26272B',
        input: '#26272B',
        ring: '#8162FF',

        // Neutrals
        white: '#FFFFFF'
      }
    }
  }
}

export default config


