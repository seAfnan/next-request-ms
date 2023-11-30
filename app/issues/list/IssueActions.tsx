import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";

const IssueActions = async () => {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });

  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Flex gap="3">
        <Text size="1">
          <IssueStatusBadge status="OPEN" /> {open}
        </Text>
        <Text size="1">
          <IssueStatusBadge status="IN_PROGRESS" /> {inProgress}
        </Text>
        <Text size="1">
          <IssueStatusBadge status="CLOSED" /> {closed}
        </Text>
      </Flex>
      <Link href="/issues/new" style={{ cursor: "pointer" }}>
        <Button>New Request</Button>
      </Link>
    </Flex>
  );
};

export default IssueActions;
