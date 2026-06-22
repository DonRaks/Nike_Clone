import React, { useState, useEffect, useRef } from 'react'
import Button from '../components/Button'
import { arrowRight } from '../assets/icons'
import { shoes, statistics } from '../constants'
import { bigShoe1 } from '../assets/images/index.js'
import ShoeCard from '../components/ShoeCard'
import gsap from "gsap"

const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState(bigShoe1)

  // REFS
  const descRef = useRef(null)
  const shoeRef = useRef(null)
  const statsRefs = useRef([])

  statsRefs.current = []

  // NAVBAR STAGGER (optional if you have nav items with class .nav-item)
  useEffect(() => {
    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    })
  }, [])

  // TYPEWRITER EFFECT (PARAGRAPH ONLY)
  useEffect(() => {
  const el = descRef.current;

  const words = el.innerText.split(" "); // split into words
  el.innerText = "";

  let i = 0;

  const type = () => {
    if (i < words.length) {
      el.innerText += (i === 0 ? "" : " ") + words[i];
      i++;
      setTimeout(type, 120); // slower per word (better UX)
    }
  };

  type();
}, []);

  // COUNTER UP STATS
  useEffect(() => {
    statistics.forEach((stat, i) => {
      const obj = { val: 0 }

      gsap.to(obj, {
        val: parseInt(stat.value),
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          if (statsRefs.current[i]) {
            const span = statsRefs.current[i].querySelector("span")
            if (span) span.innerText = Math.floor(obj.val) + "k+"
          }
        },
      })
    })
  }, [])

  // FLOATING SHOE (YOYO EFFECT)
  useEffect(() => {
    gsap.to(shoeRef.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [])

  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
    >
      {/* LEFT SIDE */}
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">

        <p className="text-xl font-bold text-gray-500">
          Our Summer collections
        </p>

        <h1 className="text-8xl font-palanquin max-sm:text-[52px] max-sm:leading-[32px] font-bold text-gray-100 mt-5">

          <span className="xl:bg-gradient-to-r from-gray-950 to-indigo-950 xl:whitespace-nowrap relative z-0 xl:z-10 pr-10">
            The New Arrival
          </span>

          <br />

          <span className="text-lightBlue inline-block mt-3">
            SOLEFORGE
          </span>

          shoes
        </h1>

        {/* TYPEWRITER PARAGRAPH */}
        <p
          ref={descRef}
          className="text-lg mt-6 mb-14 leading-8 sm:max-w-sm font-normal text-gray-500"
        >
          Discover  our  latest  summer  collection  and  enjoy  exclusive  discounts!
        </p>

        <Button label="Shop Now" iconURL={arrowRight} />

        {/* STATS (COUNTER ANIMATION) */}
        <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-5">
          {statistics.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRefs.current[index] = el)}
              className="flex flex-col"
            >
              <span className="text-4xl font-bold">
                0k+
              </span>
              <span className="text-lg leading-8 font-normal text-gray-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - SHOE */}
      <div className="relative flex flex-1 justify-center items-center xl:min-h-screen max-xl:py-40 bg-sky-500 bg-hero bg-cover bg-center overflow-visible">

        <img
          ref={shoeRef}
          src={bigShoeImg}
          alt="shoe collection"
          width={610}
          height={500}
          className="object-contain relative z-10 pointer-events-none"
        />

        {/* SHOE CARDS */}
        <div className="flex sm:gap-6 p-2 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6">
          {shoes.map((shoe) => (
            <div key={shoe}>
              <ShoeCard
                imgURL={shoe}
                changeBigShoeImage={(shoe) => setBigShoeImg(shoe)}
                bigShoeImg={bigShoeImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero