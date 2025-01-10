"use client";
import { Box, Button, Flex, Heading, Text, Link, HStack, Image, VStack, Input, FormControl, FormLabel, Select, Circle, IconButton, Divider } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import {
  ArrowBackIcon, BellIcon, CalendarIcon, EditIcon, SettingsIcon, ExternalLinkIcon, ChatIcon,
  ChevronLeftIcon, ChevronRightIcon, AttachmentIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon, AtSignIcon, Icon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@chakra-ui/icons';
import { CheckCircleIcon } from "@chakra-ui/icons";
import { FaFacebook, FaInstagram, FaTwitter, FaHeart } from 'react-icons/fa';
import { motion, useAnimation, useInView, isValidMotionProp } from 'framer-motion';
import { useEffect, useState, useRef } from "react";
import { chakra } from "@chakra-ui/react";
import { MdGroups, MdRestaurant, MdRocket } from "react-icons/md";
import { FaCut, FaRunning, FaBone, FaDog, FaBasketballBall, FaStethoscope, FaHotel, FaCheck, FaTimes } from "react-icons/fa";
import { GiSyringe, GiBrain, GiScalpel, GiTargeted, GiHand } from "react-icons/gi";
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

const Agenda = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("none");
  const redirecttologin = () => {
    router.push('/Signin');
  };

  const slides = [
    {
      image: "/homepage.png",
      title: "Gestão",
      description: "Tenha uma visão geral e detalhada de tudo que acontece na sua empresa, seja relacionado a finanças, clientes, funcionarios ou metas pessoais.",
    },
    {
      image: "/agenda3.png",
      title: "Agenda",
      description: "Gerencie sua agenda em poucos cliques, agende atendimentos para novos clientes, cancele ou inicie o atendimento, organize-se por prioridade e deixe lembretes a sua equipe.",
    },
    {
      image: "/atend.png",
      title: "Atendimento",
      description: "Realize prescrições, criação de protocolos,link para pagamento, agende retorno e saiba em detalhes tudo sobre seu cliente e pet.",
    },
    {
      image: "/anamnese2.png",
      title: "Anamnese",
      description: "Crie formulários de anamnese de forma dinâmica, e utilize os furmularios criados para serem preenchidos dentro dos atendimentos. ",
    },
    {
      image: "/solicitations5.png",
      title: "Solicitações",
      description: "Receba solicitações para agendamentos feito pelos tutores, atribua atendimento a funcionarios/colaboradores ou rejeita a solicitação.",
    },
    {
      image: "/tutores.png",
      title: "Clientes",
      description: "Gestão completa da sua carteira de clientes, com varias ações como chat, agendamento, gerar pagamentos,visualizar perfil dentre outras.",
    },
    {
      image: "/prontuario.png",
      title: "Prontuarios",
      description: "Com a criação automatica do prontuario, tenha o histórico de atendimento, solicitações, anexos, protocolos, pagamentos e muito mais.",
    },
    {
      image: "/colaborator2.png",
      title: "Rede",
      description: "Veterinários e estabelecimentos agora podem trabalhar em conjunto, basta enviar o convite ao médico, após a confirmação o profissional ja está integrado a rede.",
    },
    {
      image: "/stock2.png",
      title: "Estoque",
      description: "Dentro dos recuros de estoque além de disponibilizar seus produtos no app de tutores, você pode acompanhar o balanço geral, por item, por período etc. ",
    },
    {
      image: "/service3.png",
      title: "Serviços",
      description: "Organize sue catalogo de serviços prestados, atualize quando quiser ou exclua-os e disponibilize os mesmos no app para todos os tutores.",
    },
  ];

  const handlePrev = () => {
    if (isAnimating) return;
    setAnimationDirection("left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300); // Tempo da animação
  };

  const handleNext = () => {
    if (isAnimating) return;
    setAnimationDirection("right");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 300); // Tempo da animação
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
          <Image src='/mylogo.png' width={"80px"} />
          <Link ml="-4" href="/" _hover={{ textDecoration: "none" }}>
            <Text fontSize="2xl" fontWeight="bold">
              <span style={{ color: '#7839EE' }}>PET</span>pro
            </Text>
          </Link>
        </Heading>
        <HStack display={["none", "flex"]}>
          <Link mx={2} href='#resource' _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Recursos</Link>
          <Link mx={2} href="#aboutus" _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Sobre nós</Link>
          <Link mx={2} href='#contact' _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Contato</Link>
          <Text mx={2} _hover={{ borderBottomWidth: "2px", borderBottomColor: "primary.300" }} fontWeight="bold" cursor="pointer" borderBottomWidth="2px" borderBottomColor="primary.100">Blog</Text>
        </HStack>
        <Flex >
          <Button boxShadow={"md"} borderWidth={"1px"} borderColor={"gray.200"} fontWeight="bold" bg="transparent" color="primary.200" mr={4} size="sm" _hover={{ bgColor: "primary.300", color: "primary.100" }} onClick={redirecttologin}>
            Login
          </Button>
        </Flex>
      </Flex>

      {/* Conteúdo da página */}
      <Box
        pt={"120px"}
        id="resource"
        height="95vh"
        px="4"
        display="flex"
        flexDirection={"column"}
        justifyContent="start"
        alignItems="center"
        bgColor={"primary.100"}
      >
        <Text mb={2} fontSize={"5xl"} fontWeight={"bold"} color={"primary.200"}>
          Agenda
        </Text>
        <Text
          mb={12}
          textAlign={"center"}
          fontSize={"xl"}
          color={"gray.500"}
        >
          Com a nossa ferramenta você e sua equipe será capaz de gerenciar todos <br />
          seus atendimentos em alguns cliques
        </Text>
        <Box width={"50vw"} borderRadius={"20"}>
          <Image
            borderRadius="md"
            boxShadow={"lg"}
            width={"100%"}
            src="/agenda3.png"
          />
        </Box>
      </Box>




      <Box   id="resource" height="95vh" px="4" display="flex" justifyContent="center" alignItems="center" bgColor={"primary.100"}>
        <Flex
          width="100%"
          maxWidth="1200px"
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
        >
          {/* Image */}
          <Box mr={[0, 6]} bgColor={"primary.300"} borderTopLeftRadius={"10px"} borderBottomLeftRadius={"260px"} borderBottomRightRadius={"10px"} borderTopRightRadius={"260px"} width={["75vw", "45vw"]} height={["30vh", '50vh']} display={"flex"} justifyContent={"center"} alignItems={"center"}>
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
            <Text mb={["4", "4"]} fontWeight={"bold"} fontSize={["2xl", "3xl"]}>Para oque serve?</Text>
            {/* Navigation Arrows */}

            <Box
              position="relative"
              minHeight={["20vh", "15vh"]}
              width={["85vw", "33vw"]}
              overflow="hidden"
              display="flex"
              justifyContent="start"
              alignItems={["center", "start"]}
              mb={[4, 0]}
            >
              <Flex
                position="absolute"
                transform={
                  animationDirection === "right"
                    ? isAnimating
                      ? "translateX(-100%)"
                      : "translateX(0)"
                    : isAnimating
                      ? "translateX(100%)"
                      : "translateX(0)"
                }
                transition="transform 0.5s ease"
                key={currentIndex}
                width="100%"
                justifyContent="start"
                alignItems={["center", "start"]}
                flexDirection="column"
              >
                <Text fontSize="xl" fontWeight="bold" color="primary.300">
                  {slides[currentIndex].title}
                </Text>
                <Text fontSize="md" color="gray.500" display={"flex"} flexDirection={"column"} textAlign={["center", "left"]}>
                  {slides[currentIndex].description}
                </Text>
              </Flex>
            </Box>
            <Flex mt={[0, 2]} justify="start" align="center" mb="" ml={-4}>
              <IconButton
                icon={<ChevronLeftIcon boxSize={"8"} />}
                onClick={handlePrev}
                color={"primary.250"}
                aria-label="Previous Slide"
                bgColor="transparent"
                _hover={{ bgColor: "transparent", color: "primary.300" }}
              />
              <IconButton
                icon={<ChevronRightIcon boxSize={"8"} />}
                onClick={handleNext}
                color={"primary.250"}
                aria-label="Next Slide"
                bgColor="transparent"
                _hover={{ bgColor: "transparent", color: "primary.300" }}
              />
            </Flex>
          </Box>
        </Flex>
      </Box>




      <Box display="flex" flexDirection="column" alignItems="center" pt="60px" bgGradient="linear(to-b, primary.250 70%, primary.200 100%)" color="white">
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

export default Agenda;
