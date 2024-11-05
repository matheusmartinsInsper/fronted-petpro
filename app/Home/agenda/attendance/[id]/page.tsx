"use client"
import { useRouter,useParams } from 'next/navigation';
import React, { useState, useRef,useEffect } from 'react';
import { format, differenceInHours ,subDays,isSameDay} from "date-fns";
import {
  Heading,
  Box,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  useToast,
  Image,
  SimpleGrid,
  Checkbox,
  DrawerBody,DrawerCloseButton,DrawerContent,DrawerHeader,Drawer,DrawerOverlay,DrawerFooter,useDisclosure,
  TagLeftIcon
} from '@chakra-ui/react';
import AnexoUploader from '../components/AnexoUploades';
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/headers";
import { CheckCircleIcon, WarningIcon, InfoOutlineIcon,AddIcon,ChevronRightIcon,ArrowLeftIcon } from '@chakra-ui/icons';
import axios from "../../../../../utils/axiosConfig";
import { FormAnamnese,Form } from '../components/FormAnamneseModal';
import { Attendance } from '../components/Attendance';
const statusColors: any = {
  Confirmado: 'primary.300',
  Concluido: '#2EB086',
  Cancelado: 'primary.600',
  Pendente : 'yellow.400',
  Andamento : 'primary.900'
};

interface Pet {
  age: string;
  petname: string;
  weight: number;
  race: string;
  species: string;
  sex: string;
  castrated: boolean;
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
  idservice?: string;
  price?: number;
  idvaccine?: string;
}
export interface Service {
  category: string;
  title: string;
  priority: string;
  commnets: string;
  description : string;
  dateapontted : Date;
  datesolicitation: Date;
  totalprice: number;
  waspaid: string;
  vacinas: VaccineDbDTO[];
  subcategorias: Subcategory[];
  atendimento: string
}

interface Tutor {
  name: string;
  email: string;
  number: string | null;
}

export interface AttendanceData {
  idattendance: string;
  status: string;
  hipotese: string,
  conclusao: string,
  service: Service,
  pet: Pet;
  tutor: Tutor;
}

const Atendimento = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { id } = useParams();
  const toast = useToast();
  const [files, setFiles] = useState<any[]>([]);
  const [exames, setExames] = useState<any[]>([]);
  const [comprovantespagamento, setComprovantePagamentos] = useState<any[]>([]);
  const [selectedButton, setSelectedButton] = useState<string>("Atendimento");
  const [selectFormAnamnese, setselectFormAnamnese] = useState<string>("");
  const [selectedForm, setSelectedForm] = useState<Form | null>(null); 
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({
    idattendance: '',
    status: '',
    hipotese: '',
    conclusao: '',
    service: {
      category: '',
      title: '',
      priority: '',
      commnets: '',
      description : "",
      dateapontted : new Date,
      datesolicitation: new Date,
      waspaid: "",
      totalprice: 0,
      vacinas: [
        {
          nameofvaccine: '',
          codevaccine: '',
          idservice: '',
          price: 0,
          idvaccine: ''
        }
      ],
      subcategorias: [
        {
          title: '',
          price: 0,
          idsubcategory: '',
          idservice: ''
        }
      ],
      atendimento: ""
    },
    pet: {
      age: '',
      petname: '',
      weight: 0,
      race: '',
      species: '',
      sex: '',
      castrated: false
    },
    tutor: {
      name: '',
      email: '',
      number: null
    }
  });
      const [formValues, setFormValues] = useState<{ [key: string]: string | string[] }>({});

      // Função para atualizar o estado formValues com os valores dos campos
      const handleChange = (id: string, value: string | string[]) => {
        setFormValues((prevValues) => ({
          ...prevValues,
          [id]: value,
        }));
      };
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }

  useEffect(() => {
    fetchAttendance();
  }, []);
  const fetchAttendance = async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('Authorization');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
    try {
      const response = await axios.get(`/Attendance`,{
        params:{
          "idattendance":id
        }
      });
      const data = response.data;
      if (data.status === 'confirmed') {
        setAttendanceData(data.data);
        console.log(response.data)
      } else {
        toast({
          title: "Serviço não encontrado",
          description: "O serviço solicitado não foi encontrado.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao carregar o serviço.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const selectForm = (idform: string,form: Form)=>{
    setselectFormAnamnese(idform)
    setSelectedForm(form);
    onClose();
  }
  const unselectForm = () =>{
    setselectFormAnamnese("")
  }
  const handleFilesUpdate = (updatedFiles: any[]) => {
    setFiles(updatedFiles);
  };
  const handleFilesExames = (updatedFiles: any[]) => {
    setExames(updatedFiles);
  };
  const handleFilesPayment = (updatedFiles: any[]) => {
    setComprovantePagamentos(updatedFiles);
  };
  const fileInputRefs = {
    Arquivos: useRef<HTMLInputElement | null>(null),
    Comprovantes: useRef<HTMLInputElement | null>(null),
    Exames: useRef<HTMLInputElement | null>(null),
  };

  const handleSave = () => {
    toast({
      title: "Atendimento salvo",
      description: "Os dados do atendimento foram salvos com sucesso.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  // const handleRemoveFile = (type: 'Arquivos' | 'Comprovantes' | 'Exames', index: number) => {
  //   const updatedFiles = service[type].filter((_, i) => i !== index);
  //   setService({ ...service, [type]: updatedFiles });
  // };

  // const handleAddFile = (type: 'Arquivos' | 'Comprovantes' | 'Exames', files: FileList) => {
  //   const newFiles = Array.from(files).map(file => file.name); // Simulação dos nomes dos arquivos
  //   setService({ ...service, [type]: [...service[type], ...newFiles] });
  // };

  const openFileDialog = (type: 'Arquivos' | 'Comprovantes' | 'Exames') => {
    if (fileInputRefs[type].current) {
      fileInputRefs[type].current.click();
    }
  };
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
    <Header />
    <Flex direction="column" backgroundColor={"primary.100"}  height="calc(100vh - 40px)">
    <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/>
      <Box  py="2" marginLeft={isCollapsed?"60px":"250px"} width={isCollapsed?"calc(100% - 60px)":"calc(100% - 250px)"}flex="1" borderRadius="md" position="relative">
      <Flex justify="space-between" align="center" mb="2" borderBottomColor="gray.200" borderBottomWidth="1px" pb="1" px="4" fontFamily="Nunito, sans-serif">
          <Box flexDirection="row" display="flex">
            <Heading as="h1" size="sm" color="primary.200" display="flex" flexDirection="row">
              <Text color="gray.500">
                Main Menu
                <ChevronRightIcon />
              </Text>
              <Text color="gray.500">
                Agenda
                <ChevronRightIcon />
              </Text>
              <Text color="primary.200">
                Atendimento
              </Text>
            </Heading>
          </Box>
        </Flex>
        <Flex direction="row" height="calc(100vh - 120px)" mx="4">
        <Box width="22%" borderRadius="md" boxShadow="md" height="100%" zIndex={9} bg="white"  mr="4">
  {/* Dados do Pet */}
  <Box  mb="2" display={"flex"} flexDirection={"column"}>
    <Flex bgColor={"primary.200"} borderTopRadius={"md"} justifyContent={"center"} height={"80px"} >
    <Box boxShadow={"md"} boxSize="80px" borderRadius="50%" overflow="hidden" mt="40px" >
    <Image   src="/petperfil.jpeg" alt={`Foto do pet ${attendanceData.pet.petname}`} borderRadius={"sm"}/>
    </Box>
    </Flex>
   
    <Box fontSize={"sm"} mt="4" px={"4"} pb={"2"} borderBottomColor={"primary.100"} borderBottomWidth={"2px"}>
  <Text display={"flex"} flexDirection={"column"} fontSize={"md"} fontWeight={"bold"} mb={"4"}>
    {attendanceData.pet.petname}
  </Text>
  
  <SimpleGrid columns={2} spacing={4}>
    <Box>
      <Text fontWeight="bold">Raça:</Text>
      <Text>{attendanceData.pet.race}</Text>
    </Box>
    <Box>
      <Text fontWeight="bold">Idade:</Text>
      <Text>{attendanceData.pet.age}</Text>
    </Box>
    <Box>
      <Text fontWeight="bold">Espécie:</Text>
      <Text>{attendanceData.pet.species}</Text>
    </Box>
    <Box>
      <Text fontWeight="bold">Castrado:</Text>
      <Text>{attendanceData.pet.castrated ? 'Sim' : 'Não'}</Text>
    </Box>
    <Box>
      <Text fontWeight="bold">Peso:</Text>
      <Text>{attendanceData.pet.weight} kg</Text>
    </Box>
    <Box>
      <Text fontWeight="bold">Sexo:</Text>
      <Text>{attendanceData.pet.sex}</Text>
    </Box>
  </SimpleGrid>
</Box>
   
  </Box>
  
  {/* Dados do Tutor */}
  <Box px="4" borderBottomColor={"primary.100"} borderBottomWidth={"2px"} pb={"2"}>
    <Text fontSize="md" fontWeight="bold" mb="2">Tutor</Text>
    <Box fontSize={"sm"}>
    <Text my={'1'}><strong>Nome:</strong> {attendanceData.tutor.name}</Text>
    <Text my={'1'}><strong>E-mail:</strong> {attendanceData.tutor.email}</Text>
    <Text my={'1'}><strong>Telefone:</strong> {attendanceData.tutor.number}</Text>
    </Box>
  </Box>
  <Text fontSize="md" fontWeight="bold" mb = "2" mx={4} mt={"2"}>Contra indicações</Text>
  <Box p="2"   bgColor="white"   
    overflowY="auto" maxHeight={"140px"}>
  
    <Box height={"120px"} mb={"4"} bgColor={"white"} fontSize={"sm"} border={"2px"} borderColor={"gray.200"} borderRadius={"md"} p = "2" >
    <Text fontSize={"xs"} mb="2">Contra Indicação</Text>
    <Text fontSize={"xs"}>Descrição<Text fontWeight={"bold"} fontSize={"xs"}> meu pet nao pode tomar banho com produto x</Text></Text>
    </Box>
    <Box height={"120px"}  bgColor={"white"} fontSize={"sm"} border={"2px"} borderColor={"gray.200"} borderRadius={"md"} p = "2" >
    <Text fontSize={"xs"} mb="2">Contra Indicação<Text fontWeight={"bold"} fontSize={"xs"}> Alergico a shampo x</Text></Text>
    <Text fontSize={"xs"}>Descrição<Text fontWeight={"bold"} fontSize={"xs"}> meu pet nao pode tomar banho com produto x</Text></Text>
    </Box> 
  </Box>
</Box>
          {/* Container do atendimento */}
        <Box width={"80%"} borderRadius="md" boxShadow="md" height="calc(100vh - 120px)" zIndex={9} bg="white">
        <Flex justify="space-between" align="center" mb="2" borderBottomColor="gray.200" borderBottomWidth="1px" px="4" fontFamily="Nunito, sans-serif">
          <Box flexDirection="row" display="flex">
            <Heading as="h1" size="sm" color="primary.200" display="flex" flexDirection="row">
              <Button 
              size="sm"
              onClick={() => handleButtonClick('Atendimento')}
              bg="white"
              color="primary.200"
              boxShadow={selectedButton === 'Atendimento' ? 'md' : 'none'}
              _hover={{ bg: 'primary.100' }}
              fontWeight="bold" mr={"4"}>Atendimento</Button>
                <Button 
              size="sm"
              onClick={() => handleButtonClick('Anamnese')}
              bg="white"
              color="primary.200"
              boxShadow={selectedButton === 'Anamnese' ? 'md' : 'none'}
              _hover={{ bg: 'primary.100' }}
              fontWeight="bold" mr={"4"}>Anamnese</Button>
                <Button 
              size="sm"
              onClick={() => handleButtonClick('Prescrição')}
              bg="white"
              color="primary.200"
              boxShadow={selectedButton === 'Prescrição' ? 'md' : 'none'}
              _hover={{ bg: 'primary.100' }}
              fontWeight="bold" mr={"4"}>Prescrição</Button>
               <Button 
              size="sm"
              onClick={() => handleButtonClick('Protocolo')}
              bg="white"
              color="primary.200"
              boxShadow={selectedButton === 'Protocolo' ? 'md' : 'none'}
              _hover={{ bg: 'primary.100' }}
              fontWeight="bold" mr={"4"}>Protocolo</Button>
              <Button 
              size="sm"
              onClick={() => handleButtonClick('Pagamentos')}
              bg="white"
              color="primary.200"
              boxShadow={selectedButton === 'Pagamentos' ? 'md' : 'none'}
              _hover={{ bg: 'primary.100' }}
              fontWeight="bold" mr={"4"}>Pagamentos</Button>
               <Button 
              size="sm"
              onClick={() => handleButtonClick('Retorno')}
              bg="white"
              color="primary.200"
              boxShadow={selectedButton === 'Retorno' ? 'md' : 'none'}
              _hover={{ bg: 'primary.100' }}
              fontWeight="bold" mr={"4"}>Retorno</Button>
            </Heading>
          </Box>
        </Flex>
        <Box display={"flex"} flexDirection={"column"}  justifyContent={"start"} alignItems={"center"} width={"100%"} height={"80%"}>
        {selectedButton == "Atendimento" && (
          <Attendance att={attendanceData} onFilesUpdate={handleFilesUpdate}/>
        )}
        {selectedButton === 'Anamnese' && (
        <>
        {selectFormAnamnese !== ""?
        <Box height={"100%"} px={4} py={"2"}>
           <Text fontWeight="bold" width={"25%"} bgColor={selectedForm?.color} color={"primary.100"}  boxShadow={"md"} p={"2"} alignItems={"center"} textAlign={"center"} borderRadius={"md"}  borderColor={"primary.100"} mb={"2"}>{selectedForm!.nameform}</Text>
          <SimpleGrid columns={5} spacing={4}>
            {selectedForm!.attributes.map((attribute) => (
              <Box key={attribute.idattribute} mb={4}>
                <FormControl>
                  <FormLabel bgColor={"white"}  borderBottomColor={selectedForm!.color} fontWeight={"bold"}  py={"1"} >{attribute.label}</FormLabel>

                  {attribute.typeattribute === 'text' && (
                    <Input
                      size="sm"
                      focusBorderColor="primary.400"
                      borderRadius={"md"}
                      placeholder="Digite o texto"
                      mt={2}
                      value={formValues[attribute.idattribute] || ''}
                      onChange={(e) => handleChange(attribute.idattribute, e.target.value)}
                    />
                  )}
                  {attribute.typeattribute === 'number' && (
                    <Input
                      size="sm"
                      focusBorderColor="primary.400"
                      borderRadius={"md"}
                      type="number"
                      placeholder="Digite um número"
                      mt={2}
                      value={formValues[attribute.idattribute] || ''}
                      onChange={(e) => handleChange(attribute.idattribute, e.target.value)}
                    />
                  )}
                  {attribute.typeattribute === 'textarea' && (
                    <Textarea
                      size="sm"
                      focusBorderColor="primary.400"
                      borderRadius={"md"}
                      placeholder="Digite seu texto"
                      mt={2}
                      value={formValues[attribute.idattribute] || ''}
                      onChange={(e) => handleChange(attribute.idattribute, e.target.value)}
                    />
                  )}
                  {attribute.typeattribute === 'select' && (
                    <Select focusBorderColor="primary.400" placeholder="Selecione uma opção" mt={2} size={"sm"} borderRadius={"md"}
                    value={formValues[attribute.idattribute] || ''}
                    onChange={(e) => handleChange(attribute.idattribute, e.target.value)}>
                      {attribute.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </Select>
                  )}
                  {attribute.typeattribute === 'checkbox' && (
                     <Box mt={2}>
                     {attribute.options?.map((option, optionIndex) => (
                       <FormControl key={optionIndex} display="flex">
                          <Checkbox
                        iconColor="primary.300"
                        colorScheme="primary.100"
                        value={option.value}
                        isChecked={(formValues[attribute.idattribute] as string[])?.includes(option.value) || false}
                        onChange={(e) => {
                          const currentValues = (formValues[attribute.idattribute] || []) as string[];
                          handleChange(
                            attribute.idattribute,
                            e.target.checked
                              ? [...currentValues, option.value]
                              : currentValues.filter((val) => val !== option.value)
                          );
                        }}
                      >
                           {option.value}
                         </Checkbox>
                       </FormControl>
                     ))}
                   </Box>
                  )}
                </FormControl>
              </Box>
            ))}
          </SimpleGrid>
          <Button
          backgroundColor={"white"}
          color="primary.200"
          borderRadius={"md"}
          boxShadow={"md"}
          onClick={()=>unselectForm()}
          _hover={{ backgroundColor: "primary.600", color: "primary.100" }}
          size={"sm"}
           >
            Cancelar
           </Button>
        </Box>:
         <Box mt={"4"} borderWidth={"2px"} borderColor={"primary.500"} display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} 
         width={"50%"} height={"200px"} borderRadius={"md"}  bgColor={"primary.500"} fontWeight={"bold"} color={"primary.300"} fontSize={"xl"}
         cursor={"pointer"}
         _hover={{borderColor:"primary.300"}}
         onClick={onOpen}>
          <Button
          leftIcon={<AddIcon />}
          backgroundColor={"primary.500"}
          color="primary.300"
          boxSize='40px'
          borderRadius={"50%"}
          _hover={{ backgroundColor: "primary.500", color: "primary.300" }}
          size={"lg"}
           />
          Adicionar anamnese
        </Box>}
        <FormAnamnese isOpen={isOpen} onClose={onClose} selectform={selectForm}/>
        </>
        )}
        </Box>
        
          </Box>
        </Flex>
      </Box>
    </Flex>
    </>
    
  );
};

export default Atendimento;