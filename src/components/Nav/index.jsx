import React, { useState } from 'react';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-Purple bg-opacity-80">
        <div className="flex items-center flex-shrink-0 text-white mx-16 my-4">
            <h1 className='text-4xl font-semibold bg-gradient-to-r from-Gold to-Orange drop-shadow-lg rounded p-2 flex'>OMDB Api 
            <img src="./assets/cinema-default.svg" alt="Imagen por defecto" className='w-12 ml-4'/>  </h1>
        </div>
        </nav>
    );
};

export default Nav;
