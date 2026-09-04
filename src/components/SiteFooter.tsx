import { WHATSAPP_NUMBER } from "@/data/products";
import { Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-teak text-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div>
          <p className="label-mono text-brass">Talk to us</p>
          <p className="mt-3 font-mono text-sm">+{WHATSAPP_NUMBER}</p>
          <p className="mt-1 text-sm text-canvas/70">
            <a
              href="mailto:krkfurniture79@gmail.com"
              className="hover:text-brass transition-colors"
            >
              krkfurniture79@gmail.com
            </a>
          </p>
        </div>
        <div>
          <p className="label-mono text-brass">Showroom</p>
          <p className="mt-3 text-sm text-canvas/80">
            J-45, East Vinod Nagar,
            <br />
            Mayur Vihar Phase 2, Delhi - 110091
            <br />
            Near Neelam Mata Mandir,
            <br />
            Open Mon-Sat, 10 AM - 8 PM
          </p>
        </div>
        <div>
          <p className="label-mono text-brass">Elsewhere</p>
          <ul className="mt-3 space-y-1.5 text-sm text-canvas/80">
            <li>
              <a
                href="https://www.instagram.com/krkfurnitureevn"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brass transition-colors inline-block"
                aria-label="Instagram"
              >
                <Instagram className="size-6" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brass/25 px-5 py-5 text-center font-mono text-[11px] tracking-widest text-canvas/50 uppercase">
        KRK Furniture - catalog and enquiries only
      </div>
    </footer>
  );
}
