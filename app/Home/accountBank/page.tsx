"use client"
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
    Link
} from "@chakra-ui/react";
import {
    SearchIcon,
    AddIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DeleteIcon,
    EditIcon
} from "@chakra-ui/icons";
import Sidebar from "../components/Sidebar";
import Header from "../components/headers";
import { useState, useEffect } from "react";
import axios from "../../../utils/axiosConfig";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { AuBankAccountElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51QMl19DYEjsRh0037SyCy1Jbr8z6ah8DHppe4ZHWS8ijPhK2wbipRA8Pz0QU93n5hFhPsmeLOWofsHt2my2tbiaY00BmRCvXqT"); 


const AccountBank = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };
    const toast = useToast();
    const [clientSecret, setClientSecret] = useState("");

    const handleSubmit = async (event: any) => {
      event.preventDefault();
  
      // Coleta os dados do cartão com Stripe Elements
      const stripe = await stripePromise;
      const elements = stripe!.elements();
      const cardElement = elements.getElement(CardElement);  // Aqui é um exemplo, você pode querer outro tipo de elemento
  
      const { token, error } = await stripe!.createToken(cardElement!);
  
      if (error) {
        console.error(error);
        return;
      }
  
      // Envia o token para o backend
      fetch("/api/create-bank-account-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token.id, // Envia o token bancário
        
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Conta bancária registrada com sucesso", data);
        })
        .catch((error) => {
          console.error("Erro ao registrar dados bancários", error);
        });
    };
    return (
        <>
      <Header />
      <Flex direction="column" minHeight="100vh" backgroundColor="primary.100">
        <Sidebar isCollapsed={false} toggleSidebar={() => {}} /> {/* Ajuste conforme necessário */}
        
        <Flex
          justify="center"
          align="center"
          flex="1"
          padding={4}
          direction="column"
        >
          <Box
            backgroundColor="white"
            padding={6}
            borderRadius="md"
            boxShadow="lg"
            width={{ base: "100%", sm: "400px" }} // Responsivo
          >
            <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
              Registre sua Conta Bancária
            </Text>

            <form onSubmit={handleSubmit}>
              <Elements stripe={stripePromise}>
                <Box marginBottom={4}>
                  <Text fontSize="md" marginBottom={2}>
                    Dados Bancários:
                  </Text>
                  {/* Use o CardElement ou outro componente dependendo do tipo de pagamento */}
                  <CardElement />
                </Box>
                <Button
                  type="submit"
                  colorScheme="blue"
                  width="100%"
                >
                  Registrar Conta Bancária
                </Button>
              </Elements>
            </form>
          </Box>
        </Flex>
      </Flex>
    </>
    );
};

export default AccountBank;
