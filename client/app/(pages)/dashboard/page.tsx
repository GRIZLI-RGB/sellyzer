"use client";

import { useEffect } from "react";

import { trpc } from "@/app/utils/trpc";

export default function DashboardPage() {
	const { data: users } = trpc.getUsers.useQuery();

	useEffect(() => {
		console.log(users);
	}, [users]);

	return <>Dashboard</>;
}
