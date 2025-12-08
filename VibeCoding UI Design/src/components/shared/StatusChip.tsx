import { Badge } from "../ui/badge";

interface StatusChipProps {
  status: "draft" | "upcoming" | "postponed" | "completed" | "cancelled";
}

export function StatusChip({ status }: StatusChipProps) {
  const statusConfig = {
    draft: {
      label: "Draft",
      className: "bg-gray-400 text-white hover:bg-gray-400",
    },
    upcoming: {
      label: "Upcoming",
      className: "bg-[#F7A160] text-white hover:bg-[#F7A160]",
    },
    postponed: {
      label: "Postponed",
      className: "bg-[#F7DC79] text-black hover:bg-[#F7DC79]",
    },
    completed: {
      label: "Completed",
      className: "bg-blue-500 text-white hover:bg-blue-500",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-500 text-white hover:bg-red-500",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
}
