import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import type { PrimeNGConfigType } from 'primeng/config';

// Estende Aura con i token di brand senza riscrivere il tema PrimeNG da zero.
const MrDTwicePreset = definePreset(Aura, {
  semantic: {
    // Scala primaria derivata dal logo; OKLCH rende piu' leggibili luminosita' e croma.
    primary: {
      50: 'oklch(96.53% 0.0190 299.07)',
      100: 'oklch(92.86% 0.0400 299.77)',
      200: 'oklch(86.40% 0.0770 298.10)',
      300: 'oklch(75.89% 0.1399 296.05)',
      400: 'oklch(65.66% 0.1959 292.63)',
      500: 'oklch(57.18% 0.1963 292.38)',
      600: 'oklch(47.32% 0.1758 290.23)',
      700: 'oklch(40.36% 0.1501 289.98)',
      800: 'oklch(32.21% 0.1288 289.33)',
      900: 'oklch(28.05% 0.1685 278.98)',
      950: 'oklch(19.56% 0.1135 286.07)',
    },
    focusRing: {
      width: '2px',
      style: 'solid',
      color: '{primary.color}',
      offset: '2px',
      shadow: 'none',
    },
    // Sovrascrittura dei token per colore del tema Aura
    colorScheme: {
      light: {
        primary: {
          color: '{primary.600}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.700}',
          activeColor: '{primary.800}',
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.100}',
          color: '{primary.700}',
          focusColor: '{primary.800}',
        },
      },
      dark: {
        primary: {
          color: '{primary.300}',
          contrastColor: '{surface.950}',
          hoverColor: '{primary.200}',
          activeColor: '{primary.100}',
        },
        highlight: {
          background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
          focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
});

export const primeNgThemeConfig: PrimeNGConfigType = {
  ripple: true,
  inputVariant: 'outlined',
  theme: {
    preset: MrDTwicePreset,
    options: {
      // Applicare .p-dark a html/body attiva le variabili dark generate da PrimeNG.
      darkModeSelector: '.p-dark',
      cssLayer: {
        name: 'primeng',
        order: 'theme, base, primeng',
      },
    },
  },
};
