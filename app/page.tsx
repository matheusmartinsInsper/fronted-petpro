import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box p={4} bg="primary.100" color="primary.200" >
      {/* Header */}
      <Flex as="header" justify="space-between" align="center" mb={8}>
        <Heading size="lg">PetPro</Heading>
        <Flex>
          <Button bg="primary.300" color="primary.100" mr={4}>Login</Button>
          <Button bg="primary.300" color="primary.100">Cadastro</Button>
        </Flex>
      </Flex>

      {/* Sections */}
      <Box as="section" mb={8}>
        <Flex direction={{ base: 'column', md: 'row' }} align="center">
          <Box flex="1" textAlign="left">
            <Heading size="md" mb={4}>Gerencie Seus Pets</Heading>
            <Text fontSize="lg">
              Centralize e realize a gestão de seus atendimentos, serviços, estoque e colaboradores em uma única plataforma com integração a IA.
            </Text>
          </Box>
          <Box flex="1" textAlign="center">
            <Image src="teladonot.png" alt="Gerencie Seus Pets"  />
          </Box>
        </Flex>
      </Box>

      <Box as="section" mb={8}>
        <Flex direction={{ base: 'column-reverse', md: 'row' }} align="center">
          <Box flex="1" textAlign="center">
            <Image src="teladonot.png" alt="Agenda Fácil"  />
          </Box>
          <Box flex="1" textAlign="left">
            <Heading size="md" mb={4}>Agenda Fácil</Heading>
            <Text fontSize="lg">
              Tenha controle total sobre a agenda de seus pets, com notificações automáticas e lembretes para garantir que nada seja esquecido.
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box as="section" mb={8}>
        <Flex direction={{ base: 'column', md: 'row' }} align="center">
          <Box flex="1" textAlign="left">
            <Heading size="md" mb={4}>Relatórios Detalhados</Heading>
            <Text fontSize="lg">
              Acompanhe o desempenho dos seus serviços com relatórios detalhados e métricas importantes para o crescimento do seu negócio.
            </Text>
          </Box>
          <Box flex="1" textAlign="center">
            <Image src="teladonot.png" alt="Relatórios Detalhados" />
          </Box>
        </Flex>
      </Box>

      <Box as="section" mb={8}>
        <Flex direction={{ base: 'column-reverse', md: 'row' }} align="center">
          <Box flex="1" textAlign="center">
            <Image src="teladonot.png" alt="Suporte Completo" />
          </Box>
          <Box flex="1" textAlign="left">
            <Heading size="md" mb={4}>Suporte Completo</Heading>
            <Text fontSize="lg">
              Conte com um suporte completo para resolver todas as suas dúvidas e garantir que você aproveite ao máximo todas as funcionalidades do PetPro.
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default HomePage;
