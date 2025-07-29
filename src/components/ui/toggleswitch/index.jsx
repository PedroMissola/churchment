"use client";

import { useEffect, useState } from "react";
import { Tabs } from "@material-tailwind/react";

/**
 * BillingCycleToggle Component
 * A customizable toggle switch using Material Tailwind Tabs (v3 API).
 *
 * @param {object} props - Component props.
 * @param {"annual" | "monthly"} [props.value="annual"] - The currently selected option.
 * @param {(value: "annual" | "monthly") => void} [props.onChange] - Callback function when the selected option changes.
 */

export function ToggleSwitch({ value = "annual", onChange }) {
  const [current, setCurrent] = useState(value);
  useEffect(() => {
    setCurrent(value);
  }, [value]);

  const handleChange = (v) => {
    setCurrent(v);
    onChange?.(v);
  };

  return (
    <Tabs value={current} className="mx-auto">
      <Tabs.List
        className="w-fit rounded-xl bg-gray-100 p-1"
      >
        {/* O antigo Tab agora é Tabs.Trigger */}
        <Tabs.Trigger
          value="annual"
          onClick={() => handleChange("annual")}
          className={`px-8 py-2 rounded-xl transition-colors duration-200 text-base font-semibold ${ 
            current === "annual" ? "text-gray-900" : "text-gray-500"
          }`}
        >
          Anual
        </Tabs.Trigger>

        <Tabs.Trigger
          value="monthly"
          onClick={() => handleChange("monthly")}
          className={`px-8 py-2 rounded-xl transition-colors duration-200 text-base font-medium ${ // Classes para o rótulo "Mensal"
            current === "monthly" ? "text-gray-900" : "text-gray-500" // Cor do texto baseada na seleção
          }`}
        >
          Mensal
        </Tabs.Trigger>

        <Tabs.TriggerIndicator
          className="rounded-xl bg-white shadow-md" // O 'thumb' branco que desliza, com sombra
        />
      </Tabs.List>
    </Tabs>
  );
}