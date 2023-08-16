import Image from "next/image";
import { currentUser } from "@clerk/nextjs";

import { organizationTabs } from "@/constants";

import UserCard from "@/components/cards/OrganizationCard";
import ProjectsTab from "@/components/shared/ProjectsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchOrganizationDetails } from "@/lib/actions/organization.action";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const organizationDetails = await fetchOrganizationDetails(params.id);

  return (
    <section>
      <ProfileHeader
        accountId={organizationDetails.createdBy.id}
        authUserId={user.id}
        name={organizationDetails.name}
        username={organizationDetails.username}
        imgUrl={organizationDetails.image}
        bio={organizationDetails.bio}
        type='Organization'
      />

      <div className='mt-9'>
        <Tabs defaultValue='projects' className='w-full'>
          <TabsList className='tab'>
            {organizationTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Projects" && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {organizationDetails.projects.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value='projects' className='w-full text-light-1'>
            {/* @ts-ignore */}
            <ProjectsTab
              currentUserId={user.id}
              accountId={organizationDetails._id}
              accountType='Organization'
            />
          </TabsContent>

          {/* <TabsContent value='members' className='mt-9 w-full text-light-1'>
            <section className='mt-9 flex flex-col gap-10'>
              {organizationDetails.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType='User'
                />
              ))}
            </section>
          </TabsContent> */}

          <TabsContent value='requests' className='w-full text-light-1'>
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={organizationDetails._id}
              accountType='Organization'
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;