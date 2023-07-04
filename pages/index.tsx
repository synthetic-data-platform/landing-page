import React, { lazy } from 'react';

import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import Image from 'next/image';

const Tools = lazy(() => import('../components/Tools'));


import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';



const Home: NextPage = () => {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
      <title>imgai | Free AI powered img Processing Tools</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-16 mt-10">
        <a
          href="https://twitter.com/rahul_jalindar/status/1674156276920483840"
          target="_blank"
          rel="noreferrer"
          className="mx-auto sm:mb-10 mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 248 204"
            className="h-5 w-5 text-[#1d9bf0]"
          >
            <path
              fill="currentColor"
              d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
            />
          </svg>
          </div>
          <p className="text-sm font-semibold text-[#27a7fc]">
            Introducing imgai
          </p>
        </a>
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl">
          
        <span className="relative whitespace-nowrap text-[#3290EE]">
            <SquigglyLines />
            <span className="relative mr-2">Free AI Powered</span>
            <br></br>
          </span>{" "}
          image Processing Tools{" "}
          
        </h1>

        <p className="mx-auto sm:mt-5 mt-5 max-w-xl text-lg text-slate-700 leading-7">
          Elevate your visuals effortlessly. Unleash the artistry within. 
          Transform images with a few clicks.
        </p>
        <div className="flex justify-center space-x-4">
          
          

          <Link
            className="items-center mt-7 justify-center font-medium rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black lg:w-auto px-6 py-3 text-center text-white"
            href="/bg-remove#processing"
          >
            Remove Background
          </Link>

          <Link
            className="items-center mt-7 justify-center font-medium rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-blue-500 border-2 duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black lg:w-auto px-6 py-3 text-center text-white"
            href="#Tools"
          >
            Explore all Tools
          </Link>
        </div>
        {/* <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-2 sm:flex-row flex-col">
              <div>

              <ReactCompareSlider
                itemOne={<ReactCompareSliderImage src="https://ik.imagekit.io/uti9laa1e/bg-removal-updated-old_QW2tI8Fti?updatedAt=1687183567207"  alt="Image one" />}
                itemTwo={<ReactCompareSliderImage src="https://ik.imagekit.io/uti9laa1e/bg-removal-updated-new_c6AqAKAkuO?updatedAt=1687183627404"  alt="Image two" />}
                className="sm:w-[600px] h-[500px] mt-5 rounded-3xl sm:ml-5 ml-5"
              />

                

                <video 
                  className="lozad rounded-2xl min-w-full h-auto flex justify-center items-center" 
                  data-poster="https://online.hitpaw.com/images/online-tools-land/photo-enhancer/losing.png" 
                  autoPlay muted loop webkit-playsinline playsInline 
                  poster="https://online.hitpaw.com/images/online-tools-land/photo-enhancer/losing.png" 
                  data-loaded="true">
                    <source data-src="https://online.hitpaw.com/videos/photo-enhancer/losing.mp4" type="video/mp4" src="https://online.hitpaw.com/videos/photo-enhancer/losing.mp4"/>
                </video>
                
              </div>
              
                <h2 className="mb-1 font-medium text-lg">Original Photo</h2>
                  <Image
                    alt="Original photo of my bro"
                    src="https://ik.imagekit.io/uti9laa1e/bg-removal-updated-old_QW2tI8Fti?updatedAt=1687183567207"
                    className="rounded-2xl relative"
                    width={400}
                    height={400}
                  />

                  <h2 className="mb-1 font-medium text-lg">Restored Photo</h2>
                  <Image
                    alt="Restored photo of my bro"
                    width={400}
                    height={400}
                    src="https://ik.imagekit.io/uti9laa1e/bg-removal-updated-new_c6AqAKAkuO?updatedAt=1687183627404"
                    className="w-96 h-96 rounded-2xl sm:mt-0 mt-2"
                  />
              
            </div>
          </div>
        </div> */}

        <div className="flex justify-between items-center w-full flex-col sm:mt-14 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-2 sm:flex-row flex-col">
              <div>
                <h2 className="mb-1 font-medium text-lg">Original Photo</h2>
                <Image
                  alt="photo from internet"
                  src="https://ik.imagekit.io/uti9laa1e/bg-removal-updated-old_QW2tI8Fti?updatedAt=1687183567207"
                  className="w-96 h-96 rounded-2xl sm:mt-4 mt-4 mx-auto"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h2 className="mb-1 font-medium text-lg">Background Removed Photo</h2>
                <Image
                  alt="background removed"
                  width={400}
                  height={400}
                  src="https://ik.imagekit.io/uti9laa1e/bg-removal-updated-new_c6AqAKAkuO?updatedAt=1687183627404"
                  className="w-96 h-96 rounded-2xl sm:mt-4 mt-4"
                />
              </div>
            </div>
          </div>
          </div>
      </main>
      <Tools />
    </div>
  );
};

export default Home;
