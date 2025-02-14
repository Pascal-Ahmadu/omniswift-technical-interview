import  { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './StudentResult.css';

const StudentResult = ({ student }) => {
  const imageRef = useRef(null);

  // Log student data for debugging
  useEffect(() => {
    console.log('Student Data:', student);
  }, [student]);

  return (
    <div className="student-result">
      {/* Top Section */}
      <div className="student-result-top">
        {/* Logo */}
        <img
          src={student?.logo || '/fce-logo.png'}
          alt="FCE Logo"
          className="student-result-logo"
        />

        {/* Title and Address */}
        <div className="student-result-header">
          <h1 className="student-result-title">FREMONT COLLEGE OF EDUCATION</h1>
          <p className="student-result-address">
            No.5 Raymond Osuman Street, PMB 2191
            <br />
            Maitama, Abuja, Nigeria.
          </p>
          <h2 className="student-result-program">
            Post Graduate Diploma in Education
          </h2>
          <h3 className="student-result-statement">
            Student First Semester Statement Of Result
          </h3>
        </div>

        {/* Student Photo */}
        <div className="student-result-photo-container">
          <img
            ref={imageRef}
            src={student?.profile_picture || '/placeholder.png'}
            alt="Student"
            crossOrigin="anonymous"
            className="student-result-photo"
            onLoad={() => console.log('Image loaded')}
          />
        </div>
      </div>

      {/* Student Details */}
      <div className="student-result-details">
        <div className="student-result-details-left">
          <p className="student-detail">
            <span className="student-detail-label">Name:</span> {student?.surname}{' '}
            {student?.firstname}
          </p>
          <p className="student-detail">
            <span className="student-detail-label">Level:</span> {student?.level}
          </p>
        </div>
        <div className="student-result-details-right">
          <p className="student-detail">
            <span className="student-detail-label">Reg. No.:</span>{' '}
            {student?.reg_no}
          </p>
          <p className="student-detail">
            <span className="student-detail-label">Session:</span>{' '}
            {student?.session}
          </p>
        </div>
      </div>

      {/* Results Table */}
      <table className="student-result-table">
        <thead>
          <tr className="student-result-table-header">
            <th className="student-result-table-header-cell left">S/N</th>
            <th className="student-result-table-header-cell left">Course Code</th>
            <th className="student-result-table-header-cell left">Course Title</th>
            <th className="student-result-table-header-cell center">Unit</th>
            <th className="student-result-table-header-cell center">Grade</th>
            <th className="student-result-table-header-cell center">Total Point</th>
          </tr>
        </thead>
        <tbody>
          {student?.result?.map((course, index) => (
            <tr
              key={index}
              className={`student-result-table-row ${
                index % 2 === 0 ? 'even' : 'odd'
              }`}
            >
              <td className="student-result-table-cell">{index + 1}.</td>
              <td className="student-result-table-cell">{course.coursecode}</td>
              <td className="student-result-table-cell">{course.title}</td>
              <td className="student-result-table-cell center">
                {course.credit_unit}
              </td>
              <td className="student-result-table-cell center">
                {course.grade}
              </td>
              <td className="student-result-table-cell center">
                {course.total_point}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Table */}
      <table className="student-result-summary-table">
        <thead>
          <tr className="student-result-summary-header">
            <th className="student-result-summary-cell">UNTS</th>
            <th className="student-result-summary-cell">UNTD</th>
            <th className="student-result-summary-cell">GPTS</th>
            <th className="student-result-summary-cell">GPTD</th>
            <th className="student-result-summary-cell">GPATS</th>
            <th className="student-result-summary-cell">GPATD</th>
          </tr>
        </thead>
        <tbody>
          <tr className="student-result-summary-row">
            <td className="student-result-summary-cell">
              {student?.cummulative?.unts}
            </td>
            <td className="student-result-summary-cell">
              {student?.cummulative?.untd}
            </td>
            <td className="student-result-summary-cell">
              {student?.cummulative?.gpts}
            </td>
            <td className="student-result-summary-cell">
              {student?.cummulative?.gptd}
            </td>
            <td className="student-result-summary-cell">
              {student?.cummulative?.gpats}
            </td>
            <td className="student-result-summary-cell">
              {student?.cummulative?.gpatd}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Remarks */}
      <p className="student-result-remarks">
        <span className="student-result-remarks-label">Remarks:</span>{' '}
        {student?.cummulative?.remarks || 'Pass'}
      </p>

      {/* Signature */}
      <div className="student-result-signature">
        <div className="student-result-signature-line">
          <p className="student-result-signature-text">Registrar</p>
        </div>
      </div>
    </div>
  );
};

StudentResult.propTypes = {
  student: PropTypes.shape({
    logo: PropTypes.string,
    profile_picture: PropTypes.string,
    surname: PropTypes.string,
    firstname: PropTypes.string,
    level: PropTypes.string,
    reg_no: PropTypes.string,
    session: PropTypes.string,
    result: PropTypes.arrayOf(
      PropTypes.shape({
        coursecode: PropTypes.string,
        title: PropTypes.string,
        credit_unit: PropTypes.number,
        grade: PropTypes.string,
        total_point: PropTypes.number,
      })
    ),
    cummulative: PropTypes.shape({
      unts: PropTypes.number,
      untd: PropTypes.number,
      gpts: PropTypes.number,
      gptd: PropTypes.number,
      gpats: PropTypes.number,
      gpatd: PropTypes.number,
      remarks: PropTypes.string,
    }),
  }),
};

export default StudentResult;
