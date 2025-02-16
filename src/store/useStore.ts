
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Activity = {
  id: string;
  title: string;
  duration: number;
};

type EmotionalState = {
  name: string;
  color: string;
};

interface AppState {
  emotionalState: EmotionalState | null;
  activities: Activity[];
  setEmotionalState: (state: EmotionalState) => void;
  addActivity: (activity: Omit<Activity, "id">) => void;
  removeActivity: (id: string) => void;
  updateActivity: (id: string, activity: Partial<Activity>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      emotionalState: null,
      activities: [{ id: "1", title: "Breath-work", duration: 300 }], // 5 minutes default
      setEmotionalState: (state) => set({ emotionalState: state }),
      addActivity: (activity) =>
        set((state) => ({
          activities: [
            ...state.activities,
            { ...activity, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      removeActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((a) => a.id !== id),
        })),
      updateActivity: (id, activity) =>
        set((state) => ({
          activities: state.activities.map((a) =>
            a.id === id ? { ...a, ...activity } : a
          ),
        })),
    }),
    {
      name: "resbit-storage",
    }
  )
);
