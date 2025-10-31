import { ResumeData } from '@/types/resume';
import { FiMail, FiPhone, FiLinkedin, FiMapPin } from 'react-icons/fi';

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  return (
<div
  id="resume-preview"
  className="bg-white text-gray-900 mx-auto p-8 min-h-[297mm] w-[210mm] shadow-md flex flex-col justify-start"
>
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-6">
        {data.personal.photo && (
          <img
            src={data.personal.photo}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white"
          />
        )}

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 border-b-2 border-white pb-2">CONTACT</h2>
          <div className="space-y-2 text-sm">
            {data.personal.email && (
              <div className="flex items-start gap-2">
                <FiMail className="mt-1 flex-shrink-0" />
                <span className="break-all">{data.personal.email}</span>
              </div>
            )}
            {data.personal.phone && (
              <div className="flex items-center gap-2">
                <FiPhone className="flex-shrink-0" />
                <span>{data.personal.phone}</span>
              </div>
            )}
            {data.personal.linkedin && (
              <div className="flex items-start gap-2">
                <FiLinkedin className="mt-1 flex-shrink-0" />
                <span className="break-all">{data.personal.linkedin}</span>
              </div>
            )}
            {data.personal.address && (
              <div className="flex items-start gap-2">
                <FiMapPin className="mt-1 flex-shrink-0" />
                <span>{data.personal.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 border-b-2 border-white pb-2">SKILLS</h2>
            <div className="space-y-3">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-sm font-medium mb-1">{skill.name}</p>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all"
                      style={{ width: `${(skill.rating / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {data.achievements.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 border-b-2 border-white pb-2">ACHIEVEMENTS</h2>
            <ul className="space-y-2 text-sm">
              {data.achievements.map((achievement) => (
                <li key={achievement.id} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>{achievement.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8">
        <h1 className="text-4xl font-bold mb-2 text-indigo-600">
          {data.personal.name || 'Your Name'}
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-purple-700 mb-6" />

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-3">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3 pl-4 border-l-4 border-indigo-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-gray-700 text-sm">{edu.college}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold text-indigo-600">{edu.year}</p>
                    {edu.cgpa && <p className="text-gray-700">{edu.cgpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-3">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4 pl-4 border-l-4 border-indigo-200">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold">{exp.role}</h3>
                    <p className="text-gray-700 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-sm text-indigo-600 font-semibold">{exp.duration}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
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
          <div>
            <h2 className="text-2xl font-bold text-indigo-600 mb-3">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-3 pl-4 border-l-4 border-indigo-200">
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-sm text-purple-600 italic mb-1">{project.techStack}</p>
                <p className="text-sm text-gray-700">{project.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
