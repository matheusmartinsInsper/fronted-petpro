import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import './styles/filepond.css'; // Importando o CSS personalizado
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { Box, Text, Link } from '@chakra-ui/react';

// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

interface AnexoUploaderProps {
  onFilesUpdate: (files: any[]) => void;
}

const AnexoUploader: React.FC<AnexoUploaderProps> = ({ onFilesUpdate }) => {
  const [files, setFiles] = useState<any[]>([]);
  

  const handleUpdateFiles = (updatedFiles: any[]) => {
    setFiles(updatedFiles);
    onFilesUpdate(updatedFiles); // Chama a função passada pelo pai
  };

  return (
    <Box  backgroundColor="white" p={4} borderRadius="md" justifyContent={"center"} alignContent={"center"} boxShadow={"md"} border={"1px"} borderColor={"primary.100"}>
      <FilePond
        files={files}
        allowMultiple={true}
        onupdatefiles={handleUpdateFiles}
        acceptedFileTypes={['image/*', 'application/pdf']}
        labelIdle='Arraste e solte seus arquivos ou <span class="filepond--label-action" color:"red">Browse</span>'
      />
      <Box mt={4}>
        {files.map((fileItem) => (
          <Box key={fileItem.id} mb={2} width={"20%"}>
            <Text color="primary.200" mb={"2"}>{fileItem.file.name}</Text>
            <Link fontWeight={"bold"} fontSize={"sm"} href={URL.createObjectURL(fileItem.file)} target="_blank" color="primary.300" backgroundColor={"primary.500"} p={2} borderRadius={"md"} mt={"10px"} textDecor={"none"}>
              Visualizar
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AnexoUploader;
