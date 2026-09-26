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
            <a className="page-link" href="#projects">
              Projects
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
                              <a
                                href="https://linkedin.com/in/lkelvinl"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                [linkedin]
                              </a>
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
                software engineering co-ops at companies like American Express
                and SMART Technologies.
              </p>
              <p>
                Over time, I shifted from writing code to transactional
                e-commerce sales at first to driving commercial execution and
                eventually into high-ticket, consultative deals focused on ROI,
                cash flow, and capital allocation. This led me to scale a
                marketing agency for B2B wholesale clients and build automated
                GTM infrastructure.
              </p>
              <p>
                Today, I combine those two worlds as a technical GTM
                builder—leveraging AI automation, modern workflows, and
                engineering depth to excel in hybrid Mid-Market SE and AE roles.
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
