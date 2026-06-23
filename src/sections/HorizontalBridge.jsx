import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

/**
 * HorizontalBridge Component
 *
 * A premium horizontal scroll section that bridges SuperQuality and Services.
 * Features:
 * - Pins section while scrolling vertically
 * - Converts vertical scroll to horizontal panel movement
 * - 3 full-screen panels with distinct content
 * - Scrub-based animation for smooth, frame-perfect motion
 * - Responsive behavior (mobile shows vertical stack, desktop shows horizontal scroll)
 * - Uses GSAP context for proper cleanup
 */
const HorizontalBridge = () => {
  // Reference to the outer container that will be pinned
  const sectionRef = useRef(null);

  // Reference to the inner track that slides horizontally
  // IMPORTANT: Animation is attached to this element, not the panels.
  // This allows the entire track to translate smoothly as a unit.
  const trackRef = useRef(null);

  useEffect(() => {
    // GSAP Context wraps all animations for this component.
    // This ensures all ScrollTriggers and tweens are killed on unmount,
    // preventing memory leaks and animation conflicts.
    const ctx = gsap.context(() => {
      // Use matchMedia to handle responsive behavior
      // Horizontal animation only activates on large screens (desktop)
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        const section = sectionRef.current;

        if (!track || !section) return;

        // Calculate how far the track needs to move left
        // scrollWidth = total width of all panels including gaps
        // clientWidth = visible viewport width of the section
        const scrollDistance = track.scrollWidth - section.clientWidth;

        // If there's nothing to scroll, exit early
        if (scrollDistance <= 0) return;

        /**
         * Main horizontal scroll animation
         *
         * How it works:
         * 1. As user scrolls down the page, ScrollTrigger measures scroll distance
         * 2. ScrollTrigger converts vertical scroll into horizontal movement via scrub
         * 3. scrub: true ties animation directly to scrollbar position (smooth and synchronized)
         * 4. pin: true stops vertical scroll, allowing smooth horizontal transition
         * 5. Cleanup happens automatically when section exits viewport
         */
        gsap.to(track, {
          x: -scrollDistance, // Negative value moves panel track to the left
          ease: 'none', // No easing needed with scrub - scrollbar provides motion curve
          scrollTrigger: {
            trigger: section, // Start when this section enters viewport
            start: 'top top', // Pin when top of section hits top of screen
            end: () => `+=${scrollDistance}`, // Dynamic calculation based on track width
            scrub: 1.2, // Smoothing factor (0-5+). Higher = smoother but slight delay
            pin: true, // Pin the section while scrolling horizontally
            pinSpacing: true, // Reserve space for pinned section in the page flow
            invalidateOnRefresh: true, // Recalculate on window resize
            markers: false, // Set to true for debugging
          },
        });
      });

      // Cleanup matchMedia queries on component unmount
      return () => mm.revert();
    }, sectionRef); // Scope all animations to this component

    // Kill all animations and ScrollTriggers when component unmounts
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black"
    >
      {/* 
        Track Container
        - Flexbox row layout for horizontal alignment
        - Will be translated left via GSAP animation
        - Each child is 100vw to create full-screen panels
      */}
      <div ref={trackRef} className="flex flex-row h-full gap-0">
        {/* ===== PANEL 1: Innovation ===== */}
        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-8">
          <div className="max-w-2xl">
            {/* Animated heading */}
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight text-white">
              Innovation Meets Performance
            </h2>
            {/* Descriptive text */}
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              Every detail engineered for the athlete who demands more. Advanced materials,
              cutting-edge construction, and decades of expertise unite in perfect harmony.
            </p>
            {/* Visual indicator */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            </div>
          </div>
        </div>

        {/* ===== PANEL 2: Design Philosophy ===== */}
        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-8">
          <div className="max-w-2xl">
            {/* Animated heading */}
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight text-white">
              Design That Inspires
            </h2>
            {/* Descriptive text */}
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              Form follows function. Our design philosophy challenges conventions, creating products
              that are as beautiful as they are functional. Each curve, each contour serves a
              purpose.
            </p>
            {/* Visual indicator */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            </div>
          </div>
        </div>

        {/* ===== PANEL 3: Quality Commitment ===== */}
        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-8">
          <div className="max-w-2xl">
            {/* Animated heading */}
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight text-white">
              Uncompromising Quality
            </h2>
            {/* Descriptive text */}
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              We stand behind every product with rigorous testing and premium materials. From the
              lab to your feet, quality is non-negotiable. This is our promise to you.
            </p>
            {/* Visual indicator */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalBridge;
