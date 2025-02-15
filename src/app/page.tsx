import ContactComp from "@/components/Contact";
import Project from "../components/Project";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 md:px-12">
      <nav className="flex justify-between items-center py-8">
        <span className="font-mono text-xl  font-medium">
          <Link href="/" className="hover:text-accent-blue transition-colors">[ Home ]</Link> 
        </span>
        <div className="flex gap-6 text-lg font-medium">
        <a href={process.env.NEXT_PUBLIC_GOOGLE_DRIVE_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors">[ Resume ]</a>        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="mt-20 mb-32 scroll-mt-20">
        <div className="space-y-6">
          <span className="font-mono text-xl text-neutral-600">
            Full Stack Developer · MERN Stack 
          </span>
          <h1 className="text-5xl md:text-7xl font-mono font-normal">
            Mohd <br />
            Diljan
          </h1>
          <p className="text-xl text-neutral-600 max-w-xl">
            &ldquo;A Full Stack Developer focused on building scalable web applications&rdquo;
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="mb-32 scroll-mt-20">
        <h2 className="font-mono text-4xl mb-12 font-normal">
          [ 001 ]
          <br />
          Projects
        </h2>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Project
              number="1"
              date="04 / NOV / 2024"
              title="Z-Link : Authentication Skeleton"
              desc="Z-Link is an authentication skeleton system built with Next.js 15, featuring email verification,Totp auth, Password reset, and Google OAuth integration.
              It uses Session Based Authentication and JWT for secure authentication."
              tech={["NextJS", "TypeScript", "TailwindCSS", "MongoDB", "Oauth2.0", "ShadcnUI","Netlify"]}
              links={[
                { label: "/view", url: "https://z-link.shop/" },
                { label: "/github", url: "https://github.com/diljan47/nextjs-auth-skeleton-Z-Link" },
              ]}
              images={[
                "https://res.cloudinary.com/duqupsxnk/image/upload/v1739612338/Portfolio/Personal%20Portfolio%20Images/Screenshot_2025-02-15_at_2.39.03_PM_dkt50m.png",
                "https://res.cloudinary.com/duqupsxnk/image/upload/v1739612338/Portfolio/Personal%20Portfolio%20Images/Screenshot_2025-02-15_at_2.41.03_PM_a4fsdm.png",
                "https://res.cloudinary.com/duqupsxnk/image/upload/v1739612338/Portfolio/Personal%20Portfolio%20Images/Screenshot_2025-02-15_at_2.41.42_PM_sgxjbq.png",
                "https://res.cloudinary.com/duqupsxnk/image/upload/v1739612338/Portfolio/Personal%20Portfolio%20Images/Screenshot_2025-02-15_at_2.39.41_PM_n6uhwl.png"
              ]}
              showImages={true}
            />
            <Project
              number="2"
              date="30 / DEC / 2024"
              title="Sol-Checker : Solana Token Security Analyser"
              desc="Sol-Checker is a solana token analyser that can check the LP Burn,Token Mint, Mutable Authority and the Top Holders of the token, It uses Orca and Raydium Pools for liquidity Analysis"
              tech={["Web3.js", "Helius", "GrapQL", "NextJS","TailwindCSS","ShadcnUI","Netlify"]}
              links={[
                { label: "/view", url: "https://solanachecker.netlify.app/" },
              ]}
              images={[
                "https://res.cloudinary.com/duqupsxnk/image/upload/v1739619086/Portfolio/Personal%20Portfolio%20Images/Screenshot_2025-02-15_at_5.00.10_PM_na3h12.png",
                "https://res.cloudinary.com/duqupsxnk/image/upload/v1739619086/Portfolio/Personal%20Portfolio%20Images/Screenshot_2025-02-15_at_5.00.16_PM_asytmw.png",
                "https://res.cloudinary.com/duqupsxnk/image/upload/v1739619086/Portfolio/Personal%20Portfolio%20Images/Screenshot_2025-02-15_at_4.59.49_PM_qebof8.png",
                "https://res.cloudinary.com/duqupsxnk/image/upload/v1739619086/Portfolio/Personal%20Portfolio%20Images/Screenshot_2025-02-15_at_5.00.20_PM_kzh4y1.png"
              ]}
              showImages={true}
            />
          </div>
          <div className="w-full md:w-1/2 mx-auto">
            <Project
              number="3"
              date="14 / FEB / 2025"
              title="Minimal & Modern portfolio Design"
              desc="This is a modern and minimal portfolio website designed in NextJS"
              tech={["NextJS", "TailwindCSS","Netlify"]}
              links={[{ label: "/view", url: "https://diljan.netlify.app/" }]}
              images={[
                "https://res.cloudinary.com/duqupsxnk/image/upload/v1739619400/Portfolio/Personal%20Portfolio%20Images/Screenshot_2025-02-15_at_5.06.07_PM_fgsrqp.png",
                "https://res.cloudinary.com/duqupsxnk/image/upload/v1739619400/Portfolio/Personal%20Portfolio%20Images/Screenshot_2025-02-15_at_5.06.00_PM_ok5k7o.png",
                "https://res.cloudinary.com/duqupsxnk/image/upload/v1739619400/Portfolio/Personal%20Portfolio%20Images/Screenshot_2025-02-15_at_5.06.15_PM_wfybsa.png"
              ]}
              showImages={true}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-20">
        <ContactComp />
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-neutral-600">
        
        <p className="mt-2">Copyright © 2025</p>
        <p> made by diljan</p>
      </footer>
    </main>
  );
}
