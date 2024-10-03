"use client";

import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  IconButton,
  Button,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  SearchIcon,
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import Sidebar from "../components/Sidebar";
import Header from "../components/headers";
import { useState, useEffect } from "react";
import axios from "../../../utils/axiosConfig";
import InviteModal from "../components/invitemodal"; // Importando o componente de modal
import RemoveModal from "../components/removecollaborator"; // Importando o modal de remoção

// Interface para definir a estrutura dos colaboradores
interface Collaborator {
  name: string;
  crmv: string;
  birthDate: string;
  status: string;
  email: string;
}

const Collaborators = ({ params }: { params: { username: string } }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [filteredCollaborators, setFilteredCollaborators] = useState<Collaborator[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook para controlar o modal de convite
  const { isOpen: isRemoveOpen, onOpen: onRemoveOpen, onClose: onRemoveClose } = useDisclosure(); // Hook para controlar o modal de remoção
  const [selectedCollaborator, setSelectedCollaborator] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('Authorization');
        console.log(token)
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      }
    // Função para buscar colaboradores da API
    const fetchCollaborators = async () => {
      try {
        const response = await axios.get('/Collaborators'); // Substitua pela URL da sua API
        if (response.data.status === 'confirmed') {
          const formattedCollaborators = response.data.data.map((collaborator: any) => ({
            name: collaborator.name,
            crmv: collaborator.crmv,
            birthDate: new Date(collaborator.dataDeNascimento).toLocaleDateString(),
            status: collaborator.status,
            email: collaborator.email
          }));
          setCollaborators(formattedCollaborators);
          setFilteredCollaborators(formattedCollaborators);
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

    fetchCollaborators();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    const filtered = collaborators.filter(collaborator =>
      collaborator.name.toLowerCase().includes(query)
    );

    setFilteredCollaborators(query ? filtered : collaborators);
  };

  const handleInvite = () => {
    // Abre o modal de convite
    onOpen();
  };

  const handleConfirmInvite = () => {
    // Lógica para convidar o colaborador
    console.log('Convidar:');
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && (currentPage * itemsPerPage) < filteredCollaborators.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRemoveClick = (email: string) => {
    setSelectedCollaborator(email);
    onRemoveOpen();
  };

  const handleRemoveSuccess = (name: string) => {
    setCollaborators(collaborators.filter(collaborator => collaborator.name !== name));
    setFilteredCollaborators(filteredCollaborators.filter(collaborator => collaborator.name !== name));
    toast({
      title: "Colaborador removido",
      description: `${name} foi removido com sucesso.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const paginatedCollaborators = filteredCollaborators.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
    <Header />
    <Flex direction="column" minHeight="calc(100vh - 40px)" backgroundColor={"primary.100"}>
      <Sidebar />
      
      <Box
        marginLeft="250px"
        py="2"
        width="calc(100% - 250px)"
        flex="1"
        borderRadius="md"
        position="relative"
      >
        {/* Cabeçalho com Botão de Convidar e Campo de Pesquisa */}
        <Flex justify="space-between" align="center" mb="2"  borderBottomColor={"gray.200"} borderBottomWidth={"1px"} pb={"1"} px = "4">
          <Heading as="h1" size="sm" color={"primary.200"} display={"flex"} flexDirection={"row"}><Text color="gray.500">Settings 
      <ChevronRightIcon /> 
          
        </Text> Colaboradores</Heading>
          <Button
            leftIcon={<AddIcon />}
            position="absolute"
            bottom="4"
            left="4"
            backgroundColor={"primary.500"}
            color="primary.300"
            onClick={handleInvite}
            _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
            zIndex="1000"
            size={"sm"}
          >
            Convidar
          </Button>
          <Box ml="auto">
            <Input
              placeholder="Pesquisar por nome"
              value={searchTerm}
              onChange={handleSearch}
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
        </Flex>

        {/* Tabela de Colaboradores */}
        <Box overflowX="auto" mb="14" borderRadius={"8px"} backgroundColor={"white"} boxShadow={"md"} mx="4">
          <Table variant="simple">
            <Thead backgroundColor={"primary.200"} color={"primary.100"}>
              <Tr>
                <Th color={"primary.100"}>Nome</Th>
                <Th color={"primary.100"}>CRMV</Th>
                <Th color={"primary.100"}>Data de Nascimento</Th>
                <Th color={"primary.100"}>Status</Th>
                <Th color={"primary.100"}>Email</Th>
                <Th color={"primary.100"}>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedCollaborators.map((collaborator, index) => (
                <Tr key={index} paddingY={"2.5"}>
                  <Td>{collaborator.name}</Td>
                  <Td>{collaborator.crmv}</Td>
                  <Td>{collaborator.birthDate}</Td>
                  <Td>{collaborator.status}</Td>
                  <Td>{collaborator.email}</Td>
                  <Td paddingY={"2.5"}>
                    <IconButton
                      aria-label="Remover Colaborador"
                      icon={<DeleteIcon />}
                      onClick={() => handleRemoveClick(collaborator.email)}
                      size="sm"
                      color={"primary.600"}
                      backgroundColor={"primary.650"}
                      _hover={{ backgroundColor: "primary.600", color: "primary.100" }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Controle de Paginação */}
        <Flex justify="center" align="center" background="transparent" borderTopWidth="0px" borderColor="gray.200" p="4" position="fixed" bottom="0" width="calc(100% - 250px)">
          <IconButton
            aria-label="Previous Page"
            icon={<ChevronLeftIcon />}
            onClick={() => handlePageChange('prev')}
            isDisabled={currentPage === 1}
            mr="2"
          />
          <Text>
            Página {currentPage} de {Math.ceil(filteredCollaborators.length / itemsPerPage)}
          </Text>
          <IconButton
            aria-label="Next Page"
            icon={<ChevronRightIcon />}
            onClick={() => handlePageChange('next')}
            isDisabled={currentPage * itemsPerPage >= filteredCollaborators.length}
            ml="2"
          />
        </Flex>
      </Box>

      {/* Modal para Convidar Novo Colaborador */}
      <InviteModal isOpen={isOpen} onClose={onClose} onConfirm={handleConfirmInvite} />

      {/* Modal para Remover Colaborador */}
      {selectedCollaborator && (
        <RemoveModal
          isOpen={isRemoveOpen}
          onClose={onRemoveClose}
          collaboratorEmail={selectedCollaborator}
          onRemoveSuccess={() => handleRemoveSuccess(selectedCollaborator)}
        />
      )}
    </Flex>
    </>
    
  );
};

export default Collaborators;
