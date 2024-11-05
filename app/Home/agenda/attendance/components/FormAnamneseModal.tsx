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
  Circle,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  IconButton
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon, InfoOutlineIcon,AddIcon } from '@chakra-ui/icons';
import axios from "../../../../../utils/axiosConfig"


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

export interface Form {
    idform: string;
    nameform: string;
    attributes: Attribute[];
    fieldCount: number; 
    color: string; // Nova propriedade para a cor
}

export const FormAnamnese: React.FC<{ isOpen: boolean, onClose: () => void, selectform: (idform: string,form: Form)=> void}> = ({ isOpen, onClose, selectform})=>{
    const toast = useToast();
    const [forms, setForms] = useState<Form[]>([]);
    const [filteredForms, setFilteredForms] = useState<Form[]>([]);

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
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth={"620px"} >
        <ModalHeader mx={0}>
          Formularios
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody overflowY="auto">
        <Box overflowX="auto" mb="14" borderRadius={"8px"} backgroundColor={"white"} boxShadow={"md"} mx="0">
              <Table variant="simple">
                <Thead backgroundColor={"primary.200"} color={"primary.100"}>
                  <Tr>
                    <Th color={"primary.100"}>Nome do Formulário</Th>
                    <Th color={"primary.100"}>Cor</Th>
                    <Th color={"primary.100"}>Qnt. de Campos</Th>
                     {/* Nova coluna de Cor */}
                    <Th color={"primary.100"}>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {forms.map((form, index) => (
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
                      <Td>{form.fieldCount}</Td>
                      
                      <Td paddingY={"2.5"}>
                        <Flex>
                          <IconButton
                            aria-label="Remover Formulário"
                            icon={<AddIcon />}
                            onClick={() => selectform(form.idform, form)}
                            size="xs"
                            color={"primary.300"}
                            backgroundColor={"white"}
                            boxShadow={"md"}
                            _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
        </ModalBody>
      
      </ModalContent>
    </Modal>
    )
}