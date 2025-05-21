"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const logoSrc =
    resolvedTheme === "dark"
      ? "/images/euphoria-white.png"
      : "/images/euphoria.png";

  return (
    <Image
      width={100}
      height={100}
      className="!text-text dark:!stroke-white dark:!fill-white"
      src={logoSrc}
      alt="Admin Logo"
      priority
    />
  );
}
