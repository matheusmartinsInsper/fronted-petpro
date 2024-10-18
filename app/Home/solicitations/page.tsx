"use client";

import { format, differenceInHours ,subDays,isSameDay} from "date-fns";
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
  Button,
  CardBody,
  Card,
  Link,
  SimpleGrid,
  Icon,
  useTheme
} from "@chakra-ui/react";
import { MdEvent, MdPeople, MdStore,MdMoreHoriz } from 'react-icons/md';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,Cell,LineChart,Line } from 'recharts';
import {
  SearchIcon,
  BellIcon,
  CalendarIcon,
  EditIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronRightIcon as ExpandIcon,WarningIcon
} from "@chakra-ui/icons";
import Sidebar from "../components/Sidebar";
import Header from "../components/headers";
import { useState, useEffect } from "react";
import { ServiceDetailsModal } from "./components/ModalSolicitation"; // Importe o modal
import axios from "../../../utils/axiosConfig";
import { ptBR } from 'date-fns/locale';

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
  nameuserowner:string;
  priority: "Não urgente" | "Pouco urgente" | "Urgente" | "Muito urgente"|"Emergencia";
  idos: string;
  title: string;
  date: Date;
  datesolicitation: Date;
  description: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  castrated: boolean;
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
const getPriorityColor2 = (status: string, theme: any) => {
  switch (status) {
    case 'Não urgente':
      return theme.colors.primary[1100];
    case 'Pouco urgente':
      return theme.colors.primary[800];
    case 'Urgente':
      return theme.colors.primary[900];
    case "Muito urgente":
      return theme.colors.primary[1000];
    case "Emergência": // Certifique-se de que a prioridade está escrita corretamente
      return theme.colors.primary[600];
    default:
      return theme.colors.gray[500];
  }
};
const getPriorityColor = (status: string) => {
  switch (status) {
    case 'Não urgente':
      return 'primary.1100';
    case 'Pouco urgente':
      return 'primary.800';
    case 'Urgente':
      return 'primary.900';
    case "Muito urgente":
      return 'primary.1000';
    case "Emergencia":
      return "primary.600"
    default:
      return 'gray.500';
  }
};

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [allservices, setAllServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [toggleState, setToggleState] = useState<"Pessoal" | "rede">("Pessoal");
  const [toggleStateapi, setToggleStateapi] = useState<"User" | "NetWork">("User");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [data, setData] = useState<{ day: string; solicitacoes: number }[]>([]);
  const [countStatus,setCountStatus] = useState<{ Cancelado: number; Pendente: number }>({Cancelado:0,Pendente:0})
  const [totalprice,settotalprice] = useState<number>(0);

  const [priorityData, setPriorityData] = useState([
    { prioridade: 'Não urgente', quantidade: 0 },
    { prioridade: 'Pouco urgente', quantidade: 0 },
    { prioridade: 'Urgente', quantidade: 0 },
    { prioridade: 'Muito urgente', quantidade: 0 },
    { prioridade: 'Emergencia', quantidade: 0 },
  ]);
  const theme = useTheme();

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
      const responseall = await axios.get(`/OrderService/${toggleStateapi}/All`);
      const data = response.data.data.map((service: any) => ({
        priority: service.priority,
        title: service.title,
        nameuserowner: service.nameuserowner,
        date: new Date(service.dateappointed),
        datesolicitation: new Date(service.datesolicitation),
        description: service.comments,
        clientName: service.tutor.name,
        clientPhone: service.tutor.number,
        clientEmail: service.tutor.email,
        castrated: service.pet.castrated,
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
      const dataall = responseall.data.data.map((service: any) => ({
        priority: service.priority,
        title: service.title,
        nameuserowner: service.nameuserowner,
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
      setData(countRequestsInLast7Days(dataall));
      setCountStatus(countServicesByStatus(data));
      settotalprice(getTotalPriceOfPendingServices(data));

      const counts = {
        'Não urgente': 0,
        'Pouco urgente': 0,
        'Urgente': 0,
        'Muito urgente': 0,
        'Emergencia': 0,
      };
  
      data.forEach((service:Service) => {
        if (counts[service.priority] !== undefined) {
          counts[service.priority]++;
        }
      });
  
      // Atualiza os dados do gráfico
      setPriorityData([
        { prioridade: 'Não urgente', quantidade: counts['Não urgente'] },
        { prioridade: 'Pouco urgente', quantidade: counts['Pouco urgente'] },
        { prioridade: 'Urgente', quantidade: counts['Urgente'] },
        { prioridade: 'Muito urgente', quantidade: counts['Muito urgente'] },
        { prioridade: 'Emergência', quantidade: counts['Emergencia'] },
      ]);

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
  const countServicesByStatus = (services:Service[]) => {

    const statusCount = {
      Cancelado: 0,
      Pendente: 0,
    };
  
    services.forEach((service) => {
      if (service.status === "Cancelado") {
        statusCount.Cancelado += 1;
      } else if (service.status === "Pendente") {
        statusCount.Pendente += 1;
      }
    });
  
    return statusCount;
  };

  const countRequestsInLast7Days = (services: Service[]) => {
    const today = new Date();
    
    // Gerar os últimos 7 dias
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const currentDate = subDays(today, i); // Calcula a data do dia
      const dayNumber = format(currentDate, 'd'); // Formata apenas o número do dia
      const dayName = format(currentDate, 'EEEE', { locale: ptBR }); // Formata o dia da semana
  
      return {
        date: currentDate, // Armazena a data completa
        day: dayNumber, // Número do dia
        dayWithNumber: `${dayName} (${dayNumber})`, // Dia da semana com o número do dia
        solicitacoes: 0, // Inicializa a contagem de solicitações
      };
    }).reverse(); 

    const solicitationCount = last7Days.map((day) => {
      const count = services.filter(service =>
        isSameDay(new Date(service.datesolicitation), day.date)
      ).length;
  
      return {
        ...day,
        solicitacoes: count,
      };
    });
  
    return solicitationCount; // Retorna os dados com a contagem
  };

  const getTotalPriceOfPendingServices = (services: Service[]): number => {
    return services
      .filter(service => service.status === 'Pendente')  // Filtra os serviços pendentes
      .reduce((total, service) => {
        const priceNumber = parseFloat(service.servicePrice); // Converte o preço para número
        return total + (isNaN(priceNumber) ? 0 : priceNumber);  // Soma os preços, ignorando valores inválidos
      }, 0);  
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
  setSearchTerm(query);

  const filtered = services.filter((service) => {
    return (
      service.priority.toLowerCase().includes(query) ||
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
                fontWeight={"bold"}
                tabIndex={-1}
                _focus={{ outline: "none", boxShadow: "none" }} // Remove a borda de foco
                _active={{ outline: "none", boxShadow: "none" }} // Remove o estilo de foco do Switch
                onMouseDown={(e) => e.preventDefault()}
              />
            </Box>
            <Text ml="2" color="primary.200" fontWeight={"bold"} fontSize={"sm"}>
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
        <SimpleGrid px={"4"} zIndex={2} mb="2"  mt="2" columns={{ base: 1, md: 2, lg: 4 }} spacing="2" position={"relative"}>
        <Card zIndex={2} pl ="4" py="4" height={100}>
        <Text fontSize={"sm"} fontWeight={"bold"}>Solicitações por prioridade</Text>
      <CardBody
        color="primary.250"
        transition={"1"}
        m="0"
        mt="-6"
      >
        
        {/* Gráfico de Barras */}
        <ResponsiveContainer width="75%" height={90}>
  <BarChart 
    data={priorityData} 
    barCategoryGap={0}  // Reduzindo o espaçamento entre as categorias
    barGap={0}  // Sem espaçamento entre as barras
  >
    <XAxis dataKey="prioridade" tick={false} axisLine={false} /> {/* Escondendo ticks e linha do eixo X */}
    <YAxis hide={true} /> {/* Escondendo o eixo Y */}
    <Tooltip />
    <Bar
      dataKey="quantidade"
      name="Solicitações"
      radius={[10, 10, 10, 10]}
      barSize={10}  // Ajustando o tamanho das barras
      fontSize={"sm"}
      
    >
      {priorityData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={getPriorityColor2(entry.prioridade, theme)} />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>

      </CardBody>
    </Card>
      <Card height={100}  py="4">
      <CardBody
         color="primary.250"
         transition={"1"}
         m="0"
         mt="-4"
      >
        <Flex align="center">
          <Heading size="xs" fontWeight="bold">
            Solicitações nos últimos 7 dias
          </Heading>
        </Flex>

        {/* Gráfico de linha */}
        <ResponsiveContainer width="75%" height={55}>
  <LineChart data={data}>
    {/* O eixo X agora está oculto, mas os pontos ainda serão plotados */}
    <XAxis dataKey="dayWithNumber" hide />
    <YAxis />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="solicitacoes"
      stroke={theme.colors.primary[300]}
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>

      </CardBody>
    </Card>
            <Card height={100}>
              <CardBody color="primary.250" >
                <Flex align="center">
                  <Heading size="sm" fontSize={"md"}>Status</Heading>
                </Flex>
                <Flex align={"end"} mt={2}>
                  <Box display={"flex"} flexDirection={"row"} alignItems={"center"} textAlign={"center"} mr={"4"}>
                  <Circle
                          size="10px"
                          bg="primary.900"
                          display="inline-block"
                          mr="2"
                        />
                     <Text fontSize="sm" fontWeight="bold"  mr={2} >Pendentes: {countStatus.Pendente} </Text>
                  </Box>
                
                  <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
                  <Circle
                          size="10px"
                          bg="primary.600"
                          display="inline-block"
                          mr="2"
                        />
                     <Text fontSize="sm" fontWeight="bold"  mr={2} >Canceladas: {countStatus.Cancelado} </Text>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
            <Card height={100}>
              <CardBody color="primary.250">
                <Flex align="center">
                  <Heading size="sm" >Total previsto</Heading>
                  
                </Flex>
                <Text color={"gray.500"} fontSize={"xs"}>São contabilizados somente os pendentes</Text>
                <Flex align={"end"} mt={1}>
                <Text
                        textAlign={"center"}
                        minWidth={"50px"}
                        fontSize={"xs"}
                        backgroundColor={"#D5FFE4"}
                        p={"1"}
                        borderRadius={"5px"}
                        color={"#2EB086"}
                        fontWeight={"bold"}
                      >
                       {totalprice} R$
                      </Text>
                </Flex>
              </CardBody>
            </Card>
          </SimpleGrid>
        <Box
          overflowX="auto"
          mb="14"
          borderRadius={"md"}
          backgroundColor={"white"}
          boxShadow={"md"}
           mx="4"
        >
          <Table variant="simple">
            <Thead backgroundColor={"primary.200"} color={"primary.100"}>
              <Tr>
                
                <Th color={"primary.100"}>Categoria</Th>
                <Th color={"primary.100"}>Tutor</Th>
                <Th color={"primary.100"}>Rede</Th>
                <Th color={"primary.100"}>Data-Agendamento</Th>
                <Th color={"primary.100"}>Data-Solicitação</Th>
                <Th color={"primary.100"}>Prioridade</Th>
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
                    <Td paddingY={"2.5"}>{service.clientName}</Td>
                    <Td paddingY={"2.5"}>{service.nameuserowner}</Td>
                    <Td paddingY={"2.5"}>{format(service.date, "dd/MM/yy HH:mm")}</Td>
                    <Td paddingY={"2.5"}>
                      {format(service.datesolicitation, "dd/MM/yy HH:mm")}
                      {hoursDifference >= 6 && (
                        <WarningIcon color={"primary.600"} boxSize={"3"} ml="2" mt="-1"/>
                      )}
                    </Td>
                    <Td paddingY={"2.5"}>
                      <Text
                        textAlign={"center"}
                        minWidth={"70px"}
                        fontSize={"xs"}
                        borderLeftColor={getPriorityColor(service.priority)}
                        borderLeftWidth={"7px"}
                        p={"1"}
                        borderRadius={"6px"}
                        color={getPriorityColor(service.priority)}
                        boxShadow={"md"}
                        fontWeight={"bold"}
                      >
                        {service.priority}
                      </Text>
                    </Td>
                    <Td paddingY={"2.5"}>
                      <Text
                        textAlign={"center"}
                        minWidth={"50px"}
                        fontSize={"xs"}
                        backgroundColor={"#D5FFE4"}
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
                        fontSize={"sm"}
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

        {selectedService && (
          <ServiceDetailsModal
            isOpen={isOpen}
            onClose={onClose}
            service={selectedService}
            typefromrequest={toggleStateapi}
            fetchservices={fetchServices}
          />
        )}
      </Box>
    </Flex>
    </>
    
  );
};

export default Services;
