import { WHATSAPP_NUMBER } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-teak text-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div>
          <p className="label-mono text-brass">Talk to us</p>
          <p className="mt-3 font-mono text-sm">+{WHATSAPP_NUMBER}</p>
          <p className="mt-1 text-sm text-canvas/70">
            Placeholder number — swap in the showroom line.
          </p>
        </div>
        <div>
          <p className="label-mono text-brass">Showroom</p>
          <p className="mt-3 text-sm text-canvas/80">
            [Street address placeholder]
            <br />
            [City, State — PIN]
            <br />
            Open Mon–Sat, 10am–8pm
          </p>
        </div>
        <div>
          <p className="label-mono text-brass">Elsewhere</p>
          <ul className="mt-3 space-y-1.5 text-sm text-canvas/80">
            <li>Instagram — [handle placeholder]</li>
            <li>Facebook — [page placeholder]</li>
            <li>Google Maps — [listing placeholder]</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brass/25 px-5 py-5 text-center font-mono text-[11px] tracking-widest text-canvas/50 uppercase">
        KRK Furniture — catalog and enquiries only
      </div>
    </footer>
  );
}
