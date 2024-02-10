import EditInvoiceForm from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Edit Invoice',
};

// pre-populate form from db using {id} prop
// access {id} using {params} prop
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    // promise.all calls in parallel
    const [invoice, customers] = await Promise.all([
        // pass in id as argument
        fetchInvoiceById(id),
        fetchCustomers(),
      ]);
    
    // 404 not found error conditional
    if (!invoice) {
      notFound();
    }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
}