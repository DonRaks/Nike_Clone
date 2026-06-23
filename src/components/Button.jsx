import React from 'react';

const Button = ({ label, iconURL }) => {
  return (
    <button className="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition-colors duration-300">
      {label}
      {iconURL && (
        <img src={iconURL} alt="Icon_arrow" className="ml-2 rounded-full" loading="lazy" decoding="async" />
      )}
    </button>
  );
};

export default Button;
