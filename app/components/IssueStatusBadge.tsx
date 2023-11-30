import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status;
}

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      color={
        status === "OPEN"
          ? "blue"
          : status === "IN_PROGRESS"
          ? "orange"
          : "green"
      }
    >
      {status}
    </Badge>
  );
};

export default IssueStatusBadge;
