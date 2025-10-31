import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Achievement } from '@/types/resume';

interface AchievementsFormProps {
  data: Achievement[];
  onChange: (data: Achievement[]) => void;
}

export const AchievementsForm = ({ data, onChange }: AchievementsFormProps) => {
  const handleChange = (value: string) => {
    const achievements = value
      .split('\n')
      .filter((a) => a.trim())
      .map((text, index) => ({
        id: index.toString(),
        text,
      }));
    onChange(achievements);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
      
      <div>
        <Label>Achievements (one per line)</Label>
        <Textarea
          value={data.map((a) => a.text).join('\n')}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="• Won National Hackathon 2024&#10;• Published research paper in IEEE&#10;• Google Summer of Code Participant"
          rows={6}
        />
      </div>
    </div>
  );
};
