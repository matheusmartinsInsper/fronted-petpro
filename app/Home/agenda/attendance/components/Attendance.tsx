"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { format, differenceInHours ,subDays,isSameDay} from "date-fns";
import {
  Box,
  Flex,
  Text,
  VStack,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Button,
  useToast,
  Textarea,
  HStack,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon, InfoOutlineIcon ,NotAllowedIcon} from '@chakra-ui/icons';
import axios from "../../../../../utils/axiosConfig";
import { AttendanceData } from "../[id]/page";
import AnexoUploader from './AnexoUploades';

const statusColors: Record<string, string> = {
  Confirmado: 'primary.300',
  Concluido: '#2EB086',
  Cancelado: 'primary.600',
  Pendente: 'yellow.400',
  Andamento: 'primary.900'
};
const getPriorityColor = (status: string) => {
    switch (status) {
      case 'Não urgente':
        return 'primary.1100';
      case 'Pouco urgente':
        return 'primary.800';
      case 'Urgente':
        return 'primary.900';
      case "Muito urgente":
        return 'primary.1000';
      case "Emergencia":
        return "primary.600"
      default:
        return 'gray.500';
    }
  };
  
export const Attendance: React.FC<{ att: AttendanceData, onFilesUpdate: (files: any[]) => void,conclude: ()=>void, handlefield: (field: string, value: any)=>void}> = ({ att,onFilesUpdate,conclude,handlefield }) => {
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
  };

  return (
    <Box px={6} py={2} display={"flex"} flexDirection={"row"}  width={"100%"} height="calc(100vh - 100px)" overflow={"hidden"}>
        <Box width={"50%"} overflowY={"scroll"}>
        <Text fontSize="md" color={"primary.300"} fontWeight="bold" mb={4} borderBottomWidth={"1px"}p="2" bgColor={"primary.500"} borderBottomColor={"primary.300"}>
        Dados da solicitação
      </Text>
      
      {/* Informações do Serviço */}
      <VStack align="start" spacing={2} mt={4} fontSize={"sm"}>
      <Text fontWeight={"bold"} bgColor={"white"} p={1} borderLeftWidth={"7px"} borderRadius={"md"} borderLeftColor={getPriorityColor(att.service.priority)} boxShadow={"md"} fontSize={"xs"}  color={getPriorityColor(att.service.priority)}>{att.service.priority}</Text>
      <Text fontSize="sm" fontWeight="bold">
        Status:{' '}
        <Text as="span"  color={statusColors[att.status]}>
          {att.status}
        </Text>
      </Text>
        <Text>
          <strong>Categoria:</strong> {att.service.category}
        </Text>
        <Text>
          <strong>Título:</strong> {att.service.title}
        </Text>
        <Text>
          <strong>Atendimento:</strong> {att.service.atendimento}
        </Text>
        <Text>
          <strong>Descrição:</strong> {att.service.description}
        </Text>
        <Text>
          <strong>Data solicitação:</strong> {format(att.service.datesolicitation, "dd/MM/yy HH:mm")}
        </Text>
        <Text>
          <strong>Data agendamento:</strong> {format(att.service.dateapontted, "dd/MM/yy HH:mm")}
        </Text>
        <Text fontSize="sm" fontWeight="bold">
        Valor total:{' '}
        <Text as="span" fontSize={"xs"}  color={"primary.800"} bgColor={"#D5FFE4"} borderRadius={"md"} py={1} px={2}>
          {att.service.totalprice} R$
        </Text>
      </Text>
      <Text textAlign={"center"} >
          <strong>Pago:</strong> {att.service.waspaid} {att.service.waspaid=="Não"?<NotAllowedIcon mt={"-1"} color={"primary.600"} boxSize={"4"} />:<CheckCircleIcon mt={"-1"} color={"primary.800"} boxSize={"4"} />} 
        </Text>
        <Text>
          <strong>Comentário tutor:</strong> {att.service.commnets}
        </Text>
        
      </VStack>

      {/* Vacinas */}
      {att.service.vacinas.length > 0 && (
        <Box mt={6} fontSize={"sm"}>
          <Text fontWeight="bold" mb={2}>
            Vacinas
          </Text>
          <Table variant="striped" size="sm" width={"75%"}>
            <Thead fontSize={"xs"} backgroundColor={"primary.200"} color={"primary.100"}>
              <Tr>
                <Th fontSize={"xs"} color={"primary.100"}>Vacina</Th>
                <Th fontSize={"xs"} color={"primary.100"}>Código</Th>
                <Th fontSize={"xs"} color={"primary.100"}>Preço</Th>
              </Tr>
            </Thead>
            <Tbody>
              {att.service.vacinas.map((vaccine, index) => (
                <Tr key={index}>
                  <Td>{vaccine.nameofvaccine || '-'}</Td>
                  <Td>{vaccine.codevaccine || '-'}</Td>
                  <Td fontSize={"xs"} color={"primary.800"} fontWeight={"bold"} >
                  <Text as="span" fontSize={"xs"}  color={"primary.800"} bgColor={"#D5FFE4"} borderRadius={"md"} py={1} px={2}>
          {vaccine.price} R$
        </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Subcategorias */}
      {att.service.subcategorias.length > 0 && (
        <Box mt={2} fontSize={"sm"}>
          <Text   fontWeight="bold" mb={2}>
            Subcategorias:
          </Text>
          <Table fontSize={"xs"} variant="striped" size="sm" width={"75%"} borderTopRadius={"md"}>
            <Thead fontSize={"xs"} backgroundColor={"primary.200"} color={"primary.100"} borderTopRadius={"md"}>
              <Tr>
                <Th fontSize={"xs"} color={"primary.100"}>Título</Th>
                <Th fontSize={"xs"} color={"primary.100"}>Preço</Th>
              </Tr>
            </Thead>
            <Tbody  backgroundColor={"white"} >
              {att.service.subcategorias.map((subcategory, index) => (
                <Tr backgroundColor={"white"} key={index}>
                  <Td fontSize={"sm"}>{subcategory.title}</Td>
                  <Td fontSize={"xs"} color={"primary.800"} fontWeight={"bold"} >
                  <Text as="span" fontSize={"xs"}  color={"primary.800"} bgColor={"#D5FFE4"} borderRadius={"md"} py={1} px={2}>
          {subcategory.price} R$
        </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
         
        </Box>
      )}
       <Text fontWeight={"bold"} fontSize={"sm"} mb="2" mt="4">Pagamento -  
        <Button
        size={"xs"}
        boxShadow={"md"}
        fontWeight={"bold"}
        bgColor={"primary.500"}
        color={"primary.300"}
        ml={"2"}
        _hover={{bgColor:"primary.300",color:"primary.100"}}
        onClick={() => toast({ title: "Atendimento concluído!", status: "success", duration: 3000, isClosable: true })}
      >
        Gerar pagamento $
      </Button></Text>
        </Box>
        <Box  width={"50%"} overflowY={"scroll"} pl={"4"}>
        <Text fontSize="md" color={"primary.300"} fontWeight="bold" mb={4} borderBottomWidth={"1px"} p={"2"} borderBottomColor={"primary.300"} bgColor={"primary.500"}>
        Dados do atendimento
        </Text>
        <HStack spacing={4} mb="2">
        <FormControl>
          <FormLabel fontWeight={"bold"} fontSize="sm" color="primary.200">Hipótese</FormLabel>
          <Textarea
            placeholder="Preencha a hipótese"
            value={att.hipotese}
            size="sm"
            focusBorderColor="primary.400"
            borderRadius="md"
            name='hipotese'
            onChange={(e) => handlefield('hipotese', e.target.value)}
          />
        </FormControl>
        
        <FormControl>
          <FormLabel fontWeight={"bold"}  fontSize="sm" color="primary.200">Conclusão</FormLabel>
          <Textarea
            placeholder="Preencha a conclusão"
            value={att.conclusao}
            size="sm"
            focusBorderColor="primary.400"
            borderRadius="md"
            name='conclusao'
            onChange={(e) => handlefield('conclusao', e.target.value)}
          />
        </FormControl>
        </HStack>
        <Text fontWeight={"bold"} fontSize={"sm"} mb="2">Anexos</Text>
        <AnexoUploader onFilesUpdate={onFilesUpdate}/>
       
        </Box>
        <Button
        position="absolute"
        bottom="4"
        right="4"
        mr={"6"}
        mb={"6"}
        size={"sm"}
        boxShadow={"md"}
        fontWeight={"bold"}
        bgColor={"primary.500"}
        color={"primary.300"}
        _hover={{bgColor:"primary.300",color:"primary.100"}}
        onClick={() => conclude()}
        isDisabled={att.status==="Concluido"}
      >
        Concluir
      </Button>
    </Box>
  );
};
