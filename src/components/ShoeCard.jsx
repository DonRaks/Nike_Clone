const ShoeCard = ({ imgURL, changeBigShoeImage, bigShoeImg }) => {
  const handleClick = () => {
    if (bigShoeImg !== imgURL.bigShoe) {
      changeBigShoeImage(imgURL.bigShoe);
    }
  };

  return (
    <div
      className={`border-2 rounded-xl ${
        bigShoeImg === imgURL.bigShoe ? 'border-red-500' : 'border-transparent'
      } cursor-pointer max-sm:flex-1`}
      onClick={handleClick}
    >
      <div className="flex justify-center bg-sky-700 items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 rounded-xl max-sm:p-3">
        <img
          src={imgURL.thumbnail}
          alt="shoe colletion"
          width={127}
          height={100}
          loading="lazy"
          decoding="async"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default ShoeCard;
