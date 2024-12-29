"use client";

import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  IconButton,
  Button,
  Text,
  useDisclosure,
  useToast,
  Image,
  Link
} from "@chakra-ui/react";
import {
  SearchIcon,
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  ChevronRightIcon as ExpandIcon
} from "@chakra-ui/icons";
import Sidebar from "../components/Sidebar";
import Header from "../components/headers";
import { useState, useEffect } from "react";
import axios from "../../../utils/axiosConfig";
import InviteModal from "../components/invitemodal"; // Importando o componente de modal
import RemoveModal from "../components/removecollaborator"; // Importando o modal de remoção

// Interface para definir a estrutura dos colaboradores
interface Tutor {
  name: string;
  email: string;
  phone: string | null;
}

interface Pet {
  age: string;
  petname: string;
  weight: number;
  race: string;
  species: string;
  sex: string;
  castrated: boolean;
}

interface Payload {
  tutor: Tutor;
  pet: Pet;
  idprontuario: string;
  datecreate: string; // ISO 8601 format
  idsorder: string[];
  idsattendance: string[];
}


const Prontuarios = ({ params }: { params: { username: string } }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [prontuarios, setProntuarios] = useState<Payload[]>([]);
  const [filteredProntuario, setfilteredProntuario] = useState<Payload[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook para controlar o modal de convite
  const { isOpen: isRemoveOpen, onOpen: onRemoveOpen, onClose: onRemoveClose } = useDisclosure(); // Hook para controlar o modal de remoção
  const [selectedCollaborator, setSelectedCollaborator] = useState<string | null>(null);
  const toast = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    fetchProntuarios();
  }, []);
  const fetchProntuarios = async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('Authorization');
      console.log(token)
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
    try {
      const response = await axios.get('/Prontuario'); // Substitua pela URL da sua API
      if (response.data.status === 'confirmed') {
        setProntuarios(response.data.data);
        setfilteredProntuario(response.data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
      toast({
        title: "Erro ao buscar colaboradores",
        description: "Ocorreu um erro ao tentar buscar os colaboradores. Tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    const filtered = prontuarios.filter(prontuario =>
      prontuario.pet.petname.toLowerCase().includes(query)
      || prontuario.tutor.name.toLowerCase().includes(query)
      || prontuario.tutor.email.toLowerCase().includes(query)
    );

    setfilteredProntuario(query ? filtered : prontuarios);
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && (currentPage * itemsPerPage) < filteredProntuario.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedProntuarios = filteredProntuario.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      <Flex direction="column" minHeight="calc(100vh - 40px)" backgroundColor={"primary.100"}>
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

        <Box
          py="2"
          marginLeft={isCollapsed ? "60px" : "250px"}
          width={isCollapsed ? "calc(100% - 60px)" : "calc(100% - 250px)"}
          flex="1"
          borderRadius="md"
          position="relative"
        >
          {/* Cabeçalho com Botão de Convidar e Campo de Pesquisa */}
          <Flex justify="space-between" align="center" mb="2" borderBottomColor={"gray.200"} borderBottomWidth={"1px"} pb={"1"} px="4">
            <Heading as="h1" size="sm" color={"primary.200"} display={"flex"} flexDirection={"row"}><Text color="gray.500">Main Menu
              <ChevronRightIcon />

            </Text> Prontuarios</Heading>
            <Box ml="auto">
              <Input
                placeholder="Pesquisar pelo pet ou tutor"
                value={searchTerm}
                onChange={handleSearch}
                width="300px"
                size="sm"
                mr="4"
                focusBorderColor="primary.400"
                borderRadius={"md"}
              />
              <IconButton
                aria-label="Pesquisar"
                icon={<SearchIcon />}
                onClick={() => { }}
                size="sm"
                variant="outline"
              />
            </Box>
          </Flex>
          <Box m={4} height={"14vh"} borderWidth={"1px"} borderColor={"gray.200"} px={"4"}>
            <Box display="flex" height="100%">
              <Box flex="1" display="flex" justifyContent="center" alignItems="start" flexDirection={"column"}>
                <Flex textAlign={"center"}>
                  <Text color={"primary.100"} bgColor={"primary.300"} fontWeight={"bold"} p={"1"} px={2} fontSize={"lg"} borderRadius={"sm"}>Gerencie</Text>
                  <Text color={"primary.200"} bgColor={"primary.100"} fontWeight={"bold"} p={"1"} fontSize={"lg"} borderRadius={"sm"}>o histórico de atendimento dos seus pacientes!</Text>
                </Flex>
                <Text fontSize={"sm"} color={"gray.500"}>Selecione um prontuario e vizualise solicitações, atendimentos, agenda, prescrições,anexos,pagamentos e muitos mais</Text>
              </Box>
              <Box flex="1" display="flex" justifyContent="start" alignItems="center" color={"primary.200"}>
                <Text mr={2}>Pets : </Text>
                <Text fontWeight={"bold"}>{prontuarios.length}</Text>
              </Box>
            </Box>
          </Box>


          {/* Tabela de Colaboradores */}
          <Box overflowX="auto" mb="14" borderRadius={"8px"} backgroundColor={"white"} boxShadow={"md"} mx="4">
            <Table variant="simple">
              <Thead backgroundColor={"primary.200"} color={"primary.100"}>
                <Tr>
                  <Th color={"primary.100"}></Th>
                  <Th color={"primary.100"}>Pet</Th>
                  <Th color={"primary.100"}>Espécie</Th>
                  <Th color={"primary.100"}>Raça</Th>
                  <Th color={"primary.100"}>Sexo</Th>
                  <Th color={"primary.100"}>Tutor</Th>
                  <Th color={"primary.100"}>Email-Tutor</Th>
                  <Th color={"primary.100"}>Telefone</Th>
                  <Th color={"primary.100"}>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedProntuarios.map((prontuario, index) => (
                  <Tr key={index} paddingY={"2"}>
                    <Td>
                      <Image src="/petperfil.jpeg" alt={`Foto do pet ${prontuario.pet.petname}`} borderRadius={"17px"} width={"34px"} height={"34px"} />
                    </Td>
                    <Td>{prontuario.pet.petname}</Td>
                    <Td>{prontuario.pet.species}</Td>
                    <Td>{prontuario.pet.race}</Td>
                    <Td fontWeight={"bold"} color={prontuario.pet.sex == "Macho" ? "primary.1100" : "primary.700"}>{prontuario.pet.sex}</Td>
                    <Td>{prontuario.tutor.name}</Td>
                    <Td>{prontuario.tutor.email}</Td>
                    <Td>{prontuario.tutor.phone}</Td>
                    <Td paddingY={"2"}>
                      <Flex>
                        <Link href={`/Home/prontuarios/${prontuario.idprontuario}`}>
                          <IconButton
                            aria-label="Expandir detalhes"
                            icon={<ExpandIcon />}
                            size="sm"
                            color="blue.500"
                            backgroundColor="white"
                            _hover={{ backgroundColor: "primary.100" }}
                          />
                        </Link>

                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Controle de Paginação */}
          <Flex
            justify="center"
            align="center"
            background="transparent"
            borderTopWidth="0px"
            borderColor="gray.200"
            p="4"
            position="fixed"
            bottom="0"
            width="calc(100% - 250px)"
          >
            <IconButton
              aria-label="Previous Page"
              icon={<ChevronLeftIcon />}
              onClick={() => handlePageChange("prev")}
              isDisabled={currentPage === 1}
              fontSize={"sm"}
              size={"sm"}
              bgColor={"primary.100"}
              border={"2px"}
              borderColor={"primary.100"}
              color={"primary.300"}
              mr="2"
            />
            <Text>
              {" "}
              {currentPage}{" "}
            </Text>
            <IconButton
              aria-label="Next Page"
              icon={<ChevronRightIcon />}
              onClick={() => handlePageChange("next")}
              isDisabled={currentPage * itemsPerPage >= filteredProntuario.length}
              ml="2"
              fontSize={"sm"}
              size={"sm"}
              bgColor={"primary.100"}
              border={"2px"}
              color={"primary.300"}
              borderColor={"primary.100"}
            />
          </Flex>
        </Box>
      </Flex>
    </>

  );
};

export default Prontuarios;
