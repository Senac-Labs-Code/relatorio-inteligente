"use client";

import { type ReactNode } from "react";

interface IconeCircularProps {
	children: ReactNode;
	"aria-label": string;
	onClick?: () => void;
	className?: string;
}

export default function IconeCircular({
	children,
	onClick,
	className = "",
	...props
}: IconeCircularProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex bg(--color-fundo-header) border-(--tinta-4) border h-8 w-8 items-center justify-center rounded-full sm:h-9 sm:w-9 ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}