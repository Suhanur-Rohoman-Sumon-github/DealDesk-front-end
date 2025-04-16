'use client';
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const TypeWriter = () => {
  return (
    <div>
      <h1 className=" text-2xl md:w-full sm:w-10/12 mx-auto sm:text-4xl lg:text-4xl xl:text-5xl  md:text-3xl text-[#ffffff]">
        <span className="font-bold">Transform Your Online Presence with</span>{' '}
        <br />
        <span>
          <Typewriter
            words={[
              'Web Solutions',
              'Digital Marketing',
              'Buy & Sell',
              'SEO & Growth',
              'E-Commerce Dev',
              'Custom Software',
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={150}
            deleteSpeed={100}
            delaySpeed={1500}
          />
        </span>
      </h1>
    </div>
  );
};

export default TypeWriter;
