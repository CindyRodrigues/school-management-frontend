import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StudentView from './features/students/StudentView'
import StudentForm from './features/students/StudentForm'
import StudentDetail from './features/students/StudentDetail'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<StudentView />} />
          <Route path="/students/add" element={<StudentForm />} />
          <Route path="/students/:studentId" element={<StudentDetail />} />
          <Route path="/classes" element={<StudentView />} />
          <Route path="/teachers" element={<StudentView />} />
          <Route path="/school" element={<StudentView />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
