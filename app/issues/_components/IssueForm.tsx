"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Callout,
  Text,
  Heading,
  Select,
} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";
import AssigneeSelect, { useUsersHook } from "../[id]/AssigneeSelect";
import toast from "react-hot-toast";

// If MDE show error due to its server and client component difference the use this code
// import dynamic from "next/dynamic";
// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const { data: users, error, isLoading } = useUsersHook();
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [issueError, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div className="max-w-2xl">
      {issueError && (
        <Callout.Root className="mb-2" color="red">
          <Callout.Text>{issueError}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            if (issue) await axios.patch("/api/issues/" + issue.id, data);
            else await axios.post("/api/issues", data);
            setError("");
            router.push("/issues/list");
            router.refresh();
          } catch (error) {
            setSubmitting(false);
            setError("An unexpected error occured.");
          }
        })}
      >
        <div
          style={{
            display: "grid",
            ...(!issue && { gridTemplateColumns: "2fr 1fr" }),
            gap: "16px",
          }}
        >
          <div>
            {issue && <Heading size="6">Edit</Heading>}
            <TextField.Root>
              <TextField.Input
                defaultValue={issue?.title}
                placeholder="Title"
                {...register("title")}
              />
            </TextField.Root>
          </div>
          {!issue && (
            <Controller
              name="assignToUserId"
              control={control}
              render={({ field }) => (
                <Select.Root
                  onValueChange={(value: string) => field.onChange(value)}
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
              )}
            />
          )}
        </div>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* <Heading size="3">Description</Heading> */}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Request" : "Submit New Request"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
