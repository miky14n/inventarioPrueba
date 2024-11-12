"use client"; // Importante para poder usar useState

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TbReportSearch } from "react-icons/tb";
import { LuBoxes } from "react-icons/lu";
import { CiRouter } from "react-icons/ci";
import { GrConfigure } from "react-icons/gr";
import { FiMenu, FiBell, FiUser } from "react-icons/fi"; // Importar íconos


const menuItems = [
  {
    name: "Stock",
    href: "/inventory",
    icon: LuBoxes,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: TbReportSearch,
  },
  {
    name: "Sales",
    href: "/sales",
    icon: CiRouter,
  },
  {
    name: "Configuration",
    href: "/settings",
    icon: GrConfigure,
  },
];

export default function NavbarSidebar() {
  const [isSidebar, setIsSidebar] = useState(null); // Estado para cambiar entre Navbar y Sidebar

  // Se utiliza useEffect para leer localStorage en el cliente
  useEffect(() => {
    const menuSetting = localStorage.getItem("menuseting");
    setIsSidebar(menuSetting || "navbar"); // Asignar un valor por defecto si no existe en localStorage
  }, []);

  return (
    <div>
      {/* Si isSidebar es "sideNav", mostrar el Sidebar; si no, mostrar el Navbar */}
      {isSidebar === "sideNav" ? (
        <aside className="w-50 bg-gray-100 h-screen fixed top-0 left-0 transition-transform duration-300 shadow-lg">
          <div className="flex justify-between items-center p-4">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              className="mt-10 mb-5"
              alt="Logo"
            />
            <div className="flex gap-4">
              <FiBell size={24} />
              <FiUser size={24} />
            </div>
          </div>
          <ul className="list-none p-0">
            {menuItems.map(({ name, href, icon: Icon }) => (
              <li className="mb-4" key={name}>
                <Link
                  href={href}
                  className="flex items-center p-2 rounded hover:bg-gray-300 transition-colors"
                >
                  <span className="mr-2">
                    <Icon />
                  </span>
                  <span>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md relative z-10">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              className="ml-12"
              alt="Logo"
            />
          </div>
          <ul className="flex list-none p-0">
            {menuItems.map(({ name, href, icon: Icon }) => (
              <li className="mr-8" key={name}>
                <Link href={href} className="flex items-center">
                  <span className="mr-2">
                    <Icon />
                  </span>
                  <span>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <FiBell size={24} />
            <Link href="/settings">
              <FiUser size={24} />
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
