import { Box, FormControl, FormLabel, Input, VStack, Button, useToast,Text,Checkbox,Link } from '@chakra-ui/react';
import { useState,createContext, useContext } from 'react';
import axios from '../../../utils/axiosConfig';
import { useRouter } from 'next/navigation';
import { useAppContext } from "../../context/AppContext";


const ClinicSignin = () => {
  const { setState } = useAppContext();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5206/api/Signin/Platform', {
        "email":email,
        "password":password,
      });

      // Obtém o token do cabeçalho da resposta
      const token = response.headers['token'];
      console.log(token);
      // Armazena o token no localStorage
      localStorage.setItem('Authorization', token);
      localStorage.setItem('typeuser', response.data.typeuser);
      localStorage.setItem('emailuser', response.data.email);
      localStorage.setItem('nameuser', response.data.nameuser);
      // Redireciona o usuário para a tela Home
      setName(response.data.nameuser);
      router.push('/Home');
      setState({
        nameuser: response.data.nameuser,
        email: response.data.email,
        typeuser: response.data.typeuser,
        token: token
      });

      toast({
        title: 'Login bem-sucedido.',
        description: 'Você foi logado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error:any) {
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
    <VStack spacing={4} align="stretch" width="full" maxW="md" mx="auto" mt={0}>
  <Box p={4} borderWidth={0} borderRadius="lg">
    <FormControl mb={4}>
      <FormLabel>Email</FormLabel>
      <Input
        type="email"
        placeholder="clinica@gmail.com"
        value={email}
        size={"sm"}
        onChange={(e) => setEmail(e.target.value)}
        focusBorderColor="primary.400"
        borderRadius={"md"}
      />
    </FormControl>
    <FormControl mb={4}>
      <FormLabel>Senha</FormLabel>
      <Input
        borderRadius={"md"}
        size={"sm"}
        type="password"
        placeholder="********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        focusBorderColor="primary.400"
      />
    </FormControl>
    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
      <Text size={"sm"} fontSize={"sm"} color={"gray.500"}>
        <Checkbox mr="2" iconColor="primary.300" colorScheme="primary.100" _selected={{ color: "primary.300", outline: "none" }} />
        Lembrar de mim
      </Text>
      <Text fontSize={"sm"} color={"primary.300"} cursor={"pointer"}>
        Esqueci senha
      </Text>
    </Box>
    <Box display="flex" justifyContent="space-between" alignItems={["start","center"]} mt={4} flexDirection={["column-reverse","row"]}>
      <Button
        color="white"
        backgroundColor="primary.200"
        _hover={{ backgroundColor: 'primary.300' }}
        _focus={{ backgroundColor: 'primary.300' }}
        size={"sm"}
        onClick={handleSubmit}
        mt={["4","0"]}
      >
        Entrar
      </Button>
      <Text color="gray.500" fontSize={["xs","sm"]}>
        Sem cadastro? <Link fontSize={["xs","sm"]} href="/Signup" _hover={{textDecoration:"none"}} color={"primary.300"} fontWeight={"bold"}>Registrar</Link>
        </Text>
    </Box>
  </Box>
</VStack>

  );
};


export default ClinicSignin;

