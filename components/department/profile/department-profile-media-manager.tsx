"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { ImagePlus, Plus, X } from "lucide-react";
import type { MediaAsset } from "@/types/department";

type EditableMediaAsset = MediaAsset & {
  previewUrl?: string;
  slot?: MediaSlot;
};

type DepartmentProfileMediaManagerProps = {
  assets: MediaAsset[];
  mode?: "view" | "edit";
};

type MediaSlot = "logo" | "cover" | "profile";

export function DepartmentProfileMediaManager({ assets, mode = "view" }: DepartmentProfileMediaManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadSlotRef = useRef<MediaSlot>("profile");
  const [mediaAssets, setMediaAssets] = useState<EditableMediaAsset[]>(assets);
  const isEditable = mode === "edit";

  function handleUploadClick(slot: MediaSlot) {
    uploadSlotRef.current = slot;
    fileInputRef.current?.click();
  }

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    const uploadedAssets = files.map((file) => ({
      id: `media_upload_${crypto.randomUUID()}`,
      ownerType: "department" as const,
      ownerId: "department_1",
      fileName: file.name,
      fileType: "image" as const,
      url: "",
      previewUrl: URL.createObjectURL(file),
      slot: uploadSlotRef.current,
      altText: uploadSlotRef.current === "logo" ? "Department logo" : uploadSlotRef.current === "cover" ? "Department cover image" : file.name,
      uploadedAt: new Date().toISOString()
    }));

    setMediaAssets((currentAssets) => [...currentAssets, ...uploadedAssets]);
    event.target.value = "";
  }

  function removeAsset(assetId: string) {
    setMediaAssets((currentAssets) => currentAssets.filter((asset) => asset.id !== assetId));
  }

  function getMediaTitle(asset: EditableMediaAsset) {
    const slot = getMediaSlot(asset);

    if (slot === "logo") return "Logo";
    if (slot === "cover") return "Cover image";

    return "Profile image";
  }

  function getMediaSlot(asset: EditableMediaAsset): MediaSlot {
    if (asset.slot) return asset.slot;

    const text = `${asset.fileName} ${asset.altText ?? ""}`.toLowerCase();

    if (text.includes("logo")) return "logo";
    if (text.includes("cover")) return "cover";

    return "profile";
  }

  function getAssetsForSlot(slot: MediaSlot) {
    return mediaAssets.filter((asset) => getMediaSlot(asset) === slot);
  }

  function MediaTile({ asset }: { asset: EditableMediaAsset }) {
    return (
      <div className="grid w-[160px] gap-2">
        <div className="relative h-[160px] w-[160px] overflow-hidden rounded-md bg-slate-100 text-[color:var(--blue)]">
          {isEditable ? (
            <button
              type="button"
              aria-label={`Remove ${asset.fileName}`}
              className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border-muted)] bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-[color:var(--danger)]"
              onClick={() => removeAsset(asset.id)}
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          {asset.previewUrl ? (
            <img className="h-full w-full object-cover" src={asset.previewUrl} alt={asset.altText ?? asset.fileName} />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImagePlus className="h-9 w-9" />
            </div>
          )}
        </div>
        <p className="text-center text-sm font-bold text-[color:var(--navy)]">{getMediaTitle(asset)}</p>
      </div>
    );
  }

  function MediaSlotGroup({ title, slot }: { title: string; slot: MediaSlot }) {
    const slotAssets = getAssetsForSlot(slot);

    return (
      <div className="grid gap-3">
        <p className="text-sm font-bold text-[color:var(--navy)]">{title}</p>
        <div className="flex flex-wrap gap-4">
          {slotAssets.length > 0 ? (
            slotAssets.map((asset) => <MediaTile key={asset.id} asset={asset} />)
          ) : (
            <button
              type="button"
              aria-label={`Upload ${title}`}
              className="flex h-[160px] w-[160px] items-center justify-center rounded-md border border-dashed border-[color:var(--border-muted)] text-[color:var(--blue-deep)] transition hover:border-[color:var(--blue)] hover:bg-slate-50"
              onClick={() => handleUploadClick(slot)}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--blue-deep)] bg-transparent text-[color:var(--blue-deep)]">
                <Plus className="h-6 w-6" />
              </span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {isEditable ? (
        <input ref={fileInputRef} className="hidden" type="file" accept="image/*" onChange={handleFilesSelected} />
      ) : null}
      {isEditable ? (
        <div className="grid basis-full gap-5 sm:flex sm:flex-wrap">
          <MediaSlotGroup title="Logo" slot="logo" />
          <MediaSlotGroup title="Cover image" slot="cover" />
        </div>
      ) : (
        <div className="flex basis-full flex-wrap gap-4">
          {mediaAssets.map((asset) => (
            <MediaTile key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </>
  );
}
