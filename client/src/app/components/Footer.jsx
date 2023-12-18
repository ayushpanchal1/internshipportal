"use client"
import React from 'react';

const Footer = () => {
  return (
    <footer className=' bg-black h-40 hover:bg-slate-800 text-white'>
      <div className='flex p-5 justify-around'>
        <div className='text-center flex flex-col justify-center'>
          <h1 className='text-3xl text-white hover:text-blue-200'>
            ABOUT MY Internship Portal Project
          </h1>
          <p className=' text-white hover:text-blue-200'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio, iste?
          </p>
        </div>
        <div className=' text-white hover:text-blue-200 flex items-center'>
          <ul className='flex space-x-12 pt-12'>
            <li>
              <a href="#!">Facebook</a>
            </li>
            <li>
              <a href="#!">Youtube</a>
            </li>
            <li>
              <a href="#!">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
