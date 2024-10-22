import { getDocuments } from '@/actions/documents/get-documents';
import Container from '../components/ui/Container';
import { DocumentsDataTable } from './components/data-table';
import { columns } from './components/columns';
import ModalDropzone from './components/modal-dropzone';
import type { Documents } from '@prisma/client';

const DocumentsPage = async () => {
  const documents: Documents[] = await getDocuments();

  if (!documents) {
    return <div>Something went wrong</div>;
  }

  return (
    <Container
      title="Documents"
      description={'Everything you need to know about company documents'}
    >
      <div className="flex space-x-5 py-5">
        <ModalDropzone buttonLabel="Upload pdf" fileType="pdfUploader" />
        <ModalDropzone buttonLabel="Upload images" fileType="imageUploader" />
        <ModalDropzone
          buttonLabel="Upload other files"
          fileType="docUploader"
        />
      </div>

      <DocumentsDataTable data={documents} columns={columns} />
    </Container>
  );
};

export default DocumentsPage;
