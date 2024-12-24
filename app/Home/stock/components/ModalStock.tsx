import {
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useToast,
    FormControl, FormLabel,
    Flex,
    Box,
    Text,
    Image,
    Tooltip
} from "@chakra-ui/react";
import {
    SearchIcon,
    AddIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DeleteIcon,
    EditIcon,
    ChatIcon,
    CalendarIcon,
    ArrowDownIcon, ArrowUpIcon, ChevronRightIcon as ExpandIcon,
    CheckCircleIcon,
    NotAllowedIcon
} from "@chakra-ui/icons";
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import axios from "axios";
import { StockItem, Transactions } from "../page";
import { Label } from "recharts";
import { setPriority } from "os";

interface StockModalProps {
    isOpen: boolean;
    onClose: () => void;
    stock: StockItem
}

const ModalStock = ({ isOpen, onClose, stock }: StockModalProps) => {
    const [currentPageNavigation, setcurrentPageNavigation] = useState("stock");
    const [despesa, setdespesa] = useState<number>(0);
    const [receita, setreceita] = useState<number>(0);
    const [lucroBruto, setLucroBruto] = useState<number>(0);
    const [margemLucro, setMargemLucro] = useState<number>(0);

    // Função para calcular lucro bruto
    const calcularLucroBruto = (transactions: Transactions[]): number => {
        let lucroTotal = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "Saída") {
                const lucro = transaction.priceunity * transaction.quantity;
                lucroTotal += lucro;
            } else {
                const lucro = transaction.priceunity * transaction.quantity;
                lucroTotal -= lucro;
            }
        });

        return lucroTotal;
    };
    const calcularDespesa = (transactions: Transactions[]): number => {
        let despesatotal = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "Entrada") {
                const despesa = transaction.priceunity * transaction.quantity;
                despesatotal += despesa;
            }
        });

        return despesatotal;
    };
    const calcularReceita = (transactions: Transactions[]): number => {
        let receitatotal = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "Saída") {
                const receita = transaction.priceunity * transaction.quantity;
                receitatotal += receita;
            }
        });

        return receitatotal;
    };

    // Função para calcular margem de lucro
    const calcularMargemLucro = (transactions: Transactions[], lucroBruto: number): number => {
        let totalDespesa = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "Entrada") {
                totalDespesa += transaction.priceunity * transaction.quantity;
            }
        });

        return (lucroBruto / totalDespesa) * 100;
    };

    useEffect(() => {
        const lucro = calcularLucroBruto(stock.transactions);
        setLucroBruto(lucro);
        const despesa = calcularDespesa(stock.transactions)
        setdespesa(despesa);
        const receita = calcularReceita(stock.transactions)
        setreceita(receita);

        const margem = calcularMargemLucro(stock.transactions, lucro);
        setMargemLucro(margem);
    }, [stock]);

    const toast = useToast();
    const setNavigation = (page: string) => {
        setcurrentPageNavigation(page);
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                minWidth="33vw" >
                <ModalHeader color={"primary.100"} bgColor={"primary.200"} borderTopRadius={"md"} height={"sm"}>Estoque</ModalHeader>
                <ModalCloseButton color={"white"} />
                <ModalBody display={"flex"} flexDirection={"row"}>
                    <Flex flexDirection={"row"}>
                        <Button
                            borderWidth={"1px"}
                            borderColor={currentPageNavigation == "stock" ? "gray.200" : "transparent"}
                            size="sm"
                            bg="white"
                            color="primary.200"
                            boxShadow={currentPageNavigation == "stock" ? "md" : "none"}
                            _hover={{ bg: 'primary.100' }}
                            onClick={() => { setNavigation("stock") }}
                            fontWeight="bold" mr={"2"}>Produto</Button>
                        <Button
                            borderWidth={"1px"}
                            borderColor={currentPageNavigation == "Movimentation" ? "gray.200" : "transparent"}
                            size="sm"
                            bg="white"
                            color="primary.200"
                            boxShadow={currentPageNavigation == "Movimentation" ? "md" : "none"}
                            _hover={{ bg: 'primary.100' }}

                            onClick={() => { setNavigation("Movimentation") }}
                            fontWeight="bold" mr={"2"}>Movimentações</Button>
                    </Flex>
                </ModalBody>
                {currentPageNavigation == "stock" && (
                    <>
                        <ModalBody display={"flex"} flexDirection={"column"} pb={6}>
                            <Box display={"flex"} flexDirection={"row"}>
                                <Image
                                    src="/amoxilina.webp" width={["50%", "40%"]} height={["50%", "40%"]} borderRadius={"md"} mr={12}
                                />
                                <Box display={"flex"} flexDirection={"column"} justifyContent={"start"} mb={0}>

                                    <Flex flexDirection={"row"} width={"100%"}>
                                        <Text fontWeight={"bold"}>{stock.nameitem} / {stock.lote}</Text>
                                    </Flex>
                                    <Flex mt={"2"} flexDirection={"column"} width={"80%"}>
                                        <Text mr={2}>Tamanho</Text>
                                        <Flex textAlign={"center"} bgColor={"primary.500"} borderWidth={"1px"} borderColor={"primary.300"} borderRadius={"md"} flexDirection={"column"} py="2">
                                            <Text color={"primary.300"} fontWeight={"bold"}>{stock.itemsize.size}</Text>
                                            <Text color={"primary.300"} fontSize={"sm"}>R${stock.itemsize.price}</Text>
                                        </Flex>

                                    </Flex>
                                    <Box borderWidth={"1px"} borderColor={"gray.200"} width={"80%"} p={2} mt={"2"} boxShadow={"sm"} borderRadius={"md"} bgColor={"white"}>
                                        Estoque  <strong>{stock.quantity}</strong>
                                    </Box>
                                    <Tooltip
                                        label={`Produto ${stock.itemsize.avalaible ? "" : "não"} disponível na loja do aplicativo`}
                                        fontSize="sm"
                                        bg="gray.700"
                                        color="white"
                                        borderRadius="md"
                                        p={2}
                                    >
                                        <Flex mt={"2"} flexDirection={"row"} textAlign={"center"}>
                                            <Text fontSize={"sm"} mr={2}>Disponível</Text>
                                            <Text fontWeight={"bold"}>{stock.itemsize.avalaible == true ? <CheckCircleIcon mt="-1" color={"primary.800"} /> : <NotAllowedIcon mt="-1" color={"primary.600"} />}</Text>
                                        </Flex>
                                    </Tooltip>

                                </Box>
                            </Box>

                            <Box mt={2} borderTopWidth={"1px"} borderTopColor={"gray.200"}>

                                <Box mt={4} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} mb={2}>
                                    <Flex flexDirection={"column"} mb={2}>
                                        <Text mr={2}>Descrição </Text>
                                        <Text fontWeight={"bold"}>{stock.description}</Text>
                                    </Flex>
                                    <Flex flexDirection={"column"}>
                                        <Text mr={2}>Ultima transação </Text>
                                        <Text fontWeight={"bold"} color={"primary.250"}>{format(stock.updatedate, "dd/MM/yy HH:mm")}</Text>
                                    </Flex>

                                </Box>
                            </Box>

                        </ModalBody>
                    </>
                )
                }
                {currentPageNavigation == "Movimentation" && (
                    <>
                        <ModalBody width={"100%"} maxHeight={"62vh"} overflowY={"auto"} >
                            <Text fontSize={"md"} fontWeight={"bold"}>Resumo</Text>
                            <Box fontSize={"sm"} mb="2" display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                <Box>
                                    <Flex>
                                        <Text mr={2}>Despesa:</Text>
                                        <Text fontWeight={"bold"}>R$ {Number(despesa).toLocaleString("pt-BR")}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text mr={2}>Receita:</Text>
                                        <Text fontWeight={"bold"} >R$ {Number(receita).toLocaleString("pt-BR")} </Text>
                                    </Flex>
                                </Box>
                                <Box>
                                    <Flex>
                                        <Text mr={2}>Lucro Bruto:</Text>
                                        <Text fontWeight={"bold"}>R$ {Number(lucroBruto).toLocaleString("pt-BR")}{lucroBruto < 0 ? <ArrowDownIcon ml={2} color={"primary.600"} /> : <ArrowUpIcon ml={2} color={"primary.800"} />}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text mr={2}>Margem de lucro:</Text>
                                        <Text fontWeight={"bold"} color={margemLucro < 0 ? "primary.600" : "primary.800"}>{margemLucro.toFixed(2)} %</Text>
                                    </Flex>
                                </Box>


                            </Box>
                            {stock.transactions.map((transaction: any) => {
                                return (
                                    <Flex key={transaction.idtransaction} p={"2"} boxShadow={"md"} borderRadius={"md"} border={"1px"} borderColor={"gray.200"} flexDirection={"row"} fontSize={"xs"} width={"100%"} justifyContent={"space-around"} mb="2">
                                        <Box >
                                            <Text>Data</Text>
                                            <Text fontWeight={"bold"}>{format(transaction.datecreate, "dd/MM/yy HH:mm")}</Text>
                                        </Box>
                                        <Box >
                                            <Text>Quantidade</Text>
                                            <Text fontWeight={"bold"}>{transaction.quantity}</Text>
                                        </Box>
                                        <Box >
                                            <Text>Valor unit.</Text>
                                            <Text borderRadius={"md"} textAlign={"center"} bgColor={"#D5FFE4"} fontWeight={"bold"} color={"primary.800"}>R$ {transaction.priceunity}</Text>
                                        </Box>
                                        <Box >
                                            <Text>Lote</Text>
                                            <Text fontWeight={"bold"}>{transaction.lote}</Text>
                                        </Box>
                                        <Box >
                                            <Text>Transação</Text>
                                            <Text fontWeight={"bold"}>{transaction.type} {transaction.type == "Entrada" ? <ArrowUpIcon color={"primary.300"} /> : <ArrowDownIcon color={"primary.600"} />}</Text>
                                        </Box>
                                    </Flex>
                                )
                            })}
                        </ModalBody>
                    </>
                )
                }
            </ModalContent>
        </Modal>
    );
};

export default ModalStock;