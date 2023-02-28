import { ThemeOptions } from '@mui/material/styles';
import React from 'react';
declare module '@mui/material' {
  interface Color {
    dark: string;
    main: string;
    light: string;
    white: string;
    regular: string;
    neutral: string;
    black: string;
  }
}
declare module '@mui/material/styles' {
  interface ThemeOptions {
    //in order to declare it in theme file
    status: {
      danger: React.CSSProperties['color'];
    };
  }
  interface Theme {
    // in order to use it in any components via theme
    status: {
      danger: string;
    };
  }
  interface PaletteOptions {
    brand: PaletteColorOptions;
    others: PaletteColorOptions;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    main: true;
    cancel: true;
    upload: true;
  }
}
