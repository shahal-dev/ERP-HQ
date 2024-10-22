import getNextVersion from '@/actions/system/get-next-version';
import Link from 'next/link';
import React from 'react';

const Footer = async () => {
  const nextVersion = await getNextVersion();
  //console.log(nextVersion, "nextVersion");
  return (
    <footer className="flex h-8 w-full flex-row items-center justify-end p-5 text-xs text-gray-500">
      <div className="hidden pr-5 md:flex">
        <Link href="/">
          <h1 className="text-gray-600">
            {' '}
            {process.env.NEXT_PUBLIC_APP_NAME} - {process.env.NEXT_PUBLIC_APP_V}
          </h1>
        </Link>
      </div>
      <div className="hidden space-x-2 pr-2 md:flex">
        Developed by
        <Link href={''}><span className="mx-1 rounded-md bg-black px-1 text-white">
          {"Md Shahadat Hossain Shahal"}
        </span>
        </Link>{' '}
        hosted by:
        <span className="text-bold underline">
          <Link href="https://www.hetzner.com">Hetzner</Link>
        </span>
      </div>
      <div className="hidden space-x-2 md:flex">
        Supported by:
        <Link className="pl-1 font-bold" href="https://ICCCAD.org">
          ICCCAD.
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
