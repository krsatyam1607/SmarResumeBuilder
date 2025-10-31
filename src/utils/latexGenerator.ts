import { ResumeData } from "@/types/resume";

export const generateLatex = (data: ResumeData): string => {
  const escape = (str: string) =>
    str
      ? str
          .replace(/&/g, "\\&")
          .replace(/%/g, "\\%")
          .replace(/_/g, "\\_")
          .replace(/#/g, "\\#")
          .replace(/{/g, "\\{")
          .replace(/}/g, "\\}")
      : "";

  return `
% -------------------------
% AUTO-GENERATED RESUME (ModernCV compatible)
% -------------------------
\\documentclass[11pt,a4paper,sans]{moderncv}
\\moderncvstyle{classic}
\\moderncvcolor{blue}
\\usepackage[scale=0.9]{geometry}
\\usepackage{enumitem}
\\setlist[itemize]{noitemsep, topsep=0pt}

% Personal data
\\name{${escape(data.personal.name || "Your Name")}}{}
\\email{${escape(data.personal.email || "")}}
\\phone{${escape(data.personal.phone || "")}}
\\social[linkedin]{${escape(data.personal.linkedin || "")}}
\\address{${escape(data.personal.address || "")}}

\\begin{document}
\\makecvtitle

% Education
${
  data.education.length
    ? `\\section{Education}\n${data.education
        .map(
          (e) => `\\cventry{${escape(e.year)}}{${escape(e.degree)}}{${escape(
            e.college
          )}}{}{}{${e.cgpa ? `CGPA: ${escape(e.cgpa)}` : ""}}`
        )
        .join("\n")}`
    : ""
}

% Experience
${
  data.experience.length
    ? `\\section{Experience}\n${data.experience
        .map(
          (exp) =>
            `\\cventry{${escape(exp.duration)}}{${escape(exp.role)}}{${escape(
              exp.company
            )}}{}{}{\n\\begin{itemize}\n${exp.points
              .map((p) => `\\item ${escape(p)}`)
              .join("\n")}\n\\end{itemize}}`
        )
        .join("\n\n")}`
    : ""
}

% Projects
${
  data.projects.length
    ? `\\section{Projects}\n${data.projects
        .map(
          (p) =>
            `\\cventry{}{${escape(p.title)}}{}{${escape(
              p.techStack
            )}}{}{${escape(p.description)}}`
        )
        .join("\n")}`
    : ""
}

% Skills
${
  data.skills.length
    ? `\\section{Skills}\n\\cvitem{}{${data.skills
        .map((s) => escape(s.name))
        .join(", ")}}`
    : ""
}

% Achievements
${
  data.achievements.length
    ? `\\section{Achievements}\n\\begin{itemize}\n${data.achievements
        .map((a) => `\\item ${escape(a.text)}`)
        .join("\n")}\n\\end{itemize}`
    : ""
}

\\end{document}
  `.trim();
};
