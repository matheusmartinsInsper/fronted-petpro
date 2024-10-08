"use client";

import { format, differenceInHours } from "date-fns";
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
  Text,
  useDisclosure,
  useToast,
  Circle,
  Switch,
  Button
} from "@chakra-ui/react";
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronRightIcon as ExpandIcon,
} from "@chakra-ui/icons";
import Sidebar from "../components/Sidebar";
import Header from "../components/headers";
import { useState, useEffect } from "react";
import { ServiceDetailsModal } from "./components/ModalSolicitation"; // Importe o modal
import axios from "../../../utils/axiosConfig";

export interface Vaccine {
  nameofvaccine: string;
  idvaccine: string;
  price: string;
}

export interface Subcategory {
  title: string;
  idsubcategory: string;
  price: string;
}

export interface Service {
  idos: string;
  title: string;
  date: Date;
  datesolicitation: Date;
  description: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  petName: string;
  petBreed: string;
  petSpecies: string;
  petWeight: string;
  petAge: string;
  servicePrice: string;
  clientComment: string;
  status: "Confirmado" | "Concluído" | "Cancelado" | "Pendente";
  categoryname: string;
  vaccines: Vaccine[];
  subcategories: Subcategory[];
  attendancemodel:string
}

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [toggleState, setToggleState] = useState<"Pessoal" | "rede">("Pessoal");
  const [toggleStateapi, setToggleStateapi] = useState<"User" | "NetWork">("User");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchServices();
  }, [toggleStateapi]);

  const fetchServices = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Authorization");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }

    try {
      const response = await axios.get(`/OrderService/${toggleStateapi}`);
      const data = response.data.data.map((service: any) => ({
        title: service.title,
        date: new Date(service.dateappointed),
        datesolicitation: new Date(service.datesolicitation),
        description: service.comments,
        clientName: service.tutor.name,
        clientPhone: service.tutor.number,
        clientEmail: service.tutor.email,
        petName: service.pet.petname,
        petBreed: service.pet.race,
        petSpecies: service.pet.species,
        petWeight: `${service.pet.weight}kg`,
        petAge: service.pet.age,
        servicePrice: service.price,
        clientComment: service.comments,
        status: service.status,
        categoryname: service.categoryname,
        vaccines: service.vaccines || [],
        subcategories: service.subcategories || [],
        idos: service.idorderservice,
        attendancemodel:service.attendancemodel
      }));
      setServices(data);
      setFilteredServices(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar solicitações.",
        description: "Não foi possível carregar as solicitações. Tente novamente mais tarde.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
  setSearchTerm(query);

  const filtered = services.filter((service) => {
    return (
      service.title.toLowerCase().includes(query) ||
      service.clientName.toLowerCase().includes(query) ||
      service.status.toLowerCase().includes(query) ||
      service.categoryname.toLowerCase().includes(query) 
    );
  });

  setFilteredServices(query ? filtered : services);
  };

  const handlePageChange = (direction: "next" | "prev") => {
    if (
      direction === "next" &&
      currentPage * itemsPerPage < filteredServices.length
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDetailsClick = (service: Service) => {
    setSelectedService(service);
    onOpen();
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

  return (
    <>
    <Header />
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
          <Flex align="center">
          <Heading as="h1" size="sm" color={"primary.200"} display={"flex"} flexDirection={"row"}><Text color="gray.500">Main Menu 
      <ChevronRightIcon /> 
          
        </Text> Solicitações</Heading>
            <Button 
             backgroundColor={"white"}
             borderRadius={"md"}
             size="sm"
             p={"2"}
             boxShadow={"md"}
             ml={"4"}
             _hover={{ backgroundColor: "white" }}
             _focus={{ outline: "none" }}>
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
            <Text ml="2" color="primary.200" fontWeight={"semi-bold"} fontSize={"sm"}>
              {toggleState === "Pessoal" ? "Pessoal" : "Rede"}
            </Text>
            </Button>
            
          </Flex>

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
              onClick={() => {}}
              size="sm"
              variant="outline"
            />
          </Box>
        </Flex>

        <Box
          overflowX="auto"
          mb="14"
          borderRadius={"8px"}
          backgroundColor={"white"}
          boxShadow={"md"}
           mx="4"
        >
          <Table variant="simple">
            <Thead backgroundColor={"primary.200"} color={"primary.100"}>
              <Tr>
                <Th color={"primary.100"}>Categoria</Th>
                <Th color={"primary.100"}>Título</Th>
                <Th color={"primary.100"}>Cliente</Th>
                <Th color={"primary.100"}>Data-Agendamento</Th>
                <Th color={"primary.100"}>Data-Solicitação</Th>
                <Th color={"primary.100"}>Preço</Th>
                <Th color={"primary.100"}>Status</Th>
                <Th color={"primary.100"}>Detalhes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedServices.map((service) => {
                const hoursDifference = differenceInHours(
                  new Date(),
                  service.datesolicitation
                );
                return (
                  <Tr key={service.idos} paddingY={"2.5"}>
                    <Td paddingY={"2.5"}>{service.categoryname}</Td>
                    <Td paddingY={"2.5"}>{service.title}</Td>
                    <Td paddingY={"2.5"}>{service.clientName}</Td>
                    <Td paddingY={"2.5"}>{format(service.date, "dd/MM/yy HH:mm")}</Td>
                    <Td paddingY={"2.5"}>
                      {format(service.datesolicitation, "dd/MM/yy HH:mm")}
                      {hoursDifference > 6 && (
                        <Circle
                          size="10px"
                          bg="primary.600"
                          display="inline-block"
                          ml="2"
                        />
                      )}
                    </Td>
                    <Td paddingY={"2.5"}>
                      <Text
                        textAlign={"center"}
                        minWidth={"70px"}
                        fontSize={"sm"}
                        backgroundColor={"green.100"}
                        p={"1"}
                        borderRadius={"5px"}
                        color={"#2EB086"}
                        fontWeight={"bold"}
                      >
                        {service.servicePrice} R$
                      </Text>
                    </Td>
                    <Td paddingY={"2.5"}>
                      <Text
                      fontWeight={"bold"}
                        textAlign="center"
                        minWidth="70px"
                        p="1"
                        borderRadius="5px"
                        color={
                          service.status === "Pendente"
                            ? "#FFC100"
                            : service.status === "Cancelado"
                            ? "primary.600"
                            : "gray.600"
                        }
                        backgroundColor={
                          service.status === "Pendente"
                            ? "#FFFBDA"
                            : service.status === "Cancelado"
                            ? "primary.650"
                            : "gray.100"
                        }
                      >
                        {service.status}
                      </Text>
                    </Td>
                    <Td paddingY={"2.5"}>
                      <Flex>
                        <IconButton
                          aria-label="Expandir detalhes"
                          icon={<ExpandIcon />}
                          size="sm"
                          color="blue.500"
                          backgroundColor="white"
                          _hover={{ backgroundColor: "primary.100" }}
                          onClick={() => handleDetailsClick(service)}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
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
          />
        </Flex>

        {selectedService && (
          <ServiceDetailsModal
            isOpen={isOpen}
            onClose={onClose}
            service={selectedService}
            typefromrequest={toggleStateapi}
          />
        )}
      </Box>
    </Flex>
    </>
    
  );
};

export default Services;
