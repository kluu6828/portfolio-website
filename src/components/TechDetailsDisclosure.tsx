"use client";

import { useId, useState, type ReactNode } from "react";

export function TechDetailsDisclosure({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={`tech-details${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="tech-details-summary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="tech-details-label">
          Technical Implementation & Methodology
        </span>
        <span className="tech-details-chevron" aria-hidden>
          ▾
        </span>
      </button>
      <div
        id={panelId}
        className="tech-details-panel"
        role="region"
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className="tech-details-panel-inner">
          <div className="tech-details-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
