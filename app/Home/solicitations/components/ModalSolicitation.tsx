"use client";
import { format } from "date-fns";
import React, {useEffect,useState} from 'react';
import axios from '../../../../utils/axiosConfig';
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
  useToast,Circle
} from '@chakra-ui/react';
import { Service } from "../page";
import { CheckCircleIcon, WarningIcon, InfoOutlineIcon } from '@chakra-ui/icons';

interface member {
  name: string,
  email:string
}

export const ServiceDetailsModal: React.FC<{ isOpen: boolean, onClose: () => void, service: Service,typefromrequest:string,fetchservices: () => void }> = ({ isOpen, onClose, service,typefromrequest,fetchservices}) => {
  const toast = useToast();
  const [isCollaborator, setIsCollaborator] = useState(false);
  const [emailUserAttendance,setEmailUserAttendance] = useState("");
  const [members, setmembers] = useState<member[]>([]);

  useEffect(() => {
    const userType = localStorage.getItem('typeuser')
    if(isCollaborator==false||isCollaborator == true&&typefromrequest=="NetWork"){
      fetchUsers();
    }
    if (userType === 'Collaborator') {
      setIsCollaborator(true);
    }
  }, []);

  const fetchUsers = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Authorization");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }

    try {
      const response = await axios.get(`/NetWork/Members`,{
          params:{
            "idos":service.idos
          }});
      const data = response.data
      setmembers(data);
    
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return 'primary.300';
      case 'Concluído':
        return '#57CC99';
      case 'Cancelado':
        return 'primary.600';
      case 'Pendente':
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
      case 'Concluído':
        return <CheckCircleIcon color={getStatusColor(status)} boxSize={"4"} />;
      case 'Cancelado':
        return <WarningIcon color={getStatusColor(status)} boxSize={"4"} />;
      default:
        return null;
    }
  };

  const handleReject = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Authorization");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
    try {
      await axios.put(`/OrderService/Reject`, null, {
        params: {
          idos: service.idos,
        },
      });
      toast({
        title: 'Serviço rejeitado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Fecha o modal após a ação
    } catch (error) {
      toast({
        title: 'Erro ao rejeitar o serviço.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Erro ao rejeitar o serviço:', error);
      console.log(service.idos)
    }
  };

    const MemberSelect = (event:any) => {
      setEmailUserAttendance(event.target.value); 
    }

  const handleAccept = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Authorization");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
    try {
      if(emailUserAttendance==""&&typefromrequest=="User"){
        let emailuser = localStorage.getItem("emailuser")!.toString();
        setEmailUserAttendance(emailuser);
        console.log(emailUserAttendance)
      }
      await axios.put(`/OrderService/Accept`, null, {
        params: {
          idos: service.idos,
          emailuserattendance: emailUserAttendance
        },
      });
      toast({
        title: 'Serviço aceito com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Fecha o modal após a ação
    } catch (error: any) {
      toast({
        title: 'Erro ao aceitar o serviço.',
        description: error.response?.data?.messageError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Erro ao aceitar o serviço:', error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth={"640px"} >
      <ModalHeader >
          <Flex align="center" justify="start" width="100%">
            
            <Text ml={0} bgColor={"white"} fontSize="sm" fontWeight="bold"   color={"primary.200"} border={"1px"} borderColor={"gray.200"} boxShadow={"md"} borderRadius={"md"} p={"2"}>Rede - {service.nameuserowner}</Text>
            
            <Flex align="center" ml={4}>
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
            <Flex align="start" mb={4}>
              <Box boxSize="100px" borderRadius="full" overflow="hidden" mr={4}>
                <Image src="https://avatars.githubusercontent.com/u/96667690?s=400&u=4f8546bf37989b834e06c9f8537efde6fddc1312&v=4" alt="Tutor Image" />
              </Box>
              <Box>
              <Text fontSize="md" fontWeight="bold" display={"flex"} flexDirection={"row"} textAlign={"center"} alignItems={"center"}>Tutor <Text bgColor={"white"} p={1} borderLeftWidth={"7px"} borderRadius={"md"} borderLeftColor={getPriorityColor(service.priority)} boxShadow={"md"} fontSize={"xs"} ml={2} color={getPriorityColor(service.priority)}>{service.priority}</Text></Text>
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
                <Text><strong>Raça:</strong></Text>
                <Text>{service.petBreed}</Text>
              </Box>
              <Box flex="1" pr={4}>
                <Text><strong>Espécie:</strong></Text>
                <Text>{service.petSpecies}</Text>
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
                <Text whiteSpace="nowrap">{service.petAge}</Text>
              </Box>
             
            </Flex>
            <Text fontSize="md" fontWeight="bold">Comentário do Tutor</Text>
            <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} mb={4}>
              <Text>{service.clientComment}</Text>
            </Box>
          </Box>

          <VStack align="start" spacing={4} mt={4} width="100%"  >
            <Text fontSize="lg" fontWeight="bold" mb={2}>Serviço - {service.title}</Text>
            <Flex wrap="wrap" width="100%">
              <Box flex="1" pr={0}>
                <Text><strong>Preço:</strong></Text>
                <Text >{service.servicePrice}</Text>
              </Box>
              <Box flex="1" pr={1} ml= {"-10"}>
                <Text><strong>Horário:</strong></Text>
                <Text>{format(service.date, "HH:mm")}</Text>
              </Box>
              <Box flex="1" pr={1} ml= {"-8"}>
                <Text><strong>Atendimento:</strong></Text>
                <Text >{service.attendancemodel}</Text>
              </Box>
              
             
              <Box flex="1" pr={1}>
                <Text><strong>Vacinas:</strong></Text>
                <Select placeholder="vacina" size="sm" isReadOnly focusBorderColor='primary.300' color={"primary.200"}>
                  {service.vaccines.map((vaccine) => (
                    <option key={vaccine.idvaccine} value={vaccine.idvaccine} >
                      {vaccine.nameofvaccine} - {vaccine.price}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box flex="1" pr={1}>
                <Text><strong>Subcategorias:</strong></Text>
                <Select placeholder="subcategoria" size="sm" isReadOnly focusBorderColor='primary.300' color={"primary.200"} >
                  {service.subcategories.map((subcategory) => (
                    <option key={subcategory.idsubcategory} value={subcategory.idsubcategory}>
                      {subcategory.title} - {subcategory.price}
                    </option>
                  ))}
                </Select>
              </Box>
              {isCollaborator==true&&typefromrequest=="NetWork"?<Box flex="1" pr={0}>
              <Text><strong>Atribuir a:</strong></Text>
              <Select placeholder="Membro" size="sm" isReadOnly focusBorderColor='primary.300' color={"primary.200"} onChange={MemberSelect}>
                  {members.map((member) => (
                    <option key={member.email} value={member.email}>
                      {member.name}
                    </option>
                  ))}
                </Select>
              </Box>:isCollaborator==false?<Box flex="1" pr={0}>
              <Text><strong>Atribuir a:</strong></Text>
              <Select placeholder="Membro" size="sm" isReadOnly focusBorderColor='primary.300' color={"primary.200"} onChange={MemberSelect}>
                  {members.map((member) => (
                    <option key={member.email} value={member.email}>
                      {member.name}
                    </option>
                  ))}
                </Select>
              </Box>:null}
            </Flex>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Flex width="100%" justify="space-between">
            <Button 
            fontWeight={"bold"}
            size={"sm"}
              color={"primary.600"}
              backgroundColor={"primary.650"} 
              onClick={handleReject}
              isDisabled={service.status !== 'Pendente'}
              _hover={{ backgroundColor: "primary.600", color: "primary.100" }}>
              Rejeitar
            </Button>
            <Button 
            fontWeight={"bold"}
              backgroundColor={"primary.500"}
              color="primary.300"
              _hover={{ backgroundColor: "primary.300", color: "primary.100" }} 
              isDisabled={service.status !== 'Pendente'} 
              onClick={handleAccept}
              size={"sm"}
            >
              Aceitar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
