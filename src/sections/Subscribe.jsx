import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../components/Button";

gsap.registerPlugin(ScrollTrigger);

const Subscribe = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id='contact-us'
      ref={sectionRef}
      className='max-container flex justify-between items-center max-lg:flex-col gap-10'
    >
      <h3 className='text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold'>
        Sign Up for
        <span className='text-red-400'> Updates </span>& Newsletter
      </h3>
      <div ref={formRef} className='lg:max-w-[40%] w-full sm:w-100 flex items-center sm:h-[25] justify-between bg-white gap-5 p-2.5 sm:border sm:border-gray rounded-full'>
        <input type='text' placeholder='subscribe@soleforge.com' className='input  bg-transparent border-none' />
        <div className='flex max-sm:justify-end items-center max-sm:w-full'> 
          <Button label='Sign Up' fullWidth className="" />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;