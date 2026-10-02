"use client";

import { ShieldCheck, Clock, AlertTriangle } from "lucide-react";
import { getVerificationLabel, getVerificationDaysLeft, formatRelativeDate } from "@/lib/utils";
import type { VerificationStatus } from "@/types";

interface Props {
  status: VerificationStatus;
  lastVerifiedAt: string;
  variant?: "small" | "large";
}

export default function VerificationBadge({
  status,
  lastVerifiedAt,
  variant = "small",
}: Props) {
  const label = getVerificationLabel(status);
  const daysLeft = getVerificationDaysLeft(lastVerifiedAt);

  const icons = {
    active: ShieldCheck,
    pending: Clock,
    expired: AlertTriangle,
  };

  const Icon = icons[status] || Clock;

  if (variant === "small") {
    return (
      <span className={label.color}>
        <Icon className="w-3 h-3" />
        {status === "active" ? "Tasdiqlangan" : status === "pending" ? "Kutilmoqda" : "Muddati o'tgan"}
      </span>
    );
  }

  return (
    <div
      className={`rounded-xl p-3 ${
        status === "active"
          ? "bg-accent-50 border border-accent-200"
          : status === "pending"
            ? "bg-yellow-50 border border-yellow-200"
            : "bg-red-50 border border-red-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={`w-5 h-5 ${
            status === "active"
              ? "text-accent-600"
              : status === "pending"
                ? "text-yellow-600"
                : "text-red-600"
          }`}
        />
        <div>
          <p
            className={`text-sm font-semibold ${
              status === "active"
                ? "text-accent-800"
                : status === "pending"
                  ? "text-yellow-800"
                  : "text-red-800"
            }`}
          >
            {label.text}
          </p>
          <p className="text-xs text-gray-500">
            Oxirgi tasdiq: {formatRelativeDate(lastVerifiedAt)}
            {status === "active" && ` · ${daysLeft} kun qoldi`}
          </p>
        </div>
      </div>
    </div>
  );
}
