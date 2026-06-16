import { useEffect, useState } from "react";

const MobileMenu = ({ isOpen, setIsOpen, navLinks }) => {
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimateItems(false);

      const timeout = setTimeout(() => {
        setAnimateItems(true);
      }, 50);

      return () => clearTimeout(timeout);
    } else {
      setAnimateItems(false);
    }
  }, [isOpen]);

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
        transition-opacity duration-300 ease-in-out
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
      onClick={() => setIsOpen(false)}
    >
      {/* SIDEBAR */}
      <div
        className={`
          absolute top-0 left-0 h-full w-[300px]

          bg-white/10 backdrop-blur-xl
          border-r border-white/20
          shadow-2xl

          overflow-hidden

          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* glow edge */}
        <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-indigo-500 via-gray-500 to-gray-950 opacity-70" />

        {/* close */}
        <button
          className="text-white text-2xl mt-5 ml-5 hover:scale-110 transition"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        {/* LINKS */}
        <ul className="flex flex-col mt-10">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              className={`
                transform
                ${animateItems ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-20px]"}
                transition-all duration-300 hover:border-b-gray-950
              `}
              style={{
                transitionDelay: animateItems ? `${index * 120}ms` : "0ms",
              }}
            >
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="
                  group relative block px-6 py-4

                  text-white/90
                  text-lg
                  font-medium

                  border-b border-white/10

                  transition-all duration-300 ease-in-out

                  hover:bg-white/10
                  hover:translate-x-2
                  hover:text-white
                "
              >
                {link.label}

                {/* 🔥 FINAL PREMIUM HOVER BAR */}
                <span
                  className="
                    absolute left-0 bottom-0 h-[3px] w-0

                    bg-gradient-to-r
                    from-indigo-500
                    via-indigo-600
                    to-indigo-950

                    transition-all duration-300 ease-in-out

                    group-hover:w-full

                    group-hover:shadow-[0_0_12px_rgba(49,46,129,0.9)]
                  "
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;