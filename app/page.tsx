"use client";
import { Box, Button, Flex, Heading, Text, Link, HStack, Image, VStack, Input, FormControl, FormLabel, Select,Circle } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import {
  ArrowBackIcon, BellIcon, CalendarIcon, EditIcon, SettingsIcon, ExternalLinkIcon, ChatIcon,
  ChevronLeftIcon, ChevronRightIcon, AttachmentIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon, AtSignIcon, Icon
} from '@chakra-ui/icons';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { motion, useAnimation,useInView } from 'framer-motion';
import { useEffect, useState,useRef } from "react";

const MotionDiv = motion.div;

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
        <Heading size="lg" flexDirection={"row"} display={"flex"} alignItems={"center"} ml={"-4"}>
          <Image src='mylogo.png' width={"70px"} />
          <Link ml="-4" href="/" _hover={{ textDecoration: "none" }}>
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
            <MotionDiv
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "24px", gap: "24px", height: "70vh" }}
            >
              <Text fontSize={"4xl"} fontWeight={"bold"}>Gerencie seus clientes <br /> agenda e recursos empresariais</Text>
              <Text fontSize={"lg"}>Tenha o total controle do que acontece no seu negocio <br /> otimize seu tempo e recursos financeiros</Text>
              <Link href="#recursos">
                <Button
                  width="33%"
                  bgColor="primary.300"
                  size="md"
                  color="primary.100"
                  borderRadius="50px"
                  _hover={{
                    bgGradient: "linear(to-r, primary.300, primary.500)",
                    color: "primary.100"
                  }}
                  transition=" background-color 2s ease"
                >
                  Conheça nossa solução
                </Button></Link>


            </MotionDiv>
            <MotionDiv
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Image src="/home.png" width={"80%"} />
            </MotionDiv>
          </Box>
          <MotionDiv
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              width: "60%"
            }}>
            <Box
              p="6"
              width="100%"
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
                  <Image src='/baixados.jpeg' width={"40px"} />
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize={"lg"}>Clinica</Text>
                  <Text fontSize="sm" color="gray.600">
                    Gerencie sua rede <br /> e funcionarios
                  </Text>
                </Box>
              </Box>

              <Box display="flex" flexDirection="row" alignItems="start">
                <Box mr={2}>
                  <Image src='/secador.jpeg' width={"40px"} />
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
                  <Image src='/estetoscopio.jpeg' width={"70px"} />
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
                  <Image src='/hotelpet.jpeg' width={"40px"} />
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize={"lg"}>Hoteis</Text>
                  <Text fontSize="sm" color="gray.600">
                    Realize check-in e<br />check-ou  dos pets
                  </Text>
                </Box>
              </Box>
            </Box>
          </MotionDiv>


        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" pt={"120px"} bgColor={"primary.500"} id='recursos'>
        <Box height="100vh" display="flex" px={"6"} >
          {/* Left side: Images */}
          <Box width="50%" display="flex" flexDirection="column" alignItems="center" >
            <Image
              src="/agenda1.png" width={"75%"} borderRadius={"md"}
            />
            <Image
              src="/agenda3.png" width={"75%"} borderRadius={"md"} mr={"-160px"} mt={"-160px"}
            />
            <Image
              src="/agenda2.png" width={"75%"} borderRadius={"md"} mt={"-80px"} mr={"-320px"}
            />
          </Box>

          {/* Right side: Platform Resources */}
          <Box width="50%" display="flex" alignItems="center" justifyContent="start" flexDirection={"column"}>
            <Text fontWeight={"bold"} fontSize={"2xl"} mb={"4"}>Agenda</Text>
            <VStack spacing={4} align="start">
              <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Status</Text>
              <Text color={"gray.500"}>Acompanhe o status dos seus atendimentos</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Prioridade</Text>
              <Text color={"gray.500"}>Controle de agenda por prioridade</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Atribuir atendimentos</Text>
              <Text color={"gray.500"}>Atribua atendimentos a seus colaboradores</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Rede e pessoal</Text>
              <Text color={"gray.500"}>Para veterinarios, gestão de agenda pessoal e da rede que atua</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Agendamento</Text>
              <Text color={"gray.500"}>Angende manualmente para tutores não registrados no app</Text>

            </VStack>
          </Box>
        </Box>
        <Box height="100vh" display="flex" px={"6"} bgColor={"primary.100"} pt={"120px"}>
          <Box width="50%" display="flex" alignItems="center" justifyContent="start" flexDirection={"column"}>
            <Text fontWeight={"bold"} fontSize={"2xl"} mb={"4"}>Solicitações</Text>
            <VStack spacing={4} align="start">
              <Text fontSize="xl" fontWeight="bold" color={"primary.200"}><CheckIcon color={"primary.300"} mr={"2"} />Status</Text>
              <Text color={"gray.500"}>Aceite ou rejeite as solicitações gerada pelos tutores</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.200"}><CheckIcon color={"primary.300"} mr={"2"} />Prioridade</Text>
              <Text color={"gray.500"}>Organiza-se por prioriedade das solicitações</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.200"}><CheckIcon color={"primary.300"} mr={"2"} />Atribuir atendimentos</Text>
              <Text color={"gray.500"}>Atribua atendimentos a seus colaboradores</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.200"}><CheckIcon color={"primary.300"} mr={"2"} />Rede e pessoal</Text>
              <Text color={"gray.500"}>Para veterinarios, vizualize solicitações de rede e pessoal</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.200"}><CheckIcon color={"primary.300"} mr={"2"} />Receita</Text>
              <Text color={"gray.500"}>Tenha uma estimativa de receita gerada pelas solicitações</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.200"}><CheckIcon color={"primary.300"} mr={"2"} />Clientes</Text>
              <Text color={"gray.500"}>Ao solicitar um serviço o tutor já é adicionado a sua carteira de clientes</Text>
            </VStack>
          </Box>
          <Box width="50%" display="flex" flexDirection="column" alignItems="center" >
            <Image
              src="/solicitations1.png" width={"75%"} borderRadius={"md"} boxShadow={"md"}
            />
            <Image
              src="/solicitations2.png" width={"75%"} borderRadius={"md"} mt={"6"} boxShadow={"md"}
            />
          </Box>
        </Box>
        <Box height="100vh" display="flex" px={"6"} pt={"120px"}>
          {/* Left side: Images */}
          <Box width="50%" display="flex" flexDirection="column" alignItems="center" >
            <Image
              src="/anamnese2.png" width={"70%"} borderRadius={"md"} boxShadow={"md"}
            />
            <Image
              src="/medialeadingpage.png" width={"70%"} borderRadius={"md"} mr={"-160px"} mt={"-160px"} boxShadow={"md"}
            />
            <Image
              src="/anamnese1.png" width={"70%"} borderRadius={"md"} mt={"-80px"} mr={"-320px"} boxShadow={"md"}
            />
          </Box>

          {/* Right side: Platform Resources */}
          <Box width="50%" display="flex" alignItems="center" justifyContent="start" flexDirection={"column"}>
            <Text fontWeight={"bold"} fontSize={"2xl"} mb={"4"}>Atendimento</Text>
            <VStack spacing={4} align="start">
              <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Atender</Text>
              <Text color={"gray.500"}>Inicie ou cancele os atendimentos confirmados</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Anamnese</Text>
              <Text color={"gray.500"}>Crie formularios de anamnese dinamico e <br /> preencha-os dentro dos atendimentos</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Gerar Prescrição</Text>
              <Text color={"gray.500"}>Crie prescrições para seus pacientes e envie via Whatsapp e E-mail</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Protocolos</Text>
              <Text color={"gray.500"}>Realize e envie de forma automatica protocolos aos tutores</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Retorno</Text>
              <Text color={"gray.500"}>Agende o retorno dentro do proprio atendimento</Text>
              <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Pagamento</Text>
              <Text color={"gray.500"}>Gere link de pagamento que suporte varios metodos para os tutores</Text>
            </VStack>
          </Box>
        </Box>
      </Box>
      <Box height="100vh" display="flex" px={"6"} bgColor={"primary.100"} pt={"120px"}>
        <Box width="50%" display="flex" alignItems="center" justifyContent="start" flexDirection={"column"}>
          <Text fontWeight={"bold"} fontSize={"2xl"} mb={"4"}>Rede</Text>
          <VStack spacing={4} align="start">
            <Text fontSize="xl" fontWeight="bold" color={"primary.200"}><CheckIcon color={"primary.300"} mr={"2"} />Estabelecimentos</Text>
            <Text color={"gray.500"}>Convite veterinarios a integrar a sua rede</Text>
            <Text fontSize="xl" fontWeight="bold" color={"primary.200"}><CheckIcon color={"primary.300"} mr={"2"} />Remover</Text>
            <Text color={"gray.500"}>Remova colaboradores da sua rede</Text>
            <Text fontSize="xl" fontWeight="bold" color={"primary.200"}><CheckIcon color={"primary.300"} mr={"2"} />Veterinarios</Text>
            <Text color={"gray.500"}>Receba convites de petshops, clinicas e hoteis para integrar a rede</Text>
            <Text fontSize="xl" fontWeight="bold" color={"primary.200"}><CheckIcon color={"primary.300"} mr={"2"} />Rede e pessoal</Text>
            <Text color={"gray.500"}>Vizualize e interaja com informações de rede e pessoal em <br /> agenda, solicitações, anamnese, prontuario, clientes e outros</Text>
          </VStack>
        </Box>
        <Box width="50%" display="flex" flexDirection="column" alignItems="center" >
          <Image
            src="/colaborador.jpeg" width={"200px"} borderRadius={"md"} mt={"0"} zIndex={"2"} mr={"75%"} boxShadow={"md"}
          />
          <Image
            src="/colaborator2.png" width={"75%"} borderRadius={"md"} boxShadow={"md"} mt={"-50px"}
          />
        </Box>
      </Box>
      <Box height="100vh" display="flex" px={"6"} pt={"120px"} bgColor={"primary.500"}>
        {/* Left side: Images */}
        <Box width="50%" display="flex" flexDirection="column" alignItems="center" >
          <Image
            src="/services2.png" width={"70%"} borderRadius={"md"} boxShadow={"md"}
          />
          <Image
            src="/service1.png" width={"70%"} borderRadius={"md"} mt="6" boxShadow={"md"}
          />
        </Box>

        {/* Right side: Platform Resources */}
        <Box width="50%" display="flex" alignItems="center" justifyContent="start" flexDirection={"column"}>
          <Text fontWeight={"bold"} fontSize={"2xl"} mb={"4"}>Serviços</Text>
          <VStack spacing={4} align="start">
            <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Categorias</Text>
            <Text color={"gray.500"}>Crie um catalogo de serviços prestados, escolha uma categoria <br /> e siga as regras da mesma</Text>
            <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Subcategorias</Text>
            <Text color={"gray.500"}>Caso desejar, crie subcategorias para seus serviços <br />tutores podem escolher 1 ou mais subcategorias na solicitação</Text>
            <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Vacinas</Text>
            <Text color={"gray.500"}>Crie serviços de vacinação <br /> dê um titulo para esse serviço e escolha as vacinas aplicadas</Text>
            <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Anti parasitario</Text>
            <Text color={"gray.500"}>Crie serviços de anti-parasitarios, semelhante a vacinação</Text>
            <Text fontSize="xl" fontWeight="bold" color={"primary.300"}><CheckIcon color={"primary.300"} mr={"2"} />Modelo</Text>
            <Text color={"gray.500"}>Escolha Online, Domiciliar ou Presencial para seus serviços criados</Text>
          </VStack>
        </Box>
      </Box>
      <Box height="100vh" display="flex" px={"6"} pt={"120px"} bgColor={"primary.100"} backgroundImage={"/proposito.jpeg"}
        backgroundRepeat="no-repeat"
        backgroundSize="cover" // Faz com que a imagem cubra toda a área da Box
        backgroundPosition="center" >
        {/* Left side: Images */}
        <Box width="100%" display="flex" alignItems="center" justifyContent="start" flexDirection={"column"}>
        
          <Text fontWeight="bold" fontSize="4xl" mb="6">
            Propósito
          </Text>

          <Text borderWidth={"2px"} borderColor={"primary.300"} textAlign={"center"} width={"40%"} bgColor={"white"} boxShadow={"md"} color={"primary.250"} p="6" borderRadius={"md"} fontWeight={"bold"} fontSize={"md"} mb={"4"}>Nosso objeto é bem simples <br /> conectar tutores a Estabelecimentos e profissionais autonomos <br />
            fornecer segurança, praticidade e ótima gestão <br /> tanto do negocio quanto da vida do seu pet</Text>
          <Text borderWidth={"2px"} borderColor={"primary.300"} textAlign={"center"} width={"40%"} bgColor={"white"} boxShadow={"md"} color={"primary.250"} p="6" borderRadius={"md"} fontWeight={"bold"} fontSize={"md"} mb={"4"}>Entregar mais do que um ERP do nicho pet <br /> queremos ser uma ferramenta de automação de rotina, <br />
            fornecer um ambiente para teleatendimentos,<br /> gerar pagamentos e prescrições online</Text>
            <Box mt={"6"} display={"flex"} flexDirection={"row"} textAlign={"center"} alignItems={"center"}>
            <Text  fontSize={"sm"} color="gray.500" >
              Conectar,cuidar e atender é oque nos faz 
              </Text>
            <Text ml={"1"} fontSize="sm" fontWeight="bold">
              <span style={{ color: '#7839EE' }}>PET</span>pro
            </Text>
            </Box>
           
        </Box>
      </Box>
      <Box height="100vh" display="flex" px={"6"} pt={"120px"} bgColor={"primary.100"}>
      <Box width="50%" display="flex" alignItems="center" justifyContent="start" flexDirection={"column"}>
          <Text fontWeight={"bold"} fontSize={"2xl"} mb={"4"}>Ao enviar</Text>
          <VStack spacing={4} align="start">
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Circle size="12px" bgColor="primary.300" mr="2" />
            <Text fontSize="xl" fontWeight="bold" color={"primary.300"} textAlign={"center"}>Contato</Text>
            </Box>
            <Text color={"gray.500"}>1 - Iremos salvar seus dados em nossa base <br />e em breve entraremos em contato via Whatsapp e E-mail</Text>
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Circle size="12px" bgColor="primary.300" mr="2" />
            <Text fontSize="xl" fontWeight="bold" color={"primary.300"} textAlign={"center"}>Validação</Text>
            </Box>
            <Text color={"gray.500"}>2 - No nosso primeiro contato iremos apenas nos conhecer<br />após isso iremos validar algumas questões, solicitar mais dados <br/> e retornaremos via E-mail</Text>
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Circle size="12px" bgColor="primary.300" mr="2" />
            <Text fontSize="xl" fontWeight="bold" color={"primary.300"} textAlign={"center"}>Acesso</Text>
            </Box>
            <Text color={"gray.500"}>3 - Atendido os critérios, iremos liberar um acesso da plataforma valido por 30 dias<br />você podera alterar sua senha e fazer uso normal da ferramenta</Text>
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Circle size="12px" bgColor="primary.300" mr="2" />
            <Text fontSize="xl" fontWeight="bold" color={"primary.300"} textAlign={"center"}>Conclusao</Text>
            </Box>
            <Text color={"gray.500"}>4 - Após esse período de teste o usuario pode ou não assinar nossa ferramenta</Text>
          </VStack>
        </Box>
        <Box width="50%" display="flex" justifyContent={"center"}>
          <Box width="75%" display="flex" height={"75vh"} flexDirection="column" alignItems="center" p={6} bgColor={"primary.200"} color="primary.100" borderRadius="md" boxShadow="lg">
            <Text fontSize={"2xl"} mb="6">Preencha seus dados</Text>
          <FormControl id="name" mb={4}>
            <FormLabel>Nome</FormLabel>
            <Input  focusBorderColor="primary.400" type="text" placeholder="Digite seu nome" borderWidth={"1px"} borderColor={"primary.250"}/>
          </FormControl>

          <FormControl id="email" mb={4}>
            <FormLabel>E-mail</FormLabel>
            <Input  focusBorderColor="primary.400" type="email" placeholder="Digite seu e-mail" borderWidth={"1px"} borderColor={"primary.250"}/>
          </FormControl>

          <FormControl id="phone" mb={4}>
            <FormLabel>Telefone</FormLabel>
            <Input  focusBorderColor="primary.400" type="tel" placeholder="Digite seu telefone" borderWidth={"1px"} borderColor={"primary.250"}/>
          </FormControl>

          <FormControl id="userType" mb={6} >
            <FormLabel>Tipo de Usuário</FormLabel>
            <Select  focusBorderColor="primary.400" placeholder="Selecione uma opção" borderWidth={"1px"} borderColor={"primary.250"}>
              <option color='primary.300' value="petshop">Petshop/Clínica</option>
              <option value="hotel">Hotel</option>
              <option value="veterinario">Veterinário</option>
            </Select>
          </FormControl>

          <Button bgColor={"primary.300"} color="primary.100" width="100%" _hover={{backgroundColor:"primary.400"}}>
            Enviar
          </Button>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" pt="60px" bgColor="primary.250" color="white">
        <Box display="flex" width="80%" justifyContent="space-between" pb="5vh">

          {/* Coluna Redes Sociais */}
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="lg">Redes Sociais</Text>
            <Box display="flex" gap={4}>
              <Link href="https://facebook.com" isExternal>
                <Icon as={FaFacebook} boxSize="6" />
              </Link>
              <Link href="https://instagram.com" isExternal>
                <Icon as={FaInstagram} boxSize="6" />
              </Link>
              <Link href="https://twitter.com" isExternal >
                <Icon as={FaTwitter} boxSize="6" />
              </Link>
            </Box>
          </VStack>

          {/* Coluna Sou Tutor */}
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="lg">Sou Tutor</Text>
            <Link href="/servicos" _hover={{ textDecoration: "none", color: "primary.300" }}>Serviços</Link>
            <Link href="/medicos" _hover={{ textDecoration: "none", color: "primary.300" }}>Veterinarios</Link>
            <Link href="/hospitais" _hover={{ textDecoration: "none", color: "primary.300" }}>Estabelecimentos</Link>
            <Link href="/hospitais" _hover={{ textDecoration: "none", color: "primary.300" }}>Cadastrar</Link>
            <Link href="/hospitais" _hover={{ textDecoration: "none", color: "primary.300" }}>Baixe o App</Link>
            <Link href="/dicas" _hover={{ textDecoration: "none", color: "primary.300" }}>Dicas para seu Pet</Link>
          </VStack>

          {/* Coluna Suporte */}
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="lg">Suporte</Text>
            <Link href="/carreiras" _hover={{ textDecoration: "none", color: "primary.300" }}>Carreiras</Link>
            <Link href="/politica" _hover={{ textDecoration: "none", color: "primary.300" }}>Política de Privacidade e Termos de Serviço</Link>
            <Link href="/contato" _hover={{ textDecoration: "none", color: "primary.300" }}>Contato</Link>
            <Link href="/ajuda" _hover={{ textDecoration: "none", color: "primary.300" }}>Central de Ajuda</Link>
          </VStack>
        </Box>
      </Box>
      <Box bgColor={"primary.200"} color={"primary.100"} height={"80px"} justifyContent={"center"} alignItems={"center"} display={"flex"}>
        ©Copyright 2025. PETpro
      </Box>
    </Box>
  );
};

export default HomePage;
