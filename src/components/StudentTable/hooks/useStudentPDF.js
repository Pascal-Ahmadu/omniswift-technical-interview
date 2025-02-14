import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ApiService from '../../../api/services/api.service';

export const useStudentPDF = ({ students, onSuccess, onError }) => {
  const [printData, setPrintData] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef(null);

  useEffect(() => {
    const generatePdf = async () => {
      if (!printData || !printRef.current || !isPrinting) return;

      try {
        const pdf = await createPDF(printRef.current, printData.reg_no);
        pdf.save(`Student_Result_${printData.reg_no || 'Unknown'}_${new Date().toISOString().split('T')[0]}.pdf`);
        onSuccess?.();
        resetPrintState();
      } catch (err) {
        console.error('Error generating PDF:', err);
        onError?.();
        resetPrintState();
      }
    };

    generatePdf();
  }, [printData, isPrinting, onSuccess, onError]);

  const handleDownload = async (id) => {
    try {
      // Use the viewResult method from the default ApiService instance
      const response = await ApiService.viewResult(id);
      const student = students.find((s) => s.id === id);
      
      if (!student) throw new Error('Student not found');
      
      const combinedData = mergeStudentData(student, response);
      setPrintData(combinedData);
      setIsPrinting(true);
    } catch (err) {
      console.error('Failed to download result:', err);
      onError?.();
    }
  };
  const resetPrintState = () => {
    setIsPrinting(false);
    setPrintData(null);
  };

  return {
    printData,
    isPrinting,
    printRef,
    handleDownload,
    resetPrintState
  };
};

// Helper functions
const createPDF = async (container, reg_no) => {
  // Set container styles for capture
  configureContainerForCapture(container);
  
  // Allow time for assets to load
  await new Promise(resolve => setTimeout(resolve, 500));

  const canvas = await html2canvas(container, {
    scale: 7,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: 595, // A4 width in pixels
    windowHeight: 842, // A4 height in pixels
    logging: true,
    onclone: (clonedDoc) => {
      const clonedContainer = clonedDoc.getElementById('print-container');
      if (clonedContainer) {
        clonedContainer.style.visibility = 'visible';
      }
    }
  });

  // Create PDF
  const imgWidth = 210; // A4 width in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgData = canvas.toDataURL('image/png', 1.0);
  
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  return pdf;
};

const configureContainerForCapture = (container) => {
  Object.assign(container.style, {
    visibility: 'visible',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '595px',
    height: '842px',
    backgroundColor: 'white'
  });
};

const mergeStudentData = (student, apiResponse) => {
  const {
    data: apiData = {},
    logo: apiLogo = "",
    profile_picture: apiProfilePicture = "",
    message: apiMessage = ""
  } = apiResponse;

  return {
    ...student,
    result: apiData.result || student.result || [],
    cummulative: {
      unts: 0,
      untd: 0,
      gpts: 0,
      gptd: 0,
      gpats: 0,
      gpatd: 0,
      remarks: '',
      ...apiData.cummulative
    },
    logo: apiLogo.trim() || student.logo,
    profile_picture: apiProfilePicture.trim() || student.profile_picture,
    message: apiMessage || student.message,
    reg_no: apiData.reg_no || student.reg_no,
    session: apiData.session || student.session,
  };
};