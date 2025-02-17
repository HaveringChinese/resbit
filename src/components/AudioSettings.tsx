import { Button } from "@/components/ui/button";
import { Music2, Volume2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useStore } from "@/store/useStore";
import { Label } from "@/components/ui/label";

const musicTracks = [
  { id: "peaceful", name: "Peaceful Meditation" },
  { id: "nature", name: "Nature Sounds" },
  { id: "piano", name: "Soft Piano" },
  { id: "waves", name: "Ocean Waves" },
];

const transitionSounds = [
  { id: "bell", name: "Meditation Bell" },
  { id: "chime", name: "Wind Chimes" },
  { id: "bowl", name: "Singing Bowl" },
];

const ambientEffects = [
  { id: "rain", name: "Rainfall" },
  { id: "forest", name: "Forest" },
  { id: "stream", name: "Stream" },
  { id: "white-noise", name: "White Noise" },
];

export function AudioSettings() {
  const { audioSettings, updateAudioSettings } = useStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Music2 className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Audio Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Music Track</Label>
            <Select
              value={audioSettings.musicTrack || ""}
              onValueChange={(value) =>
                updateAudioSettings({ musicTrack: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a music track" />
              </SelectTrigger>
              <SelectContent>
                {musicTracks.map((track) => (
                  <SelectItem key={track.id} value={track.id}>
                    {track.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Transition Sound</Label>
            <Select
              value={audioSettings.transitionSound || ""}
              onValueChange={(value) =>
                updateAudioSettings({ transitionSound: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a transition sound" />
              </SelectTrigger>
              <SelectContent>
                {transitionSounds.map((sound) => (
                  <SelectItem key={sound.id} value={sound.id}>
                    {sound.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Ambient Effect</Label>
            <Select
              value={audioSettings.ambientEffect || ""}
              onValueChange={(value) =>
                updateAudioSettings({ ambientEffect: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an ambient effect" />
              </SelectTrigger>
              <SelectContent>
                {ambientEffects.map((effect) => (
                  <SelectItem key={effect.id} value={effect.id}>
                    {effect.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Volume
            </Label>
            <Slider
              value={[audioSettings.volume * 100]}
              onValueChange={([value]) =>
                updateAudioSettings({ volume: value / 100 })
              }
              max={100}
              step={1}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
