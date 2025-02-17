
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
  { id: "peaceful", name: "Peaceful Meditation", path: "/audio/music/peaceful.mp3" },
  { id: "nature", name: "Nature Sounds", path: "/audio/music/nature.mp3" },
  { id: "piano", name: "Soft Piano", path: "/audio/music/piano.mp3" },
  { id: "waves", name: "Ocean Waves", path: "/audio/music/waves.mp3" },
];

const transitionSounds = [
  { id: "bell", name: "Meditation Bell", path: "/audio/transitions/bell.mp3" },
  { id: "chime", name: "Wind Chimes", path: "/audio/transitions/chime.mp3" },
  { id: "bowl", name: "Singing Bowl", path: "/audio/transitions/bowl.mp3" },
];

const ambientEffects = [
  { id: "rain", name: "Rainfall", path: "/audio/ambient/rain.mp3" },
  { id: "forest", name: "Forest", path: "/audio/ambient/forest.mp3" },
  { id: "stream", name: "Stream", path: "/audio/ambient/stream.mp3" },
  { id: "white-noise", name: "White Noise", path: "/audio/ambient/white-noise.mp3" },
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
