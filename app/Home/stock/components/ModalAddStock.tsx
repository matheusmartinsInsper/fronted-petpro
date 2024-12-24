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
    FormControl,
    FormLabel,
    Box,
    Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface StockModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ItemSize {
    iditem: string;
    iditemsize: string;
    size: string;
    price: number;
    avalaible: boolean;
}

interface Item {
    itemid: string;
    category: string;
    description: string;
    name: string;
    unity: string;
    datecreate: string;
    sizes: ItemSize[];
}

const ModalAddStock = ({ isOpen, onClose }: StockModalProps) => {
    const [quantity, setQuantity] = useState<number>();
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<string>("");
    const [selectedSizeId, setSelectedSizeId] = useState<string>("");
    const [localPriceUnity, setLocalPriceUnity] = useState<number>();
    const [localLote, setLocalLote] = useState<string>("");
    const toast = useToast();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("Authorization");
            if (!token) {
                throw new Error("Token not found");
            }

            const response = await axios.get("http://localhost:5206/api/Item", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setItems(response.data.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            toast({
                title: "Erro ao buscar produtos.",
                description: "Tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleMoveStock = async () => {
        try {
            const token = localStorage.getItem("Authorization");
            if (!token) {
                throw new Error("Token not found");
            }

            const payload = {
                idstock: null,
                iditem: selectedItemId,
                iditemsize: selectedSizeId,
                type: "Entrada",
                lote: localLote,
                priceunity: localPriceUnity,
                quantity,
            };

            await axios.post("http://localhost:5206/api/Stock", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setQuantity(0);
            setLocalPriceUnity(0);
            onClose();

            toast({
                title: "Operação bem-sucedida",
                description: "Estoque atualizado com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Erro ao realizar a operação:", error);
            toast({
                title: "Erro ao realizar a operação.",
                description: "Tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const selectedItem = items.find(item => item.itemid === selectedItemId);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color="primary.100" bgColor="primary.200" borderTopRadius={"md"}>
                    Entrada
                </ModalHeader>
                <ModalCloseButton color={"primary.100"}/>
                <ModalBody display="flex" flexDirection="column">
                    <Box display={"flex"} flexDirection={"row"}>
                        <FormControl mr={4}>
                            <FormLabel>Produto</FormLabel>
                            <Select
                                placeholder="Selecione um produto"
                                value={selectedItemId}
                                 focusBorderColor="primary.300"
                                onChange={(e) => setSelectedItemId(e.target.value)}
                            >
                                {items.map((item) => (
                                    <option key={item.itemid} value={item.itemid}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl mb={4} isDisabled={!selectedItemId}>
                            <FormLabel>Tamanho</FormLabel>
                            <Select
                             focusBorderColor="primary.300"
                                placeholder="Selecione um tamanho"
                                value={selectedSizeId}
                                onChange={(e) => setSelectedSizeId(e.target.value)}
                            >
                                {selectedItem?.sizes.map((size) => (
                                    <option key={size.iditemsize} value={size.iditemsize}>
                                        {size.size} - R${size.price}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>


                    <FormControl mb={4}>
                        <FormLabel>Lote</FormLabel>
                        <Input
                            placeholder="Lote do produto"
                            value={localLote}
                             focusBorderColor="primary.300"
                            onChange={(e) => setLocalLote(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Preço unitário</FormLabel>
                        <Input
                            placeholder="Preço unitário"
                            type="number"
                             focusBorderColor="primary.300"
                            value={localPriceUnity || ""}
                            onChange={(e) => setLocalPriceUnity(Number(e.target.value))}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Quantidade</FormLabel>
                        <Input
                            placeholder="Quantidade"
                            type="number"
                            value={quantity || ""}
                            focusBorderColor="primary.300"
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                    <Button
                        backgroundColor="primary.300"
                        color="primary.500"
                        onClick={handleMoveStock}
                        _hover={{backgroundColor:"primary.300",color:"primary.100"}}
                        isDisabled={!selectedItemId || !selectedSizeId}
                    >
                        Confirmar
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalAddStock;
