import React from "react";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

export default function FixedPlugin(props: { [s: string]: any }) {
  const { ...rest } = props;
  
  // Retrieve dark mode preference from local storage
  const [darkmode, setDarkmode] = React.useState(() => {
    const savedDarkMode = localStorage.getItem("darkmode");
    return savedDarkMode === "true" || document.body.classList.contains("dark");
  });

  // Update dark mode preference in local storage and document body class
  const handleDarkModeToggle = () => {
    if (darkmode) {
      document.body.classList.remove("dark");
      localStorage.setItem("darkmode", "false");
      setDarkmode(false);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("darkmode", "true");
      setDarkmode(true);
    }
  };

  React.useEffect(() => {
    if (darkmode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkmode]);

  return (
    <button
      className="border-px fixed bottom-[30px] right-[35px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full border-[#6a53ff] bg-gradient-to-br from-brandLinear to-blueSecondary p-0"
      onClick={handleDarkModeToggle}
      {...rest}
    >
      <div className="cursor-pointer text-gray-600">
        {darkmode ? (
          <RiSunFill className="h-4 w-4 text-white" />
        ) : (
          <RiMoonFill className="h-4 w-4 text-white" />
        )}
      </div>
    </button>
  );
}
