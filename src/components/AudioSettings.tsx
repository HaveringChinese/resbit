
import { Button } from "@/components/ui/button";
import { Music2, Volume2, Play, Square } from "lucide-react";
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
import { useState, useEffect, useRef } from "react";

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
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isPlayingTransition, setIsPlayingTransition] = useState(false);
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const transitionAudioRef = useRef<HTMLAudioElement | null>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  // Create or update audio elements when selections change
  useEffect(() => {
    if (audioSettings.musicTrack) {
      const track = musicTracks.find(t => t.id === audioSettings.musicTrack);
      if (track) {
        musicAudioRef.current = new Audio(track.path);
        musicAudioRef.current.loop = true;
        musicAudioRef.current.volume = audioSettings.volume;
      }
    }
    if (audioSettings.transitionSound) {
      const sound = transitionSounds.find(s => s.id === audioSettings.transitionSound);
      if (sound) {
        transitionAudioRef.current = new Audio(sound.path);
        transitionAudioRef.current.loop = true;
        transitionAudioRef.current.volume = audioSettings.volume;
      }
    }
    if (audioSettings.ambientEffect) {
      const effect = ambientEffects.find(e => e.id === audioSettings.ambientEffect);
      if (effect) {
        ambientAudioRef.current = new Audio(effect.path);
        ambientAudioRef.current.loop = true;
        ambientAudioRef.current.volume = audioSettings.volume;
      }
    }

    // Cleanup function
    return () => {
      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
        musicAudioRef.current = null;
      }
      if (transitionAudioRef.current) {
        transitionAudioRef.current.pause();
        transitionAudioRef.current = null;
      }
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
        ambientAudioRef.current = null;
      }
    };
  }, [audioSettings.musicTrack, audioSettings.transitionSound, audioSettings.ambientEffect]);

  // Update volume when it changes
  useEffect(() => {
    if (musicAudioRef.current) musicAudioRef.current.volume = audioSettings.volume;
    if (transitionAudioRef.current) transitionAudioRef.current.volume = audioSettings.volume;
    if (ambientAudioRef.current) ambientAudioRef.current.volume = audioSettings.volume;
  }, [audioSettings.volume]);

  const togglePlay = (type: 'music' | 'transition' | 'ambient') => {
    const audioRef = type === 'music' ? musicAudioRef.current :
                    type === 'transition' ? transitionAudioRef.current :
                    ambientAudioRef.current;
    const setIsPlaying = type === 'music' ? setIsPlayingMusic :
                        type === 'transition' ? setIsPlayingTransition :
                        setIsPlayingAmbient;
    const isPlaying = type === 'music' ? isPlayingMusic :
                     type === 'transition' ? isPlayingTransition :
                     isPlayingAmbient;

    if (audioRef) {
      if (isPlaying) {
        audioRef.pause();
        setIsPlaying(false);
      } else {
        audioRef.play();
        setIsPlaying(true);
      }
    }
  };

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
            <div className="flex gap-2 items-center">
              <Select
                value={audioSettings.musicTrack || ""}
                onValueChange={(value) =>
                  updateAudioSettings({ musicTrack: value })
                }
                className="flex-1"
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
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => togglePlay('music')}
                disabled={!audioSettings.musicTrack}
              >
                {isPlayingMusic ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Transition Sound</Label>
            <div className="flex gap-2 items-center">
              <Select
                value={audioSettings.transitionSound || ""}
                onValueChange={(value) =>
                  updateAudioSettings({ transitionSound: value })
                }
                className="flex-1"
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
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => togglePlay('transition')}
                disabled={!audioSettings.transitionSound}
              >
                {isPlayingTransition ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Ambient Effect</Label>
            <div className="flex gap-2 items-center">
              <Select
                value={audioSettings.ambientEffect || ""}
                onValueChange={(value) =>
                  updateAudioSettings({ ambientEffect: value })
                }
                className="flex-1"
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
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => togglePlay('ambient')}
                disabled={!audioSettings.ambientEffect}
              >
                {isPlayingAmbient ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
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
