"use client"
import { useRouter } from 'next/router';
import React, { useState, useRef } from 'react';
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
  DrawerBody,DrawerCloseButton,DrawerContent,DrawerHeader,Drawer,DrawerOverlay,DrawerFooter,useDisclosure
} from '@chakra-ui/react';
import AnexoUploader from '../components/AnexoUploades';
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/headers";
import { CheckCircleIcon, WarningIcon, InfoOutlineIcon,AddIcon } from '@chakra-ui/icons';
import AtendimentoDrawer from '../attendimentodrawer';

interface Service {
  CodigoDaCategoria: string;
  Titulo: string;
  Descrição: string;
  Preço: number | null;
  CodigoDeVacinas: { nameofvaccine?: string; price?: number }[];
  Atendimento: string[];
  SubCategories: { namesubcategory: string; price: number }[];
  Diagnostico: string;
  Conclusao: string;
  Arquivos: string[];
  Comprovantes: string[];
  Exames: string[];
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  petName: string;
  petBreed: string;
  petSpecies: string;
  petWeight: string;
  petAge: string;
  clientComment: string;
  status: string;
}

const Atendimento = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [files, setFiles] = useState<any[]>([]);
  const [exames, setExames] = useState<any[]>([]);
  const [comprovantespagamento, setComprovantePagamentos] = useState<any[]>([]);

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
  const [service, setService] = useState<Service>({
    CodigoDaCategoria: "C01",
    Titulo: "Serviço de Teste",
    Descrição: "Descrição fictícia do serviço.",
    Preço: 150.0,
    CodigoDeVacinas: [{ nameofvaccine: "Vacina Teste", price: 50 }],
    Atendimento: ["Online"],
    SubCategories: [{ namesubcategory: "Subcategoria Teste", price: 75 }],
    Diagnostico: "Diagnóstico fictício.",
    Conclusao: "Conclusão fictícia.",
    Arquivos: ["arquivo1.jpg", "arquivo2.pdf"],
    Comprovantes: ["comprovante1.jpg"],
    Exames: ["exame1.pdf"],
    clientName: "Nome do Tutor",
    clientPhone: "123-456-7890",
    clientEmail: "tutor@example.com",
    petName: "Nome do Pet",
    petBreed: "Raça do Pet",
    petSpecies: "Espécie do Pet",
    petWeight: "5 kg",
    petAge: "2 anos",
    clientComment: "Comentário fictício do tutor.",
    status: "Confirmado"
  });
  const [paymentTypes,setPaymentTypes] = useState<string[]>(["Credito","Debito","Boleto","Dinheiro","Pix"])

  const handleSave = () => {
    toast({
      title: "Atendimento salvo",
      description: "Os dados do atendimento foram salvos com sucesso.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleRemoveFile = (type: 'Arquivos' | 'Comprovantes' | 'Exames', index: number) => {
    const updatedFiles = service[type].filter((_, i) => i !== index);
    setService({ ...service, [type]: updatedFiles });
  };

  const handleAddFile = (type: 'Arquivos' | 'Comprovantes' | 'Exames', files: FileList) => {
    const newFiles = Array.from(files).map(file => file.name); // Simulação dos nomes dos arquivos
    setService({ ...service, [type]: [...service[type], ...newFiles] });
  };

  const openFileDialog = (type: 'Arquivos' | 'Comprovantes' | 'Exames') => {
    if (fileInputRefs[type].current) {
      fileInputRefs[type].current.click();
    }
  };

  return (
    <>
    <Header />
    <Flex direction="column" backgroundColor={"primary.200"}  height="calc(100vh - 40px)">
      <Sidebar />
      <Box
        marginLeft="250px"
        padding="4"
        width="calc(100% - 250px)"
        flex="1"
        backgroundColor={"primary.100"}
      >
        <Box mx="auto" p="0" bg="white" width={"100%"} borderRadius={"8px"} boxShadow={"md"} color={"primary.250"} height="calc(100vh - 80px)" overflowY="auto">
          <Flex direction="column" mb="4">
          <Flex align="start" borderBottom={"1px"} borderBottomColor={"gray.200"} mb = "4">
              
                  <Heading size="sm" my="4" ml="6" mr="2" cursor={"pointer"} color={"primary.200"}>Atendimento</Heading>
                  <Heading size="sm" my="4" mx="2" cursor={"pointer"} color={"gray.500"}>Anamnese</Heading>
                  <Heading size="sm" my="4" mx="2" cursor={"pointer"} color={"gray.500"}>Prescrição</Heading>
                  <Heading size="sm" my="4" mx="2" cursor={"pointer"} color={"gray.500"}>Protocolo</Heading>
                  <Heading size="sm" my="4" mx="4" cursor={"pointer"} color={"gray.500"}>Retorno</Heading>
                  
                  
            </Flex>
            <Flex mx={"6"} align="start" mb={4} boxShadow={"md"} p={"4"} borderRadius={"md"} borderLeftColor={"#FFFBDA"} borderLeftWidth={"6px"} borderTopColor={"primary.100"} borderTopWidth={"2px"}>
              <Box boxSize="100px" borderRadius="full" overflow="hidden" mr={4}>
                <Image src="https://avatars.githubusercontent.com/u/32210610?v=4" alt="Tutor Image" />
              </Box>
              <Box>
                <Text fontSize="md" ml={4} fontWeight="bold">Cliente</Text>
                <Flex>
                  <Text m={"4"} ><strong>Nome:</strong> {service.clientName}</Text>
                  <Text m={"4"}><strong>Telefone:</strong> {service.clientPhone}</Text>
                  <Text m={"4"}><strong>Email:</strong> {service.clientEmail}</Text>
                </Flex>
                
              </Box>
            </Flex>

            <Flex mx={"6"} wrap="wrap" mb={4} boxShadow={"md"} p={"4"} borderRadius={"md"} borderLeftColor={"#C4D7FF"} borderLeftWidth={"6px"} borderTopColor={"primary.100"} borderTopWidth={"2px"}>
              <Box flex="1" pr={4}>
                <Text><strong>Pet:</strong></Text>
                <Text>{service.petName}</Text>
              </Box>
              <Box flex="1" pr={4}>
                <Text><strong>Sexo:</strong></Text>
                <Text>Masculino</Text>
              </Box>
              <Box flex="1" pr={4}>
                <Text><strong>Castrado:</strong></Text>
                <Text>Sim</Text>
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
                <Text><strong>Peso:</strong></Text>
                <Text>{service.petWeight}</Text>
              </Box>
              <Box flex="1">
                <Text><strong>Idade:</strong></Text>
                <Text>{service.petAge}</Text>
              </Box>
            </Flex>

            <VStack  align="start" mx={"6"}   mb={4} boxShadow={"md"} p={"4"} borderRadius={"md"} borderLeftColor={"primary.500"} borderLeftWidth={"6px"} borderTopColor={"primary.100"} borderTopWidth={"2px"}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>Serviço - {service.Titulo}</Text>
            <Flex wrap="wrap" width="100%">
              <Box flex="1" pr={2}>
                <Text><strong>Preço:</strong></Text>
                <Text >{service.Preço}</Text>
              </Box>
              <Box flex="1" pr={2}>
                <Text><strong>Atendimento:</strong></Text>
                <Text >{service.Atendimento[0]}</Text>
              </Box>
              <Box flex="1" pr={2}>
                <Text><strong>Vacinas:</strong></Text>
                <Select placeholder="vacina" size="sm" isReadOnly focusBorderColor='primary.300' color={"primary.200"}>
                  {service.CodigoDeVacinas.map((vaccine) => (
                    <option key={vaccine.nameofvaccine}>
                      {vaccine.nameofvaccine} - {vaccine.price}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box flex="1" pr={2}>
                <Text><strong>Subcategorias:</strong></Text>
                <Select placeholder="subcategoria" size="sm" isReadOnly focusBorderColor='primary.300' color={"primary.200"} >
                  {service.SubCategories.map((subcategory) => (
                    <option key={subcategory.namesubcategory}>
                      {subcategory.namesubcategory} - {subcategory.price}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box flex="1" pr={2}>
                <Text><strong>Forma de pagamento:</strong></Text>
                <Select placeholder="Crédito" size="sm" isReadOnly focusBorderColor='primary.300' color={"primary.200"} >
                  {paymentTypes.map((name) => (
                    <option key={name}>
                      {name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Button  backgroundColor={"green.100"}
                color="#2EB086"
                _hover={{ backgroundColor: "#2EB086", color: "primary.100" }} mt={"4"}>Gerar Pagamento</Button>
            </Flex>
          </VStack>
          </Flex>

          <VStack mx={"6"} spacing="4" align="stretch" alignContent={"center"}>
            <FormControl mb="4">
              <FormLabel>Diagnóstico</FormLabel>
              <Textarea
                value={service.Diagnostico}
                onChange={(e) => setService({ ...service, Diagnostico: e.target.value })}
                focusBorderColor="primary.400"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Conclusão</FormLabel>
              <Textarea
                value={service.Conclusao}
                onChange={(e) => setService({ ...service, Conclusao: e.target.value })}
                focusBorderColor="primary.400"
              />
            </FormControl>
        <Flex justify={"space-between"} width={"100%"} >
            <FormControl mb="4">
              <FormLabel backgroundColor={"primary.200"} color={"primary.100"} p={"2"} borderTopRadius={"md"} mb={"4"}>Arquivos</FormLabel>
              <Wrap>
                <AnexoUploader onFilesUpdate={handleFilesUpdate} />
              </Wrap>
            </FormControl>
            <FormControl mb="4" flexDirection={"column"} justifyContent={"center"}>
              <FormLabel backgroundColor={"primary.200"} color={"primary.100"} p={"2"} borderTopRadius={"md"} mb={"4"}>Exames</FormLabel>
              <Wrap>
                <AnexoUploader onFilesUpdate={handleFilesExames} />
              </Wrap>
            </FormControl>
            <FormControl mb="4">
              <FormLabel backgroundColor={"primary.200"} color={"primary.100"} p={"2"} borderTopRadius={"md"} mb={"4"}>Comprovantes de pagamento</FormLabel>
              <Wrap>
                <AnexoUploader onFilesUpdate={handleFilesPayment} />
              </Wrap>
            </FormControl>
           
            </Flex>

           

            
          </VStack>
          <Flex justify={"space-between"} mb = "4">
          
          <Button
            size="lg"
            maxWidth="100px"
            backgroundColor="primary.500"
            color="primary.300"
            _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
            onClick={handleSave}
            mx={"6"}
          >
            Concluir 
          </Button>
          </Flex>
         <AtendimentoDrawer isOpen={isOpen} onClose={onClose}/>
        </Box>
      </Box>
      
    </Flex>
    </>
    
  );
};

export default Atendimento;