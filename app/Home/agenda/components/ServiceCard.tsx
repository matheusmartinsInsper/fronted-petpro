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
import { Service } from "../page";
import {ServiceDetailsModal} from "./ModalService"

export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const statusColors = {
    Confirmado: 'primary.300',
    Concluído: '#2EB086',
    Cancelado: 'primary.600',
    Pendente : 'yellow.400'
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
        onClick={onOpen}
        cursor="pointer"
        zIndex={isExpanded?"20":"0"}
      >
        <Flex justify="space-between" align="center">
          <Box flex="1" pr={2}>
            <Text fontSize="sm" fontWeight="bold">{service.categoryname}</Text>
            <Text fontSize="xs" color="gray.500">{service.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            <Flex align="center">
              <Text fontSize="xs" color={statusColors[service.status]} mr={2}>
                {service.status}
              </Text>
              {statusIcons[service.status]}
            </Flex>
          </Box>
        </Flex>
        {isExpanded && (
          <Box mt={1}>
            <Text fontSize="xs">Cliente: {service.clientName}</Text>
            <Text fontSize="xs">Comentario: {service.clientComment}</Text>
          </Box>
        )}
      </Box>

      <ServiceDetailsModal isOpen={isOpen} onClose={onClose} service={service} />
    </>
  );
};
