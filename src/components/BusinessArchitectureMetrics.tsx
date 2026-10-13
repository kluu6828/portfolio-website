export type ArchStage = {
  num: string;
  label: string;
  nodes: string[];
};

type BusinessArchitectureMetricsProps = {
  stages: ArchStage[];
  metrics: string[];
};

export const caseStudy01Architecture = {
  stages: [
    {
      num: "01",
      label: "Ingestion",
      nodes: ["Outscraper", "State markets", "Domain / MX check"],
    },
    {
      num: "02",
      label: "Intelligence",
      nodes: ["Cursor / Python", "Fit-scoring", "Operator vs franchise"],
    },
    {
      num: "03",
      label: "Execution",
      nodes: ["Clay Waterfall", "Instantly", "Cold outreach"],
    },
  ] satisfies ArchStage[],
  metrics: [
    "Multi-Market Sizing & Distribution Engine",
    "100% Fit-Scored & Waterfall Enriched",
    "Zero Manual SDR Sourcing Overhead",
  ],
};

export const caseStudy02Architecture = {
  stages: [
    {
      num: "01",
      label: "Discovery",
      nodes: ["Apify scrape", "APAC / CA / USA", "Lead intake"],
    },
    {
      num: "02",
      label: "Classification",
      nodes: ["Account fit-score", "Persona routing", "Lead routing"],
    },
    {
      num: "03",
      label: "Orchestration",
      nodes: ["Airtable staging", "Instantly / LinkedIn", "Human-in-the-loop"],
    },
  ] satisfies ArchStage[],
  metrics: [
    "Multi-Region Daily 8AM Dispatch",
    "LLM Demoted to Fit Scoring",
    "90% Velocity · 0% Rate-Limit Downtime",
  ],
};

export const caseStudy03Architecture = {
  stages: [
    {
      num: "01",
      label: "Signals",
      nodes: ["RSS / funding pulls", "Hiring spikes", "Product launches"],
    },
    {
      num: "02",
      label: "Agents",
      nodes: ["Account scoring", "Bottleneck inference", "Tier-1 ranking"],
    },
    {
      num: "03",
      label: "Recovery",
      nodes: ["Clay / n8n sequences", "Personalized outreach", "Autonomous execution"],
    },
  ] satisfies ArchStage[],
  metrics: [
    "Series A–D SaaS Pipeline Recovery",
    "Signal → Research → Outreach Automated",
    "Cut Manual SDR Research Overhead",
  ],
};

export function BusinessArchitectureMetrics({
  stages,
  metrics,
}: BusinessArchitectureMetricsProps) {
  return (
    <div className="biz-arch">
      <div className="biz-arch-flow" role="list">
        {stages.map((stage, index) => (
          <div key={stage.label} className="biz-arch-flow-item" role="listitem">
            {index > 0 && (
              <span className="biz-arch-arrow" aria-hidden="true">
                →
              </span>
            )}
            <div className="biz-arch-node">
              <div className="biz-arch-node-head">
                <span className="biz-arch-node-num">{stage.num}</span>
                <span className="biz-arch-node-label">{stage.label}</span>
              </div>
              <div className="biz-arch-node-body">
                {stage.nodes.map((node) => (
                  <span key={node} className="biz-arch-chip">
                    {node}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ul className="biz-arch-metrics">
        {metrics.map((metric) => (
          <li key={metric} className="biz-arch-metric">
            {metric}
          </li>
        ))}
      </ul>
    </div>
  );
}
