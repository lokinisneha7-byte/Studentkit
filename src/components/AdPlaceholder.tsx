import React from 'react';

interface AdPlaceholderProps {
  slotType?: 'banner' | 'sidebar' | 'in-feed';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotType = 'banner',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full rounded-xl border border-dashed border-slate-300/80 bg-slate-100/50 p-4 text-center text-slate-400 transition-colors hover:border-slate-400/80 ${
        slotType === 'banner'
          ? 'my-8 min-h-[90px] flex flex-col items-center justify-center'
          : slotType === 'sidebar'
          ? 'my-4 min-h-[250px] flex flex-col items-center justify-center'
          : 'my-6 min-h-[120px] flex flex-col items-center justify-center'
      } ${className}`}
      aria-label="Advertisement Placeholder"
    >
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Advertisement / Sponsored Space
      </span>
      <p className="mt-1 text-xs text-slate-400/80">
        Reserved for future student perks, developer resources, or non-intrusive sponsorships.
      </p>
    </div>
  );
};
