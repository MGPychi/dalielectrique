import { PagePaginator } from "@/components/PagePaginator";
// import { getNewsLetterEmails } from "@/data/newsletter";

import EmailListTable from "./_components/EmailListTable";

export default async function UserDashboard({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] };
}) {
  const page = (searchParams?.page as string) || "1";
  const { emails, totalEmails, hasNext, hasPrev, pageCount } = {
    emails: [],
    totalEmails: 0,
    hasNext: false,
    hasPrev: false,
    pageCount: 1,
  };
  console.log(emails)
  // await getNewsLetterEmails({
  //   page: parseInt(page),
  //   q: searchParams?.search as string,
  // });
  const searchTerm = (searchParams?.search as string) || "";
  return (
    <main className="flex-col space-y-8 p-2">
      <div className="flex min-h-[calc(100vh-228px)] justify-center">
        <EmailListTable
          currentPage={parseInt(page)}
          totalEmails={totalEmails}
          // emails={emails}
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
