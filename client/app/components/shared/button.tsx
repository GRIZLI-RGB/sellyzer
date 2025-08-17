import clsx from "clsx";

type ButtonVariant = "accent" | "primary" | "secondary";

interface ButtonProps {
	text: string;
	variant?: ButtonVariant;
	onClick?: () => void;
	icon?: React.ReactNode;
	className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
	accent: "bg-blue-600 hover:bg-blue-700 text-white",
	primary:
		"bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200",
	secondary:
		"bg-white dark:bg-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-600 border",
};

export default function Button({
	variant = "primary",
	onClick,
	text,
	icon,
	className,
}: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className={clsx(
				"flex items-center gap-1.5 px-3 h-9 rounded-lg  text-sm font-medium transition-base",
				variantStyles[variant],
				className
			)}
		>
			{icon}
			<span>{text}</span>
		</button>
	);
}
