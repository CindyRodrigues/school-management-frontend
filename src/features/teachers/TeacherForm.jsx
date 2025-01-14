import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addTeacherAsync, updateTeacherAsync } from "./teachersSlice"

const TeacherForm = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: location.state?.name || "",
        email: location.state?.email || "",
        phoneNumber: location.state?.phoneNumber || "",
        gender: location.state?.gender || "",
        department: location.state?.department || "",
        qualifications: location.state?.qualifications || ""
    })
    const [successMessage, setSuccessMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "phoneNumber" ? parseInt(value) : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(location.state) {
            const teacherId = location.state?._id
            const updatedTeacher = formData
            dispatch(updateTeacherAsync({ teacherId, updatedTeacher }))
            setSuccessMessage("Teacher updated successfully!")
        } else {
            const newTeacher = formData
            dispatch(addTeacherAsync(newTeacher))
            setSuccessMessage("Teacher added successfully!")
        }

        setTimeout(() => {
            navigate("/teachers")
        }, 1000)
        
        setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            gender: "",
            department: "",
            qualifications: ""
        })
    }

    return (
        <div>
            <main className="container py-3">
                <h1 className="mb-3">{location.state ? "Edit Teacher" : "Add Teacher"}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input id="name" name="name" value={formData.name} type="text" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email ID:</label>
                        <input id="email" name="email" value={formData.email} type="text" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                        <input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} type="number" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="mb-3">Gender:</label>
                        <br />
                        <div className="form-check form-check-inline">
                            <input id="male" name="gender" value="Male" type="radio" className="form-check-input" onChange={handleChange} checked={formData.gender === "Male"} required />
                            <label htmlFor="male" className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input id="female" name="gender" value="Female" type="radio" className="form-check-input" onChange={handleChange} checked={formData.gender === "Female"} required />
                            <label htmlFor="female" className="form-check-label">Female:</label>
                        </div>
                    </div>
                    {location.state && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="department" className="form-label">Department:</label>
                                <input id="department" name="department" value={formData.department} type="text" className="form-control" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="qualifications" className="form-label">Qualifications:</label>
                                <input id="qualifications" name="qualifications" value={formData.qualifications} type="text" className="form-control" onChange={handleChange} />
                            </div>
                        </>
                    )}
                    <button type="submit" className="btn btn-primary mb-3">{location.state ? "Update" : "Add"}</button>
                </form>
                {successMessage && <p>{successMessage}</p>}
            </main>
        </div>
    )
}

export default TeacherForm