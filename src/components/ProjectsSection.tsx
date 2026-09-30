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
  lightbox?: {
    thumbnail: string;
    full: string;
    title: string;
    helper: string;
    badge?: string;
  };
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

type WorkflowLightbox = {
  thumbnail: string;
  full: string;
  title: string;
  helper: string;
  badge?: string;
};

type StackItem = string | { label: string; struck?: boolean };

type Project = {
  name: string;
  title: string;
  story: string;
  storyHeading?: string;
  storyLightbox?: WorkflowLightbox;
  architecture: ArchitectureStep[];
  architectureHeading?: string;
  stack: StackItem[];
  status?: string;
  githubUrl?: string;
  githubLabel?: string;
  dataPreviews?: DataPreview[];
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
    name: "An enterprise-grade outbound system built on n8n, Apify, and Airtable to automate lead discovery, fit-scoring, and multi-persona outreach across global markets",
    title: "Autonomous Multi-Region GTM Engine & Conversion Optimization",
    storyHeading: "The Objective & Problem",
    story:
      "Solving distribution friction for enterprise sales operations. Standard outreach pipelines suffer from low conversion velocity, high token costs from unnecessary LLM generation, and application fatigue.",
    architectureHeading: "Architectural Evolution (V1 vs. V2)",
    architecture: [
      {
        label: "The V1 Bottleneck",
        detail:
          "Built dynamic LLM resume-tailoring per job posting. Live testing across ~340 sends revealed a ROI bottleneck: heavy Google AI token burn, with minimal lift in enterprise conversion rates versus static master resumes.",
        lightbox: {
          thumbnail: "/projects/instantly-v1-test.png",
          full: "/projects/instantly-v1-test.png",
          title: "Instantly V1 Live Test (~340 Sends)",
          helper: "Scroll or drag to inspect the V1 Instantly send results",
          badge: "Click to inspect V1 Instantly results",
        },
      },
      {
        label: "The V2 Optimization",
        detail:
          "Demoted the LLM from content generation to high-precision classification (Job Fit Scoring). Automated routing of deterministic Master Resumes based on target persona (SE vs. AE).",
        lightbox: {
          thumbnail: "/projects/n8n-v2.png",
          full: "/projects/n8n-v2.png",
          title: "n8n V2 State Flow Architecture",
          helper: "Scroll or drag to inspect the V2 workflow nodes",
          badge: "Click to inspect V2 architecture",
        },
      },
      {
        label: "Human-in-the-Loop Orchestration",
        detail:
          "Generated automated, dynamic LinkedIn outreach scripts for Hiring Managers and Peer ICs directly in the database, reserving manual high-touch execution strictly for Tier 1 targets.",
      },
      {
        label: "Deterministic Execution",
        detail:
          "Runs daily at 8:00 AM EST across APAC (HK/SGP), Canada, and USA markets.",
      },
      {
        label: "Resilience & Infrastructure",
        detail:
          "Self-hosted on PikaPods with batch timer throttling, rate-limit handling, and error-handling fallbacks.",
      },
    ],
    stack: [
      "n8n",
      "Apify",
      "Google AI Studio (Gemini)",
      "Airtable",
      "PikaPods",
      "Instantly",
      "Prospeo",
      "Telegram",
      { label: "Google Drive", struck: true },
      { label: "PDFShift", struck: true },
    ],
    githubUrl: "https://github.com/kluu6828/global-job-outreach-engine",
    githubLabel: "View n8n Workflow JSON & Architecture on GitHub",
    storyLightbox: {
      thumbnail: "/projects/n8n-thumbnail.png",
      full: "/projects/n8n-full.png",
      title: "n8n State Flow Architecture",
      helper: "Scroll or drag to inspect workflow nodes",
      badge: "Click to inspect architecture",
    },
  },
  {
    name: "The Autonomous Pipeline Generator",
    title: "AI-Agent Pipeline & Revenue Recovery Engine",
    status: "In Progress",
    story:
      "Built for Series A-D SaaS and capital equipment manufacturers that leak pipeline daily: inbound signals go cold, SDRs burn hours on manual research, and high-intent accounts sit unattended.\n\nTarget outcomes: recover unworked opportunities before competitors touch them, and cut manual SDR overhead by automating signal → research → personalized outreach.",
    architecture: [
      {
        label: "Signal Intake",
        detail:
          "RSS / funding read-pulls surface net-new buying events (raises, hiring spikes, product launches) as soon as they hit the wire.",
      },
      {
        label: "Bottleneck Agents",
        detail:
          "AI agents score accounts, infer operational bottlenecks, and rank who is most likely to buy, so reps only touch Tier-1 recovery work.",
      },
      {
        label: "Revenue Recovery Push",
        detail:
          "Hyper-personalized outreach sequences land in Clay/n8n with low-overhead 1099/contract execution attached, capturing pipeline that would otherwise expire unworked.",
      },
    ],
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

  const openLightbox = (payload: {
    full: string;
    title: string;
    helper: string;
  }) =>
    setLightbox({
      src: payload.full,
      title: payload.title,
      helper: payload.helper,
    });

  const renderWorkflowThumb = (
    lb: WorkflowLightbox,
    key: string,
  ) => (
    <button
      key={key}
      type="button"
      className="workflow-thumb"
      onClick={() => openLightbox(lb)}
      aria-label={lb.badge ?? "Click to inspect"}
    >
      <Image
        src={lb.thumbnail}
        alt={lb.title}
        width={1241}
        height={230}
        className="workflow-thumb-image"
      />
      <span className="workflow-thumb-badge">
        <span className="workflow-thumb-icon" aria-hidden>
          ↗
        </span>
        {lb.badge ?? "Click to inspect architecture"}
      </span>
    </button>
  );

  return (
    <>
      <h4 id="case-studies" style={{ fontWeight: 700 }}>
        Case Studies
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
                {project.storyHeading && (
                  <>
                    <b>{project.storyHeading}</b>
                    <br />
                    <br />
                  </>
                )}
                {project.story.split("\n\n").map((paragraph, i) => (
                  <span key={i}>
                    {i > 0 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                    {paragraph}
                  </span>
                ))}
                {project.storyLightbox && (
                  <>
                    <br />
                    <br />
                    {renderWorkflowThumb(project.storyLightbox, "story-lb")}
                  </>
                )}
                {project.architecture.length > 0 && (
                  <>
                    <br />
                    <br />
                    <b>{project.architectureHeading ?? "How it works"}</b>
                    <br />
                    {project.architecture.map((step) => (
                      <div key={step.label}>
                        <b>{step.label}:</b> {step.detail}
                        <br />
                        {step.lightbox && (
                          <>
                            <br />
                            {renderWorkflowThumb(
                              step.lightbox,
                              `${step.label}-lb`,
                            )}
                            <br />
                          </>
                        )}
                      </div>
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
                <br />
                <span className="stack">
                  {project.stack.map((tool) => {
                    const label = typeof tool === "string" ? tool : tool.label;
                    const struck =
                      typeof tool === "object" && Boolean(tool.struck);
                    return (
                      <span
                        key={label}
                        className={
                          struck
                            ? "stack-badge stack-badge-struck"
                            : "stack-badge"
                        }
                      >
                        {label}
                      </span>
                    );
                  })}
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
