import { Box, Heading, FormControl, FormLabel, Input, VStack, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import axios from '../../../utils/axiosConfig';
import { useRouter } from 'next/navigation';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5206/api/Signin/Collaborator', {
        "email":email,
        "password": password,
      });

      const token = response.headers['token'];
      console.log(token);
      // Armazena o token no localStorage
      localStorage.setItem('Authorization', token);
      localStorage.setItem('typeuser', response.data.typeuser);
      localStorage.setItem('emailuser', response.data.email);
      // Redireciona o usuário para a tela Home
      router.push('/Home');
      toast({
        title: 'Login bem-sucedido.',
        description: 'Você foi logado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error('Erro ao fazer login:', error.message);
      toast({
        title: 'Erro ao fazer login.',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={8} align="stretch" width="full" maxW="md" mx="auto" mt={0}>
      <Box p={8} borderWidth={0} borderRadius="lg" >
        
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="exemplo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            focusBorderColor="primary.400"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            focusBorderColor="primary.400"
          />
        </FormControl>
        <Button
          color="white"
          backgroundColor="primary.300"
          _hover={{ backgroundColor: 'primary.300' }}
          _focus={{ backgroundColor: 'primary.300' }}
          width="full"
          mt={4}
          onClick={handleSubmit}
        >
          Entrar
        </Button>
      </Box>
    </VStack>
  );
};

export default Signin;
