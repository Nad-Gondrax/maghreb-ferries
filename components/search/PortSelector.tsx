import type { Port } from "@/lib/ferry/types";

type PortSelectorProps = {
  name: string;
  label: string;
  placeholder: string;
  ports: Port[];
  defaultValue?: string;
};

export function PortSelector({ name, label, placeholder, ports, defaultValue }: PortSelectorProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/70">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        list={`${name}-ports`}
        placeholder={placeholder}
        className="focus-ring mt-2 h-12 w-full rounded-lg border border-ink/10 bg-white px-4 text-base text-ink shadow-sm placeholder:text-ink/35"
      />
      <datalist id={`${name}-ports`}>
        {ports.map((port) => (
          <option key={port.id} value={port.city}>
            {port.name}
          </option>
        ))}
      </datalist>
    </label>
  );
}
