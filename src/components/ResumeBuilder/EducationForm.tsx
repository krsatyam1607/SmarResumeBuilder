import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Education } from '@/types/resume';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm = ({ data, onChange }: EducationFormProps) => {
  const addEducation = () => {
    onChange([
      ...data,
      { id: Date.now().toString(), degree: '', college: '', year: '', cgpa: '' },
    ]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Education</h2>
        <Button onClick={addEducation} size="sm" className="gap-2">
          <FiPlus /> Add Education
        </Button>
      </div>

      {data.map((edu) => (
        <div key={edu.id} className="p-4 border border-border rounded-lg space-y-3 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeEducation(edu.id)}
            className="absolute top-2 right-2 text-destructive hover:text-destructive"
          >
            <FiTrash2 />
          </Button>

          <div>
            <Label>Degree/Program *</Label>
            <Input
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              placeholder="B.Tech in Computer Science"
            />
          </div>

          <div>
            <Label>College/University *</Label>
            <Input
              value={edu.college}
              onChange={(e) => updateEducation(edu.id, 'college', e.target.value)}
              placeholder="MIT"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Year *</Label>
              <Input
                value={edu.year}
                onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                placeholder="2021-2025"
              />
            </div>
            <div>
              <Label>CGPA/Percentage</Label>
              <Input
                value={edu.cgpa}
                onChange={(e) => updateEducation(edu.id, 'cgpa', e.target.value)}
                placeholder="8.5/10"
              />
            </div>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          No education added yet. Click "Add Education" to get started.
        </p>
      )}
    </div>
  );
};
