"use client";

import { FcGoogle } from "react-icons/fc";
import { FaTelegram } from "react-icons/fa";

export default function AuthPage() {
	return (
		<div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4 space-y-7">
			<div className="text-center">
				<div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
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
					className="
          cursor-pointer
	      w-full flex items-center justify-center gap-3
	      py-3 px-6
	      bg-white rounded-full
	      border border-gray-200
	      hover:border-gray-300
	      transition-all duration-200
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
				<button
					className="
          cursor-pointer
	      w-full flex items-center justify-center gap-3
	      py-3 px-6
	      bg-[#27a7e7] rounded-full
	      hover:bg-[#1d99d6]
	      transition-all duration-200
	      focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1
	      group
	    "
				>
					<FaTelegram className="w-5 h-5 flex-shrink-0 text-white" />
					<span className="text-sm font-medium text-white group-hover:text-blue-50 transition-colors">
						Войти через Telegram
					</span>
				</button>
			</div>

			<p className="text-xs text-gray-500 text-center mt-1 px-6 leading-5">
				Продолжая, вы принимаете наши{" "}
				<a
					href="/terms"
					className="text-blue-600 underline underline-offset-3 hover:text-blue-800"
				>
					условия использования
				</a>
			</p>
		</div>
	);
}
