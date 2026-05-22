type DateSelectorProps = {
  name: string;
  label: string;
  required?: boolean;
};

export function DateSelector({ name, label, required }: DateSelectorProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/70">{label}</span>
      <input
        name={name}
        type="date"
        required={required}
        className="focus-ring mt-2 h-12 w-full rounded-lg border border-ink/10 bg-white px-4 text-base text-ink shadow-sm"
      />
    </label>
  );
}
