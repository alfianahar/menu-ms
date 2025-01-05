"use client";

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  MenuItem,
  setSelectedMenu,
  fetchMenus,
  fetchRootMenus,
  setSelectedRootMenu,
} from "@/lib/store/slices/menuSlice";
import { AddMenuButton } from "./add-menu-button";
import { RootState } from "@/lib/store";
import { AppDispatch } from "@/lib/store";

export function MenuTree() {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const {
    items,
    loading,
    error,
    rootMenus,
    rootMenusLoading,
    selectedRootMenu,
  } = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch<AppDispatch>();

  // Fetch root menus and all menus on component mount and when items change
  React.useEffect(() => {
    dispatch(fetchRootMenus());
    dispatch(fetchMenus());
  }, [dispatch, items.length]); // Add items.length to trigger refetch when items change

  // Group items by their parent, filtered by selected root menu
  const groupedItems = React.useMemo(() => {
    const filteredItems = selectedRootMenu
      ? items.filter((item) => item.root_id === selectedRootMenu.id)
      : items;

    return filteredItems.reduce(
      (acc: { [x: string]: any[] }, item: { parent_name: any }) => {
        const parent = item.parent_name || "Root";
        if (!acc[parent]) {
          acc[parent] = [];
        }
        acc[parent].push(item);
        return acc;
      },
      {} as Record<string, MenuItem[]>
    );
  }, [items, selectedRootMenu]);

  // Handle root menu selection
  const handleRootMenuChange = (rootId: string) => {
    const selectedRoot = rootMenus.find((menu) => menu.id === rootId);
    dispatch(setSelectedRootMenu(selectedRoot || null));
  };

  // Handle creating a new root menu
  const handleAddRootMenu = () => {
    dispatch(
      setSelectedMenu({
        id: "", // New item will have empty id
        name: "", // Empty name to be filled in form
        depth: 0, // Root menu has depth 0
        parent_name: "Root", // Explicitly set parent name
        parent_id: "", // No parent for root menu
        root_id: "", // No root for root menu
        root_name: "", // No root name for root menu
      })
    );
  };

  const toggleExpand = (name: string) => {
    setExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    items.forEach((item: { name: string | number }) => {
      allExpanded[item.name] = true;
    });
    setExpanded(allExpanded);
  };

  const collapseAll = () => {
    setExpanded({});
  };

  const renderMenuItem = (
    item: MenuItem,
    isLast: boolean,
    isFirstAtDepth: boolean,
    isLastAtDepth: boolean
  ) => {
    const hasChildren = groupedItems[item.name]?.length > 0;
    const isExpanded = expanded[item.name];
    const children = groupedItems[item.name] || [];

    return (
      <div key={item.id} className="flex flex-col relative">
        {item.depth > 0 && isFirstAtDepth && !isLastAtDepth && (
          <div
            className="absolute border-l-2 border-[#E5E7EB]"
            style={{
              left: `${item.depth * 12}px`,
              top: 0,
              height: isLast ? "50%" : "100%",
            }}
          />
        )}

        <div
          className={cn(
            "group relative flex items-center gap-1 py-1.5 px-2 rounded-md hover:bg-accent/50",
            "text-sm text-muted-foreground hover:text-foreground"
          )}
          style={{
            paddingLeft: `${(item.depth + 1) * 12}px`,
            position: "relative",
            zIndex: 10,
          }}
        >
          {item.depth > 0 && (
            <>
              <div
                className="absolute border-l-2 border-[#E5E7EB]"
                style={{
                  left: `${item.depth * 12}px`,
                  top: 0,
                  height: isLast ? "50%" : "100%",
                }}
              />
              <div
                className="absolute border-t-2 border-[#E5E7EB]"
                style={{
                  left: `${item.depth * 12}px`,
                  top: "50%",
                  width: "12px",
                  zIndex: 1,
                }}
              />
            </>
          )}
          {hasChildren ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4"
              onClick={() => toggleExpand(item.name)}
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          ) : (
            <span className="w-4" />
          )}
          <button
            onClick={() => dispatch(setSelectedMenu(item))}
            className="hover:text-blue-500"
          >
            {item.name}
          </button>
          <AddMenuButton
            onClick={() =>
              dispatch(
                setSelectedMenu({
                  ...item,
                  id: "",
                  depth: item.depth + 1,
                  name: "",
                  parent_name: item.name,
                  parent_id: item.id,
                  root_id: item.root_id,
                  root_name: item.root_name,
                })
              )
            }
          />
        </div>

        {hasChildren && isExpanded && (
          <div className="relative flex flex-col">
            {children.map((child: MenuItem, index: number) => {
              const isFirstChild = index === 0;
              const isLastChild = index === children.length - 1;
              return renderMenuItem(
                child,
                isLastChild,
                isFirstChild,
                isLastChild
              );
            })}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="flex-1 max-w-xl">
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

      <div className="rounded-lg border bg-background p-2">
        {loading ? (
          <div className="p-4 text-center text-muted-foreground">
            Loading...
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : !groupedItems["Root"] || groupedItems["Root"].length !== 1 ? (
          <div className="p-4 text-center text-muted-foreground">
            {selectedRootMenu
              ? "No menus found for selected root menu."
              : "Select a root menu to view its structure."}
          </div>
        ) : (
          groupedItems["Root"].map((item: MenuItem, index: number) =>
            renderMenuItem(
              item,
              index === groupedItems["Root"].length - 1,
              index === 1,
              index === groupedItems["Root"].length - 1
            )
          )
        )}
      </div>
    </div>
  );
}
