import { memo, Fragment } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A highly reusable CSS Marquee component that supports infinite looping, 
 * directional scrolling, pause on hover, and reduced-motion fallbacks.
 *
 * @param {Array} items - List of data items to map over.
 * @param {string} direction - "left" | "right".
 * @param {function} renderItem - Function (item, index) => ReactNode for rendering an individual item.
 * @param {boolean} prefersStaticFallback - If true, fallback is a flex-wrap container (e.g., Skills tags). If false, fallback is overflow-x-auto (e.g., top marquee).
 * @param {string} containerClassName - Custom class names for the outer container.
 * @param {string} innerClassName - Custom class names for the flex row inside the marquee.
 * @param {function} renderSeparator - Optional function () => ReactNode for rendering a separator between items.
 * @param {number} speed - Seconds for one loop. Default is 30.
 */
export const Marquee = memo(function Marquee({
  items,
  direction = "left",
  renderItem,
  prefersStaticFallback = false,
  containerClassName = "",
  innerClassName = "flex items-center space-x-8 shrink-0 px-4",
  renderSeparator,
  speed = 30,
}) {
  const shouldReduceMotion = useReducedMotion();

  const renderItemsBlock = (isClone = false) => (
    <div className={innerClassName} aria-hidden={isClone}>
      {items.map((item, index) => {
        const uniqueId = item.id || item.name || index;
        return (
          <div key={isClone ? `clone-${uniqueId}-${index}` : `original-${uniqueId}-${index}`} className="flex items-center shrink-0">
            {renderItem(item, index)}
            {renderSeparator && renderSeparator(item, index)}
          </div>
        );
      })}
    </div>
  );

  if (shouldReduceMotion) {
    if (prefersStaticFallback) {
      return (
        <div className={`flex flex-wrap gap-2.5 ${containerClassName}`}>
          {items.map((item, index) => {
            const uniqueId = item.id || item.name || index;
            return (
              <Fragment key={`static-${uniqueId}-${index}`}>
                {renderItem(item, index)}
              </Fragment>
            );
          })}
        </div>
      );
    }
    return (
      <div className={`flex overflow-x-auto scrollbar-hide ${containerClassName}`}>
        {renderItemsBlock(false)}
      </div>
    );
  }

  const animationClass = direction === "right" ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div className={`overflow-hidden relative group w-full ${containerClassName}`}>
      <div
        className={`flex w-max ${animationClass} hover:[animation-play-state:paused] md:group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Render original list */}
        {renderItemsBlock(false)}
        {/* Render duplicate list for seamless looping */}
        {renderItemsBlock(true)}
      </div>
    </div>
  );
});

export default Marquee;
