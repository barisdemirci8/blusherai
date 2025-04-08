"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarLinkProps = {
  display: string;
  path: string;
  callback?: () => void;
};

export default function NavbarLink(props: NavbarLinkProps) {
  const { path, display, callback } = props;

  const currentPathname = usePathname();
  const isActive = currentPathname === path;

  return (
    <Link
      href={path}
      onClick={() => (callback ? callback() : undefined)}
      className={`hover:text-bg2 ${isActive ? "underline decoration-4 decoration-bg2" : ""}`}
    >
      {display}
    </Link>
  );
}
