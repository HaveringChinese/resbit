
import { useStore } from "@/store/useStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionHeader } from "@/components/SessionHeader";
import { Timeline } from "@/components/Timeline";
import { SessionControls } from "@/components/SessionControls";

/**
 * SessionBuilder is the main component for creating and editing meditation sessions.
 * It manages the overall layout and state of the session building interface.
 */
const SessionBuilder = () => {
  // Navigation and state management
  const navigate = useNavigate();
  const { emotionalState, loadSession } = useStore();
  
  // Local state for session management
  const [sessionName, setSessionName] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // Redirect if no emotional state is selected
  if (!emotionalState) {
    navigate("/");
    return null;
  }

  // Handle loading a saved session
  const handleLoadSession = (sessionId: string, name: string) => {
    loadSession(sessionId);
    setSelectedSessionId(sessionId);
    setSessionName(name);
  };

  return (
    <div
      className={`min-h-screen ${emotionalState.color} transition-colors duration-500 flex flex-col`}
    >
      {/* Header with settings, audio controls, and saved sessions */}
      <SessionHeader onLoadSession={handleLoadSession} />

      {/* Timeline with activities */}
      <Timeline />

      {/* Footer with session controls */}
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
