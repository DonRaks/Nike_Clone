// React hooks for lifecycle and DOM references
import { useEffect, useRef } from 'react';

// GSAP core and the ScrollTrigger plugin for scroll-linked animations
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Local asset and button component imports
import { shoe8 } from '../assets/images';
import Button from '../components/Button';

// Register the scroll plugin once before creating animations
gsap.registerPlugin(ScrollTrigger);

const SuperQuality = () => {
  // Root ref for the section. Used for scroll tracking and cleanup scope.
  const sectionRef = useRef(null);

  // Left-side container ref acts as the ScrollTrigger trigger for text animation.
  const leftContentRef = useRef(null);

  // Collect each heading line to animate them independently.
  const headingLines = useRef([]);

  // Paragraph refs for the first and second copy blocks.
  const firstParagraphRef = useRef(null);
  const secondParagraphRef = useRef(null);

  // Ref for the CTA button to animate from beneath.
  const buttonRef = useRef(null);

  // Ref for the main product image. Used for slide-in and parallax motion.
  const imageRef = useRef(null);

  // Always clear the heading refs before re-collecting on render.
  headingLines.current = [];

  useEffect(() => {
    // Use GSAP context so animations are scoped and properly cleaned up.
    const ctx = gsap.context(() => {
      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          // Trigger text reveal when left-side content enters view.
          trigger: leftContentRef.current,
          start: 'top 85%',
          end: 'top 35%',
          scrub: 1.2,
          markers: false,
        },
      });

      // Animate heading lines first, then paragraph words, second paragraph, CTA button, and finally the image.
      revealTimeline
        .from(headingLines.current, {
          yPercent: 110,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.22,
        })
        .from(
          firstParagraphRef.current.querySelectorAll('.word'),
          {
            y: 28,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
          },
          '-=0.45'
        )
        .from(
          secondParagraphRef.current,
          {
            y: 28,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.55'
        )
        .from(
          buttonRef.current,
          {
            y: 32,
            opacity: 0,
            scale: 0.98,
            duration: 0.8,
            ease: 'back.out(1.4)',
          },
          '-=0.35'
        )
        .from(
          imageRef.current,
          {
            x: 120,
            rotation: 4,
            scale: 0.96,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          '>'
        );

      // Apply a subtle parallax effect to the image as the user continues scrolling.
      gsap.to(imageRef.current, {
        y: 12,
        rotation: -1.2,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'bottom top',
          scrub: 0.9,
          markers: false,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Helper to collect heading line elements for the staggered animation.
  const addHeadingLine = (el) => {
    if (el && !headingLines.current.includes(el)) {
      headingLines.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container"
    >
      <div ref={leftContentRef} className="flex flex-1 flex-col">
        <h2 className="font-palanquin capitalize text-4xl lg:max-w-lg font-bold leading-tight overflow-hidden">
          {/* Each heading line is wrapped so GSAP can animate the lines separately. */}
          <span ref={addHeadingLine} className="block overflow-hidden">
            <span className="inline-block">We Provide You</span>
          </span>
          <span ref={addHeadingLine} className="block overflow-hidden">
            <span className="inline-block">
              <span className="text-red-500">Super</span>{' '}
              <span className="text-red-300">Quality</span> Shoes
            </span>
          </span>
        </h2>

        {/* First paragraph animates word by word for a premium reveal. */}
        <p
          ref={firstParagraphRef}
          className="mt-4 lg:max-w-lg info-text text-gray-500 leading-relaxed overflow-hidden"
        >
          <span className="inline-block mr-1 word">Ensuring</span>
          <span className="inline-block mr-1 word">premium</span>
          <span className="inline-block mr-1 word">comfort</span>
          <span className="inline-block mr-1 word">and</span>
          <span className="inline-block mr-1 word">style,</span>
          <span className="inline-block mr-1 word">our</span>
          <span className="inline-block mr-1 word">meticulously</span>
          <span className="inline-block mr-1 word">crafted</span>
          <span className="inline-block mr-1 word">footwear</span>
          <span className="inline-block mr-1 word">is</span>
          <span className="inline-block mr-1 word">designed</span>
          <span className="inline-block mr-1 word">to</span>
          <span className="inline-block mr-1 word">elevate</span>
          <span className="inline-block mr-1 word">your</span>
          <span className="inline-block mr-1 word">experience,</span>
          <span className="inline-block mr-1 word">providing</span>
          <span className="inline-block mr-1 word">you</span>
          <span className="inline-block mr-1 word">with</span>
          <span className="inline-block mr-1 word">unmatched</span>
          <span className="inline-block mr-1 word">quality,</span>
          <span className="inline-block mr-1 word">innovation,</span>
          <span className="inline-block word">and</span>
          <span className="inline-block word">a</span>
          <span className="inline-block word">touch</span>
          <span className="inline-block word">of</span>
          <span className="inline-block word">elegance.</span>
        </p>
        {/* Second paragraph fades up after the first paragraph animation. */}
        <p
          ref={secondParagraphRef}
          className="mt-6 lg:max-w-lg info-text text-gray-500 leading-relaxed overflow-hidden"
        >
          <span className="inline-block">
            Our dedication to detail and excellence ensures your satisfaction.
          </span>
        </p>

        {/* CTA button animates into view after the text reveal. */}
        <div ref={buttonRef} className="mt-11 inline-flex">
          <Button label="View details" />
        </div>
      </div>

      {/* Product image slides and then continues subtle scroll motion. */}
      <div className="flex-1 flex justify-center items-center">
        <img
          ref={imageRef}
          src={shoe8}
          alt="product detail"
          width={570}
          height={522}
          className="object-contain will-change-transform"
        />
      </div>
    </section>
  );
};

export default SuperQuality;
