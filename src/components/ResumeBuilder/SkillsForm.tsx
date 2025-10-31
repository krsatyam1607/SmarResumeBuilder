import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Skill } from '@/types/resume';
import { FiPlus, FiTrash2, FiStar } from 'react-icons/fi';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const addSkill = () => {
    onChange([...data, { id: Date.now().toString(), name: '', rating: 3 }]);
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string | number) => {
    onChange(data.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Skills</h2>
        <Button onClick={addSkill} size="sm" className="gap-2">
          <FiPlus /> Add Skill
        </Button>
      </div>

      {data.map((skill) => (
        <div key={skill.id} className="p-4 border border-border rounded-lg space-y-3 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeSkill(skill.id)}
            className="absolute top-2 right-2 text-destructive hover:text-destructive"
          >
            <FiTrash2 />
          </Button>

          <div>
            <Label>Skill Name *</Label>
            <Input
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
              placeholder="JavaScript, React, Python..."
            />
          </div>

          <div>
            <Label>Proficiency Level</Label>
            <div className="flex items-center gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => updateSkill(skill.id, 'rating', star)}
                  className="text-2xl transition-colors"
                >
                  <FiStar
                    className={
                      star <= skill.rating
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground'
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          No skills added yet. Click "Add Skill" to get started.
        </p>
      )}
    </div>
  );
};
