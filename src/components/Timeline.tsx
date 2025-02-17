
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActivityCard } from "@/components/ActivityCard";
import { useStore } from "@/store/useStore";

export function Timeline() {
  const { activities } = useStore();

  return (
    <div className="flex-1 overflow-hidden px-4">
      <div className="max-w-2xl mx-auto h-full flex flex-col">
        {/* Add Activity Button - Always visible at the top */}
        <Button
          variant="outline"
          className="w-full bg-white/10 text-white hover:bg-white/20 mb-4"
          onClick={() =>
            useStore.getState().addActivity({ title: "New Activity", duration: 300 })
          }
        >
          <Plus className="mr-2" />
          Add Activity
        </Button>

        {/* Scrollable Activity List */}
        <ScrollArea className="flex-1 -mx-4 px-4">
          <div className="space-y-4 pb-32">
            {activities.map((activity, index) => (
              <ActivityCard 
                key={activity.id} 
                activity={activity} 
                index={index + 1}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
