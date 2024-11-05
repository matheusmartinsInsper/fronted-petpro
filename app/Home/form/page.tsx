"use client"
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
    Link
  } from "@chakra-ui/react";
  import {
    SearchIcon,
    AddIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DeleteIcon,
    EditIcon
  } from "@chakra-ui/icons";
  import Sidebar from "../components/Sidebar";
  import Header from "../components/headers";
  import { useState, useEffect } from "react";
  import axios from "../../../utils/axiosConfig";
  import EditFormModal from "./components/FormDetailsModal"
  
  interface Option {
      value: string;
      idoption: string;
      idattribute: string;
  }
  
  interface Attribute {
      label: string;
      idattribute: string;
      idform: string;
      typeattribute: 'checkbox' | 'select' | 'number' | 'textarea' | 'text';
      options: Option[];
  }
  
  interface Form {
      idform: string;
      nameform: string;
      attributes: Attribute[];
      fieldCount: number; 
      color: string; // Nova propriedade para a cor
  }
  
  const Forms = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [forms, setForms] = useState<Form[]>([]);
    const [filteredForms, setFilteredForms] = useState<Form[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [selectedForm, setSelectedForm] = useState<Form | null>(null); 
    const { isOpen, onOpen, onClose } = useDisclosure(); 
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };
  
    const handleEditClick = (form: Form) => {
      setSelectedForm(form);
      onOpen();
    };
    const toast = useToast();
  
    useEffect(() => {
      fetchForms();
    }, []);
  
    const fetchForms = async () => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('Authorization');
          if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }
        }
        
        try {
          const response = await axios.get('/Form'); // Substitua pela URL da sua API
          if (response.data.status === 'confirmed') {
            const formattedForms = response.data.data.map((form: any) => ({
              color: form.color,
              idform: form.idform,
              nameform: form.nameform,
              fieldCount: form.attributes ? form.attributes.length : 0,
              attributes: form.attributes
            }));
            setForms(formattedForms);
            setFilteredForms(formattedForms);
            console.log(forms)
          }
        } catch (error) {
          console.error('Erro ao buscar formulários:', error);
          toast({
            title: "Erro ao buscar formulários",
            description: "Ocorreu um erro ao tentar buscar os formulários. Tente novamente mais tarde.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };
  
    const getColorForForm = (idform: string) => {
      // Lógica para mapear cores com base no ID ou outras propriedades
      const colors = ['primary.300', 'primary.700', 'primary.200'];
      return colors[Math.floor(Math.random() * colors.length)]; // Exemplo de cor aleatória
    };
  
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.toLowerCase();
      setSearchTerm(query);
      const filtered = forms.filter(form =>
        form.nameform.toLowerCase().includes(query)
      );
      setFilteredForms(query ? filtered : forms);
    };
  
    const handlePageChange = (direction: 'next' | 'prev') => {
      if (direction === 'next' && (currentPage * itemsPerPage) < filteredForms.length) {
        setCurrentPage(currentPage + 1);
      } else if (direction === 'prev' && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const paginatedForms = filteredForms.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    return (
      <>
        <Header />
        <Flex direction="column" minHeight="calc(100vh - 40px)" backgroundColor={"primary.100"}>
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/>
          <Box
            py="2"
            marginLeft={isCollapsed?"60px":"250px"}
             width={isCollapsed?"calc(100% - 60px)":"calc(100% - 250px)"}
            flex="1"
            borderRadius="md"
            position="relative"
          >
            {/* Cabeçalho com Campo de Pesquisa */}
            <Flex justify="space-between" align="center" mb="2" borderBottomColor={"gray.200"} borderBottomWidth={"1px"} pb={"1"} px="4">
              <Heading as="h1" size="sm" color={"primary.200"} display={"flex"} flexDirection={"row"} fontFamily="Nunito, sans-serif">
                <Text color="gray.500" fontFamily="Nunito, sans-serif">Settings 
                  <ChevronRightIcon /> 
                </Text>
                Anamnese
              </Heading>
              <Button
                leftIcon={<AddIcon />}
                position="absolute"
                bottom="4"
                left="4"
                backgroundColor={"primary.500"}
                color="primary.300"
                as="a"
                href="/Home/form/add"
                _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
                zIndex="1000"
                size={"sm"}
              >
                Adicionar
              </Button>
              <Box ml="auto">
                <Input
                  placeholder="Pesquisar por nome do formulário"
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
  
            {/* Tabela de Formulários */}
            <Box overflowX="auto" mb="14" borderRadius={"8px"} backgroundColor={"white"} boxShadow={"md"} mx="4">
              <Table variant="simple">
                <Thead backgroundColor={"primary.200"} color={"primary.100"}>
                  <Tr>
                    <Th color={"primary.100"}>Nome do Formulário</Th>
                    <Th color={"primary.100"}>Cor</Th>
                    <Th color={"primary.100"}>ID do Formulário</Th>
                    <Th color={"primary.100"}>Quantidade de Campos</Th>
                     {/* Nova coluna de Cor */}
                    <Th color={"primary.100"}>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedForms.map((form, index) => (
                    <Tr key={index} paddingY={"2.5"}>
                      <Td>{form.nameform}</Td>
                      <Td>
                        <Box 
                          width="20px" 
                          height="20px" 
                          borderRadius="50%" 
                          bg={form.color}
                        />
                      </Td>
                      <Td>{form.idform}</Td>
                      <Td>{form.fieldCount}</Td>
                      
                      <Td paddingY={"2.5"}>
                        <Flex>
                          <Link>
                            <IconButton
                              aria-label="Editar Serviço"
                              icon={<EditIcon />}
                              size="xs"
                              color="primary.200"
                              boxShadow={"md"}
                              backgroundColor="white"
                              _hover={{ backgroundColor: "gray.100" }}
                              mr="2"
                              onClick={() => handleEditClick(form)}
                            />
                          </Link>
                          <IconButton
                            aria-label="Remover Formulário"
                            icon={<DeleteIcon />}
                            onClick={() => console.log("Remover formulário:", form.nameform)}
                            size="xs"
                            color={"primary.600"}
                            backgroundColor={"white"}
                            boxShadow={"md"}
                            _hover={{ backgroundColor: "primary.600", color: "primary.100" }}
                          />
                        </Flex>
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
                Página {currentPage} de {Math.ceil(filteredForms.length / itemsPerPage)}
              </Text>
              <IconButton
                aria-label="Next Page"
                icon={<ChevronRightIcon />}
                onClick={() => handlePageChange('next')}
                isDisabled={currentPage * itemsPerPage >= filteredForms.length}
                ml="2"
              />
            </Flex>
          </Box>
        </Flex>
  
        {/* Modal de Edição */}
        {selectedForm && (
          <EditFormModal form={selectedForm} isOpen={isOpen} onClose={onClose} />
        )}
      </>
    );
  };
  
  export default Forms;
  