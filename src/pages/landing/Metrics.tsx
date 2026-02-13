const metrics = [
  { value: '< 2ms', label: 'SDK overhead' },
  { value: '3', label: 'Providers' },
  { value: '100%', label: 'Source available' },
  { value: '0', label: 'Vendor lock-in' },
];

export function Metrics() {
  return (
    <div className="border-b border-neutral-800">
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={i}
            className={`py-10 text-center ${i < metrics.length - 1 ? 'md:border-r border-neutral-800' : ''}`}
          >
            <h3
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}
            >
              {m.value}
            </h3>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mt-1">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
