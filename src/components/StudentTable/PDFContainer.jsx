import React from 'react';
import PropTypes from 'prop-types';
import StudentResult from './resultTemplate/StudentResult';

export const PDFContainer = React.forwardRef(({ printData, isPrinting }, ref) => {
  if (!isPrinting || !printData) return null;

  return (
    <div
      id="print-container"
      ref={ref}
      style={{
        visibility: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        backgroundColor: 'white',
        zIndex: -1000
      }}
    >
      <StudentResult student={printData} />
    </div>
  );
});
PDFContainer.displayName = 'PDFContainer';

PDFContainer.propTypes = {
  printData: PropTypes.object,
  isPrinting: PropTypes.bool
};
PDFContainer.displayName = 'PDFContainer';