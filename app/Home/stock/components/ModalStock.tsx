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
    Image
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
    ArrowDownIcon, ArrowUpIcon, ChevronRightIcon as ExpandIcon
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
                            size="sm"
                            bg="white"
                            color="primary.200"
                            boxShadow={currentPageNavigation == "stock" ? "md" : "none"}
                            _hover={{ bg: 'primary.100' }}
                            onClick={() => { setNavigation("stock") }}
                            fontWeight="bold" mr={"2"}>Produto</Button>
                        <Button
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
                        <ModalBody display={"flex"} flexDirection={"row"} pb={6}>
                            <Image
                                src="/bolinhabrinquedo.jpg" width={["50%", "40%"]} height={["50%", "40%"]} borderRadius={"md"} boxShadow={"md"} mr={4}
                            />
                            <Box ml={4}>
                                <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} mb={0}>
                                    <Flex flexDirection={"row"}>
                                        <Text mr={2}>Produto:</Text>
                                        <Text fontWeight={"bold"}>{stock.nameitem}</Text>
                                    </Flex>
                                    <Flex flexDirection={"row"}>
                                        <Text mr={2}>Tamanho:</Text>
                                        <Text fontWeight={"bold"}>{stock.itemsize.size}</Text>
                                    </Flex>
                                    <Flex flexDirection={"row"}>
                                        <Text mr={2}>Preço:</Text>
                                        <Text fontWeight={"bold"}>R$ {stock.itemsize.price}</Text>
                                    </Flex>
                                </Box>
                                <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} mb={2}>
                                    <Flex flexDirection={"row"} mb={0}>
                                        <Text mr={2}>Unidade:</Text>
                                        <Text fontWeight={"bold"}>{stock.unity}</Text>
                                    </Flex>
                                    <Flex flexDirection={"row"}>
                                        <Text mr={2}>Lote:</Text>
                                        <Text fontWeight={"bold"}>{stock.lote}</Text>
                                    </Flex>
                                    <Flex flexDirection={"row"}>
                                        <Text mr={2}>Em estoque :</Text>
                                        <Text fontWeight={"bold"}>{stock.quantity}</Text>
                                    </Flex>
                                    <Flex flexDirection={"row"}>
                                        <Text mr={2}>Atualizado em :</Text>
                                        <Text fontWeight={"bold"}>{format(stock.updatedate, "dd/MM/yy HH:mm")}</Text>
                                    </Flex>
                                    <Flex flexDirection={"row"}>
                                        <Text mr={2}>Disponível na loja:</Text>
                                        <Text fontWeight={"bold"}>{stock.itemsize.avalaible == true ? "Sim" : "Não"}</Text>
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
                                        <Text fontWeight={"bold"}>R$ {despesa.toFixed(2)}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text mr={2}>Receita:</Text>
                                        <Text fontWeight={"bold"} >R$ {receita.toFixed(2)} </Text>
                                    </Flex>
                                </Box>
                                <Box>
                                    <Flex>
                                        <Text mr={2}>Lucro Bruto:</Text>
                                        <Text fontWeight={"bold"}>R$ {lucroBruto.toFixed(2)}{lucroBruto < 0 ? <ArrowDownIcon ml={2} color={"primary.600"} /> : <ArrowUpIcon ml={2} color={"primary.800"} />}</Text>
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