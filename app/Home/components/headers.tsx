import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Spacer,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Text,
  Avatar,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Divider,
  Circle,
  useToast,
  Image,Link
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { FaUserCircle } from "react-icons/fa";
import axios from "../../../utils/axiosConfig";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import mylogo from "../../../public/mylogo.png"

interface Invitation {
  idinvitation: string;
  nameusersender: string;
  status: string;
  datecreate: string;
}

interface ApiResponse {
  status: string;
  data: Invitation[];
}

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement] = useState("right");
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const toast = useToast();

  const fetchInvitations = async () => {
    try {
      const token = localStorage.getItem('Authorization');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      const response = await axios.get<ApiResponse>("/Invitation");
      setInvitations(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar convites", error);
      toast({
        title: "Erro ao Buscar Convites",
        description: "Houve um problema ao buscar os convites.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const acceptInvitation = async (idinvitation: string) => {
    try {
      const token = localStorage.getItem('Authorization');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      const response = await axios.put(`/Invitation/Accepted`, {}, {
        params: {
          idinvitation: idinvitation,
        },
      });
      console.log('Convite aceito', response.data);
      toast({
        title: "Convite Aceito",
        description: "Você aceitou o convite com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Atualize a lista de convites ou faça qualquer ação necessária após aceitar o convite
    } catch (error) {
      console.error("Erro ao aceitar convite", error);
      toast({
        title: "Erro ao Aceitar Convite",
        description: "Houve um problema ao aceitar o convite.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const rejectInvitation = async (idinvitation: string) => {
    try {
      const token = localStorage.getItem('Authorization');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      const response = await axios.put(`/Invitation/Reject`, {}, {
        params: {
          idinvitation: idinvitation,
        },
      });
      console.log('Convite rejeitado', response.data);
      toast({
        title: "Convite Rejeitado",
        description: "Você rejeitou o convite com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Atualize a lista de convites ou faça qualquer ação necessária após rejeitar o convite
    } catch (error) {
      console.error("Erro ao rejeitar convite", error);
      toast({
        title: "Erro ao Rejeitar Convite",
        description: "Houve um problema ao rejeitar o convite.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleMenuOpen = () => {
    onMenuOpen();
    fetchInvitations();
  };

  return (
    <Box
      as="header"
      width="100%"
      height="40px"
      backgroundColor="#F6F7F9"
      paddingX="4"
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      zIndex={"200"}
      position={"relative"}
      borderBottom={"1px"}
      borderBottomColor={"gray.200"}
    >
      <Flex width="100%" justifyContent="space-between" alignItems="center">
      <Flex color={"primary.200"} position="relative"
        ml={"2"} flexDirection={"row"} alignItems={"center"} textAlign={"center"}>
          <Link ml={"0"} href='/Home' _hover={{textDecoration:"none"}}><Text fontSize="xl" fontWeight="bold" ><span style={{ color: '#7839EE' }}>PET</span>pro</Text></Link>
        </Flex>
        <Spacer />
        
        <Flex alignItems="center">
          <Menu isOpen={isMenuOpen} onClose={onMenuClose} onOpen={handleMenuOpen}>
            <MenuButton
              as={Button}
              aria-label="Notificações"
              variant="ghost"
              size="lg"
              color="primary.250"
              marginRight="-6"
              zIndex={"100"}
              backgroundColor={"transparent"}
              _hover={{ backgroundColor: "transparent" }}
              _focus={{ backgroundColor: "transparent" }}
              _selected={{ backgroundColor: "transparent" }}
              _active={{ backgroundColor: "transparent" }}
            >
              <BellIcon opacity={"90%"} />
            </MenuButton>
            <MenuList backgroundColor="primary.100" color="primary.250" px={"2"} zIndex={"60"}>
              <Box px="4" py="2" backgroundColor={"white"} boxShadow={"sm"} m={"-2"} mb={"4"} borderTopRadius={"md"}>
                <Text fontWeight="bold">Notificações</Text>
              </Box>
              {invitations.map((invitation, index) => (
                <Box key={invitation.idinvitation}>
                  <MenuItem
                    display="flex"
                    flexDirection="row"
                    alignItems="flex-start"
                    border={"1px"}
                    borderColor={"primary.100"}
                    my={"2"}
                    backgroundColor={"primary.100"}
                    _hover={{ backgroundColor: "primary.100" }}
                    zIndex={"20"}
                  >
                    <Box boxSize="50px" borderRadius="full" overflow="hidden" mr={4}>
                       <Image src="data:image/jpeg;base64,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" alt="Tutor Image" />
                    </Box>
                    <Box display="flex"
                    flexDirection="column"
                    alignItems="flex-start">
                    <Text>
                      <strong>{invitation.nameusersender}</strong> deseja adicionar você à rede 
                     
                    </Text>
                    <Text fontSize="sm" color="primary.200">
                      Aceitar convite?
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {format(new Date(invitation.datecreate), 'dd MMM  HH:mm', { locale: ptBR })}
                    </Text>
                    <Flex mt={2} width="100%" justifyContent="flex-start">
                      <Box
                        aria-label="Aceitar"
                        color="primary.100"
                        backgroundColor="primary.200"
                        _hover={{ backgroundColor: "primary.250", color: "primary.100" }}
                        p={"2"}
                        borderRadius={"sm"}
                        onClick={() => acceptInvitation(invitation.idinvitation)}
                        mr={2}
                        borderEndRadius={"md"}
                        borderStartRadius={"md"}
                        fontSize={"sm"}
                      >
                        Accept
                      </Box>
                      <Box
                        aria-label="Rejeitar"
                        color="primary.200"
                        backgroundColor="primary.100"
                        _hover={{ backgroundColor: "gray.200", color: "primary.200" }}
                        padding={"2"}
                        borderRadius={"sm"}
                        onClick={() => rejectInvitation(invitation.idinvitation)}
                        borderEndRadius={"md"}
                        borderStartRadius={"md"}
                        fontSize={"sm"}
                      >
                        Reject
                      </Box>
                    </Flex>
                    </Box>
                   
                  </MenuItem>
                  {index < invitations.length - 1 && <Divider />}
                </Box>
              ))}
            </MenuList>
          </Menu>
          <Button
            aria-label="Perfil de Usuário"
            variant="ghost"
            size="lg"
            color="primary.250"
            opacity={"90%"}
            zIndex={"100"}
            mr={"-4"}
            _hover={{ backgroundColor: "transparent" }}
            onClick={onOpen}
          >
            <FaUserCircle />
          </Button>
        </Flex>
      </Flex>

      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent backgroundColor="primary.100" color="primary.250">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Perfil de Usuário</DrawerHeader>
          <DrawerBody>
            <Flex direction="column" align="center" mt={4}>
              <Avatar size="xl" name="John Doe" src="https://bit.ly/broken-link" />
              <Text mt={4} fontSize="lg" fontWeight="bold">
                John Doe
              </Text>
              <Text fontSize="md" color="primary.300">
                john.doe@example.com
              </Text>
              <Text mt={2} fontSize="md" color="primary.300">
                Telefone: (123) 456-7890
              </Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
