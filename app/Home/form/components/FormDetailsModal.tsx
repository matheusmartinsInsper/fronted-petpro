import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  SimpleGrid,
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  Box,
  Checkbox
} from "@chakra-ui/react";
import {
    SearchIcon,
    AddIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DeleteIcon,
    CheckCircleIcon,
    
  } from "@chakra-ui/icons";
import { Button } from 'react-day-picker';

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
}

interface EditFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: Form | null; // Altere aqui se necessário
}

const EditFormModal: React.FC<EditFormModalProps> = ({
  isOpen,
  onClose,
  form,
}) => {
  if (!form) return null; // Se não houver dados do formulário, não renderiza nada

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent height="80vh">
        <ModalHeader borderTopRadius={"md"} border={"1px"} bgColor={"primary.300"} borderColor={"primary.300"} color={"primary.100"}>Dados do formulario</ModalHeader>
        <ModalCloseButton color={"primary.100"}/>
        <ModalBody overflowY="auto" height="100%">
          <Text fontWeight="bold" my="2" boxShadow={"md"} p={"2"} alignItems={"center"} textAlign={"center"} borderRadius={"md"} border={"2px"} borderColor={"primary.100"}>{form.nameform}</Text>

          <SimpleGrid columns={2} spacing={4}>
            {form.attributes.map((attribute) => (
              <Box key={attribute.idattribute} mb={4}>
                <FormControl>
                  <FormLabel>{attribute.label}</FormLabel>

                  {attribute.typeattribute === 'text' && (
                    <Input
                      size="sm"
                      focusBorderColor="primary.400"
                      borderRadius={"md"}
                      placeholder="Digite o texto"
                      mt={2}
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
                    />
                  )}
                  {attribute.typeattribute === 'textarea' && (
                    <Textarea
                      size="sm"
                      focusBorderColor="primary.400"
                      borderRadius={"md"}
                      placeholder="Digite seu texto"
                      mt={2}
                    />
                  )}
                  {attribute.typeattribute === 'select' && (
                    <Select focusBorderColor="primary.400" placeholder="Selecione uma opção" mt={2} size={"sm"} borderRadius={"md"}>
                      {attribute.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </Select>
                  )}
                  {attribute.typeattribute === 'checkbox' && (
                    <Box mt={2}>
                      {attribute.options.map((option, optionIndex) => (
                        <FormControl key={optionIndex} display="flex">
                          <Checkbox  iconColor="primary.300" colorScheme="primary.100" _selected={{ color: "primary.300",outline:"none" }} value={option.value}>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditFormModal;
