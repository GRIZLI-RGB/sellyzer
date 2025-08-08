"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const toggleTheme = () => {
		// 1. Отключаем анимации
		document.documentElement.classList.add("disable-transitions");

		// 2. Меняем тему
		setTheme(resolvedTheme === "dark" ? "light" : "dark");

		// 3. Через 100ms включаем обратно
		setTimeout(() => {
			document.documentElement.classList.remove("disable-transitions");
		}, 100);
	};

	if (!mounted) return null;

	return (
		<button
			onClick={toggleTheme}
			className="transition-base p-2 rounded-lg border border-gray-200 dark:border-white/25 hover:bg-gray-100 dark:hover:bg-neutral-700"
		>
			{resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	);
}
