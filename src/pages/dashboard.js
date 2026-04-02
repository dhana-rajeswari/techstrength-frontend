import { useState } from "react";
import "./dashboard.css";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";

// ─────────────────────────────────────────────────────
//  ADD POPUP
// ─────────────────────────────────────────────────────
function AddPopup({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <div className="modal-header">
          <h3 className="modal-title">Add New Employee</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. John Smith"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Mobile</label>
            <input
              className="form-input"
              type="text"
              placeholder="10-digit number"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Date of Joining</label>
            <input
              className="form-input"
              type="text"
              placeholder="DD-MM-YYYY"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Years of Experience</label>
            <input
              className="form-input"
              type="number"
              placeholder="e.g. 3.5"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Company Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="name@sysintelli.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <select className="form-select">
              <option>Java Developer</option>
              <option>Frontend Developer</option>
              <option>Full Stack Developer</option>
              <option>DevOps Engineer</option>
              <option>Data Engineer</option>
              <option>QA Engineer</option>
            </select>
          </div>
        </div>
        <div className="form-group full" style={{ marginTop: "14px" }}>
          <label className="form-label">Skills (comma-separated)</label>
          <textarea
            className="form-textarea"
            rows={3}
            placeholder="Java, Spring Boot, REST APIs..."
          />
        </div>
        <div className="modal-footer-btns">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save">Save Employee</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
//  VIEW POPUP
// ─────────────────────────────────────────────────────
function ViewPopup({ onClose }) {
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
            <div className="view-modal-avatar">VR</div>
            <div>
              <div className="view-modal-name">Venkat Reddy Vakiti</div>
              <div className="view-modal-dept">Java Developer</div>
              <div className="view-modal-badges">
                <span className="view-modal-badge">EMP1056</span>
                <span className="view-modal-badge">Joined 01-09-2025</span>
                <span className="view-modal-badge">1.0 yrs exp</span>
              </div>
            </div>
          </div>
          <button className="view-modal-close-btn" onClick={onClose}>
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
                    <div className="kpi-val">1.0</div>
                    <div className="kpi-label">Experience (Yrs)</div>
                  </div>
                </div>
                <div className="kpi-card">
                  <span className="kpi-icon">🛠</span>
                  <div>
                    <div className="kpi-val">13</div>
                    <div className="kpi-label">Total Skills</div>
                  </div>
                </div>
                <div className="kpi-card">
                  <span className="kpi-icon">📁</span>
                  <div>
                    <div className="kpi-val">3</div>
                    <div className="kpi-label">Projects Done</div>
                  </div>
                </div>
              </div>
              <div className="info-box">
                <div className="info-box-title">Contact & Details</div>
                <div className="info-grid">
                  <div>
                    <div className="info-field-label">Employee ID</div>
                    <div className="info-field-value">EMP1056</div>
                  </div>
                  <div>
                    <div className="info-field-label">Department</div>
                    <div className="info-field-value">Java Developer</div>
                  </div>
                  <div>
                    <div className="info-field-label">Date of Joining</div>
                    <div className="info-field-value">01-09-2025</div>
                  </div>
                  <div>
                    <div className="info-field-label">Years of Experience</div>
                    <div className="info-field-value">1.0 Years</div>
                  </div>
                  <div>
                    <div className="info-field-label">Mobile</div>
                    <div className="info-field-value">9876543210</div>
                  </div>
                  <div>
                    <div className="info-field-label">Email</div>
                    <div className="info-field-value">
                      venkat.vakiti@sysintelli.com
                    </div>
                  </div>
                </div>
              </div>
              <div className="vm-section-label">Top Skills</div>
              <div className="vm-skill-pills">
                {[
                  "Java",
                  "Spring Boot",
                  "Spring Security",
                  "Microservices",
                  "REST APIs",
                  "JWT & OTP Auth",
                  "MySQL",
                  "MongoDB",
                ].map((s) => (
                  <span key={s} className="vm-skill-pill">
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* SKILLS */}
          {tab === "skills" && (
            <>
              <div className="vm-section-label">All Skills · 13 total</div>
              <div className="vm-skill-pills">
                {[
                  "Java",
                  "Spring Boot",
                  "Spring Security",
                  "Microservices",
                  "REST APIs",
                  "JWT & OTP Auth",
                  "MySQL",
                  "MongoDB",
                  "Eureka Server",
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "Git",
                ].map((s) => (
                  <span key={s} className="vm-skill-pill">
                    {s}
                  </span>
                ))}
              </div>
              <div className="info-box">
                <div className="info-box-title">Proficiency Overview</div>
                {[
                  ["Java", 100],
                  ["Spring Boot", 93],
                  ["REST APIs", 86],
                  ["MySQL", 79],
                  ["MongoDB", 72],
                  ["Microservices", 65],
                  ["JavaScript", 58],
                ].map(([s, p]) => (
                  <div className="skill-bar-row" key={s}>
                    <div className="skill-bar-header">
                      <span className="skill-bar-label">{s}</span>
                      <span className="skill-bar-pct">{p}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${p}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* PROJECTS */}
          {tab === "projects" && (
            <>
              <div className="project-card">
                <div className="project-card-header">
                  <div className="project-number">1</div>
                  <div className="project-title">
                    BlooTax – Application (Support Project)
                  </div>
                </div>
                <ul className="project-points">
                  <li>
                    Supported tax and finance workflows using JavaScript APIs.
                  </li>
                  <li>Contributed to mobile UI using React Native.</li>
                  <li>Managed real-time data using Firebase Database.</li>
                  <li>
                    Assisted in debugging, integrations and performance
                    improvements.
                  </li>
                </ul>
                <div className="project-stack">
                  <span className="project-stack-label">Tech:</span>
                  <span className="project-stack-pill">JavaScript</span>
                  <span className="project-stack-pill">React Native</span>
                  <span className="project-stack-pill">Firebase</span>
                  <span className="project-stack-pill">REST APIs</span>
                </div>
              </div>

              <div className="project-card">
                <div className="project-card-header">
                  <div className="project-number">2</div>
                  <div className="project-title">
                    Store Review System (Callippus Solutions)
                  </div>
                </div>
                <ul className="project-points">
                  <li>
                    Developed backend microservices using Java and Spring Boot.
                  </li>
                  <li>
                    Designed REST APIs for store reviews, ratings and user
                    operations.
                  </li>
                  <li>
                    Used MongoDB for NoSQL data management and optimized
                    queries.
                  </li>
                  <li>
                    Integrated backend APIs with frontend for seamless data
                    flow.
                  </li>
                </ul>
                <div className="project-stack">
                  <span className="project-stack-label">Tech:</span>
                  <span className="project-stack-pill">Java</span>
                  <span className="project-stack-pill">Spring Boot</span>
                  <span className="project-stack-pill">MongoDB</span>
                  <span className="project-stack-pill">Microservices</span>
                </div>
              </div>

              <div className="project-card">
                <div className="project-card-header">
                  <div className="project-number">3</div>
                  <div className="project-title">
                    Food Ordering Web Application
                  </div>
                </div>
                <ul className="project-points">
                  <li>
                    Built backend services using Spring Boot for users, orders
                    and food items.
                  </li>
                  <li>
                    Implemented JWT authentication and role-based authorization.
                  </li>
                  <li>Integrated Razorpay for secure online payments.</li>
                  <li>Used AWS S3 for food image upload and storage.</li>
                </ul>
                <div className="project-stack">
                  <span className="project-stack-label">Tech:</span>
                  <span className="project-stack-pill">Java</span>
                  <span className="project-stack-pill">Spring Boot</span>
                  <span className="project-stack-pill">React</span>
                  <span className="project-stack-pill">MongoDB</span>
                  <span className="project-stack-pill">JWT</span>
                  <span className="project-stack-pill">Razorpay</span>
                  <span className="project-stack-pill">AWS S3</span>
                </div>
              </div>
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
            <button className="btn-edit-profile">✏️ Edit Profile</button>
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
}) {
  return (
    <div className="emp-card">
      <div className="card-header">
        <div className="card-header-top">
          <div className="card-avatar">{initials}</div>
          <div>
            <div className="card-name">{name}</div>
            <div className="card-id">
              {empId} · {joined}
            </div>
          </div>
        </div>
        <div className="card-actions">
          <FiEye onClick={onView} className="card-action-icon" />

          <FiEdit className="card-action-icon" />
          <FiTrash className="card-action-icon" />
          <i className="fas fa-trash"></i>
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

  return (
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
            <div className="hero-sub">Employee Tech Strength Registry</div>
          </div>
          <div className="hero-quote">
            "It does not matter how slowly you go as long as you do not stop."
          </div>
        </div>

        <div className="content">
          {/* Stat Cards */}
          <div className="stat-cards">
            <div className="stat-card">
              <div className="stat-card-label">Total Employees</div>
              <div className="stat-card-value">10</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Skill Profiles</div>
              <div className="stat-card-value">98</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Departments</div>
              <div className="stat-card-value">6</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Avg. Experience</div>
              <div className="stat-card-value">5.4 yrs</div>
            </div>
          </div>

          {/* Section Header */}
          <div className="section-header">
            <div className="section-title">Employee Tech Strength</div>
            <div className="section-controls">
              <div className="select-wrapper">
                <select>
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
                <input placeholder="Search employee..." readOnly />
                <span className="search-icon">🔍</span>
              </div>
              <button className="btn-add" onClick={() => setShowAdd(true)}>
                + Add Employee
              </button>
            </div>
          </div>

          {/* Card Grid */}
          <div className="card-grid">
            <EmpCard
              initials="VR"
              name="Venkat Reddy Vakiti"
              empId="EMP1056"
              joined="01-09-2025"
              dept="Java Developer"
              exp="1.0"
              projects={3}
              skills={[
                "Java",
                "Spring Boot",
                "Microservices",
                "REST APIs",
                "MySQL",
                "MongoDB",
                "JWT Auth",
                "Spring Security",
              ]}
              bars={[
                ["Java", 100],
                ["Spring Boot", 93],
                ["REST APIs", 86],
                ["MySQL", 79],
                ["MongoDB", 72],
                ["Microservices", 65],
                ["JavaScript", 58],
              ]}
              email="venkat.vakiti@sysintelli.com"
              onView={() => setShowView(true)}
            />

            <EmpCard
              initials="PS"
              name="Priya Sharma"
              empId="EMP1055"
              joined="15-03-2024"
              dept="Frontend Developer"
              exp="3.5"
              projects={1}
              skills={[
                "React",
                "TypeScript",
                "Redux",
                "Tailwind CSS",
                "Jest",
                "Figma",
                "HTML",
                "CSS",
              ]}
              bars={[
                ["React", 95],
                ["TypeScript", 88],
                ["Redux", 82],
                ["Tailwind CSS", 78],
                ["Jest", 70],
                ["Figma", 68],
                ["HTML", 90],
                ["CSS", 88],
              ]}
              email="priya.sharma@sysintelli.com"
              onView={() => setShowView(true)}
            />

            <EmpCard
              initials="RK"
              name="Ravi Kumar"
              empId="EMP1054"
              joined="10-01-2024"
              dept="Full Stack Developer"
              exp="5.0"
              projects={1}
              skills={[
                "Node.js",
                "React",
                "MongoDB",
                "Express",
                "AWS",
                "Docker",
                "REST APIs",
                "TypeScript",
              ]}
              bars={[
                ["Node.js", 92],
                ["React", 85],
                ["MongoDB", 80],
                ["Express", 78],
                ["AWS", 70],
                ["Docker", 68],
                ["REST APIs", 88],
                ["TypeScript", 75],
              ]}
              email="ravi.kumar@sysintelli.com"
              onView={() => setShowView(true)}
            />

            <EmpCard
              initials="AR"
              name="Ananya Reddy"
              empId="EMP1053"
              joined="20-06-2023"
              dept="DevOps Engineer"
              exp="4.2"
              projects={1}
              skills={[
                "AWS",
                "Docker",
                "Kubernetes",
                "Jenkins",
                "Terraform",
                "CI/CD",
                "Linux",
                "Python",
              ]}
              bars={[
                ["AWS", 90],
                ["Docker", 88],
                ["Kubernetes", 82],
                ["Jenkins", 78],
                ["Terraform", 74],
                ["CI/CD", 85],
                ["Linux", 80],
                ["Python", 72],
              ]}
              email="ananya.reddy@sysintelli.com"
              onView={() => setShowView(true)}
            />

            <EmpCard
              initials="SB"
              name="Suresh Babu"
              empId="EMP1052"
              joined="05-08-2023"
              dept="Data Engineer"
              exp="6.1"
              projects={1}
              skills={[
                "Python",
                "Spark",
                "Kafka",
                "Airflow",
                "SQL",
                "AWS Glue",
                "Redshift",
                "Hadoop",
              ]}
              bars={[
                ["Python", 94],
                ["Spark", 88],
                ["Kafka", 85],
                ["SQL", 82],
                ["Airflow", 76],
                ["Redshift", 70],
                ["AWS Glue", 68],
                ["Hadoop", 65],
              ]}
              email="suresh.babu@sysintelli.com"
              onView={() => setShowView(true)}
            />
          </div>

          <div className="grid-footer">
            © 2025 SysIntelli | TechStrength – V2.0 &nbsp;·&nbsp; Showing 10
            employees
          </div>
        </div>
      </div>

      {showAdd && <AddPopup onClose={() => setShowAdd(false)} />}
      {showView && <ViewPopup onClose={() => setShowView(false)} />}
    </div>
  );
}
