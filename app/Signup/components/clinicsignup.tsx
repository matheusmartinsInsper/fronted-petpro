import { Box, Heading, FormControl, FormLabel, Input, Flex, VStack, Text, IconButton,Button,Grid } from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

const ClinicSignup = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Lógica para lidar com o envio do formulário
    // Pode incluir validações, chamadas à API, etc.
    console.log('Formulário enviado!');
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Box>
            <Heading as="h3" size="sm" mb={2}>
              1: Dados da Conta
            </Heading>
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}>Nome da empresa</FormLabel>
              <Input  focusBorderColor="primary.400" placeholder="Nome" borderRadius={"md"}
          size={"sm"}/>
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}>Email</FormLabel>
              <Input  focusBorderColor="primary.400" type="email" placeholder="Email" borderRadius={"md"}
          size={"sm"}/>
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}>Senha</FormLabel>
              <Input  focusBorderColor="primary.400" type="password" placeholder="Senha" borderRadius={"md"}
          size={"sm"}/>
            </FormControl>
            <Flex justifyContent="flex-end" >
              <IconButton
                aria-label="Próximo"
                icon={<ArrowForwardIcon />}
                onClick={handleNextStep}
                backgroundColor={"#E8DDFD"}
                color={"primary.300"}
                colorScheme="primary"
                size={"sm"}
                _hover={{backgroundColor:"#E8DDFD"}}
              />
            </Flex>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Heading as="h3" size="sm" mb={2}>
              2: Dados Empresariais
            </Heading>
            <FormControl mb={2} fontSize={"sm"}>
              <FormLabel fontSize={"sm"}>CNPJ</FormLabel>
              <Input  focusBorderColor="primary.400" placeholder="CNPJ" borderRadius={"md"}
          size={"sm"}/>
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}>Nome Fantasia</FormLabel>
              <Input  focusBorderColor="primary.400" placeholder="Nome Fantasia" borderRadius={"md"}
          size={"sm"}/>
            </FormControl>
            <FormControl mb={2}>
            <FormLabel fontSize={"sm"}>Causa Social</FormLabel>
            <Input  focusBorderColor="primary.400" placeholder="Causa Social" borderRadius={"md"}
          size={"sm"}/>
            </FormControl>
            <Flex justifyContent="space-between">
              <IconButton
                aria-label="Anterior"
                icon={<ArrowBackIcon />}
                backgroundColor={"#E8DDFD"}
                color={"primary.300"}
                onClick={handlePreviousStep}
                colorScheme="primary"
                _hover={{backgroundColor:"#E8DDFD"}}
                size="sm"
              />
              <IconButton
              size="sm"
                aria-label="Próximo"
                icon={<ArrowForwardIcon />}
                backgroundColor={"#E8DDFD"}
                color={"primary.300"}
                onClick={handleNextStep}
                colorScheme="primary"
                _hover={{backgroundColor:"#E8DDFD"}}
              />
            </Flex>
          </Box>
        );
      case 3:
        return (
          <Box>
          <Heading as="h3" size="sm" mb={2}>
            3: Endereço
          </Heading>
          <Grid templateColumns="1fr 1fr" gap={4}>
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}>Estado</FormLabel>
              <Input placeholder="Estado"  focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"}/>
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}>Cidade</FormLabel>
              <Input  focusBorderColor="primary.400" placeholder="Cidade" borderRadius={"md"}
          size={"sm"}/>
            </FormControl>
          </Grid>
          <Grid templateColumns="1fr 1fr" gap={2}>
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}> Rua</FormLabel>
              <Input  focusBorderColor="primary.400" placeholder="Rua" borderRadius={"md"}
          size={"sm"}/>
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}>Numero</FormLabel>
              <Input  focusBorderColor="primary.400" placeholder="Numero" type="number" borderRadius={"md"}
          size={"sm"}/>
            </FormControl>
          </Grid>
          <FormControl mb={2}>
            <FormLabel fontSize={"sm"}>CEP</FormLabel>
            <Input  focusBorderColor="primary.400" placeholder="CEP" borderRadius={"md"}
          size={"sm"}/>
          </FormControl>
          <Flex justifyContent="space-between">
            <IconButton
              aria-label="Anterior"
              icon={<ArrowBackIcon />}
              backgroundColor={"#E8DDFD"}
              color={"primary.300"}
              onClick={handlePreviousStep}
              colorScheme="primary"
              _hover={{backgroundColor:"#E8DDFD"}}
              size={"sm"}
            />
            <Button
              color="primary.100"
              onClick={handleSubmit}
              backgroundColor="primary.200"
              _hover={{ backgroundColor: 'primary.300' }}
              _focus={{ backgroundColor: 'primary.300' }}
              size={"sm"}
            >
              Registrar
            </Button>
          </Flex>
        </Box>
        );
      default:
        return null;
    }
  };

  return (
    <VStack spacing={8} align="stretch">
      {renderStepContent()}
    </VStack>
  );
};

export default ClinicSignup;


