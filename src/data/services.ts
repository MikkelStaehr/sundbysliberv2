/*
  Single source of truth for alle ydelser og priser.
  BÅDE webshop-kataloget (/bestil) OG /priser læser herfra — de kan aldrig
  vise forskellige tal.

  Prisregel: alle knive 50 kr., undtagen brødkniv (tandskær) 100 kr.
  Værktøj/have: priser som i det oprindelige katalog. Ingen rabatter.

  Tilføj nye varer ved at udvide arrayet. `image` er valgfri — mangler den,
  viser kortet en grå silhuet, så et rigtigt foto bare kan droppes ind senere.
*/

export type ServiceCategory = "knive" | "vaerktoej" | "have";

export type Service = {
  id: string;
  navn: string;
  kategori: ServiceCategory;
  pris: number; // kr, inkl. moms
  image?: string;
  note?: string;
};

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  knive: "Knive",
  vaerktoej: "Værktøj",
  have: "Have",
};

export const SERVICES: Service[] = [
  // Knive — alle 50, undtagen brødkniv 100
  { id: "herbknife", navn: "Urtekniv", kategori: "knive", pris: 50, image: "/images/herbknife.png" },
  { id: "midknife", navn: "Universalkniv", kategori: "knive", pris: 50, image: "/images/utilityknife.png" },
  { id: "chefsknife", navn: "Kokkekniv", kategori: "knive", pris: 50, image: "/images/chefsknife.png" },
  { id: "santoku", navn: "Santokukniv", kategori: "knive", pris: 50, image: "/images/santokuknife.png" },
  { id: "nakiri", navn: "Nakirikniv", kategori: "knive", pris: 50, image: "/images/nakiriknife.png" },
  {
    id: "bread",
    navn: "Brødkniv (tandskær)",
    kategori: "knive",
    pris: 100,
    image: "/images/breadknife.png",
    note: "Tænder rettes op — bladet slibes ikke.",
  },

  // Værktøj — uændrede priser
  { id: "scissors", navn: "Saks", kategori: "vaerktoej", pris: 90, image: "/images/scissors.png" },
  { id: "chisel", navn: "Mejsel / stemmejern", kategori: "vaerktoej", pris: 50, image: "/images/wood_chisel.png" },
  { id: "woodchisel", navn: "Træmejsel", kategori: "vaerktoej", pris: 50, image: "/images/woodturning_tool.png" },
  { id: "planeiron", navn: "Fladt høvlblad", kategori: "vaerktoej", pris: 80, image: "/images/planeiron.png" },
  { id: "axe", navn: "Økse", kategori: "vaerktoej", pris: 120, image: "/images/axe.png" },

  // Have — uændrede priser
  { id: "mower", navn: "Plæneklipperklinge", kategori: "have", pris: 100, image: "/images/icon_mowerblade.png" },
];

export function getService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function servicesByCategory(kategori: ServiceCategory): Service[] {
  return SERVICES.filter((s) => s.kategori === kategori);
}
