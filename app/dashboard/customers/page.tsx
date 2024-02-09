import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';
import { Suspense } from 'react';
export const metadata: Metadata = {
  title: 'Customers',
};

export default async function CustomersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <CustomersTable query={query} />
        </Suspense>
      </div>
    </div>
  );
}