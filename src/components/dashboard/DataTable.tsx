"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { motion } from "framer-motion";

interface Column<T> {
  key: string;
  header: string;
  cell: (item: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  description?: string;
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  filterable?: boolean;
  filterOptions?: { key: string; label: string; options: { value: string; label: string }[] }[];
  pageSize?: number;
  pageSizeOptions?: number[];
  actions?: (item: T) => { label: string; icon?: React.ElementType; onClick: () => void; variant?: "default" | "destructive" }[];
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends { id?: string }>({
  data,
  columns,
  title,
  description,
  searchable = true,
  searchKeys = [],
  filterable = true,
  filterOptions = [],
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  actions,
  onRowClick,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  // Filter data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search filter
    if (searchQuery && searchKeys.length > 0) {
      result = result.filter((item) =>
        searchKeys.some((key) => {
          const value = item[key];
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchQuery.toLowerCase());
          }
          if (typeof value === "number") {
            return value.toString().includes(searchQuery);
          }
          return false;
        })
      );
    }

    // Column filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && value !== "all") {
        result = result.filter((item) => {
          const itemValue = (item as Record<string, unknown>)[key];
          return String(itemValue).toLowerCase() === value.toLowerCase();
        });
      }
    });

    // Sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = (a as Record<string, unknown>)[sortConfig.key];
        const bValue = (b as Record<string, unknown>)[sortConfig.key];
        
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
        }
        
        return 0;
      });
    }

    return result;
  }, [data, searchQuery, searchKeys, activeFilters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return { key, direction: current.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <ArrowUpDown className="w-3 h-3 ml-1" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-3 h-3 ml-1 text-brand-500" />
    ) : (
      <ArrowDown className="w-3 h-3 ml-1 text-brand-500" />
    );
  };

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSearchQuery("");
    setCurrentPage(1);
  };

  const hasActiveFilters = Object.values(activeFilters).some((v) => v && v !== "all") || searchQuery;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-border/50">
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {searchable && (
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9"
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              {filterable && filterOptions.map((filter) => (
                <Select
                  key={filter.key}
                  value={activeFilters[filter.key] || "all"}
                  onValueChange={(value) => handleFilterChange(filter.key, value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <Filter className="w-3 h-3 mr-2" />
                    <span className="text-xs">{filter.label}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All {filter.label}</SelectItem>
                    {filter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key}>
                      {column.sortable ? (
                        <button
                          onClick={() => handleSort(column.key)}
                          className="flex items-center font-medium hover:text-brand-600 transition-colors"
                        >
                          {column.header}
                          {getSortIcon(column.key)}
                        </button>
                      ) : (
                        column.header
                      )}
                    </TableHead>
                  ))}
                  {actions && <TableHead className="w-[50px]"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (actions ? 1 : 0)}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No results found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((item, index) => (
                    <TableRow
                      key={item.id || index}
                      className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                      onClick={() => onRowClick?.(item)}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          {column.cell(item)}
                        </TableCell>
                      ))}
                      {actions && (
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {actions(item).map((action, idx) => (
                                <DropdownMenuItem
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick();
                                  }}
                                  className={action.variant === "destructive" ? "text-red-600" : ""}
                                >
                                  {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                                  {action.label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                {filteredData.length} results
              </span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>per page</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Helper function to render status badges
export function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
    ACTIVE: { variant: "default", className: "bg-green-100 text-green-700 hover:bg-green-100" },
    INACTIVE: { variant: "secondary", className: "bg-gray-100 text-gray-700 hover:bg-gray-100" },
    SUSPENDED: { variant: "destructive", className: "" },
    PENDING: { variant: "outline", className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" },
    COMPLETED: { variant: "default", className: "bg-blue-100 text-blue-700 hover:bg-blue-100" },
    DELIVERED: { variant: "default", className: "bg-green-100 text-green-700 hover:bg-green-100" },
    CANCELLED: { variant: "destructive", className: "" },
    PROCESSING: { variant: "outline", className: "bg-orange-100 text-orange-700 hover:bg-orange-100" },
  };

  const config = variants[status] || { variant: "secondary", className: "" };

  return (
    <Badge variant={config.variant} className={config.className}>
      {status}
    </Badge>
  );
}
