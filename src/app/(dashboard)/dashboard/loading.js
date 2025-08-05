'use client';

import { Typography, Button } from '@material-tailwind/react';

export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-18 py-12 md:py-24 space-y-12 animate-pulse">
      {/* Navbar Skeleton */}
      <div className="flex justify-between items-center">
        <div className="w-32 h-10 rounded-lg bg-gray-300" />
        <div className="w-24 h-8 rounded-lg bg-gray-300" />
      </div>

      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Texto */}
        <div className="w-full md:w-1/2 space-y-6">
          <Typography as="div" className="h-12 w-full max-w-lg rounded-full bg-gray-300">&nbsp;</Typography>
          <Typography as="div" className="h-6 w-full max-w-md rounded-full bg-gray-300">&nbsp;</Typography>
          <div className="h-12 w-40 rounded-lg bg-gray-300" />
        </div>

        {/* Imagem */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-lg h-64 rounded-xl bg-gray-300" />
        </div>
      </div>

      {/* LogoCarousel Skeleton */}
      <div className="w-full h-20 rounded-lg bg-gray-300" />

      {/* Main Features Skeleton */}
      <main role="main" aria-label="Conteúdo Principal" className="space-y-12">
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className="w-full md:w-1/2 h-48 rounded-xl bg-gray-300" />
            <div className="w-full md:w-1/2 space-y-4">
              <Typography as="div" className="h-8 w-3/4 rounded-full bg-gray-300">&nbsp;</Typography>
              <Typography as="div" className="h-6 w-full rounded-full bg-gray-300">&nbsp;</Typography>
              <Typography as="div" className="h-6 w-5/6 rounded-full bg-gray-300">&nbsp;</Typography>
              <div className="h-10 w-40 rounded-lg bg-gray-300" />
            </div>
          </div>
        ))}
      </main>

      {/* Testimonials Skeleton */}
      <section className="bg-gradient-to-b from-[#F4511E] to-[#FF7043] py-16 md:py-24 flex flex-col gap-8">
        <Typography as="div" className="h-10 w-80 rounded-full bg-gray-300">&nbsp;</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="space-y-4 p-4 rounded-lg bg-white">
              <div className="w-16 h-16 rounded-full bg-gray-300" />
              <Typography as="div" className="h-6 w-5/6 rounded-full bg-gray-300">&nbsp;</Typography>
              <Typography as="div" className="h-4 w-3/4 rounded-full bg-gray-300">&nbsp;</Typography>
              <Typography as="div" className="h-4 w-1/2 rounded-full bg-gray-300">&nbsp;</Typography>
            </div>
          ))}
        </div>
      </section>

      {/* PricingSection Skeleton */}
      <div className="w-full h-40 rounded-lg bg-gray-300" />

      {/* FAQ Skeleton */}
      <section className="py-16 md:py-24 space-y-6">
        <Typography as="div" className="h-10 w-64 rounded-full bg-gray-300">&nbsp;</Typography>
        <div className="flex flex-col md:flex-row gap-12">
          {[1, 2].map((_, i) => (
            <div key={i} className="flex-1 space-y-4">
              {[1, 2, 3, 4].map((__, j) => (
                <Typography
                  key={j}
                  as="div"
                  className="h-8 w-full rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Skeleton */}
      <div className="space-y-4 text-center">
        <div className="h-10 w-96 mx-auto rounded-lg bg-gray-300" />
        <div className="h-6 w-72 mx-auto rounded-lg bg-gray-300" />
        <div className="h-12 w-56 mx-auto rounded-lg bg-gray-300" />
      </div>

      {/* Footer Skeleton */}
      <div className="w-full h-32 rounded-lg mt-12 bg-gray-300" />
    </div>
  );
}
