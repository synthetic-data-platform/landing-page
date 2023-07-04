import Head from "next/head";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import Link from "next/link";
import Processing from "../components/ProcessingColorize"

export default function ImgEnhancement(){
    return (
        <div className="flex mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Head>
            <title>Colorize Old photos | imgai</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <Header />

            <main className="flex flex-1 px-4 mt-4 sm:mb-0 mb-8 sm:flex-row flex-col max-w-6xl">
            
            <div>

            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:mt-40 mt-10 md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-fuchsia-600 from-sky-400">Colorize Old photos</span> <br />Free to use.</h1>

                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Enhancement your image upto 4x or 8x in seconds.</p>

                <Link
                    className="items-center mt-7 justify-center font-medium rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black lg:w-auto px-6 py-3 text-center text-white"
                    href="/colorize/#processing"
                >
                    Colorize Now
                </Link>

                <Link
                    className="sm:ml-10 ml-5 items-center mt-7 justify-center font-medium rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-blue-500 border-2 duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black lg:w-auto px-6 py-3 text-center text-white"
                    href="#Tools"
                    data-tally-open="mDKWKE" data-tally-layout="modal" data-tally-align-left="1" data-tally-width="450"
                    data-tally-hide-title="1" data-tally-emoji-text="👋" data-tally-emoji-animation="head-shake" data-tally-auto-close="5000"
                >
                    Contact Us
                </Link>

            </div>

                <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage src="https://ik.imagekit.io/uti9laa1e/colrize-1.jpeg?updatedAt=1687243778517"  alt="Image one" />}
                    itemTwo={<ReactCompareSliderImage src="https://ik.imagekit.io/uti9laa1e/colrize-new.png?updatedAt=1687243779261"  alt="Image two" />}
                    className="flex sm:w-[600px] h-[400px] rounded-3xl sm:mt-20 mt-10 "
                />

            
            </main>

            <Processing versionID="9451bfbf652b21a9bccc741e5c7046540faa5586cfa3aa45abc7dbb46151a4f7" processingText='Colorized'/>

        </div>
    )
} 