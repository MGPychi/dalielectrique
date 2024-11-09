import { PagePaginator } from "@/components/PagePaginator";
// import { getNewsLetterEmails } from "@/data/newsletter";

import AdminContactsTable from "./_components/AdminContactsTable";
import { getContacts } from "@/app/data/contacts-data";

export default async function ContactsDashboard(
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = (searchParams?.page as string) || "1";
  const { data, hasNext, hasPrev, pageCount, count } = await getContacts({
    page: parseInt(page),
    q: searchParams?.search as string,
  });
  const searchTerm = (searchParams?.search as string) || "";
  return (
    <main className="flex-col space-y-8 p-2">
      <div className="flex min-h-[calc(100vh-228px)] justify-center">
        <AdminContactsTable
          currentPage={parseInt(page)}
          count={count}
          data={data}
          searchTerm={searchTerm}
        />
      </div>
      <PagePaginator
        hasNext={hasNext}
        hasPrev={hasPrev}
        baseHref="/dashboard/users"
        page={parseInt(page)}
        pageCount={pageCount}
      />
    </main>
  );
}
