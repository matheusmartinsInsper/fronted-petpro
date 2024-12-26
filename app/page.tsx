"use client";
import { Box, Button, Flex, Heading, Text, Link, HStack, Image, VStack, Input, FormControl, FormLabel, Select, Circle, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import {
  ArrowBackIcon, BellIcon, CalendarIcon, EditIcon, SettingsIcon, ExternalLinkIcon, ChatIcon,
  ChevronLeftIcon, ChevronRightIcon, AttachmentIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon, AtSignIcon, Icon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@chakra-ui/icons';
import { FaFacebook, FaInstagram, FaTwitter, FaHeart } from 'react-icons/fa';
import { motion, useAnimation, useInView, isValidMotionProp } from 'framer-motion';
import { useEffect, useState, useRef } from "react";
import { chakra } from "@chakra-ui/react";
import { MdGroups, MdRestaurant, MdRocket } from "react-icons/md";
import { FaCut, FaRunning, FaBone, FaDog, FaBasketballBall, FaStethoscope, FaHotel } from "react-icons/fa";
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

const HomePage = () => {
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
          <Image src='mylogo.png' width={"80px"} />
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
      <Box width="100%" >
        <Box display="flex" flexDirection="column" alignItems="center" pt={["100px", "40px"]} bgColor="primary.100">
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
                <Text
                  as="span"
                  fontWeight="bold"
                  bgGradient="linear(to-r, primary.200, primary.400)"
                  bgClip="text"
                >
                  gestão pet
                </Text>{" "}
                para o seu  {" "}<Text
                  as="span"
                  fontWeight="bold"
                  bgGradient="linear(to-r, primary.400, primary.200)"
                  bgClip="text"
                >negócio!</Text>
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

              <Image src="/animallp3.gif" width={["80%", "80%"]} objectFit="contain" mb={["6", "0"]} />
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

      <Box id="resource" height="95vh" px="4" display="flex" justifyContent="center" alignItems="center" bgColor={"primary.100"}>
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
            <Text mb={["4", "4"]} fontWeight={"bold"} fontSize={["2xl", "3xl"]}>Nossos recursos</Text>
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
            {/* Learn More Button */}
            <Button
              ml={-4}
              rightIcon={<ArrowRightIcon boxSize={"3"} />}
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
      <Box flexDirection={["column", "row"]} height="100%" px="24" pb={24} display="flex" justifyContent="center" alignItems="center" bgColor={"primary.100"}>
        <Box mr={[0, 4]} width={["80vw", "33vw"]} mb={6} display={"flex"} flexDirection={"column"} alignItems={["center", "start"]}>
          <Text fontSize={["2xl", "4xl"]} fontWeight={"bold"} color={"primary.300"} mb={4}>App  completo <br /> para tutores</Text>
          <Text textAlign={["center", "left"]} width={["100%", "80%"]} color={"gray.500"}>Estamos desenvolvendo uma <strong>plataforma e app completo</strong> para os tutores, onde eles poderão realizar <strong>solicitações</strong>, compras, realizar pagamentos e cuidar da saúde do seus animais.</Text>
        </Box>
        <Box mt={[6, 0]} mb={6} bgColor={"primary.300"} borderTopLeftRadius={"10px"} borderBottomLeftRadius={"280px"} borderBottomRightRadius={"10px"} borderTopRightRadius={"280px"}>
          <Image
            src={"./phoneapp.png"}
            width={"400px"}
            objectFit="cover"
            borderRadius="md"

          />
        </Box>
      </Box>
      <Box
        height={"100%"}
        display="flex"
        px={["6", "24"]}
        py={["16", "24"]}
        bgColor={"primary.200"}
        color={"primary.100"}
        id="aboutus"
      >
        {/* Left side: Content */}
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          my={6}

        >
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Text
              fontWeight="bold"
              fontSize={["xl", "2xl"]}
              color={"primary.300"}
            >
              Sobre nós
            </Text>
            <Text
              color={"primary.100"}
              fontWeight="bold"
              fontSize={["3xl", "4xl"]} // Responsivo: maior no desktop
              mb="12"
            >
              A Empresa
            </Text>
          </Box>
          <Flex mb={"12"} flexDirection={["column", "row"]} justifyContent={["center", "space-between"]} alignItems={["center", "space-between"]}>
            <Box width={["100%", "30%"]} my={4} mx={2} display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} fontSize={"lg"} mb={2} >
                <Box width={"40px"} height={"40px"} mr={4} borderWidth={"1px"} borderColor={"primary.300"} bgColor={"primary.250"} display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={"full"}>
                  <GiTargeted color='#7839EE' />
                </Box>
                <Text>Propósito</Text>
              </Box>
              <Text color={'gray.400'} fontSize={"md"} textAlign={"center"}>Oferecer uma ferramenta que impulsione seu negócio no segmento pet e conecte você aos tutores e seus pets.</Text>
            </Box>
            <Box width={["100%", "30%"]} my={4} mx={2} display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} fontSize={"lg"} mb={2}>
                <Box mr={2} width={"40px"} height={"40px"} borderWidth={"1px"} borderColor={"primary.300"} bgColor={"primary.250"} display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={"full"}>
                  <FaHeart color='#7839EE' />
                </Box>
                <Text ml={2}>Valores</Text>
              </Box>
              <Text color={'gray.400'} fontSize={"md"} textAlign={"center"}>Pessoas, pets, saúde, gestão e tecnologia sãos os pilares do nosso negócio.</Text>
            </Box>
            <Box width={["100%", "30%"]} my={4} mx={2} display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} fontSize={"lg"} mb={2}>
                <Box width={"40px"} height={"40px"} mr={4} borderWidth={"1px"} borderColor={"primary.300"} bgColor={"primary.250"} display={"flex"} justifyContent={"center"} alignItems={"center"} p={"2"} borderRadius={"full"}>
                  <MdRocket color='#7839EE' />
                </Box>
                <Text>Metas</Text>
              </Box>
              <Text color={'gray.400'} fontSize={"md"} textAlign={"center"}>Tornar-se o maior ecossistema virtual de pets do brasil, integrando tutores a estabelecimentos e veterinarios. </Text>
            </Box>

          </Flex>


        </Box>
      </Box>

      <Box
        id="contact"
        height={["100%", "100vh"]}
        display="flex"
        px={["6", "24"]} // Menor padding em telas pequenas
        pt={["80px", "120px"]} // Ajuste do padding superior para telas pequenas
        bgColor="primary.100"
        flexDirection={["column-reverse", "row"]} // Coluna em telas pequenas, linha em desktop
      >
        <Box
          width={["100%", "50%"]} // 100% de largura em telas pequenas
          display="flex"
          alignItems="start"
          justifyContent="start"
          flexDirection="column"
          mb={["6", "0"]} // Espaçamento inferior em telas pequenas
          mt={["30px", "0px"]}
          mx={4}
        >

          <HStack align="center" flexDirection={["column", "row"]} mb={8}>
            <Box>
              <Text fontWeight="bold" color={"primary.200"} fontSize={["3xl", "4xl"]} mb="4">Contate nos</Text>
              <Text color="gray.500" width={["100%", "100%"]} mb={4}>
                Entre em contato conosco e ficaremos <strong>felizes</strong> em lhe atender.
                Venha conhecer nossa <strong>solução</strong> e tenha<strong> 15 dias gratuitos</strong> de uso da ferramenta.
              </Text>
              <Text color="gray.500" mb={2}>contato@petpro.com</Text>
              <Text color="gray.500">(34) - 91234-4321</Text>
            </Box>

            <Image
              src={"/sendemail.png"}
              objectFit="cover"
              borderRadius="md"
              width={['80%', "40%"]}
            />
          </HStack>
          <Box display={"flex"} width={"100%"} flexDirection={"row"}>
            <Box mr={6}>
              <Text fontWeight={"bold"} color={"primary.200"} fontSize={"lg"}>Suporte</Text>
              <Text color={"gray.500"} fontSize={["xs","sm"]}>Somos uma empresa pequena, porém que presa pelo suporte a nossos usuarios.</Text>
            </Box>
            <Box mr={6}>
              <Text fontWeight={"bold"} color={"primary.200"} fontSize={"lg"}>Feedback</Text>
              <Text color={"gray.500"} fontSize={["xs","sm"]}>Sujestão de melhoria? nova funcionalidade?, estamos com nosso canal aberto para te ouvir.</Text>
            </Box>
            <Box>
              <Text fontWeight={"bold"} color={"primary.200"} fontSize={"lg"}>Mídias</Text>
              <Text color={"gray.500"} fontSize={["xs","sm"]}>Siga-nos no instagram, e tenha conteúdo relacionado ao mundo pet e a nossa ferramenta.</Text>
            </Box>
          </Box>
      </Box>

        <Box
          width={["100%", "50%"]} // 100% de largura em telas pequenas
          display="flex"
          justifyContent={["center", "center"]}
        >
          <Box
            width={["90%", "75%"]} // Ajuste da largura do formulário para telas pequenas
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={6}
            height={["auto", "60vh"]}
            bgColor="white"
            color="primary.200"
            borderRadius="20"
            boxShadow="md"
            mb={[8, "12"]}
          >
            <Text fontSize={["xl", "2xl"]} mb="6" fontWeight={"bold"}>Preencha seus dados</Text>
            <Box width={"100%"} gap={2} display={"flex"} flexDirection={["column", "row"]}>
              <FormControl id="name" mb={4}>
                <FormLabel>Nome</FormLabel>
                <Input
                  focusBorderColor="primary.400"
                  type="text"
                  placeholder="Matheus Rocha"
                  borderWidth="1px"
                  borderColor="gray.200"
                />
              </FormControl>

              <FormControl id="email" mb={4} >
                <FormLabel>E-mail</FormLabel>
                <Input
                  focusBorderColor="primary.400"
                  type="email"
                  placeholder="email@exemplo.com"
                  borderWidth="1px"
                  borderColor="gray.200"
                />
              </FormControl>
            </Box>
            <Box width={"100%"}> 
              <FormControl id="phone" mb={4}>
                <FormLabel>Telefone</FormLabel>
                <Input
                  focusBorderColor="primary.400"
                  type="number"
                  placeholder="34988121234"
                  borderWidth="1px"
                  borderColor="gray.200"
                />
              </FormControl>

              <FormControl id="userType" mb={6}>
                <FormLabel>Tipo de Usuário</FormLabel>
                <Select
                  focusBorderColor="primary.400"
                  placeholder="Selecione uma opção"
                  borderWidth="1px"
                  borderColor="gray.200"
                >
                  <option color="primary.300" value="petshop">Petshop</option>
                  <option color="primary.300" value="clinica">Clinica</option>
                  <option color="primary.300" value="hospital">Hospital</option>
                  <option value="hotel">Hotel/Creche</option>
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
