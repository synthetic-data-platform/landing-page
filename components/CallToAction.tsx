import Link from "next/link";


export default function CallToAction() {
  return (     
    <section className="sm:mt-40">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-24">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-[#333] md:text-4xl lg:text-5xl whitespace-wrap">Enhancing Contact Center Efficiency with AI</h1>
            <p className="mb-8 text-lg font-normal text-[#333] lg:text-xl sm:px-16 lg:px-48">Voxlab is pioneering in Generative AI solutions for Contact Center. Contact us to see how we can help you.</p>
            <div className="flex space-x-4 items-center justify-center">
            

            <div className="relative inline-flex group mt-6">
              <div
                  className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
              </div>
              <a href="/playground" title="Get quote now"
                  className="relative inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  role="button">Try it for yourself
              </a>
          </div>

          <Link
              className="mt-7 inline-flex items-center justify-center rounded-xl border-2 bg-[#6a32ee] px-6 py-3 text-center font-medium text-white duration-200 hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black focus-visible:ring-black lg:w-auto"
              href="https://tally.so/r/m6e6EA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </Link>

            {/* <Link
              className="mt-7 inline-flex items-center justify-center rounded-xl border-2 bg-[#6a32ee] px-6 py-3 text-center font-medium text-white duration-200 hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black focus-visible:ring-black lg:w-auto"
              href="/playground"
            >
              Try it for yourself
            </Link> */}
          </div>
        </div>
    </section>



  );
}
