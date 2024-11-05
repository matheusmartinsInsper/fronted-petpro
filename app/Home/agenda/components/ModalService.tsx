"use client";
import { useRouter } from 'next/navigation';
import React,{useState,useEffect} from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Select,
  Link,
  useToast,
  Circle
} from '@chakra-ui/react';
import { Service } from "../page";
import { CheckCircleIcon, WarningIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import axios from "../../../../utils/axiosConfig"

export const ServiceDetailsModal: React.FC<{ isOpen: boolean, onClose: () => void, service: Service }> = ({ isOpen, onClose, service }) => {
  const [isClient, setIsClient] = useState(false);
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    // Confirma que o componente está sendo executado no cliente
    setIsClient(true);
  }, []);
 
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return 'primary.300';
      case 'Concluido':
        return '#2EB086';
      case 'Cancelado':
        return 'primary.600';
      case 'Andamento':
        return 'primary.900';
        case "Pendente":
          return '#FFC100';
      default:
        return 'gray.500';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return <InfoOutlineIcon color={getStatusColor(status)} boxSize={"4"} />;
      case 'Concluido':
        return <CheckCircleIcon color={getStatusColor(status)} boxSize={"4"} />;
      case 'Cancelado':
        return <WarningIcon color={getStatusColor(status)} boxSize={"4"} />;
      default:
        return null;
    }
  };
  const cancelOrderService = async ()=>{
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Authorization");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
    try {
      await axios.put(`/OrderService/Cancel`, null, {
        params: {
          idos: service.idos,
        },
      });
      toast({
        title: 'Serviço cancelado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Fecha o modal após a ação
    } catch (error: any) {
      toast({
        title: 'Erro ao cancelar o serviço.',
        description: error.response.data.messageError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }
  const createAttendance = async ()=>{
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Authorization");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
    try {
      const response = await axios.post(`/Attendance`, null, {
        params: {
          idos: service.idos,
        },
      });
      toast({
        title: 'Atendimento iniciado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
        router.push(`/Home/agenda/attendance/${response.data.data.idattendance}`);
     
      onClose(); // Fecha o modal após a ação
    } catch (error: any) {
      toast({
        title: 'Erro ao aceitar atendimento',
        description: error.response.data.messageError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Erro ao aceitar o serviço:', error);
    }
  }
  const goToAttendace = ()=>{
    router.push(`/Home/agenda/attendance/${service.idattendance}`);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth={"620px"} >
        <ModalHeader >
          <Flex align="center" justify="start" width="100%">
            
          <Text display={"flex"} flexDirection={"row"} alignItems={"center"} ml={0} bgColor={"white"} fontSize="sm" fontWeight="bold" border={"1px"} borderColor={"gray.200"}   color={"primary.200"} boxShadow={"md"} borderRadius={"md"} p={"2"}>Rede - {service.nameuserowner}</Text>
            <Text ml={4} fontSize="lg" fontWeight="bold">
              Agendamento 
            </Text>
            <Flex align="center" ml={2}>
              <Text fontSize="md" fontWeight="bold" color={getStatusColor(service.status)}>
                {service.status}
              </Text>
              <Box ml={2}>
                {getStatusIcon(service.status)}
              </Box>
            </Flex>
            
          </Flex>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody >
          <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} width={"100%"} boxShadow={"md"}>
            <Flex align="start" mb={2}>
              <Box boxSize="100px" borderRadius="full" overflow="hidden" mr={4}>
                <Image src="https://avatars.githubusercontent.com/u/96667690?s=400&u=4f8546bf37989b834e06c9f8537efde6fddc1312&v=4" alt="Tutor Image" />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight="bold" display={"flex"} flexDirection={"row"} textAlign={"center"} alignItems={"center"}>Tutor<Text bgColor={"white"} p={1} borderLeftWidth={"7px"} borderRadius={"md"} borderLeftColor={getPriorityColor(service.priority)} boxShadow={"md"} fontSize={"xs"} ml={2} color={getPriorityColor(service.priority)}>{service.priority}</Text></Text>
                <Flex>
                  <Text mr={"4"} ><strong>Nome:</strong> {service.clientName}</Text>
                  <Text><strong>Telefone:</strong> {service.clientPhone}</Text>
                </Flex>
                <Text><strong>Email:</strong> {service.clientEmail}</Text>
              </Box>
            </Flex>

            <Text fontSize="md" fontWeight="bold" mb={2}>Dados do Pet</Text>
            <Flex wrap="wrap" mb={4}>
              <Box flex="1" pr={4}>
                <Text><strong>Pet:</strong></Text>
                <Text>{service.petName}</Text>
              </Box>
              <Box flex="1" pr={4}>
                <Text><strong>Espécie:</strong></Text>
                <Text>{service.petSpecies}</Text>
              </Box>
              <Box flex="1" pr={4}>
                <Text><strong>Raça:</strong></Text>
                <Text>{service.petBreed}</Text>
              </Box>
              <Box flex="1" pr={4}>
                <Text><strong>Castrado:</strong></Text>
                <Text>{service.castrated==true?"Sim":"Não"}</Text>
              </Box>
              <Box flex="1" pr={0}>
                <Text><strong>Peso:</strong></Text>
                <Text>{service.petWeight}</Text>
              </Box>
              <Box flex="1">
                <Text><strong>Idade:</strong></Text>
                <Text>{service.petAge}</Text>
              </Box>
              
            </Flex>
            <Text fontSize="md" fontWeight="bold">Comentário do Tutor</Text>
            <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} mb={4}>
              <Text>{service.clientComment}</Text>
            </Box>
          </Box>

          <VStack align="start" spacing={4} mt={4} width="100%"  >
            <Flex justify="space-between" width={"100%"}>
            <Text display={"flex"}  flexDirection={"row"} alignItems={"center"} fontSize="lg" fontWeight="bold" mb={2}>Serviço - {service.title} 
           
              </Text>
            
            <Text display={"flex"} flexDirection={"row"} alignItems={"center"} fontSize="sm" fontWeight="bold" mb={2} bgColor={"white"} boxShadow={"md"} border={"1px"} borderColor={"gray.200"} color={"primary.250"} borderRadius={"md"} p={"2"}>Profissional - {service.nameprofissional}</Text>
            </Flex>
            
            <Flex wrap="wrap" width="100%">
              <Box flex="1" pr={2}>
                <Text><strong>Preço:</strong></Text>
                <Text >{service.servicePrice}</Text>
              </Box>
              <Box flex="1" pr={2}>
                <Text><strong>Horário:</strong></Text>
                <Text>{service.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              </Box>
              <Box flex="1" pr={2}>
                <Text><strong>Atendimento:</strong></Text>
                <Text >{service.attendancemodel}</Text>
              </Box>
              <Box flex="1" pr={2}>
                <Text><strong>Vacinas:</strong></Text>
                <Select placeholder="vacina" size="sm" isReadOnly focusBorderColor='primary.300' color={"primary.200"}>
                  {service.vaccines.map((vaccine) => (
                    <option key={vaccine.idvaccine} value={vaccine.idvaccine} >
                      {vaccine.nameofvaccine} - {vaccine.price}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box flex="1" pr={2}>
                <Text><strong>Subcategorias:</strong></Text>
                <Select placeholder="subcategoria" size="sm" isReadOnly focusBorderColor='primary.300' color={"primary.200"} >
                  {service.subcategories.map((subcategory) => (
                    <option key={subcategory.idsubcategory} value={subcategory.idsubcategory}>
                      {subcategory.title} - {subcategory.price}
                    </option>
                  ))}
                </Select>
              </Box>
            </Flex>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Flex width="100%" justify="space-between">
            <Button colorScheme="red" backgroundColor={"primary.600"} onClick={() => cancelOrderService()}
                _hover={{ backgroundColor: "primary.600", color: "primary.100" }} size={"sm"}>
              Cancelar
            </Button>
            <Link>
            {service.status=="Confirmado"?
              <Button 
                backgroundColor={"primary.500"}
                color="primary.300"
                _hover={{ backgroundColor: "primary.300", color: "primary.100" }} 
                isDisabled={service.status !== 'Confirmado'}
                onClick={() => createAttendance()}
                size={"sm"}
              >
                Iniciar
              </Button>
              :service.status=="Andamento"?
              <Button 
              backgroundColor={"primary.500"}
              color="primary.300"
              size={"sm"}
              _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
              onClick={() => goToAttendace()}
            >
              Abrir
            </Button>
            :<Button 
            backgroundColor={"primary.500"}
            color="primary.300"
            size={"sm"}
            _hover={{ backgroundColor: "primary.300", color: "primary.100" }} 
            isDisabled={service.status == 'Concluido'||service.status == "Cancelado"}
          >
            Abrir
          </Button>}
            </Link>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
