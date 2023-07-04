import Link from "next/link";


export default function CallToAction() {
  return (
        
    <div className="bg-slate-800 p-8 md:px-20 md:py-20 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
        <h2 className="text-white text-4xl md:text-6xl tracking-tight">
            Connect with your customers. Instantly
        </h2>
        <p className="text-slate-400 mt-4 text-lg md:text-xl">
            Contact visitors and turn them into happy customers. 
            Enhance their experience and boost your sales.
        </p>
        <div className="flex mt-5">
            <Link href="#">Get Started</Link>
        </div>
    </div>

  );
}
