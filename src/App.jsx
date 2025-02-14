import  { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useStudents } from './hooks/useStudents';
import { useFilters } from './hooks/useFilters.js';
import { AppContainer } from './components/Layout/AppContainer.jsx';
import { ContentWrapper } from './components/Layout/ContentWrapper.jsx';
import { PageHeader } from './components/Header/PageHeader.jsx';
import { FilterSection } from './components/filtersForm/FilterSection.jsx';
import StudentTable from './components/StudentTable/studentsTable.jsx';

const App = () => {
  const { students, loading, error, fetchStudents } = useStudents();
  const { filters, handleFilterChange, handleSearch, handleResetFilters } = useFilters(fetchStudents);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <>
      <AppContainer>
        <PageHeader title="Student Data Table" />
        <ContentWrapper>
          <FilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onReset={handleResetFilters}
          />
          <StudentTable
            students={students}
            loading={loading}
            error={error}
          />
        </ContentWrapper>
      </AppContainer>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;