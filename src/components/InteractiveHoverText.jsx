import React, { useRef, useEffect } from 'react';

const DEFAULT_BASE_WEIGHT = 700;
const HOVER_RADIUS = 80;
const SPRING_STIFFNESS = 0.15;
const SPRING_DAMPING   = 0.45;
const INTENSE_RADIUS   = 48;
const INTENSE_WEIGHT_THRESHOLD = 150;

/**
 * InteractiveHoverText
 *
 * Renders text lines where each character reacts to cursor proximity with
 * a spring-physics font-weight animation. The rAF loop is paused automatically
 * when the element is not visible in the viewport.
 */
export default function InteractiveHoverText({
  lines,
  className = '',
  align = 'items-start',
  as: Tag = 'h1',
  baseWeight = DEFAULT_BASE_WEIGHT,
  baseColor = '',
  hoverColor = '#343cbb',
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Build per-letter state
    const spanElements = Array.from(container.querySelectorAll('span.hover-char'));
    const letters = spanElements.map((el) => ({
      el,
      currentW: baseWeight,
      targetW:  baseWeight,
      velocity: 0,
      centerX:  0,
      centerY:  0,
      lastW:    null,
      lastColor:  null,
      lastShadow: null,
    }));

    // Cache absolute positions (avoids per-tick layout reads)
    const updateRects = () => {
      letters.forEach((letter) => {
        const rect = letter.el.getBoundingClientRect();
        letter.centerX = rect.left + window.scrollX + rect.width  / 2;
        letter.centerY = rect.top  + window.scrollY + rect.height / 2;
      });
    };

    updateRects();
    window.addEventListener('resize', updateRects);

    let mouseX = -1000;
    let mouseY = -1000;
    let animationFrameId;
    let isVisible = false;

    // Pause animation when off-screen — no wasted CPU
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(container);

    const handleMouseMove  = (e) => { mouseX = e.pageX; mouseY = e.pageY; };
    const handleMouseLeave = ()  => { mouseX = -1000;   mouseY = -1000;   };

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);
      if (!isVisible) return;

      letters.forEach((letter) => {
        const distance = Math.hypot(mouseX - letter.centerX, mouseY - letter.centerY);

        // Target weight
        if (distance < HOVER_RADIUS) {
          const intensity = 1 - distance / HOVER_RADIUS;
          const ease = Math.sin(intensity * (Math.PI / 2));
          letter.targetW = baseWeight + ease * (900 - baseWeight);
        } else {
          letter.targetW = baseWeight;
        }

        // Spring physics
        const force = (letter.targetW - letter.currentW) * SPRING_STIFFNESS;
        letter.velocity = (letter.velocity + force) * SPRING_DAMPING;
        letter.currentW += letter.velocity;

        // Idle clamp
        let w = letter.currentW;
        if (Math.abs(letter.targetW - w) < 0.5 && Math.abs(letter.velocity) < 0.5) {
          w = letter.targetW;
          letter.currentW = w;
          letter.velocity = 0;
        }
        w = Math.max(100, Math.min(900, w));

        const roundedW = Math.round(w);

        // Dirty-check DOM writes
        if (letter.lastW !== roundedW) {
          letter.el.style.fontVariationSettings = `"wght" ${roundedW}`;
          letter.el.style.fontWeight = roundedW;
          const scale = 1 + ((roundedW - baseWeight) / (900 - baseWeight)) * 0.25;
          letter.el.style.transform = `scale(${scale})`;
          letter.lastW = roundedW;
        }

        // Resolve dynamic hover color
        const resolvedHover =
          hoverColor === 'dynamic-mask' || hoverColor === 'dynamic-contrast'
            ? document.documentElement.classList.contains('light-mode') ? '#000000' : '#ffffff'
            : hoverColor;

        const isIntense = w > baseWeight + INTENSE_WEIGHT_THRESHOLD && distance < INTENSE_RADIUS;
        const isHovered = w > baseWeight && distance < HOVER_RADIUS;

        const newColor  = isHovered  ? resolvedHover : baseColor;
        const newShadow = isIntense  ? `0px 0px 20px ${resolvedHover}66` : 'none';

        if (letter.lastColor !== newColor || letter.lastShadow !== newShadow) {
          letter.el.style.color = newColor || '';
          letter.el.style.textShadow = newShadow;
          letter.lastColor  = newColor;
          letter.lastShadow = newShadow;
        }
      });
    };

    container.addEventListener('mousemove',  handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const timeoutId = setTimeout(tick, 100);

    return () => {
      window.removeEventListener('resize', updateRects);
      container.removeEventListener('mousemove',  handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [lines, baseWeight, baseColor, hoverColor]);

  return (
    <Tag
      ref={containerRef}
      className={`${className} flex flex-col ${align}`}
      style={{ perspective: '1000px', ...props.style }}
      {...props}
    >
      {lines.map((line, lIdx) => (
        <div key={lIdx} className="flex flex-wrap" style={{ rowGap: '0.1em' }}>
          {line.split(' ').map((word, wIdx) => (
            <span key={wIdx} className="flex mr-[0.3em]">
              {word.split('').map((char, cIdx) => (
                <span
                  key={cIdx}
                  className="hover-char inline-block"
                  style={{
                    position: 'relative',
                    willChange: 'font-weight, color, transform',
                    fontWeight: baseWeight,
                    fontVariationSettings: `"wght" ${baseWeight}`,
                    color: baseColor || undefined,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </div>
      ))}
    </Tag>
  );
}
