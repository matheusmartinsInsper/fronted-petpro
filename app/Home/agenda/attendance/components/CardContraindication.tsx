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
  FormLabel,
  Icon
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon, InfoOutlineIcon ,NotAllowedIcon} from '@chakra-ui/icons';
import axios from "../../../../../utils/axiosConfig";
import AnexoUploader from './AnexoUploades';
import { MdPets } from "react-icons/md";
import { FaExclamationCircle } from "react-icons/fa";
import { Contraindication } from '../[id]/page';
import { MdGroups, MdRestaurant } from "react-icons/md";
import { FaCut, FaRunning,FaBone,FaDog,FaBasketballBall } from "react-icons/fa";
import { GiSyringe, GiBrain ,GiScalpel} from "react-icons/gi";
import { BsThreeDots } from "react-icons/bs";

type ContraindicationCategory =
  | "Alergia"
  | "Convívio"
  | "Medicamentos"
  | "Cirurgias"
  | "Vacinas"
  | "Alimentação"
  | "AtividadeFisica"
  | "Comportamento"
  | "Outros";

  const categoryIcons: Record<ContraindicationCategory, React.ElementType> = {
    Alergia: WarningIcon,       // Ícone do Chakra UI
    Convívio: FaDog,         // Ícone do React Icons
    Medicamentos: GiSyringe,       // Ícone do React Icons
    Cirurgias: GiScalpel,           // Ícone do React Icons
    Vacinas: GiSyringe,         // Ícone do React Icons
    Alimentação: FaBone,  // Ícone do React Icons
    AtividadeFisica: FaBasketballBall, // Ícone do React Icons
    Comportamento: GiBrain,     // Ícone do React Icons
    Outros: BsThreeDots,        // Ícone do React Icons
  };


export const CardContraindication:React.FC<{ contraindication: Contraindication }>=({contraindication})=>{

  const validCategories: ContraindicationCategory[] = [
    "Alergia",
    "Convívio",
    "Medicamentos",
    "Cirurgias",
    "Vacinas",
    "Alimentação",
    "AtividadeFisica",
    "Comportamento",
    "Outros",
  ];

  const category = validCategories.includes(contraindication.categoria as ContraindicationCategory)
    ? (contraindication.categoria as ContraindicationCategory)
    : "Outros";

  const IconComponent = categoryIcons[category];
    return (
        <Box boxShadow={"sm"} display={"flex"} mb={2} key={contraindication.idcontraindication} height={"120px"} bgColor={"white"} fontSize={"sm"} border={"1px"} borderColor={"gray.200"} borderRadius={"md"} p="2" py={4} flexDirection={'row'}>
        <Flex flexDirection={'column'} mx={2}>
        <Box mr={2} borderRadius={"50%"} bgColor={"primary.500"} display={"flex"} justifyContent={"center"} alignItems={"center"} boxSize={8}>
            <Icon  as={IconComponent} color="primary.300" boxSize="5" />
            </Box>
        </Flex>
        <Flex fontSize={"xs"} flexDirection={'column'}  mb="1">
            <Flex textAlign={"center"} flexDirection={'row'}>
            Contraindicação:
            <Text ml={2} fontWeight={"bold"} fontSize={"xs"}>{contraindication.categoria}</Text>
            </Flex>
            <Flex fontSize={"xs"} flexDirection={'column'}>Descrição:<Text ml={0} fontWeight={"bold"} fontSize={"xs"}>{contraindication.description}</Text></Flex>
        </Flex>
        
      </Box>
    )
   
}