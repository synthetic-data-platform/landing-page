import Head from "next/head";
import Header from "../components/Header";
import AudioFileUpload from "../components/AudioFileUpload1";
import Footer from "../components/Footer";

export default function Playground(){

    return (
        <div className="flex mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Head>
                <title>Playground | Voxlab</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <Header />

            <main className="flex  px-4 mt-20 sm:mb-20 mb-8 sm:flex-row flex-col max-w-7xl md:text-center realtive">
            
                <div className="realtive">

                    {/* <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:mt-40 mt-10 md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Background Removal</span> Free to use.
                    </h1> */}
                        <p className="text-sm font-semibold text-[#333] mb-4">
                            Introducing
                        </p>

                        <h1 className="mb-4 text-7xl text-[#333] font-extrabold leading-none tracking-tight md:text-9xl lg:text-9xl dark:text-white">VcLLM</h1>

                        <p className="text-lg font-normal text-bold lg:text-xl dark:text-gray-400 mb-10">Leveraging Large Language Models for Contact Center</p>
                        
                        <AudioFileUpload/>

                </div>

                

            </main>
            <Footer/>

            </div>
    )
}