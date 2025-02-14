import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ApiService from '../../../api/services/api.service';

// PDF configuration constants
const PDF_CONFIG = {
  format: 'a4',
  unit: 'mm',
  orientation: 'p',
  dimensions: {
    width: 210, // A4 width in mm
    pixelWidth: 595, // A4 width in pixels
    pixelHeight: 842 // A4 height in pixels
  }
};

const HTML2CANVAS_CONFIG = {
  scale: 7,
  useCORS: true,
  backgroundColor: '#ffffff',
  logging: import.meta.env.MODE === 'development'
};

export const useStudentPDF = ({ students, onSuccess, onError }) => {
  const [printData, setPrintData] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef(null);

  useEffect(() => {
    const generatePdf = async () => {
      if (!printData || !printRef.current || !isPrinting) return;

      try {
        const pdf = await createPDF(printRef.current, printData.reg_no);
        const filename = generateFilename(printData.reg_no);
        pdf.save(filename);
        onSuccess?.();
      } catch (err) {
        console.error('Error generating PDF:', err);
        onError?.();
      } finally {
        resetPrintState();
      }
    };

    generatePdf();
  }, [printData, isPrinting, onSuccess, onError]);

  const handleDownload = async (id) => {
    try {
      const [response, student] = await Promise.all([
        ApiService.viewResult(id),
        findStudent(students, id)
      ]);
      
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
const createPDF = async (container) => {
  const containerStyles = getContainerStyles();
  Object.assign(container.style, containerStyles);
  
  // Wait for images to load
  await waitForImages(container);

  const canvas = await html2canvas(container, {
    ...HTML2CANVAS_CONFIG,
    windowWidth: PDF_CONFIG.dimensions.pixelWidth,
    windowHeight: PDF_CONFIG.dimensions.pixelHeight,
    onclone: handleClonedDocument
  });

  return generatePDFFromCanvas(canvas);
};

const waitForImages = async (container) => {
  const images = Array.from(container.getElementsByTagName('img'));
  const imagePromises = images.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
  });

  return Promise.all(imagePromises);
};

const generatePDFFromCanvas = (canvas) => {
  const { width, pixelWidth } = PDF_CONFIG.dimensions;
  const imgHeight = (canvas.height * width) / pixelWidth;
  const pdf = new jsPDF(PDF_CONFIG.orientation, PDF_CONFIG.unit, PDF_CONFIG.format);
  
  const imgData = canvas.toDataURL('image/png', 1.0);
  pdf.addImage(imgData, 'PNG', 0, 0, width, imgHeight);
  
  return pdf;
};

const getContainerStyles = () => ({
  visibility: 'visible',
  position: 'fixed',
  top: '0',
  left: '0',
  width: `${PDF_CONFIG.dimensions.pixelWidth}px`,
  height: `${PDF_CONFIG.dimensions.pixelHeight}px`,
  backgroundColor: 'white'
});

const handleClonedDocument = (clonedDoc) => {
  const clonedContainer = clonedDoc.getElementById('print-container');
  if (clonedContainer) {
    clonedContainer.style.visibility = 'visible';
  }
};

const generateFilename = (regNo) => 
  `Student_Result_${regNo || 'Unknown'}_${new Date().toISOString().split('T')[0]}.pdf`;

const findStudent = (students, id) => 
  students.find((s) => s.id === id);

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