"use client";

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MenuItem,
  setSelectedMenu,
  fetchMenus,
} from "@/lib/store/slices/menuSlice";
import { AddMenuButton } from "./add-menu-button";
import { RootState } from "@/lib/store";
import { AppDispatch } from "@/lib/store";

export function MenuTree() {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const { items, loading, error } = useSelector(
    (state: RootState) => state.menu
  );
  const dispatch = useDispatch<AppDispatch>();

  // Fetch menus on component mount
  React.useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  // Group items by their parent
  const groupedItems = React.useMemo(() => {
    return items.reduce(
      (acc: { [x: string]: any[] }, item: { parentData: any }) => {
        const parent = item.parentData;
        if (!acc[parent]) {
          acc[parent] = [];
        }
        acc[parent].push(item);
        return acc;
      },
      {} as Record<string, MenuItem[]>
    );
  }, [items]);

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
        {/* Vertical line for parent hierarchy */}
        {item.depth > 0 && isFirstAtDepth && (
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
                  parentData: item.name,
                  depth: item.depth + 1,
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
        ) : !groupedItems["Root"] || groupedItems["Root"].length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No menus found. Create your first menu to get started.
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
