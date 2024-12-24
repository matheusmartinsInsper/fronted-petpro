"use client";
import {
    Input,
    Button,
    Box,
    Select,
    Flex,
    Heading,
    Text,
    FormControl,
    FormLabel,
    useToast,
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    IconButton,
    Textarea
} from "@chakra-ui/react";
import {
    ChevronRightIcon, AddIcon, CheckCircleIcon,
    NotAllowedIcon,
    ArrowBackIcon
} from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/headers";
import { useEffect, useState } from "react";
import axios from "../../../../../utils/axiosConfig";

interface Size {
    size: string;
    price: number;
    avalaible: boolean;
}
interface Specifications {
    tag: string;
    name: string;
}
interface Summary {
    summary: string;
}

interface Product {
    category: string;
    description: string;
    name: string;
    unity: string;
    specifications : Specifications[];
    summaries: Summary[];
    sizes: Size[];
}
const categories = [
    "SABOR",
    "TIPO DE RAÇÃO",
    "INDICAÇÃO",
    "CASTRADO",
    "INDICAÇÃO VETERINÁRIA",
    "PESO DO PRODUTO",
    "TAMANHO DA RAÇA",
    "IDADE",
    "TRANSGÊNICO",
    "CORANTE",
    "COMPOSICAO",
    "APRESENTAÇÃO",
    "MARCA",
];

const AddProduct = () => {
    const [product, setProduct] = useState<Product>({
        category: "",
        description: "",
        name: "",
        unity: "",
        sizes: [],
        specifications: [],
        summaries: []
    });
    const [newSize, setNewSize] = useState<Size>({ size: "", price: 0, avalaible: false });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toast = useToast();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenResumo, onOpen: onOpenResumo, onClose: onCloseResumo } = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [categoryText, setCategoryText] = useState<string>("");
    const [resumotext, setresumotext] = useState<string>("");
    const [specifications, setSpecifications] = useState<{ category: string; value: string }[]>([]);
    const [resumos, setresumos] = useState<string[]>([]);

    const handleResumo = () => {
        setresumos((prev) => [...prev, resumotext])
        setProduct((prev) => ({
            ...prev,
            summaries: [...prev.summaries, { summary: resumotext}],
          }));
        onCloseResumo()
        setresumotext("");
    }
    const removeSizeofProduct = (index: number) => {
        setProduct((prev) => ({
            ...prev,
            sizes: prev.sizes.filter((_, i) => i !== index),
        }));
        setIsModalOpen(false)
    };
    const handleAddSpecification = () => {
        if (!selectedCategory || !categoryText.trim()) {
            toast({
                title: "Erro",
                description: "Preencha a categoria e o texto antes de adicionar.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setSpecifications([...specifications, { category: selectedCategory, value: categoryText }]);
        setProduct((prev) => ({
            ...prev,
            specifications: [...prev.specifications, { tag: selectedCategory, name: categoryText }],
          }));
        setSelectedCategory("");
        setCategoryText("");
        onClose();
    };
    const closemodalresumo = () => {
        onCloseResumo()
    }


    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleInputChange = (field: keyof Product, value: string) => {
        setProduct((prev) => ({ ...prev, [field]: value }));
    };

    const handleSizeChange = (field: keyof Size, value: string | number | boolean) => {
        setNewSize((prev) => ({ ...prev, [field]: value }));
    };

    const addSize = () => {
        setProduct((prev) => ({ ...prev, sizes: [...prev.sizes, newSize] }));
        setNewSize({ size: "", price: 0, avalaible: false });
        setIsModalOpen(false);
    };

    const saveProduct = async () => {
        try {
            const token = localStorage.getItem("Authorization");
            if (!token) {
                throw new Error("Token not found");
            }

            await axios.post("/Item", product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast({
                title: "Produto salvo com sucesso",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            router.push("/Home/stock")
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            toast({
                title: "Erro ao salvar produto",
                description: "Tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

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
                        <Heading as="h1" size="sm" color={"primary.200"} display={"flex"} flexDirection={"row"}>
                            <Text color="gray.500">
                                Settings
                                <ChevronRightIcon />Estoque<ChevronRightIcon />Produto<ChevronRightIcon />
                            </Text>
                            Adicionar
                        </Heading>
                    </Flex>

                    <Box px="4" pt={1} overflowY="auto" height="calc(100vh - 120px)">

                        <Box display={"flex"} flexDirection={"row"} gap={"2"}>
                            <FormControl mb="4">
                                <FormLabel>Categoria</FormLabel>
                                <Select
                                    value={product.category}
                                    onChange={(e) => handleInputChange("category", e.target.value)}
                                    placeholder="Ex: Medicamento"
                                    focusBorderColor="primary.300"
                                >
                                    {["Medicamento", "Brinquedos", "Alimentos", "Vacina", "Insumos", "Vestimenta"].map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>



                            <FormControl mb="4">
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    value={product.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    placeholder="Nome do Produto"
                                    focusBorderColor="primary.300"
                                />
                            </FormControl>

                            <FormControl mb="4">
                                <FormLabel>Unidade</FormLabel>
                                <Input
                                    placeholder={"Kg,ml,L..."}
                                    value={product.unity}
                                    onChange={(e) => handleInputChange("unity", e.target.value)}
                                    focusBorderColor="primary.300"
                                />
                            </FormControl>
                        </Box>
                        <FormControl mb="4">
                            <FormLabel>Tamanhos</FormLabel>
                            <Flex direction="row" gap="2" width={"100%"}>
                                {product.sizes.map((size, index) => (
                                    <Box
                                        width={"200px"}
                                        key={index}
                                        textAlign={"center"}
                                        bgColor={"primary.500"}
                                        borderWidth={"1px"}
                                        borderColor={"primary.300"}
                                        borderRadius={"md"}
                                        flexDirection={"column"}
                                        py="2"
                                        position="relative" // Necessário para posicionar elementos absolutamente dentro do Box
                                    >
                                        <Button
                                            position={"absolute"} // Posiciona o botão relativamente ao Box
                                            top={"2px"} // Distância do topo
                                            right={"2px"} // Distância da borda direita
                                            color={"primary.200"}
                                            bgColor={"transparent"}
                                            _hover={{ bgColor: "transparent" }}
                                            size={"sm"}
                                            onClick={() => removeSizeofProduct(index)}
                                        >
                                            x
                                        </Button>
                                        <Text color={"primary.300"} fontWeight={"bold"}>{size.size}</Text>
                                        <Text color={"primary.300"} fontSize={"sm"}>R${size.price}</Text>
                                        <Flex mt={"2"} flexDirection={"row"} textAlign={"center"} justifyContent={"center"}>
                                            <Text fontSize={"sm"} mr={2}>
                                                {size.avalaible === true ? "Disponível" : "Indisponível"}
                                            </Text>
                                            <Text fontWeight={"bold"}>
                                                {size.avalaible === true ? (
                                                    <CheckCircleIcon mt="-1" color={"primary.800"} />
                                                ) : (
                                                    <NotAllowedIcon mt="-1" color={"primary.600"} />
                                                )}
                                            </Text>
                                        </Flex>
                                    </Box>
                                ))}

                                <IconButton
                                    borderStyle="dotted"
                                    icon={<AddIcon />}
                                    color={"primary.300"}
                                    bgColor={"primary.500"}
                                    aria-label="Adicionar Tamanho"
                                    _hover={{ bgColor: "primary.300", color: "primary.100" }}
                                    onClick={() => setIsModalOpen(true)}
                                    size={"sm"}
                                    width={"160px"}
                                    height={"100px"}
                                    borderWidth={"2px"}
                                    borderColor={"primary.300"}
                                />
                            </Flex>
                        </FormControl>
                        <Box mb={4}>
                            <Text>Informações</Text>

                            <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={"md"} p={4}>
                                <Text>Resumos</Text>
                                <Box display={"flex"} flexDirection={'row'} mb="2">

                                    {resumos.map((spec, index) => (
                                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mr={2} boxShadow={"md"} bgColor={"white"} maxWidth={"160px"} key={index} mb={0} p={2} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                                            <Text textAlign={"center"} fontSize={"xs"}> - {spec}</Text>
                                        </Box>
                                    ))}
                                    <IconButton
                                        borderStyle="dotted"
                                        ml={2}
                                        icon={<AddIcon />}
                                        color={"primary.300"}
                                        bgColor={"primary.500"}
                                        aria-label="Adicionar resumo"
                                        _hover={{ bgColor: "primary.300", color: "primary.100" }}
                                        onClick={onOpenResumo}
                                        size={"sm"}
                                        width={"80px"}
                                        height={"40px"}
                                        borderWidth={"2px"}
                                        borderColor={"primary.300"}
                                    />
                                </Box>
                                <FormControl mb="4">
                                    <FormLabel>Descrição</FormLabel>
                                    <Textarea
                                        value={product.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        placeholder="Descrição"
                                        focusBorderColor="primary.300"
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                        <Box mb={4}>
                            <Text>Especificações</Text>
                            <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={"md"} p={4} display={"flex"} flexDirection={"row"}>

                                {specifications.map((spec, index) => (
                                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mr={2} boxShadow={"md"} bgColor={"white"} maxWidth={"160px"} key={index} mb={0} p={2} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                                        <Text textAlign={"center"} fontWeight="bold" fontSize={"xs"}>{spec.category}</Text>
                                    </Box>
                                ))}
                                <IconButton
                                    borderStyle="dotted"
                                    ml={2}
                                    icon={<AddIcon />}
                                    color={"primary.300"}
                                    bgColor={"primary.500"}
                                    aria-label="Adicionar Tamanho"
                                    _hover={{ bgColor: "primary.300", color: "primary.100" }}
                                    onClick={onOpen}
                                    size={"sm"}
                                    width={"80px"}
                                    height={"40px"}
                                    borderWidth={"2px"}
                                    borderColor={"primary.300"}
                                />


                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader borderTopRadius={"md"} bgColor={"primary.200"} color={"primary.100"}>Adicionar Especificação</ModalHeader>
                                        <ModalCloseButton color={"primary.100"} />
                                        <ModalBody>
                                            <FormControl mb={4}>
                                                <FormLabel>Categoria</FormLabel>
                                                <Select
                                                    placeholder="Selecione uma categoria"
                                                    value={selectedCategory}
                                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                                    focusBorderColor="primary.300"
                                                >
                                                    {categories.map((category, index) => (
                                                        <option key={index} value={category}>
                                                            {category}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Texto</FormLabel>
                                                <Textarea
                                                    placeholder="Digite o texto para a especificação"
                                                    value={categoryText}
                                                    onChange={(e) => setCategoryText(e.target.value)}
                                                    focusBorderColor="primary.300"
                                                />
                                            </FormControl>
                                        </ModalBody>
                                        <ModalFooter display={"flex"} justifyContent={"space-between"}>
                                            <Button onClick={handleAddSpecification} color="primary.500" bgColor={"primary.300"} _hover={{ bgColor: "primary.300",color:"primary.100" }} mr={3}>
                                                Confirmar
                                            </Button>
                                            <Button onClick={() => onClose()} variant="ghost">
                                                Cancelar
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                                <Modal isOpen={isOpenResumo} onClose={onCloseResumo}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader borderTopRadius={"md"} bgColor={"primary.200"} color={"primary.100"}>Adicionar Resumo</ModalHeader>
                                        <ModalCloseButton color={"primary.100"} />
                                        <ModalBody>
                                            <FormControl>
                                                <FormLabel>Resumo</FormLabel>
                                                <Textarea
                                                    placeholder="Ex : Contém taurina, que ajuda na circulação sanguínea;"
                                                    value={resumotext}
                                                    onChange={(e) => setresumotext(e.target.value)}
                                                    focusBorderColor="primary.300"
                                                />
                                            </FormControl>
                                        </ModalBody>
                                        <ModalFooter display={"flex"} justifyContent={"space-between"}>
                                            <Button onClick={handleResumo} color="primary.500" bgColor={"primary.300"} _hover={{ bgColor: "primary.300",color:"primary.100" }} mr={3}>
                                                Confirmar
                                            </Button>
                                            <Button onClick={closemodalresumo} variant="ghost">
                                                Cancelar
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Box>
                        </Box>



                        <Flex flexDirection={"row"} justifyContent={"space-between"}>
                            <Button onClick={saveProduct} _hover={{ bgColor: "primary.300", color: "primary.100" }} leftIcon={<AddIcon />} bgColor={"primary.500"} size={"sm"} color={"primary.300"}>
                                Salvar
                            </Button>
                            <Box mr={1} _hover={{ bgColor: "transparent" }} bgColor={"transparent"} as="a" href="/Home/stock"><ArrowBackIcon mr={2} /> Voltar</Box>
                        </Flex>

                    </Box>
                </Box>
            </Flex>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderTopRadius={"md"} bgColor={"primary.200"} color={"primary.100"}>Adicionar Tamanho</ModalHeader>
                    <ModalCloseButton color={"primary.100"} />
                    <ModalBody>
                        <FormControl mb="4">
                            <FormLabel>Tamanho</FormLabel>
                            <Input
                                value={newSize.size}
                                onChange={(e) => handleSizeChange("size", e.target.value)}
                                placeholder="Ex: 80 capsulas 50mg"
                                focusBorderColor="primary.300"
                            />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Preço de venda</FormLabel>
                            <Input
                                type="number"
                                value={newSize.price}
                                onChange={(e) => handleSizeChange("price", Number(e.target.value))}
                                placeholder="Preço"
                                focusBorderColor="primary.300"
                            />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Disponibilidade<Text fontSize={"xs"} color={"gray.500"}>* disponibilidade desse tamanho do produto na loja do app</Text></FormLabel>
                            <Select
                                value={newSize.avalaible ? "true" : "false"}
                                onChange={(e) => handleSizeChange("avalaible", e.target.value === "true")}
                                focusBorderColor="primary.300"
                            >
                                <option value="true">Disponível </option>
                                <option value="false" >Indisponível </option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter display={"flex"} justifyContent={"space-between"}>
                        <Button color="primary.500" bgColor={"primary.300"} _hover={{ bgColor: "primary.300",color:"primary.100" }} mr="4" onClick={addSize}>
                            Confirmar
                        </Button>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddProduct;
