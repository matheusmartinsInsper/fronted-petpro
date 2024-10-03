// app/layout.tsx

"use client";
import { ReactNode } from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from '../theme/them'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
      </head>
      <body>
        <ChakraProvider theme={theme}>
          <CSSReset />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;


