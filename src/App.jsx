import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StudentView from './features/students/StudentView'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<StudentView />}/>
          <Route path="/classes" element={<StudentView />} />
          <Route path="/teachers" element={<StudentView />} />
          <Route path="/school" element={<StudentView />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
