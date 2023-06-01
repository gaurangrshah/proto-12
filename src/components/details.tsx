import { useRef } from 'react';
import { useClipboard } from '@/hooks';
import { useColorApi } from '@/queries';
import type { ColorApiSchema } from '@/utils';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/ui/table';
import { CheckCircleIcon, CopyIcon } from 'lucide-react';

import { Spinner } from './_scaffold/ui';
import { Popover } from './popover';

export function shaper(data: ColorApiSchema | null) {
  return data
    ? Object.entries(data)
        .map(([key, value]) => {
          if (!key || !value?.value) return null;

          return {
            key,
            value: value.value,
          };
        })
        .filter(Boolean)
    : [];
}

export type DetailShape = { key: string; value: any } | null;

export const columns: ColumnDef<DetailShape>[] = [
  {
    header: 'Key',
    accessorKey: 'key',
  },
  {
    header: 'Value',
    accessorKey: 'value',
  },
  {
    id: 'copy',
    header: 'Copy',
    cell: ({ row }) => {
      const val = row.getValue('value');

      return (
        <div className="flex items-center justify-end">
          {val && typeof val === 'string' ? (
            <CopyDropdownMenuItem val={val} />
          ) : null}
        </div>
      );
    },
  },
];

export const CopyDropdownMenuItem = ({ val }: { val: string }) => {
  const { copy, isCopied } = useClipboard({ text: val });

  return (
    <div
      className="btn btn-outline btn-square mx-auto flex items-center justify-center opacity-80"
      onClick={copy}
    >
      {isCopied ? (
        <CheckCircleIcon className="w-4" strokeWidth={2} />
      ) : (
        <CopyIcon className="w-4" />
      )}
    </div>
  );
};

export const Details: React.FC<{ swatch: string }> = ({ swatch }) => {
  const { data, isLoading, isError } = useColorApi(swatch);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="mt-4 flex w-full items-center justify-center"
      style={{ color: data?.contrast.value }}
    >
      <Popover
        btn={{
          label: !isLoading
            ? data?.name.value
            : isError
            ? 'Unknown'
            : undefined,
          props: {
            className:
              'text-semibold rounded-md px-2 py-1 text-sm btn btn-outline btn-square transition-all duration-75 ease-in-out border-10 ',
          },
          Component: isLoading ? Spinner : undefined,
        }}
        className="max-h-72 overflow-y-auto"
      >
        <div className="mx-auto max-w-md">
          <DataTable columns={columns} data={shaper(data)} />
        </div>
      </Popover>
    </div>
  );
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.index
                  ? row
                      .getVisibleCells()
                      .map((cell) =>
                        cell && cell.id ? (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ) : null
                      )
                  : null}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
