import type { VehicleType } from "@/lib/ferry/types";

const vehicles: { value: VehicleType; label: string }[] = [
  { value: "none", label: "Aucun" },
  { value: "car", label: "Voiture" },
  { value: "van", label: "Utilitaire" },
  { value: "motorcycle", label: "Moto" }
];

export function VehicleSelector({ defaultValue = "car" }: { defaultValue?: VehicleType }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/70">Vehicule</span>
      <select
        name="vehicle"
        defaultValue={defaultValue}
        className="focus-ring mt-2 h-12 w-full rounded-lg border border-ink/10 bg-white px-4 text-base text-ink shadow-sm"
      >
        {vehicles.map((vehicle) => (
          <option key={vehicle.value} value={vehicle.value}>
            {vehicle.label}
          </option>
        ))}
      </select>
    </label>
  );
}
