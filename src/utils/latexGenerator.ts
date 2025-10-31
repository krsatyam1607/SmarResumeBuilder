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
\\documentclass[11pt, a4paper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}
\\usepackage{geometry}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{parskip}

\\geometry{margin=1in}
\\definecolor{headercolor}{RGB}{0, 51, 102}

\\renewcommand{\\section}[1]{%
  \\vspace{1em}
  {\\large \\color{headercolor} \\textbf{#1}}\\\\[-0.5em]
  \\hrule
  \\vspace{0.5em}
}

\\renewcommand{\\subsection}[1]{%
  \\vspace{0.5em}
  {\\normalsize \\textbf{#1}}\\\\[0.2em]
}

\\hypersetup{
  colorlinks=true,
  linkcolor=black,
  urlcolor=headercolor,
}

\\pagestyle{empty}
\\setlist[itemize]{leftmargin=*, itemsep=0.2em, topsep=0.2em}
\\setlist[description]{leftmargin=*, itemsep=0.2em, topsep=0.2em}

\\begin{document}

% ===== HEADER =====
\\begin{center}
  {\\LARGE \\textbf{${escape(data.personal.name || "Your Name")}}} \\\\[0.5em]
  {\\large
    ${data.personal.email ? `\\href{mailto:${escape(data.personal.email)}}{${escape(data.personal.email)}}` : ""}
    ${data.personal.phone ? ` \\textbullet\\ ${escape(data.personal.phone)}` : ""}
    ${data.personal.address ? ` \\textbullet\\ ${escape(data.personal.address)}` : ""}
  }
  \\vspace{0.3em}
  \\hrule
\\end{center}

% ===== SUMMARY =====
${
  data.personal.summary
    ? `
\\section{Summary}
${escape(data.personal.summary)}
`
    : ""
}

% ===== EDUCATION =====
${
  data.education.length
    ? `
\\section{Education}
${data.education
  .map(
    (e) => `
\\textbf{${escape(e.college)}} \\hfill \\textit{${escape(e.year || "")}} \\\\
${escape(e.degree)}${e.cgpa ? ` \\\\ CGPA: ${escape(e.cgpa)}` : ""}
`
  )
  .join("\n")}
`
    : ""
}

% ===== SKILLS =====
${
  data.skills.length
    ? `
\\section{Technical Skills}
\\begin{itemize}
  ${data.skills.map((s) => `\\item ${escape(s.name)}`).join("\n  ")}
\\end{itemize}
`
    : ""
}

% ===== EXPERIENCE =====
${
  data.experience.length
    ? `
\\section{Professional Experience}
${data.experience
  .map(
    (exp) => `
\\textbf{${escape(exp.role)}}, ${escape(exp.company)} \\hfill \\textit{${escape(exp.duration)}} \\\\
\\begin{itemize}
  ${exp.points.map((p) => `\\item ${escape(p)}`).join("\n  ")}
\\end{itemize}
`
  )
  .join("\n")}
`
    : ""
}

% ===== PROJECTS =====
${
  data.projects.length
    ? `
\\section{Projects}
${data.projects
  .map(
    (p) => `
\\textbf{${escape(p.title)}}${p.techStack ? ` \\hfill \\textit{${escape(p.techStack)}}` : ""} \\\\
${escape(p.description)}
`
  )
  .join("\n\n")}
`
    : ""
}

% ===== ACHIEVEMENTS =====
${
  data.achievements.length
    ? `
\\section{Achievements}
\\begin{itemize}
  ${data.achievements.map((a) => `\\item ${escape(a.text)}`).join("\n  ")}
\\end{itemize}
`
    : ""
}

% ===== LANGUAGES =====
${
  data.languages && data.languages.length
    ? `
\\section{Languages}
\\begin{itemize}
  ${data.languages.map((l) => `\\item ${escape(l)}`).join("\n  ")}
\\end{itemize}
`
    : ""
}

\\end{document}
  `.trim();
};
