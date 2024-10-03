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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Link,
  Switch,
  Button as ModalButton,
  Divider
} from "@chakra-ui/react";
import {
  SearchIcon,
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from "@chakra-ui/icons";
import Sidebar from "../components/Sidebar";
import Header from '../components/headers';
import { useState, useEffect } from "react";
import axios from "../../../utils/axiosConfig"; // Importando a configuração do axios

// Interface para definir a estrutura dos serviços
interface Subcategory {
  title: string;
  price: number;
  idsubcategory: string;
  idservice: string;
}
interface VaccineDbDTO {
  nameofvaccine?: string;
  codevaccine?: string;
  idservice?: string;
  price?: number;
  idvaccine?: string;
}

interface Service {
  idDoServiço: string;
  nomeDoServiço: string;
  titulo: string;
  descrição: string;
  preço: number;
  vacinas: VaccineDbDTO[];
  subcategorias: Subcategory[];
  atendimento: string[]
}

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [toggleState, setToggleState] = useState<"Pessoal" | "rede">("Pessoal");
  const [toggleStateapi, setToggleStateapi] = useState<"User" | "NetWork">("User");
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook para controlar o modal de remoção
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const toast = useToast();

  useEffect(() => {
    fetchServices();
  }, [toggleStateapi]);
  const fetchServices = async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('Authorization');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
    try {
      const response = await axios.get(`/Service/${toggleStateapi}`); // Substitua pela URL da sua API
      if (response.data.status === 'confirmed') {
        const formattedServices = response.data.data.map((service: any) => ({
          idDoServiço: service.idDoServiço,
          nomeDoServiço: service.nomeDoServiço,
          titulo: service.titulo,
          descrição: service.descrição,
          preço: service.preço,
          vacinas: service.vacinas,
          subcategorias: service.subcategorias
        }));
        setServices(formattedServices);
        setFilteredServices(formattedServices);
      }
      console.log(response.data.data)
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      toast({
        title: "Erro ao buscar serviços",
        description: "Ocorreu um erro ao tentar buscar os serviços. Tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
  setSearchTerm(query);

  const filtered = services.filter((service) => {
    return (
      service.titulo.toLowerCase().includes(query) || // Busca no título do serviço
      service.descrição.toLowerCase().includes(query) || // Busca na descrição do serviço
      service.preço.toString().toLowerCase().includes(query) || // Busca no preço do serviço
      service.vacinas.some((vaccine) =>
        vaccine.nameofvaccine?.toLowerCase().includes(query) || // Busca no nome da vacina
        vaccine.codevaccine?.toLowerCase().includes(query) // Busca no código da vacina
      ) ||
      service.subcategorias.some((subcategory) =>
        subcategory.title.toLowerCase().includes(query) // Busca no título da subcategoria
      )
    );
  });

  setFilteredServices(query ? filtered : services); 
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && (currentPage * itemsPerPage) < filteredServices.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRemoveClick = (id: string) => {
    setSelectedService(id);
    onOpen();
  };

  const handleRemoveSuccess = (id: string) => {
    setServices(services.filter(service => service.idDoServiço !== id));
    setFilteredServices(filteredServices.filter(service => service.idDoServiço !== id));
    toast({
      title: "Serviço removido",
      description: "O serviço foi removido com sucesso.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  const handleToggleChange = () => {
    const newToggleState = toggleState === "Pessoal" ? "rede" : "Pessoal";
    const newToggleStateapi = toggleStateapi === "User" ? "NetWork" : "User";
    setToggleState(newToggleState);
    setToggleStateapi(newToggleStateapi);
  };
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const sortServicesByPrice = () => {
    const sortedServices = [...filteredServices].sort((a, b) => {
      return sortOrder === 'asc' ? a.preço - b.preço : b.preço - a.preço;
    });
    setFilteredServices(sortedServices);
    // Toggle sort order for next click
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
    <Header/>
    <Flex direction="column" minHeight="calc(100vh - 40px)" backgroundColor={"primary.100"} >
      <Sidebar />
      <Box
        marginLeft="250px"
        py="2"
        width="calc(100% - 250px)"
        flex="1"
        borderRadius="md"
        position="relative"
        fontFamily="Nunito, sans-serif"
      >
        {/* Cabeçalho com Campo de Pesquisa */}
        <Flex justify="space-between" align="center" mb="2"  borderBottomColor={"gray.200"} borderBottomWidth={"1px"} pb={"1"} px = "4" fontFamily="Nunito, sans-serif">
          <Heading as="h1" size="sm" color={"primary.200"} display={"flex"} flexDirection={"row"} fontFamily="Nunito, sans-serif"><Text color="gray.500" fontFamily="Nunito, sans-serif">Settings 
      <ChevronRightIcon /> 
          
        </Text > Serviços</Heading>
        <Button
  backgroundColor={"white"}
  borderRadius={"md"}
  size="sm"
  p={"2"}
  boxShadow={"md"}
  ml={"4"}
  _hover={{ backgroundColor: "white" }}
  _focus={{ outline: "none" }} // Remove o estilo de foco do botão
>
  <Box ml="1">
    <Switch
      colorScheme="purple"
      isChecked={toggleState === "rede"}
      onChange={handleToggleChange}
      size="sm"
      tabIndex={-1}
      _focus={{ outline: "none", boxShadow: "none" }} // Remove a borda de foco
      _active={{ outline: "none", boxShadow: "none" }} // Remove o estilo de foco do Switch
      onMouseDown={(e) => e.preventDefault()}
    />
  </Box>
  <Text
    ml="2"
    color="primary.200"
    fontWeight={"semi-bold"}
    fontFamily="Nunito, sans-serif"
    size={"sm"}
  >
    {toggleState === "Pessoal" ? "Pessoal" : "Rede"}
  </Text>
</Button>


          <Button
            leftIcon={<AddIcon />}
            position="absolute"
            bottom="4"
            left="4"
            backgroundColor={"primary.500"}
            color="primary.300"
            as="a"
            href="/Home/services/add"
            _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
            zIndex="1000"
            size={"sm"}
          >
            Adicionar
          </Button>
          <Box ml="auto">
            <Input
              placeholder="Pesquisar por palavra chave"
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
        {/* Tabela de Serviços */}
        <Box overflowX="auto" mb="14" borderRadius={"8px"} backgroundColor={"white"} boxShadow={"md"} mx = "4" fontFamily="Nunito, sans-serif">
          <Table variant="simple" fontFamily="Nunito, sans-serif">
            <Thead backgroundColor={"primary.200"} color={"primary.100"}>
              <Tr>
              <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Categoria</Th>
                <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Título</Th>
                <Th color={"primary.100"} fontFamily="Nunito, sans-serif" onClick={sortServicesByPrice} style={{ cursor: 'pointer' }}>
                  Preço {sortOrder === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </Th>
                <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Descrição</Th>
                <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Subcategorias</Th>
                <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Vacinas</Th>
                <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedServices.map((service) => (
                <Tr key={service.idDoServiço} paddingY={"2"}>
                  <Td paddingY={"2"}>{service.nomeDoServiço}</Td>
                  <Td paddingY={"2"}>{service.titulo}</Td>
                  <Td paddingY={"2"}>
                    <Text textAlign={"center"} minWidth={"70px"} 
                    backgroundColor={service.preço === 0 ? "#FF407D" : "green.100"} 
                     p={"1"} 
                     borderRadius={"5px"} 
                     color={service.preço === 0 ? "#FFEFEF" : "#2EB086"}>
                      {service.preço === 0 ? "Variado" : `${service.preço} R$`}
                      </Text>
                  </Td>
                  <Td paddingY={"2"}>{service.descrição}</Td>
                  <Td paddingY={"2"} textAlign="center">{service.subcategorias.length} subcategoria{service.subcategorias.length > 1 ? 's' : ''}</Td>
                  <Td paddingY={"2"}>{service.vacinas.length} vacina{service.vacinas.length > 1 ? 's' : ''}</Td>
                  <Td paddingY={"2.5"}>
                  <Flex>
                      <Link href={`/Home/services/${service.idDoServiço}`}>
                        <IconButton
                          aria-label="Editar Serviço"
                          icon={<EditIcon />}
                          size="sm"
                          color="gray.600"
                          backgroundColor="primary.100"
                          _hover={{ backgroundColor: "gray.100" }}
                          mr="2"
                        />
                      </Link>
                      <IconButton
                        aria-label="Excluir Serviço"
                        icon={<DeleteIcon />}
                        size="sm"
                        color={"primary.600"}
                        backgroundColor={"primary.650"}
                        _hover={{ backgroundColor: "primary.600", color: "primary.100" }}
                        onClick={() => handleRemoveClick(service.idDoServiço)}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Controle de Paginação */}
        <Flex justify="center" align="center" background="transparent" borderTopWidth="0px" borderColor="gray.200" p="4" position="fixed" bottom="0" width="calc(100% - 250px)">
          <IconButton
            aria-label="Previous Page"
            icon={<ChevronLeftIcon />}
            onClick={() => handlePageChange('prev')}
            isDisabled={currentPage === 1}
            mr="2"
          />
          <Text>
            Página {currentPage} de {Math.ceil(filteredServices.length / itemsPerPage)}
          </Text>
          <IconButton
            aria-label="Next Page"
            icon={<ChevronRightIcon />}
            onClick={() => handlePageChange('next')}
            isDisabled={currentPage * itemsPerPage >= filteredServices.length}
            ml="2"
          />
        </Flex>
      </Box>

      {/* Modal para Remover Serviço */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Remoção</ModalHeader>
          <ModalBody>
            <Text>Deseja remover o serviço com ID {selectedService}?</Text>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <ModalButton
              colorScheme="red"
              backgroundColor={"primary.600"}
              color={"primary.100"}
              _hover={{ backgroundColor: "primary.600" }}
              onClick={() => {
                if (selectedService) {
                  // Lógica para remover o serviço da API
                  axios.delete(`/Services/${selectedService}`)
                    .then(() => handleRemoveSuccess(selectedService))
                    .catch(error => {
                      console.error('Erro ao remover serviço:', error);
                      toast({
                        title: "Erro ao remover serviço",
                        description: "Ocorreu um erro ao tentar remover o serviço. Tente novamente mais tarde.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      });
                    });
                }
                onClose();
              }}
            >
              Remover
            </ModalButton>
            <Button variant="ghost" onClick={onClose} ml={3}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
    </>
  );
};

export default Services;
