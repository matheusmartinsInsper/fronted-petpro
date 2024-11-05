"use client";

import {
  Switch,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
  HStack,
  Select,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  AddIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "../../../../utils/axiosConfig";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/headers";

interface Subcategory {
  namesubcategory: string;
  price: number;
}

interface VaccineDbDTO {
  codeofvaccine?: string;
  price?: number;
}

interface Service {
  CodigoDaCategoria: string;
  Titulo: string;
  Descrição: string;
  Preço: number | null;
  CodigoDeVacinas: VaccineDbDTO[];
  Atendimento: string[];
  SubCategories: Subcategory[];
}

const categoryOptions = [
  { value: "C01", label: "Higiene" },
  { value: "C02", label: "Estética" },
  { value: "C03", label: "Consulta" },
  { value: "C04", label: "Vacinação" },
  { value: "C05", label: "Castração" },
  { value: "C06", label: "Exame" },
  { value: "C07", label: "Cirurgia" },
  { value: "C08", label: "Vermifugação" },
];

const vaccinesCode = [
  { value: "V01", label: "Vacina antiraiva" },
  { value: "V02", label: "Vacina tantrica" },
  { value: "V03", label: "Vacina contra raiva" },
  { value: "V04", label: "Vacina contra queda de cabelo" },
  { value: "V05", label: "Vacina da gripe" },
];

const AddService = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen: isSubcategoryModalOpen, onOpen: onOpenSubcategoryModal, onClose: onCloseSubcategoryModal } = useDisclosure();
  const { isOpen: isVaccineModalOpen, onOpen: onOpenVaccineModal, onClose: onCloseVaccineModal } = useDisclosure();
  const [service, setService] = useState<Service>({
    CodigoDaCategoria: "",
    Titulo: "",
    Descrição: "",
    Preço: null,
    CodigoDeVacinas: [],
    Atendimento: [],
    SubCategories: [],
  });
  const [newSubcategory, setNewSubcategory] = useState<{ title: string; price: number }>({ title: '', price: 0 });
  const [newVaccine, setNewVaccine] = useState<{ name: string; price: number }>({ name: '', price: 0 });
  const [toggleState, setToggleState] = useState<"Pessoal" | "rede">("Pessoal");
  const [toggleStateapi, setToggleStateapi] = useState<"User" | "NetWork">("User");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const payload = {
        CodigoDaCategoria: service.CodigoDaCategoria,
        Titulo: service.Titulo,
        Descrição: service.Descrição,
        Preço: service.Preço,
        CodigoDeVacinas: service.CodigoDeVacinas,
        Atendimento: service.Atendimento,
        SubCategories: service.SubCategories.map((subcat) => ({
          namesubcategory: subcat.namesubcategory,
          price: subcat.price,
        })),
      };

      await axios.post("/Service", payload);

      toast({
        title: "Serviço salvo",
        description: "As informações do serviço foram salvas com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push("/Home/services");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o serviço.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddSubcategory = () => {
    setService({
      ...service,
      SubCategories: [...service.SubCategories, { namesubcategory: newSubcategory.title, price: newSubcategory.price }],
    });
    setNewSubcategory({ title: '', price: 0 });
    onCloseSubcategoryModal();
  };

  const handleAddVaccine = () => {
    setService({
      ...service,
      CodigoDeVacinas: [...service.CodigoDeVacinas, { codeofvaccine: newVaccine.name, price: newVaccine.price }],
    });
    setNewVaccine({ name: '', price: 0 });
    onCloseVaccineModal();
  };

  const handleRemoveSubcategory = (index: number) => {
    const updatedSubcategories = service.SubCategories.filter((_, i) => i !== index);
    setService({ ...service, SubCategories: updatedSubcategories });
  };

  const handleRemoveVaccine = (index: number) => {
    const updatedVaccines = service.CodigoDeVacinas.filter((_, i) => i !== index);
    setService({ ...service, CodigoDeVacinas: updatedVaccines });
  };

  const handleModelChange = (model: string) => {
    const updatedModel = service.Atendimento.includes(model)
      ? service.Atendimento.filter((m) => m !== model)
      : [...service.Atendimento, model];
    setService({ ...service, Atendimento: updatedModel });
  };

  const handleToggleChange = () => {
    const newToggleState = toggleState === "Pessoal" ? "rede" : "Pessoal";
    const newToggleStateapi = toggleStateapi === "User" ? "NetWork" : "User";
    setToggleState(newToggleState);
    setToggleStateapi(newToggleStateapi);
  };

  return (
    <>
      <Header />
      <Flex direction="row" minHeight="calc(100vh - 40px)" backgroundColor={"primary.100"}>
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/>

        <Box
        marginLeft={isCollapsed?"60px":"250px"}
         width={isCollapsed?"calc(100% - 60px)":"calc(100% - 250px)"}
          flex="1"
          position="relative"
          backgroundColor={"primary.100"}
          height={"53.4px"}
        >
          <Flex justify="flex-start" align="center" textAlign={"center"} mb="2" borderBottomColor={"gray.200"} borderBottomWidth={"1px"} py={"2"} px="4" fontFamily="Nunito, sans-serif">
            <Heading as="h1" size="sm" color={"primary.200"} display={"flex"} flexDirection={"row"} fontFamily="Nunito, sans-serif">
              <Text color="gray.500" fontFamily="Nunito, sans-serif">Settings
                <ChevronRightIcon />
              </Text>
              <Text color="gray.500">Serviços</Text>
              <Text><ChevronRightIcon /> Adicionar</Text>
            </Heading>
            <Button
              backgroundColor={"white"}
              borderRadius={"md"}
              size="sm"
              p={"2"}
              boxShadow={"md"}
              ml={"4"}
              _hover={{ backgroundColor: "white" }}
              _focus={{ outline: "none" }}
            >
              <Box ml="1">
                <Switch
                  colorScheme="purple"
                  isChecked={toggleState === "rede"}
                  onChange={handleToggleChange}
                  size="sm"
                  tabIndex={-1}
                  _focus={{ outline: "none", boxShadow: "none" }} // Remove a borda de foco
                  _active={{ outline: "none", boxShadow: "none" }} // Remove o estilo de foco do Switch
                  onMouseDown={(e) => e.preventDefault()}
                />
              </Box>
              <Text ml="2" color="primary.200" fontWeight={"semi-bold"} fontFamily="Nunito, sans-serif" fontSize={"sm"}>
                {toggleState === "Pessoal" ? "Pessoal" : "Rede"}
              </Text>
            </Button>
          </Flex>
          <Box mx="4" p="6" bg="white" borderRadius={"8px"} boxShadow={"md"} color={"primary.250"}>
            <Heading size={"md"} mb={"6"} color={"primary.250"}>Adicionar Novo Serviço</Heading>
            <VStack spacing="4" align="stretch">
              <Box>
                <HStack spacing="4">
                  <FormControl mb="4">
                    <FormLabel>Título</FormLabel>
                    <Input
                      value={service.Titulo}
                      onChange={(e) => setService({ ...service, Titulo: e.target.value })}
                      placeholder="Digite o título do serviço" // Placeholder adicionado
                      focusBorderColor="primary.400"
                    />
                  </FormControl>

                  <FormControl mb="4">
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      value={service.CodigoDaCategoria}
                      onChange={(e) => setService({ ...service, CodigoDaCategoria: e.target.value })}
                      placeholder="Selecione uma categoria" // Placeholder adicionado
                      focusBorderColor="primary.400"
                    >
                      {categoryOptions.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}  {/* Aqui o label é exibido no Select */}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl mb="4">
                    <FormLabel>Preço</FormLabel>
                    <Input
                      value={service.Preço !== null ? service.Preço : ''}
                      onChange={(e) => setService({ ...service, Preço: e.target.value ? parseFloat(e.target.value) : null })}
                      type="number"
                      placeholder="Digite o preço do serviço" // Placeholder adicionado
                      focusBorderColor="primary.400"
                    />
                  </FormControl>

                  <FormControl mb="4">
                    <FormLabel>Modelo de Atendimento</FormLabel>
                    <HStack spacing="4">
                      <Checkbox isChecked={service.Atendimento.includes("Online")} onChange={() => handleModelChange("Online")} iconColor="primary.300" colorScheme="primary.100" _selected={{ color: "primary.300" }}>Online</Checkbox>
                      <Checkbox isChecked={service.Atendimento.includes("Domiciliar")} onChange={() => handleModelChange("Domiciliar")} iconColor="primary.300" colorScheme="primary.100">Domiciliar</Checkbox>
                      <Checkbox isChecked={service.Atendimento.includes("Presencial")} onChange={() => handleModelChange("Presencial")} iconColor="primary.300" colorScheme="primary.100">Presencial</Checkbox>
                    </HStack>
                  </FormControl>
                </HStack>
              </Box>

              <Box>
                <FormControl mb="4">
                  <FormLabel>Subcategorias</FormLabel>
                  <Wrap spacing="2">
                    {service.SubCategories.map((subcat, index) => (
                      <WrapItem key={index}>
                        <Tag
                          size="lg"
                          borderRadius="full"
                          variant="solid"
                          colorScheme="teal"
                          backgroundColor="white"
                          color="primary.250"
                          boxShadow={"md"}
                          borderEndRadius={"5px"}
                          borderStartRadius={"5px"}
                          height={"40px"}
                        >
                          <TagLabel>{`${subcat.namesubcategory} - R$ ${subcat.price}`}</TagLabel>
                          <TagCloseButton onClick={() => handleRemoveSubcategory(index)} />
                        </Tag>
                      </WrapItem>
                    ))}
                    <WrapItem>
                      <Button
                        leftIcon={<AddIcon />}
                        onClick={onOpenSubcategoryModal}
                        backgroundColor="primary.500"
                        color="primary.300"
                        borderRadius="5px"
                        _hover={{ backgroundColor: "primary.300", color: "primary.500" }}
                      >
                        Adicionar
                      </Button>
                    </WrapItem>
                  </Wrap>
                </FormControl>
              </Box>

              <Box>
                <FormControl mb="4">
                  <FormLabel>Vacinas</FormLabel>
                  <Wrap spacing="2">
                    {service.CodigoDeVacinas.map((vacina, index) => (
                      <WrapItem key={index}>
                        <Tag
                          size="lg"
                          borderRadius="full"
                          variant="solid"
                          colorScheme="teal"
                          backgroundColor="white"
                          color="primary.250"
                          boxShadow={"md"}
                          borderEndRadius={"5px"}
                          borderStartRadius={"5px"}
                          height={"40px"}
                        >
                          <TagLabel>{`${vacina.codeofvaccine} - R$ ${vacina.price}`}</TagLabel>
                          <TagCloseButton onClick={() => handleRemoveVaccine(index)} />
                        </Tag>
                      </WrapItem>
                    ))}
                    <WrapItem>
                      <Button
                        leftIcon={<AddIcon />}
                        onClick={onOpenVaccineModal}
                        backgroundColor="primary.500"
                        color="primary.300"
                        borderRadius="5px"
                        _hover={{ backgroundColor: "primary.300", color: "primary.500" }}
                      >
                        Adicionar
                      </Button>
                    </WrapItem>
                  </Wrap>
                </FormControl>
              </Box>

              <FormControl mb="4">
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  value={service.Descrição}
                  onChange={(e) => setService({ ...service, Descrição: e.target.value })}
                  placeholder="Digite uma descrição para o serviço" // Placeholder adicionado
                  focusBorderColor="primary.400"
                />
              </FormControl>

              <Box>
                <Flex direction={"row"} justifyContent={"space-between"}>
                  <Button
                    leftIcon={<ChevronLeftIcon />}
                    onClick={() => router.back()}
                    color="primary.250"
                    backgroundColor={"white"}
                    _hover={{ backgroundColor: "primary.100", color: "primary.250" }}
                    zIndex="1000"
                  >
                    Voltar
                  </Button>

                  <Button
                    leftIcon={<CheckIcon />}
                    backgroundColor={"primary.500"}
                    color="primary.300"
                    onClick={handleSave}
                    _hover={{ backgroundColor: "primary.300", color: "primary.100" }}
                    zIndex="1000"
                  >
                    Salvar
                  </Button>
                </Flex>
              </Box>
            </VStack>

            {/* Modal de Subcategorias */}
            <Modal isOpen={isSubcategoryModalOpen} onClose={onCloseSubcategoryModal} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  Adicionar Subcategoria
                  <Text color={"gray.500"} fontSize={"sm"}>
                    <InfoOutlineIcon color={"gray.400"} boxSize={"3"} /> Crie uma subcategoria relacionada ao serviço
                  </Text>
                </ModalHeader>

                <ModalCloseButton />
                <ModalBody>
                  <FormControl mb="4">
                    <FormLabel>Título</FormLabel>
                    <Input
                      value={newSubcategory.title}
                      onChange={(e) => setNewSubcategory({ ...newSubcategory, title: e.target.value })}
                      placeholder="Digite o título da subcategoria" // Placeholder adicionado
                      focusBorderColor="primary.400"
                    />
                  </FormControl>
                  <FormControl mb="4">
                    <FormLabel>Preço</FormLabel>
                    <Input
                      value={newSubcategory.price}
                      onChange={(e) => setNewSubcategory({ ...newSubcategory, price: parseFloat(e.target.value) })}
                      type="number"
                      placeholder="Digite o preço da subcategoria" // Placeholder adicionado
                      focusBorderColor="primary.400"
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                  <Button colorScheme="blue" onClick={handleAddSubcategory} backgroundColor="primary.500" color="primary.300" _hover={{ backgroundColor: "primary.300", color: "primary.500" }}>
                    Adicionar
                  </Button>
                  <Button onClick={onCloseSubcategoryModal} bgColor={"white"}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* Modal de Vacinas */}
            <Modal isOpen={isVaccineModalOpen} onClose={onCloseVaccineModal} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Adicionar Vacina</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl mb="4">
                    <FormLabel>Vacina</FormLabel>
                    <Select
                      value={service.CodigoDaCategoria}
                      onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
                      placeholder="Selecione uma vacina" // Placeholder adicionado
                      focusBorderColor="primary.400"
                    >
                      {vaccinesCode.map((vaccine) => (
                        <option key={vaccine.value} value={vaccine.value}>
                          {vaccine.label} {/* Aqui o label é exibido no Select */}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl mb="4">
                    <FormLabel>Preço</FormLabel>
                    <Input
                      value={newVaccine.price}
                      onChange={(e) => setNewVaccine({ ...newVaccine, price: parseFloat(e.target.value) })}
                      type="number"
                      placeholder="Digite o preço da vacina" // Placeholder adicionado
                      focusBorderColor="primary.400"
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                  <Button colorScheme="blue" onClick={handleAddVaccine} backgroundColor="primary.500" color="primary.300" _hover={{ backgroundColor: "primary.300", color: "primary.500" }}>
                    Adicionar
                  </Button>
                  <Button onClick={onCloseVaccineModal} bgColor={"white"}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default AddService;
