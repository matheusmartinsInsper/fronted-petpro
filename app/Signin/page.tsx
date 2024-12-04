// app/signup/page.tsx

"use client";

import { useState, createContext, useContext } from 'react';
import { Box, Button, Flex, Heading, Image, Text, VStack, IconButton,Link }  from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import VetSignin from './components/collaboratorsignin';
import ClinicSignin from './components/clinicsignin';
import { relative } from 'path';
//import Link from 'next/link';


const SignupPage = () => {
  const [userType, setUserType] = useState<'vet' | 'clinic' | null>(null);
  const router = useRouter();

  const handleBack = () => {
    setUserType(null); // Limpa o userType para permitir escolha novamente
  };
  const redirectlp = () => {
    router.push('/');
  };


  return (
    <Flex minH="100vh">
      {/* Container da Esquerda */}
      <Flex flex="3.5" bg="primary.100" p={8} justifyContent="center" alignItems="center">
        <Box bgColor={"primary.300"}  bgGradient="linear(to-tr, primary.200, primary.300)"  position={"absolute"} width={["90vw","35vw"]} height={["25vh","38vh"]} top={["20vh","12vh"]} borderRadius={"lg"}></Box>
        <Box bg="white" zIndex={"2"}  p={4} shadow="lg" borderWidth="2px" borderRadius="10px" textAlign="center" width={["85%","25%"]} height={["45%","55%"]} borderColor={"primary.100"}>
        <Flex alignItems="center" justifyContent="center">
      <Heading as="h1" size="md" mb={10} color="primary.200" display="flex" alignItems="center" marginBottom={"-5px"} opacity={"90%"}>
        Login
      </Heading>
    </Flex>
          <Box textAlign="left">
              <ClinicSignin />
            </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SignupPage;
