import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-12">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div>
            <div className="font-bold text-lg text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>Pulse</div>
            <p className="text-[13px] text-neutral-600 mt-3 max-w-[260px] leading-relaxed">
              LLM observability for TypeScript and Python. Built for engineers.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-4">Product</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#features" className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-4">Developers</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link to="/docs" className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">Documentation</Link></li>
              <li><Link to="/docs/providers" className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">SDK Reference</Link></li>
              <li><Link to="/docs/api" className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">API Reference</Link></li>
              <li><a href="#" className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#" className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">About</a></li>
              <li><a href="#" className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">Blog</a></li>
              <li><a href="#" className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-neutral-800 text-xs text-neutral-600">
          &copy; 2026 Pulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
