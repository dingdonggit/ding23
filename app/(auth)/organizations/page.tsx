import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";
import OrganizationCard from "@/components/cards/OrganizationCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchOrganizations } from "@/lib/actions/organization.action";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchOrganizations({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <>
      <h1 className='head-text'>Organizations</h1>

      <div className='mt-5'>
        <Searchbar routeType='organizations' />
      </div>

      <section className='mt-9 flex flex-wrap gap-4'>
        {result.organizations.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.organizations.map((organization) => (
              <OrganizationCard
                key={organization.id}
                id={organization.id}
                name={organization.name}
                username={organization.username}
                imgUrl={organization.image}
                bio={organization.bio}
                members={organization.members}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path='organizations'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Page;