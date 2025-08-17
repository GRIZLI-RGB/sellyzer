"use client";

import React from "react";
import { Modal as ResponsiveModal } from "react-responsive-modal";
import { X } from "lucide-react";
import clsx from "clsx";

import "react-responsive-modal/styles.css";

type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
	size?: ModalSize;
}

const SIZE_MAP: Record<ModalSize, { maxWidth: string; width?: string }> = {
	xs: { maxWidth: "320px", width: "min(100%, 94vw)" },
	sm: { maxWidth: "440px", width: "min(100%, 94vw)" },
	md: { maxWidth: "640px", width: "min(100%, 94vw)" },
	lg: { maxWidth: "880px", width: "min(100%, 94vw)" },
	xl: { maxWidth: "1120px", width: "min(100%, 94vw)" },
	"2xl": { maxWidth: "1360px", width: "min(100%, 94vw)" },
};

export default function Modal({
	open,
	onClose,
	children,
	className,
	size = "md",
}: ModalProps) {
	const sizeStyle = SIZE_MAP[size];

	return (
		<ResponsiveModal
			open={open}
			onClose={onClose}
			showCloseIcon={false}
			center
			styles={{
				modal: {
					maxWidth: sizeStyle.maxWidth,
					width: sizeStyle.width ?? "min(100%, 94vw)",
					margin: "0 12px",
				},
				overlay: {
					background: "rgba(0,0,0,0.28)",
					backdropFilter: "blur(6px)",
				},
			}}
			classNames={{
				modal: clsx(
					"!shadow-xs rounded-lg overflow-hidden !bg-white dark:!bg-neutral-900 dark:!border dark:!border-neutral-800",
					className
				),
				overlay: "react-responsive-modal-overlay",
			}}
		>
			<button
				aria-label="Закрыть"
				onClick={onClose}
				className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
			>
				<X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
			</button>

			{children}
		</ResponsiveModal>
	);
}
