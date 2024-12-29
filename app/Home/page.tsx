"use client"
import { Box, Heading, Flex, Text, SimpleGrid, Card, CardBody, Icon, useTheme, Button, Link, IconButton, Spinner, Image } from '@chakra-ui/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { FaEnvelope } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { MdEvent, MdPeople, MdStore, MdMoreHoriz, MdPets } from 'react-icons/md';
import Sidebar from './components/Sidebar';
import Header from "./components/headers";
import {
  ArrowBackIcon, BellIcon, CalendarIcon, EditIcon, SettingsIcon, ExternalLinkIcon, ChatIcon,
  ChevronLeftIcon, ChevronRightIcon, AttachmentIcon, ChevronDownIcon, ChevronUpIcon, WarningIcon, InfoOutlineIcon
} from '@chakra-ui/icons';
import { useAppContext } from "../context/AppContext";

interface BarData {
  day: string;
  totalFaturado: number;
  totalPerdido: number;
  totalClientesAtendidos: number;
  totalDespesa: number
}

interface PieData {
  name: string;
  value: number;
}

const barData: BarData[] = [
  { day: 'Seg', totalFaturado: 300, totalPerdido: 50, totalDespesa: 380, totalClientesAtendidos: 40 },
  { day: 'Ter', totalFaturado: 400, totalPerdido: 60, totalDespesa: 80, totalClientesAtendidos: 40 },
  { day: 'Qua', totalFaturado: 350, totalPerdido: 40, totalDespesa: 100, totalClientesAtendidos: 40 },
  { day: 'Qui', totalFaturado: 500, totalPerdido: 70, totalDespesa: 10, totalClientesAtendidos: 40 },
  { day: 'Sex', totalFaturado: 420, totalPerdido: 55, totalDespesa: 200, totalClientesAtendidos: 40 },
  { day: 'Sáb', totalFaturado: 480, totalPerdido: 65, totalDespesa: 0, totalClientesAtendidos: 40 },
  { day: 'Dom', totalFaturado: 600, totalPerdido: 80, totalDespesa: 200, totalClientesAtendidos: 40 },
];

const totalMeta = 5000;
const valorAtual = 3500;
const percentageMetaAtingida = (valorAtual / totalMeta) * 100;
const pieData: PieData[] = [
  { name: 'Meta Atingida', value: percentageMetaAtingida },
  { name: 'Meta Restante', value: 100 - percentageMetaAtingida },
];

const faturamentoSemanal: BarData[] = [
  { day: '1º', totalFaturado: 1200, totalPerdido: 200, totalDespesa: 50, totalClientesAtendidos: 40 },
  { day: '2º', totalFaturado: 1500, totalPerdido: 300, totalDespesa: 50, totalClientesAtendidos: 40 },
  { day: '3º', totalFaturado: 1800, totalPerdido: 250, totalDespesa: 50, totalClientesAtendidos: 40 },
  { day: '4º', totalFaturado: 1400, totalPerdido: 220, totalDespesa: 50, totalClientesAtendidos: 40 },
];

const UserPage: React.FC = () => {
  const { state } = useAppContext();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Define o estado para falso após 2 segundos
    }, 500);

    // Cleanup do timeout ao desmontar o componente
    return () => clearTimeout(timer);
  }, []);


  if (isLoading) {
    // Retorna uma tela de carregamento ou nulo até que o tempo passe
    return <>
      <Header />
      <Flex direction="column" minHeight="calc(100vh - 40px)" backgroundColor={"primary.100"} position={"relative"}>
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <Box
          marginLeft={isCollapsed ? "60px" : "250px"}
          py="2"
          px={"4"}
          width={isCollapsed ? "calc(100% - 60px)" : "calc(100% - 250px)"}
          flex="1"
          borderRadius="md"
          position="relative"
          mt={"-10px"}
        >
          {/* Container centralizado com spinner e texto */}
          <Flex
            justify="center"
            align="center"
            height="calc(100vh - 60px)"// Preenche toda a altura da tela para centralizar
            direction="column"
          >
            <Box bgColor={"white"} flexDirection={"column"} height={"25vh"} width={"33vw"} display={"flex"} justifyContent={"center"} alignItems={"center"} boxShadow={"md"} borderRadius={"md"}>

              <Text fontWeight={"bold"} mb={4} fontSize="lg" color="gray.700" >
                Estamos trazendo seus dados, aguarde...
              </Text>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="primary.300"
                size="xl"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  }

  const solicitacoes: number = 10;
  const agendamentos: number = 5;
  const colaboradores: number = 8;
  const estoque: number = 50;

  const totalFaturadoSemana: number = barData.reduce((acc, data) => acc + data.totalFaturado, 0);
  const totalAtendimentosSemana: number = barData.reduce((acc, data) => acc + data.totalClientesAtendidos, 0);
  const totalPerdido: number = barData.reduce((acc, data) => acc + data.totalPerdido, 0);
  const totalDespesa: number = barData.reduce((acc, data) => acc + data.totalDespesa, 0);

  return (

    <>
      <Header />
      <Flex direction="column" minHeight="calc(100vh - 40px)" backgroundColor={"primary.100"} position={"relative"} >
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <Flex>
          <Box
            marginLeft={isCollapsed ? "60px" : "250px"}
            py="2"
            px={"4"}
            width={isCollapsed ? "calc(100% - 60px)" : "calc(100% - 250px)"}
            flex="1"
            borderRadius="md"
            position="relative"
            mt={"-10px"}
          >

            <Box
              borderTop={"1px"}
              borderTopColor={"primary.100"}
              backgroundColor="primary.200"
              height="140px" // Ajuste para ocupar até a metade dos cards
              position="absolute"
              top={0}
              left={0}
              right={0}// Coloca atrás dos cards
              px="4"
              zIndex={1}
            >
              <Heading as="h1" mb="1" mt="6" size={"md"} color="primary.100" display={"flex"} flexDirection={"row"} fontWeight={"semi-bold"}>Seja bem-vindo, <Text color='primary.100' opacity={"100%"} fontWeight={"bold"}>Best Clinic</Text></Heading>
              <Text color={"gray.500"} mb={"1"}>Acompanhe suas metricas semanais e mensais! </Text>
            </Box>


            <SimpleGrid zIndex={2} mt="20" columns={{ base: 1, md: 2, lg: 4 }} spacing="2" position={"relative"}>
              <Link href='Home/solicitations' _hover={{ textDecoration: 'none', color: 'inherit' }}  >
                <Card zIndex={2}>
                  <CardBody color="primary.250" _hover={{ backgroundColor: "primary.300", color: "primary.100", borderRadius: "md", transition: "0.2" }} transition={"1"} cursor={"pointer"}>

                    <Flex align="center" >
                      <Icon as={BellIcon} boxSize={4} mr={"2"} />
                      <Heading size="sm" >Solicitações</Heading>
                    </Flex>
                    <Flex align={"end"} mt={2}>
                      <Text fontSize="xl" fontWeight="bold" mr={2} mb={-1}>{solicitacoes} </Text>
                      <Text fontSize="sm" color="gray.500" >Pendentes </Text>
                    </Flex>

                  </CardBody>
                </Card>
              </Link>

              <Link href='Home/agenda' _hover={{ textDecoration: 'none', color: 'inherit' }} >
                <Card>
                  <CardBody color="primary.250" _hover={{ backgroundColor: "primary.300", color: "primary.100", borderRadius: "md", transition: "0.2" }} transition={"1"} cursor={"pointer"}>
                    <Flex align="center">
                      <Icon as={CalendarIcon} boxSize={4} mr={2} />
                      <Heading size="sm" >Agendamentos</Heading>
                    </Flex>
                    <Flex align={"end"} mt={2}>
                      <Text fontSize="xl" fontWeight="bold" mr={2} mb={-1}>{agendamentos} </Text>
                      <Text fontSize="sm" color="gray.500" >Confirmados para hoje </Text>
                    </Flex>
                  </CardBody>
                </Card>
              </Link>

              <Link href='Home/prontuarios' _hover={{ textDecoration: 'none', color: 'inherit' }} >
                <Card>
                  <CardBody color="primary.250" _hover={{ backgroundColor: "primary.300", color: "primary.100", borderRadius: "md", transition: "0.2" }} transition={"1"} cursor={"pointer"}>
                    <Flex align="center">
                      <Icon as={MdPets} boxSize={4} mr={2} />
                      <Heading size="sm" >Pets</Heading>
                    </Flex>
                    <Flex align={"end"} mt={2}>
                      <Text fontSize="xl" fontWeight="bold" mr={2} mb={-1}>{colaboradores} </Text>
                    </Flex>
                  </CardBody>
                </Card>
              </Link>
              <Link href='Home/clients' _hover={{ textDecoration: 'none', color: 'inherit' }}>
                <Card>
                  <CardBody color="primary.250" _hover={{ backgroundColor: "primary.300", color: "primary.100", borderRadius: "md", transition: "0.2" }} transition={"1"} cursor={"pointer"}>
                    <Flex align="center">
                      <Icon as={EditIcon} boxSize={4} mr={2} />
                      <Heading size="sm" >Clientes</Heading>
                    </Flex>
                    <Flex align={"end"} mt={2}>
                      <Text fontSize="xl" fontWeight="bold" mr={2} mb={-1}>{estoque} </Text>
                    </Flex>
                  </CardBody>
                </Card>
              </Link>

            </SimpleGrid>
            <Box mt="2">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing="2">

                <Card borderRadius="lg" overflow="hidden" zIndex={3} >
                  <CardBody >
                    <Flex justify={"space-between"}>
                      <Heading size="md" mb="4" color={"primary.250"}>
                        Meta do Mês
                      </Heading>
                      <Button
                        backgroundColor={"white"}
                        color={"primary.300"}
                        borderRadius={"md"}
                        border={'1px'}
                        boxShadow={"md"}
                        fontWeight={"bold"}
                        borderColor={"gray.200"}
                        size={"sm"}
                        _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
                      >
                        Definir Meta
                      </Button>
                    </Flex>

                    {/* Gráfico de pizza com texto e dois círculos de legenda ao lado esquerdo */}
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          startAngle={180}
                          innerRadius={60}
                          outerRadius={70}
                          endAngle={0}
                          dataKey="value"
                          fill={theme.colors.primary[300]}
                          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                          cornerRadius={10}
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                index === 0
                                  ? theme.colors.primary[300]
                                  : theme.colors.primary[500]
                              }
                            />
                          ))}
                        </Pie>

                        {/* Texto central dentro do gráfico */}
                        <text
                          x="50%"
                          y="50%"
                          dy={8} // Ajuste de posicionamento vertical
                          textAnchor="middle"
                          fill={theme.colors.primary[300]} // Cor do texto
                          fontSize={16} // Tamanho do texto
                          fontWeight="bold"
                        >
                          {`${valorAtual} R$`}
                        </text>

                        {/* Adicionando círculos com legendas ao lado esquerdo */}
                        <circle cx="10%" cy="40%" r={6} fill={theme.colors.primary[300]} />
                        <text x="15%" y="40%" fill={theme.colors.primary[200]} fontSize={12}>
                          Atingido em (%)
                        </text>

                        <circle cx="10%" cy="55%" r={6} fill={theme.colors.primary[500]} />
                        <text x="15%" y="55%" fill={theme.colors.primary[200]} fontSize={12}>
                          Faltante em (%)
                        </text>
                      </PieChart>
                    </ResponsiveContainer>

                    <Text color={"gray.500"} mt="-2" mb="2" >
                      <InfoOutlineIcon color={"gray.400"} boxSize={"3"} /> Esse é o valor total recebido no mês
                    </Text>

                    <Box>
                      <Heading size="md" mb="12" mt={"4"} color={"primary.250"}>
                        Faturamento por semana
                      </Heading>
                    </Box>

                    <ResponsiveContainer width="80%" height={120}>
                      <BarChart data={faturamentoSemanal} layout="vertical">
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="day" />
                        <Tooltip />
                        <Bar
                          dataKey="totalFaturado"
                          fill={theme.colors.primary[300]}
                          name="Faturamento Semanal"
                          barSize={10}
                          radius={[10, 10, 10, 10]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardBody>
                </Card>
                <Card borderRadius="lg" overflow="hidden" zIndex={"3"}>
                  <CardBody>
                    <Heading size="md" mb="12" color="primary.250">Receita semanal</Heading>
                    {/* <Text color={"gray.500"} mt="-2" mb="2">
                  <InfoOutlineIcon color={"gray.400"} boxSize={"3"} /> As perdas são calculadas sobre as solicitações canceladas.
                  </Text> */}
                    <Flex mb="10" justify={"space-between"}>
                      <Box>
                        <Text fontSize="md" fontWeight="bold" color="primary.250" mb={'1'}>Atendidos</Text>
                        <Box p={1} backgroundColor={"white"} boxShadow={"md"} color={"primary.300"} textAlign={"center"} maxWidth={"60px"} border={"1px"} borderRadius={"md"} borderColor={"gray.200"} fontWeight={"bold"}><Text fontSize="sm">{totalAtendimentosSemana}</Text></Box>
                      </Box>
                      <Box>
                        <Text fontSize="md" fontWeight="bold" color="primary.250" mb={'1'}>Receita</Text>
                        <Box p={1} backgroundColor={"white"} boxShadow={"md"} color={"primary.300"} textAlign={"center"} maxWidth={"80px"} border={"1px"} borderRadius={"md"} borderColor={"gray.200"} fontWeight={"bold"}><Text fontSize="sm">R${totalFaturadoSemana}</Text></Box>
                      </Box>
                      <Box>
                        <Text fontSize="md" fontWeight="bold" color="primary.250" mb={'1'}>Despesas</Text>
                        <Box p={1} backgroundColor={"white"} boxShadow={"md"} color={"primary.600"} textAlign={"center"} maxWidth={"80px"} border={"1px"} borderRadius={"md"} borderColor={"gray.200"} fontWeight={"bold"}><Text fontSize="sm">R${totalDespesa}</Text></Box>
                      </Box>
                      <Box>
                        <Text fontSize="md" fontWeight="bold" color="primary.250" mb={'1'}>Cancelados</Text>
                        <Box p={1} backgroundColor={"white"} boxShadow={"md"} color={"#FF407D"} textAlign={"center"} maxWidth={"60px"} border={"1px"} borderRadius={"md"} borderColor={"gray.200"} fontWeight={"bold"}><Text fontSize="sm">49</Text></Box>
                      </Box>
                      <Box>
                        <Text fontSize="md" fontWeight="bold" color="primary.250" mb={'1'}>Perdas</Text>
                        <Box p={1} backgroundColor={"white"} boxShadow={"md"} color={"primary.700"} textAlign={"center"} maxWidth={"60px"} border={"1px"} borderRadius={"md"} borderColor={"gray.200"} fontWeight={"bold"}><Text fontSize="sm">R${totalPerdido}</Text></Box>
                      </Box>


                    </Flex>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={barData}>
                        {/* Definição dos gradientes */}
                        <defs>
                          <linearGradient id="gradientFaturado" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={theme.colors.primary[300]} stopOpacity={0.2} />
                            <stop offset="50%" stopColor={theme.colors.primary[300]} stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradientDespesa" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={theme.colors.primary[600]} stopOpacity={0.2} />
                            <stop offset="50%" stopColor={theme.colors.primary[600]} stopOpacity={0} />
                          </linearGradient>
                        </defs>

                        {/* Grade, eixos e tooltip */}
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />

                        {/* Gráficos com gradiente */}
                        <Area
                          type="monotone"
                          dataKey="totalFaturado"
                          strokeWidth={"2px"}
                          stroke={theme.colors.primary[300]}
                          fill="url(#gradientFaturado)"
                          name="Total Faturado"
                        />
                        <Area
                          type="monotone"
                          dataKey="totalDespesa"
                          strokeWidth={"2px"}
                          stroke={theme.colors.primary[600]}
                          fill="url(#gradientDespesa)"
                          name="Total Gasto"
                        />
                      </AreaChart>
                    </ResponsiveContainer>


                  </CardBody>
                </Card>

              </SimpleGrid>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>

  );
};

export default UserPage;

