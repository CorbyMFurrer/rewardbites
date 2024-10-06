"use client";

import { useState, useRef } from "react";
import type { JSX } from "react";
import Image from "next/image";
import { PiBooks } from "react-icons/pi";
import { LiaVideoSolid } from "react-icons/lia";
import { FaRegCheckSquare } from "react-icons/fa";
import { RiArticleLine } from "react-icons/ri";
import compliance from "app/compliance.png";
import library from "app/prompt-library.png";
import board from "app/board.png";
import training from "app/training.png";

interface Feature {
  title: string;
  description: string;
  type?: "video" | "image";
  path?: string;
  format?: string;
  alt?: string;
  svg?: JSX.Element;
}

// The features array is a list of features that will be displayed in the accordion.
// - title: The title of the feature
// - description: The description of the feature (when clicked)
// - type: The type of media (video or image)
// - path: The path to the media (for better SEO, try to use a local path)
// - format: The format of the media (if type is 'video')
// - alt: The alt text of the image (if type is 'image')
{
  /* if a massive error is thrown it is because of the path "training" not being viable and i ts ignored it directly below this*/
}
// @ts-ignore
const features = [
  {
    title: "Training",
    description:
      "Dive into our comprehensive video series tailored for educators and administrators ready to learn about AI. Our expert-led training ensures your faculty and staff can leverage AI technology effectively and responsibly.",
    type: "image",
    path: training,
    alt: "Training Image",
    svg: <LiaVideoSolid className="w-6 h-6" />,
  },

  {
    title: "Compliance",
    description:
      "We offer certifications through module tracking so administrators can uphold the highest standards of training. Ensure your district is compliant with the latest regulations and equipped with the knowledge to apply AI ethically and effectively.",
    type: "image",
    path: compliance,
    alt: "A computer",
    svg: <FaRegCheckSquare className="w-5 h-5" />,
  },
  {
    title: "Prompt Libraries",
    description:
      "Access our curated libraries of practical AI prompts to inspire and guide educators and administrators. Our prompts are designed to maximize output quality, enabling users to see what prompting strategies work. Also, stakeholders can post new prompts as they discover them!",
    type: "image",
    path: library,
    alt: "A computer",
    svg: <PiBooks className="w-6 h-6" />,
  },
  {
    title: "Discussion Boards",
    description:
      "Leverage the collective wisdom of educators on our moderated discussion boards. Get your queries addressed by experts and share best practices to elevate the use of AI in K-12 education, ensuring every stakeholder benefits from tailored, tech-forward learning experiences.",
    type: "image",
    path: board,
    alt: "A computer",
    svg: <RiArticleLine className="w-6 h-6" />,
  },
] as Feature[];

// An SEO-friendly accordion component including the title and a description (when clicked.)
const Item = ({
  feature,
  isOpen,
  setFeatureSelected,
}: {
  index: number;
  feature: Feature;
  isOpen: boolean;
  setFeatureSelected: () => void;
}) => {
  const accordion = useRef(null);
  const { title, description, svg } = feature;

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-medium text-left md:text-lg text-custom-purple"
        onClick={(e) => {
          e.preventDefault();
          setFeatureSelected();
        }}
        aria-expanded={isOpen}
      >
        <span className={`duration-100 ${isOpen ? "text-primary" : ""}`}>
          {svg}
        </span>
        <span
          className={`flex-1 text-base-content ${
            isOpen ? "text-primary font-semibold" : ""
          }`}
        >
          <h3 className="inline">{title}</h3>
        </span>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out text-base-content-secondary overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{description}</div>
      </div>
    </li>
  );
};

// A component to display the media (video or image) of the feature. If the type is not specified, it will display an empty div.
// Video are set to autoplay for best UX.
const Media = ({ feature }: { feature: Feature }) => {
  const { type, path, format, alt } = feature;
  const style = "rounded-2xl aspect-square w-full sm:w-[26rem]";
  const size = {
    width: 500,
    height: 500,
  };

  if (type === "video") {
    return (
      <video
        className={style}
        autoPlay
        muted
        loop
        playsInline
        controls
        width={size.width}
        height={size.height}
      >
        <source src={path} type={format} />
      </video>
    );
  } else if (type === "image") {
    return (
      <Image
        src={path}
        alt={alt}
        className={`${style} object-cover object-center`}
        width={size.width}
        height={size.height}
      />
    );
  } else {
    return <div className={`${style} !border-none`}></div>;
  }
};

// A component to display 2 to 5 features in an accordion.
// By default, the first feature is selected. When a feature is clicked, the others are closed.
const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState<number>(0);

  return (
    <section
      className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-8xl mx-auto bg-gray-100 "
      id="features"
    >
      <div className="px-8">
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24 text-black">
          Everything Your District Needs to
          <span className="bg-black text-custom-purple px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
            Enter the Age of AI
          </span>
        </h2>
        <div className=" flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
            <ul className="w-full">
              {features.map((feature, i) => (
                <Item
                  key={feature.title}
                  index={i}
                  feature={feature}
                  isOpen={featureSelected === i}
                  setFeatureSelected={() => setFeatureSelected(i)}
                />
              ))}
            </ul>

            <Media feature={features[featureSelected]} key={featureSelected} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;
