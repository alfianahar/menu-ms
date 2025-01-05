"use client";

import { FormEvent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/lib/store";
import {
  saveMenu,
  deleteMenu as deleteMenuAction,
} from "@/lib/store/slices/menuSlice";
import { AppDispatch } from "@/lib/store";
import { API_URL } from "@/lib/constants";

export function MenuForm() {
  const { selectedMenu, selectedRootMenu, formLoading } = useSelector(
    (state: RootState) => state.menu
  );
  const dispatch = useDispatch<AppDispatch>();
  const [menuName, setMenuName] = useState("");

  // Update menuName when selectedMenu changes
  useEffect(() => {
    if (selectedMenu) {
      setMenuName(selectedMenu.name || "");
    }
  }, [selectedMenu]);

  // If no selected menu, return null
  if (!selectedMenu) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const generatedUUID = uuidv4();
    const menuToSave =
      selectedMenu.depth === 0 && !selectedMenu.id
        ? {
            id: generatedUUID,
            name: menuName,
            depth: 0,
            parent_id: generatedUUID,
            parent_name: "Root",
            root_id: generatedUUID,
            root_name: "Root",
          }
        : !selectedMenu.id
          ? {
              ...selectedMenu,
              id: generatedUUID,
              name: menuName,
            }
          : {
              ...selectedMenu,
              name: menuName,
              root_id: selectedMenu.root_id || selectedRootMenu?.id || "",
              root_name: selectedMenu.root_name || selectedRootMenu?.name || "",
            };

    dispatch(saveMenu(menuToSave));
  };

  const handleDelete = () => {
    if (selectedMenu.id) {
      // Show confirmation before deleting
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the menu "${selectedMenu.name}"?`
      );

      if (confirmDelete) {
        dispatch(deleteMenuAction(selectedMenu.id));
      }
    }
  };

  return (
    <div className="w-96 rounded-lg border bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="menuId">Menu ID</Label>
          <Input
            id="menuId"
            value={selectedMenu.id || "new menu items"}
            disabled
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="depth">Depth</Label>
          <Input
            id="depth"
            type="number"
            value={selectedMenu.depth}
            disabled
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="parentName">Parent Name</Label>
          <Input
            id="parentName"
            type="text"
            value={selectedMenu.parent_name || ""}
            disabled
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={menuName ?? selectedMenu.name}
            onChange={(e) => setMenuName(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-2">
          {/* Delete Button - only show if menu has an ID */}
          {selectedMenu.id && (
            <Button
              type="button"
              variant="destructive"
              className="flex-grow-0 w-12"
              onClick={handleDelete}
              disabled={formLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}

          {/* Save Button */}
          <Button type="submit" className="flex-grow" disabled={formLoading}>
            {formLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
