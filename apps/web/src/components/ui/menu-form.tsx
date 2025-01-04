"use client";

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/lib/store";
import { addMenuItem, updateMenuItem } from "@/lib/store/slices/menuSlice";

export function MenuForm() {
  const selectedMenu = useSelector(
    (state: RootState) => state.menu.selectedMenu
  );
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMenu) return;

    if (selectedMenu.id) {
      dispatch(updateMenuItem(selectedMenu));
    } else {
      dispatch(
        addMenuItem({
          ...selectedMenu,
          id: uuidv4(),
        })
      );
    }
  };

  // if (!selectedMenu) return null;

  return (
    <div className="w-96 rounded-lg border bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="menuId">Menu ID</Label>
          <Input
            id="menuId"
            value={selectedMenu?.id || uuidv4()}
            disabled
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="depth">Depth</Label>
          <Input
            id="depth"
            type="number"
            value={selectedMenu?.depth || 0}
            disabled
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="parentId">Parent Data</Label>
          <Input
            id="parentId"
            type="text"
            value={selectedMenu?.parentData || ""}
            disabled
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={selectedMenu?.name || ""}
            onChange={(e) => {
              if (selectedMenu) {
                dispatch(
                  updateMenuItem({ ...selectedMenu, name: e.target.value })
                );
              }
            }}
          />
        </div>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </div>
  );
}
