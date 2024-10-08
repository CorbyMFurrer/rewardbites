import type { JSX } from "react";
import Image, { StaticImageData } from "next/image";
import marcImg from "@/app/blog/_assets/images/authors/corby-headshot.png";
import introducingSupabaseImg from "@/public/blog/introducing-supabase/openai-logo.jpg";
import step1 from "@/public/blog/introducing-supabase/step1.png";
import step2 from "@/public/blog/introducing-supabase/step2.png";
import step4 from "@/public/blog/introducing-supabase/step4.png";
import step3 from "@/public/blog/introducing-supabase/step3.png";

// ==================================================================================================================================================================
// BLOG CATEGORIES 🏷️
// ==================================================================================================================================================================

export type categoryType = {
  slug: string;
  title: string;
  titleShort?: string;
  description: string;
  descriptionShort?: string;
};

// These slugs are used to generate pages in the /blog/category/[categoryI].js. It's a way to group articles by category.
const categorySlugs: { [key: string]: string } = {
  feature: "feature",
  tutorial: "tutorial",
};

// All the blog categories data display in the /blog/category/[categoryI].js pages.
export const categories: categoryType[] = [
  {
    // The slug to use in the URL, from the categorySlugs object above.
    slug: categorySlugs.feature,
    // The title to display the category title (h1), the category badge, the category filter, and more. Less than 60 characters.
    title: "New Features",
    // A short version of the title above, display in small components like badges. 1 or 2 words
    titleShort: "Features",
    // The description of the category to display in the category page. Up to 160 characters.
    description:
      "Here are the latest features we've added to ShipFast. I'm constantly improving our product to help you ship faster.",
    // A short version of the description above, only displayed in the <Header /> on mobile. Up to 60 characters.
    descriptionShort: "Latest features added to ShipFast.",
  },
  {
    slug: categorySlugs.tutorial,
    title: "How Tos & Tutorials",
    titleShort: "Tutorials",
    description:
      "Learn how to use ShipFast with these step-by-step tutorials. I'll show you how to ship faster and save time.",
    descriptionShort:
      "Learn how to use ShipFast with these step-by-step tutorials.",
  },
];

// ==================================================================================================================================================================
// BLOG AUTHORS 📝
// ==================================================================================================================================================================

export type authorType = {
  slug: string;
  name: string;
  job: string;
  description: string;
  avatar: StaticImageData | string;
  socials?: {
    name: string;
    icon: JSX.Element;
    url: string;
  }[];
};

// Social icons used in the author's bio.
const socialIcons: {
  [key: string]: {
    name: string;
    svg: JSX.Element;
  };
} = {
  twitter: {
    name: "Twitter",
    svg: (
      <svg
        version="1.1"
        id="svg5"
        x="0px"
        y="0px"
        viewBox="0 0 1668.56 1221.19"
        className="w-9 h-9"
        // Using a dark theme? ->  className="w-9 h-9 fill-white"
      >
        <g id="layer1" transform="translate(52.390088,-25.058597)">
          <path
            id="path1009"
            d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99   h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
          />
        </g>
      </svg>
    ),
  },
  linkedin: {
    name: "LinkedIn",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
  github: {
    name: "GitHub",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
};

// These slugs are used to generate pages in the /blog/author/[authorId].js. It's a way to show all articles from an author.
const authorSlugs: {
  [key: string]: string;
} = {
  marc: "marc",
};

// All the blog authors data display in the /blog/author/[authorId].js pages.
export const authors: authorType[] = [
  {
    // The slug to use in the URL, from the authorSlugs object above.
    slug: authorSlugs.marc,
    // The name to display in the author's bio. Up to 60 characters.
    name: "Corby Furrer",
    // The job to display in the author's bio. Up to 60 characters.
    job: "Head of AI",
    // The description of the author to display in the author's bio. Up to 160 characters.
    description:
      "Corby is an AI economist, developer, and entrepreneur. In his last venture, Corby realized that for AI to enter the education ecosystem, stakeholders need to be able to trust and understand AI in a digestable manner. He is now working on to bridge the AI knowledge gap.",
    // The avatar of the author to display in the author's bio and avatar badge. It's better to use a local image, but you can also use an external image (https://...)
    avatar: marcImg,
    // A list of social links to display in the author's bio.
    socials: [
      {
        name: socialIcons.twitter.name,
        icon: socialIcons.twitter.svg,
        url: "https://twitter.com/",
      },
      {
        name: socialIcons.linkedin.name,
        icon: socialIcons.linkedin.svg,
        url: "https://www.linkedin.com/in/corby-furrer/",
      },
      {
        name: socialIcons.github.name,
        icon: socialIcons.github.svg,
        url: "https://github.com/",
      },
    ],
  },
];

// ==================================================================================================================================================================
// BLOG ARTICLES 📚
// ==================================================================================================================================================================

export type articleType = {
  slug: string;
  title: string;
  description: string;
  categories: categoryType[];
  author: authorType;
  publishedAt: string;
  image: {
    src?: StaticImageData;
    urlRelative: string;
    alt: string;
  };
  content: JSX.Element;
};

// These styles are used in the content of the articles. When you update them, all articles will be updated.
const styles: {
  [key: string]: string;
} = {
  h2: "text-2xl lg:text-4xl font-bold tracking-tight mb-4 text-base-content",
  h3: "text-xl lg:text-2xl font-bold tracking-tight mb-2 text-base-content",
  p: "text-base-content/90 leading-relaxed",
  ul: "list-inside list-disc text-base-content/90 leading-relaxed",
  li: "list-item",
  // Altnernatively, you can use the library react-syntax-highlighter to display code snippets.
  code: "text-sm font-mono bg-neutral text-neutral-content p-6 rounded-box my-4 overflow-x-scroll select-all",
  codeInline:
    "text-sm font-mono bg-base-300 px-1 py-0.5 rounded-box select-all",
};

// All the blog articles data display in the /blog/[articleId].js pages.
export const articles: articleType[] = [
  {
    // The unique slug to use in the URL. It's also used to generate the canonical URL.
    slug: "introducing-supabase",
    // The title to display in the article page (h1). Less than 60 characters. It's also used to generate the meta title.
    title: "How to Protect Student Data While Using Chat GPT",
    // The description of the article to display in the article page. Up to 160 characters. It's also used to generate the meta description.
    description:
      "Chat GPT is a powerful tool for education. How can you ensure student data is protected while using it? In this tutorial, I uncover the easiest way to keep student data safe while using AI. ",
    // An array of categories of the article. It's used to generate the category badges, the category filter, and more.
    categories: [
      categories.find((category) => category.slug === categorySlugs.tutorial),
    ],
    // The author of the article. It's used to generate a link to the author's bio page.
    author: authors.find((author) => author.slug === authorSlugs.marc),
    // The date of the article. It's used to generate the meta date.
    publishedAt: "2023-11-20",
    image: {
      // The image to display in <CardArticle /> components.
      src: introducingSupabaseImg,
      // The relative URL of the same image to use in the Open Graph meta tags & the Schema Markup JSON-LD. It should be the same image as the src above.
      urlRelative: "/blog/introducing-supabase/header.jpg",
      alt: "Supabase and ShipFast logo combined",
    },
    // The actual content of the article that will be shown under the <h1> title in the article page.
    content: (
      <>
        <Image
          src={introducingSupabaseImg}
          alt="Supabase and ShipFast logo combined"
          width={700}
          height={500}
          priority={true}
          className="rounded-box"
          placeholder="blur"
        />
        <section>
          <h2 className={styles.h2}>Introduction</h2>
          <p className={styles.p}>
            Chat GPT is a powerful tool for educators. It can write emails,
            change the reading level of texts without losing content, help
            teachers lesson plan, and more. However, GPT was not constructed
            with student data privacy in mind. In this tutorial, I will show you
            how to ensure that AI models don&apos;t learn from student data
            while you use it.
          </p>
        </section>

        <section>
          <h3 className={styles.h3}>1. Why Can&apos;t I Use GPT as is?</h3>
          <p className={styles.p}>
            There is an old saying in software: &quote;if the product is free,
            then you are the product.&quote; This is true for OpenAI&apos;s chat
            GPT too. While OpenAI&apos;s GPT-3 and GPT-3.5 Turbo are fantastic
            free tools, they are free because OpenAI is training the models on
            your data. This is not a secret, nor is it done with malicious
            intent, but it does affect the way educators should use it in a
            school enviornment.
            <br />
            Before we go any further, let&apos;s define what it means for an AI
            system to &quote;Learn From Your Usage&quote;.
          </p>

          <pre className={styles.code}>
            <code>
              {`AI learning refers to the process by which artificial intelligence systems 
              improve their performance on a specific task over time through the acquisition, 
              processing, and application of knowledge. 

              This process involves algorithms analyzing data, identifying patterns, 
              and making decisions or predictions, with the aim of minimizing errors and 
              enhancing accuracy without being explicitly programmed for every scenario.`}
            </code>
          </pre>
          <p className={styles.p}>
            Notice how it states that performance improves through the
            &quote;acquisition, processing, and application of knowledge.&quote;
            We do not want OpenAI acquiring, processing, and applying knowledge
            from student data. If OpenAI&apos;s models train on student data, it
            could resurface to other users when they are using the same model.
            Since most of the world uses Chat GPT, that would mean the whole
            world could potentially access your student&apos;s data on accident.
          </p>
        </section>

        <section>
          <h3 className={styles.h3}>2. How to Turn off Learning in GPT</h3>
          <p className={styles.p}>
            Go into your GPT chat window.
            <div style={{ margin: "10px 0" }}>
              <Image src={step1} alt="Step 1" style={{ borderRadius: "5px" }} />
            </div>
            Locate your profile in the bottom left corner.
            <div style={{ margin: "10px 0" }}>
              <Image src={step2} alt="Step 2" style={{ borderRadius: "5px" }} />
            </div>
            Select &quote;Settings and Beta&quote;
            <div style={{ margin: "10px 0" }}>
              <Image src={step3} alt="Step 3" style={{ borderRadius: "5px" }} />
            </div>
            Select Data Control and toggle off &quote;Chat History and
            Training&quote;
            <div style={{ margin: "10px 0" }}>
              <Image src={step4} alt="Step 4" style={{ borderRadius: "5px" }} />
            </div>
            <span className={styles.codeInline}>
              when you are finished, you will see a box in the upper left hand
              corner of your screen with a power button. This means that you
              have successfully disabled learning. Your data is now safe!
            </span>
          </p>
        </section>
      </>
    ),
  },
];
