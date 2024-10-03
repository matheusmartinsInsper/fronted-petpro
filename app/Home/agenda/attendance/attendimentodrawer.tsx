import { useState, FC } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
} from '@chakra-ui/react';
import AnexoUploader from './components/AnexoUploades';

interface AtendimentoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AtendimentoDrawer: FC<AtendimentoDrawerProps> = ({ isOpen, onClose }) => {
  // Estados para cada campo da anamnese
  const [nomeAnimal, setNomeAnimal] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');

  const [queixaPrincipal, setQueixaPrincipal] = useState('');
  const [historiaDoencaAtual, setHistoriaDoencaAtual] = useState('');
  const [historicoDoencasPassadas, setHistoricoDoencasPassadas] = useState('');
  const [historicoVacinacao, setHistoricoVacinacao] = useState('');
  const [historicoDesparasitacao, setHistoricoDesparasitacao] = useState('');
  const [usoMedicamentos, setUsoMedicamentos] = useState('');

  const [apetite, setApetite] = useState(false);
  const [comportamento, setComportamento] = useState(false);
  const [temperatura, setTemperatura] = useState(false);
  const [condicaoCorporal, setCondicaoCorporal] = useState(false);
  const [urina, setUrina] = useState(false);
  const [fezes, setFezes] = useState(false);
  const [mucosas, setMucosas] = useState(false);
  const [cavidadeOral, setCavidadeOral] = useState(false);
  const [emeseRegurgitacao, setEmeseRegurgitacao] = useState(false);

  const [observacoesAdicionais, setObservacoesAdicionais] = useState('');

  const handleSave = () => {
    const anamneseData = {
      nomeAnimal,
      especie,
      raca,
      idade,
      sexo,
      queixaPrincipal,
      historiaDoencaAtual,
      historicoDoencasPassadas,
      historicoVacinacao,
      historicoDesparasitacao,
      usoMedicamentos,
      apetite,
      comportamento,
      temperatura,
      condicaoCorporal,
      urina,
      fezes,
      mucosas,
      cavidadeOral,
      emeseRegurgitacao,
      observacoesAdicionais,
    };

    console.log('Dados da Anamnese:', anamneseData);
    // Aqui você pode salvar ou enviar o objeto `anamneseData` conforme necessário
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Finalizar Atendimento</DrawerHeader>

        <DrawerBody>
          <VStack spacing="4" align="stretch">
            {/* Identificação do Paciente */}
            <FormControl mb="4">
              <FormLabel>Nome do Animal</FormLabel>
              <Input
                value={nomeAnimal}
                onChange={(e) => setNomeAnimal(e.target.value)}
                focusBorderColor="primary.400"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Espécie</FormLabel>
              <Input
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                focusBorderColor="primary.400"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Raça</FormLabel>
              <Input
                value={raca}
                onChange={(e) => setRaca(e.target.value)}
                focusBorderColor="primary.400"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Idade</FormLabel>
              <Input
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                focusBorderColor="primary.400"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Sexo</FormLabel>
              <Input
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                focusBorderColor="primary.400"
              />
            </FormControl>

            {/* História Clínica */}
            <FormControl mb="4">
              <FormLabel>Queixa Principal</FormLabel>
              <Textarea
                value={queixaPrincipal}
                onChange={(e) => setQueixaPrincipal(e.target.value)}
                focusBorderColor="primary.400"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>História de Doença Atual</FormLabel>
              <Textarea
                value={historiaDoencaAtual}
                onChange={(e) => setHistoriaDoencaAtual(e.target.value)}
                focusBorderColor="primary.400"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Histórico de Doenças Passadas</FormLabel>
              <Textarea
                value={historicoDoencasPassadas}
                onChange={(e) => setHistoricoDoencasPassadas(e.target.value)}
                focusBorderColor="primary.400"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Histórico de Vacinação</FormLabel>
              <Textarea
                value={historicoVacinacao}
                onChange={(e) => setHistoricoVacinacao(e.target.value)}
                focusBorderColor="primary.400"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Histórico de Desparasitação</FormLabel>
              <Textarea
                value={historicoDesparasitacao}
                onChange={(e) => setHistoricoDesparasitacao(e.target.value)}
                focusBorderColor="primary.400"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Uso de Medicamentos</FormLabel>
              <Textarea
                value={usoMedicamentos}
                onChange={(e) => setUsoMedicamentos(e.target.value)}
                focusBorderColor="primary.400"
              />
            </FormControl>

            {/* Exame Clínico */}
            <FormControl mb="4">
              <FormLabel>Apetite</FormLabel>
              <Checkbox
                isChecked={apetite}
                onChange={(e) => setApetite(e.target.checked)}
              >
                Normal
              </Checkbox>
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Comportamento</FormLabel>
              <Checkbox
                isChecked={comportamento}
                onChange={(e) => setComportamento(e.target.checked)}
              >
                Normal
              </Checkbox>
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Temperatura</FormLabel>
              <Checkbox
                isChecked={temperatura}
                onChange={(e) => setTemperatura(e.target.checked)}
              >
                Normal
              </Checkbox>
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Condição Corporal</FormLabel>
              <Checkbox
                isChecked={condicaoCorporal}
                onChange={(e) => setCondicaoCorporal(e.target.checked)}
              >
                Normal
              </Checkbox>
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Urina</FormLabel>
              <Checkbox
                isChecked={urina}
                onChange={(e) => setUrina(e.target.checked)}
              >
                Normal
              </Checkbox>
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Fezes</FormLabel>
              <Checkbox
                isChecked={fezes}
                onChange={(e) => setFezes(e.target.checked)}
              >
                Normal
              </Checkbox>
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Mucosas</FormLabel>
              <Checkbox
                isChecked={mucosas}
                onChange={(e) => setMucosas(e.target.checked)}
              >
                Normal
              </Checkbox>
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Cavidade Oral</FormLabel>
              <Checkbox
                isChecked={cavidadeOral}
                onChange={(e) => setCavidadeOral(e.target.checked)}
              >
                Normal
              </Checkbox>
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Êmese ou Regurgitação</FormLabel>
              <Checkbox
                isChecked={emeseRegurgitacao}
                onChange={(e) => setEmeseRegurgitacao(e.target.checked)}
              >
                Presente
              </Checkbox>
            </FormControl>

            {/* Observações Adicionais */}
            <FormControl mb="4">
              <FormLabel>Observações Adicionais</FormLabel>
              <Textarea
                value={observacoesAdicionais}
                onChange={(e) => setObservacoesAdicionais(e.target.value)}
                focusBorderColor="primary.400"
              />
            </FormControl>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Voltar
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Salvar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AtendimentoDrawer;
