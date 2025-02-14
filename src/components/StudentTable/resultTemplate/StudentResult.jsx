import React, { useEffect, useRef } from 'react';

const StudentResult = ({ student }) => {
  const imageRef = useRef(null);

  // Log student data for debugging
  useEffect(() => {
    console.log('Student Data:', student);
  }, [student]);

  return (
    <div
      style={{
        width: '595px',
        height: '842px',
        backgroundColor: 'white',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
        position: 'relative'
      }}
    >
      {/* Top Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '100px auto 100px',
          gap: '16px',
          marginBottom: '24px',
          alignItems: 'center'
        }}
      >
        {/* Logo */}
        <img
          src={student?.logo || '/fce-logo.png'}
          alt="FCE Logo"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'contain',
            alignSelf: 'start' // pushes logo to the top of its grid cell
          }}
        />

        {/* Title and Address */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#4F4F4F',
              marginBottom: '8px'
            }}
          >
            FREMONT COLLEGE OF EDUCATION
          </h1>
          <p style={{ fontSize: '12px', color: '#4F4F4F', marginBottom: '16px' }}>
            No.5 Raymond Osuman Street, PMB 2191
            <br />
            Maitama, Abuja, Nigeria.
          </p>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#333333',
              marginBottom: '8px'
            }}
          >
            Post Graduate Diploma in Education
          </h2>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#333333' }}>
            Student First Semester Statement Of Result
          </h3>
        </div>

        {/* Student Photo */}
        <div
          style={{
            width: '100px',
            height: '100px',
            border: '1px solid #D1D5DB',
            alignSelf: 'start' // pushes photo container to the top
          }}
        >
          <img
            ref={imageRef}
            src={student?.profile_picture || '/placeholder.png'}
            alt="Student"
            crossOrigin="anonymous"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onLoad={() => console.log('Image loaded')}
          />
        </div>
      </div>

      {/* Student Details */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '32px',
          borderBottom: '1px solid #D1D5DB',
          paddingBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '12px' }}>
            <span style={{ fontWeight: 'bold' }}>Name:</span> {student?.surname}{' '}
            {student?.firstname}
          </p>
          <p style={{ fontSize: '12px' }}>
            <span style={{ fontWeight: 'bold' }}>Level:</span> {student?.level}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '12px' }}>
            <span style={{ fontWeight: 'bold' }}>Reg. No.:</span> {student?.reg_no}
          </p>
          <p style={{ fontSize: '12px' }}>
            <span style={{ fontWeight: 'bold' }}>Session:</span> {student?.session}
          </p>
        </div>
      </div>

      {/* Results Table */}
      <table
        style={{
          width: '100%',
          marginBottom: '32px',
          borderCollapse: 'collapse'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#0D7590', color: 'white' }}>
            <th
              style={{
                textAlign: 'left',
                padding: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              S/N
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              Course Code
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              Course Title
            </th>
            <th
              style={{
                textAlign: 'center',
                padding: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              Unit
            </th>
            <th
              style={{
                textAlign: 'center',
                padding: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              Grade
            </th>
            <th
              style={{
                textAlign: 'center',
                padding: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              Total Point
            </th>
          </tr>
        </thead>
        <tbody>
          {student?.result?.map((course, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? '#F2F2F2' : 'white'
              }}
            >
              <td
                style={{
                  padding: '8px',
                  fontSize: '12px',
                  color: '#4F4F4F'
                }}
              >
                {index + 1}.
              </td>
              <td
                style={{
                  padding: '8px',
                  fontSize: '12px',
                  color: '#4F4F4F'
                }}
              >
                {course.coursecode}
              </td>
              <td
                style={{
                  padding: '8px',
                  fontSize: '12px',
                  color: '#4F4F4F'
                }}
              >
                {course.title}
              </td>
              <td
                style={{
                  padding: '8px',
                  fontSize: '12px',
                  color: '#4F4F4F',
                  textAlign: 'center'
                }}
              >
                {course.credit_unit}
              </td>
              <td
                style={{
                  padding: '8px',
                  fontSize: '12px',
                  color: '#4F4F4F',
                  textAlign: 'center'
                }}
              >
                {course.grade}
              </td>
              <td
                style={{
                  padding: '8px',
                  fontSize: '12px',
                  color: '#4F4F4F',
                  textAlign: 'center'
                }}
              >
                {course.total_point}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Table */}
      <table
        style={{
          width: '100%',
          marginBottom: '32px',
          borderCollapse: 'collapse'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#0D7590', color: 'white' }}>
            <th
              style={{
                padding: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              UNTS
            </th>
            <th
              style={{
                padding: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              UNTD
            </th>
            <th
              style={{
                padding: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              GPTS
            </th>
            <th
              style={{
                padding: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              GPTD
            </th>
            <th
              style={{
                padding: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              GPATS
            </th>
            <th
              style={{
                padding: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              GPATD
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: '#F2F2F2' }}>
            <td
              style={{
                padding: '8px',
                fontSize: '12px',
                color: '#4F4F4F',
                textAlign: 'center'
              }}
            >
              {student?.cummulative?.unts}
            </td>
            <td
              style={{
                padding: '8px',
                fontSize: '12px',
                color: '#4F4F4F',
                textAlign: 'center'
              }}
            >
              {student?.cummulative?.untd}
            </td>
            <td
              style={{
                padding: '8px',
                fontSize: '12px',
                color: '#4F4F4F',
                textAlign: 'center'
              }}
            >
              {student?.cummulative?.gpts}
            </td>
            <td
              style={{
                padding: '8px',
                fontSize: '12px',
                color: '#4F4F4F',
                textAlign: 'center'
              }}
            >
              {student?.cummulative?.gptd}
            </td>
            <td
              style={{
                padding: '8px',
                fontSize: '12px',
                color: '#4F4F4F',
                textAlign: 'center'
              }}
            >
              {student?.cummulative?.gpats}
            </td>
            <td
              style={{
                padding: '8px',
                fontSize: '12px',
                color: '#4F4F4F',
                textAlign: 'center'
              }}
            >
              {student?.cummulative?.gpatd}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Remarks */}
      <p style={{ fontSize: '12px', fontWeight: '500', marginBottom: '32px' }}>
        <span style={{ fontWeight: 'bold' }}>Remarks:</span>{' '}
        {student?.cummulative?.remarks || 'Pass'}
      </p>

      {/* Signature */}
      <div style={{ position: 'absolute', bottom: '32px', left: '24px' }}>
        <div style={{ width: '163px', borderTop: '1px solid black', paddingTop: '8px' }}>
          <p style={{ fontSize: '12px', color: '#333333' }}>Registrar</p>
        </div>
      </div>
    </div>
  );
};

export default StudentResult;
