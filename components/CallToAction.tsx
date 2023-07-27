import Link from "next/link";


export default function CallToAction() {
  return (     
    <section className="">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-24">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-[#333] md:text-4xl lg:text-5xl">Accelerate your growth with synthetic data</h1>
            <p className="mb-8 text-lg font-normal text-[#333] lg:text-xl sm:px-16 lg:px-48">Voxlab is pioneering in generating synthetic dataset. It is cheap and fast to generate synthetic dataset as compared to collecting real world dataset. Contact us to see how we can help you.</p>
            <div className="flex space-x-4 items-center justify-center">
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
        </div>
    </section>



  );
}
