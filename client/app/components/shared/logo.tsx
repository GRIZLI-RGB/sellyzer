import Image from "next/image";

export default function Logo({ onlyIcon = false }: { onlyIcon?: boolean }) {
	return (
		<div className="flex items-center gap-2">
			<Image
				src="/logo-light.svg"
				alt="Sellyzer"
				width={36}
				height={36}
				className="block dark:hidden"
			/>
			<Image
				src="/logo-dark.svg"
				alt="Sellyzer"
				width={36}
				height={36}
				className="hidden dark:block"
			/>

			{!onlyIcon && (
				<span className="text-lg font-semibold hidden md:inline">
					Sellyzer
				</span>
			)}
		</div>
	);
}
