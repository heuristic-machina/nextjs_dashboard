'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// validate formData schema before saving to db 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

//pass data to createInvoice to validate the types
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    // convert to cents to eliminate JS floating-point errors in db
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
    try{
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
    } catch (error) {
        return {message: 'Database Error: Failed to Create Invoice.',};
    }

    // api revalidates next.js cache
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
    // Test it out:
    // console.log(rawFormData);
}

// extract data from formData then validate
export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;

    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
        `;
    } catch (error) {
        return {message: "Database Error: Failed to Update Invoice"}
    }
    // clears client cache and make new server request
    revalidatePath('/dashboard/invoices');
    // redirect to invoice page
    redirect('/dashboard/invoices');
  }

  export async function deleteInvoice(id: string) {
    throw new Error('Failed to Delete Invoice');
    try{
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        //triggers new server request and re-renders table'
        revalidatePath('/dashboard/invoices');
        return {message: "Deleted Invoice."};
    } catch (error) {
        return {message: "Database Error: Failed to Delete Invoice"}
    }
  }