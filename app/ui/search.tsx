'use client';
import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // DebouncedCallback() is a function rate limiter
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching...${term}`);
      // function handleSearch(term: string) {
      // console.log(term);

      // URLSearchParams allows use of params string instead of complex string literal
      const params = new URLSearchParams(searchParams);

      // conditional based on user input
      // handleSearch resets page to 1 when user types new query
      params.set('page', '1');
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }

      // useRouter() enables navigation from the original path to the user's input in url-friendly format
      replace(`${pathname}?${params.toString()}`);

    }, 300);
  // }
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // defaultValue ensures input is in-sync with url and will be populated when sharing
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
