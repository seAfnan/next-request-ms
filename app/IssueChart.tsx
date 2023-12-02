"use client";

import { Card } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "OPEN", value: open },
    { label: "IN_PROGRESS", value: inProgress },
    { label: "CLOSED", value: closed },
  ];
  const router = useRouter();

  const handleBarClick = (index: any) => {
    // Customize this logic to determine the URL based on your data
    // const label = data[index]?.label;
    const query = `?status=${index.label}`;
    router.push("/issues/list" + query);
    // const url = `/your-target-page/${label}`;

    // Navigate to the target page
    // router.push(url);
  };

  return (
    <Card>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          {/* #6e56cf */}
          <Bar
            dataKey="value"
            // barSize={80}
            style={{ fill: "var(--accent-9)", cursor: "pointer" }}
            onClick={handleBarClick}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
