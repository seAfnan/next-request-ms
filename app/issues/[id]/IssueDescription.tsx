"use client";
import { ThemeContext } from "@/app/DarkModeContext";
import { Card } from "@radix-ui/themes";
import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";

const IssueDescription = ({ description }: { description: string }) => {
  const context = useContext(ThemeContext);
  const { switchDark, switchLight, theme } = context ?? {};
  return (
    <Card
      className="prose max-w-full"
      mt="3"
      style={theme == "dark" ? { color: "white" } : { color: "black" }}
    >
      <ReactMarkdown>{description}</ReactMarkdown>
    </Card>
  );
};

export default IssueDescription;
