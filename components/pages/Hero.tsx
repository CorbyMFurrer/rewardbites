import Image from "next/image";
import brain from "@/app/brain.png";
import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-10xl mx-auto bg-white flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20 relative overflow-hidden">
      {/*
      <div className="absolute top-60 right-60 w-48 h-48 bg-custom-pink rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-70 right-52 w-48 h-48 bg-custom-purple rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-8000"></div>
      <div className="absolute top-80 right-57 w-48 h-48 bg-custom-blue rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      */}
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start w-full lg:w-3/4 mt-10 lg:mt-20">
        <h1 className="font-extrabold text-3xl lg:text-6xl tracking-tight md:-mb-4 text-custom-blue">
          Connecting Top Talent to the Best Banks
        </h1>
        <button className="btn btn-custom-blue btn-wide bg-custom-blue text-white">
          Get Started Today
        </button>
      </div>
      <div className="lg:w-full mt-10">
        <Image
          src={brain}
          alt="Product Demo"
          className="w-full"
          priority={true}
          width={400} // Decreased width from 500 to 400
          height={400} // Decreased height from 500 to 400
        />
      </div>
    </section>
  );
};

export default Hero;
