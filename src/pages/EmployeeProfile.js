import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EmployeeProfile.css";
import { FiX } from "react-icons/fi";

export default function EmployeeProfile() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [openProject, setOpenProject] = useState(null);

  const [params] = useSearchParams();
  const isPublicView = params.get("view") === "public";

  useEffect(() => {

    // ✅ Changed API URL
    fetch(`http://localhost/tech-api/employee.php?id=${id}`)
      .then(res => res.json())
      .then(data => setEmployee(data))
      .catch(err => console.log(err));

  }, [id]);

  const toggleProject = (index) => {

    if(openProject === index){
      setOpenProject(null);
    }else{
      setOpenProject(index);
    }

  };

  const shareProfile = () => {

    const baseUrl = window.location.origin;

    // ✅ use id instead of _id
    const url = `${baseUrl}/employee/${employee.id}?view=public`;

    if (navigator.share) {
      navigator.share({
        title: "Employee Resume",
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Resume link copied!");
    }

  };

  if (!employee) return <h2 style={{padding:"40px"}}>Loading...</h2>;

  return (

  <div className={isPublicView ? "" : "modal-overlay"}>

    <div className="resume-container">

      {!isPublicView && (
        <button className="resume-close" onClick={() => navigate("/")}>
          <FiX />
        </button>
      )}

      {/* Header */}

      <div className="resume-header">

        <div className="resume-avatar">
          {employee.profile ? (
            <img src={employee.profile} alt="profile"/>
          ) : (
            employee.name?.substring(0,2).toUpperCase()
          )}
        </div>

        <div>
          <h1>{employee.name}</h1>
          <p className="resume-role">{employee.role}</p>
        </div>

      </div>

      {/* Info */}

      <div className="resume-info">

        {/* ✅ id instead of _id */}
        <p><b>Employee ID:</b> {String(employee.id).slice(-5)}</p>

        <p><b>Date of Joining:</b> {employee.doj?.split("T")[0]}</p>

        <p><b>Experience:</b> {employee.exp} years</p>

        <p><b>Email:</b> {employee.email}</p>

        <p><b>Mobile:</b> {employee.mobile}</p>

      </div>

      {/* Skills */}

      <div className="resume-section">
        <h2>Skills</h2>

        <div className="skills-container">
          {employee.skills?.map((skill,i)=>(
            <span key={i} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Projects */}

      <div className="resume-section">

        <h2>Projects</h2>

        {employee.projectsList?.map((p,i)=>(
          <div key={i} className="project-card">

            <div
              className="project-title"
              onClick={() => toggleProject(i)}
            >
              {p.name}
              <span>{openProject === i ? "▲" : "▼"}</span>
            </div>

            {openProject === i && (
              <ul className="project-list">
                {p.description.split("\n").map((point,index)=>(
                  <li key={index}>{point}</li>
                ))}
              </ul>
            )}

          </div>
        ))}

      </div>

      {/* Buttons */}

      {!isPublicView && (
        <div className="resume-actions">

          <button onClick={()=>navigate("/")}>
            Back
          </button>

          <button onClick={shareProfile}>
            Share
          </button>

        </div>
      )}

    </div>

  </div>

);
}