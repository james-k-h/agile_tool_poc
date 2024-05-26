import Link from 'next/link';

import { LinkedinIcon, GithubIcon } from '@/utils/Icons';

const Footer = () => {
  return (
    <footer className="w-full p-4 px-5 bg-white  dark:bg-dark  flex flex-col items-center text-lightBlack dark:text-light">
      <h4 className=" font-bold text-center capitalize text-1xl sm:text-2xl lg:text-1xl px-2">
        Connect with me
      </h4>

      <div className="flex items-center mt-4">
        <a
          href={''}
          className="inline-block w-6 h-6 mr-4"
          aria-label="Reach out to me via LinkedIn"
          target="_blank"
        >
          <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={''}
          className="inline-block w-6 h-6 mr-4 fill-dark"
          aria-label="Check my profile on Github"
          target="_blank"
        >
          <GithubIcon className="fill-dark dark:fill-light  hover:scale-125 transition-all ease duration-200" />
        </a>
      </div>

      {/* <div className="w-full  mt-4 md:mt-8 relative font-medium border-t border-solid border-lightBlack dark:border-light py-6 px-8 flex  flex-col md:flex-row items-center justify-between">
        <span className="text-center">&copy;2023 JKH</span>
        <Link
          href="/sitemap.xml"
          className="text-center underline my-4 md:my-0"
        >
          sitemap.xml
        </Link>
      </div> */}
    </footer>
  );
};
export default Footer;
