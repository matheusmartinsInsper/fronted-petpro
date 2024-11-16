"use client";
import { useRouter } from 'next/router';
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
  Circle,
  Input,
  RadioGroup,
  Stack,
  Radio,
  HStack,
  FormLabel,
  FormControl,
  Checkbox
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon, InfoOutlineIcon,CheckIcon  } from '@chakra-ui/icons';
import axios from "../../../../utils/axiosConfig"
import { color } from 'framer-motion';
import {ServiceRow} from "./ServiceRow"

interface User {
    email: string;
    password: string;
    name: string;
  }
  
  interface Pet {
    dateborn: string; // Consider using Date type if you plan to handle it as a date
    petname: string;
    weight: number;
    race: string;
    species: string;
    sex: string;
    castrated: boolean;
  }
  
  interface Order {
    idservice: string;
    comments: string;
    dateappointed: string; // Consider using Date type if you plan to handle it as a date
    attendancemodel: string;
    priority: string;
    idsubcategories: string[]; // Assuming these are IDs, adjust type as needed
    idvaccines: string[]; // Assuming these are IDs, adjust type as needed
  }
  
  interface Payload {
    user: User;
    pet: Pet;
    order: Order;
  }
  

interface Subcategory {
    title: string;
    price: number;
    idsubcategory: string;
    idservice: string;
  }
  interface VaccineDbDTO {
    nameofvaccine?: string;
    codevaccine?: string;
    idservice: string;
    price?: number;
    idvaccine: string;
  }
  
export  interface Service {
    idDoServiço: string;
    nomeDoServiço: string;
    titulo: string;
    descrição: string;
    preço: number;
    vacinas: VaccineDbDTO[];
    subcategorias: Subcategory[];
    atendimento: string[]
  }

export const ModalAgenda: React.FC<{ isOpen: boolean, onClose: () => void,toggleStateapi: string }> = ({ isOpen, onClose,toggleStateapi }) => {

  const toast = useToast();
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [service, setService] = useState<Service>();
  const [idvaccines,setidvaccines] = useState<string[]>([])
  const [idsubcategories,setidsubcategories] = useState<string[]>([])
  const [payload, setPayload] = useState<Payload>({
    user: {
      email: '',
      password: '',
      name: '',
    },
    pet: {
      dateborn: '',
      petname: '',
      weight: 0,
      race: '',
      species: '',
      sex: '',
      castrated: false,
    },
    order: {
      idservice: '',
      comments: '',
      dateappointed: '',
      attendancemodel: '',
      priority: '',
      idsubcategories: [],
      idvaccines: [],
    },
  });

 

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
          subcategorias: service.subcategorias,
          atendimento: service.atendimento
        }));
        setServices(formattedServices);
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
 
  const saveorder = async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('Authorization');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
      
    try {
      const response = await axios.post(`/OrderService/Manually`,payload); 
      toast({
        title: "Agendado",
        description: "Agendamento salvo com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      toast({
        title: "Erro ao agendar",
        description: "Erro ao agendar serviço do cliente",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value,
      },
    }));
  };
  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      order: {
        ...prev.order,
        [name]: value,
      },
    }));
  }
  // Função para adicionar ID de subcategoria
const handleSubcategorySelect = (id: string) => {
    setPayload((prev) => ({
      ...prev,
      order: {
        ...prev.order,
        idsubcategories: [...prev.order.idsubcategories, id],
      },
    }));
    setSelectedSubcategories((prev) => {
        if (prev.includes(id)) {
          // Remove o ID se já estiver selecionado
          return prev.filter(subcategoryId => subcategoryId !== id);
        } else {
          // Adiciona o ID se não estiver selecionado
          return [...prev, id];
        }
      });
  };
  
  // Função para adicionar ID de vacina
  const handleVaccineSelect = (id: string) => {
    setPayload((prev) => {
        if(prev.order.idvaccines.includes(id)){
            return ({
                ...prev,
                order: {
                  ...prev.order,
                  idvaccines: prev.order.idvaccines.filter(vaccineId => vaccineId !== id)
                },
              })  
        }else{
          return  ({
            ...prev,
            order: {
              ...prev.order,
              idvaccines: [...prev.order.idvaccines, id],
            },
          })
        }
       });
    setSelectedVaccines((prev) => {
        if (prev.includes(id)) {
          return prev.filter(vaccineId => vaccineId !== id);
        } else {
          return [...prev, id];
        }
      });
  };
  

  const handlePetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'castrated') {
      setPayload((prev) => ({
        ...prev,
        pet: {
          ...prev.pet,
          castrated: value === 'sim',
        },
      }));
    } else {
      setPayload((prev) => ({
        ...prev,
        pet: {
          ...prev.pet,
          [name]: value,
        },
      }));
    }
  };

  const [step, setStep] = useState(1); 

  const handleNextStep = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };
  const selectservice = (service: Service): void => {
    setService(service)
    setPayload((prev) => ({
        ...prev,
        order: {
          ...prev.order,
          idservice: service.idDoServiço,
        },
      }));
  }
  const selectids = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPayload((prev) => ({
        ...prev,
        order: { ...prev.order, attendancemodel: e.target.value}
      }))
  }
  const unselectservice = () => {
    setSelectedSubcategories([]);
    setSelectedVaccines([])
    payload.order.idsubcategories = [];
    payload.order.idvaccines = []
    setService(undefined);
    
  }
  return  (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth={"620px"}>
        <ModalHeader>
          <Flex align="center" justify="start" width="100%">
            <Text fontSize="lg" fontWeight="bold">
              Agendamento
            </Text>
          </Flex>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          {step === 1 ? (
          <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} width={"100%"} boxShadow={"md"}>
          <Text borderTopRadius={"sm"} fontSize="sm" fontWeight="bold" p="2" mb={2} borderBottom={"2px"} borderBottomColor={"primary.300"} bgColor={"primary.500"} color={"primary.200"}>Dados do Tutor</Text>
          <Flex wrap="wrap" justify="space-between" mb={4}>
            <Box flex="1" pr={4}>
              <Text fontSize={"sm"} fontWeight={"bold"}>Nome</Text>
              <Input
              name='name'
              placeholder="Jose"
              size="sm"
              mr="4"
              focusBorderColor="primary.400"
              borderRadius={"md"}
              onChange={handleUserChange}
            />
            </Box>
            <Box flex="1" pr={4}>
              <Text fontSize={"sm"} fontWeight={"bold"}><strong>Email:</strong></Text>
              <Input
               name='email'
              placeholder="Jose@gmail.com"
              size="sm"
              mr="4"
              focusBorderColor="primary.400"
              borderRadius={"md"}
              onChange={handleUserChange}
            />
            </Box>
            <Box flex="1" pr={4}>
              <Text fontSize={"sm"} fontWeight={"bold"}><strong>Senha:</strong></Text>
              <Input
               name='password'
              placeholder="*******"
              size="sm"
              mr="4"
              focusBorderColor="primary.400"
              borderRadius={"md"}
              onChange={handleUserChange}
            />
            </Box>
          </Flex>
        
          <Text borderTopRadius={"sm"} fontSize="sm" fontWeight="bold" p="2" mb={2} borderBottom={"2px"} borderBottomColor={"primary.300"} bgColor={"primary.500"} color={"primary.200"}>Dados do Pet</Text>
          <Flex wrap="wrap" justify="space-between">
  <Box flex="0 0 48%" pr={4} mb={4}> {/* 1ª linha, 1º campo */}
    <Text fontSize={"sm"} fontWeight={"bold"}><strong>Pet:</strong></Text>
    <Input
     name='petname'
              placeholder="Miau"
              size="sm"
              mr="4"
              focusBorderColor="primary.400"
              borderRadius={"md"}
              onChange={handlePetChange}
            />
  </Box>
  <Box flex="0 0 48%" pr={4} mb={4}> {/* 1ª linha, 2º campo */}
    <Text fontSize={"sm"} fontWeight={"bold"}><strong>Espécie:</strong></Text>
    <Select  name='species' placeholder="Selecione" size="sm" borderRadius={"md"} focusBorderColor='primary.300' color={"primary.200"}  onChange={handlePetChange}>
      <option value="Felina">Felina</option>
      <option value="Canina">Canina</option>
    </Select>
  </Box>
  
  <Box flex="0 0 48%" pr={4} mb={4}> {/* 2ª linha, 1º campo */}
    <Text fontSize={"sm"} fontWeight={"bold"}><strong>Raça:</strong></Text>
    <Input
     name='race'
              placeholder="Buldogue"
              size="sm"
              mr="4"
              focusBorderColor="primary.400"
              borderRadius={"md"}
              onChange={handlePetChange}
            />
  </Box>
  <Box flex="0 0 48%" pr={4} mb={4}> {/* 2ª linha, 2º campo */}
    <Text fontSize={"sm"} fontWeight={"bold"}><strong>Castrado:</strong></Text>
    <Select  name='castrated' placeholder="Selecione" size="sm" borderRadius={"md"} focusBorderColor='primary.300' color={"primary.200"}>
      <option value="sim">Sim</option>
      <option value="nao">Não</option>
    </Select>
  </Box>
  
  <Box flex="0 0 48%" pr={4} mb={4}> {/* 3ª linha, 1º campo */}
    <Text fontSize={"sm"} fontWeight={"bold"}><strong>Peso:</strong></Text>
    <Input
     name='weight'
              placeholder="2kg"
              size="sm"
              mr="4"
              focusBorderColor="primary.400"
              borderRadius={"md"}
              type='number'
              onChange={handlePetChange}
            />
  </Box>
  <Box flex="0 0 48%" mb={4} pr="4"> {/* 3ª linha, 2º campo */}
  <Text fontSize={"sm"} fontWeight={"bold"}><strong>Sexo:</strong></Text>
    <Select  name='sex' placeholder="Selecione" size="sm" borderRadius={"md"} focusBorderColor='primary.300' color={"primary.200"}  onChange={handlePetChange}>
      <option value="Macho">Macho</option>
      <option value="Femea">Femea</option>
    </Select>
  </Box>
<Box flex="0 0 48%" mb={4} pr={4}> {/* 3ª linha, 2º campo */}
  <Text fontSize={"sm"} fontWeight={"bold"}><strong>Data de nascimento:</strong></Text>
  <Input   name='dateborn'  onChange={handlePetChange} focusBorderColor='primary.300' color={"primary.200"} type="date" placeholder="Selecione a data" fontSize={"sm"} size={"sm"} borderRadius={"md"}/>
</Box>
<Flex justify="flex-end" mt={4} pr={4}>
            <Button _hover={{ backgroundColor: "primary.300", color: "primary.100" }} colorScheme="blue" onClick={handleNextStep} bgColor={"white"} size={"sm"} color={"primary.200"} boxShadow={"md"}>
              Próximo
            </Button>
          </Flex>
</Flex>  
</Box>
        
          ) : (
            <Box width="100%" p={4}>

  <Flex mt={4}>
    {/* Coluna da esquerda com as seções */}
    <Box width="30%" pr={4} maxHeight={"350"}>
      {/* Seção dos Botões de Rádio */}
      <Text fontWeight="bold" mb={2} fontSize={"sm"}>Prioridade:</Text>
      <RadioGroup onChange={(value) => setPayload((prev) => ({
    ...prev,
    order: { ...prev.order, priority: value }
  }))}>
        <HStack spacing={4}>
          <Radio _focus={{ boxShadow: "none" }} value="Não urgente" borderColor={"primary.1100"} _checked={{ backgroundColor: "primary.1100", color: "white", borderColor: "primary.1100"}}/>
          <Radio _focus={{ boxShadow: "none" }} value="Pouco urgente" borderColor={"primary.800"} _checked={{ backgroundColor: "primary.800", color: "white", borderColor: "primary.800"}}/>
          <Radio _focus={{ boxShadow: "none" }} value="Urgente" borderColor={"primary.900"} _checked={{ backgroundColor: "primary.900", color: "white", borderColor: "primary.900"}}/>
          <Radio _focus={{ boxShadow: "none" }} value="Muito urgente" borderColor={"primary.1000"} _checked={{ backgroundColor: "primary.1000", color: "white", borderColor: "primary.1000"}}/>
          <Radio _focus={{ boxShadow: "none" }} value="Emergencia" borderColor={"primary.600"} _checked={{ backgroundColor: "primary.600", color: "white", borderColor: "primary.600"}}/>
        </HStack>
      </RadioGroup>
      <FormControl mb="4" mt={"4"}>
                  <FormLabel fontWeight="bold" fontSize={"sm"}>Atendimento:</FormLabel>
                  <Stack spacing="2">
                    <Checkbox value={"Online"} onChange={selectids} _focus={{ boxShadow: "none" }}   iconColor="primary.300" colorScheme="primary.100" _selected={{ color: "primary.300" }} size={"sm"}>Online</Checkbox>
                    <Checkbox value={"Domiciliar"} onChange={selectids} _focus={{ boxShadow: "none" }} iconColor="primary.300" colorScheme="primary.100" size={"sm"}>Domiciliar</Checkbox>
                    <Checkbox value={"Presencial"} onChange={selectids} _focus={{ boxShadow: "none" }} iconColor="primary.300" colorScheme="primary.100" size={"sm"}>Presencial</Checkbox>
                  </Stack>
                </FormControl>

      {/* Seção para Selecionar Data */}
      <Text fontWeight="bold" mt={4} mb={2} fontSize={"sm"}>Agendar para:</Text>
      <Input  type="datetime-local" placeholder="Escolha a data"  size="sm"
              mr="4"
              name="dateappointed"
              focusBorderColor="primary.400"
              borderRadius={"md"}
              onChange={handleOrderChange}/>
      {/* Seção para Comentário */}
      <Text fontWeight="bold" mt={4} mb={2} fontSize={"sm"}>Comentário:</Text>
      <Input placeholder="Digite seu comentário"  size="sm"
              mr="4"
              focusBorderColor="primary.400"
              borderRadius={"md"}
              name="comments"
              onChange={handleOrderChange}/>
    </Box>

    {/* Coluna da direita com a box em branco */}
    <Box width="70%" border="1px" borderColor="gray.200" borderRadius="md" p={2} overflowY={"auto"}  maxHeight="350px" >
        <Text fontSize={"sm"} fontWeight={"bold"} mb="2" bgColor={"primary.250"} borderTopRadius={"md"} p={"2"} borderBottomWidth={"2px"} borderBottomColor={"primary.250"} color={"primary.100"}>Serviços</Text>
      {service != undefined ?(
        <Box>
            <Flex direction={"row"} justifyContent={"space-between"} fontSize={"sm"} mb="2">
            <Box><Text fontSize={"sm"} fontWeight={"bold"}>Categoria</Text><Text>{service.nomeDoServiço}</Text></Box>
            <Box><Text fontSize={"sm"} fontWeight={"bold"}>Titulo</Text><Text>{service.titulo}</Text></Box>
            
            </Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>Atendimento</Text>
            <Flex direction={"row"} >
            {service.atendimento.map((modelo,index)=>(<Box key={index} display={"flex"} flexDirection={"row"} alignItems={"center"}><CheckIcon mr={"2"} boxSize={"10px"} color={"primary.300"}/><Text fontSize={"sm"} mr="4">{modelo}</Text></Box>))}
            </Flex>
           
            
            {service.vacinas.map((vacina,index)=><Text key={vacina.idvaccine} display={"flex"} flexDirection={"row"} alignItems={"center"} fontWeight={"bold"} bgColor={selectedVaccines.includes(vacina.idvaccine) ? "primary.500" : "transparent"} ml={selectedVaccines.includes(vacina.idvaccine) ? "4" : "0"}  fontSize={"xs"} maxWidth={"75%"} _hover={{ml:"4"}} my="2" cursor={"pointer"} border={"2px"} borderColor={selectedVaccines.includes(vacina.idvaccine) ? "primary.300" : "primary.100"}  boxShadow={"md"} p={2} borderRadius={"md"} onClick={() => handleVaccineSelect(vacina.idvaccine)}>
                {vacina.nameofvaccine} - <Text ml={"1"} textAlign={"center"} minWidth={"50px"} fontWeight={"bold"}  fontSize={"xs"}
                    backgroundColor={"#D5FFE4"} 
                     p={"1"} 
                     borderRadius={"5px"} 
                     color={"#2EB086"}>{vacina.price}R$</Text>
                </Text>)}
            {service.subcategorias.map((subcategoria,index)=><Text key={subcategoria.idsubcategory} display={"flex"} flexDirection={"row"} alignItems={"center"} fontWeight={"bold"}  bgColor={selectedSubcategories.includes(subcategoria.idsubcategory) ? "primary.500" : "transparent"} ml={selectedSubcategories.includes(subcategoria.idsubcategory) ? "4" : "0"} fontSize={"xs"} maxWidth={"75%"} _hover={{ml:"4"}} my="2" cursor={"pointer"} border={"2px"} borderColor={selectedSubcategories.includes(subcategoria.idsubcategory) ? "primary.300" : "primary.100"} boxShadow={"md"} p={2} borderRadius={"md"} onClick={() => handleSubcategorySelect(subcategoria.idsubcategory)}>
                {subcategoria.title} - <Text ml={"1"} textAlign={"center"} minWidth={"50px"} fontWeight={"bold"}  fontSize={"xs"}
                    backgroundColor={"#D5FFE4"} 
                     p={"1"} 
                     borderRadius={"5px"} 
                     color={"#2EB086"}>{subcategoria.price}R$</Text> 
                </Text>)}

            <Box><Text fontSize={"sm"} mt={"2"} fontWeight={"bold"}>Descrição</Text><Text>{service.descrição}</Text></Box>
            <Button mt={4} bgColor={"white"} size={"sm"} color={"primary.200"} boxShadow={"md"} _hover={{ backgroundColor: "primary.600", color: "primary.100" }} onClick={unselectservice}>Cancelar</Button>
        </Box>
      ):  services.map((service,index)=><ServiceRow idservice={service.idDoServiço} service={service} selectservice={selectservice}/>)}
    </Box>
  </Flex>
</Box>

          
          )}
        </ModalBody>
        <ModalFooter>
          <Flex width="100%" justify="space-between">
            {step === 2 && (
                <>
                <Button bgColor={"white"} size={"sm"} color={"primary.200"} boxShadow={"md"} _hover={{ backgroundColor: "primary.300", color: "primary.100" }} onClick={handleBack} >
                Voltar
              </Button>
               <Link>
               <Button
                 backgroundColor={"primary.500"}
                 color="primary.300"
                 size={"sm"}
                 _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
                 onClick={()=>{saveorder()}}
               >
                 Agendar
               </Button>
             </Link>
                </>
              
            )}
           
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
