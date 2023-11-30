import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Link, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";
import IssueStatusBadge from "./components/IssueStatusBadge";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    // To fetch user info, this method is called Eager loading
    include: {
      assignToUser: true,
    },
  });
  return (
    <Card>
      <Heading style={{ color: "var(--accent-9)" }} size="5" ml="3" mb="3">
        Latest Requests
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <NextLink
                      passHref
                      legacyBehavior
                      href={`/issues/${issue.id}`}
                    >
                      <Link>{issue.title}</Link>
                    </NextLink>

                    {/* <NextLink href={`/issues/${issue.id}`}>
                      {issue.title}
                    </NextLink> */}
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignToUser && (
                    <Avatar
                      src={issue.assignToUser.image!}
                      fallback="?"
                      size="2"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
