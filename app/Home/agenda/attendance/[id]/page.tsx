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
import { CheckCircleIcon, WarningIcon, InfoOutlineIcon,AddIcon,ChevronRightIcon } from '@chakra-ui/icons';
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
  petCastrado: boolean;
  petGender: string
}

const Atendimento = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [files, setFiles] = useState<any[]>([]);
  const [exames, setExames] = useState<any[]>([]);
  const [comprovantespagamento, setComprovantePagamentos] = useState<any[]>([]);
  const [selectedButton, setSelectedButton] = useState<string>("Prioridade");

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
    petCastrado: true,
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
    petName: "Menino",
    petBreed: "Raça do Pet",
    petSpecies: "Cão",
    petWeight: "5 kg",
    petAge: "2 anos",
    clientComment: "Comentário fictício do tutor.",
    status: "Confirmado",
    petGender: "Macho"
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
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
    <Header />
    <Flex direction="column" backgroundColor={"primary.100"}  height="calc(100vh - 40px)">
      <Sidebar />
      <Box marginLeft="250px" py="2" width="calc(100% - 250px)" flex="1" borderRadius="md" position="relative">
      <Flex justify="space-between" align="center" mb="2" borderBottomColor="gray.200" borderBottomWidth="1px" pb="1" px="4" fontFamily="Nunito, sans-serif">
          <Box flexDirection="row" display="flex">
            <Heading as="h1" size="sm" color="primary.200" display="flex" flexDirection="row">
              <Text color="gray.500">
                Main Menu
                <ChevronRightIcon />
              </Text>
              Agenda
            </Heading>
          </Box>
        </Flex>
        <Flex direction="row" height="calc(100vh - 120px)" mx="4">
        <Box width="22%" borderRadius="md" boxShadow="md" height="100%" zIndex={9} bg="white" px="2" mr="4">
  {/* Dados do Pet */}
  <Box p="2" mb="2" display={"flex"} flexDirection={"column"}>
    
    <Box boxShadow={"md"} boxSize="80px" borderRadius="md" overflow="hidden"  mb="2" mt={"2"} >
    <Image  src="https://avatars.githubusercontent.com/u/32210610?v=4" alt={`Foto do pet ${service.petName}`} borderRadius={"sm"}/>
    </Box>
    <Box fontSize={"sm"}>
    <Text  display={"flex"} flexDirection={"column"} fontSize={"md"} fontWeight={"bold"} mb={"4"}>{service.petName}</Text>
    <Text my={'1'}><strong>Raça:</strong> {service.petBreed}</Text>
    <Text my={'1'}><strong>Idade:</strong> {service.petAge} anos</Text>
    <Text my={'1'}><strong>Espécie:</strong> {service.petSpecies}</Text>
    <Text my={'1'}><strong>Castrado:</strong> {service.petCastrado ? 'Sim' : 'Não'}</Text>
    <Text my={'1'}><strong>Peso:</strong> {service.petWeight} kg</Text>
    <Text my={'1'}><strong>Sexo:</strong> {service.petGender}</Text>
    </Box>
   
  </Box>
  
  {/* Dados do Tutor */}
  <Box p="2" >
    <Text fontSize="md" fontWeight="bold" mb="2">Tutor</Text>
    <Box fontSize={"sm"}>
    <Text my={'1'}><strong>Nome:</strong> {service.clientName}</Text>
    <Text my={'1'}><strong>E-mail:</strong> {service.clientEmail}</Text>
    <Text my={'1'}><strong>Telefone:</strong> {service.clientPhone}</Text>
    </Box>
  </Box>
  <Text fontSize="md" fontWeight="bold" mb = "2" px={2}>Contra indicações</Text>
  <Box p="2"   bgColor="white"   
    overflowY="auto" maxHeight={"140px"}>
    
    <Box height={"120px"} mb={"4"} bgColor={"#E9F6FF"} fontSize={"sm"} border={"2px"} borderColor={"primary.1100"} borderRadius={"md"} p = "2" borderLeftColor={"primary.1100"} borderLeftWidth={"6px"}>
    <Text fontSize={"xs"} mb="2">Contra Indicação</Text>
    <Text fontSize={"xs"}>Descrição<Text fontWeight={"bold"} fontSize={"xs"}> meu pet nao pode tomar banho com produto x</Text></Text>
    </Box>
    <Box height={"120px"}  bgColor={"primary.650"} fontSize={"sm"} border={"2px"} borderColor={"primary.600"} borderRadius={"md"} p = "2" borderLeftColor={"primary.600"} borderLeftWidth={"6px"}>
    <Text fontSize={"xs"} mb="2">Contra Indicação<Text fontWeight={"bold"} fontSize={"xs"}> Alergico a shampo x</Text></Text>
    <Text fontSize={"xs"}>Descrição<Text fontWeight={"bold"} fontSize={"xs"}> meu pet nao pode tomar banho com produto x</Text></Text>
    </Box>
  </Box>
</Box>
          {/* Container do atendimento */}
        <Box width={"80%"} borderRadius="md" boxShadow="md" height="100%" zIndex={9} bg="white">
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
              onClick={() => handleButtonClick('Retorno')}
              bg="white"
              color="primary.200"
              boxShadow={selectedButton === 'Retorno' ? 'md' : 'none'}
              _hover={{ bg: 'primary.100' }}
              fontWeight="bold" mr={"4"}>Retorno</Button>
            </Heading>
          </Box>
        </Flex>
        
          </Box>
        </Flex>
      </Box>
    </Flex>
    </>
    
  );
};

export default Atendimento;