import React, { lazy } from "react";

import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Datasets from "../components/datasets";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Solutions from "../components/Solutions";
import TabsTest from "../components/TabsTest";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const Home: NextPage = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center py-2">
      <Head>
        <title>VoxLab | Enhance AI with Synthetic data </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="mt-10 grid w-full gap-10 px-4 sm:ml-40 sm:mt-16 sm:grid-cols-2">
        <div className="mt-10 sm:mt-16">
          <img
            src="https://tinypixel.pythonanywhere.com/pixel.gif?page=voxlab-landing-page"
            style={{ width: "1px", height: "1px" }}
          />
          <h1 className="font-display mx-auto max-w-4xl text-4xl font-bold tracking-normal text-slate-900 sm:text-5xl">
            <span className="relative whitespace-nowrap text-[#333]">
              <span className="relative mr-2">Enhance AI with</span>
            </span>
          </h1>

          <h1 className="font-display mx-auto max-w-4xl text-4xl font-bold tracking-normal text-[#333] sm:mt-2 sm:text-5xl">
            Synthetic data
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-[#333] sm:mt-5">
            Generate high quality datasets for Computer Vision, ASR, Virtual
            assistants, Chatbots, and content creation.
          </p>

          <div className=" grid-cols-3 mt-3 w-full md:w-[55%] lg:w-full mx-auto">
        </div> 

          <div className="flex space-x-4">
            <Link
              className="mt-7 inline-flex items-center justify-center rounded-xl border-2 bg-[#333] px-6 py-3 text-center font-medium text-white duration-200 hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black focus-visible:ring-black lg:w-auto"
              href="https://tally.so/r/m6e6EA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </Link>

            <Link
              className="mt-7 inline-flex items-center justify-center rounded-xl border-2 bg-[#6a32ee] px-6 py-3 text-center font-medium text-white duration-200 hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black focus-visible:ring-black lg:w-auto"
              href="#datasets"
            >
              Explore Synthetic Datasets
            </Link>
          </div>

          {/* <li className="mt-5 ml-2">commercial use &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; •  GDPR compliance  </li> */}
        </div>
        

        <div>
          <video
            src="https://uploads-ssl.webflow.com/62fa8255a7287e714931a2ad/62fa85a47f6f589559851bfc_web_white-transcode.mp4"
            width="100%"
            height="auto"
            autoPlay
            loop
            muted
            playsInline
            className="mt-10"
          ></video>
        </div>
      </main>

      <Testimonials />
      <Datasets />
      <Solutions />
      {/* <TabsTest /> */}
      {/* <Features  /> */}
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
