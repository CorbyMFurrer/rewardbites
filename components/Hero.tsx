import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import brain from "@/app/brain.png";
import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-10xl mx-auto bg-black flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-3xl lg:text-6xl tracking-tight md:-mb-4 text-custom-blue">
          Welcome to the future of education
        </h1>
        <button className="btn btn-primary btn-wide bg-custom-blue text-black">
          Start Learning Today
        </button>
      </div>
      <div className="lg:w-full">
        <Image
          src={brain}
          alt="Product Demo"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
