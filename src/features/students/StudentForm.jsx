import { useState } from "react"
import { useDispatch } from "react-redux"
import { addStudentAsync, updateStudentAsync } from "./studentsSlice"
import Header from "../../components/Header"

const StudentForm = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [age, setAge] = useState()
    const [grade, setGrade] = useState("")
    const [gender, setGender] = useState("")
    const [attendance, setAttendance] = useState()
    const [marks, setMarks] = useState()

    const handleSubmit = () => {
        const newStudent = {
            name, age, gender, marks, attendance, grade
        }

        dispatch(addStudentAsync(newStudent))
        dispatch(updateStudentAsync())
    }

    return (
        <div>
            <Header />
            <main className="py-3">
                <h1 className="mb-3">Add Student</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" id="name" className="form-control" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input type="number" id="age" className="form-control" onChange={(e) => setAge(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="grade" className="form-label">Grade:</label>
                        <input type="text" id="grade" className="form-control" onChange={(e) => setGrade(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender:</label>
                        <div className="form-check form-check-inline">
                            <input type="radio" id="male" value="Male" name="gender" className="form-check-input" onChange={(e) => setGender(e.target.value)} required />
                            <label htmlFor="male" className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" id="female" value="Female" name="gender" className="form-check-input" onChange={(e) => setGender(e.target.value)} required />
                            <label htmlFor="female" className="form-check-label">Female</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" id="other" value="Other" name="gender" className="form-check-input" onChange={(e) => setGender(e.target.value)} required />
                            <label htmlFor="other" className="form-check-label">Other</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </main>
        </div>
    )
}

export default StudentForm