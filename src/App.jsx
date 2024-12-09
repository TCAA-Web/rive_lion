import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useStateMachineInput,
  Rive,
} from "@rive-app/react-canvas";
import "./app.css";
import { useEffect, useState } from "react";
import { useInterval } from "./hooks/useInterval";
import { ActionButton } from "./components/ActionButton";

export default function App() {
  const [hungerLevel, setHungerLevel] = useState(100);

  const { RiveComponent, rive } = useRive({
    src: "./lion.riv",
    stateMachines: ["controller", "health"],
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    fitCanvasToArtboardHeight: true,
    autoplay: true,
    onStateChange: (s) => {
      console.log(s);
    },
  });

  const eatInput = useStateMachineInput(rive, "controller", "isEating");
  const sadnessInput = useStateMachineInput(rive, "controller", "isSad");
  const hpInput = useStateMachineInput(rive, "health", "hp");

  const feed = () => {
    eatInput.fire();
    if (hungerLevel < 80) {
      setHungerLevel((prev) => prev + 20);
    } else {
      setHungerLevel(100);
    }
  };

  useInterval(() => {
    setHungerLevel((prev) => prev - 1);
    if (rive) {
      rive.setTextRunValue("hp_text", `HP: ${hungerLevel}%`);
    }
    hpInput.value = hungerLevel;
    if (sadnessInput) {
      console.log("hunger: ", hungerLevel);
      if (hungerLevel < 80) {
        sadnessInput.value = true;
      } else if (hungerLevel > 20) {
        sadnessInput.value = false;
      }
    }
  }, 1000);

  console.log(eatInput);
  return (
    <div className="RiveContainer">
      <RiveComponent />
      <ActionButton text="Feed" callback={feed} />
      <p>Hunger Level: {hungerLevel}</p>
      {hungerLevel < 80 && <p>Lion says: "I Am Hungry"</p>}
      {hungerLevel < 40 && <b>Lion says: "I am dying of hunger"</b>}
    </div>
  );
}
