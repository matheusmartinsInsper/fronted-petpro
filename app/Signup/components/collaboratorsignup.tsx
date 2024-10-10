import { Box, Heading, FormControl, FormLabel, Input, Flex, VStack, Text, IconButton, Button, Grid,useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import axios from '../../../utils/axiosConfig';
import { useRouter } from 'next/navigation';

const VetSignup = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    crmv: '',
    graduation: '',
    institution: '',
    adress: {
      uf: '',
      city: '',
      street: '',
      cep: '',
      number: ''
    }
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    if (step === 3 && ['uf', 'city', 'street', 'cep', 'number'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        adress: {
          ...prev.adress,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

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

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5206/api/Signup/Collaborator', formData);
      console.log('Formulário enviado!', response.data);
      toast({
        title: 'Sucesso',
        description: 'Conta Criada com sucesso',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/Signin');
    } catch (error) {
      console.error('Erro ao enviar o formulário', error);
    }
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
              <FormLabel fontSize={"sm"}>Nome</FormLabel>
              <Input focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"}  name="name" value={formData.name} onChange={handleChange} placeholder="Nome" />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}>Email</FormLabel>
              <Input focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}>Senha</FormLabel>
              <Input focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"} type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Senha" />
            </FormControl>
            <Flex justifyContent="flex-end">
              <IconButton
                aria-label="Próximo"
                icon={<ArrowForwardIcon />}
                onClick={handleNextStep}
                backgroundColor={"#E8DDFD"}
                color={"primary.300"}
                colorScheme="primary"
                _hover={{backgroundColor:"#E8DDFD"}}
                size={"sm"}
              />
            </Flex>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Heading as="h3" size="sm" mb={2}>
              2: Dados Pessoais
            </Heading>
            <Grid templateColumns="1fr 1fr" gap={4}>
              <FormControl mb={2}>
                <FormLabel fontSize={"sm"}>CPF</FormLabel>
                <Input focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"} name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel fontSize={"sm"}>CRMV</FormLabel>
                <Input focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"} name="crmv" value={formData.crmv} onChange={handleChange} placeholder="CRMV" />
              </FormControl>
            </Grid>
              <FormControl mb={2}>
                <FormLabel fontSize={"sm"}>Instituição</FormLabel>
                <Input focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"} name="institution" value={formData.institution} onChange={handleChange} placeholder="Instituição" />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel fontSize={"sm"}>Graduação</FormLabel>
                <Input focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"} name="graduation" value={formData.graduation} onChange={handleChange} placeholder="Graduação" />
              </FormControl>
             {/* <FormControl mb={4}>
              <FormLabel>Data de Nascimento</FormLabel>
              <Input type="date" name="birthdate" value={formData.} onChange={handleChange} placeholder="Data de Nascimento" />
            </FormControl>  */}
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
              <IconButton
                aria-label="Próximo"
                icon={<ArrowForwardIcon />}
                backgroundColor={"#E8DDFD"}
                color={"primary.300"}
                onClick={handleNextStep}
                colorScheme="primary"
                _hover={{backgroundColor:"#E8DDFD"}}
                size={"sm"}
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
            <Grid templateColumns="1fr 1fr" gap={2}>
              <FormControl mb={2}>
                <FormLabel fontSize={"sm"}>Estado</FormLabel>
                <Input focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"} name="uf" value={formData.adress.uf} onChange={handleChange} placeholder="Estado" />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel fontSize={"sm"}>Cidade</FormLabel>
                <Input focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"} name="city" value={formData.adress.city} onChange={handleChange} placeholder="Cidade" />
              </FormControl>
            </Grid>
            <Grid templateColumns="1fr 1fr" gap={2}>
              <FormControl mb={2}>
                <FormLabel fontSize={"sm"}>Rua</FormLabel>
                <Input focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"} name="street" value={formData.adress.street} onChange={handleChange} placeholder="Rua" />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel fontSize={"sm"}>Número</FormLabel>
                <Input focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"} name="number" type="number" value={formData.adress.number} onChange={handleChange} placeholder="Número" />
              </FormControl>
            </Grid>
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}>CEP</FormLabel>
              <Input focusBorderColor="primary.400"  borderRadius={"md"}
          size={"sm"} name="cep" value={formData.adress.cep} onChange={handleChange} placeholder="CEP" />
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

export default VetSignup;
