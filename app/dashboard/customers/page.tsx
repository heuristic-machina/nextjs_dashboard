import { lusitana } from '@/app/ui/fonts';

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Customers',
};

export default function Page() {
    return <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
}