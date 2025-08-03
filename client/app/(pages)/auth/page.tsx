"use client";

import { FcGoogle } from "react-icons/fc";
import { FaTelegram } from "react-icons/fa";
import clsx from "clsx";
import { useEffect, useState } from "react";

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
			// fetch("/api/auth/telegram", {
			// 	method: "POST",
			// 	headers: { "Content-Type": "application/json" },
			// 	body: JSON.stringify(user),
			// })
			// 	.then((res) => res.json())
			// 	.then((data) => {
			// 		localStorage.setItem("token", data.token);
			// 		window.location.href = "/dashboard";
			// 	});
		};
	}, []);

	return (
		<div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4 space-y-7">
			<div className="text-center">
				<div className="w-12 h-12 bg-[#f2f2f2] rounded-full mx-auto mb-3 flex items-center justify-center">
					<svg
						className="w-5 h-5 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
						/>
					</svg>
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
