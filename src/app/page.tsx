'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AnimatedLanding = dynamic(() => import('@/components/client/animated-landing'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>
});

export default function ZaytoudLanding() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <AnimatedLanding />
    </Suspense>
  );
}