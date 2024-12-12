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
    FormControl,FormLabel
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { StockItem } from "../page";
import { Label } from "recharts";
import { setPriority } from "os";

interface StockModalProps {
    isOpen: boolean;
    onClose: () => void;
    stock: StockItem
}

const IsideStock = ({ isOpen, onClose, stock }: StockModalProps) => {
    const [localLote, setLocalLote] = useState("");
    const [quantity, setQuantity] = useState<number>();
    const [localPriceUnity, setLocalPriceUnity] = useState<number>();
    const [localIdItem, setLocalIdItem] = useState("");
    const [localIdStock, setLocalIdStock] = useState("");
    const [localIdItemSize, setLocalIdItemSize] = useState("");
    const [localType, setLocalType] = useState("");

    const toast = useToast();
  

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };

    const handlePriceUnityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalPriceUnity(Number(event.target.value));
    };

    const handleMoveStock = async () => {
        try {
            const token = localStorage.getItem("Authorization"); // Pega o token do localStorage
            if (!token) {
                throw new Error("Token not found");
            }

            // Monta o payload com os valores dos states
            const payload = {
                idstock: stock.idstock,
                iditem: stock.iditem,
                iditemsize: stock.iditemsize,
                type: "Saída",
                lote: stock.lote,
                priceunity: localPriceUnity,
                quantity,
            };

            // Faz a chamada API com axios
            await axios.post("http://localhost:5206/api/Stock", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Após a chamada ser bem-sucedida
            setQuantity(0); // Reseta o valor da quantidade
            setLocalPriceUnity(0); // Reseta o valor do preço por unidade
            onClose(); // Fecha o modal

            // Exibir toast de sucesso
            toast({
                title: "Baixa bem-sucedida",
                description: "Baixa do estoque realizada com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Erro ao realizar a entrada:", error);

            // Exibir toast de erro
            toast({
                title: "Erro ao realizar a entrada.",
                description: "Tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color={"primary.100"} bgColor={"primary.600"} borderTopRadius={"md"} height={"sm"}>Dar Baixa</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={"flex"} flexDirection={"row"}>
                    <FormControl mr={4}>
                        <FormLabel>Quantidade</FormLabel>
                        <Input
                            placeholder="Quant. Entrada"
                            value={quantity}
                            onChange={handleQuantityChange}
                            type="number"
                            focusBorderColor="primary.600"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Preço por unidade</FormLabel>
                        <Input
                            placeholder="Preço por unidade"
                            value={localPriceUnity}
                            onChange={handlePriceUnityChange}
                            type="number"
                            focusBorderColor="primary.600"
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                    <Button
                        backgroundColor={"primary.600"}
                        onClick={handleMoveStock}
                        color={"primary.100"}
                        _hover={{ backgroundColor: "primary.600" }}
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

export default IsideStock;