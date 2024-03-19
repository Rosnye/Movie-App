import React, { useState } from 'react';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-900">
        <div className="flex items-center flex-shrink-0 text-white m-6">
            <span className="font-semibold text-xl tracking-tight">Logo</span>
        </div>
        <div className="block lg:hidden">
            <button
            className="flex items-center m-6 px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
            onClick={() => setIsOpen(!isOpen)}
            >
            <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Menu</title>
                <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 6h14a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2zm0 6h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
                />
            </svg>
            </button>
        </div>
        <div
            className={`${
            isOpen ? '' : 'hidden'
            } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
            <div className="text-sm lg:flex-grow">
            <a
                href="#responsive-header"
                className="block px-8 py-4 lg:inline-block text-white hover:bg-gray-700 hover:scale-110 transition-transform duration-300"
            >
                Link 1
            </a>
            <a
                href="#responsive-header"
                className="block px-8 py-4 lg:inline-block text-white hover:bg-gray-700 hover:scale-110 transition-transform duration-300"
            >
                Link 2
            </a>
            <a
                href="#responsive-header"
                className="block px-8 py-4 lg:inline-block text-white hover:bg-gray-700 hover:scale-110 transition-transform duration-300"
            >
                Link 3
            </a>
            </div>
        </div>
        </nav>
    );
};

export default Nav;
