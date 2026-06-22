import Button from "../components/Button";


const Subscribe = () => {
  return (
    <section
      id='contact-us'
      className='max-container flex justify-between items-center max-lg:flex-col gap-10'
    >
      <h3 className='text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold'>
        Sign Up for
        <span className='text-red-400'> Updates </span>& Newsletter
      </h3>
      <div className='lg:max-w-[40%] w-full sm:w-100 flex items-center sm:h-[25] justify-between bg-white gap-5 p-2.5 sm:border sm:border-gray rounded-full'>
        <input type='text' placeholder='subscribe@soleforge.com' className='input  bg-transparent border-none' />
        <div className='flex max-sm:justify-end items-center max-sm:w-full'> 
          

          <Button label='Sign Up' fullWidth className="" />
          
        </div>
      </div>
    </section>
  );
};

export default Subscribe;