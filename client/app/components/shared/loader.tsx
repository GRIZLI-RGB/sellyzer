"use client";

import clsx from "clsx";

export default function Loader({
	size = "md",
	text,
	className,
	overlay = false,
	fullScreen = false,
}: {
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	text?: string;
	className?: string;
	overlay?: boolean;
	fullScreen?: boolean;
}) {
	const sizeClasses = {
		xs: "w-3 h-3 border",
		sm: "w-5 h-5 border",
		md: "w-7 h-7 border-2",
		lg: "w-9 h-9 border-2",
		xl: "w-12 h-12 border-2",
	};

	const textSizes = {
		xs: "text-xs",
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
		xl: "text-lg",
	};

	const effectiveSize = fullScreen ? "xl" : size;

	const spinner = (
		<div
			className={clsx(
				"animate-spin rounded-full border-solid border-current border-r-transparent",
				sizeClasses[effectiveSize],
				"text-blue-600 dark:text-blue-400"
			)}
			role="status"
		/>
	);

	const content = (
		<div
			className={clsx(
				"flex items-center justify-center gap-3",
				!overlay && !fullScreen && "flex-col",
				className
			)}
		>
			{spinner}
			{text && (
				<span
					className={clsx(
						"text-gray-600 dark:text-gray-300 font-medium",
						textSizes[effectiveSize]
					)}
				>
					{text}
				</span>
			)}
		</div>
	);

	if (fullScreen) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-neutral-900/90">
				<div className="flex flex-col items-center gap-4">
					{spinner}
					{text && (
						<p className="text-lg font-medium text-gray-700 dark:text-gray-300">
							{text}
						</p>
					)}
				</div>
			</div>
		);
	}

	if (overlay) {
		return (
			<div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 rounded-lg">
				{content}
			</div>
		);
	}

	return content;
}
