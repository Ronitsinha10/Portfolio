import React from 'react';

/**
 * FallingLeaves
 * -------------
 * Subtle, atmospheric autumn leaves drifting gently from the canopy of the
 * large tree on the left side of the fantasy floating-islands background.
 * - Dedicated left-flank leaves ensuring the left side is lively and never empty.
 * - Gentle breeze diagonal drift towards the center chasm.
 * - Restrained autumn palette: burnt orange, copper, muted amber, and crimson red.
 * - 100% GPU-composited CSS transform animations (zero JS runtime overhead).
 * - 6 leaves on mobile, 18 leaves on desktop.
 */
interface Leaf {
  id: number;
  top: string;
  left: string;
  size: number;
  color: string;
  duration: string;
  delay: string;
  variant: 'a' | 'b' | 'c' | 'd' | 'left' | 'sway' | 'curl';
  shape: 1 | 2;
  desktopOnly?: boolean;
}

const LEAVES: Leaf[] = [
  // =========================================================================
  // 1. LEFT-FLANK LEAVES (Stay strictly on the left side, keeping it lively)
  // =========================================================================
  // Mobile + Desktop (5 active left streams):
  { id: 1, top: '19%', left: '5%', size: 14, color: '#EA580C', duration: '9.0s', delay: '-1.2s', variant: 'left', shape: 1 },
  { id: 2, top: '24%', left: '8%', size: 12, color: '#D97706', duration: '10.5s', delay: '-4.8s', variant: 'sway', shape: 2 },
  { id: 3, top: '29%', left: '6%', size: 15, color: '#991B1B', duration: '8.4s', delay: '-2.7s', variant: 'curl', shape: 1 },
  { id: 5, top: '22%', left: '4%', size: 16, color: '#C2410C', duration: '8.8s', delay: '-3.9s', variant: 'sway', shape: 1 },
  { id: 7, top: '33%', left: '7%', size: 15, color: '#7F1D1D', duration: '9.6s', delay: '-5.2s', variant: 'left', shape: 1 },

  // Desktop Only (additional density for wide screens):
  { id: 4, top: '16%', left: '9%', size: 13, color: '#B45309', duration: '11.2s', delay: '-7.1s', variant: 'left', shape: 2, desktopOnly: true },
  { id: 6, top: '27%', left: '10%', size: 12, color: '#F59E0B', duration: '12.0s', delay: '-6.3s', variant: 'curl', shape: 2, desktopOnly: true },
  { id: 8, top: '38%', left: '5%', size: 11, color: '#EA580C', duration: '10.8s', delay: '-8.5s', variant: 'sway', shape: 2, desktopOnly: true },

  // =========================================================================
  // 2. CANOPY-TO-CENTER LEAVES (Gentle diagonal drift toward the waterfall chasm)
  // =========================================================================
  // Mobile + Desktop:
  { id: 9, top: '18%', left: '14%', size: 14, color: '#EA580C', duration: '9.4s', delay: '-1.8s', variant: 'a', shape: 1 },
  { id: 10, top: '22%', left: '21%', size: 12, color: '#D97706', duration: '11.2s', delay: '-6.5s', variant: 'b', shape: 2 },
  { id: 11, top: '26%', left: '16%', size: 16, color: '#991B1B', duration: '8.6s', delay: '-3.7s', variant: 'c', shape: 1 },

  // Desktop Only:
  { id: 12, top: '20%', left: '24%', size: 13, color: '#B45309', duration: '10.8s', delay: '-8.2s', variant: 'd', shape: 2, desktopOnly: true },
  { id: 13, top: '16%', left: '18%', size: 15, color: '#C2410C', duration: '9.8s', delay: '-4.3s', variant: 'a', shape: 1, desktopOnly: true },
  { id: 14, top: '24%', left: '12%', size: 11, color: '#F59E0B', duration: '12.4s', delay: '-7.5s', variant: 'b', shape: 2, desktopOnly: true },
  { id: 15, top: '28%', left: '22%', size: 17, color: '#7F1D1D', duration: '8.9s', delay: '-2.5s', variant: 'c', shape: 1, desktopOnly: true },
  { id: 16, top: '19%', left: '26%', size: 13, color: '#EA580C', duration: '10.4s', delay: '-9.0s', variant: 'd', shape: 2, desktopOnly: true },
  { id: 17, top: '23%', left: '15%', size: 14, color: '#B45309', duration: '11.6s', delay: '-5.1s', variant: 'a', shape: 1, desktopOnly: true },
  { id: 18, top: '27%', left: '19%', size: 12, color: '#FBBF24', duration: '8.2s', delay: '-0.9s', variant: 'b', shape: 2, desktopOnly: true },
];

export const FallingLeaves: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
      {LEAVES.map((leaf) => (
        <div
          key={leaf.id}
          className={`leaf-item leaf-${leaf.variant} ${leaf.desktopOnly ? 'hidden sm:block' : ''}`}
          style={{
            top: leaf.top,
            left: leaf.left,
            animationDuration: leaf.duration,
            animationDelay: leaf.delay,
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 16 16"
            fill="none"
            className="overflow-visible drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
          >
            {leaf.shape === 1 ? (
              <>
                <path d="M 1,15 C 1,8 6,2 15,1 C 14,9 8,14 1,15 Z" fill={leaf.color} />
                <path d="M 1,15 Q 7,8 15,1" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" fill="none" />
              </>
            ) : (
              <>
                <path d="M 2,14 C 0,8 4,1 14,2 C 15,8 11,15 2,14 Z" fill={leaf.color} />
                <path d="M 2,14 Q 8,8 14,2" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" fill="none" />
              </>
            )}
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FallingLeaves;
