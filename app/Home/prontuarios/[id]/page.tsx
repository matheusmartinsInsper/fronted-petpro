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
    TagLeftIcon, IconButton
} from '@chakra-ui/react';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/headers";
import { CheckCircleIcon, WarningIcon, InfoOutlineIcon, AddIcon, ChevronRightIcon, ArrowLeftIcon, SearchIcon } from '@chakra-ui/icons';
import axios from "../../../../utils/axiosConfig";
import { AxiosError } from 'axios';
import CardContraindication from '../../agenda/attendance/components/CardContraindication';
import { Orderprontuario } from "../components/Order"
const statusColors: any = {
    Confirmado: 'primary.300',
    Concluido: '#2EB086',
    Cancelado: 'primary.600',
    Pendente: 'yellow.400',
    Andamento: 'primary.900'
};

interface Prontuario {
    idprontuario: string;
    datecreate: string;
    tutor: {
        name: string;
        email: string;
        phone: string | null;
    };
    pet: {
        age: string;
        petname: string;
        weight: number;
        race: string;
        species: string;
        sex: string;
        castrated: boolean;
        contraindications: Array<{ idcontraindication: string; categoria: string; description: string }>;
    };
    orders: Array<{
        waaccepted: boolean;
        tutorcancelled: boolean;
        idorderservice: string;
        idservice: string;
        nameuserowner: string;
        nameprofissional: string;
        datesolicitation: string;
        dateappointed: string;
        status: string;
        categoryname: string;
        title: string;
        price: number;
        comments: string;
        priority: string;
        attendancemodel: string;
        vaccines: Array<any>;
        subcategories: Array<{ title: string; price: number; idsubcategory: string; idservice: string }>;
    }>;
    attendances: Array<{
        idattendance: string;
        idos: string;
        status: string;
        hipotese: string;
        conclusao: string;
        haveanamnese: boolean;
        idform: string;
        service: {
            priority: string;
            category: string;
            title: string;
            totalprice: number;
            description: string;
            datesolicitation: string;
            dateapontted: string;
            comments: string;
            waspaid: string;
            atendimento: string;
            vacinas: Array<any>;
            subcategorias: Array<{ title: string; price: number; idsubcategory: string; idservice: string }>;
        };
    }>;
}

const Atendimento = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { id } = useParams();
    const toast = useToast();
    const router = useRouter();
    const [files, setFiles] = useState<any[]>([]);
    const [exames, setExames] = useState<any[]>([]);
    const [comprovantespagamento, setComprovantePagamentos] = useState<any[]>([]);
    const [selectedButton, setSelectedButton] = useState<string>("Atendimentos");
    const [selectFormAnamnese, setselectFormAnamnese] = useState<string>("");
    const [prontuarioData, setProntuarioData] = useState<Prontuario>({
        idprontuario: '',
        datecreate: '',
        tutor: {
            name: '',
            email: '',
            phone: null,
        },
        pet: {
            age: '',
            petname: '',
            weight: 0,
            race: '',
            species: '',
            sex: '',
            castrated: false,
            contraindications: [],
        },
        orders: [],
        attendances: [],
    });

    const [formValues, setFormValues] = useState<{ [key: string]: string | string[] }>({});
    const handleButtonClick = (buttonName: string) => {
        setSelectedButton(buttonName);
    };




    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    }

    useEffect(() => {
        fetchAttendance();
    }, []);
    const fetchAttendance = async () => {
        // if (typeof window !== 'undefined') {
        //   const token = localStorage.getItem('Authorization');
        //   if (token) {
        //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        //   }
        // }
        try {
            const response = await axios.get(`/Prontuario/Pet`, {
                params: {
                    "idprontuario": id
                }
            });
            const data = response.data;
            if (data.status === 'confirmed') {
                setProntuarioData(data.data);
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

    const handleSave = () => {
        toast({
            title: "Atendimento salvo",
            description: "Os dados do atendimento foram salvos com sucesso.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
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
                                    Prontuarios
                                    <ChevronRightIcon />
                                </Text>
                                <Text color="primary.200">
                                    Pet
                                </Text>
                            </Heading>
                        </Box>
                    </Flex>
                    <Flex direction="row" height="calc(100vh - 120px)" mx="4">
                        <Box width="23%" borderRadius="md" boxShadow="md" height="calc(100vh - 120px)" overflowY="hidden" zIndex={9} bg="white" mr="4">
                            {/* Dados do Pet */}
                            <Box mb="2" display={"flex"} flexDirection={"column"}>
                                <Flex bgColor={"primary.200"} borderTopRadius={"md"} justifyContent={"center"} height={"80px"} >
                                    <Box boxShadow={"md"} boxSize="80px" borderRadius="50%" overflow="hidden" mt="40px" display={"flex"} justifyContent={'center'} alignItems={"center"}>
                                        <Image mt='2'  bgColor={"primary.100"} src="/perfilpet2.webp" alt={`Foto do pet ${prontuarioData.pet.petname}`} borderRadius={"full"} />
                                    </Box>
                                </Flex>

                                <Box fontSize={"sm"} mt="4" px={"4"} pb={"2"} borderBottomColor={"primary.100"} borderBottomWidth={"2px"}>
                                    <Text display={"flex"} flexDirection={"column"} fontSize={"md"} fontWeight={"bold"} mb={"4"}>
                                        {prontuarioData.pet.petname}
                                    </Text>

                                    <SimpleGrid columns={2} spacing={4}>
                                        <Box>
                                            <Text fontWeight="bold">Raça:</Text>
                                            <Text>{prontuarioData.pet.race}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Idade:</Text>
                                            <Text>{prontuarioData.pet.age}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Espécie:</Text>
                                            <Text>{prontuarioData.pet.species}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Castrado:</Text>
                                            <Text>{prontuarioData.pet.castrated ? 'Sim' : 'Não'}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Peso:</Text>
                                            <Text>{prontuarioData.pet.weight} kg</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Sexo:</Text>
                                            <Text>{prontuarioData.pet.sex}</Text>
                                        </Box>
                                    </SimpleGrid>
                                </Box>

                            </Box>

                            {/* Dados do Tutor */}
                            <Box px="4" borderBottomColor={"primary.100"} borderBottomWidth={"2px"} pb={"2"}>
                                <Text fontSize="md" fontWeight="bold">{prontuarioData.tutor.name}</Text>

                                <Box fontSize={"sm"}>
                                    <Text my={'1'}><strong>Email: </strong>{prontuarioData.tutor.email}</Text>
                                    <Text my={'1'}><strong>Telefone:</strong> {prontuarioData.tutor.phone}</Text>
                                    <Text my={'1'}><strong>Endereço:</strong> Av. jardins mende</Text>
                                </Box>
                            </Box>
                            <Text fontSize="md" fontWeight="bold" mb="2" mx={4} mt={"2"}>Contra indicações</Text>
                            <Box  p="2" bgColor="white" overflowY="auto" maxHeight={"132px"}>

                                {prontuarioData.pet.contraindications.map((contraindication) => <CardContraindication key={contraindication.idcontraindication} contraindication={contraindication} />)}
                            </Box>
                        </Box>
                        {/* Container do atendimento */}
                        <Box width={"80%"} borderRadius="md" boxShadow="md" height="calc(100vh - 120px)" zIndex={9} bg="white">
                            <Flex justify="space-between" align="center" mb="2" borderBottomColor="gray.200" borderBottomWidth="1px" px="4" fontFamily="Nunito, sans-serif">
                                <Box flexDirection="row" display="flex">
                                    <Heading as="h1" size="sm" color="primary.200" display="flex" flexDirection="row">
                                        <Button
                                            size="sm"
                                            onClick={() => handleButtonClick('Atendimentos')}
                                            bg="white"
                                            color="primary.200"
                                            boxShadow={selectedButton === 'Atendimentos' ? 'md' : 'none'}
                                            _hover={{ bg: 'primary.100' }}
                                            borderWidth={"1px"}
                                            borderColor={selectedButton === 'Atendimentos' ? 'gray.200' : 'white'}
                                            fontWeight="bold" mr={"4"}>Atendimentos</Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleButtonClick('Solicitações')}
                                            bg="white"
                                            color="primary.200"
                                            borderWidth={"1px"}
                                            borderColor={selectedButton === 'Solicitações' ? 'gray.200' : 'white'}
                                            boxShadow={selectedButton === 'Solicitações' ? 'md' : 'none'}
                                            _hover={{ bg: 'primary.100' }}
                                            fontWeight="bold" mr={"4"}>Solicitações</Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleButtonClick('Prescrições')}
                                            bg="white"
                                            color="primary.200"
                                            borderWidth={"1px"}
                                            borderColor={selectedButton === 'Prescrições' ? 'gray.200' : 'white'}
                                            boxShadow={selectedButton === 'Prescrições' ? 'md' : 'none'}
                                            _hover={{ bg: 'primary.100' }}
                                            fontWeight="bold" mr={"4"}>Prescrições</Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleButtonClick('Protocolos')}
                                            bg="white"
                                            color="primary.200"
                                            borderWidth={"1px"}
                                            borderColor={selectedButton === 'Protocolos' ? 'gray.200' : 'white'}
                                            boxShadow={selectedButton === 'Protocolos' ? 'md' : 'none'}
                                            _hover={{ bg: 'primary.100' }}
                                            fontWeight="bold" mr={"4"}>Protocolos</Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleButtonClick('Pagamentos')}
                                            bg="white"
                                            color="primary.200"
                                            borderWidth={"1px"}
                                            borderColor={selectedButton === 'Pagamentos' ? 'gray.200' : 'white'}
                                            boxShadow={selectedButton === 'Pagamentos' ? 'md' : 'none'}
                                            _hover={{ bg: 'primary.100' }}
                                            fontWeight="bold" mr={"4"}>Pagamentos</Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleButtonClick('Agenda')}
                                            bg="white"
                                            color="primary.200"
                                            borderWidth={"1px"}
                                            borderColor={selectedButton === 'Agenda' ? 'gray.200' : 'white'}
                                            boxShadow={selectedButton === 'Agenda' ? 'md' : 'none'}
                                            _hover={{ bg: 'primary.100' }}
                                            fontWeight="bold" mr={"4"}>Agenda</Button>
                                    </Heading>
                                </Box>
                            </Flex>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"start"} alignItems={"center"} width={"100%"} height={"85%"}>
                                {selectedButton == "Atendimentos" && (
                                    <Box></Box>
                                )}
                                {selectedButton === 'Solicitações' && (
                                    <>
                                        <Box width={"100%"} px={6} overflowY="auto" height={"100%"}>
                                            <Box px={0.5} mt={2} display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                                <Text fontWeight={"bold"}>Histórico de solicitações</Text>
                                                <Box ml="auto">
                                                    <Input
                                                        placeholder="Pesquisar por palavra chave"
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
                                            </Box>
                                            {prontuarioData.orders.map((att, index) => (
                                                <Orderprontuario order={att} key={att.idorderservice} />
                                            ))}
                                        </Box>

                                    </>
                                )}
                                {selectedButton === 'Prescrições' && (
                                    <>
                                        <Box></Box>
                                    </>
                                )}
                                {selectedButton === 'Protocolos' && (
                                    <>
                                        <Box></Box>
                                    </>
                                )}
                                {selectedButton === 'Pagamentos' && (
                                    <>
                                        <Box></Box>
                                    </>
                                )}
                                {selectedButton === 'Agenda' && (
                                    <>
                                        <Box></Box>
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