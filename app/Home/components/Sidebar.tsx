"use client";

import { useState, useEffect } from 'react';
import { Box, VStack, Link, Text, IconButton, Flex, HStack, Divider, Image } from '@chakra-ui/react';
import { FaUser, FaChartBar, FaBoxes, FaSignOutAlt, FaUserMd, FaServicestack, FaStethoscope } from 'react-icons/fa';
import { MdDashboard, MdMoveToInbox, MdGifBox } from 'react-icons/md';
import {
  ArrowBackIcon, BellIcon, CalendarIcon, EditIcon, SettingsIcon, ExternalLinkIcon, ChatIcon,
  ChevronLeftIcon, ChevronRightIcon, AttachmentIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon, AtSignIcon
} from '@chakra-ui/icons';
import { FiClipboard, FiBox, FiUsers, FiUser } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { useAppContext } from "../../context/AppContext";

interface sidebarprops {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isCollapsed, toggleSidebar }: sidebarprops) => {
  const { state } = useAppContext();
  const [isMainMenuExpanded, setIsMainMenuExpanded] = useState(true);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(true);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userType = state.typeuser;
    if (userType === 'Collaborator') {
      setIsCollaborator(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Exemplo: remove token do localStorage
    router.push('/Signin'); // Redireciona para a página de login
  };

  // const toggleSidebar = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  const toggleMainMenu = () => {
    setIsMainMenuExpanded(!isMainMenuExpanded);
  };

  const toggleSettingsMenu = () => {
    setIsSettingsExpanded(!isSettingsExpanded);
  };

  return (
    <Box
      as="nav"
      width={isCollapsed ? "60px" : "250px"}
      paddingBottom="2"
      borderRightWidth="1px"
      borderRightColor="gray.200"
      height="calc(100vh - 40px)"
      position="fixed"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      backgroundColor={"#F6F7F9"}
      color="primary.200"
      transition="width 0.3s"
    >
      {/* Seção Superior */}
      <Flex px="4" mt={"0.5px"} textAlign={"center"} height={"53.4px"} justifyContent={isCollapsed ? "center" : "space-between"} alignItems={"center"} py={2} mb={"0"}
        borderBottom={"1px"}
        borderBottomColor={"gray.200"}>

        {!isCollapsed && <Box display="flex" flexDirection="row" alignItems="center" textAlign="start" ml={2}>
          <Box boxSize="34px" borderRadius="full" overflow="hidden" mr={4} display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Image src='/user.png' opacity={"70%"} />
          </Box>
          <Box>
            <Text fontWeight={"bold"} fontSize={"md"}>{state.nameuser}</Text>
          </Box>
        </Box>
        }
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          onClick={toggleSidebar}
          backgroundColor="transparent"
          borderRadius={"full"}
          color={"primary.200"}
          _hover={{ backgroundColor: "transparent" }}
        />
      </Flex>
      {/* Menu Principal */}
      <VStack mx={"4"} align={isCollapsed ? "center" : "start"} spacing={0} justifyContent={"start"} flex="1" color={"primary.100"} mt={2}>
        <HStack justify="space-between" width="100%" onClick={toggleMainMenu} cursor="pointer">
          <Text fontSize="md" color="gray.500" display={isCollapsed ? "none" : "flex"} opacity={"sm"} ml={2} fontWeight={"bold"}>Main Menu</Text>
          {!isCollapsed && <IconButton color={"primary.200"} _hover={{ color: "primary.200", backgroundColor: "whitesmoke", opacity: "80%" }} icon={isMainMenuExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />} aria-label="Expand Main Menu" variant="ghost" />}
        </HStack>
        {isMainMenuExpanded && (
          <>
            <Link fontSize="md" color={"primary.200"} _hover={{ backgroundColor: 'primary.500', color: "primary.300", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/solicitations'>
              <HStack>
                <FiClipboard />
                {!isCollapsed && <Text ml={"2px"} color={"primary.200"} fontWeight={"bold"}>Solicitações</Text>}
              </HStack>
            </Link>
            <Link fontSize="md" color={"primary.200"} _hover={{ backgroundColor: 'primary.500', color: "primary.300", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"}
              href='/Home/agenda'
            >
              <HStack>
                <CalendarIcon />
                {!isCollapsed && <Text ml={"2px"} color={"primary.200"} fontWeight={"bold"}>Agenda</Text>}
              </HStack>
            </Link>
            <Link fontSize="md" color={"primary.200"} _hover={{ backgroundColor: 'primary.500', color: "primary.300", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/clients'>
              <HStack>
                <AtSignIcon />
                {!isCollapsed && <Text ml={"2px"} color={"primary.200"} fontWeight={"bold"}>Clientes</Text>}
              </HStack>
            </Link>
            {/* <Link fontSize="md" _hover={{ backgroundColor: 'primary.500', color: "primary.100", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/metricas'>
              <HStack>
                <FaChartBar color={"#1D2939"}/>
                {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Dashboards</Text>}
              </HStack>
            </Link>
            <Link fontSize="md" _hover={{ backgroundColor: 'primary.500', color: "primary.100", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/chat'>
              <HStack>
                <ChatIcon color={"primary.200"}/>
                {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Chat</Text>}
              </HStack>
            </Link> */}
            <Link fontSize="md" color={"primary.200"} _hover={{ backgroundColor: 'primary.500', color: "primary.300", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/prontuarios' mb={0}>
              <HStack>
                <AttachmentIcon />
                {!isCollapsed && <Text ml={"2px"} color={"primary.200"} fontWeight={"bold"}>Prontuários</Text>}
              </HStack>
            </Link>
          </>
        )}
        <HStack justify="space-between" width="100%" onClick={toggleSettingsMenu} cursor="pointer">
          <Text fontSize="md" color="gray.500" display={isCollapsed ? "none" : "flex"} opacity={"sm"} ml={2} fontWeight={"bold"}>Settings</Text>
          {!isCollapsed && <IconButton color={"primary.200"}
            _hover={{ color: "primary.200", backgroundColor: "whitesmoke", opacity: "100%" }} icon={isSettingsExpanded ?
              <ChevronUpIcon /> : <ChevronDownIcon />} aria-label="Expand Settings" variant="ghost" />}
        </HStack>
        {isSettingsExpanded && (
          <>
            <Link fontSize="md" color={"primary.200"} _hover={{ backgroundColor: 'primary.500', color: "primary.300", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/services'>
              <HStack>
                <FaStethoscope />
                {!isCollapsed && <Text ml={"2px"} color={"primary.200"} fontWeight={"bold"}>Serviços</Text>}
              </HStack>
            </Link>
            {state.typeuser == "Clinic" && (
              <>
                <Link fontSize="md" color={"primary.200"} _hover={{ backgroundColor: 'primary.500', color: "primary.300", opacity: "100%" }}
                  width={"100%"} p={1} pl={2}
                  borderRadius={"md"} href='/Home/collaborators'>
                  <HStack>
                    <FaUserMd />
                    {!isCollapsed && <Text ml={"2px"} color={"primary.200"} fontWeight={"bold"}>Colaboradores</Text>}
                  </HStack>
                </Link>

              </>
            )}
            <Link fontSize="md" color={"primary.200"} _hover={{ backgroundColor: 'primary.500', color: "primary.300", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/collaborators'>
              <HStack>
                <FiUsers />
                {!isCollapsed && <Text ml={"2px"} color={"primary.200"} fontWeight={"bold"}>Funcionarios</Text>}
              </HStack>
            </Link>

            <Link fontSize="md" color={"primary.200"} _hover={{ backgroundColor: 'primary.500', color: "primary.300", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/stock'>
              <HStack>
                <FiBox />
                {!isCollapsed && <Text ml={"2px"} color={"primary.200"} fontWeight={"bold"}>Estoque</Text>}
              </HStack>
            </Link>
            {/* <Link fontSize="md" _hover={{ backgroundColor: 'primary.500', color: "primary.100", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/integration'>
              <HStack>
                <ExternalLinkIcon color={"primary.200"}/>
                {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Integrações</Text>}
              </HStack>
            </Link> */}
            <Link fontSize="md" color={"primary.200"} _hover={{ backgroundColor: 'primary.500', color: "primary.300", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/form'>
              <HStack>
                <EditIcon />
                {!isCollapsed && <Text ml={"2px"} color={"primary.200"} fontWeight={"bold"}>Anamnese</Text>}
              </HStack>
            </Link>
          </>
        )}
      </VStack>
      <Box borderTopWidth={"1px"} borderTopColor={"gray.200"}>
        <Flex align="center" mt={2} backgroundColor={"transparent"} borderRadius={"8px"} width={"50%"}
          _hover={{ color: "primary.300", backgroundColor: "primary.500", opacity: "100%" }}
          onClick={handleLogout}
          cursor={"pointer"}
          justifyContent={isCollapsed ? "center" : "start"}
          mx={"4"}

        >
          <IconButton
            transform="rotate(180deg)"
            aria-label="Logout"
            icon={<FaSignOutAlt />}
            isRound
            mr={isCollapsed ? "0" : "2"}
            backgroundColor="transparent"
            _hover={{ color: "primary.300", backgroundColor: "primary.500", opacity: "100%" }}
          />
          {!isCollapsed && <Text fontWeight={"bold"} color={"primary.200"}>Sair</Text>}
        </Flex>
      </Box>
      {/* Seção Inferior */}

    </Box>
  );
};

export default Sidebar;
