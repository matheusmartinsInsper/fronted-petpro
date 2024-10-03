"use client";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

interface RemoveModalProps {
  isOpen: boolean;
  onClose: () => void;
  collaboratorEmail: string;
  onRemoveSuccess: () => void;
}

const RemoveModal = ({ isOpen, onClose, collaboratorEmail, onRemoveSuccess }: RemoveModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleConfirmRemove = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('Authorization');
      if (!token) throw new Error('Token not found');

      await axios.put(`http://localhost:5206/api/NetWork/Remove?Email=${collaboratorEmail}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Colaborador removido",
        description: `${collaboratorEmail} foi removido com sucesso.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onRemoveSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to remove collaborator:', error);
      toast({
        title: "Erro",
        description: "Falha ao remover o colaborador.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"primary.200"}>Remover Colaborador</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Deseja remover colaborador {collaboratorEmail} da rede?
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button
            backgroundColor={"primary.600"}
            onClick={handleConfirmRemove}
            color={"primary.100"}
            _hover={{ backgroundColor: "primary.600" }}
            isLoading={isLoading}
          >
            Remover
          </Button>
          <Button 
            variant="ghost" 
            boxShadow={"initial"}
            color={"primary.200"} 
            onClick={onClose} 
            border={"1px"} 
            borderColor={"primary.100"}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RemoveModal;
