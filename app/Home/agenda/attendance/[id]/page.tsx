"use client"
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useRef, useEffect, Attributes } from 'react';
import { format, differenceInHours, subDays, isSameDay } from "date-fns";
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
  DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, Drawer, DrawerOverlay, DrawerFooter, useDisclosure,
  TagLeftIcon
} from '@chakra-ui/react';
import AnexoUploader from '../components/AnexoUploades';
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/headers";
import { CheckCircleIcon, WarningIcon, InfoOutlineIcon, AddIcon, ChevronRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import axios from "../../../../../utils/axiosConfig";
import { FormAnamnese, Form } from '../components/FormAnamneseModal';
import { Attendance } from '../components/Attendance';
import { AxiosError } from 'axios';
import { CardContraindication } from '../components/CardContraindication';
const statusColors: any = {
  Confirmado: 'primary.300',
  Concluido: '#2EB086',
  Cancelado: 'primary.600',
  Pendente: 'yellow.400',
  Andamento: 'primary.900'
};

export interface Pet {
  age: string;
  petname: string;
  weight: number;
  race: string;
  species: string;
  sex: string;
  castrated: boolean;
  contraindications: Contraindication[]
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
  description: string;
  dateapontted: Date;
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
export interface Contraindication {
  categoria: string;
  description: string;
  idcontraindication: string | null;
}

export interface AttendanceData {
  idattendance: string;
  idos: string,
  status: string;
  hipotese: string,
  haveanamnese: boolean;
  idform: string;
  conclusao: string,
  service: Service,
  pet: Pet;
  tutor: Tutor;
}

interface AnamneseValues {
  idattendance: string;
  formid: string;
  attributeid: string;
  optionid: string;
  valuetext: string;
  valuenumber: number;
  isselected: boolean;
}

const Atendimento = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const toast = useToast();
  const router = useRouter();
  const [files, setFiles] = useState<any[]>([]);
  const [exames, setExames] = useState<any[]>([]);
  const [comprovantespagamento, setComprovantePagamentos] = useState<any[]>([]);
  const [selectedButton, setSelectedButton] = useState<string>("Atendimento");
  const [selectFormAnamnese, setselectFormAnamnese] = useState<string>("");
  const [selectedForm, setSelectedForm] = useState<Form>();
  const [anamnesevalues, setanamnesevalues] = useState<AnamneseValues[]>([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({
    idattendance: '',
    idos: '',
    status: '',
    hipotese: '',
    conclusao: '',
    haveanamnese: false,
    idform: "",
    service: {
      category: '',
      title: '',
      priority: '',
      commnets: '',
      description: "",
      dateapontted: new Date,
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
      castrated: false,
      contraindications: [
        {
          idcontraindication: '',
          categoria: '',
          description: ''
        }
      ]
    },
    tutor: {
      name: '',
      email: '',
      number: null
    }
  });
  const [formValues, setFormValues] = useState<{ [key: string]: string | string[] }>({});
  const handleUpdateField = (field: string, value: any) => {
    setAttendanceData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  // Função para atualizar o estado formValues com os valores dos campos
  const handleChange = (idattribute: string, value: string | string[]) => {
    setSelectedForm((prevForm: Form | undefined) => {
      if (!prevForm) return prevForm;

      const updatedAttributes = prevForm.attributes.map((attribute) => {
        if (attribute.idattribute === idattribute) {
          // Verifica se é checkbox para permitir múltiplas seleções
          if (attribute.typeattribute === 'checkbox' && Array.isArray(value)) {
            const updatedOptions = attribute.options.map((option) => ({
              ...option,
              isselected: value.includes(option.value), // Marca `isselected` se o valor estiver no array `value`
            }));

            return {
              ...attribute,
              value, // Atualiza o valor do atributo checkbox
              options: updatedOptions,
            };
          } else {
            // Para select, seleciona apenas uma opção
            const updatedOptions = attribute.options.map((option) => ({
              ...option,
              isselected: option.value === value, // Marca `isselected` apenas para o valor selecionado
            }));

            return {
              ...attribute,
              value, // Atualiza o valor do atributo select
              options: updatedOptions,
            };
          }
        }
        return attribute;
      });

      return {
        ...prevForm,
        attributes: updatedAttributes,
      };
    });
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
      const response = await axios.get(`/Attendance`, {
        params: {
          "idattendance": id
        }
      });
      const data = response.data;
      if (data.status === 'confirmed') {
        setAttendanceData(data.data);
        if (data.data.haveanamnese) {
          fetchAnamnese(data.data.idattendance, data.data.idform);
        }
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

  const fetchAnamnese = async (idattendance: string, idform: string) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('Authorization');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
    try {
      const response = await axios.get(`/Form/Get/Anamnese`, {
        params: {
          "idattendance": idattendance,
          "idform": idform
        }
      });
      const data = response.data;
      if (data.status === 'confirmed') {
        setSelectedForm(data.data);
        setselectFormAnamnese(idform);
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
  }
  const saveAnamnese = async () => {
    if (selectedForm) {
      const anamneseValues = mapFormToAnamneseValues(selectedForm, attendanceData.idattendance);
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('Authorization');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      }
      const payload = {
        values: anamneseValues
      }
      try {
        const response = await axios.post(`/Form/Save/Anamnese`, payload);
        const data = response.data;
        if (data.status === 'confirmed') {
          toast({
            title: "Anamnese Salva",
            description: "Anamnese salva com sucesso",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
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
      } catch (error: any) {
        toast({
          title: "Erro",
          description: error.response.data.messageError,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(error)
      }
    }
  }

  const concludeAttendance = async () => {
    
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('Authorization');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
  
    // Monta o JSON a ser enviado
    const inputData = {
      idattendance: attendanceData.idattendance,
      idorderservice: attendanceData.idos,
      hipotese: attendanceData.hipotese,
      conclusao: attendanceData.conclusao,
    };
  
    // Monta o FormData e adiciona o JSON stringificado como 'inputdata'
    const formData = new FormData();
    formData.append('inputdata', JSON.stringify(inputData));
  
    try {
      const response = await axios.put(`/Attendance/Conclude`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const data = response.data;
      if (data.status === 'confirmed') {
        toast({
          title: "Concluído com sucesso",
          description: "O atendimento foi concluído.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/Home/agenda");
      } else {
        toast({
          title: "Erro na conclusão",
          description: "Não foi possível concluir o atendimento.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao concluir o atendimento.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const mapFormToAnamneseValues = (form: Form, idattendance: string): AnamneseValues[] => {
    const anamneseValues: AnamneseValues[] = [];

    form.attributes.forEach((attribute) => {
      if (attribute.typeattribute === 'text' || attribute.typeattribute === 'textarea') {
        // Mapeia campos de texto para AnamneseValues
        anamneseValues.push({
          idattendance,
          formid: form.idform,
          attributeid: attribute.idattribute,
          optionid: '', // Sem opção específica para texto
          valuetext: attribute.value as string,
          valuenumber: 0,
          isselected: false,
        });
      } else if (attribute.typeattribute === 'number') {
        // Mapeia campos numéricos para AnamneseValues
        anamneseValues.push({
          idattendance,
          formid: form.idform,
          attributeid: attribute.idattribute,
          optionid: '', // Sem opção específica para número
          valuetext: '',
          valuenumber: attribute.value as number,
          isselected: false,
        });
      } else if (attribute.typeattribute === 'select' || attribute.typeattribute === 'checkbox') {
        // Mapeia opções de seleção e checkbox para AnamneseValues
        attribute.options.forEach((option) => {
          anamneseValues.push({
            idattendance,
            formid: form.idform,
            attributeid: attribute.idattribute,
            optionid: option.idoption,
            valuetext: option.value,
            valuenumber: 0,
            isselected: Array.isArray(attribute.value)
              ? (attribute.value as string[]).includes(option.value)
              : option.isselected,
          });
        });
      }
    });

    return anamneseValues;
  };

  const selectForm = (idform: string, form: Form) => {
    setselectFormAnamnese(idform)
    setSelectedForm(form);
    onClose();
  }
  const unselectForm = () => {
    setselectFormAnamnese("")
    setSelectedForm(undefined);
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
      <Flex direction="column" backgroundColor={"primary.100"} height="calc(100vh - 40px)">
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <Box py="2" marginLeft={isCollapsed ? "60px" : "250px"} width={isCollapsed ? "calc(100% - 60px)" : "calc(100% - 250px)"} flex="1" borderRadius="md" position="relative">
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
            <Box width="22%" borderRadius="md" boxShadow="md" height="100%" zIndex={9} bg="white" mr="4">
              {/* Dados do Pet */}
              <Box mb="2" display={"flex"} flexDirection={"column"}>
                <Flex bgColor={"primary.200"} borderTopRadius={"md"} justifyContent={"center"} height={"80px"} >
                  <Box boxShadow={"md"} boxSize="80px" borderRadius="50%" overflow="hidden" mt="40px" >
                    <Image src="/petperfil.jpeg" alt={`Foto do pet ${attendanceData.pet.petname}`} borderRadius={"sm"} />
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
              <Text fontSize="md" fontWeight="bold" mb="2" mx={4} mt={"2"}>Contra indicações</Text>
              <Box p="2" bgColor="white" overflowY="auto" maxHeight={"132px"}>

               {attendanceData.pet.contraindications.map((contraindication)=><CardContraindication contraindication={contraindication}/>)}
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
              <Box display={"flex"} flexDirection={"column"} justifyContent={"start"} alignItems={"center"} width={"100%"} height={"80%"}>
                {selectedButton == "Atendimento" && (
                  <Attendance att={attendanceData} onFilesUpdate={handleFilesUpdate} conclude={concludeAttendance} handlefield={handleUpdateField}/>
                )}
                {selectedButton === 'Anamnese' && (
                  <>
                    {selectFormAnamnese !== "" ?
                      <Box height={"100%"} px={4} py={"2"}>
                        <Text fontWeight="bold" width={"25%"} bgColor={selectedForm?.color} color={"primary.100"} boxShadow={"md"} p={"2"} alignItems={"center"} textAlign={"center"} borderRadius={"md"} borderColor={"primary.100"} mb={"2"}>{selectedForm!.nameform}</Text>
                        <SimpleGrid columns={5} spacing={4}>
                          {selectedForm?.attributes.map((attribute) => (
                            <Box key={attribute.idattribute} mb={4}>
                              <FormControl>
                                <FormLabel bgColor={"white"} borderBottomColor={selectedForm!.color} fontWeight={"bold"} py={"1"} >{attribute.label}</FormLabel>

                                {attribute.typeattribute === 'text' && (
                                  <Input
                                    size="sm"
                                    focusBorderColor="primary.400"
                                    borderRadius={"md"}
                                    placeholder="Digite o texto"
                                    mt={2}
                                    value={attribute?.value || ''}
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
                                    value={attribute?.value || 0}
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
                                    value={attribute?.value || ''}
                                    onChange={(e) => handleChange(attribute.idattribute, e.target.value)}
                                  />
                                )}
                                {attribute.typeattribute === 'select' && (
                                  <Select
                                    focusBorderColor="primary.400"
                                    placeholder="Selecione uma opção"
                                    mt={2}
                                    size="sm"
                                    borderRadius="md"
                                    value={attribute.options.find((option) => option.isselected === true)?.value || ""}
                                    onChange={(e) => handleChange(attribute.idattribute, e.target.value)}
                                  >
                                    {attribute.options.map((option, optionIndex) => (
                                      <option key={option.idoption} value={option.value} selected={option.isselected}>
                                        {option.value}
                                      </option>
                                    ))}
                                  </Select>
                                )}
                                {attribute.typeattribute === 'checkbox' && (
                                  <Box mt={2}>
                                    {attribute.options.map((option, optionIndex) => (
                                      <FormControl key={option.idoption} display="flex">
                                        <Checkbox
                                          key={option.idoption}
                                          iconColor="primary.300"
                                          colorScheme="primary.100"
                                          value={option.value}
                                          isChecked={option.isselected}
                                          onChange={(e) => {
                                            const currentValues = Array.isArray(attribute.value) ? attribute.value : [];
                                            const newValue = e.target.checked
                                              ? [...currentValues, option.value]
                                              : currentValues.filter((val) => val !== option.value);
                                            handleChange(attribute.idattribute, newValue);
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
                          onClick={() => unselectForm()}
                          _hover={{ backgroundColor: "primary.600", color: "primary.100" }}
                          size={"sm"}
                        >
                          Cancelar
                        </Button>
                        <Button
                          backgroundColor={"primary.500"}
                          color="primary.300"
                          borderRadius={"md"}
                          boxShadow={"md"}
                          position={"absolute"}
                          right={"8"}
                          onClick={() => saveAnamnese()}
                          _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
                          size={"sm"}
                        >
                          Salvar
                        </Button>
                      </Box> :
                      <Box mt={"4"} borderStyle="dashed" borderWidth={"3px"} borderColor={"primary.300"} display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}
                        width={"50%"} height={"200px"} borderRadius={"md"} bgColor={"primary.500"} fontWeight={"bold"} color={"primary.300"} fontSize={"xl"}
                        cursor={"pointer"}
                        _hover={{ borderColor: "primary.300", borderStyle: "solid" }}
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
                        Adicionar Anamnese
                      </Box>}
                    <FormAnamnese isOpen={isOpen} onClose={onClose} selectform={selectForm} />
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