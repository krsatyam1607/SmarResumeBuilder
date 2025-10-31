import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/resume';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm = ({ data, onChange }: ProjectsFormProps) => {
  const addProject = () => {
    onChange([
      ...data,
      { id: Date.now().toString(), title: '', techStack: '', description: '' },
    ]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter((project) => project.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(
      data.map((project) => (project.id === id ? { ...project, [field]: value } : project))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
        <Button onClick={addProject} size="sm" className="gap-2">
          <FiPlus /> Add Project
        </Button>
      </div>

      {data.map((project) => (
        <div key={project.id} className="p-4 border border-border rounded-lg space-y-3 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeProject(project.id)}
            className="absolute top-2 right-2 text-destructive hover:text-destructive"
          >
            <FiTrash2 />
          </Button>

          <div>
            <Label>Project Title *</Label>
            <Input
              value={project.title}
              onChange={(e) => updateProject(project.id, 'title', e.target.value)}
              placeholder="E-commerce Platform"
            />
          </div>

          <div>
            <Label>Tech Stack *</Label>
            <Input
              value={project.techStack}
              onChange={(e) => updateProject(project.id, 'techStack', e.target.value)}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <Label>Description *</Label>
            <Textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              placeholder="Describe your project, features, and impact..."
              rows={3}
            />
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          No projects added yet. Click "Add Project" to get started.
        </p>
      )}
    </div>
  );
};
