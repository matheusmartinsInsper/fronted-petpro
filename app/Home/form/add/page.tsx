"use client";

import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Input,
  Select,
  Textarea,
  SimpleGrid,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Checkbox,
  IconButton
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronRightIcon,
  DeleteIcon,
  ChevronLeftIcon
} from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import axios from "../../../../utils/axiosConfig";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/headers";
import { useState } from "react";

// Definindo a interface para os campos do formulário
interface Field {
  label: string;
  type: string;
  options?: string[]; // Para opções de checkbox e select
}

// Campos iniciais que podem ser adicionados
const initialAvailableFields: { type: string; label: string }[] = [
  { type: 'text', label: 'Input de Texto' },
  { type: 'number', label: 'Input Numérico' },
  { type: 'textarea', label: 'Área de Texto' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'select', label: 'Select' },
];

const Form: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [availableFields] = useState(initialAvailableFields);
  const [formName, setFormName] = useState(''); // Estado para o nome do formulário
  const router = useRouter();

  const handleAddField = (type: string) => {
    const newField: Field = { label: '', type };

    // Para campos de select e checkbox, inicializa opções vazias
    if (type === 'checkbox' || type === 'select') {
      newField.options = ['']; // Inicializa com um campo vazio para opções
    }

    setFields((prevFields) => [...prevFields, newField]);
  };

  const handleLabelChange = (index: number, newLabel: string) => {
    const updatedFields = [...fields];
    updatedFields[index].label = newLabel;
    setFields(updatedFields);
  };

  const handleOptionChange = (fieldIndex: number, optionIndex: number, value: string) => {
    const updatedFields = [...fields];
    if (!updatedFields[fieldIndex].options) return;

    updatedFields[fieldIndex].options[optionIndex] = value;
    setFields(updatedFields);
  };

  const handleAddOption = (fieldIndex: number) => {
    const updatedFields = [...fields];
    if (!updatedFields[fieldIndex].options) return;

    updatedFields[fieldIndex].options.push(''); // Adiciona um novo campo vazio para opção
    setFields(updatedFields);
  };

  const handleRemoveOption = (fieldIndex: number, optionIndex: number) => {
    const updatedFields = [...fields];
    if (!updatedFields[fieldIndex].options) return;

    updatedFields[fieldIndex].options.splice(optionIndex, 1); // Remove a opção
    setFields(updatedFields);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = fields.filter((_, fieldIndex) => fieldIndex !== index);
    setFields(updatedFields);
  };
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const payload = {
        nameform: formName || "Anamnese para atendimento",
        fields: fields.map(field => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
        })),
      };

      await axios.post("/Form", payload);


      router.push("/Home/form");
    } catch (error) {
      
    }
  };

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
        position="relative">
        <Flex justify="space-between" align="center" mb="2"  borderBottomColor={"gray.200"} borderBottomWidth={"1px"} pb={"1"} px = "4">
        <Heading as="h1" size="sm" color={"primary.200"} display={"flex"} flexDirection={"row"} fontFamily="Nunito, sans-serif">
              <Text color="gray.500" fontFamily="Nunito, sans-serif">Settings
                <ChevronRightIcon />
              </Text>
              <Text color="gray.500">Anamnese</Text>
              <Text><ChevronRightIcon /> Adicionar</Text>
            </Heading>
        </Flex>

          <Flex>
            <Box mx={"4"}  width="15%" p={"2"} backgroundColor={"white"} borderRadius={"md"} boxShadow={"md"} alignItems={"center"} display={"flex"} flexDirection={"column"} >
              <Heading as="h3" size="sm" mb={"2"} fontWeight={"bold"}>Campos disponíveis</Heading>
              <Text mb={"2"} color={"gray.500"}>Selecione um campo</Text>
              <SimpleGrid spacing={2} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                {availableFields.map((field) => (
                  <Button
                    key={field.type}
                    onClick={() => handleAddField(field.type)}
                    size={"sm"}
                    border={"2px"}
                    color={"primary.300"}
                    backgroundColor={"primary.100"}
                    _hover={{backgroundColor:"primary.300",border:"2px",borderColor:"primary.300",color:"primary.100"}}
                  >
                    {field.label}
                  </Button>
                ))}
              </SimpleGrid>
            </Box>
            <Box overflowY="auto" width="85%" height="calc(100vh - 120px)" p={2} backgroundColor={"white"} borderRadius={"md"} boxShadow={"md"} mr={"4"}>
              <FormControl mb={4}>
                <FormLabel fontWeight={"bold"}>Nome do Formulário:</FormLabel>
                <Input
                  size="sm"
                  width={"25%"}    
                  focusBorderColor="primary.400"
                  borderRadius={"md"}
                  placeholder="Digite o nome do formulário"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </FormControl>
              <SimpleGrid columns={3} spacing={4}>
                {fields.map((field, index) => (
                  <Box key={index} mb={4}>
                    <FormControl>
                      <FormLabel>Rótulo: {fields[index].label} 
                        <IconButton
                        aria-label="Remover campo"
                        backgroundColor={"primary.100"}
                        border={"2px"}
                        borderColor={"#FF407D"}
                        color="#FF407D"
                        _hover={{ backgroundColor: "#FF407D", color: "primary.100" }}
                        size={"sm"}
                        ml={"2"}
                        icon={<DeleteIcon />}
                        onClick={() => handleRemoveField(index)}/>
                        </FormLabel>
                      
                      <Input
                        size="sm"
                        focusBorderColor="primary.400"
                        borderRadius={"md"}
                        placeholder="Digite o rótulo do campo"
                        onChange={(e) => handleLabelChange(index, e.target.value)}
                      />
                      {field.type === 'text' && (
                        <Input size="sm"
                          focusBorderColor="primary.400"
                          borderRadius={"md"} placeholder="Digite o texto" mt={2} />
                      )}
                      {field.type === 'number' && (
                        <Input size="sm"
                          focusBorderColor="primary.400"
                          borderRadius={"md"} type="number" placeholder="Digite um número" mt={2} />
                      )}
                      {field.type === 'textarea' && (
                        <Textarea size="sm"
                          focusBorderColor="primary.400"
                          borderRadius={"md"}
                          placeholder="Digite seu texto" mt={2} />
                      )}
                      {field.type === 'checkbox' && (
                        <VStack spacing={2} mt={2}>
                          {field.options?.map((option, optionIndex) => (
                            <HStack key={optionIndex} spacing={2}>
                              <Checkbox>{option}</Checkbox>
                              <Input
                                size="sm"
                                focusBorderColor="primary.400"
                                borderRadius={"md"}
                                placeholder="Opção"
                                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                              />
                              <Button
                                backgroundColor={"primary.100"}
                                border={"2px"}
                                borderColor={"#FF407D"}
                                color="#FF407D"
                                _hover={{ backgroundColor: "#FF407D", color: "primary.100" }}
                                size={"sm"}
                                onClick={() => handleRemoveOption(index, optionIndex)}>Remover</Button>
                            </HStack>
                          ))}
                          <Button
                            backgroundColor={"primary.500"}
                            color="primary.300"
                            _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
                            size={"sm"}
                            onClick={() => handleAddOption(index)}>Adicionar Opção</Button>
                        </VStack>
                      )}
                      {field.type === 'select' && (
                        <VStack spacing={2} mt={2}>
                          <Select placeholder="Selecione uma opção">
                            {field.options?.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </Select>
                          <VStack spacing={1} width="100%">
                            {field.options?.map((option, optionIndex) => (
                              <HStack key={optionIndex} spacing={2}>
                                
                                <Input
                                  size="sm"
                                  focusBorderColor="primary.400"
                                  borderRadius={"md"}
                                  placeholder="Opção"
                                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                />
                                <Button backgroundColor={"primary.100"}
                                  border={"2px"}
                                  borderColor={"#FF407D"}
                                  color="#FF407D"
                                  _hover={{ backgroundColor: "#FF407D", color: "primary.100" }}
                                  size={"sm"}
                                  onClick={() => handleRemoveOption(index, optionIndex)}>Remover</Button>
                              </HStack>
                            ))}
                          </VStack>
                          <Button
                            backgroundColor={"primary.500"}
                            color="primary.300"
                            _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
                            size={"sm"}
                            onClick={() => handleAddOption(index)}>Adicionar Opção</Button>
                        </VStack>
                      )}
                      
                    </FormControl>
                  </Box>
                ))}
              </SimpleGrid>
              <Flex direction={"row"} justifyContent={"space-between"}>
              <Button
                    leftIcon={<ChevronLeftIcon />}
                    onClick={() => router.back()}
                    color="primary.250"
                    backgroundColor={"white"}
                    _hover={{ backgroundColor: "primary.100", color: "primary.250" }}
                    zIndex="1000"
                  >
                    Voltar
                </Button>
              <Button 
              backgroundColor={"primary.500"}
              color="primary.300"
              _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
              size={"sm"} mt={4} onClick={handleSave}>
                Salvar
              </Button>
              </Flex>
           
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Form;
