import  { useState, useEffect } from 'react';
import { MdDarkMode } from "react-icons/md";
import { IoIosSunny } from "react-icons/io";

function Mode() {
    const [mode, setMode] = useState(localStorage.getItem("mode"));
    useEffect(() => {
      if (mode === "dark") {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    }, [mode]);


    const handleClick = () => {
        if(mode === "light") {
            setMode("dark");
            localStorage.setItem("mode", "dark");
            
        } else {
            setMode("light");
            localStorage.setItem("mode", "light");
        }
    }
  return (
    <div style={{marginLeft: "5px"}}>
      <button
        onClick={handleClick}
        style={{
          border: "2px solid #fff",
          padding: "3px",
          borderRadius: "50%",
        }}
      >
        {mode === "light" ? (
          <MdDarkMode style={{ fontSize: "2.2rem" }} />
        ) : (
          <IoIosSunny style={{ fontSize: "2.2rem", color: "#fff" }} />
        )}
      </button>
    </div>
  );
}

export default Mode