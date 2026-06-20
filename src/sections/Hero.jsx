import React from 'react'
import Button from '../components/Button'
import {arrowRight} from '../assets/icons'
import {shoes, statistics} from '../constants'
import {bigShoe1} from '../assets/images/index.js'
import ShoeCard from '../components/ShoeCard'
import { useState } from 'react'


const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState(bigShoe1);


  return (
    <section id="home" className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container'>

      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">
        <p className="text-xl font-bold text-gray-500">Our Summer collections</p>
        {/* this is the heading of the hero section */}

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

        <p className="text-lg mt-6 mb-14 leading-8 sm:max-w-sm font-normal text-gray-500">Discover our latest summer collection and enjoy exclusive   discounts!</p>

        <Button label="Shop Now" iconURL= {arrowRight}/>
        {/* this is the statistics container */}

        <div className="flex justify-start items-start  flex-wrap w-full mt-20 gap-5">
            {statistics.map((stat,index) => (
              <div key={index} className="flex flex-col">
                <span className="text-4xl font-bold">{stat.value}</span>
                <span className="text-lg leading-8 font-normal text-gray-500">{stat.label}</span>
              </div>
            ))}

        </div>   
          
      </div>

      {/* this is the big shoe image container */}
      <div className="relative flex flex-1 justify-center items-center xl:min-h-screen max-xl:py-40 bg-sky-500 bg-hero bg-cover bg-center">
        <img src={bigShoeImg} alt='shoe collection '
         width={610} height={500} className="object-contain relative z-10" />

      

            {/* this is the shoe card container */}
          <div className='flex sm:gap-6 p-2 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6'>
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