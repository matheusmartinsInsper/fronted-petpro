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
    Text,
    Image,
    Box,
    Flex,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useDisclosure,
    Link,
    Switch,
    SimpleGrid,
    Card,
    CardBody,
    Icon,
    Tooltip,
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
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { FiPieChart, FiBarChart2, FiBox } from "react-icons/fi";
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import axios from "axios";
import { StockItem, Transactions } from "../page";
import { Label } from "recharts";
import { setPriority } from "os";


const ModalStock = ({ transactions }: { transactions: Transactions[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [lastTransiction, setlastTransiction] = useState<any>();
    const [despesa, setdespesa] = useState<number>(0);
    const [receita, setreceita] = useState<number>(0);
    const itemsPerPage = 7;
    const [filteredTransactions, setfilteredTransactions] = useState<Transactions[]>([]);
    const [lucroBruto, setLucroBruto] = useState<number>(0);
    const [margemLucro, setMargemLucro] = useState<number>(0);
    const [sortConfig, setSortConfig] = useState([{ key: 'quantity', direction: 'ascending' }, { key: 'priceunity', direction: 'ascending' }, { key: 'datecreate', direction: 'ascending' }]);

    useEffect(() => {
        gettransactions()
        setdespesa(calcularDespesa(transactions))
        setreceita(calcularReceita(transactions))
        setLucroBruto(calcularLucroBruto(transactions))
        setlastTransiction(sortedTransactions[0]);
        setMargemLucro(calcularMargemLucro(transactions, calcularLucroBruto(transactions)))
    }, [])
    const gettransactions = () => {
        setfilteredTransactions(transactions)
    }
    const sortedTransactions = transactions.sort(
        (a, b) => new Date(b.datecreate).getTime() - new Date(a.datecreate).getTime()
    );
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
    // useEffect(() => {
    //     const lucro = calcularLucroBruto(stocks.transactions);
    //     setLucroBruto(lucro);
    //     const despesa = calcularDespesa(stocks.transactions)
    //     setdespesa(despesa);
    //     const receita = calcularReceita(stocks.transactions)
    //     setreceita(receita);

    //     const margem = calcularMargemLucro(stocks.transactions, lucro);
    //     setMargemLucro(margem);
    // }, [stocks]);
    const handlePageChange = (direction: "next" | "prev") => {
        const totalPages = Math.ceil(transactions.length / itemsPerPage);

        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            console.log(paginatedTransaction)
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            console.log(paginatedTransaction)
        }
    };
    const handleSort = (key: string) => {
        // Definir direção inicial como 'ascending'
        let direction = 'ascending';

        // Verificar se a key já existe no sortConfig
        const existingSortConfig = sortConfig.find((x) => x.key === key);

        if (existingSortConfig) {
            // Se a direção já for 'ascending', altere para 'descending'
            direction = existingSortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        }

        // Atualizar o estado de sortConfig
        setSortConfig((prev) => {
            // Substituir o objeto existente no array
            return prev.map((x) =>
                x.key === key ? { ...x, direction } : x
            );
        });

        // Ordenar os dados de acordo com a direção
        const sortedData = [...filteredTransactions].sort((a: any, b: any) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        // Atualizar o estado de filteredTransactions
        setfilteredTransactions(sortedData);
    };


    const getSortIcon = (key: string) => {
        const confisort = sortConfig.find((x) => x.key === key)
        if (confisort) {
            return confisort.direction === 'ascending' ? <TriangleUpIcon /> : <TriangleDownIcon />;
        }
    };

    // Calcula os dados paginados diretamente a partir de `filteredTransactions`
    const paginatedTransaction = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const toast = useToast();


    return (
        <>
            <SimpleGrid zIndex={2} mx={4} mb="2" columns={{ base: 1, md: 2, lg: 4 }} spacing="2" position={"relative"}>

                <Card maxHeight={"100px"}>
                    <CardBody color="primary.250" _hover={{ backgroundColor: "primary.300", color: "primary.100", borderRadius: "md", transition: "0.2" }} transition={"1"}>

                        <Flex align="center" >
                            {/* <Icon as={BellIcon} boxSize={4} mr={"2"} /> */}
                            <Heading size="sm" display={"flex"} flexDirection={"row"}><Text color={"primary.800"} mr="2">$</Text>Receita</Heading>
                        </Flex>
                        <Flex align={"end"} mt={2}>
                            <Text fontSize="xl" fontWeight="bold" mr={2} mb={-1}>R$ {Number(receita).toLocaleString("pt-BR")} </Text>
                        </Flex>

                    </CardBody>
                </Card>
                <Card maxHeight={"100px"}>
                    <CardBody color="primary.250" _hover={{ backgroundColor: "primary.300", color: "primary.100", borderRadius: "md", transition: "0.2" }} transition={"1"}>
                        <Flex align="center">
                            {/* <Icon as={FiBox} boxSize={4} mr={2} /> */}
                            <Heading size="sm" display={"flex"} flexDirection={"row"}><Text color={"primary.800"} mr="2">$</Text>Despesa</Heading>
                        </Flex>
                        <Flex align={"end"} mt={2}>
                            <Text fontSize="xl" fontWeight="bold" mr={2} mb={-1}>R$ {Number(despesa).toLocaleString("pt-BR")}</Text>
                        </Flex>
                    </CardBody>
                </Card>

                <Card maxHeight={"100px"}>
                    <CardBody className="group" color="primary.250" _hover={{ maxHeight: "100px", backgroundColor: "primary.300", color: "primary.100", borderRadius: "md", transition: "0.2" }} transition={"1"} >
                        <Flex align="center">
                            <Icon as={FiBarChart2} boxSize={4} mr={2} color={"primary.300"} _groupHover={{ color: "primary.100" }} />
                            <Heading size="sm" >Resumo</Heading>
                        </Flex>
                        <Flex align={"end"} mt={2} display={"flex"} justifyContent={"space-between"}>
                            <Box>
                                <Text fontSize="md" fontWeight="bold" mr={2} mb={-1}>Lucro Bruto</Text>
                                <Text _groupHover={{ color: "gray.300" }} fontSize="sm" color="gray.500" >R$ {Number(lucroBruto.toFixed(2)).toLocaleString("pt-BR")} </Text>
                            </Box>
                            <Box>
                                <Text fontSize="md" fontWeight="bold" mr={2} mb={-1}>Margem</Text>
                                <Text fontSize="sm" color={margemLucro < 0 ? "primary.600" : "primary.800"} >{Number(margemLucro.toFixed(2)).toLocaleString("pt-BR")} % </Text>
                            </Box>
                        </Flex>
                    </CardBody>
                </Card>

                <Card maxHeight={"100px"}>
                    <CardBody className="group" color="primary.250" _hover={{ backgroundColor: "primary.300", color: "primary.100", borderRadius: "md", transition: "0.2", maxHeight: "100px" }} transition={"1"}>
                        <Flex align="center" flexDirection={"row"}>
                            {/* <Icon as={FiAlertCircle} boxSize={4} mr={2} color={"primary.600"} /> */}
                            <Icon as={FiBox} boxSize={4} mr={2} />
                            <Heading size="sm" >Ultima transação -</Heading>
                            <Text _groupHover={{ color: "primary.100" }} ml={"1"} fontSize={"xs"} color={"gray.500"}>{lastTransiction?.datecreate != null ? format(new Date(lastTransiction?.datecreate), "dd/MM/yy HH:mm") : null}</Text>
                        </Flex>
                        <Flex mt={2} flexDirection={"row"} justifyContent={"space-between"}>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold" >Categoria </Text>
                                <Text fontSize="xs" color={"gray.500"} _groupHover={{ color: "primary.100" }}>{lastTransiction?.category} </Text>
                            </Box>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold" >Lote </Text>
                                <Text fontSize="xs" color={"gray.500"} _groupHover={{ color: "primary.100" }}>{lastTransiction?.lote} </Text>
                            </Box>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold" >Transação </Text>
                                <Text fontSize="xs" color={"gray.500"} _groupHover={{ color: "primary.100" }}>{lastTransiction?.type == "Entrada" ? <ArrowUpIcon mr={1} color={"primary.300"} _groupHover={{ color: "primary.500" }} /> : <ArrowDownIcon mr={1} color={"primary.600"} />}{lastTransiction?.type}</Text>
                            </Box>
                        </Flex>
                    </CardBody>
                </Card>


            </SimpleGrid>

            <Box overflowX="auto" mb="14" borderRadius={"8px"} backgroundColor={"white"} boxShadow={"md"} mx="4">
                <Table variant="simple">
                    <Thead backgroundColor={"primary.200"} color={"primary.100"}>
                        <Tr>
                            <Th color={"primary.100"}>Produto</Th>
                            <Th color={"primary.100"}>Tamanho</Th>
                            <Th color={"primary.100"}>Lote</Th>
                            <Th color={"primary.100"}>Quantidade <IconButton
                                size="xs"
                                icon={getSortIcon('quantity')}
                                onClick={() => handleSort('quantity')}
                                aria-label="Sort Quantidade"
                                variant="ghost"
                                _hover={{ bgColor: "ghost" }}
                                color={"white"}
                                ml={2}
                            /></Th>
                            <Th color={"primary.100"}>Preço uni.
                                <IconButton
                                    size="xs"
                                    icon={getSortIcon('priceunity')}
                                    onClick={() => handleSort('priceunity')}
                                    aria-label="Sort Quantidade"
                                    variant="ghost"
                                    _hover={{ bgColor: "ghost" }}
                                    color={"white"}
                                    ml={2}
                                />
                            </Th>
                            <Th color={"primary.100"}>Transação</Th>
                            <Th color={"primary.100"}>Feito em
                                <IconButton
                                    size="xs"
                                    icon={getSortIcon('datecreate')}
                                    onClick={() => handleSort('datecreate')}
                                    aria-label="Sort Quantidade"
                                    variant="ghost"
                                    _hover={{ bgColor: "ghost" }}
                                    color={"white"}
                                    ml={2}
                                />
                            </Th>
                            <Th color={"primary.100"}>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {paginatedTransaction.map((transaction: any, index: any) => (
                            <Tr key={transaction.idtransaction} paddingY={"3"}>
                                <Td paddingY={"2.5"} overflow={"hidden"}
                                    textOverflow={"ellipsis"}
                                    whiteSpace={"nowrap"}
                                    maxWidth={"220px"} >{transaction.itemname}</Td>
                                <Td paddingY={"2.5"} overflow={"hidden"}
                                    textOverflow={"ellipsis"}
                                    whiteSpace={"nowrap"}
                                    maxWidth={"160px"} >{transaction.size}</Td>
                                <Td paddingY={"2.5"}>{transaction.lote}</Td>
                                <Td paddingY={"2.5"}>{transaction.quantity}</Td>
                                <Td paddingY={"2.5"}><Text textAlign={"center"} py={"1"} borderRadius={"md"} maxWidth={"80px"} bgColor={"#D5FFE4"} fontSize={"sm"} color={"primary.800"} fontWeight={"bold"}>R$ {transaction.priceunity}</Text></Td>
                                <Td paddingY={"2.5"}>{transaction.type == "Entrada" ? <ArrowUpIcon mr={1} color={"primary.300"} /> : <ArrowDownIcon mr={1} color={"primary.600"} />}{transaction.type}</Td>
                                <Td paddingY={"2.5"}>{format(transaction.datecreate, "dd/MM/yy HH:mm")}</Td> <Td paddingY={"3.5"}>
                                    <Flex>
                                        <IconButton
                                            aria-label="Expandir detalhes"
                                            icon={<DeleteIcon />}
                                            size="xs"
                                            color="primary.600"
                                            backgroundColor="white"
                                            boxShadow={"md"}
                                            _hover={{ backgroundColor: "primary.100" }}
                                        />

                                    </Flex>
                                </Td>
                            </Tr>
                        )
                        )}
                    </Tbody>
                </Table>
            </Box>
            <Flex
                justify="center"
                align="center"
                background="transparent"
                borderTopWidth="0px"
                borderColor="gray.200"
                p="4"
                position="fixed"
                bottom="0"
                width="calc(100% - 250px)"
            >
                <IconButton
                    aria-label="Previous Page"
                    icon={<ChevronLeftIcon />}
                    onClick={() => handlePageChange("prev")}
                    isDisabled={currentPage === 1} // Desabilita se estiver na primeira página
                    fontSize={"sm"}
                    size={"sm"}
                    bgColor={"primary.100"}
                    border={"2px"}
                    borderColor={"primary.100"}
                    color={"primary.300"}
                    mr="2"
                />
                <Text>
                    {currentPage}
                </Text>
                <IconButton
                    aria-label="Next Page"
                    icon={<ChevronRightIcon />}
                    onClick={() => handlePageChange("next")}
                    isDisabled={currentPage >= Math.ceil(filteredTransactions.length / itemsPerPage)}
                    ml="2"
                    fontSize={"sm"}
                    size={"sm"}
                    bgColor={"primary.100"}
                    border={"2px"}
                    borderColor={"primary.100"}
                    color={"primary.300"}
                />
            </Flex>

        </>
    );
};

export default ModalStock;