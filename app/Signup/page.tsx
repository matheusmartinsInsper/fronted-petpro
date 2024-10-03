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
        <Box bg="white"  p={4} shadow="md" borderWidth="1px" borderRadius="10px" textAlign="center" width="70%" height="80%" borderColor={"primary.100"}>
        <Flex alignItems="center" justifyContent="center">
      <Heading as="h1" size="lg" mb={4} color="primary.200" display="flex" alignItems="center" marginBottom={"-5px"} opacity={"90%"}>
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
              />
              {userType === 'vet' && <VetSignup />}
              {userType === 'clinic' && <ClinicSignup />}
            </Box>
          ) : (
            <Flex justifyContent="center" alignItems="center" height="80%">
      <VStack spacing={4} align="center" width="70%">
       
        <Text color="gray.600" mb={"10px"}>Selecione o tipo de usuário abaixo e preencha seus dados</Text>
        <Button
          width="80%"
          color="primary.100"
          onClick={() => setUserType('vet')}
          backgroundColor="primary.300"
          _hover={{ backgroundColor: 'primary.300' }}
          _focus={{ backgroundColor: 'primary.300' }}
        >
           Veterinário
        </Button>
        <Button
          width="80%"
          color="primary.100"
          onClick={() => setUserType('clinic')}
          backgroundColor="primary.300"
          _hover={{ backgroundColor: 'primary.300' }}
          _focus={{ backgroundColor: 'primary.300' }}
        >
           Clínica
        </Button>
        <Text color="gray.600">Ou</Text>
        <Text color="gray.600">
          Já possui cadastro? <Link href="/Signin" _hover={{textDecoration:"none"}} color={"primary.300"}>Entrar</Link>
        </Text>
        <Heading as="h1" size="md" mb={4} color="primary.200" display="flex" alignItems="center" marginBottom={"-5px"}>
        <span style={{ color: '#7839EE' }}>PET</span>pro
      </Heading>
      </VStack>
    </Flex>
          )}
        </Box>
      </Flex>

      {/* Container da Direita */}
      <Box flex="6" bg="primary.200" p={8} textAlign="center" display="flex" alignItems="center">
      <Flex flex="1" justifyContent="flex-start" alignItems="start">
      <Box color="primary.100" textAlign="left" width={"100%"} mb={"0px"}>
        <Heading as="h2" size="md" mb={4} color="primary.100" alignItems="start" lineHeight="taller" fontSize="3xl">
        <span style={{ color: '#7839EE' }}>Centralize</span> e realize a <span style={{ color: '#7839EE' }}>gestão</span> de seus <br/> atendimentos, serviços, estoque e colaboradores <br/> em uma  <span style={{ color: '#7839EE' }}>única plataforma com integração a IA</span> <br/> registre e ganhe 7 dias de conta premium
        </Heading>
      </Box>
    </Flex>
    </Box>
    </Flex>
  );
};

export default SignupPage;
