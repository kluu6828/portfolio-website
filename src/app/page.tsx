import Image from "next/image";
import { ProjectsSection } from "@/components/ProjectsSection";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="wrapper">
          <nav className="site-nav">
            <a className="page-link" href="#top">
              Main
            </a>
            <a className="page-link" href="#case-studies">
              Case Studies
            </a>
            <a className="page-link" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <div className="page-content">
        <div className="wrapper">
          <article className="post">
            <div className="post-content">
              <div id="top">
                <center>
                  <table className="identity-table">
                    <tbody>
                      <tr>
                        <td className="identity-photo">
                          <Image
                            src="/headshot.png"
                            alt="Kelvin Lau (Luu)"
                            width={200}
                            height={200}
                            className="img-rounded"
                            priority
                            style={{ width: 200, height: "auto" }}
                          />
                        </td>
                        <td className="identity-copy">
                          <center>
                            <h1>Kelvin Lau (Luu)</h1>
                            <b>Systems &amp; Revenue.</b> <b>Waterloo CS.</b>
                            <br />
                            <span className="identity-meta">
                              <a href="mailto:kluu6828@gmail.com">
                                kluu6828@gmail.com
                              </a>{" "}
                              [
                              <a
                                href="https://linkedin.com/in/lkelvinl"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                linkedin
                              </a>
                              {" | "}
                              <a
                                href="/master_SE_resume.html"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                SE cv
                              </a>
                              {" | "}
                              <a
                                href="/master_AE_resume.html"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                AE cv
                              </a>
                              ]
                            </span>
                          </center>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </center>
                <br />
              </div>

              <p>
                Bridging software architecture and enterprise revenue. Waterloo
                CS graduate with enterprise engineering roots (Amex, SMART
                Technologies) and commercial GTM execution (Aftersell). Building
                autonomous systems and scaling technical pipeline.
              </p>

              <h4 style={{ fontWeight: 700 }}>Bio</h4>
              <p>
                I graduated with a Bachelor of Computer Science (Business
                Option) from the University of Waterloo, backed by enterprise
                software engineering co-ops at American Express and SMART
                Technologies.
              </p>
              <p>
                I then moved into commercial execution, from transactional
                e-commerce into high-ticket, consultative deals focused on ROI,
                cash flow, and capital allocation. Along the way I scaled a
                marketing agency for B2B wholesale clients and built automated
                GTM infrastructure.
              </p>
              <p>
                Today that crossover is the product: I write code to build
                revenue systems a traditional seller can&apos;t ship, and I close
                deals with commercial judgment a traditional engineer rarely
                develops. Whether that looks like a Mid-Market SE/AE seat or a
                1099 engagement helping Series A-D SaaS and capital equipment
                teams recover pipeline, the same stack applies: AI automation,
                modern workflows, and pipeline that converts.
              </p>

              <ProjectsSection />
            </div>
          </article>
        </div>
      </div>

      <footer id="contact" className="site-footer">
        <div className="wrapper">
          <h2 className="footer-heading">kelvin lau</h2>
          <ul className="contact-list">
            <li>kelvin lau (luu)</li>
            <li>
              <a href="mailto:kluu6828@gmail.com">kluu6828@gmail.com</a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/lkelvinl"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/lkelvinl
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
