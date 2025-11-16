import type { ResumeStyle } from "./resume-types";

export interface ResumeTemplateConfig {
    name: string;
    description: string;
    initialContent: string;
    editorClass: string;
    wrapperClass: string;
}

export function getResumeTemplate(style: ResumeStyle): ResumeTemplateConfig {
    switch (style) {
        case "modern":
            return {
                name: "Modern Resume",
                description: "Two-column layout with dark header",
                editorClass:
                    "resume-editor resume-modern prose max-w-none focus:outline-none",
                wrapperClass: "resume-wrapper resume-modern-wrapper",
                initialContent: `
                    <div data-type="resume-header" class="resume-header-modern">
                        <div class="resume-header-content">
                            <div class="resume-profile-section">
                                <div class="resume-profile-picture">
                                    <div class="resume-profile-placeholder">Your Photo</div>
                                </div>
                                <h1 contenteditable="true" class="resume-name">Your Name</h1>
                            </div>
                            <div class="resume-contact-info" contenteditable="true">
                                <p>City, ST</p>
                                <p>(555) 123-4567</p>
                                <p>your.email@example.com</p>
                                <p>LinkedIn URL</p>
                            </div>
                        </div>
                    </div>
                    <div data-type="resume-section" data-editable="true" class="resume-section">
                        <h2>Professional Experience</h2>
                        <div class="resume-experience-item">
                            <h3>Job Title</h3>
                            <p><strong>Company Name</strong> - Location</p>
                            <p><em>Date Range</em></p>
                            <ul>
                                <li>Accomplishment or responsibility</li>
                                <li>Another key achievement</li>
                            </ul>
                        </div>
                    </div>
                    <div data-type="resume-section" data-editable="true" class="resume-section">
                        <h2>Education</h2>
                        <div class="resume-education-item">
                            <h3>Degree Name</h3>
                            <p><strong>Institution Name</strong> - Location</p>
                            <p><em>Graduation Date</em></p>
                        </div>
                    </div>
                    <div data-type="resume-section" data-editable="true" class="resume-section">
                        <h2>Skills</h2>
                        <ul>
                            <li>Skill 1</li>
                            <li>Skill 2</li>
                            <li>Skill 3</li>
                        </ul>
                    </div>
                `,
            };

        case "classic":
            return {
                name: "Classic Resume",
                description: "Single column, minimalist design",
                editorClass:
                    "resume-editor resume-classic prose max-w-none focus:outline-none",
                wrapperClass: "resume-wrapper resume-classic-wrapper",
                initialContent: `
                    <div data-type="resume-header" class="resume-header-classic">
                        <h1 contenteditable="true" class="resume-name-center">YOUR NAME</h1>
                        <div class="resume-contact-center" contenteditable="true">
                            Full Address • City, State, ZIP • Phone Number • E-mail
                        </div>
                    </div>
                    <div data-type="resume-section" data-editable="true" class="resume-section">
                        <h2>OBJECTIVE</h2>
                        <p contenteditable="true">Your career objective or summary</p>
                    </div>
                    <div data-type="resume-section" data-editable="true" class="resume-section">
                        <h2>EDUCATION</h2>
                        <div class="resume-education-item">
                            <h3>UNIVERSITY NAME</h3>
                            <p><strong>Degree Name</strong></p>
                            <p>Details, GPA, Awards</p>
                            <p><em>Location, Date</em></p>
                        </div>
                    </div>
                    <div data-type="resume-section" data-editable="true" class="resume-section">
                        <h2>WORK EXPERIENCE</h2>
                        <div class="resume-experience-item">
                            <h3>COMPANY NAME</h3>
                            <p><strong>Job Title</strong></p>
                            <ul>
                                <li>Responsibility or achievement</li>
                                <li>Another accomplishment</li>
                            </ul>
                            <p><em>Location, Date Range</em></p>
                        </div>
                    </div>
                `,
            };

        case "sidebar":
            return {
                name: "Sidebar Resume",
                description: "Dark sidebar with light main content",
                editorClass:
                    "resume-editor resume-sidebar prose max-w-none focus:outline-none",
                wrapperClass: "resume-wrapper resume-sidebar-wrapper",
                initialContent: `
                    <div class="resume-sidebar-layout">
                        <div class="resume-sidebar-left">
                            <div class="resume-profile-picture-sidebar">
                                <div class="resume-profile-placeholder">Photo</div>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2>ABOUT ME</h2>
                                <p contenteditable="true">Your professional summary and background</p>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2>LINKS</h2>
                                <p contenteditable="true">LinkedIn: www.linkedin.com/in/yourprofile</p>
                                <p contenteditable="true">Twitter: www.twitter.com/yourhandle</p>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2>REFERENCES</h2>
                                <p contenteditable="true">Reference Name</p>
                                <p contenteditable="true">Company</p>
                                <p contenteditable="true">Contact Info</p>
                            </div>
                        </div>
                        <div class="resume-sidebar-right">
                            <div data-type="resume-header" class="resume-header-sidebar">
                                <h1 contenteditable="true">YOUR NAME</h1>
                                <p contenteditable="true">YOUR TITLE</p>
                                <div class="resume-contact-sidebar" contenteditable="true">
                                    <p>Location</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2>WORK EXPERIENCE</h2>
                                <div class="resume-experience-item">
                                    <h3>Company Name</h3>
                                    <p><strong>Job Title</strong></p>
                                    <p><em>Location, Date Range</em></p>
                                    <ul>
                                        <li>Key achievement</li>
                                        <li>Responsibility</li>
                                    </ul>
                                </div>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2>EDUCATION</h2>
                                <div class="resume-education-item">
                                    <h3>Institution Name</h3>
                                    <p><strong>Degree</strong></p>
                                    <p><em>Location, Year</em></p>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
            };

        case "minimalist":
            return {
                name: "Minimalist Resume",
                description: "Clean design with profile picture",
                editorClass:
                    "resume-editor resume-minimalist prose max-w-none focus:outline-none",
                wrapperClass: "resume-wrapper resume-minimalist-wrapper",
                initialContent: `
                    <div class="resume-minimalist-layout">
                        <div class="resume-minimalist-left">
                            <div class="resume-profile-picture-minimalist" id="profile-picture-upload">
                                <div class="resume-profile-placeholder">
                                    <span class="profile-picture-text">Your Photo</span>
                                    <span class="profile-picture-hint">Click to upload</span>
                                </div>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2 class="resume-section-title" contenteditable="false">LINKS</h2>
                                <div class="resume-link-item">
                                    <p contenteditable="true"><strong>LinkedIn:</strong></p>
                                    <a href="https://www.linkedin.com/in/will-hunting" contenteditable="true">https://www.linkedin.com/in/will-hunting</a>
                                </div>
                                <div class="resume-link-item">
                                    <p contenteditable="true"><strong>Twitter:</strong></p>
                                    <a href="https://twitter.com/willhunting" contenteditable="true">https://twitter.com/willhunting</a>
                                </div>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2 class="resume-section-title" contenteditable="false">LANGUAGES</h2>
                                <div class="resume-language-item" contenteditable="true">
                                    <span>English</span>
                                    <div class="resume-progress-bar">
                                        <div class="resume-progress-fill" style="width: 100%"></div>
                                    </div>
                                </div>
                                <div class="resume-language-item" contenteditable="true">
                                    <span>French</span>
                                    <div class="resume-progress-bar">
                                        <div class="resume-progress-fill" style="width: 60%"></div>
                                    </div>
                                </div>
                                <div class="resume-language-item" contenteditable="true">
                                    <span>Spanish</span>
                                    <div class="resume-progress-bar">
                                        <div class="resume-progress-fill resume-progress-light" style="width: 30%"></div>
                                    </div>
                                </div>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2 class="resume-section-title" contenteditable="false">REFERENCE</h2>
                                <p contenteditable="true" class="resume-reference-name"><strong>SEAN MAGUIRE</strong></p>
                                <p contenteditable="true" class="resume-reference-detail">Bunker Hill Community College</p>
                                <p contenteditable="true" class="resume-reference-detail">P: +1-202-555-0151</p>
                                <p contenteditable="true" class="resume-reference-detail">E: seanmaguire@gmail.com</p>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2 class="resume-section-title" contenteditable="false">HOBBIES</h2>
                                <ul contenteditable="true">
                                    <li>Reading</li>
                                    <li>Solving Math Problems</li>
                                    <li>Playing Chess</li>
                                    <li>Jogging</li>
                                    <li>Watching Baseball</li>
                                </ul>
                            </div>
                        </div>
                        <div class="resume-minimalist-right">
                            <div data-type="resume-header" class="resume-header-minimalist">
                                <div class="resume-header-top">
                                    <div>
                                        <h1 contenteditable="true" class="resume-name-minimalist">WILL</h1>
                                        <h1 contenteditable="true" class="resume-name-minimalist">HUNTING</h1>
                                        <p contenteditable="true" class="resume-title-minimalist">STUDENT</p>
                                    </div>
                                    <div class="resume-contact-minimalist">
                                        <p contenteditable="true"><span class="contact-icon">📍</span> Boston, MA, Boston, 02101, USA</p>
                                        <p contenteditable="true"><span class="contact-icon">📞</span> +1-202-555-0191</p>
                                        <p contenteditable="true"><span class="contact-icon">✉️</span> willhunting@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2 class="resume-section-title" contenteditable="false">ABOUT ME</h2>
                                <p contenteditable="true">A highly intelligent and gifted student with a strong passion for mathematics and problem-solving. Proven ability to work in teams and communicate effectively.</p>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2 class="resume-section-title" contenteditable="false">WORK EXPERIENCE</h2>
                                <div class="resume-experience-item">
                                    <div class="resume-experience-header">
                                        <h3 contenteditable="true">JANITOR</h3>
                                        <span contenteditable="true" class="resume-date">JAN 2018 - DEC 2019</span>
                                    </div>
                                    <p contenteditable="true"><strong>MIT, CAMBRIDGE</strong></p>
                                    <ul contenteditable="true">
                                        <li>Maintained cleanliness of the campus</li>
                                        <li>Solved complex mathematical problems on the blackboard</li>
                                    </ul>
                                </div>
                                <div class="resume-experience-item">
                                    <div class="resume-experience-header">
                                        <h3 contenteditable="true">CONSTRUCTION WORKER</h3>
                                        <span contenteditable="true" class="resume-date">JAN 2016 - DEC 2017</span>
                                    </div>
                                    <p contenteditable="true"><strong>CONSTRUCTION COMPANY, BOSTON</strong></p>
                                    <ul contenteditable="true">
                                        <li>Performed general construction tasks</li>
                                        <li>Worked in a team to complete projects</li>
                                    </ul>
                                </div>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2 class="resume-section-title" contenteditable="false">EDUCATION</h2>
                                <div class="resume-education-item">
                                    <div class="resume-experience-header">
                                        <h3 contenteditable="true">BACHELOR OF MATHEMATICS</h3>
                                        <span contenteditable="true" class="resume-date">2022</span>
                                    </div>
                                    <p contenteditable="true"><strong>MIT, CAMBRIDGE</strong></p>
                                    <ul contenteditable="true">
                                        <li>Studied advanced mathematics</li>
                                        <li>Worked on complex problem-solving</li>
                                    </ul>
                                </div>
                                <div class="resume-education-item">
                                    <div class="resume-experience-header">
                                        <h3 contenteditable="true">HIGH SCHOOL DIPLOMA</h3>
                                        <span contenteditable="true" class="resume-date">2016</span>
                                    </div>
                                    <p contenteditable="true"><strong>BOSTON PUBLIC HIGH SCHOOL, BOSTON</strong></p>
                                    <ul contenteditable="true">
                                        <li>Excelled in Mathematics and Science</li>
                                        <li>Participated in the Math Club</li>
                                    </ul>
                                </div>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2 class="resume-section-title" contenteditable="false">SKILLS</h2>
                                <div class="resume-skills-grid">
                                    <span contenteditable="true">Mathematics</span>
                                    <span contenteditable="true">Problem Solving</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
            };

        case "two-column":
            return {
                name: "Two Column Resume",
                description: "Balanced two-column layout",
                editorClass:
                    "resume-editor resume-two-column prose max-w-none focus:outline-none",
                wrapperClass: "resume-wrapper resume-two-column-wrapper",
                initialContent: `
                    <div class="resume-two-column-layout">
                        <div class="resume-two-column-left">
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2>Professional Experience</h2>
                                <div class="resume-experience-item">
                                    <h3>Job Title</h3>
                                    <p><strong>Company</strong> - Location</p>
                                    <p><em>Date Range</em></p>
                                    <ul>
                                        <li>Key achievement</li>
                                        <li>Responsibility</li>
                                    </ul>
                                </div>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2>Education</h2>
                                <div class="resume-education-item">
                                    <h3>Degree</h3>
                                    <p><strong>Institution</strong></p>
                                    <p><em>Date</em></p>
                                </div>
                            </div>
                        </div>
                        <div class="resume-two-column-right">
                            <div data-type="resume-header" class="resume-header-two-column">
                                <h1 contenteditable="true">Your Name</h1>
                                <div class="resume-contact-two-column" contenteditable="true">
                                    <p>Contact Information</p>
                                    <p>Email</p>
                                    <p>Phone</p>
                                </div>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2>Summary</h2>
                                <p contenteditable="true">Your professional summary</p>
                            </div>
                            <div data-type="resume-section" data-editable="true" class="resume-section">
                                <h2>Skills</h2>
                                <ul>
                                    <li>Skill 1</li>
                                    <li>Skill 2</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `,
            };

        default:
            return getResumeTemplate("modern");
    }
}
