import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (

    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
  <div className="mx-auto max-w-screen-xl text-center">
      <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
      <Image
              alt="header text"
              src="/favicon.svg"
              className="sm:w-8 sm:h-8 w-10 h-10 mr-3"
              width={8}
              height={8}
          />
          Voxlab    
      </a>
      <p className="my-6 text-gray-500 dark:text-gray-400">Generate high quality datasets for Computer Vision, ASR, Virtual assistants, Chatbots, and content creation.</p>
      <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">Solutions</a>
          </li>
          <li>
              <a href="#datasets" className="mr-4 hover:underline md:mr-6">Datasets</a>
          </li>
          {/* <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">Campaigns</a>
          </li> */}
          <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Blog</a>
          </li>
          <li>
              {/* <a href="#" className="mr-4 hover:underline md:mr-6">Affiliate Program</a> */}
          </li>
          <li>
              {/* <a href="#" className="mr-4 hover:underline md:mr-6">FAQs</a> */}
          </li>
          <li>
              <a               
              href="https://tally.so/r/m6e6EA"
              target="_blank"
              rel="noopener noreferrer" className="mr-4 hover:underline md:mr-6">Contact</a>
          </li>
      </ul>
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">Voxlab™</a>. All Rights Reserved.</span>
  </div>
</footer>

  );
}
