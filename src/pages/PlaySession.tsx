
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Pause, Play, SkipForward, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const PlaySession = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { emotionalState, activities, audioSettings } = useStore();
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentActivity = activities[currentActivityIndex];

  // Redirect if no emotional state is selected
  if (!emotionalState || activities.length === 0) {
    navigate("/session");
    return null;
  }

  useEffect(() => {
    // Set initial time
    setTimeRemaining(currentActivity.duration);

    // Initialize audio elements
    const music = new Audio(); // Would connect to actual audio file
    const ambient = new Audio(); // Would connect to actual audio file
    
    // Set volume
    music.volume = audioSettings.volume;
    ambient.volume = audioSettings.volume;

    // Cleanup function
    return () => {
      music.pause();
      ambient.pause();
    };
  }, [currentActivity, audioSettings.volume]);

  useEffect(() => {
    if (!isPaused && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Move to next activity or end session
            if (currentActivityIndex < activities.length - 1) {
              setCurrentActivityIndex((prev) => prev + 1);
              // Would play transition sound here
              return activities[currentActivityIndex + 1].duration;
            } else {
              // End session
              clearInterval(timer);
              toast({
                title: "Session Complete",
                description: "Great job completing your session!",
              });
              navigate("/session");
            }
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, isPaused, currentActivityIndex, activities.length]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white"
        onClick={() => navigate("/session")}
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="w-full max-w-md text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-georgia text-white">
            {currentActivity.title}
          </h1>
          <p className="text-white/80 text-xl">
            {Math.floor(timeRemaining / 60)}:
            {(timeRemaining % 60).toString().padStart(2, "0")}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            className={`${emotionalState.color} text-white hover:opacity-90 w-16 h-16 rounded-full`}
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <Play className="h-8 w-8" />
            ) : (
              <Pause className="h-8 w-8" />
            )}
          </Button>

          {currentActivityIndex < activities.length - 1 && (
            <Button
              size="lg"
              variant="outline"
              className={`${emotionalState.color} text-white hover:opacity-90 w-12 h-12 rounded-full`}
              onClick={() => {
                setCurrentActivityIndex((prev) => prev + 1);
                setTimeRemaining(activities[currentActivityIndex + 1].duration);
              }}
            >
              <SkipForward className="h-6 w-6" />
            </Button>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-white/60 text-sm">
            Activity {currentActivityIndex + 1} of {activities.length}
          </p>
          {currentActivityIndex < activities.length - 1 && (
            <p className="text-white/60 text-sm">
              Next: {activities[currentActivityIndex + 1].title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaySession;
