
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/ActivityCard";
import { AudioSettings } from "@/components/AudioSettings";
import { Settings, Menu, Play, Plus, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SessionBuilder = () => {
  const navigate = useNavigate();
  const { emotionalState, activities } = useStore();

  // Redirect if no emotional state is selected
  if (!emotionalState) {
    navigate("/");
    return null;
  }

  const totalDuration = activities.reduce((acc, curr) => acc + curr.duration, 0);

  return (
    <div
      className={`min-h-screen ${emotionalState.color} transition-colors duration-500`}
    >
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6 text-white" />
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-georgia text-white">Resbit</h1>
          <p className="text-white/80">rest for a bit!</p>
        </div>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6 text-white" />
        </Button>
      </header>

      <AudioSettings />

      {/* Timeline */}
      <main className="max-w-2xl mx-auto p-4 space-y-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
        
        <Button
          variant="outline"
          className="w-full bg-white/10 text-white hover:bg-white/20"
          onClick={() =>
            useStore.getState().addActivity({ title: "New Activity", duration: 300 })
          }
        >
          <Plus className="mr-2" />
          Add Activity
        </Button>
      </main>

      {/* Session Controls */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="text-white">
            <p className="text-sm opacity-80">Total Duration</p>
            <p className="text-xl">
              {Math.floor(totalDuration / 60)}:{(totalDuration % 60)
                .toString()
                .padStart(2, "0")}
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-black hover:bg-white/90"
            >
              <Save className="mr-2" />
              Save
            </Button>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90"
              onClick={() => navigate("/play")}
            >
              <Play className="mr-2" />
              Start Session
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SessionBuilder;
