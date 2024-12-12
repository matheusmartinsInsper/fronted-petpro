"use client";

import {
    Box,
    Flex,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    IconButton,
    Button,
    Text,
    useDisclosure,
    useToast,
    Image,
    Link,
    Switch,
    SimpleGrid,
    Card,
    CardBody,
    Icon,
    Tooltip
} from "@chakra-ui/react";
import { FaUser, FaChartBar, FaDollarSign } from 'react-icons/fa';
import {
    SearchIcon,
    AddIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DeleteIcon,
    EditIcon,
    ChatIcon,
    CalendarIcon,
    ArrowDownIcon, ArrowUpIcon
} from "@chakra-ui/icons";
import { FiClipboard, FiBox, FiUsers, FiUser, FiAlertCircle } from "react-icons/fi";
import { format } from 'date-fns';
import { MdAdd, MdArrowCircleDown, MdArrowCircleUp } from 'react-icons/md';
import Sidebar from "../components/Sidebar";
import Header from "../components/headers";
import { useState, useEffect } from "react";
import axios from "../../../utils/axiosConfig";
import IsideStock from "./components/InsideStock"
import OutsideStock from "./components/OutsideStock"

interface ItemSize {
    iditem: string | null;
    iditemsize: string;
    size: string;
    price: number;
    avalaible: boolean;
}

export interface StockItem {
    idstock: string;
    iditem: string;
    iditemsize: string;
    createdate: string;
    updatedate: string;
    lote: string;
    quantity: number;
    nameitem: string;
    categoryitem: string;
    unity: string;
    description: string;
    itemsize: ItemSize;
}


const Stock = () => {
    const [stocks, setStocks] = useState<StockItem[]>([]);
    const [filteredeStocks, setfilteredeStocks] = useState<StockItem[]>([]);
    const [currentPageNavigation, setcurrentPageNavigation] = useState("Estoque");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalStock, settotalStock] = useState(0);
    const [totalStockPrice, settotalStockPrice] = useState(0);
    const itemsPerPage = 7;
    const [toggleState, setToggleState] = useState<"Pessoal" | "rede">("Pessoal");
    const [toggleStateapi, setToggleStateapi] = useState<"User" | "NetWork">("User");
    const toast = useToast();
    const [isOpenAgenda, setIsOpen] = useState(false);
    const [selectedStock, setselectedStock] = useState<StockItem>();
    const [selectedStockDown, setselectedStockDown] = useState<StockItem>();
    const { isOpen: isRemoveOpen, onOpen: onRemoveOpen, onClose: onRemoveClose } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModal = (stock: StockItem) => {
        setselectedStock(stock); // Define o stock selecionado
        onOpen();; // Abre o modal
    };
    const openModalBaixa = (stock: StockItem) => {
        setselectedStockDown(stock); // Define o stock selecionado
        onRemoveOpen();; // Abre o modal
    };
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };
    useEffect(() => {
        if (selectedStock) {
            setIsOpen(true); // Abre o modal quando selectedClient é atualizado
        }
        console.log(selectedStock)
    }, [selectedStock]);
    useEffect(() => {
        fetchStock()
    }, [])

    const fetchStock = async () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('Authorization');
            console.log(token);
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }
        try {
            const response = await axios.get('/Stock'); // Substitua pela URL da sua API
            if (response.data.status === 'confirmed') {
                const formattedClient: StockItem[] = response.data.data.map((item: any) => ({
                    idstock: item.idstock,
                    iditem: item.iditem,
                    iditemsize: item.iditemsize,
                    createdate: item.createdate,
                    updatedate: item.updatedate,
                    lote: item.lote,
                    quantity: item.quantity,
                    nameitem: item.nameitem,
                    categoryitem: item.categoryitem,
                    unity: item.unity,
                    description: item.description,
                    itemsize: {
                        iditem: item.itemsize.iditem,
                        iditemsize: item.itemsize.iditemsize,
                        size: item.itemsize.size,
                        price: item.itemsize.price,
                        avalaible: item.itemsize.avalaible,
                    },
                }));

                setStocks(formattedClient);
                setfilteredeStocks(formattedClient);
                countTotalstock(formattedClient);
                countTotalstockPrice(formattedClient)
            }
        } catch (error) {
            toast({
                title: "Erro ao buscar Clientes",
                description: "Ocorreu um erro ao tentar buscar os clientes. Tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };
    const countTotalstock = (stocks: StockItem[]) => {
        let sum = 0
        stocks.map((item, i) => {
            sum += item.quantity
        })
        settotalStock(sum);
    }
    const countTotalstockPrice = (stocks: StockItem[]) => {
        let sum = 0
        stocks.map((item, i) => {
            sum += item.itemsize.price * item.quantity
        })
        settotalStockPrice(sum);
    }
    const handlePageChange = (direction: "next" | "prev") => {
        if (
            direction === "next" &&
            currentPage * itemsPerPage < filteredeStocks.length
        ) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleToggleChange = () => {
        const newToggleState = toggleState === "Pessoal" ? "rede" : "Pessoal";
        const newToggleStateapi = toggleStateapi === "User" ? "NetWork" : "User";
        setToggleState(newToggleState);
        setToggleStateapi(newToggleStateapi);
    };
    const setNavigation = (page: string) => {
        setcurrentPageNavigation(page);
    }
    const paginatedStock = filteredeStocks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    //   const handleRemoveSuccess = (name: string) => {
    //     setClients(clients.filter(client => client.name !== name));
    //     setfilteredclients(filteredclients.filter(client => client.name !== name));
    //     toast({
    //       title: "Cliente removido",
    //       description: `${name} foi removido com sucesso.`,
    //       status: "success",
    //       duration: 5000,
    //       isClosable: true,
    //     });
    //   };
    return (
        <>
            <Header />
            <Flex direction="column" minHeight="calc(100vh - 40px)" backgroundColor={"primary.100"}>
                <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                <Box

                    py="2"
                    marginLeft={isCollapsed ? "60px" : "250px"}
                    width={isCollapsed ? "calc(100% - 60px)" : "calc(100% - 250px)"}
                    flex="1"
                    borderRadius="md"
                    position="relative"
                >
                    <Flex justify="space-between" align="center" mb="2" borderBottomColor={"gray.200"} borderBottomWidth={"1px"} pb={"1"} px="4">
                        <Heading as="h1" size="sm" color={"primary.200"} display={"flex"} flexDirection={"row"}><Text color="gray.500">Settings
                            <ChevronRightIcon />

                        </Text>Estoque</Heading>

                        <Button
                            backgroundColor="white"
                            borderRadius="md"
                            size="sm"
                            py="2"
                            mt="1"
                            boxShadow="md"
                            ml="4"
                            _hover={{ backgroundColor: "white" }}
                        >
                            <Box ml="0">
                                <Switch
                                    colorScheme="purple"
                                    isChecked={toggleState === "rede"}
                                    onChange={handleToggleChange}
                                    size="sm"
                                    tabIndex={-1}
                                    _focus={{ outline: "none", boxShadow: "none" }}
                                    _active={{ outline: "none", boxShadow: "none" }}
                                    onMouseDown={(e) => e.preventDefault()}
                                />
                            </Box>
                            <Text ml="2" color="primary.250" fontWeight="bold" fontSize="sm">
                                {toggleState === "Pessoal" ? "Pessoal" : "Rede"}
                            </Text>
                        </Button>
                        <Box ml="auto">
                            <Input
                                placeholder="Pesquisar por nome"
                                width="300px"
                                size="sm"
                                mr="4"
                                focusBorderColor="primary.400"
                                borderRadius={"md"}
                            />
                            <IconButton
                                aria-label="Pesquisar"
                                icon={<SearchIcon />}
                                onClick={() => { }}
                                size="sm"
                                variant="outline"
                            />
                        </Box>
                    </Flex>
                    <Flex justify="space-between" align="center" mb="2" borderBottomColor={"gray.200"} borderBottomWidth={"1px"} pb={"1"} px="4">
                        <Box>
                            <Button
                                size="sm"
                                bg="white"
                                color="primary.200"
                                boxShadow={"md"}
                                _hover={{ bg: 'primary.100' }}
                                onClick={() => { setNavigation("Estoque") }}
                                fontWeight="bold" mr={"2"}>Estoque</Button>
                            <Button
                                size="sm"
                                bg="primary.100"
                                color="primary.200"
                                boxShadow={"none"}
                                _hover={{ bg: 'primary.100' }}
                                onClick={() => { setNavigation("Transações") }}
                                fontWeight="bold" mr={"2"}>Transações</Button>
                            <Button
                                size="sm"
                                bg="primary.100"
                                color="primary.200"
                                boxShadow={"none"}
                                _hover={{ bg: 'primary.100' }}
                                onClick={() => { setNavigation("Produtos") }}
                                fontWeight="bold" mr={"0"}>Produtos</Button>
                        </Box>

                        <Box ml="auto">
                            <Button bgColor={"primary.500"} size={"sm"} color={"primary.300"}>+ Entrada</Button>
                        </Box>
                    </Flex>
                    {currentPageNavigation == "Estoque" &&
                        <>
                            <SimpleGrid zIndex={2} mx={4} mb="2" columns={{ base: 1, md: 2, lg: 4 }} spacing="2" position={"relative"}>
                                <Tooltip
                                    label="Valor com base no preço de venda dos produtos cadastrados"
                                    fontSize="sm"
                                    bg="gray.700"
                                    color="white"
                                    borderRadius="md"
                                    p={2}
                                >
                                    <Card zIndex={2}>
                                        <CardBody color="primary.250" _hover={{ backgroundColor: "primary.300", color: "primary.100", borderRadius: "md", transition: "0.2" }} transition={"1"}>

                                            <Flex align="center" >
                                                {/* <Icon as={BellIcon} boxSize={4} mr={"2"} /> */}
                                                <Heading size="sm" display={"flex"} flexDirection={"row"}><Text color={"primary.800"} mr="2">$</Text> Valor em estoque</Heading>
                                            </Flex>
                                            <Flex align={"end"} mt={2}>
                                                <Text fontSize="xl" fontWeight="bold" mr={2} mb={-1}>R$ {totalStockPrice} </Text>
                                            </Flex>

                                        </CardBody>
                                    </Card>
                                </Tooltip>
                                <Card>
                                    <CardBody color="primary.250" _hover={{ backgroundColor: "primary.300", color: "primary.100", borderRadius: "md", transition: "0.2" }} transition={"1"}>
                                        <Flex align="center">
                                            <Icon as={FiBox} boxSize={4} mr={2} />
                                            <Heading size="sm" >Total em estoque</Heading>
                                        </Flex>
                                        <Flex align={"end"} mt={2}>
                                            <Text fontSize="xl" fontWeight="bold" mr={2} mb={-1}>{totalStock}</Text>
                                        </Flex>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody color="primary.250" _hover={{ backgroundColor: "primary.300", color: "primary.100", borderRadius: "md", transition: "0.2" }} transition={"1"} >
                                        <Flex align="center">
                                            <Icon as={CalendarIcon} boxSize={4} mr={2} />
                                            <Heading size="sm" >Próximos da validade</Heading>
                                        </Flex>
                                        <Flex align={"end"} mt={2}>
                                            <Text fontSize="xl" fontWeight="bold" mr={2} mb={-1}>20 </Text>
                                            <Text fontSize="sm" color="gray.500" >Vencem essa semana </Text>
                                        </Flex>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody color="primary.250" _hover={{ backgroundColor: "primary.300", color: "primary.100", borderRadius: "md", transition: "0.2" }} transition={"1"}>
                                        <Flex align="center">
                                            <Icon as={FiAlertCircle} boxSize={4} mr={2} color={"primary.600"} />
                                            <Heading size="sm" >Além da validade</Heading>
                                        </Flex>
                                        <Flex align={"end"} mt={2}>
                                            <Text fontSize="xl" fontWeight="bold" mr={2} mb={-1}>10 </Text>
                                        </Flex>
                                    </CardBody>
                                </Card>


                            </SimpleGrid>

                            <Box overflowX="auto" mb="14" borderRadius={"8px"} backgroundColor={"white"} boxShadow={"md"} mx="4">
                                <Table variant="simple">
                                    <Thead backgroundColor={"primary.200"} color={"primary.100"}>
                                        <Tr >
                                            <Th color={"primary.100"}>Nome</Th>
                                            <Th color={"primary.100"}>Categoria</Th>
                                            <Th color={"primary.100"}>Lote</Th>
                                            <Th color={"primary.100"}>Quant.</Th>
                                            <Th color={"primary.100"}>Tamanho</Th>
                                            <Th color={"primary.100"}>Preço uni.</Th>
                                            <Th color={"primary.100"}>Ultima atualização</Th>
                                            <Th color={"primary.100"}>Ações</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {paginatedStock.map((stock, index) => (
                                            <Tr key={stock.idstock} paddingY={"3"}>
                                                <Td paddingY={"2.5"}>{stock.nameitem}</Td>
                                                <Td paddingY={"2.5"}>{stock.categoryitem}</Td>
                                                <Td paddingY={"2.5"}>{stock.lote}</Td>
                                                <Td paddingY={"2.5"}>{stock.quantity}</Td>
                                                <Td paddingY={"2.5"}>{stock.itemsize.size}</Td>
                                                <Td paddingY={"2.5"}>{stock.itemsize.price}</Td>
                                                <Td paddingY={"2.5"}>{format(new Date(stock.updatedate), 'yyyy-MM-dd')}</Td>
                                                <Td paddingY={"3.5"}>
                                                    <Flex>
                                                        <IconButton
                                                            mx="1"
                                                            aria-label="Dar baixa"
                                                            icon={<ArrowDownIcon />}
                                                            size="xs"
                                                            color={"primary.600"}
                                                            backgroundColor={"white"}
                                                            boxShadow={"md"}
                                                            onClick={() => openModalBaixa(stock)}
                                                            _hover={{ backgroundColor: "primary.600", color: "primary.100" }}
                                                        />
                                                        <IconButton
                                                            mx="1"
                                                            aria-label="Dar Entrada"
                                                            onClick={() => openModal(stock)}
                                                            icon={<ArrowUpIcon />}
                                                            size="xs"
                                                            color={"primary.300"}
                                                            backgroundColor={"white"}
                                                            boxShadow={"md"}
                                                            _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
                                                        />

                                                    </Flex>
                                                </Td>
                                            </Tr>
                                        ))}
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
                                    isDisabled={currentPage === 1}
                                    fontSize={"sm"}
                                    size={"sm"}
                                    bgColor={"primary.100"}
                                    border={"2px"}
                                    borderColor={"primary.100"}
                                    color={"primary.300"}
                                    mr="2"
                                />
                                <Text>
                                    {" "}
                                    {currentPage}{" "}
                                </Text>
                                <IconButton
                                    aria-label="Next Page"
                                    icon={<ChevronRightIcon />}
                                    onClick={() => handlePageChange("next")}
                                    isDisabled={currentPage * itemsPerPage >= filteredeStocks.length}
                                    ml="2"
                                    fontSize={"sm"}
                                    size={"sm"}
                                    bgColor={"primary.100"}
                                    border={"2px"}
                                    color={"primary.300"}
                                    borderColor={"primary.100"}
                                />
                            </Flex>
                            {selectedStock && (
                                <IsideStock
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    stock={selectedStock}
                                />
                            )}
                            {selectedStockDown && (
                                <OutsideStock
                                    isOpen={isRemoveOpen}
                                    onClose={onRemoveClose}
                                    stock={selectedStockDown}
                                />
                            )}
                        </>
                    }

                </Box>

            </Flex>
        </>
    )
}

export default Stock;