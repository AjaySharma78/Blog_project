import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-orange-500",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-1 md:px-4 md:py-2 ${className} ${bgColor} ${textColor} dark:text-white dark:border-white rounded-md`} {...props}>
            {children}
        </button>
    );
}
