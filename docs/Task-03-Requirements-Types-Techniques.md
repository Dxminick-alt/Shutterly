# Task #3: Requirement Types, Elicitation Techniques & Standards

## Requirement Types

### 1. Functional Requirements
**Definition:** Describe what the system should do - specific behaviors, features, and functions.

**Examples for Shutterly:**
- Users must be able to upload photos
- System shall allow photo categorization
- Users can search photos by keywords
- System must support user authentication
- Photos can be liked and shared

**Citation:** IEEE Std 830-1998. (1998). *IEEE Recommended Practice for Software Requirements Specifications*. IEEE Computer Society.

---

### 2. Non-Functional Requirements (NFR)

#### 2.1 Performance Requirements
**Definition:** System response time, throughput, and resource usage.

**Examples:**
- Page load time < 2 seconds
- Support 10,000 concurrent users
- Image upload processing < 5 seconds

#### 2.2 Security Requirements
**Definition:** Protection of data and system resources.

**Examples:**
- Password encryption using bcrypt
- HTTPS for all communications
- GDPR compliance for user data
- SQL injection prevention

#### 2.3 Reliability Requirements
**Definition:** System availability and failure recovery.

**Examples:**
- 99.9% uptime (SLA)
- Automatic backup every 24 hours
- Maximum 1-hour recovery time

#### 2.4 Usability Requirements
**Definition:** User experience and ease of use.

**Examples:**
- Intuitive navigation (< 3 clicks to any feature)
- Mobile responsive design
- Accessibility (WCAG 2.1 AA compliance)
- Multilingual support

#### 2.5 Portability Requirements
**Definition:** Platform compatibility and deployment flexibility.

**Examples:**
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile app (iOS 14+, Android 10+)
- Progressive Web App (PWA) support

**Citation:** ISO/IEC 25010:2011. (2011). *Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE)*. ISO.

---

### 3. Business Requirements
**Definition:** High-level business objectives and goals.

**Examples:**
- Increase user engagement by 30%
- Build community of photographers
- Monetize through premium features

---

### 4. User Requirements
**Definition:** Tasks users should be able to accomplish.

**Examples:**
- As a photographer, I want to showcase my portfolio
- As a user, I want to discover inspiring photos
- As an admin, I want to moderate content

---

### 5. System Requirements
**Definition:** Technical capabilities and constraints.

**Examples:**
- Built with React.js and Node.js
- MongoDB database
- AWS cloud hosting
- RESTful API architecture

---

## Requirements Elicitation Techniques

### 1. **Interviews**
**Description:** One-on-one or group discussions with stakeholders.

**Advantages:**
- Deep understanding of needs
- Direct interaction
- Clarification opportunities

**Disadvantages:**
- Time-consuming
- May miss broader perspectives
- Requires skilled interviewer

**Best for:** Key stakeholders, domain experts

**Citation:** Goguen, J. A., & Linde, C. (1993). "Techniques for Requirements Elicitation." *IEEE International Symposium on Requirements Engineering*.

---

### 2. **Surveys/Questionnaires**
**Description:** Structured questions distributed to large groups.

**Advantages:**
- Reach many stakeholders quickly
- Quantifiable data
- Cost-effective

**Disadvantages:**
- Limited depth
- Low response rates
- No clarification opportunity

**Best for:** Large user base, statistical data

---

### 3. **Workshops**
**Description:** Facilitated group sessions with stakeholders.

**Advantages:**
- Collaborative environment
- Immediate consensus building
- Cross-functional input

**Disadvantages:**
- Difficult to schedule
- Dominant personalities may overshadow others
- Requires skilled facilitator

**Best for:** Cross-functional requirements, rapid elicitation

**Citation:** Gottesdiener, E. (2002). *Requirements by Collaboration*. Addison-Wesley Professional.

---

### 4. **Observation (Ethnographic Studies)**
**Description:** Watching users in their natural environment.

**Advantages:**
- Real-world context
- Uncovers implicit requirements
- Actual behavior vs. stated behavior

**Disadvantages:**
- Time-intensive
- Observer effect (behavior changes)
- Requires access to users

**Best for:** Understanding user workflows, UX research

---

### 5. **Prototyping**
**Description:** Creating mock-ups or working models for feedback.

**Advantages:**
- Visual and tangible
- Early feedback
- Clarifies ambiguous requirements

**Disadvantages:**
- Can be time-consuming
- May raise unrealistic expectations
- Scope creep risk

**Best for:** UI/UX requirements, innovative features

---

### 6. **Document Analysis**
**Description:** Reviewing existing documentation, systems, and processes.

**Advantages:**
- Objective data source
- Understand current state
- Identify gaps

**Disadvantages:**
- Documents may be outdated
- Time-consuming
- May not reflect reality

**Best for:** Legacy system replacement, regulatory requirements

---

### 7. **Brainstorming**
**Description:** Free-form idea generation sessions.

**Advantages:**
- Creative solutions
- Encourages participation
- Uncovers innovative ideas

**Disadvantages:**
- Can be unfocused
- May generate unrealistic ideas
- Requires facilitation

**Best for:** New product features, problem-solving

---

### 8. **Use Cases & User Stories**
**Description:** Scenario-based requirement documentation.

**Advantages:**
- User-centric perspective
- Easy to understand
- Testable

**Disadvantages:**
- May miss system requirements
- Can be repetitive
- Requires refinement

**Best for:** Agile projects, user-facing features

**Citation:** Cockburn, A. (2000). *Writing Effective Use Cases*. Addison-Wesley Professional.

---

## Requirements Standards

### 1. **IEEE 830-1998**
*IEEE Recommended Practice for Software Requirements Specifications*

**Key Components:**
- Introduction
- Overall description
- Specific requirements
- Appendices

**Citation:** IEEE Std 830-1998. (1998). *IEEE Recommended Practice for SRS*. IEEE.

---

### 2. **ISO/IEC/IEEE 29148:2018**
*Systems and software engineering — Life cycle processes — Requirements engineering*

**Covers:**
- Requirements processes
- Requirements information items
- Requirements documentation

**Citation:** ISO/IEC/IEEE 29148:2018. (2018). *Requirements engineering*. ISO.

---

### 3. **IREB (International Requirements Engineering Board)**
**Certification:** Certified Professional for Requirements Engineering (CPRE)

**Syllabus Covers:**
- Requirements elicitation
- Requirements documentation
- Requirements validation
- Requirements management

**Citation:** IREB. (2022). *CPRE Foundation Level Syllabus*. IREB e.V.

---

### 4. **Agile Standards - User Stories**
**Format:** As a [role], I want [goal], so that [benefit]

**INVEST Criteria:**
- **I**ndependent
- **N**egotiable
- **V**aluable
- **E**stimable
- **S**mall
- **T**estable

**Citation:** Cohn, M. (2004). *User Stories Applied*. Addison-Wesley Professional.

---

## References

1. IEEE Std 830-1998. (1998). *IEEE Recommended Practice for SRS*. IEEE Computer Society.
2. ISO/IEC 25010:2011. (2011). *Software Quality Requirements*. ISO.
3. ISO/IEC/IEEE 29148:2018. (2018). *Requirements engineering*. ISO.
4. Goguen, J. A., & Linde, C. (1993). "Requirements Elicitation." *IEEE RE Symposium*.
5. Gottesdiener, E. (2002). *Requirements by Collaboration*. Addison-Wesley.
6. Cockburn, A. (2000). *Writing Effective Use Cases*. Addison-Wesley.
7. Cohn, M. (2004). *User Stories Applied*. Addison-Wesley.
8. IREB. (2022). *CPRE Foundation Level Syllabus*. IREB e.V.
