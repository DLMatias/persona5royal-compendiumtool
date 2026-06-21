import { useEffect, useState } from "react";
import personasData from "../data/personas.json";
import { PersonaEntryContent } from "./PersonaDetails";
import type { Persona } from "../types";

type OwnedPersonas = {
  [personaName: string]: boolean;
};

type PersonaPopupProps = {
  persona: Persona;
  ownedPersonas?: OwnedPersonas;
  toggleOwned?: (personaName: string) => void;
  onClose: () => void;
};

type PersonaNameButtonProps = {
  personaName: string;
  persona?: Persona | null;
  ownedPersonas?: OwnedPersonas;
  toggleOwned?: (personaName: string) => void;
};

const personas = personasData as Persona[];

function PersonaPopup({
  persona,
  ownedPersonas,
  toggleOwned,
  onClose,
}: PersonaPopupProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div
        className="persona-popup"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="popup-header">
          <h3>Compendium Entry</h3>

          <button
            type="button"
            onClick={onClose}
            className="popup-close-button"
          >
            Close
          </button>
        </div>

        <PersonaEntryContent
          persona={persona}
          ownedPersonas={ownedPersonas}
          toggleOwned={toggleOwned}
          title="Persona Details"
        />
      </div>
    </div>
  );
}

export function PersonaNameButton({
  personaName,
  persona,
  ownedPersonas,
  toggleOwned,
}: PersonaNameButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const compendiumPersona =
    persona ?? personas.find((item) => item.name === personaName) ?? null;

  if (!compendiumPersona) {
    return <>{personaName}</>;
  }

  return (
    <>
      <button
        type="button"
        className="persona-link-button"
        onClick={() => setIsOpen(true)}
        title={`Open ${compendiumPersona.name} compendium entry`}
      >
        {personaName}
      </button>

      {isOpen && (
        <PersonaPopup
          persona={compendiumPersona}
          ownedPersonas={ownedPersonas}
          toggleOwned={toggleOwned}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default PersonaPopup;
