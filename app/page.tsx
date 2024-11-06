"use client";
import { Box, Button, Flex, Heading, Text, Link, HStack, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import {
  ArrowBackIcon, BellIcon, CalendarIcon, EditIcon, SettingsIcon, ExternalLinkIcon, ChatIcon,
  ChevronLeftIcon, ChevronRightIcon, AttachmentIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon, AtSignIcon
} from '@chakra-ui/icons';

const HomePage = () => {
  const router = useRouter();
  const redirecttologin = () => {
    router.push('/Signin');
  };

  return (
    <Box >
      {/* Header */}
      <Flex
      boxShadow={"md"}
        as="header"
        justify="space-between"
        align="center"
        bgColor="primary.100"
        height="10px"
        width="100%"
        alignItems="center"
        position="fixed"
        top="0"
        px="6"
        py={"10"}
        zIndex="10" // Para garantir que o header fique acima de outros elementos
      >
        <Heading size="lg">
          <Link ml="0" href="/" _hover={{ textDecoration: "none" }}>
            <Text fontSize="xl" fontWeight="bold">
              <span style={{ color: '#7839EE' }}>PET</span>pro
            </Text>
          </Link>
        </Heading>
        <HStack>
          <Text mx={2} _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Recursos</Text>
          <Text mx={2} _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Propósito</Text>
          <Text mx={2} _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Quem somos</Text>
          <Text mx={2} _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Contato</Text>
          <Text mx={2} _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Blog</Text>
        </HStack>
        <Flex >
          <Button fontWeight="bold" bg="primary.500" color="primary.300" mr={4} size="sm" _hover={{ bgColor: "primary.300", color: "primary.100" }} onClick={redirecttologin}>
            Login
          </Button>
        </Flex>
      </Flex>

      {/* Conteúdo da página */}
      <Box width="100%" >
        <Box display="flex" flexDirection="column" alignItems="center" pt={"40px"} bgColor={"primary.100"}>
          <Box width="100%" display="flex" flexDirection="row">
            <Box gap={"6"} pl={"6"} width="50%" height={"70vh"} flexDirection={"column"} display={"flex"} justifyContent={"center"}>
              <Text fontSize={"4xl"} fontWeight={"bold"}>Gerencie seus clientes <br /> agenda e recursos empresariais</Text>
              <Text fontSize={"lg"}>Tenha o total controle do que acontece no seu negocio <br /> otimize seu tempo e recursos financeiros</Text>
              <Button
                width="33%"
                bgColor="primary.300"
                size="md"
                color="primary.100"
                borderRadius="50px"
                _hover={{
                  bgGradient: "linear(to-r, primary.300, primary.250)",
                  color: "primary.100",
                  transition: "background 1s ease, color 1s ease"
                }}
                transition="background 1s ease, color 1s ease"
              >
                Conheça nossa solução
              </Button>

            </Box>
            <Box width="50%" height="70vh" display="flex" alignItems="center" position="relative" justifyContent={"center"}>
              <Image src="/medialeadingpage.png" />
            </Box>
          </Box>
          <Box
            p="6"
            width="60%"
            bgColor="white"
            height="120px"
            mb="-60px"
            borderRadius="xl"
            boxShadow="md"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center" // Alinha as seções no centro verticalmente
          >
            <Box display="flex" flexDirection="row" alignItems="start">
              <Box mr={2}>
                <Image src='/baixados.jpeg' width={"40px"}/>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize={"lg"}>Clinica</Text>
                <Text fontSize="sm" color="gray.600">
                Tenha total controle <br /> e gestão do negócio
                </Text>
              </Box>
            </Box>

            <Box display="flex" flexDirection="row" alignItems="start">
              <Box mr={2}>
              <Image src='/secador.jpeg' width={"40px"}/>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize={"lg"}>PetShop</Text>
                <Text fontSize="sm" color="gray.600">
                Registro de serviços <br /> e produtos
                </Text>
              </Box>
            </Box>

            <Box display="flex" flexDirection="row" alignItems="start">
              <Box mr={"-10px"}>
              <Image src='/estetoscopio.jpeg' width={"70px"}  />
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize={"lg"}> Veterinario</Text>
                <Text fontSize="sm" color="gray.600">
                  Acesse recuros de rede <br /> e pessoais
                </Text>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="start">
              <Box mr={2}>
              <Image src='/hotelpet.jpeg' width={"40px"}/>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize={"lg"}>Hoteis</Text>
                <Text fontSize="sm" color="gray.600">
                Realize check-in e<br />check-ou  dos pets
                </Text>
              </Box>
            </Box>
          </Box>

        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" pt={"60px"} bgColor={"primary.500"}>
        <Box height={"100vh"}></Box>
        <Box height={"100vh"}></Box>
      </Box>
    </Box>
  );
};

export default HomePage;
