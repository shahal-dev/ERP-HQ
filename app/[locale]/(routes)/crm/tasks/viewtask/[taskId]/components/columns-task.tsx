'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

import { labels } from '../data/data';
import type { Task } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActionsTasks } from './data-table-row-actions-tasks';

export const columnsTask: ColumnDef<Task>[] = [
  {
    accessorKey: 'assigned_to_user',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned to" />
    ),

    cell: ({ row }) => (
      <div className="w-[150px]">
        {
          //@ts-ignore
          //TODO: fix this - must change schema but problem is if value is null now. You must change db
          row.original.assigned_to_user.name ?? 'Unassigned'
        }
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'document_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Document name" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.document_name
      );

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.original.document_name}
          </span>
        </div>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActionsTasks row={row} />,
  },
];
