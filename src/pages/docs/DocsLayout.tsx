import { Outlet, NavLink, Link } from 'react-router-dom';

const sidebarGroups = [
  {
    label: 'Getting Started',
    links: [
      { to: '/docs', label: 'Quickstart', end: true },
      { to: '/docs/config', label: 'Configuration' },
    ],
  },
  {
    label: 'SDK',
    links: [
      { to: '/docs/providers', label: 'Providers' },
      { to: '/docs/sessions', label: 'Sessions & Metadata' },
    ],
  },
  {
    label: 'Reference',
    links: [
      { to: '/docs/api', label: 'REST API' },
    ],
  },
];

const topLinks = [
  { to: '/docs', label: 'Quickstart', end: true },
  { to: '/docs/config', label: 'Configuration' },
  { to: '/docs/providers', label: 'Providers' },
  { to: '/docs/sessions', label: 'Sessions & Metadata' },
  { to: '/docs/api', label: 'API' },
];

export default function DocsLayout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors ${isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`;

  const sidebarLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-1 text-sm transition-colors ${isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`;

  return (
    <div className="min-h-screen bg-[#080808] text-neutral-300 antialiased" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800 bg-[#080808]/85 backdrop-blur-xl">
        <div className="max-w-[1100px] mx-auto px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-bold text-lg text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>
              Pulse
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-sm text-neutral-500">Docs</span>
          </div>
          <div className="hidden md:flex gap-0">
            {topLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                <span className="px-4 py-2">{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Layout */}
      <div className="max-w-[1100px] mx-auto px-8 pt-14 flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-52 flex-shrink-0 py-8 pr-8 border-r border-neutral-800">
          {sidebarGroups.map((group) => (
            <div key={group.label} className="mb-6">
              <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-2">{group.label}</div>
              {group.links.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.end} className={sidebarLinkClass}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 py-8 pl-0 md:pl-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
