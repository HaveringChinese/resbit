
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/ActivityCard";
import { AudioSettings } from "@/components/AudioSettings";
import { Settings, Menu, Play, Plus, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

const SessionBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessionName, setSessionName] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const { emotionalState, activities, savedSessions, saveSession, loadSession, deleteSession } = useStore();

  // Redirect if no emotional state is selected
  if (!emotionalState) {
    navigate("/");
    return null;
  }

  const totalDuration = activities.reduce((acc, curr) => acc + curr.duration, 0);

  const handleSaveSession = () => {
    if (!sessionName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a session name",
        variant: "destructive",
      });
      return;
    }
    saveSession(sessionName.trim());
    setSessionName("");
    setSaveDialogOpen(false);
    toast({
      title: "Success",
      description: "Session saved successfully",
    });
  };

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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Saved Sessions</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              {savedSessions.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No saved sessions yet
                </p>
              ) : (
                savedSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 rounded-lg border flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{session.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(session.createdAt, "PPP")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.activities.length} activities
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => deleteSession(session.id)}
                      >
                        Delete
                      </Button>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        loadSession(session.id);
                        toast({
                          title: "Session Loaded",
                          description: "Your session has been loaded successfully",
                        });
                      }}
                    >
                      Load Session
                    </Button>
                  </div>
                ))
              )}
            </div>
          </SheetContent>
        </Sheet>
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
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black hover:bg-white/90"
                >
                  <Save className="mr-2" />
                  Save
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Session</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    placeholder="Enter session name"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                  />
                  <Button onClick={handleSaveSession}>Save Session</Button>
                </div>
              </DialogContent>
            </Dialog>
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
