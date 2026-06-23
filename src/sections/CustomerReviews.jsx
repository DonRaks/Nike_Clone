import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReviewCard from '../components/ReviewCard';
import { reviews } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const CustomerReviews = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([headlineRef.current, paragraphRef.current], {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            delay: index * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="max-container">
      <h3 ref={headlineRef} className="font-palanquin text-center text-4xl font-bold">
        What Our
        <span className="text-red-400"> Customers </span>
        Say?
      </h3>
      <p ref={paragraphRef} className="m-auto mt-4 max-w-lg  text-center info-text">
        Hear genuine stories from our satisfied customers about their exceptional experiences with
        us.
      </p>

      <div className="mt-24 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14">
        {reviews.map((reviews, index) => (
          <div
            key={reviews.customerName}
            ref={(el) => (cardsRef.current[index] = el)}
            className="w-full"
          >
            <ReviewCard
              imgURL={reviews.imgURL}
              customerName={reviews.customerName}
              rating={reviews.rating}
              feedback={reviews.feedback}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
