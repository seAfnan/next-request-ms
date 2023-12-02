"use client";
import { Issue, Status, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const StatusSelect = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const statuses = ["OPEN", "IN_PROGRESS", "CLOSED"];
  return (
    <>
      <Select.Root
        defaultValue={issue?.status == null ? " " : issue.status}
        onValueChange={async (status) => {
          try {
            await axios.patch("/api/issues/" + issue?.id, {
              status: status,
            });
            toast.success("Changes saved successfully");
            router.refresh();
          } catch (error) {
            toast.error("Changes could not be saved");
          }
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            {statuses?.map((status) => (
              <Select.Item value={status} key={status}>
                {status}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
