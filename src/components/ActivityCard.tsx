
import { useState } from "react";
import { Activity, useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";

export const ActivityCard = ({ activity, index }: { activity: Activity; index: number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const updateActivity = useStore((state) => state.updateActivity);
  const removeActivity = useStore((state) => state.removeActivity);
  const emotionalState = useStore((state) => state.emotionalState);

  const handleDurationChange = (change: number) => {
    const newDuration = Math.max(60, activity.duration + change);
    updateActivity(activity.id, { duration: newDuration });
  };

  return (
    <div className={`${emotionalState?.color} bg-opacity-10 backdrop-blur-sm rounded-lg p-3 sm:p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-white text-sm">#{index}</span>
        {isEditing ? (
          <Input
            value={activity.title}
            onChange={(e) =>
              updateActivity(activity.id, { title: e.target.value })
            }
            onBlur={() => setIsEditing(false)}
            className="bg-white/20 border-none text-white min-w-0"
            autoFocus
          />
        ) : (
          <h3
            className="text-lg sm:text-xl font-georgia cursor-pointer text-white truncate"
            onClick={() => setIsEditing(true)}
          >
            {activity.title}
          </h3>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDurationChange(-60)}
            className="text-white h-8 w-8 sm:h-9 sm:w-9"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-16 sm:w-20 text-center text-white">
            {Math.floor(activity.duration / 60)}:
            {(activity.duration % 60).toString().padStart(2, "0")}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDurationChange(60)}
            className="text-white h-8 w-8 sm:h-9 sm:w-9"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white h-8 w-8 sm:h-9 sm:w-9"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white h-8 w-8 sm:h-9 sm:w-9"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeActivity(activity.id)}
            className="text-white h-8 w-8 sm:h-9 sm:w-9"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
