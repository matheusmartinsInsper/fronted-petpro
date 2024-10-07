// theme.ts

import { extendTheme } from '@chakra-ui/react';
import '@fontsource/nunito/400.css'; // peso 400
import '@fontsource/nunito/600.css'; // peso 600
import '@fontsource/nunito/700.css'; // peso 700



const theme = extendTheme({
  colors: {
    primary: {
        100: '#F9FAFB',
        200: '#1D2939',
        250: "#2C3A4F",
        300: '#7839EE',
        400: "#894FF6",
        500: "#E8DDFD",
        600: '#E0144C',
        650: '#F9CCD9',
        700: "#FF407D",
        800: "#2EB086",
        900: "#FFC100"
      },
  },
  fonts: {
    heading: 'Nunito, sans-serif',
    body: 'Nunito, sans-serif', // Atualizando 'nunito' para 'Nunito'
  },
  fontWeights: {
    heading: 700, // Usa peso mais grosso para headings
    body: 400,    // Usa peso normal para o corpo do texto
  },
});

export default theme;
