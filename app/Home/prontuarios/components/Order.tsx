"use client";

import React, { useState } from 'react';
import { format, differenceInHours, subDays, isSameDay } from "date-fns";
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
    VStack,
    HStack,
    Th, Table, Thead, Tbody, Tr, Td,Collapse
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, WarningIcon, InfoOutlineIcon, CheckIcon } from '@chakra-ui/icons';
import { useAppContext } from "../../../context/AppContext";
interface Order {
    waaccepted: boolean;
    tutorcancelled: boolean;
    idorderservice: string;
    idservice: string;
    nameuserowner: string;
    nameprofissional: string;
    datesolicitation: string;
    dateappointed: string;
    status: string;
    categoryname: string;
    title: string;
    price: number;
    comments: string;
    priority: string;
    attendancemodel: string;
    vaccines: Array<any>;
    subcategories: Array<{ title: string; price: number; idsubcategory: string; idservice: string }>;
}

export const Orderprontuario: React.FC<{ order: Order, key: string }> = ({ order, key }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { state } = useAppContext()
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const statusColors: any = {
        Confirmado: 'primary.300',
        Concluído: '#2EB086',
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

    const statusIcons: any = {
        Concluído: <CheckCircleIcon color="#2EB086" />,
        Cancelado: <WarningIcon color="primary.600" />,
    };

    return (
        <>
            <Box
                bg="white"
                color="primary.200"
                p={4}
                borderRadius="md"
                mb={1}
                boxShadow="md"
                key={key}
                zIndex={isExpanded ? "20" : "0"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                my={4}
                borderWidth={"1px"}
                borderColor={"gray.200"}
                _hover={{ borderColor: "gray.200" }}
                fontSize={"sm"}
            >
                <Box mb={2}>
                    <Text
                        textAlign={"center"}
                        fontSize={"xs"}
                        p={"1"}
                        maxWidth={"100px"}
                        borderRadius={"6px"}
                        borderColor={"primary.100"}
                        color={getPriorityColor(order.priority)}
                        boxShadow={"md"}
                        fontWeight={"bold"}
                        borderLeftWidth={'7px'}
                        borderLeftColor={getPriorityColor(order.priority)}
                    >
                        {order.priority}
                    </Text>
                </Box>
                <Box display={"flex"} flexDirection={"row"} mb={2}>
                    <HStack mr={4}>
                        <Text >Status:</Text>
                        <Text color={statusColors[order.status]} fontWeight={"bold"}>{order.status}</Text>
                    </HStack>
                    <HStack mr={4}>
                        <Text>Data da solicitação:</Text>
                        <Text fontWeight={"bold"}>{format(order.datesolicitation, "dd/MM/yy HH:mm")}</Text>
                    </HStack>
                    <HStack mr={4}>
                        <Text >Data do agendamento:</Text>
                        <Text fontWeight={"bold"}>{format(order.dateappointed, "dd/MM/yy HH:mm")}</Text>
                    </HStack>
                    <HStack mr={4}>
                        <Text >Atendimento:</Text>
                        <Text fontWeight={"bold"}>{order.attendancemodel}</Text>
                    </HStack>



                </Box>
                <Box display={"flex"} flexDirection={"row"} mb={2}>
                    <HStack mr={4}>
                        <Text >Categoria:</Text>
                        <Text fontWeight={"bold"}>{order.categoryname}</Text>
                    </HStack>
                    <HStack mr={4}>
                        <Text >Serviço:</Text>
                        <Text fontWeight={"bold"}>{order.title}</Text>
                    </HStack>
                    <HStack mr={4}>
                        <Text >Profissional:</Text>
                        <Text fontWeight={"bold"}>{order.nameprofissional}</Text>
                    </HStack>
                    <HStack mr={4}>
                        <Text >Pago:</Text>
                        <Text fontWeight={"bold"}>Não</Text>
                    </HStack>
                    <HStack mr={4}>
                        <Text >Valor:</Text>
                        <Text textAlign={"center"} minWidth={"50px"} fontWeight={"bold"} fontSize={"xs"}
                            backgroundColor={order.price === 0 ? "primary.300" : "#D5FFE4"}
                            p={"1"}
                            borderRadius={"5px"}
                            color={order.price === 0 ? "#FFEFEF" : "#2EB086"}>
                            {order.price === 0 ? "Variado" : `${order.price} R$`}
                        </Text>
                    </HStack>
                </Box>
                <Box display={"flex"} flexDirection={"row"} mb={2}>
                    <HStack mr={4}>
                        <Text >Comentario:</Text>
                        <Text fontWeight={"bold"}>{order.comments}</Text>
                    </HStack>
                    <HStack mr={4}>
                        <Text >Tutor cancelou:</Text>
                        <Text fontWeight={"bold"}>{order.tutorcancelled==true?"Sim":"Não"}</Text>
                    </HStack>
                </Box>
                <Box>
                    {/* Header com o botão de expandir/recolher */}
                    <Box width={"20px"} height={"20px"} display="flex" alignItems="center" justifyContent="center" bg="primary.100" p={4} borderRadius="md">
                      
                        <IconButton
                            aria-label={isExpanded ? "Recolher" : "Expandir"}
                            icon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            onClick={toggleExpand}
                            variant="ghost"
                            size="sm"
                            _hover={{bgColor:"transparent"}}
                        />
                    </Box>

                    {/* Conteúdo expansível */}
                    <Collapse in={isExpanded} animateOpacity>
                        <Box mt={1} display={"flex"} flexDirection={"row"}>
                            {/* Vacinas */}
                            {order.vaccines.length > 0 && (
                                <Box mt={6} fontSize={"sm"}>
                                    <Text fontWeight="bold" mb={2}>
                                        Vacinas
                                    </Text>
                                    <Table variant="striped" size="sm" width={"100%"}>
                                        <Thead fontSize={"xs"} backgroundColor={"primary.200"} color={"primary.100"}>
                                            <Tr>
                                                <Th fontSize={"xs"} color={"primary.100"}>Vacina</Th>
                                                <Th fontSize={"xs"} color={"primary.100"}>Código</Th>
                                                <Th fontSize={"xs"} color={"primary.100"}>Preço</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {order.vaccines.map((vaccine, index) => (
                                                <Tr key={index}>
                                                    <Td>{vaccine.nameofvaccine || '-'}</Td>
                                                    <Td>{vaccine.codevaccine || '-'}</Td>
                                                    <Td fontSize={"xs"} color={"primary.800"} fontWeight={"bold"} >
                                                        <Text as="span" fontSize={"xs"} color={"primary.800"} bgColor={"#D5FFE4"} borderRadius={"md"} py={1} px={2}>
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
                            {order.subcategories.length > 0 && (
                                <Box mt={2} fontSize={"sm"}>
                                    <Text fontWeight="bold" mb={2}>
                                        Subcategorias:
                                    </Text>
                                    <Table fontSize={"xs"} variant="striped" size="sm" width={"100%"} borderTopRadius={"md"}>
                                        <Thead fontSize={"xs"} backgroundColor={"primary.200"} color={"primary.100"} borderTopRadius={"md"}>
                                            <Tr>
                                                <Th fontSize={"xs"} color={"primary.100"}>Título</Th>
                                                <Th fontSize={"xs"} color={"primary.100"}>Preço</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody backgroundColor={"white"}>
                                            {order.subcategories.map((subcategory, index) => (
                                                <Tr backgroundColor={"white"} key={index} >
                                                    <Td fontSize={"sm"}>{subcategory.title}</Td>
                                                    <Td fontSize={"xs"} color={"primary.800"} fontWeight={"bold"} >
                                                        <Text as="span" fontSize={"xs"} color={"primary.800"} bgColor={"#D5FFE4"} borderRadius={"md"} py={1} px={2}>
                                                            {subcategory.price} R$
                                                        </Text>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Box>
                            )}
                        </Box>
                    </Collapse>
                </Box>

            </Box>
        </>
    );
};
