
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";

export function SettingsMenu() {
  const navigate = useNavigate();
  const { emotionalState } = useStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Current Mood</h3>
            <p className="text-sm text-muted-foreground">
              {emotionalState?.name}
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Change Mood State
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
