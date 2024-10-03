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
            <Heading as="h3" size="md" mb={4}>
              1: Dados da Conta
            </Heading>
            <FormControl mb={4}>
              <FormLabel>Nome da empresa</FormLabel>
              <Input placeholder="Nome" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder="Senha" />
            </FormControl>
            <Flex justifyContent="flex-end" >
              <IconButton
                aria-label="Próximo"
                icon={<ArrowForwardIcon />}
                onClick={handleNextStep}
                backgroundColor={"#E8DDFD"}
                color={"primary.300"}
                colorScheme="primary"
                _hover={{backgroundColor:"#E8DDFD"}}
              />
            </Flex>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Heading as="h3" size="md" mb={4}>
              2: Dados Empresariais
            </Heading>
            <FormControl mb={4}>
              <FormLabel>CNPJ</FormLabel>
              <Input placeholder="CNPJ" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Nome Fantasia</FormLabel>
              <Input placeholder="Nome Fantasia" />
            </FormControl>
            <FormControl mb={4}>
            <FormLabel>Causa Social</FormLabel>
            <Input placeholder="Causa Social" />
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
              />
              <IconButton
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
          <Heading as="h3" size="md" mb={4}>
            3: Endereço
          </Heading>
          <Grid templateColumns="1fr 1fr" gap={4}>
            <FormControl mb={4}>
              <FormLabel>Estado</FormLabel>
              <Input placeholder="Estado" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Cidade</FormLabel>
              <Input placeholder="Cidade" />
            </FormControl>
          </Grid>
          <Grid templateColumns="1fr 1fr" gap={4}>
            <FormControl mb={4}>
              <FormLabel>Rua</FormLabel>
              <Input placeholder="Rua" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Numero</FormLabel>
              <Input placeholder="Numero" type="number"/>
            </FormControl>
          </Grid>
          <FormControl mb={4}>
            <FormLabel>CEP</FormLabel>
            <Input placeholder="CEP" />
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
            />
            <Button
              color="primary.100"
              onClick={handleSubmit}
              backgroundColor="primary.300"
              _hover={{ backgroundColor: 'primary.300' }}
              _focus={{ backgroundColor: 'primary.300' }}
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


