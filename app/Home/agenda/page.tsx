"use client";

import React, { useState, useMemo,useEffect } from 'react';
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
  useToast
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
  status: 'Confirmado' | 'Concluído' | 'Cancelado'|'Pendente';
  categoryname: string;
  vaccines: Vaccine[];
  subcategories: Subcategory[];
  idos:string;
  attendancemodel:string;
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



const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = monthAbbreviations[date.getMonth()].toUpperCase();
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month} ${year}`;
};

const Agenda: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Date[]>(generateWeekDates(new Date()));
  const [services, setServices] = useState<Service[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const toast = useToast();
  const [toggleState, setToggleState] = useState<"Pessoal" | "rede">("Pessoal");
  const [toggleStateapi, setToggleStateapi] = useState<"User" | "NetWork">("User");

  useEffect(() => { 
    fetchCollaborators();
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

  const handleWeekChange = (direction: number) => {
    const newStartDate = new Date(currentWeek[0]);
    newStartDate.setDate(newStartDate.getDate() + direction * 7);
    setCurrentWeek(generateWeekDates(newStartDate));
  };

  const handleDateSelect = (date: Date) => {
    setCurrentWeek(generateWeekDates(date));
    setSelectedDate(date);
    onClose();
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
      <Sidebar />
      <Box
        marginLeft="250px"
        py="2"
        width="calc(100% - 250px)"
        flex="1"
        borderRadius="md"
        position="relative"
      >
        <Flex  justify="space-between" align="center" mb="2"  borderBottomColor={"gray.200"} borderBottomWidth={"1px"} pb={"1"} px = "4" fontFamily="Nunito, sans-serif">
          <Box flexDirection={"row"} display={"flex"}> <Heading as="h1" size="sm" color={"primary.200"} display={"flex"} flexDirection={"row"}><Text color="gray.500">Main Menu 
      <ChevronRightIcon /> 
          
        </Text> Agenda</Heading>
          <Button backgroundColor={"white"} borderRadius={"md"} size={"sm"} py={"2"} mt="1"  boxShadow={"md"}  ml={"4"} _hover={{backgroundColor:"white"}}>
            <Box ml="0">
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
            <Text ml="2" color="primary.250" fontWeight={"bold"} fontSize={"sm"}>
              {toggleState === "Pessoal" ? "Pessoal" : "Rede"}
            </Text>
            </Button>
            </Box>
          <Box>
            <Button display={"flex"}  right={"0"}   backgroundColor={"primary.500"} maxWidth={"110px"}
            leftIcon={<AddIcon fontSize={"sm"}/>}
                color="primary.300"
                size={"sm"}
                _hover={{ backgroundColor: "primary.300", color: "primary.100" }} >Agendar
                </Button>
            </Box>
       
            
        </Flex>
       

        <Box position="relative" height="calc(100vh - 120px)" mx={"4"} >
          
        
        <Box  position="sticky"
            top="0"
            bg="primary.200"
            height={"50px"}
            pt={"2"}
            borderTopRadius={"md"}
            color={"primary.100"}
            zIndex={"10"}>
            <Grid templateColumns="repeat(8, 1fr)" mb="4" alignItems="center">
              <GridItem>
                <Button onClick={onOpen} size="sm" ml="4" fontSize={"sm"} bgColor={"primary.250"} boxShadow={"md"} color={"primary.100"} _hover={{backgroundColor:"primary.250"}}>
                  {selectedDate ? formatDate(selectedDate) : 'Selecionar'}
                </Button>
              </GridItem>
              {currentWeek.map((date) => (
                <GridItem key={date.toString()}>
                  <Flex align="center">
                    <Text fontSize="sm" fontWeight="bold" color="primary.100" mr={2}>
                      {daysOfWeek[date.getDay()]}, {date.getDate()} {monthAbbreviations[date.getMonth()]}
                    </Text>
                    {hasServiceOnDate(date) && (
                      <Circle size="10px" bg="primary.600" />
                    )}
                  </Flex>
                </GridItem>
              ))}
            </Grid>
          </Box>
          <Box   borderRadius={"md"}
            boxShadow={"md"}
            height="calc(100vh - 170px)"
            overflowY="scroll"
            py={1}
            px={2}
            zIndex={9}
            bg={"primary.100"}
            width={"100%"}>
            <Grid templateColumns="repeat(8, 1fr)" gap={0}>
              <GridItem>
                {Array.from({ length: 24 }, (_, i) => (
                  <Box
                    key={i}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderBottom="1px solid #E2E8F0"
                    height={`${heightsPerHour[i]}px`} // Aplicando a altura máxima calculada
                  >
                    {`${i}:00`}
                  </Box>
                ))}
              </GridItem>
              {currentWeek.map((date) => (
                <GridItem key={date.toString()} borderLeft="1px solid #E2E8F0">
                  {Array.from({ length: 24 }, (_, hour) => {
                    // Obter o número de serviços para a hora específica
                    const servicesCount = getServicesForTimeSlot(date, hour).length;
                    // Calcular a altura baseando-se na altura máxima calculada
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

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Selecionar Data</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <DayPicker onDayClick={handleDateSelect} />
              </ModalBody>
            </ModalContent>
          </Modal>

          
        </Box>
    </Flex>
    </>
    
  );
};

export default Agenda;
