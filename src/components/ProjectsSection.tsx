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
import {
  BusinessArchitectureMetrics,
  caseStudy01Architecture,
  caseStudy02Architecture,
  caseStudy03Architecture,
  type ArchStage,
} from "@/components/BusinessArchitectureMetrics";
import { TechDetailsDisclosure } from "@/components/TechDetailsDisclosure";

type ArchitectureStep = {
  label: string;
  detail: string;
  sectionHeading?: string;
  bullets?: { label: string; detail: string }[];
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
  businessArchitecture?: {
    stages: ArchStage[];
    metrics: string[];
  };
  collapseTechnicalDetails?: boolean;
};

const projects: Project[] = [
  {
    name: "The Enterprise GTM & Waterfall Enrichment Engine",
    title: "Autonomous B2B Lead Generation & Waterfall Enrichment Pipeline",
    story:
      "Built for a CapEx system client in Boston, MA (in partnership with a managing partner of red light vertical booths).",
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
    businessArchitecture: caseStudy01Architecture,
    collapseTechnicalDetails: true,
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
    title:
      "Enterprise Outbound Automation & Multi-Persona Pipeline Architecture",
    storyHeading: "Cost Optimization & Conversion Acceleration",
    story:
      "Enterprise outbound pipelines stall when generative LLMs sit in the critical path—inflating token cost without moving reply rate.\n\nV1 friction: high LLM token burn with minimal lift in cold response rate (~340 live sends).\n\nV2 fix: LLM demoted strictly to Account Fit Scoring & Lead Routing, driving 90% of pipeline velocity with 0% rate-limit downtime.",
    architectureHeading: "Architectural Evolution (V1 → V2)",
    architecture: [
      {
        label: "V1 Friction",
        detail:
          "LLM-generated messaging sat in the send path. Live testing across ~340 Instantly sends exposed the cost curve: heavy Google AI token burn with minimal lift in cold response rate versus deterministic persona assets.",
        lightbox: {
          thumbnail: "/projects/instantly-v1-test.png",
          full: "/projects/instantly-v1-test.png",
          title: "Instantly V1 Live Test (~340 Sends)",
          helper: "Scroll or drag to inspect the V1 Instantly send results",
          badge: "Click to inspect V1 Instantly results",
        },
      },
      {
        label: "V2 Fix",
        detail:
          "Demoted the LLM strictly to Account Fit Scoring & Lead Routing. Deterministic multi-persona assets (SE vs. AE) are selected and dispatched—no generative rewrite in the critical path—preserving reply quality while collapsing token spend and rate-limit risk.",
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
          "Stages dynamic LinkedIn outreach scripts for economic buyers and peer influencers directly in Airtable, reserving manual high-touch send execution strictly for Tier 1 accounts.",
      },
      {
        sectionHeading:
          "Architectural Exploration (V3 Vision vs. Pragmatic Scope)",
        label: "V3 Exploration",
        detail:
          "Explored collapsing the remaining manual send step into a fully autonomous multi-channel agent—Playwright/Browserless resolving gated offsite destinations and drafting dynamic LLM responses without human intervention.",
      },
      {
        label: "Pragmatic Tradeoff",
        detail:
          "Technical validation showed that full send-path automation introduced unacceptable enterprise risk for marginal velocity gains:",
        bullets: [
          {
            label: "Account Safety",
            detail:
              "Authenticated LinkedIn navigation to resolve gated offsite destinations triggers anti-bot telemetry, risking permanent sender-account restrictions.",
          },
          {
            label: "Diminishing ROI",
            detail:
              "Gated redirects and modal edge cases create scraper fragility, requiring heavy maintenance for marginal time savings over a short human-in-the-loop send.",
          },
        ],
      },
      {
        label: "Decision",
        detail:
          "Bound automation to Data Ingestion, Account Fit Scoring, Persona Routing, and Message Staging. Preserved a ~10-second manual send step for Tier 1 outreach—delivering 90% of full-automation velocity with 100% account security and 0% rate-limit downtime.",
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
    businessArchitecture: caseStudy02Architecture,
    collapseTechnicalDetails: true,
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
      "Built for Series A-D SaaS companies that leak pipeline daily: inbound signals go cold, SDRs burn hours on manual research, and high-intent accounts sit unattended.\n\nTarget outcomes: recover unworked opportunities before competitors touch them, and cut manual SDR overhead by automating signal → research → personalized outreach.",
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
          "Hyper-personalized outreach sequences land in Clay/n8n with low-overhead autonomous execution attached, capturing pipeline that would otherwise expire unworked.",
      },
    ],
    stack: ["n8n", "AI Agents", "RSS Feeds", "Clay"],
    businessArchitecture: caseStudy03Architecture,
    collapseTechnicalDetails: true,
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
      {/* Native img so replaced public/ assets show without Next image cache */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={lb.thumbnail}
        alt={lb.title}
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
            <tr key={project.title} id={`case-study-${index + 1}`}>
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
                {project.businessArchitecture ? (
                  <BusinessArchitectureMetrics
                    stages={project.businessArchitecture.stages}
                    metrics={project.businessArchitecture.metrics}
                  />
                ) : (
                  <>
                    <br />
                    <br />
                  </>
                )}
                {(() => {
                  const storyBlock = (
                    <>
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
                          {renderWorkflowThumb(
                            project.storyLightbox,
                            "story-lb",
                          )}
                        </>
                      )}
                    </>
                  );

                  const architectureBlock =
                    project.architecture.length > 0 ? (
                      <>
                        <br />
                        <br />
                        <b>{project.architectureHeading ?? "How it works"}</b>
                        <br />
                        {project.architecture.map((step) => (
                          <div
                            key={step.label}
                            className={
                              step.sectionHeading
                                ? "arch-step arch-step-section"
                                : "arch-step"
                            }
                          >
                            {step.sectionHeading && (
                              <p className="arch-section-heading">
                                <b>{step.sectionHeading}</b>
                              </p>
                            )}
                            <p className="arch-step-body">
                              <b>{step.label}:</b> {step.detail}
                            </p>
                            {step.bullets && step.bullets.length > 0 && (
                              <ul className="arch-bullets">
                                {step.bullets.map((bullet) => (
                                  <li key={bullet.label}>
                                    <b>{bullet.label}:</b> {bullet.detail}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {step.lightbox && (
                              <div className="arch-step-media">
                                {renderWorkflowThumb(
                                  step.lightbox,
                                  `${step.label}-lb`,
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    ) : null;

                  const dataPreviewsBlock =
                    project.dataPreviews &&
                    project.dataPreviews.length > 0 ? (
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
                                <span
                                  className="workflow-thumb-icon"
                                  aria-hidden
                                >
                                  ↗
                                </span>
                                Click to inspect data output
                              </span>
                            </button>
                          ))}
                        </div>
                      </>
                    ) : null;

                  const githubLink = project.githubUrl ? (
                    <a
                      className="project-github"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="project-github-pointer"
                        viewBox="0 0 16 16"
                        width="12"
                        height="12"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          fill="currentColor"
                          d="M3.1 1.2a.6.6 0 0 1 .66-.07l10.2 5.7a.6.6 0 0 1-.08 1.1L9.4 9.4l1.95 4.2a.6.6 0 0 1-1.1.5L8.2 9.7 5.3 12.3a.6.6 0 0 1-.98-.37V1.75c0-.2.1-.39.28-.55Z"
                        />
                      </svg>
                      <span>
                        {project.githubLabel ??
                          "View Architecture & Code on Github"}
                      </span>
                    </a>
                  ) : null;

                  const stackBlock = (
                    <span className="stack">
                      {project.stack.map((tool) => {
                        const label =
                          typeof tool === "string" ? tool : tool.label;
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
                  );

                  if (project.collapseTechnicalDetails) {
                    return (
                      <>
                        <TechDetailsDisclosure>
                          {githubLink && (
                            <div className="tech-details-github">
                              {githubLink}
                            </div>
                          )}
                          {storyBlock}
                          {architectureBlock}
                          {dataPreviewsBlock}
                          <div className="tech-details-stack">{stackBlock}</div>
                        </TechDetailsDisclosure>
                        <div className="project-case-end" />
                      </>
                    );
                  }

                  return (
                    <>
                      {storyBlock}
                      {architectureBlock}
                      {dataPreviewsBlock}
                      <br />
                      {stackBlock}
                      {githubLink && (
                        <>
                          <br />
                          <br />
                          {githubLink}
                        </>
                      )}
                      <br />
                      <br />
                    </>
                  );
                })()}
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
