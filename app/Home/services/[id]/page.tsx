"use client";

import {Text, Box, Button, Flex, FormControl, FormLabel, Input, Textarea, useToast, VStack, HStack, Select, Checkbox, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Tag, TagLabel, TagCloseButton, Wrap, WrapItem, Heading } from "@chakra-ui/react";
import { AddIcon, CheckIcon, ChevronLeftIcon,ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from '../../../../utils/axiosConfig';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/headers";

// Interface para definir a estrutura dos serviços
interface Subcategory {
  title: string;
  price: number;
  idsubcategory: string;
  idservice: string;
}

interface VaccineDbDTO {
  nameofvaccine?: string;
  codevaccine?: string;
  idservice?: string;
  price?: number;
  idvaccine?: string;
}

interface Service {
  idDoServiço: string;
  nomeDoServiço: string;
  titulo: string;
  descrição: string;
  preço: number;
  vacinas: VaccineDbDTO[];
  subcategorias: Subcategory[];
  atendimento: string[]
}

const ServiceDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const toast = useToast();
  const { isOpen: isSubcategoryModalOpen, onOpen: onOpenSubcategoryModal, onClose: onCloseSubcategoryModal } = useDisclosure();
  const { isOpen: isVaccineModalOpen, onOpen: onOpenVaccineModal, onClose: onCloseVaccineModal } = useDisclosure();
  const [service, setService] = useState<Service | null>(null);
  const [newSubcategory, setNewSubcategory] = useState<{ title: string; price: number }>({ title: '', price: 0 });
  const [newVaccine, setNewVaccine] = useState<{ name: string; price: number }>({ name: '', price: 0 });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    // Configuração do token de autenticação
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('Authorization');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }

    const fetchService = async () => {
      try {
        const response = await axios.get(`/Service`,{
          params:{
            "idservice":id
          }
        });
        const data = response.data;
        if (data.status === 'confirmed') {
          setService(data.data);
        } else {
          toast({
            title: "Serviço não encontrado",
            description: "O serviço solicitado não foi encontrado.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          router.push("/services");
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao carregar o serviço.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        router.push("/services");
      }
    };

    fetchService();
  }, [id, router, toast]);

  const handleSave = () => {
    toast({
      title: "Serviço salvo",
      description: "As informações do serviço foram salvas com sucesso.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleAddSubcategory = () => {
    if (service) {
      setService({
        ...service,
        subcategorias: [...service.subcategorias, {
          title: newSubcategory.title,
          price: newSubcategory.price,
          idsubcategory: "",
          idservice: service.idDoServiço
        }]
      });
      setNewSubcategory({ title: '', price: 0 });
      onCloseSubcategoryModal();
    }
  };

  const handleAddVaccine = () => {
    if (service) {
      setService({
        ...service,
        vacinas: [...service.vacinas, {
          nameofvaccine: newVaccine.name,
          price: newVaccine.price,
          idservice: service.idDoServiço,
          idvaccine: ""
        }]
      });
      setNewVaccine({ name: '', price: 0 });
      onCloseVaccineModal();
    }
  };

  const handleRemoveSubcategory = (index: number) => {
    if (service) {
      const updatedSubcategories = service.subcategorias.filter((_, i) => i !== index);
      setService({ ...service, subcategorias: updatedSubcategories });
    }
  };

  const handleRemoveVaccine = (index: number) => {
    if (service) {
      const updatedVaccines = service.vacinas.filter((_, i) => i !== index);
      setService({ ...service, vacinas: updatedVaccines });
    }
  };

  const handleModelChange = (model: string) => {
    if (service) {
      const updatedModel = service.atendimento.includes(model)
        ? service.atendimento.filter(m => m !== model)
        : [...service.atendimento, model];
      setService({ ...service, atendimento: updatedModel });
    }
  };

  if (!service) return <p>Carregando...</p>;

  return (
    <>
    <Header/>
    <Flex direction="row" minHeight="calc(100vh - 40px)" backgroundColor={"primary.200"}>
    <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/>
      <Box
      marginLeft={isCollapsed?"60px":"250px"}
       width={isCollapsed?"calc(100% - 60px)":"calc(100% - 250px)"}
        flex="1"
        position="relative"
        backgroundColor={"primary.100"}
      >
        <Flex justify="flex-start" align="center" textAlign={"center"} mb="2"  borderBottomColor={"gray.200"} borderBottomWidth={"1px"} py={"2"} px = "4" fontFamily="Nunito, sans-serif">
          <Heading  as="h1" size="sm" color={"primary.200"} display={"flex"} flexDirection={"row"} fontFamily="Nunito, sans-serif"><Text color="gray.500" fontFamily="Nunito, sans-serif">Settings 
      <ChevronRightIcon /> 
          
        </Text ><Text color="gray.500">Serviços</Text> <Text><ChevronRightIcon /> Atualizar</Text></Heading>
          
          
         
        </Flex>
        <Box mx="4" p="6" bg="white"  borderRadius={"8px"} boxShadow={"md"} color={"primary.250"}>
          <Heading size={"md"} mb={"6"} color={"primary.250"}>Atualizar do serviço</Heading>
          <VStack spacing="4" align="stretch">
            {/* Primeira Seção: Informações do Serviço */}
            <Box>
              <HStack spacing="4">
                <FormControl mb="4">
                  <FormLabel>Título</FormLabel>
                  <Input
                    value={service.titulo}
                    onChange={(e) => setService({ ...service, titulo: e.target.value })}
                    focusBorderColor="primary.400"
                  />
                </FormControl>

                <FormControl mb="4">
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    value={service.nomeDoServiço}
                    onChange={(e) => setService({ ...service, nomeDoServiço: e.target.value })}
                    focusBorderColor="primary.400"
                  >
                    <option value="Saúde">Saúde</option>
                    <option value="Estética">Estética</option>
                    <option value="Outros">Outros</option>
                  </Select>
                </FormControl>

                <FormControl mb="4">
                  <FormLabel>Preço</FormLabel>
                  <Input
                    value={service.preço}
                    onChange={(e) => setService({ ...service, preço: parseFloat(e.target.value) })}
                    type="number"
                    focusBorderColor="primary.400"
                  />
                </FormControl>

                <FormControl mb="4">
                  <FormLabel>Modelo de Atendimento</FormLabel>
                  <HStack spacing="4">
                    <Checkbox isChecked={service.atendimento.includes("Online")} onChange={() => handleModelChange("Online")} iconColor="primary.300" colorScheme="primary.100" _selected={{ color: "primary.300" }}>Online</Checkbox>
                    <Checkbox isChecked={service.atendimento.includes("Domiciliar")} onChange={() => handleModelChange("Domiciliar")} iconColor="primary.300" colorScheme="primary.100">Domiciliar</Checkbox>
                    <Checkbox isChecked={service.atendimento.includes("Presencial")} onChange={() => handleModelChange("Presencial")} iconColor="primary.300" colorScheme="primary.100">Presencial</Checkbox>
                  </HStack>
                </FormControl>
              </HStack>
            </Box>

            {/* Segunda Seção: Subcategorias */}
            <Box>
              <FormControl mb="4">
                <FormLabel>Subcategorias</FormLabel>
                <Wrap spacing="2">
                  {service.subcategorias.map((subcat, index) => (
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
                        <TagLabel>{`${subcat.title} - R$ ${subcat.price}`}</TagLabel>
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

            {/* Terceira Seção: Vacinas */}
            <Box>
              <FormControl mb="4">
                <FormLabel>Vacinas</FormLabel>
                <Wrap spacing="2">
                  {service.vacinas.map((vacina, index) => (
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
                        <TagLabel>{`${vacina.nameofvaccine} - R$ ${vacina.price}`}</TagLabel>
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
                value={service.descrição}
                onChange={(e) => setService({ ...service, descrição: e.target.value })}
                focusBorderColor="primary.400"
              />
            </FormControl>
            {/* Botão de Salvar */}
            <Box>
            <Flex direction={"row"} justifyContent={"space-between"}>
            <Button
              leftIcon={<ChevronLeftIcon />}
              onClick={() => router.back()}
              color="primary.250"
              // position="relative"
              // bottom="4"
              // left="4"
              backgroundColor={"white"}
              _hover={{ backgroundColor: "primary.100", color: "primary.250" }}
              zIndex="1000"
            >
              Voltar
            </Button>

            <Button
            leftIcon={<CheckIcon/>}
              // position="relative"
              // bottom="4"
              // right="4"
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

          {/* Modal de Subcategoria */}
          <Modal isOpen={isSubcategoryModalOpen} onClose={onCloseSubcategoryModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Adicionar subcategoria</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb="4">
                  <FormLabel>Título</FormLabel>
                  <Input
                    value={newSubcategory.title}
                    onChange={(e) => setNewSubcategory({ ...newSubcategory, title: e.target.value })}
                    focusBorderColor="primary.400"
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Preço</FormLabel>
                  <Input
                    value={newSubcategory.price}
                    onChange={(e) => setNewSubcategory({ ...newSubcategory, price: parseFloat(e.target.value) })}
                    type="number"
                    focusBorderColor="primary.400"
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter  justifyContent="space-between">
                <Button colorScheme="teal" onClick={handleAddSubcategory} mr={3} backgroundColor="primary.500" color="primary.300" _hover={{ backgroundColor: "primary.300", color: "primary.500" }}>
                  Adicionar
                </Button>
                <Button onClick={onCloseSubcategoryModal} backgroundColor={"white"}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Modal de Vacina */}
          <Modal isOpen={isVaccineModalOpen} onClose={onCloseVaccineModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Adicionar Vacina</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb="4">
                  <FormLabel>Nome da Vacina</FormLabel>
                  <Input
                    value={newVaccine.name}
                    onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
                    focusBorderColor="primary.400"
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Preço</FormLabel>
                  <Input
                    value={newVaccine.price}
                    onChange={(e) => setNewVaccine({ ...newVaccine, price: parseFloat(e.target.value) })}
                    type="number"
                    focusBorderColor="primary.400"
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter  justifyContent="space-between">
                <Button colorScheme="teal" onClick={handleAddVaccine} mr={3} backgroundColor="primary.500" color="primary.300" _hover={{ backgroundColor: "primary.300", color: "primary.500" }}>
                  Adicionar
                </Button>
                <Button onClick={onCloseVaccineModal} backgroundColor={"white"}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Flex>
    </>
    
    
  );
};

export default ServiceDetail;
