/*
  Single source of truth for alle ydelser og priser.
  BÅDE webshop-kataloget (/bestil) OG /priser læser herfra — de kan aldrig
  vise forskellige tal.

  Prisregel: alle knive 50 kr., undtagen brødkniv (tandskær) 100 kr.
  Værktøj/have: priser som i det oprindelige katalog. Ingen rabatter.

  Tilføj nye varer ved at udvide arrayet. `image` er valgfri — mangler den,
  viser kortet en grå silhuet, så et rigtigt foto bare kan droppes ind senere.
*/

import type { StaticImageData } from "next/image";
import herbknife from "@/img/products/herbknife.png";
import utilityknife from "@/img/products/utilityknife.png";
import chefsknife from "@/img/products/chefsknife.png";
import santokuknife from "@/img/products/santokuknife.png";
import nakiriknife from "@/img/products/nakiriknife.png";
import breadknife from "@/img/products/breadknife.png";
import scissors from "@/img/products/scissors.png";
import woodChisel from "@/img/products/wood_chisel.png";
import woodturningTool from "@/img/products/woodturning_tool.png";
import planeiron from "@/img/products/planeiron.png";
import axe from "@/img/products/axe.png";
import mowerblade from "@/img/products/icon_mowerblade.png";
import hedgeshears from "@/img/products/hedgeshears.png";
import pruningshears from "@/img/products/pruningshears.png";
import drainspade from "@/img/products/drainspade.png";
import spade from "@/img/products/spade.png";

export type ServiceCategory = "knive" | "vaerktoej" | "have";

export type Service = {
  id: string;
  navn: string;
  kategori: ServiceCategory;
  pris: number; // kr, inkl. moms
  image?: StaticImageData;
  note?: string;
};

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  knive: "Knive",
  vaerktoej: "Værktøj",
  have: "Have",
};

export const SERVICES: Service[] = [
  // Knive — alle 50, undtagen brødkniv 100
  { id: "herbknife", navn: "Urtekniv", kategori: "knive", pris: 50, image: herbknife },
  { id: "midknife", navn: "Universalkniv", kategori: "knive", pris: 50, image: utilityknife },
  { id: "chefsknife", navn: "Kokkekniv", kategori: "knive", pris: 50, image: chefsknife },
  { id: "santoku", navn: "Santokukniv", kategori: "knive", pris: 50, image: santokuknife },
  { id: "nakiri", navn: "Nakirikniv", kategori: "knive", pris: 50, image: nakiriknife },
  {
    id: "bread",
    navn: "Brødkniv (tandskær)",
    kategori: "knive",
    pris: 100,
    image: breadknife,
    note: "Tænder rettes op. Bladet slibes ikke.",
  },

  // Værktøj — uændrede priser
  { id: "scissors", navn: "Saks", kategori: "vaerktoej", pris: 90, image: scissors },
  { id: "chisel", navn: "Mejsel / stemmejern", kategori: "vaerktoej", pris: 50, image: woodChisel },
  { id: "woodchisel", navn: "Træmejsel", kategori: "vaerktoej", pris: 50, image: woodturningTool },
  { id: "planeiron", navn: "Fladt høvlblad", kategori: "vaerktoej", pris: 80, image: planeiron },
  { id: "axe", navn: "Økse", kategori: "vaerktoej", pris: 120, image: axe },

  // Have
  { id: "mower", navn: "Plæneklipperklinge", kategori: "have", pris: 100, image: mowerblade },
  { id: "hedgeshears", navn: "Hækkesaks", kategori: "have", pris: 75, image: hedgeshears },
  { id: "pruningshears", navn: "Grensaks / rosensaks", kategori: "have", pris: 75, image: pruningshears },
  { id: "drainspade", navn: "Drænspade", kategori: "have", pris: 100, image: drainspade },
  { id: "spade", navn: "Spade", kategori: "have", pris: 100, image: spade },
];
