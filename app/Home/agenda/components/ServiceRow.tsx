"use client";

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Circle,
  VStack
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, WarningIcon,InfoOutlineIcon,CheckIcon } from '@chakra-ui/icons';
import { Service } from "./ModelAgenda";
import {ServiceDetailsModal} from "./ModalService"

export const ServiceRow: React.FC<{ service: Service,selectservice: (service: Service)=>void,idservice: string }> = ({ service,selectservice,idservice }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const statusColors = {
    Confirmado: 'primary.300',
    Concluído: '#2EB086',
    Cancelado: 'primary.600',
    Pendente : 'yellow.400'
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

  const statusIcons: any = {
    Concluído: <CheckCircleIcon color="#2EB086" />,
    Cancelado: <WarningIcon color="primary.600" />,
  };

  return (
    <>
      <Box
        bg="white"
        color="primary.200"
        p={2}
        borderRadius="md"
        mb={1}
        minWidth="110px"
        boxShadow="md"
        position="relative"
        onClick={()=>{selectservice(service)}}
        cursor="pointer"
        key={idservice}
        zIndex={isExpanded?"20":"0"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        borderLeftWidth={"7px"}
        borderLeftColor={"white"}
        _hover={{borderLeftColor:"primary.300"}}
      >
        <Text ml={"-1"}>{service.titulo}</Text>
        <Text textAlign={"center"} minWidth={"50px"} fontWeight={"bold"}  fontSize={"xs"}
                    backgroundColor={service.preço === 0 ? "primary.300" : "#D5FFE4"} 
                     p={"1"} 
                     borderRadius={"5px"} 
                     color={service.preço === 0 ? "#FFEFEF" : "#2EB086"}>
                      {service.preço === 0 ? "Variado" : `${service.preço} R$`}
        </Text>
      </Box>
    </>
  );
};
