"use client";

import { useRef, useState } from "react";
import { FileUp, XCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

type FileUploadProps = {
  label: string;
  description?: string;
  acceptedLabel?: string;
  maxSizeLabel?: string;
  onAccepted?: (files: File[]) => void;
  className?: string;
};

export function FileUpload({ label, description, acceptedLabel = "PDF only", maxSizeLabel = "Max 10MB per file", onAccepted, className }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [error, setError] = useState("");

  function validateFiles(files: FileList | null) {
    const nextFiles = Array.from(files ?? []);
    if (nextFiles.length === 0) {
      return;
    }

    const invalidFile = nextFiles.find((file) => file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf"));
    if (invalidFile) {
      setError("Only PDF files are accepted for candidate documents.");
      return;
    }

    const oversizedFile = nextFiles.find((file) => file.size > 10 * 1024 * 1024);
    if (oversizedFile) {
      setError("Each PDF must be 10MB or smaller.");
      return;
    }

    setError("");
    setFileNames(nextFiles.map((file) => file.name));
    onAccepted?.(nextFiles);
  }

  return (
    <div className={cn("grid gap-3 rounded-md border border-dashed border-[color:var(--border)] bg-white p-4", className)}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
          <FileUp className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-[color:var(--navy)]">{label}</p>
          {description ? <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{description}</p> : null}
          <p className="mt-1 text-xs font-bold uppercase text-slate-500">
            {acceptedLabel} · {maxSizeLabel}
          </p>
        </div>
      </div>

      <input ref={inputRef} type="file" accept="application/pdf,.pdf" multiple className="hidden" onChange={(event) => validateFiles(event.target.files)} />
      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
          Choose PDF
        </Button>
        {fileNames.length > 0 ? <span className="self-center text-sm font-semibold text-[color:var(--success)]">{fileNames.length} file{fileNames.length === 1 ? "" : "s"} ready</span> : null}
      </div>

      {fileNames.length > 0 ? (
        <ul className="grid gap-2 text-sm text-[color:var(--muted)]">
          {fileNames.map((fileName) => (
            <li key={fileName} className="rounded-md bg-[color:var(--surface-muted)] px-3 py-2">
              {fileName}
            </li>
          ))}
        </ul>
      ) : null}

      {error ? (
        <p className="inline-flex items-center gap-2 rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-[color:var(--danger)]">
          <XCircle className="h-4 w-4" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
