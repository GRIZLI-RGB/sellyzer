"use client";

import { FcGoogle } from "react-icons/fc";
import { FaTelegram } from "react-icons/fa";
import clsx from "clsx";
import { useEffect, useState } from "react";

import Logo from "@/app/components/shared/logo";

declare global {
	interface Window {
		onTelegramAuth: (user: {
			id: number;
			first_name: string;
			last_name?: string;
			username?: string;
			photo_url?: string;
			auth_date: number;
			hash: string;
		}) => void;
	}
}

export default function AuthPage() {
	const [isHover, setIsHover] = useState(false);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://telegram.org/js/telegram-widget.js?7";
		script.setAttribute("data-telegram-login", "sellyzer_bot");
		script.setAttribute("data-size", "large");
		script.setAttribute("data-radius", "10");
		script.setAttribute("data-userpic", "false");
		script.setAttribute("data-request-access", "write");
		script.setAttribute("data-userpic", "false");
		script.setAttribute("data-lang", "ru");
		script.setAttribute("data-onauth", "onTelegramAuth(user)");
		script.async = true;

		const container = document.getElementById("telegram-login-btn");
		if (container) container.innerHTML = "";
		container?.appendChild(script);

		window.onTelegramAuth = (user) => {
			fetch(
				`${
					process.env.NODE_ENV === "development"
						? "http://localhost:8000"
						: "https://sellyzer.ru"
				}/api/auth/telegram`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(user),
				}
			).then(() => (window.location.href = "/dashboard/products"));
		};
	}, []);

	return (
		<div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4 space-y-7">
			<div className="text-center">
				<div className="mx-auto mb-2 flex items-center justify-center">
					<Logo onlyIcon />
				</div>
				<h1 className="text-lg font-medium text-gray-900">
					Авторизация
				</h1>
			</div>

			<div className="flex flex-col items-center gap-3 w-full max-w-xs">
				{/* Google кнопка */}
				<button
					onClick={() => {
						const origin = window.location.origin;
						window.location.href = `${
							origin.includes("localhost")
								? "http://localhost:8000"
								: origin
						}/api/auth/google`;
					}}
					className="
	      cursor-pointer
	      w-full flex items-center justify-center gap-3
	      py-3 px-6
	      bg-white rounded-full
	      border border-gray-200
	      hover:border-gray-300
	      focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
	      group
	    "
				>
					<FcGoogle className="w-5 h-5 flex-shrink-0" />
					<span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
						Войти через Google
					</span>
				</button>

				{/* Telegram кнопка */}
				<div className="overflow-hidden rounded-full cursor-pointer relative w-full max-w-xs">
					<div
						className="w-full block h-full left-0 right-0 bottom-0 top-0 absolute z-10 opacity-0 cursor-pointer"
						id="telegram-login-btn"
						onMouseEnter={() => setIsHover(true)}
						onMouseLeave={() => setIsHover(false)}
					/>

					<button
						className={clsx(
							`
	      cursor-pointer
	      w-full flex items-center justify-center gap-3
	      py-3 px-6
	      focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1
	      group
	      ${isHover ? "bg-[#1d99d6]" : "bg-[#27a7e7]"}
	    `
						)}
					>
						<FaTelegram className="w-5 h-5 flex-shrink-0 text-white" />
						<span className="text-sm font-medium text-white group-hover:text-blue-50 transition-colors">
							Войти через Telegram
						</span>
					</button>
				</div>
			</div>

			<p className="text-xs text-gray-500 text-center mt-1 px-6 leading-5">
				Продолжая, вы принимаете наши{" "}
				<a
					target="_blank"
					href="/terms"
					className="text-blue-600 underline underline-offset-3 hover:text-blue-800"
				>
					условия использования
				</a>
			</p>
		</div>
	);
}
