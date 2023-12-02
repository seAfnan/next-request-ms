"use client";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Link, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import React, { useContext } from "react";
import IssueStatusBadge from "./components/IssueStatusBadge";
import { ThemeContext } from "./DarkModeContext";
import { Issue } from "@prisma/client";

const LatestIssues = ({ issues }: { issues: Issue[] }) => {
  const context = useContext(ThemeContext);
  const { switchDark, switchLight, theme } = context ?? {};

  return (
    <Card>
      <Heading style={{ color: "var(--accent-9)" }} size="5" ml="3" mb="3">
        Latest Requests
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell
                className={`hover-cell ${
                  theme === "light" ? "light-theme" : "dark-theme"
                }`}
              >
                <NextLink passHref legacyBehavior href={`/issues/${issue.id}`}>
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <Link>{issue.title}</Link>
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
                </NextLink>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
