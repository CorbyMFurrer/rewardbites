import Image from "next/image";
import config from "@/config";

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      {/*<div className="absolute top-30 left-0 w-60 h-60 bg-black rounded mt-20 mix-blend-multiply "></div>*/}
      <div className="relative hero-overlay bg-neutral"></div>
      <div className="relative hero-content text-center text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 md:mb-6 text-white">
            Advance Your Educators Today
          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16">
            Learn from experienced consultants, researchers, and AI educators
            who have helped institutions worldwide.
          </p>

          <button className="btn btn-primary bg-custom-blue btn-wide text-white">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
