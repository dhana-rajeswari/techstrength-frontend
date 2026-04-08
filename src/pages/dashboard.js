import { useState ,  useEffect } from "react";
import "./dashboard.css";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import { useNavigate, Routes, Route } from "react-router-dom";
import EmployeeProfile from "./EmployeeProfile";


// ─────────────────────────────────────────────────────
//  ADD POPUP
// ─────────────────────────────────────────────────────
function AddPopup({ onClose, onSave, employee }) {


 const [form, setForm] = useState({
 name: "",
 doj: "",
 role: "Java Developer",
 exp: "",
 email: "",
 mobile: "",
 skills: "",
 proficiency: "",
 projects: [{ name: "", description: "" }]
});
useEffect(() => {
  if (employee) {
    setForm({
      name: employee.name || "",
      doj: employee.joined || "",
      role: employee.dept || "Java Developer",
      exp: employee.exp || "",
      projects: employee.projectsList || [{ name:"", description:"" }],
      email: employee.email || "",
      skills: Array.isArray(employee.skills)
  ? employee.skills.join(", ")
  : employee.skills || "",

proficiency: Array.isArray(employee.proficiency)
  ? employee.proficiency.join(", ")
  : employee.proficiency || ""
    });
  }
}, [employee]);

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const skillsArray = form.skills.split(",").map(s => s.trim());

    const profArray = form.proficiency
      .split(",")
      .map(p => Number(p.trim()));

    const bars = skillsArray.map((skill, i) => [
      skill,
      profArray[i] || 70
    ]);

    const employeeData = {
      ...form,
      skills: skillsArray,
      bars: bars,
      id: employee?.id
    };

 // decide API URL
const url = employee
  ? `${process.env.REACT_APP_API_URL}/updateEmployee.php`
  : `${process.env.REACT_APP_API_URL}/addEmployee.php`;

try {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(employeeData)
  });

  // check if request failed
  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();

  console.log("API response:", data);

} catch (error) {
  console.error("Save error:", error);
}

if (!data || !data.id) {
  console.error("Employee save failed", data);
  return;
}

const newEmployee = {
  id: data.id,
  initials: form.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase(),

  name: form.name,
  empId: String(data.id).slice(-5),
  joined: form.doj,
  dept: form.role,
  exp: form.exp,
  projectsList: form.projects,
  skills: skillsArray,
  bars: bars,
  email: form.email,
  mobile: form.mobile
};

onSave(newEmployee);
onClose();

  return (
    <form onSubmit={handleSubmit}>
    <div className="modal-overlay">
      <div className="form-modal">

        <div className="modal-header">
          <h3 className="modal-title">Add New Employee</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

<div className="form-grid">

{/* Full Name */}
<div className="form-group">
  <label className="form-label">Full Name</label>
  <input
    className="form-input"
    name="name"
    required
    onChange={handleChange}
   value={form.name || ""}
    placeholder="e.g. John Smith"
  />
</div>

{/* Date of Joining */}
<div className="form-group">
  <label className="form-label">Date of Joining</label>
  <input
    className="form-input"
    type="date"
    name="doj"
    required
    value={form.doj || ""}
    onChange={handleChange}
  />
</div>

{/* Role */}
<div className="form-group">
  <label className="form-label">Role</label>
  <select
    className="form-select"
    name="role"
    required
     value={form.role || ""}
    onChange={handleChange}
  >
    <option value="">Select Role</option>
    <option>Java Developer</option>
    <option>Frontend Developer</option>
    <option>Full Stack Developer</option>
    <option>DevOps Engineer</option>
    <option>Data Engineer</option>
    <option>QA Engineer</option>
  </select>
</div>

{/* Experience */}
<div className="form-group">
  <label className="form-label">Experience (Years)</label>
  <input
    className="form-input"
    type="number"
    name="exp"
    required
    min="0"
    step="0.1"
  value={form.exp || ""}
    onChange={handleChange}
    placeholder="e.g. 3.5"
  />
</div>

{/* Email */}
<div className="form-group">
  <label className="form-label">Company Email</label>

<input
  className="form-input"
  type="email"
  name="email"
  required
  pattern=".+@sysintelli.com"
  placeholder="name@sysintelli.com"
  value={form.email || ""}
  onChange={handleChange}
/>
</div>

{/* Mobile */}
<div className="form-group">
  <label className="form-label">Mobile</label>

  <input
    className="form-input"
    type="tel"
    name="mobile"
    required
    maxLength="10"
    pattern="[0-9]{10}"
  value={form.mobile || ""}
    onChange={(e)=>{
      const val = e.target.value.replace(/\D/g,"").slice(0,10);
      setForm({...form,mobile:val})
    }}
    placeholder="9876543210"
  />
</div>

{/* Projects */}
<div className="form-group full">

<label className="form-label">Projects</label>

{form.projects.map((proj, index) => (

<div className="project-block" key={index}>

<input
className="form-input"
placeholder="Project Name"
required
value={proj.name || ""}
onChange={(e)=>{
const updated=[...form.projects]
updated[index].name=e.target.value
setForm({...form,projects:updated})
}}
/>

<textarea
className="form-textarea"
placeholder="Project Description"
required
value={proj.description || ""}
onChange={(e)=>{
const updated=[...form.projects]
updated[index].description=e.target.value
setForm({...form,projects:updated})
}}
/>

{form.projects.length>1 &&(
<button
type="button"
className="btn-delete-project"
onClick={()=>{
const updated=form.projects.filter((_,i)=>i!==index)
setForm({...form,projects:updated})
}}
>
Delete Project
</button>
)}

</div>

))}

<button
type="button"
className="btn-add-project"
onClick={()=>{
setForm({
...form,
projects:[...form.projects,{name:"",description:""}]
})
}}
>
+ Add Project
</button>

</div>

{/* Tech Skills */}
<div className="form-group full">
<label className="form-label">
Tech Skills (comma-separated)
</label>

<textarea
className="form-textarea"
rows={3}
name="skills"
required
value={form.skills || ""}
onChange={handleChange}
placeholder="Java, Spring Boot, REST APIs"
/>
</div>

{/* Proficiency */}
<div className="form-group full">
<label className="form-label">
Proficiency % (comma-separated)
</label>

<textarea
  className="form-textarea"
  rows={2}
  name="proficiency"
  required
 value={form.proficiency || ""}
  onChange={(e) => {
    const values = e.target.value.split(",").map(v => {
      let num = parseInt(v.trim());
      if (isNaN(num)) return "";
      if (num > 100) num = 100;
      if (num < 0) num = 0;
      return num;
    });

    setForm({ ...form, proficiency: values.join(",") });
  }}
  placeholder="100, 93, 86"
/>
</div>

<div className="modal-footer-btns">

<button
type="button"
className="btn-cancel"
onClick={onClose}
>
Cancel
</button>

<button
type="submit"
className="btn-save"
>
{employee ? "Update Employee" : "Save Employee"}
</button>

</div>

</div>
    </div>
    </div>
    </form>
  );
}
// ─────────────────────────────────────────────────────
//  VIEW POPUP
// ─────────────────────────────────────────────────────
function ViewPopup({ onClose, employee  }) {
  const [tab, setTab] = useState("overview");

  return (
    <div className="modal-overlay">
      <div className="view-modal">
        {/* Header */}
       <div
  className="view-modal-header"
  style={{
    background: "linear-gradient(120deg, #1a3a5c 0%, #1e6fc5 100%)",
  }}
>
  <div className="view-modal-info">

    <div className="view-modal-avatar">
      {employee?.initials}
    </div>

    <div>

      <div className="view-modal-name">
        {employee?.name}
      </div>

      <div className="view-modal-dept">
        {employee?.dept}
      </div>

      <div className="view-modal-badges">

        <span className="view-modal-badge">
          {employee?.empId}
        </span>

        <span className="view-modal-badge">
          Joined {employee?.joined}
        </span>

        <span className="view-modal-badge">
          {employee?.exp} yrs exp
        </span>

      </div>

    </div>

  </div>

  <button
    className="view-modal-close-btn"
    onClick={onClose}
  >
    ✕
  </button>

</div>

        {/* Tabs */}
        <div className="view-tabs">
          <button
            className={`view-tab ${tab === "overview" ? "active" : ""}`}
            onClick={() => setTab("overview")}
          >
            👤 Overview
          </button>
          <button
            className={`view-tab ${tab === "skills" ? "active" : ""}`}
            onClick={() => setTab("skills")}
          >
            🛠 Skills (13)
          </button>
          <button
            className={`view-tab ${tab === "projects" ? "active" : ""}`}
            onClick={() => setTab("projects")}
          >
            📁 Projects (3)
          </button>
        </div>

        <div className="view-tab-body">
          {/* OVERVIEW */}
          {tab === "overview" && (
            <>
              <div className="kpi-row">
                <div className="kpi-card">
                  <span className="kpi-icon">⏱</span>
                  <div>
                    <div className="kpi-val">{employee?.exp}</div>
                    <div className="kpi-label">Experience (Yrs)</div>
                  </div>
                </div>
                <div className="kpi-card">
                  <span className="kpi-icon">🛠</span>
                  <div>
                    <div className="kpi-val">{employee?.skills?.length || 0}</div>
                    <div className="kpi-label">Total Skills</div>
                  </div>
                </div>
                <div className="kpi-card">
                  <span className="kpi-icon">📁</span>
                  <div>
<div className="kpi-val">{employee?.projectsList?.length || 0}</div>
                    <div className="kpi-label">Projects Done</div>
                  </div>
                </div>
              </div>
              <div className="info-box">
                <div className="info-box-title">Contact & Details</div>
                <div className="info-grid">
                  <div>
                    <div className="info-field-label">Employee ID</div>
                    <div className="info-field-value">{employee?.empId}</div>
                  </div>
                  <div>
                    <div className="info-field-label">Department</div>
                    <div className="info-field-value">{employee?.dept}</div>
                  </div>
                  <div>
                    <div className="info-field-label">Date of Joining</div>
                 <div className="info-field-value">{employee?.joined}</div>
                  </div>
                  <div>
                    <div className="info-field-label">Years of Experience</div>
                    <div className="info-field-value">{employee?.exp} Years</div>
                  </div>
                  <div>
                    <div className="info-field-label">Mobile</div>
                    <div className="info-field-value">{employee?.mobile}</div>
                  </div>
                  <div>
                    <div className="info-field-label">Email</div>
                   <div className="info-field-value">
  {employee?.email}
</div>
                  </div>
                </div>
              </div>
             
              <div className="vm-section-label">Top Skills</div>

<div className="vm-skill-pills">

  {employee?.skills?.length > 0 ? (
    employee.skills.map((skill) => (
      <span key={skill} className="vm-skill-pill">
        {skill}
      </span>
    ))
  ) : (
    <span>No skills added</span>
  )}

</div>
            </>
          )}

          {/* SKILLS */}
         {tab === "skills" && (
  <>
    <div className="vm-section-label">
      All Skills · {employee?.skills?.length || 0} total
    </div>

    <div className="vm-skill-pills">
      {employee?.skills?.map((skill) => (
        <span key={skill} className="vm-skill-pill">
          {skill}
        </span>
      ))}
    </div>

    <div className="info-box">
      <div className="info-box-title">Proficiency Overview</div>

      {employee?.bars?.map(([skill, percent]) => (
        <div className="skill-bar-row" key={skill}>
          
          <div className="skill-bar-header">
            <span className="skill-bar-label">{skill}</span>
            <span className="skill-bar-pct">{percent}%</span>
          </div>

          <div className="skill-bar-track">
            <div
              className="skill-bar-fill"
              style={{ width: `${percent}%` }}
            />
          </div>

        </div>
      ))}

    </div>
  </>
)}

          {/* PROJECTS */}
          {/* PROJECTS */}
{tab === "projects" && (
  <>
    {employee?.projectsList?.map((project, index) => (
      <div className="project-card" key={index}>

        <div className="project-card-header">
          <div className="project-number">{index + 1}</div>

          <div className="project-title">
            {project.name}
          </div>
        </div>

        <ul className="project-points">
          <li>{project.description}</li>
        </ul>

      </div>
    ))}
  </>
)}

        </div>

        <div className="view-modal-footer">
          <span className="view-modal-footer-copy">
            © 2025 SysIntelli | TechStrength
          </span>
          <div className="view-modal-footer-btns">
            <button className="btn-close-modal" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



// ─────────────────────────────────────────────────────
//  EMPLOYEE CARD  (reusable static component)
// ─────────────────────────────────────────────────────
function EmpCard({
  initials,
  name,
  empId,
  joined,
  dept,
  exp,
  projects,
  skills,
  bars,
  email,
  onView,
  onEdit,
  onDelete,
   onOpenProfile
})  {
  return (
    <div className="emp-card" onClick={() => onOpenProfile()}>
      <div className="card-header">
        <div className="card-header-top">
          <div className="card-avatar">{initials}</div>
          <div>
            <div className="card-name">{name}</div>
            <div className="card-id">
              {empId} · {joined?.split("T")[0]}
            </div>
          </div>
        </div>
        <div className="card-actions">

  <FiEye
  className="card-action-icon"
  onClick={(e) => {
    e.stopPropagation();
    onView();
  }}
/>

<FiEdit
  className="card-action-icon"
  onClick={(e) => {
    e.stopPropagation();
    onEdit();
  }}
/>

<FiTrash
  className="card-action-icon"
  onClick={(e) => {
    e.stopPropagation();
    onDelete();
  }}
/>

</div>
        <div className="card-meta">
          <span className="dept-badge">{dept}</span>
          <span className="card-meta-item">📅 {exp} yrs</span>
          {projects > 0 && (
            <span className="card-meta-item">
              📁 {projects} project{projects > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      <div className="card-body">
        <div className="card-section-label">Tech Skills</div>
        <div className="card-skill-pills">
          {skills.map((s) => (
            <span key={s} className="card-skill-pill">
              {s}
            </span>
          ))}
          {bars.length > skills.length && (
            <span className="pill-more">
              +{bars.length - skills.length} more
            </span>
          )}
        </div>

        <div className="card-section-label">Proficiency</div>
        <div className="card-skill-bars">
          {bars.slice(0, 5).map(([s, p]) => (
            <div className="card-bar-row" key={s}>
              <div className="card-bar-label-row">
                <span className="card-bar-name">{s}</span>
                <span className="card-bar-pct">{p}%</span>
              </div>
              <div className="card-bar-track">
                <div className="card-bar-fill" style={{ width: `${p}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <span className="card-footer-email">📧 {email}</span>
        <span className="card-exp-badge">{exp} yrs</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────────────────
export default function App() {

  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
const [showEdit, setShowEdit] = useState(false);
const [search, setSearch] = useState("");
const navigate = useNavigate();
const [department, setDepartment] = useState("All Departments");

  // Employees State
  const [employees, setEmployees] = useState([]);

  // Add employee function
  const addEmployee = (emp) => {
    setEmployees([...employees, emp]);
  };
  const viewEmployee = (emp) => {
  setSelectedEmployee(emp);
  setShowView(true);
};

const editEmployee = (emp) => {
  setSelectedEmployee(emp);
  setShowEdit(true);
};


const deleteEmployee = async (id) => {

  try {

   await fetch(`${process.env.REACT_APP_API_URL}/deleteEmployee.php?id=${id}`)

    setEmployees(prev =>
      prev.filter(emp => emp.id !== id)
    );

  } catch (error) {
    console.error("Delete failed:", error);
  }

};

const updateEmployee = async (updatedEmployee) => {

  const res = await fetch(
    "https://yourapi.com/tech-api/updateEmployee.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedEmployee)
    }
  );

  await res.json();

  setEmployees(prev =>
    prev.map(emp =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    )
  );

  setShowEdit(false);
};
useEffect(() => {
  const loadEmployees = async () => {
    try {
         const res = await fetch(`${process.env.REACT_APP_API_URL}/getEmployees.php`)

      if (!res.ok) {
        throw new Error("Server not responding");
      }

      const data = await res.json();

      const normalized = data.map(emp => ({
        ...emp,
        empId: emp.empId || emp.id?.slice(-5),
        joined: emp.joined || emp.doj,
        dept: emp.dept || emp.role,
        skills: Array.isArray(emp.skills) ? emp.skills : [],
        bars: emp.bars || []
      }));

      setEmployees(normalized);

    } catch (error) {
      console.log("Backend not running. UI still works.");
      setEmployees([]);
    }
  };

  loadEmployees();
}, []);

  return (
<Routes>
<Route path="/*" element={
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span>◈</span> TechStrength
        </div>

        <div className="navbar-right">
          <span className="navbar-bell">🔔</span>

          <div className="navbar-user">
            <div className="navbar-avatar">👤</div>

            <div className="navbar-user-info">
              <div className="label">Logged in as</div>
              <div className="name">Admin</div>
            </div>

          </div>
        </div>
      </nav>


      <div className="page-body">

        {/* Hero */}
        <div className="hero">
          <div>
            <div className="hero-title">Good Morning, Admin!</div>
            <div className="hero-sub">
              Employee Tech Strength Registry
            </div>
          </div>

          <div className="hero-quote">
            "It does not matter how slowly you go as long as you do not stop."
          </div>
        </div>


        <div className="content">

          {/* Section Header */}
          <div className="section-header">

            <div className="section-title">
              Employee Tech Strength
            </div>

            <div className="section-controls">

              <div className="select-wrapper">
                <select
                   value={department}
                onChange={(e) => setDepartment(e.target.value)}
                > 
                  <option>All Departments</option>
                  <option>Java Developer</option>
                  <option>Frontend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>DevOps Engineer</option>
                  <option>Data Engineer</option>
                  <option>QA Engineer</option>
                </select>
                <span className="select-arrow">▼</span>
              </div>

              <div className="search-wrapper">
                <input
                      placeholder="Search employee..."
                       value={search}
                        onChange={(e) => setSearch(e.target.value)}
                       />
                <span className="search-icon">🔍</span>
              </div>

              <button
                className="btn-add"
                onClick={() => setShowAdd(true)}
              >
                + Add Employee
              </button>

            </div>
          </div>


          {/* Dynamic Card Grid */}
        
<div className="card-grid">

{
(() => {

  const filteredEmployees = employees.filter(emp => {

    const searchText = search.trim().toLowerCase();

    const name = emp.name?.toLowerCase() || "";
    const empId = emp.empId?.toLowerCase() || "";
    const role = emp.dept?.toLowerCase() || "";

    const matchesSearch =
      name.includes(searchText) ||
      empId.includes(searchText);

    const matchesDepartment =
      department === "All Departments" ||
      role === department.toLowerCase();

    return matchesSearch && matchesDepartment;

  });

  if (filteredEmployees.length === 0) {
    return (
      <div className="no-data">
        No employees found
      </div>
    );
  }

  return filteredEmployees.map((emp, index) => {

    const skillsArray = Array.isArray(emp.skills)
      ? emp.skills
      : emp.skills
        ? emp.skills.split(",")
        : [];

    const bars = emp.bars
      ? emp.bars
      : skillsArray.map(skill => [skill.trim(), 70]);

    return (
      <EmpCard
        key={emp.id}

        initials={emp.initials || emp.name?.substring(0,2).toUpperCase()}
        name={emp.name}
        empId={emp.empId || emp.id?.slice(-5)}
        joined={emp.joined || emp.doj}
        dept={emp.dept || emp.role}
        exp={emp.exp}
        projects={emp.projectsList?.length || 0}
        skills={skillsArray}
        bars={bars}
        email={emp.email}
        mobile={emp.mobile}

        onOpenProfile={() => navigate(`/employee/${emp.id}`)}
        onView={() => viewEmployee(emp)}
        onEdit={() => editEmployee(emp)}
        onDelete={() => deleteEmployee(emp.id)}
      />
    );

  });

})()
}
</div>


          <div className="grid-footer">
            © 2025 SysIntelli | TechStrength – V2.0 · Showing {employees.length} employees
          </div>

        </div>

      </div>
      


      {/* Popups */}
      {showEdit && (
  <AddPopup
    employee={selectedEmployee}
    onClose={() => setShowEdit(false)}
    onSave={updateEmployee}
  />
)}
      {showAdd && (
        <AddPopup
          onClose={() => setShowAdd(false)}
          onSave={addEmployee}
        />
      )}
         





      

      {showView && (
        <ViewPopup
  employee={selectedEmployee}
  onClose={() => setShowView(false)}
/>
      )}

    </div>
} />

<Route path="/employee/:id" element={<EmployeeProfile />} />

</Routes>

);
}