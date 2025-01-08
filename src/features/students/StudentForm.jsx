import { useState } from "react"
import { useDispatch } from "react-redux"
import { addStudentAsync, updateStudentAsync } from "./studentsSlice"
import { useLocation, useNavigate } from "react-router-dom"
import Header from "../../components/Header"

const StudentForm = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: location.state?.name || "",
        age: location.state?.age || "",
        grade: location.state?.grade || "",
        gender: location.state?.gender || "",
        attendance: location.state?.attendance || "",
        marks: location.state?.marks || ""
    })
    const [successMessage, setSuccessMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "age" || name === "attendance" || name === "marks" ? parseInt(value) : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(location.state) {
            const studentId = location.state?._id
            const updatedStudent = formData
            dispatch(updateStudentAsync({studentId, updatedStudent}))
            setSuccessMessage("Student updated successfully!")
        } else {
            const newStudent = formData
            dispatch(addStudentAsync(newStudent))
            setSuccessMessage("Student added successfully!")
        }

        setTimeout(() => {
            navigate("/")
        }, 1000)

        setFormData({
            name: "",
            age: "",
            grade: "",
            gender: "",
            attendance: "",
            marks: ""
        })
    }

    return (
        <div>
            <Header />
            <main className="container py-3">
                <h1 className="mb-3">{location.state ? "Edit Student" : "Add Student"}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input type="number" id="age" name="age" value={formData.age} className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="grade" className="form-label">Grade:</label>
                        <input type="text" id="grade" name="grade" value={formData.grade} className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender:</label>
                        <br />
                        <div className="form-check form-check-inline">
                            <input type="radio" id="male" value="Male" name="gender" className="form-check-input" onChange={handleChange} checked={formData.gender === "Male"} required />
                            <label htmlFor="male" className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" id="female" value="Female" name="gender" className="form-check-input" onChange={handleChange} checked={formData.gender === "Female"} required />
                            <label htmlFor="female" className="form-check-label">Female</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" id="other" value="Other" name="gender" className="form-check-input" onChange={handleChange} checked={formData.gender === "Other"} required />
                            <label htmlFor="other" className="form-check-label">Other</label>
                        </div>
                    </div>
                    {location.state && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="attendance" className="form-label">Attendance:</label>
                                    <input type="number" id="attendance" name="attendance" value={formData.attendance} className="form-control" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="marks" className="form-label">Marks:</label>
                                <input type="number" id="marks" name="marks" value={formData.marks} className="form-control" onChange={handleChange} />
                            </div>
                        </>
                    )}
                    <button type="submit" className="btn btn-primary mb-3">{location.state ? "Update" : "Add"}</button>
                </form>
                { successMessage && <p>{successMessage}</p> }
            </main>
        </div>
    )
}

export default StudentForm