
import { useStore } from "@/store/useStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionHeader } from "@/components/SessionHeader";
import { Timeline } from "@/components/Timeline";
import { SessionControls } from "@/components/SessionControls";
import { useToast } from "@/components/ui/use-toast";

const SessionBuilder = () => {
  const navigate = useNavigate();
  const { emotionalState, loadSession } = useStore();
  const { toast } = useToast();
  
  const [sessionName, setSessionName] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const handleLoadSession = (sessionId: string, sessionName: string) => {
    loadSession(sessionId);
    setSessionName(sessionName);
    setSelectedSessionId(sessionId);
    toast({
      title: "Session Loaded",
      description: "Your session has been loaded successfully",
    });
  };

  if (!emotionalState) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <SessionHeader onLoadSession={handleLoadSession} />
      <Timeline />
      <SessionControls
        sessionName={sessionName}
        onSessionNameChange={setSessionName}
        saveDialogOpen={saveDialogOpen}
        onSaveDialogChange={setSaveDialogOpen}
        selectedSessionId={selectedSessionId}
      />
    </div>
  );
};

export default SessionBuilder;
