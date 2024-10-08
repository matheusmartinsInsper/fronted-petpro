"use client";

import { useState, useEffect } from 'react';
import { Box, VStack, Link, Text, IconButton, Flex, HStack, Divider,Image} from '@chakra-ui/react';
import { FaUser, FaChartBar } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import {
  ArrowBackIcon, BellIcon, CalendarIcon, EditIcon, SettingsIcon, ExternalLinkIcon, ChatIcon,
  ChevronLeftIcon, ChevronRightIcon, AttachmentIcon, ChevronDownIcon, ChevronUpIcon,CheckIcon,AtSignIcon 
} from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMainMenuExpanded, setIsMainMenuExpanded] = useState(true);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(true);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userType = localStorage.getItem('typeuser');
    if (userType === 'Collaborator') {
      setIsCollaborator(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Exemplo: remove token do localStorage
    router.push('/Signin'); // Redireciona para a página de login
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
      py="2"
      px="4"
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
      <Flex textAlign={"center"} height={"60px"} justifyContent={isCollapsed ? "center" : "start"} alignItems={"center"} mb={"2"}>
        
        {!isCollapsed && <Box  display="flex" flexDirection="row" alignItems="center" textAlign="start" ml={2}>
        <Box boxSize="50px" borderRadius="full" overflow="hidden" mr={4}>
                <Image src="https://avatars.githubusercontent.com/u/96667690?s=400&u=4f8546bf37989b834e06c9f8537efde6fddc1312&v=4" alt="Tutor Image" />
              </Box>
              <Box>
              <Text fontWeight={"bold"} fontSize={"xl"}>Best Clinic</Text>
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
          _hover={{ backgroundColor: "primary.100",boxShadow: "md" }}
        />
      </Flex>

      <Divider borderColor="gray.200" />

      {/* Menu Principal */}
      <VStack align={isCollapsed ? "center" : "start"} spacing={0} justifyContent={"start"} flex="1" color={"primary.100"} mt={4}>
        <HStack justify="start" width="100%" onClick={toggleMainMenu} cursor="pointer">
          <Text fontSize="md" fontWeight="bold" color="gray.500" display={isCollapsed ? "none" : "flex"} opacity={"sm"} ml={2}>Main Menu</Text>
          {!isCollapsed && <IconButton color={"primary.200"} _hover={{ color: "primary.200", backgroundColor: "whitesmoke", opacity: "80%" }} icon={isMainMenuExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />} aria-label="Expand Main Menu" variant="ghost" />}
        </HStack>
        {isMainMenuExpanded && (
          <>
            <Link fontSize="md" _hover={{ backgroundColor: 'gray.200', color: "primary.200", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/solicitations'>
              <HStack>
                <BellIcon color={"primary.200"}/>
                {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Solicitações</Text>}
              </HStack>
            </Link>
            <Link fontSize="md" _hover={{ backgroundColor: 'gray.200', color: "primary.100", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"}
              href='/Home/agenda'
            >
              <HStack>
                <CalendarIcon color={"primary.200"}/>
                {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Agenda</Text>}
              </HStack>
            </Link>
            <Link fontSize="md" _hover={{ backgroundColor: 'gray.200', color: "primary.200", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/solicitations'>
              <HStack>
                <AtSignIcon  color={"primary.200"}/>
                {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Clientes</Text>}
              </HStack>
            </Link>
            <Link fontSize="md" _hover={{ backgroundColor: 'gray.200', color: "primary.100", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/metricas'>
              <HStack>
                <FaChartBar color={"#1D2939"}/>
                {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Dashboards</Text>}
              </HStack>
            </Link>
            <Link fontSize="md" _hover={{ backgroundColor: 'gray.200', color: "primary.100", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/chat'>
              <HStack>
                <ChatIcon color={"primary.200"}/>
                {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Chat</Text>}
              </HStack>
            </Link>
            <Link fontSize="md" _hover={{ backgroundColor: 'gray.200', color: "primary.100", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/prontuarios' mb={2}>
              <HStack>
                <AttachmentIcon color={"primary.200"}/>
                {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Prontuários</Text>}
              </HStack>
            </Link>
          </>
        )}
        <HStack justify="start" width="100%" onClick={toggleSettingsMenu} cursor="pointer">
          <Text fontSize="md" fontWeight="bold" color="gray.500" display={isCollapsed ? "none" : "flex"} opacity={"sm"} ml={2}>Settings</Text>
          {!isCollapsed && <IconButton color={"primary.200"} 
          _hover={{ color: "primary.200", backgroundColor: "whitesmoke", opacity: "100%" }} icon={isSettingsExpanded ? 
          <ChevronUpIcon /> : <ChevronDownIcon />} aria-label="Expand Settings" variant="ghost" />}
        </HStack>
        {isSettingsExpanded && (
          <>
            <Link fontSize="md" _hover={{ backgroundColor: 'gray.200', color: "primary.100", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/services'>
              <HStack>
                <SettingsIcon color={"primary.200"}/>
                {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Serviços</Text>}
              </HStack>
            </Link>
            {!isCollaborator && (
              <>
                <Link fontSize="md" _hover={{ backgroundColor: 'gray.200', color: "primary.100", opacity: "100%" }}
                  width={"100%"} p={1} pl={2}
                  borderRadius={"md"} href='/Home/collaborators'>
                  <HStack>
                    <FaUser color={"#1D2939"}/>
                    {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Colaboradores</Text>}
                  </HStack>
                </Link>
               
              </>
            )}
             <Link fontSize="md" _hover={{ backgroundColor: 'gray.200', color: "primary.100", opacity: "100%" }}
                  width={"100%"} p={1} pl={2}
                  borderRadius={"md"} href='/Home/estoque'>
                  <HStack>
                    <EditIcon color={"primary.200"}/>
                    {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Estoque</Text>}
                  </HStack>
                </Link>
            <Link fontSize="md" _hover={{ backgroundColor: 'gray.200', color: "primary.100", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/integration'>
              <HStack>
                <ExternalLinkIcon color={"primary.200"}/>
                {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Integrações</Text>}
              </HStack>
            </Link>
            <Link fontSize="md" _hover={{ backgroundColor: 'gray.200', color: "primary.100", opacity: "100%" }}
              width={"100%"} p={1} pl={2}
              borderRadius={"md"} href='/Home/form'>
              <HStack>
                <CheckIcon color={"primary.200"}/>
                {!isCollapsed && <Text ml={"5px"} color={"primary.250"} fontWeight={"bold"}>Anamnese</Text>}
              </HStack>
            </Link>
          </>
        )}
      </VStack>

      {/* Seção Inferior */}
      <Flex align="center" mt={4} backgroundColor={"transparent"} borderRadius={"8px"} width={"50%"}
        _hover={{ color: "primary.200", backgroundColor: "gray.200", opacity: "100%" }}
        onClick={handleLogout}
        cursor={"pointer"}
        justifyContent={isCollapsed ? "center" : "start"}
      >
        <IconButton
          aria-label="Logout"
          icon={<ArrowBackIcon color={"primary.200"}/>}
          isRound
          mr={isCollapsed ? "0" : "2"}
          backgroundColor="transparent"
          color={"primary.100"}
          _hover={{ color: "primary.100", backgroundColor: "gray.200", opacity: "100%" }}
        />
        {!isCollapsed && <Text fontWeight={"bold"} color={"primary.250"}>Sair</Text>}
      </Flex>
    </Box>
  );
};

export default Sidebar;
