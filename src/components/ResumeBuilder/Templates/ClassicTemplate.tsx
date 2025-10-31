import { ResumeData } from '@/types/resume';
import { FiMail, FiPhone, FiLinkedin, FiMapPin } from 'react-icons/fi';

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  return (
<div
  id="resume-preview"
  className="bg-white text-gray-900 mx-auto p-8 min-h-[297mm] w-[210mm] shadow-md flex flex-col justify-start"
>
      {/* Header with blue background */}
      <div className="bg-blue-900 text-white p-8">
        <div className="flex items-center gap-6">
          {data.personal.photo && (
            <img
              src={data.personal.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.personal.name || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              {data.personal.email && (
                <div className="flex items-center gap-1">
                  <FiMail />
                  <span>{data.personal.email}</span>
                </div>
              )}
              {data.personal.phone && (
                <div className="flex items-center gap-1">
                  <FiPhone />
                  <span>{data.personal.phone}</span>
                </div>
              )}
              {data.personal.linkedin && (
                <div className="flex items-center gap-1">
                  <FiLinkedin />
                  <span>{data.personal.linkedin}</span>
                </div>
              )}
              {data.personal.address && (
                <div className="flex items-center gap-1">
                  <FiMapPin />
                  <span>{data.personal.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">
              EDUCATION
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.college}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{edu.year}</p>
                    {edu.cgpa && <p className="text-gray-700">{edu.cgpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="px-4 py-2 bg-blue-100 text-blue-900 rounded-full font-medium"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">
              EXPERIENCE
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg">{exp.role}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="text-sm">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">
              PROJECTS
            </h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-3">
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-sm text-blue-700 italic mb-1">{project.techStack}</p>
                <p className="text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {data.achievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">
              ACHIEVEMENTS
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {data.achievements.map((achievement) => (
                <li key={achievement.id} className="text-sm">
                  {achievement.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
