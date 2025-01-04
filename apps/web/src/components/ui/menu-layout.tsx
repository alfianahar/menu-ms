"use client";

// import { cn } from "@/lib/utils";
import { MenuTree } from "./menu-tree";
import { MenuForm } from "./menu-form";

export function MenuLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#0F1729] text-white p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="text-xl font-bold">CLOIT</div>
        </div>
        <nav className="space-y-2">
          <div className="px-2 py-1.5 text-sm text-white/70">Systems</div>
          <div className="px-2 py-1.5 text-sm text-white/70">Properties</div>
          <div className="px-2 py-1.5 text-sm bg-white/10 rounded-md text-white">
            Menus
          </div>
          <div className="px-2 py-1.5 text-sm text-white/70">API List</div>
          <div className="px-2 py-1.5 text-sm text-white/70">
            Users & Groups
          </div>
          <div className="px-2 py-1.5 text-sm text-white/70">Competition</div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#F8F9FB] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <MenuIcon className="text-white" />
          </div>
          <h1 className="text-xl font-semibold">Menus</h1>
        </div>
        <div className="flex gap-6">
          <MenuTree />
          <MenuForm />
        </div>
      </div>
    </div>
  );
}

function MenuIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}
