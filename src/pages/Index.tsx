import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PersonalInfoForm } from '@/components/ResumeBuilder/PersonalInfoForm';
import { EducationForm } from '@/components/ResumeBuilder/EducationForm';
import { SkillsForm } from '@/components/ResumeBuilder/SkillsForm';
import { ProjectsForm } from '@/components/ResumeBuilder/ProjectsForm';
import { ExperienceForm } from '@/components/ResumeBuilder/ExperienceForm';
import { AchievementsForm } from '@/components/ResumeBuilder/AchievementsForm';
import { MinimalTemplate } from '@/components/ResumeBuilder/Templates/MinimalTemplate';
import { ClassicTemplate } from '@/components/ResumeBuilder/Templates/ClassicTemplate';
import { ModernTemplate } from '@/components/ResumeBuilder/Templates/ModernTemplate';
import { ResumeData, TemplateType } from '@/types/resume';
import { generatePDF } from '@/utils/pdfGenerator';
import { LatexExport } from "@/components/ui/LatexExport";
import { FiDownload, FiFileText } from 'react-icons/fi';
import { toast } from 'sonner';

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: { name: '', email: '', phone: '', linkedin: '', address: '' },
    education: [],
    skills: [],
    projects: [],
    experience: [],
    achievements: [],
  });

  const [template, setTemplate] = useState<TemplateType>('minimal');

  const handleDownloadPDF = async () => {
    if (!resumeData.personal.name) {
      toast.error('Please enter your name before downloading');
      return;
    }

    toast.loading('Generating PDF...');
    
    try {
      const fileName = `${resumeData.personal.name.replace(/\s+/g, '_')}_Resume_2025.pdf`;
      await generatePDF('resume-preview', fileName);
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      default:
        return <MinimalTemplate data={resumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="bg-card shadow-soft border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiFileText className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Smart Resume Builder
                </h1>
                <p className="text-sm text-muted-foreground">
                  Create professional resumes in under 2 minutes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
  <Button onClick={handleDownloadPDF} size="lg" className="gap-2 shadow-medium">
    <FiDownload /> Download PDF
  </Button>
  <LatexExport resumeData={resumeData} />
</div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel - Form */}
          <div className="bg-card rounded-lg shadow-medium border border-border p-6 h-fit sticky top-8">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <PersonalInfoForm
                  data={resumeData.personal}
                  onChange={(personal) => setResumeData({ ...resumeData, personal })}
                />
              </TabsContent>

              <TabsContent value="education">
                <EducationForm
                  data={resumeData.education}
                  onChange={(education) => setResumeData({ ...resumeData, education })}
                />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(skills) => setResumeData({ ...resumeData, skills })}
                />
              </TabsContent>

              <TabsContent value="projects">
                <ProjectsForm
                  data={resumeData.projects}
                  onChange={(projects) => setResumeData({ ...resumeData, projects })}
                />
              </TabsContent>

              <TabsContent value="experience">
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(experience) => setResumeData({ ...resumeData, experience })}
                />
              </TabsContent>

              <TabsContent value="achievements">
                <AchievementsForm
                  data={resumeData.achievements}
                  onChange={(achievements) => setResumeData({ ...resumeData, achievements })}
                />
              </TabsContent>
            </Tabs>

            {/* Template Selector */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-lg font-bold mb-3">Choose Template</h3>
              <RadioGroup value={template} onValueChange={(value) => setTemplate(value as TemplateType)}>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <RadioGroupItem value="minimal" id="minimal" className="peer sr-only" />
                    <Label
                      htmlFor="minimal"
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                    >
                      <span className="text-sm font-medium">Minimal</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="classic" id="classic" className="peer sr-only" />
                    <Label
                      htmlFor="classic"
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                    >
                      <span className="text-sm font-medium">Classic</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="modern" id="modern" className="peer sr-only" />
                    <Label
                      htmlFor="modern"
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                    >
                      <span className="text-sm font-medium">Modern</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-card rounded-lg shadow-strong border border-border p-6 overflow-auto max-h-[calc(100vh-120px)] sticky top-8">
            <h2 className="text-xl font-bold mb-4 text-foreground">Live Preview</h2>
            <div
            id= "resume-preview" className="transform scale-[0.7] origin-top-left" style={{ width: '142.857%' }}>
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
