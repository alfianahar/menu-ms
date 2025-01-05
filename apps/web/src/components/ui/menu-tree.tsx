"use client";

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  MenuItem,
  fetchMenus,
  fetchRootMenus,
} from "@/lib/store/slices/menuSlice";
import { RootState } from "@/lib/store";
import { AppDispatch } from "@/lib/store";

import { MenuTreeHeader } from "./menu-tree-header";
import { MenuTreeItem } from "./menu-tree-item";

export function MenuTree() {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const { items, loading, error, selectedRootMenu } = useSelector(
    (state: RootState) => state.menu
  );
  const dispatch = useDispatch<AppDispatch>();

  // Fetch root menus and all menus on component mount and when items change
  React.useEffect(() => {
    dispatch(fetchRootMenus());
    dispatch(fetchMenus());
  }, [dispatch, items.length]);

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
  ) => (
    <MenuTreeItem
      key={item.id}
      item={item}
      isLast={isLast}
      isFirstAtDepth={isFirstAtDepth}
      isLastAtDepth={isLastAtDepth}
      expanded={expanded}
      groupedItems={groupedItems}
      toggleExpand={toggleExpand}
      renderMenuItem={renderMenuItem}
    />
  );

  return (
    <div className="flex-1 max-w-xl">
      <MenuTreeHeader expandAll={expandAll} collapseAll={collapseAll} />

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
