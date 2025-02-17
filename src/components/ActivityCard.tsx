
import { useState } from "react";
import { Activity, useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";

export const ActivityCard = ({ activity, index }: { activity: Activity; index: number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const updateActivity = useStore((state) => state.updateActivity);
  const removeActivity = useStore((state) => state.removeActivity);

  const handleDurationChange = (change: number) => {
    const newDuration = Math.max(60, activity.duration + change);
    updateActivity(activity.id, { duration: newDuration });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-white/60 text-sm">#{index}</span>
        {isEditing ? (
          <Input
            value={activity.title}
            onChange={(e) =>
              updateActivity(activity.id, { title: e.target.value })
            }
            onBlur={() => setIsEditing(false)}
            className="bg-white/20 border-none text-white"
            autoFocus
          />
        ) : (
          <h3
            className="text-xl font-georgia cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {activity.title}
          </h3>
        )}
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDurationChange(-60)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-20 text-center">
            {Math.floor(activity.duration / 60)}:
            {(activity.duration % 60).toString().padStart(2, "0")}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDurationChange(60)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="icon">
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeActivity(activity.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
