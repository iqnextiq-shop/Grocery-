"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
export default function Dialog({
  open,
  onClose,
  title,
  children,
  bottom = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  bottom?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (open && !d?.open) d?.showModal();
    if (!open && d?.open) d.close();
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`modal ${bottom ? "bottom-sheet" : ""}`}
      aria-label={title}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="modal-inner">
        <div className="modal-head">
          <h2>{title}</h2>
          <button className="iconbtn" onClick={onClose} aria-label="বন্ধ করুন">
            <X />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
