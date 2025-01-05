"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  setSelectedMenu,
  setSelectedRootMenu,
} from "@/lib/store/slices/menuSlice";
import { RootState } from "@/lib/store";
import { AppDispatch } from "@/lib/store";

interface MenuTreeHeaderProps {
  expandAll: () => void;
  collapseAll: () => void;
}

export function MenuTreeHeader({
  expandAll,
  collapseAll,
}: MenuTreeHeaderProps) {
  const { rootMenus, rootMenusLoading, selectedRootMenu } = useSelector(
    (state: RootState) => state.menu
  );
  const dispatch = useDispatch<AppDispatch>();

  // Handle root menu selection
  const handleRootMenuChange = (rootId: string) => {
    const selectedRoot = rootMenus.find((menu) => menu.id === rootId);
    dispatch(setSelectedRootMenu(selectedRoot || null));
  };

  // Handle creating a new root menu
  const handleAddRootMenu = () => {
    dispatch(
      setSelectedMenu({
        id: "",
        name: "",
        depth: 0,
        parent_name: "Root",
        parent_id: "",
        root_id: "",
        root_name: "",
      })
    );
  };

  return (
    <>
      {/* Root Menu Selection */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex-grow">
          <Select
            onValueChange={handleRootMenuChange}
            value={selectedRootMenu?.id || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Root Menu" />
            </SelectTrigger>
            <SelectContent>
              {rootMenusLoading ? (
                <div className="p-2 text-center">Loading root menus...</div>
              ) : rootMenus.length === 0 ? (
                <SelectItem value="No root menu">No root menu</SelectItem>
              ) : (
                rootMenus.map((menu) => (
                  <SelectItem key={menu.id} value={menu.id}>
                    {menu.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Add Root Menu Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleAddRootMenu}
          className="shrink-0 bg-blue-500 text-white"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={expandAll}
          className="text-xs"
        >
          Expand All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={collapseAll}
          className="text-xs"
        >
          Collapse All
        </Button>
      </div>
    </>
  );
}
