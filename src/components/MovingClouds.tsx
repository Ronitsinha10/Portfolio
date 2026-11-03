import React from 'react';

/**
 * MovingClouds
 * ------------
 * Cinematic, natural atmospheric cloudscape scattered across the full background.
 * - 4 independent, multi-altitude atmospheric streams (High Sky, Mid Peaks, Island Chasm, Cross-Drift).
 * - Organic, non-banded distribution spanning from the upper sky down to the floating-island depths.
 * - Asynchronous, non-synchronized speeds (20s, 13s, 17s, 15s) with phase-offset delays.
 * - 100% GPU compositor-accelerated via CSS transform (translate3d) with zero JS runtime overhead.
 */
export const MovingClouds: React.FC = () => {
  return (
    <>
      {/* =========================================================================
          SVG Gradient Definitions (Warm Sunset Amber, Peach-Gold & Twilight Mist)
          ========================================================================= */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="cGradAmber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FED7AA" stop-opacity="0.88" />
            <stop offset="35%" stop-color="#FDBA74" stop-opacity="0.58" />
            <stop offset="70%" stop-color="#F59E0B" stop-opacity="0.22" />
            <stop offset="100%" stop-color="#D97706" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="cGradGold" cx="45%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.94" />
            <stop offset="38%" stop-color="#FDE68A" stop-opacity="0.62" />
            <stop offset="72%" stop-color="#F59E0B" stop-opacity="0.22" />
            <stop offset="100%" stop-color="#B45309" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="cGradDusk" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stop-color="#E7E5E4" stop-opacity="0.75" />
            <stop offset="40%" stop-color="#FED7AA" stop-opacity="0.42" />
            <stop offset="75%" stop-color="#78716C" stop-opacity="0.14" />
            <stop offset="100%" stop-color="#44403C" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="cGradSoft" cx="50%" cy="48%" r="50%">
            <stop offset="0%" stop-color="#FFF7ED" stop-opacity="0.92" />
            <stop offset="42%" stop-color="#FED7AA" stop-opacity="0.52" />
            <stop offset="78%" stop-color="#FB923C" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#EA580C" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* =========================================================================
          1. STREAM 1: High Atmosphere (Upper Sky, Left-to-Right Drift, 20s)
          ========================================================================= */}
      <div className="cloud-layer cloud-layer-high" aria-hidden="true">
        <div className="cloud-track-high">
          {/* Half 1 */}
          <div className="cloud-half">
            <svg viewBox="0 0 1800 280" width="100%" height="100%" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              {/* Cloud 1A: Stratocumulus shelf (cx=260, cy=95) */}
              <g>
                <ellipse cx="260" cy="115" rx="160" ry="24" fill="url(#cGradDusk)" />
                <ellipse cx="250" cy="98" rx="135" ry="34" fill="url(#cGradAmber)" />
                <ellipse cx="190" cy="85" rx="80" ry="28" fill="url(#cGradGold)" />
                <ellipse cx="300" cy="90" rx="90" ry="26" fill="url(#cGradSoft)" />
                <ellipse cx="140" cy="110" rx="60" ry="16" fill="url(#cGradAmber)" />
                <ellipse cx="370" cy="108" rx="75" ry="18" fill="url(#cGradDusk)" />
                <ellipse cx="230" cy="72" rx="55" ry="20" fill="url(#cGradGold)" />
              </g>

              {/* Cloud 1B: Lone high cirrus wisp (cx=640, cy=45) */}
              <g>
                <ellipse cx="640" cy="48" rx="75" ry="18" fill="url(#cGradSoft)" />
                <ellipse cx="615" cy="42" rx="50" ry="15" fill="url(#cGradGold)" />
                <ellipse cx="670" cy="46" rx="45" ry="14" fill="url(#cGradAmber)" />
                <ellipse cx="580" cy="52" rx="35" ry="10" fill="url(#cGradDusk)" />
              </g>

              {/* Cloud 1C: Towering golden bank (cx=1080, cy=100) */}
              <g>
                <ellipse cx="1090" cy="120" rx="190" ry="30" fill="url(#cGradDusk)" />
                <ellipse cx="1075" cy="100" rx="165" ry="42" fill="url(#cGradAmber)" />
                <ellipse cx="1000" cy="80" rx="110" ry="36" fill="url(#cGradGold)" />
                <ellipse cx="1120" cy="88" rx="120" ry="34" fill="url(#cGradSoft)" />
                <ellipse cx="1040" cy="62" rx="80" ry="28" fill="url(#cGradGold)" />
                <ellipse cx="1150" cy="70" rx="75" ry="26" fill="url(#cGradSoft)" />
                <ellipse cx="930" cy="112" rx="80" ry="22" fill="url(#cGradDusk)" />
                <ellipse cx="1230" cy="114" rx="85" ry="22" fill="url(#cGradAmber)" />
              </g>

              {/* Cloud 1D: Soft cirrus plume (cx=1540, cy=65) */}
              <g>
                <ellipse cx="1540" cy="70" rx="105" ry="24" fill="url(#cGradAmber)" />
                <ellipse cx="1500" cy="62" rx="70" ry="20" fill="url(#cGradGold)" />
                <ellipse cx="1580" cy="66" rx="75" ry="18" fill="url(#cGradSoft)" />
                <ellipse cx="1455" cy="76" rx="50" ry="14" fill="url(#cGradDusk)" />
              </g>
            </svg>
          </div>

          {/* Half 2 (Identical Clone for Seamless Infinite Loop) */}
          <div className="cloud-half" aria-hidden="true">
            <svg viewBox="0 0 1800 280" width="100%" height="100%" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <g>
                <ellipse cx="260" cy="115" rx="160" ry="24" fill="url(#cGradDusk)" />
                <ellipse cx="250" cy="98" rx="135" ry="34" fill="url(#cGradAmber)" />
                <ellipse cx="190" cy="85" rx="80" ry="28" fill="url(#cGradGold)" />
                <ellipse cx="300" cy="90" rx="90" ry="26" fill="url(#cGradSoft)" />
                <ellipse cx="140" cy="110" rx="60" ry="16" fill="url(#cGradAmber)" />
                <ellipse cx="370" cy="108" rx="75" ry="18" fill="url(#cGradDusk)" />
                <ellipse cx="230" cy="72" rx="55" ry="20" fill="url(#cGradGold)" />
              </g>
              <g>
                <ellipse cx="640" cy="48" rx="75" ry="18" fill="url(#cGradSoft)" />
                <ellipse cx="615" cy="42" rx="50" ry="15" fill="url(#cGradGold)" />
                <ellipse cx="670" cy="46" rx="45" ry="14" fill="url(#cGradAmber)" />
                <ellipse cx="580" cy="52" rx="35" ry="10" fill="url(#cGradDusk)" />
              </g>
              <g>
                <ellipse cx="1090" cy="120" rx="190" ry="30" fill="url(#cGradDusk)" />
                <ellipse cx="1075" cy="100" rx="165" ry="42" fill="url(#cGradAmber)" />
                <ellipse cx="1000" cy="80" rx="110" ry="36" fill="url(#cGradGold)" />
                <ellipse cx="1120" cy="88" rx="120" ry="34" fill="url(#cGradSoft)" />
                <ellipse cx="1040" cy="62" rx="80" ry="28" fill="url(#cGradGold)" />
                <ellipse cx="1150" cy="70" rx="75" ry="26" fill="url(#cGradSoft)" />
                <ellipse cx="930" cy="112" rx="80" ry="22" fill="url(#cGradDusk)" />
                <ellipse cx="1230" cy="114" rx="85" ry="22" fill="url(#cGradAmber)" />
              </g>
              <g>
                <ellipse cx="1540" cy="70" rx="105" ry="24" fill="url(#cGradAmber)" />
                <ellipse cx="1500" cy="62" rx="70" ry="20" fill="url(#cGradGold)" />
                <ellipse cx="1580" cy="66" rx="75" ry="18" fill="url(#cGradSoft)" />
                <ellipse cx="1455" cy="76" rx="50" ry="14" fill="url(#cGradDusk)" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. STREAM 2: Mid-Sky Peaks (Horizon Level, Right-to-Left Drift, 13s)
          (Desktop & Tablet - provides dense mid-ground volume)
          ========================================================================= */}
      <div className="cloud-layer cloud-layer-mid hidden sm:block" aria-hidden="true">
        <div className="cloud-track-mid">
          {/* Half 1 */}
          <div className="cloud-half">
            <svg viewBox="0 0 1800 320" width="100%" height="100%" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              {/* Cloud 2A: Double-domed cumulus giant (cx=320, cy=180) */}
              <g>
                <ellipse cx="330" cy="215" rx="210" ry="34" fill="url(#cGradDusk)" />
                <ellipse cx="315" cy="180" rx="175" ry="54" fill="url(#cGradAmber)" />
                <ellipse cx="230" cy="150" rx="120" ry="44" fill="url(#cGradGold)" />
                <ellipse cx="390" cy="160" rx="135" ry="42" fill="url(#cGradSoft)" />
                <ellipse cx="220" cy="120" rx="85" ry="34" fill="url(#cGradGold)" />
                <ellipse cx="355" cy="130" rx="90" ry="32" fill="url(#cGradSoft)" />
                <ellipse cx="280" cy="110" rx="70" ry="28" fill="url(#cGradGold)" />
                <ellipse cx="140" cy="200" rx="85" ry="24" fill="url(#cGradDusk)" />
                <ellipse cx="485" cy="202" rx="90" ry="24" fill="url(#cGradAmber)" />
              </g>

              {/* Cloud 2B: Soaring peak puff (cx=820, cy=115) */}
              <g>
                <ellipse cx="820" cy="135" rx="135" ry="28" fill="url(#cGradAmber)" />
                <ellipse cx="775" cy="115" rx="95" ry="36" fill="url(#cGradGold)" />
                <ellipse cx="865" cy="120" rx="100" ry="34" fill="url(#cGradSoft)" />
                <ellipse cx="810" cy="85" rx="75" ry="28" fill="url(#cGradGold)" />
                <ellipse cx="720" cy="140" rx="65" ry="20" fill="url(#cGradDusk)" />
                <ellipse cx="915" cy="142" rx="70" ry="20" fill="url(#cGradAmber)" />
              </g>

              {/* Cloud 2C: Staggered wind-rippled triplet (cx=1260, cy=190) */}
              <g>
                <ellipse cx="1270" cy="215" rx="155" ry="30" fill="url(#cGradDusk)" />
                <ellipse cx="1200" cy="190" rx="100" ry="38" fill="url(#cGradGold)" />
                <ellipse cx="1305" cy="180" rx="110" ry="40" fill="url(#cGradAmber)" />
                <ellipse cx="1250" cy="155" rx="80" ry="30" fill="url(#cGradSoft)" />
                <ellipse cx="1360" cy="185" rx="85" ry="28" fill="url(#cGradGold)" />
                <ellipse cx="1140" cy="210" rx="70" ry="22" fill="url(#cGradAmber)" />
                <ellipse cx="1400" cy="212" rx="60" ry="18" fill="url(#cGradDusk)" />
              </g>

              {/* Cloud 2D: Asymmetric trailing tail (cx=1620, cy=135) */}
              <g>
                <ellipse cx="1625" cy="155" rx="135" ry="28" fill="url(#cGradDusk)" />
                <ellipse cx="1590" cy="135" rx="110" ry="40" fill="url(#cGradAmber)" />
                <ellipse cx="1545" cy="118" rx="85" ry="32" fill="url(#cGradGold)" />
                <ellipse cx="1635" cy="122" rx="80" ry="30" fill="url(#cGradSoft)" />
                <ellipse cx="1575" cy="98" rx="60" ry="24" fill="url(#cGradGold)" />
                <ellipse cx="1705" cy="150" rx="75" ry="20" fill="url(#cGradAmber)" />
              </g>
            </svg>
          </div>

          {/* Half 2 (Clone) */}
          <div className="cloud-half" aria-hidden="true">
            <svg viewBox="0 0 1800 320" width="100%" height="100%" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <g>
                <ellipse cx="330" cy="215" rx="210" ry="34" fill="url(#cGradDusk)" />
                <ellipse cx="315" cy="180" rx="175" ry="54" fill="url(#cGradAmber)" />
                <ellipse cx="230" cy="150" rx="120" ry="44" fill="url(#cGradGold)" />
                <ellipse cx="390" cy="160" rx="135" ry="42" fill="url(#cGradSoft)" />
                <ellipse cx="220" cy="120" rx="85" ry="34" fill="url(#cGradGold)" />
                <ellipse cx="355" cy="130" rx="90" ry="32" fill="url(#cGradSoft)" />
                <ellipse cx="280" cy="110" rx="70" ry="28" fill="url(#cGradGold)" />
                <ellipse cx="140" cy="200" rx="85" ry="24" fill="url(#cGradDusk)" />
                <ellipse cx="485" cy="202" rx="90" ry="24" fill="url(#cGradAmber)" />
              </g>
              <g>
                <ellipse cx="820" cy="135" rx="135" ry="28" fill="url(#cGradAmber)" />
                <ellipse cx="775" cy="115" rx="95" ry="36" fill="url(#cGradGold)" />
                <ellipse cx="865" cy="120" rx="100" ry="34" fill="url(#cGradSoft)" />
                <ellipse cx="810" cy="85" rx="75" ry="28" fill="url(#cGradGold)" />
                <ellipse cx="720" cy="140" rx="65" ry="20" fill="url(#cGradDusk)" />
                <ellipse cx="915" cy="142" rx="70" ry="20" fill="url(#cGradAmber)" />
              </g>
              <g>
                <ellipse cx="1270" cy="215" rx="155" ry="30" fill="url(#cGradDusk)" />
                <ellipse cx="1200" cy="190" rx="100" ry="38" fill="url(#cGradGold)" />
                <ellipse cx="1305" cy="180" rx="110" ry="40" fill="url(#cGradAmber)" />
                <ellipse cx="1250" cy="155" rx="80" ry="30" fill="url(#cGradSoft)" />
                <ellipse cx="1360" cy="185" rx="85" ry="28" fill="url(#cGradGold)" />
                <ellipse cx="1140" cy="210" rx="70" ry="22" fill="url(#cGradAmber)" />
                <ellipse cx="1400" cy="212" rx="60" ry="18" fill="url(#cGradDusk)" />
              </g>
              <g>
                <ellipse cx="1625" cy="155" rx="135" ry="28" fill="url(#cGradDusk)" />
                <ellipse cx="1590" cy="135" rx="110" ry="40" fill="url(#cGradAmber)" />
                <ellipse cx="1545" cy="118" rx="85" ry="32" fill="url(#cGradGold)" />
                <ellipse cx="1635" cy="122" rx="80" ry="30" fill="url(#cGradSoft)" />
                <ellipse cx="1575" cy="98" rx="60" ry="24" fill="url(#cGradGold)" />
                <ellipse cx="1705" cy="150" rx="75" ry="20" fill="url(#cGradAmber)" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. STREAM 3: Valley & Island Mist (Lower Chasm & Islands, Left-to-Right, 17s, Offset -8s)
          ========================================================================= */}
      <div className="cloud-layer cloud-layer-low" aria-hidden="true">
        <div className="cloud-track-low">
          {/* Half 1 */}
          <div className="cloud-half">
            <svg viewBox="0 0 1800 280" width="100%" height="100%" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              {/* Cloud 3A: Low valley mist shelf (cx=240, cy=140) */}
              <g>
                <ellipse cx="240" cy="148" rx="190" ry="26" fill="url(#cGradDusk)" />
                <ellipse cx="225" cy="132" rx="155" ry="32" fill="url(#cGradAmber)" />
                <ellipse cx="160" cy="120" rx="90" ry="26" fill="url(#cGradGold)" />
                <ellipse cx="290" cy="125" rx="100" ry="25" fill="url(#cGradSoft)" />
                <ellipse cx="90" cy="142" rx="70" ry="18" fill="url(#cGradDusk)" />
                <ellipse cx="370" cy="140" rx="85" ry="18" fill="url(#cGradAmber)" />
              </g>

              {/* Cloud 3B: Island flank wisp (cx=680, cy=95) */}
              <g>
                <ellipse cx="680" cy="102" rx="120" ry="26" fill="url(#cGradSoft)" />
                <ellipse cx="645" cy="92" rx="85" ry="22" fill="url(#cGradGold)" />
                <ellipse cx="720" cy="96" rx="80" ry="20" fill="url(#cGradAmber)" />
                <ellipse cx="600" cy="108" rx="55" ry="14" fill="url(#cGradDusk)" />
              </g>

              {/* Cloud 3C: Undulating chasm mist bank (cx=1140, cy=145) */}
              <g>
                <ellipse cx="1145" cy="155" rx="180" ry="28" fill="url(#cGradDusk)" />
                <ellipse cx="1130" cy="138" rx="150" ry="34" fill="url(#cGradAmber)" />
                <ellipse cx="1060" cy="122" rx="95" ry="28" fill="url(#cGradGold)" />
                <ellipse cx="1190" cy="128" rx="105" ry="26" fill="url(#cGradSoft)" />
                <ellipse cx="990" cy="150" rx="75" ry="18" fill="url(#cGradDusk)" />
                <ellipse cx="1270" cy="152" rx="80" ry="18" fill="url(#cGradAmber)" />
              </g>

              {/* Cloud 3D: Lingering floating-rock wisp (cx=1560, cy=90) */}
              <g>
                <ellipse cx="1560" cy="96" rx="125" ry="26" fill="url(#cGradAmber)" />
                <ellipse cx="1520" cy="88" rx="85" ry="22" fill="url(#cGradGold)" />
                <ellipse cx="1605" cy="92" rx="80" ry="20" fill="url(#cGradSoft)" />
                <ellipse cx="1475" cy="102" rx="60" ry="15" fill="url(#cGradDusk)" />
              </g>
            </svg>
          </div>

          {/* Half 2 (Clone) */}
          <div className="cloud-half" aria-hidden="true">
            <svg viewBox="0 0 1800 280" width="100%" height="100%" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <g>
                <ellipse cx="240" cy="148" rx="190" ry="26" fill="url(#cGradDusk)" />
                <ellipse cx="225" cy="132" rx="155" ry="32" fill="url(#cGradAmber)" />
                <ellipse cx="160" cy="120" rx="90" ry="26" fill="url(#cGradGold)" />
                <ellipse cx="290" cy="125" rx="100" ry="25" fill="url(#cGradSoft)" />
                <ellipse cx="90" cy="142" rx="70" ry="18" fill="url(#cGradDusk)" />
                <ellipse cx="370" cy="140" rx="85" ry="18" fill="url(#cGradAmber)" />
              </g>
              <g>
                <ellipse cx="680" cy="102" rx="120" ry="26" fill="url(#cGradSoft)" />
                <ellipse cx="645" cy="92" rx="85" ry="22" fill="url(#cGradGold)" />
                <ellipse cx="720" cy="96" rx="80" ry="20" fill="url(#cGradAmber)" />
                <ellipse cx="600" cy="108" rx="55" ry="14" fill="url(#cGradDusk)" />
              </g>
              <g>
                <ellipse cx="1145" cy="155" rx="180" ry="28" fill="url(#cGradDusk)" />
                <ellipse cx="1130" cy="138" rx="150" ry="34" fill="url(#cGradAmber)" />
                <ellipse cx="1060" cy="122" rx="95" ry="28" fill="url(#cGradGold)" />
                <ellipse cx="1190" cy="128" rx="105" ry="26" fill="url(#cGradSoft)" />
                <ellipse cx="990" cy="150" rx="75" ry="18" fill="url(#cGradDusk)" />
                <ellipse cx="1270" cy="152" rx="80" ry="18" fill="url(#cGradAmber)" />
              </g>
              <g>
                <ellipse cx="1560" cy="96" rx="125" ry="26" fill="url(#cGradAmber)" />
                <ellipse cx="1520" cy="88" rx="85" ry="22" fill="url(#cGradGold)" />
                <ellipse cx="1605" cy="92" rx="80" ry="20" fill="url(#cGradSoft)" />
                <ellipse cx="1475" cy="102" rx="60" ry="15" fill="url(#cGradDusk)" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. STREAM 4: Cross-Drift Transition Wisps (Right-to-Left, 15s, Offset -5s)
          (Desktop & Tablet - fills the diagonal atmospheric space between streams)
          ========================================================================= */}
      <div className="cloud-layer cloud-layer-wisp hidden sm:block" aria-hidden="true">
        <div className="cloud-track-wisp">
          {/* Half 1 */}
          <div className="cloud-half">
            <svg viewBox="0 0 1800 260" width="100%" height="100%" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              {/* Cloud 4A: Feathered diagonal plume (cx=440, cy=115) */}
              <g>
                <ellipse cx="445" cy="125" rx="140" ry="24" fill="url(#cGradDusk)" />
                <ellipse cx="430" cy="112" rx="115" ry="28" fill="url(#cGradAmber)" />
                <ellipse cx="380" cy="102" rx="75" ry="22" fill="url(#cGradGold)" />
                <ellipse cx="480" cy="108" rx="80" ry="20" fill="url(#cGradSoft)" />
                <ellipse cx="330" cy="122" rx="55" ry="14" fill="url(#cGradDusk)" />
              </g>

              {/* Cloud 4B: Sunset amber transition wisp (cx=980, cy=160) */}
              <g>
                <ellipse cx="985" cy="172" rx="150" ry="26" fill="url(#cGradDusk)" />
                <ellipse cx="970" cy="155" rx="125" ry="32" fill="url(#cGradGold)" />
                <ellipse cx="915" cy="142" rx="85" ry="24" fill="url(#cGradAmber)" />
                <ellipse cx="1025" cy="148" rx="90" ry="22" fill="url(#cGradSoft)" />
                <ellipse cx="1080" cy="165" rx="65" ry="16" fill="url(#cGradGold)" />
              </g>

              {/* Cloud 4C: Solitary stray puff (cx=1460, cy=95) */}
              <g>
                <ellipse cx="1460" cy="100" rx="110" ry="22" fill="url(#cGradSoft)" />
                <ellipse cx="1430" cy="92" rx="75" ry="18" fill="url(#cGradGold)" />
                <ellipse cx="1495" cy="95" rx="70" ry="16" fill="url(#cGradAmber)" />
                <ellipse cx="1385" cy="106" rx="50" ry="12" fill="url(#cGradDusk)" />
              </g>
            </svg>
          </div>

          {/* Half 2 (Clone) */}
          <div className="cloud-half" aria-hidden="true">
            <svg viewBox="0 0 1800 260" width="100%" height="100%" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <g>
                <ellipse cx="445" cy="125" rx="140" ry="24" fill="url(#cGradDusk)" />
                <ellipse cx="430" cy="112" rx="115" ry="28" fill="url(#cGradAmber)" />
                <ellipse cx="380" cy="102" rx="75" ry="22" fill="url(#cGradGold)" />
                <ellipse cx="480" cy="108" rx="80" ry="20" fill="url(#cGradSoft)" />
                <ellipse cx="330" cy="122" rx="55" ry="14" fill="url(#cGradDusk)" />
              </g>
              <g>
                <ellipse cx="985" cy="172" rx="150" ry="26" fill="url(#cGradDusk)" />
                <ellipse cx="970" cy="155" rx="125" ry="32" fill="url(#cGradGold)" />
                <ellipse cx="915" cy="142" rx="85" ry="24" fill="url(#cGradAmber)" />
                <ellipse cx="1025" cy="148" rx="90" ry="22" fill="url(#cGradSoft)" />
                <ellipse cx="1080" cy="165" rx="65" ry="16" fill="url(#cGradGold)" />
              </g>
              <g>
                <ellipse cx="1460" cy="100" rx="110" ry="22" fill="url(#cGradSoft)" />
                <ellipse cx="1430" cy="92" rx="75" ry="18" fill="url(#cGradGold)" />
                <ellipse cx="1495" cy="95" rx="70" ry="16" fill="url(#cGradAmber)" />
                <ellipse cx="1385" cy="106" rx="50" ry="12" fill="url(#cGradDusk)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovingClouds;
