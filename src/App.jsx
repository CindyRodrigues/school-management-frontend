import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StudentView from './features/students/StudentView'
import StudentForm from './features/students/StudentForm'
import StudentDetail from './features/students/StudentDetail'
import ClassView from './features/classes/ClassView'
import SchoolView from './features/school/SchoolView'
import TeacherView from './features/teachers/TeacherView'
import TeacherForm from './features/teachers/TeacherForm'
import TeacherDetail from './features/teachers/TeacherDetail'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<StudentView />} />
          <Route path="/students/add" element={<StudentForm />} />
          <Route path="/students/:studentId" element={<StudentDetail />} />
          <Route path="/classes" element={<ClassView />} />
          <Route path="/teachers" element={<TeacherView />} />
          <Route path="/teachers/add" element={<TeacherForm />} />
          <Route path="/teachers/:teacherId" element={<TeacherDetail />} />
          <Route path="/school" element={<SchoolView />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
