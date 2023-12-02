"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue?: Issue }) => {
  const { data: users, error, isLoading } = useUsersHook();

  if (error) return null;

  if (isLoading) return <Skeleton />;

  return (
    <>
      <Select.Root
        defaultValue={
          issue?.assignToUserId == null ? " " : issue.assignToUserId
        }
        onValueChange={async (userId) => {
          try {
            await axios.patch("/api/issues/" + issue?.id, {
              assignToUserId: userId === " " ? null : userId,
            });
            toast.success("Changes saved successfully");
          } catch (error) {
            toast.error("Changes could not be saved");
          }
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Item value=" ">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id} key={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export const useUsersHook = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 1 * 1000, // 1 second
    retry: 3,
  });

export default AssigneeSelect;
