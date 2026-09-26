"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

type ArchitectureStep = {
  label: string;
  detail: string;
};

type LightboxPayload = {
  src: string;
  title: string;
  helper: string;
};

type DataPreview = {
  src: string;
  label: string;
  title: string;
  helper: string;
};

type Project = {
  name: string;
  title: string;
  story: string;
  architecture: ArchitectureStep[];
  stack: string[];
  status?: string;
  githubUrl?: string;
  githubLabel?: string;
  dataPreviews?: DataPreview[];
  workflowLightbox?: {
    thumbnail: string;
    full: string;
    title: string;
    helper: string;
  };
};

const projects: Project[] = [
  {
    name: "The Enterprise GTM & Waterfall Enrichment Engine",
    title: "Autonomous B2B Lead Generation & Waterfall Enrichment Pipeline",
    story:
      "Built for a Red Light Therapy system client in Boston, MA (in partnership with a managing partner and ex-owner of Suncapsule).",
    architecture: [
      {
        label: "Ingestion",
        detail: "Processes raw Outscraper gym data for targeted U.S. states.",
      },
      {
        label: "Filtering & Tiering",
        detail:
          "Scripts built via Cursor segment accounts and score independent operators into fit tiers based on website indicators.",
      },
      {
        label: "Waterfall Enrichment",
        detail:
          "Passes qualified data to Clay and Instantly to automate cold outreach at scale.",
      },
    ],
    stack: ["Cursor", "Outscraper", "Clay", "Instantly", "Python", "Serper"],
    githubUrl: "https://github.com/kluu6828/b2b-lead-gen-waterfall-engine",
    githubLabel: "View Architecture & Code on Github",
    dataPreviews: [
      {
        src: "/projects/market-analysis-mapping.png",
        label: "Market sizing by state",
        title: "Master Market-Sizing Summary (State-by-State)",
        helper: "Scroll or drag to inspect the market-sizing table",
      },
      {
        src: "/projects/account-data-enrichment.png",
        label: "Fit-scored & enriched accounts",
        title: "Fit-Scored Accounts & Waterfall Enrichment",
        helper:
          "Scroll or drag to inspect fit scores and Serper/Clay-enriched emails",
      },
    ],
  },
  {
    name: "The Semi-Autonomous Job Search & Outreach Engine (Human in the Loop)",
    title:
      "Global Multi-Region Job Application & Persona-Tailored Outreach System",
    story:
      "Built to solve application fatigue. A deterministic n8n state flow engine running daily at 8:00 AM EST across APAC (HK/SGP), Canada (Toronto), and the USA (TX/FL/NYC).",
    architecture: [
      {
        label: "Scraping & Matching",
        detail:
          "Apify scrapes LinkedIn job listings; LLMs evaluate job-fit scores and prioritize Tier 1 targets.",
      },
      {
        label: "Dynamic Tailoring",
        detail:
          "Automatically tailors resumes and crafts multi-persona DMs (hiring managers, ICs, recruiters) with custom hooks and CTAs.",
      },
      {
        label: "Resilience & Scale",
        detail:
          "Hosted on PikaPods (firewall-friendly for travel to China), utilizing batch timers and rate-limit handling across Gemini, PDFShift, Prospeo, Apollo, and Instantly.",
      },
    ],
    stack: [
      "n8n",
      "Apify",
      "LLMs",
      "Airtable",
      "PikaPods",
      "Google AI Studio",
      "Telegram",
    ],
    githubUrl: "https://github.com/kluu6828/global-job-outreach-engine",
    githubLabel: "View n8n Workflow JSON & Architecture on GitHub",
    workflowLightbox: {
      thumbnail: "/projects/n8n-thumbnail.png",
      full: "/projects/n8n-full.png",
      title: "n8n State Flow Architecture",
      helper: "Scroll or drag to inspect workflow nodes",
    },
  },
  {
    name: "The Autonomous Pipeline Generator",
    title: "AI-Agent Pipeline & Revenue Recovery Engine",
    status: "In Progress",
    story:
      "Designed for Series A–D SaaS and capital equipment manufacturers. Deploys RSS read-pulls for funding signals, runs AI agents to detect current operational bottlenecks, and generates hyper-personalized outreach. Focuses on selling low-overhead 1099/contract execution to capture unattended pipeline they are losing daily.",
    architecture: [],
    stack: ["n8n", "AI Agents", "RSS Feeds", "Clay"],
  },
];

function InspectLightbox({
  open,
  onClose,
  fullSrc,
  title,
  helper,
  initialZoom = 1.25,
}: {
  open: boolean;
  onClose: () => void;
  fullSrc: string;
  title: string;
  helper: string;
  initialZoom?: number;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const [dragging, setDragging] = useState(false);
  const [zoom, setZoom] = useState(initialZoom);
  const [naturalSize, setNaturalSize] = useState({ width: 2720, height: 504 });

  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 4;
  const ZOOM_STEP = 0.25;

  const clampZoom = (value: number) =>
    Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(value * 100) / 100));

  const applyZoom = useCallback(
    (nextZoom: number, origin?: { x: number; y: number }) => {
      const el = scrollerRef.current;
      const clamped = clampZoom(nextZoom);
      if (!el) {
        setZoom(clamped);
        return;
      }

      const prevZoom = zoom;
      const rect = el.getBoundingClientRect();
      const anchorX = origin?.x ?? rect.left + rect.width / 2;
      const anchorY = origin?.y ?? rect.top + rect.height / 2;
      const relX = anchorX - rect.left;
      const relY = anchorY - rect.top;
      const contentX = (el.scrollLeft + relX) / prevZoom;
      const contentY = (el.scrollTop + relY) / prevZoom;

      setZoom(clamped);

      requestAnimationFrame(() => {
        el.scrollLeft = contentX * clamped - relX;
        el.scrollTop = contentY * clamped - relY;
      });
    },
    [zoom],
  );

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setZoom(initialZoom);

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, initialZoom]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        applyZoom(zoom + ZOOM_STEP);
      }
      if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        applyZoom(zoom - ZOOM_STEP);
      }
      if (event.key === "0") {
        event.preventDefault();
        applyZoom(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, applyZoom, zoom]);

  useEffect(() => {
    if (!open) return;
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      event.preventDefault();
      const direction = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      applyZoom(zoom + direction, { x: event.clientX, y: event.clientY });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open, zoom, applyZoom]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: el.scrollLeft,
      scrollTop: el.scrollTop,
    };
    setDragging(true);
    el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    const state = dragState.current;
    if (!el || !state.active) return;
    el.scrollLeft = state.scrollLeft - (event.clientX - state.startX);
    el.scrollTop = state.scrollTop - (event.clientY - state.startY);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    dragState.current.active = false;
    setDragging(false);
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
  };

  const onBackdropClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  if (!open) return null;

  const displayWidth = naturalSize.width * zoom;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inspect-lightbox-title"
      onClick={onBackdropClick}
    >
      <div className="mb-4 flex w-full max-w-[96vw] items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            id="inspect-lightbox-title"
            className="text-lg font-semibold tracking-tight text-white md:text-xl"
          >
            {title}
          </h3>
          <p className="mt-1 text-sm text-neutral-400">
            {helper} · ⌘/Ctrl + scroll to zoom · +/− keys
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center overflow-hidden rounded-lg border border-white/15 bg-white/5">
            <button
              type="button"
              onClick={() => applyZoom(zoom - ZOOM_STEP)}
              className="h-10 w-10 text-lg text-white transition-colors hover:bg-white/10"
              aria-label="Zoom out"
            >
              −
            </button>
            <span className="min-w-[3.5rem] border-x border-white/10 px-2 text-center text-sm tabular-nums text-neutral-300">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => applyZoom(zoom + ZOOM_STEP)}
              className="h-10 w-10 text-lg text-white transition-colors hover:bg-white/10"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => applyZoom(1)}
              className="h-10 border-l border-white/10 px-3 text-xs text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Reset zoom"
            >
              Reset
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl leading-none text-white transition-colors hover:bg-white/10"
            aria-label="Close lightbox"
          >
            ×
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`max-h-[85vh] w-full max-w-[96vw] overflow-x-auto overflow-y-auto rounded-xl border border-white/10 bg-neutral-900/50 p-4 ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ touchAction: "none" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fullSrc}
          alt={title}
          className="workflow-lightbox-image select-none"
          draggable={false}
          onLoad={(event) => {
            const img = event.currentTarget;
            setNaturalSize({
              width: img.naturalWidth,
              height: img.naturalHeight,
            });
          }}
          style={{
            maxWidth: "none",
            width: `${displayWidth}px`,
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [lightbox, setLightbox] = useState<LightboxPayload | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <>
      <h4 id="projects" style={{ fontWeight: 700 }}>
        Projects
      </h4>

      <table className="projects-table">
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.title}>
              <td className="project-index">
                <span className="project-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </td>
              <td className="project-body">
                <span className="paper">{project.title}</span>
                <br />
                {project.name}
                {project.status ? ` · ${project.status}` : ""}.
                <br />
                <br />
                {project.story}
                {project.architecture.length > 0 && (
                  <>
                    <br />
                    <br />
                    <b>How it works</b>
                    <br />
                    {project.architecture.map((step) => (
                      <span key={step.label}>
                        <b>{step.label}:</b> {step.detail}
                        <br />
                      </span>
                    ))}
                  </>
                )}
                {project.dataPreviews && project.dataPreviews.length > 0 && (
                  <>
                    <br />
                    <br />
                    <div className="data-preview-grid">
                      {project.dataPreviews.map((preview) => (
                        <button
                          key={preview.src}
                          type="button"
                          className="data-preview-thumb"
                          onClick={() =>
                            setLightbox({
                              src: preview.src,
                              title: preview.title,
                              helper: preview.helper,
                            })
                          }
                          aria-label={`Click to inspect data output: ${preview.label}`}
                        >
                          <Image
                            src={preview.src}
                            alt={preview.label}
                            width={1400}
                            height={700}
                            className="data-preview-image"
                          />
                          <span className="data-preview-caption">
                            {preview.label}
                          </span>
                          <span className="workflow-thumb-badge">
                            <span className="workflow-thumb-icon" aria-hidden>
                              ↗
                            </span>
                            Click to inspect data output
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {project.workflowLightbox && (
                  <>
                    <br />
                    <br />
                    <button
                      type="button"
                      className="workflow-thumb"
                      onClick={() =>
                        setLightbox({
                          src: project.workflowLightbox!.full,
                          title: project.workflowLightbox!.title,
                          helper: project.workflowLightbox!.helper,
                        })
                      }
                      aria-label="Click to inspect architecture"
                    >
                      <Image
                        src={project.workflowLightbox.thumbnail}
                        alt="n8n workflow architecture thumbnail"
                        width={1241}
                        height={230}
                        className="workflow-thumb-image"
                      />
                      <span className="workflow-thumb-badge">
                        <span className="workflow-thumb-icon" aria-hidden>
                          ↗
                        </span>
                        Click to inspect architecture
                      </span>
                    </button>
                  </>
                )}
                <br />
                <span className="stack">
                  {project.stack.map((tool) => (
                    <span key={tool} className="stack-badge">
                      {tool}
                    </span>
                  ))}
                </span>
                {project.githubUrl && (
                  <>
                    <br />
                    <br />
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      [
                      {project.githubLabel ??
                        "View Architecture & Code on Github"}
                      ]
                    </a>
                  </>
                )}
                <br />
                <br />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <InspectLightbox
        open={lightbox !== null}
        onClose={closeLightbox}
        fullSrc={lightbox?.src ?? ""}
        title={lightbox?.title ?? ""}
        helper={lightbox?.helper ?? ""}
        initialZoom={1.15}
      />
    </>
  );
}
