import { useState, useRef, useEffect } from "react";
import "./dropdownMenu.css";

const DropdownMenu = ({ options = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (onClick) => {
    onClick?.();
    setIsMenuOpen(false);
  };

  return (
    <div className="dropdown-container" style={{ position: "relative", display: "inline-block" }}>
      <button
        ref={buttonRef}
        className="dots-button"
        onClick={toggleMenu}
        style={{ zIndex: 1 }} // ensure button is clickable
      >
        ⋮
      </button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="dropdown-menu"
          style={{
            position: "absolute",
            top: "100%", // directly below the button
            right: 0, // align right
            zIndex: 1000, // ensure it appears above everything
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleOptionClick(option.onClick)}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
