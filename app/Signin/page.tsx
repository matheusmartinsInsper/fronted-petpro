// app/signup/page.tsx

"use client";

import { useState } from 'react';
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
        <Box bgColor={"primary.300"}  bgGradient="linear(to-tr, primary.200, primary.300)"  position={"absolute"} width={["90vw","35vw"]} height={["30vh","38vh"]} top={["12vh","12vh"]} borderRadius={"lg"}></Box>
        <Box bg="white" zIndex={"2"}  p={4} shadow="lg" borderWidth="2px" borderRadius="10px" textAlign="center" width={["80%","25%"]} height={["50%","55%"]} borderColor={"primary.100"}>
        <Flex alignItems="center" justifyContent="center">
      <Heading as="h1" size="md" mb={10} color="primary.200" display="flex" alignItems="center" marginBottom={"-5px"} opacity={"90%"}>
        Login
      </Heading>
    </Flex>
          {userType ? (
            <Box textAlign="left">
              <IconButton
                aria-label="Voltar"
                icon={<ArrowBackIcon />}
                onClick={handleBack}
                alignSelf="flex-start"
                mb={0}
                backgroundColor={"white"}
                size={"sm"}
                _hover={{backgroundColor:"primary.100"}}
              />
              {userType === 'vet' && <VetSignin />}
              {userType === 'clinic' && <ClinicSignin />}
            </Box>
          ) : (
            <Flex justifyContent="center" alignItems="center" height="80%">
      <VStack spacing={2} align="center" width="70%">
        
        <Text color="gray.500" mb={"2"} mt="4" fontSize={["xs","md"]}>Selecione o tipo de usuário</Text>
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
          fontSize={["xs","sm"]}
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
          mb="2"
          fontSize={["xs","sm"]}
        >
           Clínica
        </Button>
        <Text color="gray.500" fontSize={"sm"}>Ou</Text>
        <Text color="gray.500" fontSize={["xs","sm"]}>
        Sem cadastro? <Link fontSize={["xs","sm"]} href="/Signup" _hover={{textDecoration:"none"}} color={"primary.300"} fontWeight={"bold"}>Registrar</Link>
        </Text>
        <Heading cursor={"pointer"} onClick={()=>redirectlp()} as="h1" size="xs" mb={1} color="primary.200" display="flex" alignItems="center" marginBottom={"-5px"} bottom={"0"}>
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
