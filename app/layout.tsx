"use client";

import { ReactNode } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../theme/them";
import { AppProvider } from "./context/AppContext";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
      </head>
      <body>
        <AppProvider>
          <ChakraProvider theme={theme}>
            <CSSReset />
            {children}
          </ChakraProvider>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
