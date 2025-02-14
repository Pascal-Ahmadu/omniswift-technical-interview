
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStudentPDF } from './hooks/useStudentPDF';
import { TableSkeleton } from './TableSkeleton';
import { ErrorCard } from './utils/ErrorCard';
import { StudentTableView } from './StudentTableView';
import { PDFContainer } from './PDFContainer';
import { TABLE_HEADERS } from './index';
import PropTypes from 'prop-types';

const StudentTable = ({ students, loading, error }) => {
  const {
    printData,
    isPrinting,
    printRef,
    handleDownload,
    resetPrintState
  } = useStudentPDF({
    students,
    onSuccess: () => toast.success('PDF downloaded successfully!'),
    onError: () => toast.error('Error generating PDF. Please try again.')
  });

  if (loading) {
    return <TableSkeleton />;
  }

  if (error) {
    return <ErrorCard error={error} />;
  }

  return (
    <>
      <StudentTableView 
        students={students}
        headers={TABLE_HEADERS}
        onDownload={handleDownload}
      />

      <PDFContainer
        ref={printRef}
        printData={printData}
        isPrinting={isPrinting}
        onComplete={resetPrintState}
      />
    </>
  );
};
StudentTable.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default StudentTable;
