import { useState, useRef, useEffect, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ApiService from '../../../api/services/api.service';

/**
 * Custom hook to handle PDF generation and download for a student's result.
 *
 * @param {Object} params
 * @param {Array} params.students - List of student objects.
 * @param {Function} [params.onSuccess] - Callback invoked upon successful PDF generation.
 * @param {Function} [params.onError] - Callback invoked when an error occurs.
 * @returns {Object} - Contains printData, isPrinting state, printRef, handleDownload, and resetPrintState.
 */
export const useStudentPDF = ({ students, onSuccess, onError }) => {
  const [printData, setPrintData] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef(null);

  /**
   * Resets the printing state.
   */
  const resetPrintState = useCallback(() => {
    setIsPrinting(false);
    setPrintData(null);
  }, []);

  useEffect(() => {
    /**
     * Generates a PDF from the print container once the print data is set and printing is enabled.
     */
    const generatePdf = async () => {
      if (!printData || !printRef.current || !isPrinting) return;

      try {
        const pdf = await createPDF(printRef.current, printData.reg_no);
        const regNo = printData.reg_no || 'Unknown';
        const formattedDate = new Date().toISOString().split('T')[0];
        pdf.save(`Student_Result_${regNo}_${formattedDate}.pdf`);
        onSuccess?.();
      } catch (err) {
        console.error('Error generating PDF:', err);
        onError?.(err);
      } finally {
        resetPrintState();
      }
    };

    generatePdf();
  }, [printData, isPrinting, onSuccess, onError, resetPrintState]);

  /**
   * Handles the download process for a student result by fetching additional data,
   * merging it with the existing student data, and triggering the PDF generation.
   *
   * @param {string} id - The unique ID of the student.
   */
  const handleDownload = useCallback(
    async (id) => {
      try {
        const response = await ApiService.viewResult(id);
        const student = students.find((s) => s.id === id);
        if (!student) throw new Error('Student not found');

        const combinedData = mergeStudentData(student, response);
        setPrintData(combinedData);
        setIsPrinting(true);
      } catch (err) {
        console.error('Failed to download result:', err);
        onError?.(err);
      }
    },
    [students, onError]
  );

  return {
    printData,
    isPrinting,
    printRef,
    handleDownload,
    resetPrintState
  };
};

// Constants for PDF generation dimensions
const A4_WIDTH_MM = 210;
const A4_WIDTH_PX = 595;
const A4_HEIGHT_PX = 842;

/**
 * Creates a PDF from the specified HTML container.
 *
 * @param {HTMLElement} container - The DOM element to capture.
 * @param {string} regNo - Registration number (used for naming purposes).
 * @returns {Promise<jsPDF>} - The generated PDF object.
 */
const createPDF = async (container, ) => {
  // Configure the container's styling for capture.
  configureContainerForCapture(container);

  // Wait for all images within the container to load
  await waitForImages(container);

  const canvas = await html2canvas(container, {
    scale: 4,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: A4_WIDTH_PX,
    windowHeight: A4_HEIGHT_PX,
    logging: true,
    onclone: (clonedDoc) => {
      const clonedContainer = clonedDoc.getElementById('print-container');
      if (clonedContainer) {
        clonedContainer.style.visibility = 'visible';
      }
    }
  });

  // Calculate dimensions for the PDF image.
  const imgWidth = A4_WIDTH_MM;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Create a new PDF in portrait mode.
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgData = canvas.toDataURL('image/png', 1.0);
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  return pdf;
};

/**
 * Waits until all images within the container have finished loading.
 *
 * @param {HTMLElement} container - The container element containing images.
 * @returns {Promise<void>}
 */
const waitForImages = async (container) => {
  const images = container.querySelectorAll('img');
  const loadPromises = Array.from(images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    });
  });
  await Promise.all(loadPromises);
};

/**
 * Applies necessary styles to the container element before capturing it.
 *
 * @param {HTMLElement} container - The container element to style.
 */
const configureContainerForCapture = (container) => {
  Object.assign(container.style, {
    visibility: 'visible',
    position: 'fixed',
    top: '0',
    left: '0',
    width: `${A4_WIDTH_PX}px`,
    height: `${A4_HEIGHT_PX}px`,
    backgroundColor: 'white'
  });
};

/**
 * Merges the student data with additional data from the API response.
 *
 * @param {Object} student - The student object.
 * @param {Object} apiResponse - The API response object.
 * @returns {Object} - The merged student data.
 */
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
