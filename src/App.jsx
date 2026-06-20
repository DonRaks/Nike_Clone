import React from 'react';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import { PopularProducts, SuperQuality } from './sections';


const App = () => {
  return (
    <main className='relative bg-gradient-to-r from-gray-950 to-indigo-950 min-h-screen overflow-hidden text-white'>
      <Nav/>

      <section className='xl:padding-l wide:padding-r padding-b '>
        <Hero/>
      </section>

      <section className='padding '>
        <PopularProducts/>
      </section>

      <section className='padding'>
        <SuperQuality/>
      </section>

      <section className='padding-x py-10'>
        Services
      </section>

      <section className='padding'>
        Special Offer
      </section>

      <section className='bg-pale-blue padding'>
        Customer Reviews
      </section>

      <section className='padding-x sm:py-32 py-16 w-full'>
        Subscribe
      </section>

      <section className='bg-black padding-x padding-t pb-8'>
        Footer
      </section>
    </main>
  );
};

export default App;