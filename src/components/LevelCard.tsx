
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, Lock, Star } from "lucide-react";

interface LevelCardProps {
  title: string;
  description: string;
  isLocked?: boolean;
  onStart: () => void;
  level: number;
  icon?: React.ReactNode;
}

export const LevelCard = ({ title, description, isLocked = false, onStart, level, icon }: LevelCardProps) => {
  return (
    <Card className="p-6 card-hover relative overflow-hidden">
      <div className="absolute top-2 right-2 flex items-center gap-2">
        {Array.from({ length: level }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-full bg-primary/10">
          {icon || <LightbulbIcon className="w-6 h-6 text-primary" />}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button
        onClick={onStart}
        disabled={isLocked}
        className="w-full button-bounce"
        variant={isLocked ? "secondary" : "default"}
      >
        {isLocked ? (
          <Lock className="w-4 h-4 mr-2" />
        ) : null}
        {isLocked ? "Bloqueado" : "Começar"}
      </Button>
    </Card>
  );
};
