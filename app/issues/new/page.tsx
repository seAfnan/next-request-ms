import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
import delay from "delay";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

// delay(200);

const NewIssuePage = () => {
  return <IssueForm />;
};

export const metadata: Metadata = {
  title: "RMS - New Request",
  description: "Create a new request",
};

export default NewIssuePage;
