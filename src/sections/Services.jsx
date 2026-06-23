import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '../components/ServiceCard';
import { services } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: index * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
              markers: false,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="max-container flex justify-center flex-wrap gap-9">
      {services.map((service, index) => (
        <div
          key={service.label}
          ref={(el) => (cardsRef.current[index] = el)}
          className="w-full sm:w-[350px]"
        >
          <ServiceCard {...service} />
        </div>
      ))}
    </section>
  );
};

export default Services;
