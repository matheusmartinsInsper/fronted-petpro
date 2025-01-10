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

interface ItemSize {
    iditem: string | null;
    iditemsize: string;
    size: string;
    price: number;
    avalaible: boolean;
}
interface Item {
    itemid: string;
    category: string;
    name: string;
    description: string;
    unity: string;
    datecreate: Date
    sizes: ItemSize[];

}

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [lastTransiction, setlastTransiction] = useState<any>();
    const [despesa, setdespesa] = useState<number>(0);
    const [receita, setreceita] = useState<number>(0);
    const itemsPerPage = 9;
    const [filteredProducts, setfilteredProducts] = useState<Item[]>([]);
    const [Products, setProducts] = useState<Item[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state
    const [selectedProduct, setSelectedProduct] = useState<Item | null>(null);

    useEffect(() => {
        fetchProducts()
    }, [])
    const fetchProducts = async () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('Authorization');
            console.log(token)
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }
        try {
            const response = await axios.get('/Item'); // Substitua pela URL da sua API
            if (response.data.status === 'confirmed') {
                setProducts(response.data.data);
                setfilteredProducts(response.data.data);
            }
        } catch (error) {
            console.error('Erro ao buscar colaboradores:', error);
            toast({
                title: "Erro ao buscar colaboradores",
                description: "Ocorreu um erro ao tentar buscar os colaboradores. Tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }
    const handlePageChange = (direction: "next" | "prev") => {
        if (
            direction === "next" &&
            currentPage * itemsPerPage < filteredProducts.length
        ) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleDeleteClick = (product: Item) => {
        setSelectedProduct(product);
        onOpen(); // Open the modal
    };
    const handleConfirmDelete = async () => {
        if (selectedProduct) {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('Authorization');
                console.log(token)
                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
            }
            try {
                await axios.delete('/Item', {
                    params: { iditem: selectedProduct.itemid }
                });
                onClose();
                toast({
                    title: "Produto deletado",
                    description: "Produto deletado do catalogo com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } catch (error) {
                console.error('Erro ao buscar colaboradores:', error);
                toast({
                    title: "Erro ao buscar colaboradores",
                    description: "Ocorreu um erro ao tentar buscar os colaboradores. Tente novamente mais tarde.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };
    // Calcula os dados paginados diretamente a partir de `filteredTransactions`
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const toast = useToast();


    return (
        <>
            <Box overflowX="auto" mb="14" borderRadius={"8px"} backgroundColor={"white"} boxShadow={"md"} mx="4">
                <Table variant="simple">
                    <Thead backgroundColor={"primary.200"} color={"primary.100"}>
                        <Tr >
                            <Th color={"primary.100"}>Produto</Th>
                            <Th color={"primary.100"}>categoria</Th>
                            <Th color={"primary.100"}>Tamanhos</Th>
                            <Th color={"primary.100"}>Disponíveis</Th>
                            <Th color={"primary.100"}>unidade</Th>
                            <Th color={"primary.100"}>Data</Th>
                            <Th color={"primary.100"}>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {paginatedProducts.map((product: Item, index: any) => (
                            <Tr key={product.itemid} paddingY={"3"}>
                                <Td paddingY={"2.5"}>{product.name}</Td>
                                <Td paddingY={"2.5"}>{product.category}</Td>
                                <Td paddingY={"2.5"}>{product.sizes.length}</Td>
                                <Td paddingY={"2.5"}>{product.sizes.filter((x: any) => x.avalaible == true).length}</Td>
                                <Td paddingY={"2.5"}>{product.unity}</Td>
                                <Td paddingY={"2.5"}>{format(product.datecreate, "dd/MM/yy HH:mm")}</Td> <Td paddingY={"3.5"}>
                                    <Flex>
                                        <IconButton
                                            aria-label="Expandir detalhes"
                                            icon={<ExpandIcon />}
                                            size="xs"
                                            color="primary.250"
                                            backgroundColor="white"
                                            boxShadow={"md"}
                                            _hover={{ backgroundColor: "primary.100" }}
                                            mr={1}
                                        />
                                        <IconButton
                                            aria-label="Deletar item"
                                            icon={<DeleteIcon />}
                                            size="xs"
                                            color="primary.600"
                                            backgroundColor="white"
                                            boxShadow={"md"}
                                            _hover={{ backgroundColor: "primary.600",color:"primary.100" }}
                                            onClick={() => handleDeleteClick(product)}
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
                    isDisabled={currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)}
                    ml="2"
                    fontSize={"sm"}
                    size={"sm"}
                    bgColor={"primary.100"}
                    border={"2px"}
                    borderColor={"primary.100"}
                    color={"primary.300"}
                />
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deletar produto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Tem certeza de que deseja excluir o produto <strong>{selectedProduct?.name}?</strong> </Text>
                    </ModalBody>
                    <ModalFooter display={"flex"} justifyContent={"space-between"}>
                        <Button bgColor={"primary.600"} color={"primary.100"} _hover={{ bgColor: "primary.600" }} mr={3} onClick={handleConfirmDelete}>
                            Confirmar
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Products;