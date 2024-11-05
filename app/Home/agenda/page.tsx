"use client";
import { useRouter } from 'next/router';
import React, { useState, useMemo,useEffect,useRef,useCallback } from 'react';
import axios from "../../../utils/axiosConfig"
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Circle,
  Switch,
  useToast,
  Progress,
  Divider,
  useSafeLayoutEffect
} from '@chakra-ui/react';
import {
  SearchIcon,
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import Sidebar from '../components/Sidebar';
import Header from '../components/headers';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ServiceCard } from "./components/ServiceCard"
import { ModalAgenda } from "./components/ModelAgenda"
import { count } from 'console';

const daysOfWeek = [
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sáb'
];
const monthAbbreviations = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

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
  castrated: boolean;
  priority: string;
  nameuserowner:string;
  nameprofissional:string;
  title: string;
  date: Date;
  datesolicitation:Date;
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
  status: 'Confirmado' | 'Concluido' | 'Cancelado'|'Pendente'|'Andamento';
  categoryname: string;
  vaccines: Vaccine[];
  subcategories: Subcategory[];
  idos:string;
  attendancemodel:string;
  idattendance: string;
}
 interface AgendamentosPotPrioridade {
  "Não urgente": number;
  "Pouco urgente": number;
  "Urgente": number;
  "Muito urgente": number;
  "Emergencia": number;
 }

const generateWeekDates = (startDate: Date): Date[] => {
  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    week.push(date);
  }
  return week;
};

const agendamentosPotStatus={
  "Confirmado":0,
  "Concluido":0,
  "Cancelado":0,
  "Andamento":0
}

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = monthAbbreviations[date.getMonth()].toUpperCase();
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month} ${year}`;
};

const Agenda: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Date[]>(generateWeekDates(new Date()));
  const [services, setServices] = useState<Service[]>([]);
  const previousServicesRef = useRef(services);
  const [agendamentosPotPrioridade,setAgendamentosPorPrioridade] = useState<AgendamentosPotPrioridade>({
    "Não urgente": 0,
    "Pouco urgente": 0,
    "Urgente": 0,
    "Muito urgente": 0,
    "Emergencia": 0,
  })
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [toggleState, setToggleState] = useState<"Pessoal" | "rede">("Pessoal");
  const [toggleStateapi, setToggleStateapi] = useState<"User" | "NetWork">("User");
  const [selectedButton, setSelectedButton] = useState<string>("Prioridade");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => { 
    fetchCollaborators();
    previousServicesRef.current = services;
  }, [toggleStateapi]);

  const fetchCollaborators = async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('Authorization');
      console.log(token)
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
    try {
      const response = await axios.get(`/OrderService/${toggleStateapi}`,{
        params:{
          "wasaccept":true
        }
      }); // Substitua pela URL da sua API
      if (response.data.status === 'confirmed') {
        const data = response.data.data.map((service: any) => ({
          priority: service.priority,
          nameprofissional: service.nameprofissional,
          nameuserowner: service.nameuserowner,
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
          castrated: service.pet.castrated,
          petWeight: `${service.pet.weight}kg`,
          petAge: service.pet.age,
          servicePrice: service.price,
          clientComment: service.comments,
          status: service.status,
          categoryname: service.categoryname,
          vaccines: service.vaccines || [],
          subcategories: service.subcategories || [],
          idos: service.idorderservice,
          attendancemodel:service.attendancemodel,
          idattendance: service.idattendance
        }));
        setServices(data);
        countByStatus(data);
        countByPriority(data);
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

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };
  const countByStatus = (data:Service[])=>{
    agendamentosPotStatus.Cancelado=data.filter((x,i)=>x.status=="Cancelado").length
    agendamentosPotStatus.Concluido=data.filter((x,i)=>x.status=="Concluido").length
    agendamentosPotStatus.Confirmado=data.filter((x,i)=>x.status=="Confirmado").length
    agendamentosPotStatus.Andamento=data.filter((x,i)=>x.status=="Andamento").length
  }
  const countByPriority = (data:Service[]) => {
    agendamentosPotPrioridade["Não urgente"] = data.filter((x,i)=>x.priority=="Não urgente").filter((y,i)=>y.status=="Confirmado").length
    agendamentosPotPrioridade["Pouco urgente"] = data.filter((x,i)=>x.priority=="Pouco urgente").filter((y,i)=>y.status=="Confirmado").length
    agendamentosPotPrioridade["Urgente"] = data.filter((x,i)=>x.priority=="Urgente").filter((y,i)=>y.status=="Confirmado").length
    agendamentosPotPrioridade["Muito urgente"] = data.filter((x,i)=>x.priority=="Muito urgente").filter((y,i)=>y.status=="Confirmado").length
    agendamentosPotPrioridade["Emergencia"] = data.filter((x,i)=>x.priority=="Emergencia").filter((y,i)=>y.status=="Confirmado").length
  }

  const handleDateSelect = (date: Date) => {
    setCurrentWeek(generateWeekDates(date));
  };

  const getServiceCountForDate = (date:Date) => {
    // Exemplo: Filtrar os agendamentos que correspondem à data
    const servicesForDate = services.filter(service => 
      new Date(service.date).toDateString() === date.toDateString()
    );
    return servicesForDate.length;
  };
  
  const getServicesForTimeSlot = (date: Date, hour: number): Service[] => {
    return services
      .filter(service => 
        new Date(service.date).toDateString() === date.toDateString() &&
        new Date(service.date).getHours() === hour
      )
      .sort((a, b) => a.date.getMinutes() - b.date.getMinutes()); // Ordenar pelos minutos
  };

  const hasServiceOnDate = (date: Date): boolean => {
    return services.some(service => 
      new Date(service.date).toDateString() === date.toDateString()
    );
  };
  const handleToggleChange = () => {
    const newToggleState = toggleState === "Pessoal" ? "rede" : "Pessoal";
    const newToggleStateapi = toggleStateapi === "User" ? "NetWork" : "User";
    setToggleState(newToggleState);
    setToggleStateapi(newToggleStateapi);
  };

  // Memoized value to calculate heights once per render
  const heightsPerHour = useMemo(() => {
    const hourlyHeights: { [key: number]: number } = {};
    currentWeek.forEach(date => {
      Array.from({ length: 24 }, (_, hour) => {
        const servicesCount = getServicesForTimeSlot(date, hour).length;
        const height = servicesCount > 0 ? 80 * servicesCount : 80;
        if (!hourlyHeights[hour] || height > hourlyHeights[hour]) {
          hourlyHeights[hour] = height;
        }
      });
    });
    return hourlyHeights;
  }, [currentWeek, services]);

  return (
    <>
    <Header />
    <Flex direction="column" minHeight="calc(100vh - 40px)" backgroundColor="primary.100">
    <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/>
      <Box  py="2" marginLeft={isCollapsed?"60px":"250px"} width={isCollapsed?"calc(100% - 60px)":"calc(100% - 250px)"} flex="1" borderRadius="md" position="relative">
        <Flex justify="space-between" align="center" mb="2" borderBottomColor="gray.200" borderBottomWidth="1px" pb="1" px="4" fontFamily="Nunito, sans-serif">
          <Box flexDirection="row" display="flex">
            <Heading as="h1" size="sm" color="primary.200" display="flex" flexDirection="row">
              <Text color="gray.500">
                Main Menu
                <ChevronRightIcon />
              </Text>
              Agenda
            </Heading>
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
          </Box>
          <Box>
            <Button
              display="flex"
              right="0"
              backgroundColor="primary.500"
              maxWidth="110px"
              leftIcon={<AddIcon fontSize="sm" />}
              color="primary.300"
              size="sm"
              onClick={onOpen}
              _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
            >
              Agendar
            </Button>
          </Box>
        </Flex>
  
        <Flex direction="row" height="calc(100vh - 120px)" mx="4">
        <Box width={"22%"} borderRadius="md" boxShadow="md" height="100%" zIndex={9} bg="#F6F7F9" px="2" mr="2">
  <DayPicker style={{ transform: "scale(0.8)", transformOrigin: "top left" }} onDayClick={handleDateSelect} />

<Divider borderColor="gray.200" />
<Box mt="4">
      {/* Botões para alterar a visualização */}
      <Flex justifyContent="space-around" mb={4}>
      <Button
          size="sm"
          bg={selectedButton === 'Notas' ? 'white' : '#F6F7F9'}
          color="primary.200"
          boxShadow={selectedButton === 'Notas' ? 'md' : 'none'}
          _hover={{ bg: '#F6F7F9' }}
          fontWeight="bold"
          onClick={() => handleButtonClick('Notas')}
        >
          Notas
        </Button>
        <Button
          size="sm"
          bg={selectedButton === 'Prioridade' ? 'white' : '#F6F7F9'}
          color="primary.200"
          boxShadow={selectedButton === 'Prioridade' ? 'md' : 'none'}
          _hover={{ bg: '#F6F7F9' }}
          fontWeight="bold"
          onClick={() => handleButtonClick('Prioridade')}
        >
          Prioridade
        </Button>
        <Button
          size="sm"
          bg={selectedButton === 'Status' ? 'white' : '#F6F7F9'}
          color="primary.200"
          boxShadow={selectedButton === 'Status' ? 'md' : 'none'}
          _hover={{ bg: '#F6F7F9' }}
          fontWeight="bold"
          onClick={() => handleButtonClick('Status')}
        >
          Status
        </Button>
      </Flex>

      {/* Renderiza agendamentos com base no botão selecionado */}
      {selectedButton === 'Prioridade' && (
        <>
          <Text fontSize="sm" fontWeight="bold" mb={0}>
            Agendamentos por prioridade
          </Text>
          <Text fontSize="xs" mb={2} color="gray.500">
            Somente agendamentos confirmados*
          </Text>

          {/* Barras de progresso para prioridades */}
          <Box mb={2}>
            <Text fontSize="xs" mb={1}>Emergência: {agendamentosPotPrioridade["Emergencia"]}</Text>
            <Progress bgColor="#F6F7F9" size="sm" value={agendamentosPotPrioridade["Emergencia"]} sx={{ "& > div": { backgroundColor: "primary.600" } }} borderRadius="md" />
          </Box>
          <Box mb={2}>
            <Text fontSize="xs" mb={1}>Muito urgente: {agendamentosPotPrioridade["Muito urgente"]}</Text>
            <Progress bgColor="#F6F7F9" size="sm" value={agendamentosPotPrioridade["Muito urgente"]} sx={{ "& > div": { backgroundColor: "primary.1000" } }} borderRadius="md" />
          </Box>
          <Box mb={2}>
            <Text fontSize="xs" mb={1}>Urgente: {agendamentosPotPrioridade["Urgente"]}</Text>
            <Progress bgColor="#F6F7F9" size="sm" value={agendamentosPotPrioridade["Urgente"]} sx={{ "& > div": { backgroundColor: "primary.900" } }} borderRadius="md" />
          </Box>
          <Box mb={2}>
            <Text fontSize="xs" mb={1}>Pouco urgente: {agendamentosPotPrioridade["Pouco urgente"]}</Text>
            <Progress bgColor="#F6F7F9" size="sm" value={agendamentosPotPrioridade["Pouco urgente"]} sx={{ "& > div": { backgroundColor: "primary.800" } }} borderRadius="md" />
          </Box>
          <Box mb={2}>
            <Text fontSize="xs" mb={1}>Não urgente: {agendamentosPotPrioridade["Não urgente"]}</Text>
            <Progress bgColor="#F6F7F9" size="sm" value={agendamentosPotPrioridade["Não urgente"]} sx={{ "& > div": { backgroundColor: "primary.1100" } }} borderRadius="md" />
          </Box>
        </>
      )}

      {selectedButton === 'Status' && (
        <>
          <Text fontSize="sm" fontWeight="bold" mb={2}>
            Agendamentos por status
          </Text>

          {/* Exibição de agendamentos por status */}
          <Box mb={2}>
            <Text fontSize="xs" mb={1}>Confirmado: {agendamentosPotStatus.Confirmado}</Text>
            <Progress bgColor="#F6F7F9" size="sm" value={agendamentosPotStatus.Confirmado} sx={{ "& > div": { backgroundColor: "primary.300" } }} borderRadius="md" />
          </Box>
          <Box mb={2}>
            <Text fontSize="xs" mb={1}>Andamento: {agendamentosPotStatus.Andamento}</Text>
            <Progress bgColor="#F6F7F9" size="sm" value={agendamentosPotStatus.Andamento} sx={{ "& > div": { backgroundColor: "primary.1100" } }} borderRadius="md" />
          </Box>
          <Box mb={2}>
            <Text fontSize="xs" mb={1}>Concluído: {agendamentosPotStatus.Concluido}</Text>
            <Progress bgColor="#F6F7F9" size="sm" value={agendamentosPotStatus.Concluido} sx={{ "& > div": { backgroundColor: "primary.800" } }} borderRadius="md" />
          </Box>
          <Box mb={2}>
            <Text fontSize="xs" mb={1}>Cancelado: {agendamentosPotStatus.Cancelado}</Text>
            <Progress bgColor="#F6F7F9" size="sm" value={agendamentosPotStatus.Cancelado} sx={{ "& > div": { backgroundColor: "primary.600" } }} borderRadius="md" />
          </Box>
          
        </>
      )}
    </Box>
</Box>


  
          <Box width={"80%"} borderRadius="md" boxShadow="md" height="100%" zIndex={9} bg="primary.100">
            <Box position="sticky" top="0" bg="primary.200" height={"50px"} pt={"2"} borderTopRadius={"md"} color={"primary.100"} zIndex={"10"}>
              <Grid templateColumns={`repeat(${currentWeek.length + 1}, 1fr)`} mb="4" alignItems="center">
                <GridItem width="100px"> {/* Tamanho fixo para as horas */}
                  <Text width={"100%"} justifyContent={"center"} display={"flex"} alignItems={"center"}>Hora</Text>
                </GridItem>
                {currentWeek.map((date) => (
  <GridItem key={date.toString()} height={"100%"} minWidth="110px"> {/* Mantendo o mesmo width fixo para cada dia */}
    <Flex align="center" justify="center" display={"flex"} flexDirection={"column"}>
      <Text fontSize="sm" fontWeight="bold" color="primary.100" mr={2} display={"flex"} flexDirection={"row"} alignItems={"center"}>
        {daysOfWeek[date.getDay()]}
        {hasServiceOnDate(date) && (
          <Circle size="20px" bg="primary.300" ml={"2"} fontSize={"xs"}>
            {getServiceCountForDate(date)} {/* Exibir a quantidade de agendamentos */}
          </Circle>
        )}
      </Text>
      <Text fontSize="sm" fontWeight="bold" color="primary.100" mr={2} textAlign={"center"}>
        {date.getDate()} {monthAbbreviations[date.getMonth()]}
      </Text>
    </Flex>
  </GridItem>
))}
              </Grid>
            </Box>
            
            <Box borderRadius={"md"} boxShadow={"md"} height="calc(100vh - 170px)" overflowY="scroll" py={1} px={2} zIndex={9} bg={"primary.100"} width={"100%"}>
              <Grid templateColumns={`repeat(${currentWeek.length + 1}, 1fr)`} gap={0}>
                <GridItem minWidth="110px"> {/* Tamanho fixo para as horas */}
                  {Array.from({ length: 24 }, (_, i) => (
                    <Box
                      key={i}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      borderBottom="1px solid #E2E8F0"
                      height={`${heightsPerHour[i]}px`}
                      bgColor={"#F6F7F9"}
                      fontWeight={"bold"}
                      color={"primary.250"}
                      fontSize={"sm"}
                    >
                      {`${i}:00`}
                    </Box>
                  ))}
                </GridItem>
                {currentWeek.map((date) => (
                  <GridItem key={date.toString()} borderLeft="1px solid #E2E8F0" minWidth="110px"> {/* Mantendo o mesmo width fixo para os agendamentos */}
                    {Array.from({ length: 24 }, (_, hour) => {
                      const servicesCount = getServicesForTimeSlot(date, hour).length;
                      const height = `${heightsPerHour[hour]}px`;
  
                      return (
                        <Box
                          key={hour}
                          py={1}
                          px={2}
                          borderBottom="1px solid #E2E8F0"
                          height={height}
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          width="100%"
                          backgroundColor={servicesCount ? 'primary.100' : 'transparent'}
                          cursor={servicesCount ? 'pointer' : 'default'}
                        >
                          {getServicesForTimeSlot(date, hour).map((service, index) => (
                            <ServiceCard key={index} service={service} />
                          ))}
                        </Box>
                      );
                    })}
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
    <ModalAgenda isOpen={isOpen} onClose={onClose} toggleStateapi={toggleStateapi} />
  </>
  
);
};

export default Agenda;
