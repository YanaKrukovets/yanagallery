import { unsplash } from "@/lib/images";

export const collections = [
  {
    slug: "rideau-and-river",
    title: "Rideau & River",
    blurb: "Canal light, open water, and slow summer evenings.",
    count: 24,
    image: unsplash("1501785888041-af3ef285b470", 1000),
  },
  {
    slug: "gatineau-hills",
    title: "Gatineau Hills",
    blurb: "Forest trails, fog, and the quiet just across the bridge.",
    count: 31,
    image: unsplash("1441974231531-c6227db76b6e", 1000),
  },
  {
    slug: "capital-winters",
    title: "Capital Winters",
    blurb: "Snow, skate trails, and the long blue hour of January.",
    count: 18,
    image: unsplash("1483664852095-d6cc6870702d", 1000),
  },
];
