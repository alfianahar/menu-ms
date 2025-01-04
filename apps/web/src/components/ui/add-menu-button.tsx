import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AddMenuButtonProps {
  onClick: () => void;
}

export function AddMenuButton({ onClick }: AddMenuButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="ml-auto h-5 w-5 rounded-full bg-blue-500 text-white hover:bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={onClick}
    >
      <Plus className="h-3 w-3" />
    </Button>
  );
}
