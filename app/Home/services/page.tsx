"use client";
import { useRouter } from 'next/navigation';
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
  ChevronDownIcon,
  CheckCircleIcon,
  WarningIcon,
  CheckIcon
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
  status: string;
  vacinas: VaccineDbDTO[];
  subcategorias: Subcategory[];
  atendimento: string[]
}

const statusIcons: any = {
  Postado: <CheckCircleIcon color="#2EB086" ml={"1"} />,
  Rascunho: <WarningIcon color="primary.600" ml={"1"} />,
};

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [toggleState, setToggleState] = useState<"Pessoal" | "rede">("Pessoal");
  const [toggleStateapi, setToggleStateapi] = useState<"User" | "NetWork">("User");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const toast = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [activeModal, setActiveModal] = useState<null | "first" | "second">(null);

  // Função para abrir um modal específico
  const openModal = (modalName: "first" | "second") => {
    setActiveModal(modalName);
  };

  // Fechar qualquer modal
  const closeModal = () => {
    setActiveModal(null);
  };

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
          status: service.status,
          vacinas: service.vacinas,
          subcategorias: service.subcategorias,
          atendimento: service.atendimento
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
    openModal("first");
  };

  const handlePostService = (id: string) => {
    setSelectedService(id);
    openModal("second");
  };

  const handleRemoveSuccess = (id: string) => {

    toast({
      title: "Serviço removido",
      description: "O serviço foi removido com sucesso.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    router.refresh()
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
      <Header />
      <Flex direction="column" minHeight="calc(100vh - 40px)" backgroundColor={"primary.100"} >
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <Box
          py="2"
          marginLeft={isCollapsed ? "60px" : "250px"}
          width={isCollapsed ? "calc(100% - 60px)" : "calc(100% - 250px)"}
          flex="1"
          borderRadius="md"
          position="relative"
          fontFamily="Nunito, sans-serif"
        >
          {/* Cabeçalho com Campo de Pesquisa */}
          <Flex justify="space-between" align="center" mb="2" borderBottomColor={"gray.200"} borderBottomWidth={"1px"} pb={"1"} px="4" fontFamily="Nunito, sans-serif">
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
                fontWeight={"bold"}
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
          <Box overflowX="auto" mb="14" borderRadius={"8px"} backgroundColor={"white"} boxShadow={"md"} mx="4" fontFamily="Nunito, sans-serif">
            <Table variant="simple" fontFamily="Nunito, sans-serif">
              <Thead backgroundColor={"primary.200"} color={"primary.100"}>
                <Tr>
                  <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Categoria</Th>
                  <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Título</Th>
                  <Th color={"primary.100"} fontFamily="Nunito, sans-serif" onClick={sortServicesByPrice} style={{ cursor: 'pointer' }}>
                    Preço {sortOrder === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </Th>
                  <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Subcategorias</Th>
                  <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Antiparasitario</Th>
                  <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Vacinas</Th>
                  <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Status</Th>
                  <Th color={"primary.100"} fontFamily="Nunito, sans-serif">Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedServices.map((service) => (
                  <Tr key={service.idDoServiço} paddingY={"2"}>
                    <Td paddingY={"2"}>{service.nomeDoServiço}</Td>
                    <Td paddingY={"2"}>{service.titulo}</Td>

                    <Td paddingY={"2"}>
                      <Text textAlign={"center"} minWidth={"50px"} fontWeight={"bold"} fontSize={"xs"}
                        backgroundColor={service.preço === 0 ? "primary.300" : "#D5FFE4"}
                        p={"1"}
                        borderRadius={"5px"}
                        color={service.preço === 0 ? "#FFEFEF" : "#2EB086"}>
                        {service.preço === 0 ? "Variado" : `${service.preço} R$`}
                      </Text>
                    </Td>
                    <Td paddingY={"2"} textAlign="center">{service.subcategorias.length} subcategoria{service.subcategorias.length > 1 ? 's' : ''}</Td>
                    <Td paddingY={"2"}>{service.vacinas.length} antiparasitario{service.vacinas.length > 1 ? 's' : ''}</Td>
                    <Td paddingY={"2"}>{service.vacinas.length} vacina{service.vacinas.length > 1 ? 's' : ''}</Td>
                    <Td paddingY={"2"} >
                      <Text borderWidth={"1px"} borderColor={"gray.200"} p={"1"} fontSize={"xs"} display={"flex"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} bgColor={"white"} borderRadius={"md"} boxShadow={"md"}>
                        {service.status}{statusIcons[service.status]}
                      </Text>
                    </Td>
                    <Td paddingY={"3.5"}>
                      <Flex>
                        <Link href={`/Home/services/${service.idDoServiço}`}>
                          <IconButton
                            aria-label="Editar Serviço"
                            icon={<EditIcon />}
                            size="xs"
                            boxShadow={"md"}
                            color="gray.600"
                            backgroundColor="white"
                            _hover={{ backgroundColor: "gray.100" }}
                            mr="2"
                          />
                        </Link>
                        <IconButton
                          aria-label="Excluir Serviço"
                          icon={<DeleteIcon />}
                          size="xs"
                          color={"primary.600"}
                          backgroundColor={"white"}
                          boxShadow={"md"}
                          _hover={{ backgroundColor: "primary.600", color: "primary.100" }}
                          onClick={() => handleRemoveClick(service.idDoServiço)}
                        />
                        <IconButton
                          aria-label="Postar Serviço"
                          icon={<CheckIcon />}
                          color={"primary.300"}
                          backgroundColor={"white"}
                          boxShadow={"md"}
                          isDisabled={service.status === "Postado"}
                          _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
                          size="xs"
                          ml={"2"}
                          onClick={() => handlePostService(service.idDoServiço)}
                        />
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
              isDisabled={currentPage * itemsPerPage >= filteredServices.length}
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

        {/* Modal para Remover Serviço */}
        <Modal isOpen={activeModal === "first"} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmar Remoção</ModalHeader>
            <ModalBody>
              <Text color={"primary.200"}>Deseja remover o serviço com ID {selectedService}?</Text>
              <Text fontSize={"sm"} color={"gray.500"}>--Essa operação não pode ser desfeita!</Text>
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
                  closeModal();
                }}
              >
                Remover
              </ModalButton>
              <Button variant="ghost" onClick={closeModal} ml={3}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={activeModal === "second"} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmar Postagem</ModalHeader>
            <ModalBody>
              <Text color={"primary.200"}>Deseja postar o serviço com ID {selectedService}?</Text>
              <Text fontSize={"sm"} color={"gray.500"}>-- Após postar o serviço você não podera mais editalo!</Text>
            </ModalBody>
            <ModalFooter justifyContent="space-between">
              <ModalButton
                colorScheme="red"
                backgroundColor={"primary.300"}
                color={"primary.100"}
                _hover={{ backgroundColor: "primary.300" }}
                onClick={async () => {
                  if (selectedService) {
                    // Lógica para remover o serviço da API
                    if (typeof window !== 'undefined') {
                      const token = localStorage.getItem('Authorization');
                      if (token) {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                      }
                    }
                    await axios.post(`/Service/Post`, {}, {
                      params: {
                        idservice: selectedService,
                      },
                    })
                      .then(() => handleRemoveSuccess(selectedService))
                      .catch(error => {
                        console.error('Erro ao remover serviço:', error);
                        toast({
                          title: "Erro ao remover serviço",
                          description: "Ocorreu um erro ao tentar postar o serviço. Tente novamente mais tarde.",
                          status: "error",
                          duration: 5000,
                          isClosable: true,
                        });
                      });
                  }
                  closeModal();
                }}
              >
                Postar
              </ModalButton>
              <Button variant="ghost" onClick={closeModal} ml={3}>
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
