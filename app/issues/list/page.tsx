import prisma from "@/prisma/client";
import { Avatar, Link, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import { Metadata } from "next";

interface Props {
  searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy: { createdAt: "desc" },
    include: {
      assignToUser: true,
    },
  });
  return (
    <div>
      <IssueActions selectedStatus={searchParams.status} />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Request</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Assignee
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {/* NextLink is for navigating to detail page AND Link is a radix link just for design */}
                {/* As we are using nested links as radix link inside nextjs link, so we have to use extra two attributes here */}
                <NextLink passHref legacyBehavior href={`/issues/${issue.id}`}>
                  <Link>{issue.title}</Link>
                </NextLink>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
              <Table.Cell>
                {issue.assignToUser && (
                  <Avatar
                    src={issue.assignToUser.image!}
                    fallback="?"
                    size="2"
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

// This will convert this component from Static Rendering to Dynamic Rendering.
// It's mean when we refresh page, then it will get fresh data from api, ignoring the cache data
export const dynamic = "force-dynamic";
// If revalidate = 0, then it will refresh page data on each page refresh, otherwise we can change it to 60 seconds etc.
// export const revalidate = 60;

export const metadata: Metadata = {
  title: "RMS - Request List",
  description: "View all requests",
};

export default IssuesPage;
