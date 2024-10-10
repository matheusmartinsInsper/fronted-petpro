// app/signup/page.tsx

"use client";

import { useState } from 'react';
import { Box, Button, Flex, Heading, Image, Text, VStack, IconButton,Link } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import VetSignup from './components/collaboratorsignup';
import ClinicSignup from './components/clinicsignup';

const SignupPage = () => {
  const [userType, setUserType] = useState<'vet' | 'clinic' | null>(null);

  const handleBack = () => {
    setUserType(null); // Limpa o userType para permitir escolha novamente
  };

  return (
    <Flex minH="100vh">
      {/* Container da Esquerda */}
      <Flex flex="3.5" bg="primary.100" p={8} justifyContent="center" alignItems="center">
      <Box bgColor={"primary.300"}  bgGradient="linear(to-tr, primary.200, primary.300)"  position={"absolute"} width={"35vw"} height={"38vh"} top={"12vh"} borderRadius={"lg"}></Box>
        <Box bg="white" zIndex={"2"}  p={4} shadow="lg" borderWidth="2px" borderRadius="10px" textAlign="center" width="25%" height={userType?"60%":"55%"} borderColor={"primary.100"}>
        <Flex alignItems="center" justifyContent="center">
      <Heading as="h1" size="md" mb={10} color="primary.200" display="flex" alignItems="center" marginBottom={"-5px"} opacity={"90%"}>
        Cadastro
      </Heading>
    </Flex>
          {userType ? (
            <Box textAlign="left">
              <IconButton
                aria-label="Voltar"
                icon={<ArrowBackIcon />}
                onClick={handleBack}
                alignSelf="flex-start"
                backgroundColor={"white"}
                mb={4}
                size={"sm"}
                _hover={{backgroundColor:"primary.100"}}
              />
              {userType === 'vet' && <VetSignup />}
              {userType === 'clinic' && <ClinicSignup />}
            </Box>
          ) : (
            <Flex justifyContent="center" alignItems="center" height="80%">
      <VStack spacing={2} align="center" width="70%">
       
        <Text color="gray.500" mb={"2"} mt="4">Selecione o tipo de usuário abaixo e preencha seus dados</Text>
        <Button
          width="50%"
          color="primary.300"
          boxShadow={"md"}
          fontWeight={"bold"}
          onClick={() => setUserType('vet')}
          backgroundColor="white"
          _hover={{ backgroundColor: 'primary.300',color:"primary.100" }}
          _focus={{ backgroundColor: 'primary.300',color:"primary.100"  }}
          size={"sm"}
        >
           Veterinário
        </Button>
        <Button
         width="50%"
         color="primary.300"
         boxShadow={"md"}
         fontWeight={"bold"}
          onClick={() => setUserType('clinic')}
          backgroundColor="white"
          _hover={{ backgroundColor: 'primary.300',color:"primary.100" }}
          _focus={{ backgroundColor: 'primary.300',color:"primary.100"  }}
          size={"sm"}
        >
           Clínica
        </Button>
        <Text color="gray.500" fontSize={"sm"}>Ou</Text>
        <Text color="gray.500">
          Já possui cadastro? <Link href="/Signin" _hover={{textDecoration:"none"}} fontWeight={"bold"} color={"primary.300"}>Entrar</Link>
        </Text>
        <Heading as="h1" size="xs" mb={1} color="primary.200" display="flex" alignItems="center" marginBottom={"-5px"}>
        <span style={{ color: '#7839EE' }}>PET</span>pro
      </Heading>
      </VStack>
    </Flex>
          )}
        </Box>
      </Flex>

     
    </Flex>
  );
};

export default SignupPage;
