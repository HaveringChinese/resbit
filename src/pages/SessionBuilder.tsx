
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/ActivityCard";
import { AudioSettings } from "@/components/AudioSettings";
import { SettingsMenu } from "@/components/SettingsMenu";
import { Menu, Play, Plus, Save } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";

const SessionBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessionName, setSessionName] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const { emotionalState, activities, savedSessions, saveSession, loadSession, deleteSession } = useStore();
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // Redirect if no emotional state is selected
  if (!emotionalState) {
    navigate("/");
    return null;
  }

  const totalDuration = activities.reduce((acc, curr) => acc + curr.duration, 0);
  const currentSession = savedSessions.find(s => s.id === selectedSessionId);

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
    setSelectedSessionId(null);
    setSaveDialogOpen(false);
    toast({
      title: "Success",
      description: "Session saved successfully",
    });
  };

  return (
    <div
      className={`min-h-screen ${emotionalState.color} transition-colors duration-500 flex flex-col`}
    >
      {/* Header */}
      <header className="p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <SettingsMenu />
          <AudioSettings />
        </div>
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
                        setSelectedSessionId(session.id);
                        setSessionName(session.name);
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

      {/* Timeline */}
      <div className="flex-1 overflow-hidden px-4">
        <div className="max-w-2xl mx-auto h-full flex flex-col">
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

      {/* Session Controls */}
      <footer className="shrink-0 bg-black/20 backdrop-blur-sm p-4">
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
                  <DialogTitle>
                    {currentSession ? 'Update Session' : 'Save New Session'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    placeholder="Enter session name"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                  />
                  <Button onClick={handleSaveSession}>
                    {currentSession ? 'Update' : 'Save'} Session
                  </Button>
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
