"use client";

import * as React from "react";
import { useDispatch } from "react-redux";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuItem, setSelectedMenu } from "@/lib/store/slices/menuSlice";
import { AddMenuButton } from "./add-menu-button";

interface MenuTreeItemProps {
  item: MenuItem;
  isLast: boolean;
  isFirstAtDepth: boolean;
  isLastAtDepth: boolean;
  expanded: Record<string, boolean>;
  groupedItems: Record<string, MenuItem[]>;
  toggleExpand: (name: string) => void;
  renderMenuItem: (
    item: MenuItem,
    isLast: boolean,
    isFirstAtDepth: boolean,
    isLastAtDepth: boolean
  ) => React.ReactNode;
}

export function MenuTreeItem({
  item,
  isLast,
  isFirstAtDepth,
  isLastAtDepth,
  expanded,
  groupedItems,
  toggleExpand,
  renderMenuItem,
}: MenuTreeItemProps) {
  const dispatch = useDispatch();

  // Find the parent item based on parent_id
  const parentItem = Object.values(groupedItems)
    .flat()
    .find((parentCandidate) => parentCandidate.id === item.parent_id);

  console.log(parentItem);

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
          onClick={() =>
            dispatch(
              setSelectedMenu({
                ...item,
                parent_name:
                  parentItem && item.parent_name !== "Root"
                    ? parentItem.name
                    : item.parent_name,
              })
            )
          }
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
}
