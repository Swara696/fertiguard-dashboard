"use client";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative w-full max-w-md glass p-6 z-10">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className="text-sm text-muted mb-4">{children}</div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-outline">Cancel</button>
          <button onClick={() => { onClose && onClose(true); }} className="btn-primary">Proceed</button>
        </div>
      </div>
    </div>
  );
}
