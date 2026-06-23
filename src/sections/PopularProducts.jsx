import PopularProductCard from '../components/PopularProductCard';
import { products } from '../constants';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PopularProducts = () => {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const paragraphRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. HORIZONTAL SLIDE-IN FOR SECTION
    gsap.fromTo(
      containerRef.current,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // 2. SCROLL-BASED TEXT REVEAL FOR HEADING
    if (headerRef.current) {
      const headingChars = headerRef.current.querySelectorAll('.char');
      gsap.fromTo(
        headingChars,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 1.5,
            markers: false,
          },
        }
      );
    }

    // 3. SCROLL-BASED TEXT REVEAL FOR PARAGRAPH
    if (paragraphRef.current) {
      const paraChars = paragraphRef.current.querySelectorAll('.char');
      gsap.fromTo(
        paraChars,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1.5,
            markers: false,
          },
        }
      );
    }

    // 4. CINEMATIC IMAGE REVEAL ON SCROLL
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 150,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: index * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 30%',
            scrub: 2,
            markers: false,
          },
        }
      );

      // Parallax effect on scroll
      gsap.to(card, {
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          markers: false,
        },
        ease: 'none',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="products" className="max-container max-sm:mt-12">
      <div ref={containerRef} className="flex flex-col justify-start gap-5">
        <h2 ref={headerRef} className="text-4xl font-palanquin font-bold">
          {Array.from('Our Popular Products').map((char, i) => (
            <span key={i} className="char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
          <br />
          <span className="text-red-300">
            {Array.from('Popular').map((char, i) => (
              <span key={i} className="char inline-block">
                {char}
              </span>
            ))}
          </span>{' '}
          {Array.from('Products').map((char, i) => (
            <span key={i} className="char inline-block">
              {char}
            </span>
          ))}
        </h2>
        <p ref={paragraphRef} className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
          {Array.from(
            'Experience top-notch quality and style with our sought-after selections. Discover a world of comfort, design, and value'
          ).map((char, i) => (
            <span key={i} className="char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
        {products.map((product, index) => (
          <div key={product.name} ref={(el) => (cardsRef.current[index] = el)}>
            <PopularProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
