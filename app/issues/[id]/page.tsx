import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { cache, useContext } from "react";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import IssueDescription from "./IssueDescription";
import StatusSelect from "./StatusSelect";

interface Props {
  params: { id: string };
}

const fetchReq = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchReq(parseInt(params.id));

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="3">
      <Box className="col-span-4">
        <Heading>{issue.title}</Heading>
        <Flex className="space-x-3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <IssueDescription description={issue.description} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="2">
            <AssigneeSelect issue={issue} />
            <StatusSelect issue={issue} />
            {/* <Button>
              <Pencil2Icon />
              <Link href={`/issues/edit/${issue.id}`}>Edit</Link>
            </Button> */}
            {issue.status !== "CLOSED" && (
              <Link
                href={`/issues/edit/${issue.id}`}
                style={{ cursor: "pointer" }}
              >
                <div className="flex w-full">
                  <Button className="flex items-center w-full">
                    <Pencil2Icon />
                    Edit
                  </Button>
                </div>
              </Link>
            )}
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchReq(parseInt(params.id));
  return {
    title: "RMS - " + issue?.title,
    description: "Details of request " + issue?.id,
  };
}

export default IssueDetailPage;
