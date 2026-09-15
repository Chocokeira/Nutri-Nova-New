import React from 'react';
import { X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-notifications-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className="pointer-events-auto bg-[#243B2E] text-white p-4 rounded-2xl shadow-xl border border-[#34533F] flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
        >
          {toast.type === 'success' ? (
            <span className="w-5 h-5 rounded-full bg-[#34533F] text-[#F5C358] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              ✓
            </span>
          ) : (
            <span className="w-5 h-5 rounded-full bg-[#34533F] text-[#F5C358] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
              i
            </span>
          )}
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white tracking-wide">{toast.title}</h4>
            <p className="text-xs text-[#D8E6DE] mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#9DB9A7] hover:text-white transition-colors p-0.5 rounded"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
