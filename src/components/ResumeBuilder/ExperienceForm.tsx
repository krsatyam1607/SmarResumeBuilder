import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Experience } from '@/types/resume';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceForm = ({ data, onChange }: ExperienceFormProps) => {
  const addExperience = () => {
    onChange([
      ...data,
      { id: Date.now().toString(), company: '', role: '', duration: '', points: [''] },
    ]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    onChange(data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Experience</h2>
        <Button onClick={addExperience} size="sm" className="gap-2">
          <FiPlus /> Add Experience
        </Button>
      </div>

      {data.map((exp) => (
        <div key={exp.id} className="p-4 border border-border rounded-lg space-y-3 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeExperience(exp.id)}
            className="absolute top-2 right-2 text-destructive hover:text-destructive"
          >
            <FiTrash2 />
          </Button>

          <div>
            <Label>Company *</Label>
            <Input
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              placeholder="Google"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Role *</Label>
              <Input
                value={exp.role}
                onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <Label>Duration *</Label>
              <Input
                value={exp.duration}
                onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                placeholder="Jan 2023 - Present"
              />
            </div>
          </div>

          <div>
            <Label>Key Points (one per line) *</Label>
            <Textarea
              value={exp.points.join('\n')}
              onChange={(e) =>
                updateExperience(
                  exp.id,
                  'points',
                  e.target.value.split('\n').filter((p) => p.trim())
                )
              }
              placeholder="• Led team of 5 developers&#10;• Increased performance by 40%&#10;• Implemented CI/CD pipeline"
              rows={5}
            />
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          No experience added yet. Click "Add Experience" to get started.
        </p>
      )}
    </div>
  );
};
