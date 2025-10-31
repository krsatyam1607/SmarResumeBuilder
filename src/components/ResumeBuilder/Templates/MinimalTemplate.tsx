import { ResumeData } from '@/types/resume';
import { FiMail, FiPhone, FiLinkedin, FiMapPin, FiStar } from 'react-icons/fi';

interface MinimalTemplateProps {
  data: ResumeData;
}

export const MinimalTemplate = ({ data }: MinimalTemplateProps) => {
  return (
<div
  id="resume-preview"
  className="bg-white text-gray-900 mx-auto p-8 min-h-[297mm] w-[210mm] shadow-md flex flex-col justify-start"
>
      {/* Header */}
      <div className="border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-4xl font-bold mb-2">{data.personal.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.personal.email && (
            <div className="flex items-center gap-1">
              <FiMail className="text-gray-600" />
              <span>{data.personal.email}</span>
            </div>
          )}
          {data.personal.phone && (
            <div className="flex items-center gap-1">
              <FiPhone className="text-gray-600" />
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal.linkedin && (
            <div className="flex items-center gap-1">
              <FiLinkedin className="text-gray-600" />
              <span>{data.personal.linkedin}</span>
            </div>
          )}
          {data.personal.address && (
            <div className="flex items-center gap-1">
              <FiMapPin className="text-gray-600" />
              <span>{data.personal.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{edu.degree}</h3>
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
          <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Skills</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between">
                <span className="font-medium">{skill.name}</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-3 h-3 ${
                        i < skill.rating ? 'fill-gray-900 text-gray-900' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold">{exp.role}</h3>
                <span className="text-sm text-gray-700">{exp.duration}</span>
              </div>
              <p className="text-gray-700 mb-2">{exp.company}</p>
              <ul className="list-disc list-inside space-y-1">
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
          <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Projects</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-sm text-gray-700 italic mb-1">{project.techStack}</p>
              <p className="text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Achievements</h2>
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
  );
};
