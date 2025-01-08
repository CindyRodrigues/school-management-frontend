import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { fetchStudents, setFilter, setSortBy } from "../students/studentsSlice"
import { useEffect } from "react"

const ClassView = () => {
    const dispatch = useDispatch()
    const { students, filter, sortBy } = useSelector((state) => state.students)

    useEffect(() => {
        dispatch(fetchStudents())
    }, [])

    const filteredStudents = filter === "All" ? students : students.filter((student) => {
        if(filter === "Boys") {
            return student.gender === "Male"
        }
        if(filter === "Girls") {
            return student.gender === "Female"
        }
    })

    const sortedStudents = [...filteredStudents].sort((a, b) => {
        if(sortBy === "name") {
            return a.name.localeCompare(b.name)
        }
        if(sortBy === "marks") {
            return (b.marks || 0) - (a.marks || 0)
        }
        if(sortBy === "attendance") {
            return (b.attendance || 0) - (a.attendance || 0)
        }
    })

    const handleFilterChange = (e) => {
        dispatch(setFilter(e.target.value))
    }

    const handleSortChange = (e) => {
        dispatch(setSortBy(e.target.value))
    }

    return (
        <div>
            <Header />
            <main className="container py-3">
                <h1 className="mb-3">Class View</h1>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="filterByGender" className="form-label">Filter by Gender:</label>
                        <select id="filterByGender" className="form-select" onChange={handleFilterChange}>
                            <option value="All">All</option>
                            <option value="Boys">Boys</option>
                            <option value="Girls">Girls</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="sortBy" className="form-label">Sort by:</label>
                        <select id="sortBy" className="form-select" onChange={handleSortChange}>
                            <option value="name">Name</option>
                            <option value="marks">Marks</option>
                            <option value="attendance">Attendance</option>
                        </select>
                    </div>
                </div>
                <ul>
                    {sortedStudents.map((student) => (
                        <li key={student._id}>
                            {student.name} - {student.gender} - Marks: {student.marks || "Unknown"} - Attendance: {student.attendance || "Unknown"}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}

export default ClassView