import PrimaryButton from "./PrimaryButton.jsx";
import SecondaryButton from "./SecondaryButton.jsx";

const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>

        {message && (
          <p className="mt-3 text-gray-600">{message}</p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <SecondaryButton onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </SecondaryButton>

          <PrimaryButton
            onClick={onConfirm}
            loading={loading}
            className="!bg-red-600 !border-red-600 hover:!bg-red-700"
          >
            {confirmLabel}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
