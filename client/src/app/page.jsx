'use client';

import dynamic from 'next/dynamic';
import App from '../components/App';

const DynamicApp = dynamic(() => import('../components/App'), {
  ssr: false,
});

export default function Page() {
  return <DynamicApp />;
}
