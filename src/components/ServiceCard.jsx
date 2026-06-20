const ServiceCard = ({ imgURL, label, subtext }) => {
  return (
    <div className='flex-1 sm:w-[350px] bg-linear-to-br from-indigo-950 via-gray-950 to-gray-900 
            shadow-2xl shadow-indigo-500/10 
            border border-white/5 
             p-6 sm:min-w-[350px] w-full rounded-[20px]  px-10 py-16'>
      <div className='w-11 h-11 flex justify-center items-center bg-red-700 rounded-full'>
        <img src={imgURL} alt={label} width={24} height={24} />
      </div>
      <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold'>
        {label}
      </h3>
      <p className='mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray'>
        {subtext}
      </p>
    </div>
  );
};

export default ServiceCard;