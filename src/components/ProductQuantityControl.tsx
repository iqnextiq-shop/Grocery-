"use client";
export default function ProductQuantityControl({
  quantity,
  onChange,
  max = 25,
  label = "পরিমাণ",
}: {
  quantity: number;
  onChange: (n: number) => void;
  max?: number;
  label?: string;
}) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button"
        disabled={quantity <= 0}
        onClick={() => onChange(quantity - 1)}
        aria-label={`${label} কমান`}
      >
        −
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        disabled={quantity >= max}
        onClick={() => onChange(quantity + 1)}
        aria-label={`${label} বাড়ান`}
      >
        +
      </button>
    </div>
  );
}
