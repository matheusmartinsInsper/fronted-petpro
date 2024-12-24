"use client";
import { Box, Button, Flex, Heading, Text, Link, HStack, Image, VStack, Input, FormControl, FormLabel, Select, Circle, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import {
  ArrowBackIcon, BellIcon, CalendarIcon, EditIcon, SettingsIcon, ExternalLinkIcon, ChatIcon,
  ChevronLeftIcon, ChevronRightIcon, AttachmentIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon, AtSignIcon, Icon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@chakra-ui/icons';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { motion, useAnimation, useInView, isValidMotionProp } from 'framer-motion';
import { useEffect, useState, useRef } from "react";
import { chakra } from "@chakra-ui/react";
import { MdGroups, MdRestaurant } from "react-icons/md";
import { FaCut, FaRunning, FaBone, FaDog, FaBasketballBall, FaStethoscope, FaHotel } from "react-icons/fa";
import { GiSyringe, GiBrain, GiScalpel } from "react-icons/gi";
import { BsThreeDots } from "react-icons/bs";

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});
const categoryIcons: Record<string, React.ElementType> = {
  petshop: FaDog,       // Ícone do Chakra UI
  clinica: GiSyringe,         // Ícone do React Icons
  veterinario: FaStethoscope,       // Ícone do React Icons
  hoteis: FaHotel      // Ícone do React Icons
};

const HomePage = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const redirecttologin = () => {
    router.push('/Signin');
  };

  const slides = [
    {
      image: "/homepage.png",
      title: "Gestão",
      description: "Tenha uma visão geral e detalhada de tudo que acontece na sua empresa, seja relacionado a finanças, clientes, funcionarios ou metas pessoais",
    },
    {
      image: "/agenda3.png",
      title: "Agenda",
      description: "Gerencie sua agenda em poucos cliques, agende atendimentos para novos clientes, cancele ou inicie o atendimento",
    },
    {
      image: "/atend.png",
      title: "Atendimento",
      description: "Realize prescrições, criação de protocolos,link para pagamento, agende retorno e saiba em detalhes tudo sobre seu cliente e pet",
    },
    {
      image: "/solicitations5.png",
      title: "Solicitações",
      description: "Receba solicitações para agendamentos feito pelos tutores, atribua atendimento a funcionarios/colaboradores ou rejeita a solicitação",
    },
    {
      image: "/tutores.png",
      title: "Clientes",
      description: "Gestão completa da sua carteira de clientes, com varias ações como chat, agendamento, gerar pagamentos,visualizar perfil dentre outras",
    },
    {
      image: "/prontuario.png",
      title: "Prontuarios",
      description: "Com a criação automatica do prontuario, tenha o histórico de atendimento, solicitações, anexos, protocolos, pagamentos e muito mais",
    },
    {
      image: "/stock2.png",
      title: "Estoque",
      description: "Dentro dos recuros de estoque além de disponibilizar seus produtos no app de tutores, você pode acompanhar o balanço geral, por item, por período etc ",
    },
    {
      image: "/service3.png",
      title: "Serviços",
      description: "Organize sue catalogo de serviços prestados, atualize quando quiser ou exclua-os e disponibilize os mesmos no app para todos os tutores",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };
  const geticonclient = (client: string) => {
    const IconComponent = categoryIcons[client];
    return IconComponent
  }


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
        px={["4", "28"]}
        py={"10"}
        zIndex="10" // Para garantir que o header fique acima de outros elementos
      >
        <Heading size="lg" flexDirection={"row"} display={"flex"} alignItems={"center"} ml={"-4"}>
          <Image src='mylogo.png' width={"80px"} />
          <Link ml="-4" href="/" _hover={{ textDecoration: "none" }}>
            <Text fontSize="2xl" fontWeight="bold">
              <span style={{ color: '#7839EE' }}>PET</span>pro
            </Text>
          </Link>
        </Heading>
        <HStack display={["none", "flex"]}>
          <Text mx={2} _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Recursos</Text>
          <Text mx={2} _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Propósito</Text>
          <Text mx={2} _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Quem somos</Text>
          <Text mx={2} _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Contato</Text>
          <Text mx={2} _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Blog</Text>
        </HStack>
        <Flex >
          <Button boxShadow={"md"} borderWidth={"1px"} borderColor={"gray.200"} fontWeight="bold" bg="transparent" color="primary.200" mr={4} size="sm" _hover={{ bgColor: "primary.300", color: "primary.100" }} onClick={redirecttologin}>
            Login
          </Button>
        </Flex>
      </Flex>

      {/* Conteúdo da página */}
      <Box width="100%" >
        <Box display="flex" flexDirection="column" alignItems="center" pt={["120px", "40px"]} bgColor="primary.100">
          <Box
            width="100%"
            display="flex"
            flexDirection={["column", "row"]}
            alignItems={["center", "start"]}
            gap={[8, 0]}
            px={[2, 24]}
          >
            {/* Texto e Botão */}
            <MotionBox
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              width="100%"
              maxWidth={["100%", "50%"]}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              padding={["16px", "24px"]}
              gap="24px"
              textAlign={["left", "left"]}
              height={["auto", "70vh"]}
              transition={"all 0.5s ease-in-out"}
              my={[0, 10]}
              color={"primary.200"}
            >
              <Text fontSize={["3xl", "5xl"]} fontFamily={"sans-serif"}>
                A melhor plataforma de{" "}
                <Text as="span" color="primary.300" fontWeight="bold">
                  gestão pet
                </Text>{" "}
                para o seu negócio!
              </Text>

              <Text fontSize={["md", "lg"]} color="gray.500">
                Gestão completa de <strong>agenda, clientes,estoque</strong><br /> e uma série de recursos em uma <strong>única </strong>ferramenta

              </Text>
              <Link href="#recursos">
                <Button
                  width={["66%", "33%"]}
                  bgGradient="linear(to-r, primary.250, primary.300)"
                  size="lg"
                  color="primary.500"
                  borderRadius="md"
                  _hover={{
                    bgGradient: "linear(to-r, primary.300, primary.300)",
                    color: "white",
                  }}
                  transition="background-color 2s ease"
                  p={4}
                >
                  Nossa solução
                </Button>
              </Link>
            </MotionBox>

            {/* Imagem */}
            <MotionBox
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={"all 0.5s ease-in-out"}
              my={[0, 10]}
              width="100%"
              maxWidth={["100%", "50%"]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              height={["auto", "70vh"]}
            >

              <Image src="/animallp3.gif" width={["100%", "80%"]} objectFit="contain" mb={["6", "0"]} />
            </MotionBox>
          </Box>
        </Box>
        <Box
          p="6"
          width="100%"
          bgColor="primary.200"
          height="auto"
          boxShadow="md"
          display="flex"
          flexDirection={["row", "row"]}
          justifyContent="space-between"
          alignItems="center"
          gap={[6, 0]}
          overflowX={["auto", "visible"]} // Ativa o scroll horizontal no mobile
          whiteSpace={["nowrap", "normal"]}
          color={"primary.100"}
          minHeight={"120px"}
          px={["8", "28"]}
          zIndex={999}
        >
          {[
            { title: "Clínica", text: "Gerencie sua rede ", text2: "e  funcionários", icon: "clinica", iconSize: "40px" },
            { title: "PetShop", text: "Registro de serviços e produtos", text2: "e disponibilize no app", icon: "petshop", iconSize: "40px" },
            { title: "Veterinário", text: "Acesse recursos de rede e pessoais", text2: "como agenda,clientes,etc", icon: "veterinario", iconSize: "70px" },
            { title: "Hotéis", text: "check-in e check-out", text2: "dos pets", icon: "hoteis", iconSize: "40px" },
          ].map((item, idx) => (
            <Box key={idx} display="flex" flexDirection="row" textAlign={"center"} minWidth="150px" flexShrink={[0, 1]}>
              <Box width={"40px"} height={"40px"} mr={3} borderWidth={"1px"} borderColor={"primary.300"} bgColor={"primary.250"} p={"2"} borderRadius={"md"}>
                <Icon as={geticonclient(item.icon)} color="primary.300" boxSize="6" />
              </Box>
              <Box display={"flex"} alignItems={"start"} flexDirection={"column"}>
                <Text fontSize="sm" display={"flex"} alignItems={"start"} justifyContent={"start"}>
                  {item.text}
                </Text>
                <Text fontSize="sm" display={"flex"} alignItems={"start"} justifyContent={"start"}>
                  {item.text2}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box height="95vh" px="4" display="flex" justifyContent="center" alignItems="center" bgColor={"primary.100"}>
        <Flex
          width="100%"
          maxWidth="1200px"
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
        >
          {/* Image */}
          <Box mr={6} bgColor={"primary.300"} borderTopLeftRadius={"10px"} borderBottomLeftRadius={"260px"} borderBottomRightRadius={"10px"} borderTopRightRadius={"260px"} width={["75vw", "45vw"]} height={["30vh", '50vh']} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              width={["80vw", "40vw"]}
              objectFit="cover"
              borderRadius="md"
              boxShadow={"lg"}

            />
          </Box>


          {/* Text and Buttons */}
          <Box
            ml={{ base: 0, md: 8 }}
            mt={{ base: 4, md: 0 }}
            display={"flex"}
            flexDirection={"column"}
            alignItems={["center", "start"]}
            maxWidth="500px"
          >
            <Text mb="2" fontWeight={"bold"} fontSize={"3xl"}>Nossos recursos</Text>
            {/* Navigation Arrows */}
            <Flex justify="start" align="center" mb="4" ml={-4}>
              <IconButton
                icon={<ChevronLeftIcon />}
                onClick={handlePrev}
                aria-label="Previous Slide"
                bgColor="transparent"
                _hover={{ bgColor: "transparent", color: "primary.300" }}
              />
              <IconButton
                icon={<ChevronRightIcon />}
                onClick={handleNext}
                aria-label="Next Slide"
                bgColor="transparent"
                size={"md"}
                _hover={{ bgColor: "transparent", color: "primary.300" }}
              />
            </Flex>

            {/* Slide Text */}
            <Text fontSize="2xl" fontWeight="bold" mb="2" color={"primary.300"}>
              {slides[currentIndex].title}
            </Text>
            <Text fontSize="lg" mb="4" color={"gray.500"}>
              {slides[currentIndex].description}
            </Text>

            {/* Learn More Button */}
            <Button
              ml={-4}
              rightIcon={<ArrowRightIcon />}
              bgColor={"transparent"}
              color={"primary.200"}
              _hover={{ bgcolo: "transparent", color: "primary.300" }}
              onClick={() =>
                alert(`Learn more about: ${slides[currentIndex].title}`)
              }
            >
              Saiba mais
            </Button>
          </Box>
        </Flex>
      </Box>

      <Box
        height={["100%", "100vh"]}
        display="flex"
        px={"6"}
        pt={"120px"}
        bgColor={"primary.200"}
        color={"primary.100"}
      >
        {/* Left side: Content */}
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="start"
          flexDirection="column"
        >

          <Text
            fontWeight="bold"
            fontSize={["3xl", "4xl"]} // Responsivo: maior no desktop
            mb="6"
          >
            Propósito
          </Text>

          <Text
            borderWidth={"1px"}
            borderColor={"primary.400"}
            textAlign={"center"}
            width={["90%", "40%"]} // Responsivo: no mobile ocupa 90%, no desktop 40%
            bgColor={"primary.250"}
            boxShadow={"md"}
            color={"primary.400"}
            p="6"
            borderRadius={"md"}
            fontWeight={"bold"}
            fontSize={["sm", "md"]} // Responsivo: fonte menor no mobile
            mb={"4"}
          >
            Desejamos nos tornar um ecossitema que conecta tutores a estabelecimentos e profissionais autonomos ,
            fornecendo segurança, praticidade e maior proximidade dos tutores com profissionais da área, assegurando assim uma vida mais saúdavel a seus pets
          </Text>

          <Text
            borderWidth={"1px"}
            borderColor={"primary.300"}
            textAlign={"center"}
            width={["90%", "40%"]} // Responsivo: no mobile ocupa 90%, no desktop 40%
            bgColor={"primary.250"}
            boxShadow={"md"}
            color={"primary.400"}
            p="6"
            borderRadius={"md"}
            fontWeight={"bold"}
            fontSize={["sm", "md"]} // Responsivo: fonte menor no mobile
            mb={"4"}
          >
            Entregar mais do que um ERP do nicho pet <br /> queremos ser uma ferramenta de automação de rotina, <br />
            fornecer um ambiente para teleatendimentos,<br /> gerar pagamentos e prescrições online
          </Text>

          <Box
            mt={"6"}
            display={"flex"}
            flexDirection={["column", "row"]} // Empilha no mobile, mantém lado a lado no desktop
            textAlign={"center"}
            alignItems={"center"}
          >
            <Text
              fontSize={["xs", "sm"]} // Responsivo: menor no mobile
              color="gray.500"
            >
              Conectar, cuidar e atender é o que nos faz
            </Text>
            <Text
              ml={["0", "1"]} // No mobile, remove a margem à esquerda
              fontSize={["xs", "sm"]} // Responsivo: menor no mobile
              fontWeight="bold"
            >
              <span style={{ color: '#7839EE' }}>PET</span>pro
            </Text>
          </Box>

        </Box>
      </Box>

      <Box
        height={["100%", "100vh"]}
        display="flex"
        px={["6", "6"]} // Menor padding em telas pequenas
        pt={["80px", "120px"]} // Ajuste do padding superior para telas pequenas
        bgColor="primary.100"
        flexDirection={["column-reverse", "row"]} // Coluna em telas pequenas, linha em desktop
      >
        <Box
          width={["100%", "50%"]} // 100% de largura em telas pequenas
          display="flex"
          alignItems="center"
          justifyContent="start"
          flexDirection="column"
          mb={["6", "0"]} // Espaçamento inferior em telas pequenas
          mt={["30px", "0px"]}
        >
          <Text fontWeight="bold" fontSize={["xl", "2xl"]} mb="4">Contato</Text>
          <VStack spacing={4} align="center">

            <Text color="gray.500" >
              Entre em contato conosco e ficaremos <strong>muito feliz</strong>  em lhe atender.<br />
              Venha conhecer nossa <strong>solução</strong> e tenha<strong> 30 dias gratuitos</strong> de uso da ferramenta.
            </Text>
            <Image
              src={"/sendemail.png"}
              objectFit="cover"
              borderRadius="md"
              width='60%'
            />
          </VStack>
        </Box>

        <Box
          width={["100%", "50%"]} // 100% de largura em telas pequenas
          display="flex"
          justifyContent={["center", "center"]}
        >
          <Box
            width={["90%", "75%"]} // Ajuste da largura do formulário para telas pequenas
            display="flex"
            height={["auto", "75vh"]} // Altura automática em telas menores
            flexDirection="column"
            alignItems="center"
            p={6}
            bgColor="primary.200"
            color="primary.100"
            borderRadius="md"
            boxShadow="lg"
          >
            <Text fontSize={["xl", "2xl"]} mb="6">Preencha seus dados</Text>
            <FormControl id="name" mb={4}>
              <FormLabel>Nome</FormLabel>
              <Input
                focusBorderColor="primary.400"
                type="text"
                placeholder="Digite seu nome"
                borderWidth="1px"
                borderColor="primary.250"
              />
            </FormControl>

            <FormControl id="email" mb={4}>
              <FormLabel>E-mail</FormLabel>
              <Input
                focusBorderColor="primary.400"
                type="email"
                placeholder="Digite seu e-mail"
                borderWidth="1px"
                borderColor="primary.250"
              />
            </FormControl>

            <FormControl id="phone" mb={4}>
              <FormLabel>Telefone</FormLabel>
              <Input
                focusBorderColor="primary.400"
                type="tel"
                placeholder="Digite seu telefone"
                borderWidth="1px"
                borderColor="primary.250"
              />
            </FormControl>

            <FormControl id="userType" mb={6}>
              <FormLabel>Tipo de Usuário</FormLabel>
              <Select
                focusBorderColor="primary.400"
                placeholder="Selecione uma opção"
                borderWidth="1px"
                borderColor="primary.250"
              >
                <option color="primary.300" value="petshop">Petshop/Clínica</option>
                <option value="hotel">Hotel</option>
                <option value="veterinario">Veterinário</option>
              </Select>
            </FormControl>

            <Button
              bgColor="primary.300"
              color="primary.100"
              width="100%"
              _hover={{ backgroundColor: "primary.400" }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" pt="60px" bgColor="primary.250" color="white">
        <Box
          display="flex"
          width="80%"
          justifyContent="space-between"
          pb="5vh"
          flexDirection={["column", "row"]} // Empilha em telas menores, alinha horizontalmente em telas maiores
          gap={[8, 0]} // Adiciona espaçamento entre colunas no mobile
        >
          {/* Coluna Redes Sociais */}
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="lg" color={"primary.400"}>Redes Sociais</Text>
            <Box display="flex" gap={4}>
              <Link href="https://facebook.com" isExternal>
                <Icon as={FaFacebook} boxSize="6" />
              </Link>
              <Link href="https://instagram.com" isExternal>
                <Icon as={FaInstagram} boxSize="6" />
              </Link>
              <Link href="https://twitter.com" isExternal>
                <Icon as={FaTwitter} boxSize="6" />
              </Link>
            </Box>
          </VStack>

          {/* Coluna Sou Tutor */}
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="lg" color={"primary.400"}>Sou Tutor</Text>
            <Link href="/servicos" _hover={{ textDecoration: "none", color: "primary.300" }}>Serviços</Link>
            <Link href="/medicos" _hover={{ textDecoration: "none", color: "primary.300" }}>Veterinarios</Link>
            <Link href="/hospitais" _hover={{ textDecoration: "none", color: "primary.300" }}>Estabelecimentos</Link>
            <Link href="/hospitais" _hover={{ textDecoration: "none", color: "primary.300" }}>Cadastrar</Link>
            <Link href="/hospitais" _hover={{ textDecoration: "none", color: "primary.300" }}>Baixe o App</Link>
            <Link href="/dicas" _hover={{ textDecoration: "none", color: "primary.300" }}>Dicas para seu Pet</Link>
          </VStack>

          {/* Coluna Suporte */}
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="lg" color={"primary.400"}>Suporte</Text>
            <Link href="/carreiras" _hover={{ textDecoration: "none", color: "primary.300" }}>Carreiras</Link>
            <Link href="/politica" _hover={{ textDecoration: "none", color: "primary.300" }}>Política de Privacidade e Termos de Serviço</Link>
            <Link href="/contato" _hover={{ textDecoration: "none", color: "primary.300" }}>Contato</Link>
            <Link href="/ajuda" _hover={{ textDecoration: "none", color: "primary.300" }}>Central de Ajuda</Link>
          </VStack>
        </Box>
      </Box>

      <Box bgColor={"primary.200"} color={"gray.500"} height={"80px"} justifyContent={"center"} alignItems={"center"} display={"flex"}>
        ©Copyright 2025. PETpro
      </Box>
    </Box>
  );
};

export default HomePage;
