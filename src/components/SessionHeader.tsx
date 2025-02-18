
import { Button } from "@/components/ui/button";
import { SettingsMenu } from "@/components/SettingsMenu";
import { AudioSettings } from "@/components/AudioSettings";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useStore } from "@/store/useStore";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface SessionHeaderProps {
  onLoadSession: (sessionId: string, sessionName: string) => void;
}

export function SessionHeader({ onLoadSession }: SessionHeaderProps) {
  const { toast } = useToast();
  const { savedSessions, deleteSession } = useStore();

  return (
    <header className="p-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2">
        <SettingsMenu />
        <AudioSettings />
      </div>

      <div className="text-center">
        <img 
          src="/lovable-uploads/28c14d2c-eba3-460d-99a5-66a4da4b9b9d.png" 
          alt="Resbit Logo" 
          className="h-24 w-24 md:h-36 md:w-36 mx-auto" // Made logo 3x bigger and responsive
        />
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
                      onLoadSession(session.id, session.name);
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
  );
}
