
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router-dom";

const emotionalStates = [
  { name: "Enlightenment", color: "bg-enlightenment" },
  { name: "Peace", color: "bg-peace" },
  { name: "Joy", color: "bg-joy" },
  { name: "Love", color: "bg-love" },
  { name: "Reason", color: "bg-reason" },
  { name: "Acceptance", color: "bg-acceptance" },
  { name: "Willingness", color: "bg-willingness" },
  { name: "Neutrality", color: "bg-neutrality" },
  { name: "Courage", color: "bg-courage" },
  { name: "Pride", color: "bg-pride" },
  { name: "Anger", color: "bg-anger" },
  { name: "Desire", color: "bg-desire" },
  { name: "Fear", color: "bg-fear" },
  { name: "Grief", color: "bg-grief" },
  { name: "Apathy", color: "bg-apathy" },
  { name: "Guilt", color: "bg-guilt" },
  { name: "Shame", color: "bg-shame" },
];

export function EmotionalStateSelector() {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const setEmotionalState = useStore((state) => state.setEmotionalState);

  const handleConfirm = () => {
    if (selectedState) {
      const state = emotionalStates.find((s) => s.name === selectedState);
      if (state) {
        setEmotionalState(state);
        navigate("/session");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-georgia">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white text-3xl mb-8 font-georgia"
      >
        how are you feeling?
      </motion.h1>

      <div className="relative w-full max-w-lg">
        <div className="grid grid-cols-1 gap-1">
          {emotionalStates.map((state, index) => (
            <motion.button
              key={state.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedState(state.name)}
              className={`
                ${state.color}
                h-12 w-full 
                transform transition-all duration-200
                hover:scale-105 hover:brightness-110
                ${selectedState === state.name ? "ring-4 ring-white" : ""}
                rounded-sm
              `}
            >
              <span className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm">
                {state.name}
              </span>
            </motion.button>
          ))}
        </div>

        {selectedState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <h2 className="text-white text-xl mb-4">
              You're feeling: {selectedState}
            </h2>
            <Button
              variant="outline"
              className="bg-white text-black hover:bg-gray-100 transition-colors"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
            <p className="text-gray-400 text-sm mt-2">
              You can change this later
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
