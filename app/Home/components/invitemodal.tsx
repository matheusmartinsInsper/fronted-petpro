import { Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const InviteModal = ({ isOpen, onClose, onConfirm }: InviteModalProps) => {
  const [email, setEmail] = useState('');
  const toast = useToast(); // Hook do Chakra UI para toasts

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleConfirmInvite = async () => {
    try {
      const token = localStorage.getItem('Authorization'); // Pega o token do localStorage
      if (!token) {
        throw new Error('Token not found');
      }

      // Faça a chamada API com axios
      await axios.post('http://localhost:5206/api/Invitation/Send', null, {
        params: { Email: email },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Após a chamada ser bem-sucedida
      setEmail(''); // Limpa o campo de e-mail
      onConfirm(); // Notifica o pai que o convite foi confirmado
      onClose(); // Fecha o modal

      // Exibir toast de sucesso
      toast({
        title: "Convite enviado.",
        description: `Convite enviado para ${email} com sucesso.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to invite collaborator:', error);

      // Exibir toast de erro
      toast({
        title: "Erro ao enviar convite.",
        description: `Não foi possível enviar o convite para ${email}.`,
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
        <ModalHeader color={"primary.200"}>Convidar Novo Colaborador</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Digite o e-mail do colaborador"
            value={email}
            onChange={handleEmailChange}
            type="email"
            focusBorderColor="primary.400"
          />
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button
            backgroundColor={"primary.300"}
            onClick={handleConfirmInvite}
            color={"primary.100"}
            _hover={{backgroundColor:"primary.300"}}
          >
            Confirmar
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InviteModal;
