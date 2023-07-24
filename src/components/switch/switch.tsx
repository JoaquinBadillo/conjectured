"use client";

import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkMode from "../../hooks/useDarkMode";
 
export const Switch = () => {
    const [colorTheme, setTheme] = useDarkMode();
    const [darkSide, setDarkMode] = useState(
        colorTheme === "light" ? true : false
    );
 
    const toggleDarkMode = (checked: boolean) => {
        setTheme(colorTheme);
        setDarkMode(checked);
    };
 
    return (
        <div className="md:w-8 md:h-8 md:shadow-md md:rounded-md md:shadow-gray-700 md:dark:shadow-gray-300 md:flex md:justify-center md:items-center">
            <DarkModeSwitch
                checked={darkSide}
                onChange={toggleDarkMode}
            />
        </div>
    );
}