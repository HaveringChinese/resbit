
import { Button } from "@/components/ui/button";
import { Play, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface SessionControlsProps {
  sessionName: string;
  onSessionNameChange: (name: string) => void;
  saveDialogOpen: boolean;
  onSaveDialogChange: (open: boolean) => void;
  selectedSessionId: string | null;
}

export function SessionControls({
  sessionName,
  onSessionNameChange,
  saveDialogOpen,
  onSaveDialogChange,
  selectedSessionId,
}: SessionControlsProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { activities, saveSession } = useStore();

  // Calculate total duration of all activities
  const totalDuration = activities.reduce((acc, curr) => acc + curr.duration, 0);

  // Handle saving or updating a session
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
    onSessionNameChange("");
    onSaveDialogChange(false);
    toast({
      title: "Success",
      description: "Session saved successfully",
    });
  };

  return (
    <footer className="shrink-0 bg-black/20 backdrop-blur-sm p-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        {/* Duration Display */}
        <div className="text-white">
          <p className="text-sm opacity-80">Total Duration</p>
          <p className="text-xl">
            {Math.floor(totalDuration / 60)}:
            {(totalDuration % 60).toString().padStart(2, "0")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Dialog open={saveDialogOpen} onOpenChange={onSaveDialogChange}>
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
                  {selectedSessionId ? 'Update Session' : 'Save New Session'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input
                  placeholder="Enter session name"
                  value={sessionName}
                  onChange={(e) => onSessionNameChange(e.target.value)}
                />
                <Button onClick={handleSaveSession}>
                  {selectedSessionId ? 'Update' : 'Save'} Session
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
  );
}
