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
  Link,
  Switch
} from "@chakra-ui/react";
import { FaUser, FaChartBar,FaDollarSign } from 'react-icons/fa';
import {
  SearchIcon,
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
  ChatIcon,
  CalendarIcon
} from "@chakra-ui/icons";
import { format } from 'date-fns';
import Sidebar from "../components/Sidebar";
import Header from "../components/headers";
import { useState, useEffect } from "react";
import axios from "../../../utils/axiosConfig";
import { ModalAgenda } from "./components/ModalAgenda"

interface PetOutput {
  age: string;
  idpet: string;
  datebor: string;
  petname: string;
  weight: number;
  race: string;
  species: string;
  sex: string;
  castrated: boolean;
}

export interface OutPutClientDTO {
  name: string;
  email: string;
  dateadd: string;
  dateborn: string;
  pets: PetOutput[];
}


const clients = ()=>{
  const [clients, setClients] = useState<OutPutClientDTO[]>([]);
  const [filteredclients, setfilteredclients] = useState<OutPutClientDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [toggleState, setToggleState] = useState<"Pessoal" | "rede">("Pessoal");
  const [toggleStateapi, setToggleStateapi] = useState<"User" | "NetWork">("User");
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
const [selectedClient, setSelectedClient] = useState<OutPutClientDTO>();

const openModal = (client: OutPutClientDTO) => {
  setSelectedClient(client); // Armazena o cliente selecionado
};

useEffect(() => {
  if (selectedClient) {
    setIsOpen(true); // Abre o modal quando selectedClient é atualizado
  }
  console.log(selectedClient)
}, [selectedClient]);
  useEffect(()=>{
    fetchClients()
  },[])
  
  const fetchClients = async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('Authorization');
      console.log(token)
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
    try {
      const response = await axios.get('/PortfolioClient'); // Substitua pela URL da sua API
      if (response.data.status === 'confirmed') {
        const formattedClient = response.data.data.map((client: any) => ({
          name: client.name,
          email: client.email,
          dateadd: client.dateadd,
          dateborn: client.dateborn,
          pets : client.pets.map((pet:any)=>({
            age: pet.age,
            idpet: pet.idpet,
            datebor: pet.datebor,
            petname: pet.petname,
            weight: pet.weight,
            race: pet.race,
            species: pet.species,
            sex: pet.sex,
            castrated: pet.castrated
          }))
        }));
        setClients(formattedClient);
        setfilteredclients(formattedClient);
      }
    } catch (error) {
      toast({
        title: "Erro ao buscar Clientes",
        description: "Ocorreu um erro ao tentar buscar os clientes. Tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handlePageChange = (direction: "next" | "prev") => {
    if (
      direction === "next" &&
      currentPage * itemsPerPage < filteredclients.length
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleToggleChange = () => {
    const newToggleState = toggleState === "Pessoal" ? "rede" : "Pessoal";
    const newToggleStateapi = toggleStateapi === "User" ? "NetWork" : "User";
    setToggleState(newToggleState);
    setToggleStateapi(newToggleStateapi);
  };

  const paginatedClient = filteredclients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
return (
    <>
    <Header/>
    <Flex direction="column" minHeight="calc(100vh - 40px)" backgroundColor={"primary.100"}>
    <Sidebar />
    <Box
        marginLeft="250px"
        py="2"
        width="calc(100% - 250px)"
        flex="1"
        borderRadius="md"
        position="relative"
      >
         <Flex justify="space-between" align="center" mb="2"  borderBottomColor={"gray.200"} borderBottomWidth={"1px"} pb={"1"} px = "4">
          <Heading as="h1" size="sm" color={"primary.200"} display={"flex"} flexDirection={"row"}><Text color="gray.500">Settings 
      <ChevronRightIcon /> 
          
        </Text> Clientes</Heading>
          <Button
            leftIcon={<AddIcon />}
            position="absolute"
            bottom="4"
            left="4"
            backgroundColor={"primary.500"}
            color="primary.300"
            _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
            zIndex="1000"
            size={"sm"}
          >
            Adicionar
          </Button>
          <Button
              backgroundColor="white"
              borderRadius="md"
              size="sm"
              py="2"
              mt="1"
              boxShadow="md"
              ml="4"
              _hover={{ backgroundColor: "white" }}
            >
              <Box ml="0">
                <Switch
                  colorScheme="purple"
                  isChecked={toggleState === "rede"}
                  onChange={handleToggleChange}
                  size="sm"
                  tabIndex={-1}
                  _focus={{ outline: "none", boxShadow: "none" }}
                  _active={{ outline: "none", boxShadow: "none" }}
                  onMouseDown={(e) => e.preventDefault()}
                />
              </Box>
              <Text ml="2" color="primary.250" fontWeight="bold" fontSize="sm">
                {toggleState === "Pessoal" ? "Pessoal" : "Rede"}
              </Text>
            </Button>
          <Box ml="auto">
            <Input
              placeholder="Pesquisar por nome"
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

        <Box overflowX="auto" mb="14" borderRadius={"8px"} backgroundColor={"white"} boxShadow={"md"} mx="4">
          <Table variant="simple">
            <Thead backgroundColor={"primary.200"} color={"primary.100"}>
              <Tr >
                <Th color={"primary.100"}>Nome</Th>
                <Th  color={"primary.100"}>Email</Th>
                <Th color={"primary.100"}>Data de Nascimento</Th>
                <Th  color={"primary.100"}>Data de Registro</Th>
                <Th  color={"primary.100"}>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedClient.map((client, index) => (
                <Tr key={index} paddingY={"3"}>
                  <Td paddingY={"2.5"}>{client.name}</Td>
                  <Td paddingY={"2.5"}>{client.email}</Td>
                  <Td paddingY={"2.5"}>{format(new Date(client.dateborn), 'yyyy-MM-dd')}</Td>
                  <Td paddingY={"2.5"}>{format(new Date(client.dateadd), 'yyyy-MM-dd')}</Td>
                  <Td paddingY={"3.5"}>
                  <Flex>
                     <IconButton
                      mx="1"
                        aria-label="Excluir Serviço"
                        icon={<FaUser />}
                        size="xs"
                        color={"primary.200"}
                        backgroundColor={"white"}
                        boxShadow={"md"}
                        _hover={{ backgroundColor: "primary.200", color: "primary.100" }}
                      />
                     <IconButton
                      mx="1"
                        aria-label="Agendar atendimento"
                        icon={<CalendarIcon />}
                        size="xs"
                        color={"primary.1100"}
                        backgroundColor={"white"}
                        boxShadow={"md"}
                        _hover={{ backgroundColor: "primary.1100", color: "primary.100" }}
                        onClick={() => openModal(client)}
                      />
                      <IconButton
                      mx="1"
                        aria-label="Excluir Serviço"
                        icon={<ChatIcon />}
                        size="xs"
                        color={"primary.300"}
                        backgroundColor={"white"}
                        boxShadow={"md"}
                        _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
                      />
                     <Link >
                      <IconButton
                        aria-label="Excluir Serviço"
                        icon={<FaDollarSign />}
                        size="xs"
                        color={"primary.800"}
                        backgroundColor={"white"}
                        boxShadow={"md"}
                        _hover={{ backgroundColor: "primary.800", color: "primary.100" }}
                        mx="1"
                      />
                      </Link>
                      <IconButton
                      mx="1"
                        aria-label="Excluir Serviço"
                        icon={<DeleteIcon />}
                        size="xs"
                        color={"primary.600"}
                        backgroundColor={"white"}
                        boxShadow={"md"}
                        _hover={{ backgroundColor: "primary.600", color: "primary.100" }}
                      />
                     
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
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
            isDisabled={currentPage * itemsPerPage >= filteredclients.length}
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
    <ModalAgenda 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
      toggleStateapi={toggleStateapi} 
      user={selectedClient!} 
    />
    </>
)
}

export default clients;