import type { ReactNode } from "react";
import { ExtLink } from "@/components/blog/PostElements";
import { PostProducts } from "@/components/blog/PostProducts";

// Halloween weekend in Ottawa, Oct 30 – Nov 1, 2026. Dates, times and prices come from
// event listings checked on October 28, 2026.

export default function HalloweenWeekendOttawa2026() {
  return (
    <>
      <p>
        Halloween falls on a Saturday this year, so the whole weekend gets to be Halloween. Haunted
        farms are great if you like being chased through a corn maze. I was looking for something
        quieter, with altars and candles and things people made by hand, and Ottawa has plenty of
        that this weekend.
      </p>

      <Event
        title="Day of the Dead at the National Arts Centre"
        when="Friday, Oct 30 · 6 to 8 pm · Peter A. Herrndorf Place, 1 Elgin St · Free"
        link={{ href: "https://www.todocanada.ca/city/ottawa/event/day-of-the-dead-celebrations/", label: "Event details" }}
      >
        This is the one I&apos;m most excited about. The Embassy of Mexico is building a large
        traditional Día de los Muertos altar at the NAC, the first time it&apos;s been done there.
        You can take a guided tour of the altar, browse a small market of Mexican crafts, and join a
        workshop with artist Ricardo Rodríguez. No tickets needed, and kids are welcome.
      </Event>

      <Event
        title="Day of the Dead Festival in the ByWard Market"
        when="Friday, Oct 30 to Sunday, Nov 1 · ByWard Market Square · Free"
        link={{ href: "https://www.ottawafestivals.ca/calendar/day-of-the-dead-festival", label: "Festival details" }}
      >
        If you can&apos;t make Friday at the NAC, or you just want more, the Market has its own Day of
        the Dead festival all weekend. Local artists are making ofrendas, the memorial altars covered
        in marigolds, photos and candles, for well-known Mexican and Canadian people. There&apos;s
        also an artisan market with Mexican and local makers, folk dancing, live music, and pan de
        muerto. The bread alone would get me there.
      </Event>

      <Event
        title="Nosferatu with a live choir and organ"
        when="Friday, Oct 30 and Saturday, Oct 31 · 7:30 pm · St. Matthew's Anglican Church, 130 Glebe Ave · $20 to $30"
        link={{ href: "https://www.todocanada.ca/city/ottawa/event/seventeen-halloween/", label: "Event details" }}
      >
        St. Matthew&apos;s in the Glebe is showing <em>Nosferatu</em>, the 1922 silent vampire film,
        with live music. The chamber choir Seventeen Voyces sings Brahms, Poulenc and Penderecki,
        organist Matthew Larkin improvises along with the film, and violinist Ralitsa Tcholakova
        plays Bartók&apos;s Romanian Folk Dances. A hundred-year-old vampire movie with live music,
        in a church, on Halloween night is hard to pass up.
      </Event>

      <PostProducts slugs={["midnight-blue-blossom", "moonlight-shadows", "twilight-tree"]} />

      <Event
        title="Nature Nocturne at the Canadian Museum of Nature"
        when="Friday, Oct 30 · 240 McLeod St"
        link={{ href: "https://nature.ca/en/visit-us/whats-on/listing/nature-nocturne/", label: "Tickets and times" }}
      >
        This one is for a night out without the kids. There are DJs on four floors of the museum and artists
        working in the galleries, and you get to dance inside the castle on McLeod Street.
      </Event>

      <Event
        title="Pumpkinferno at Upper Canada Village"
        when="Until Saturday, Oct 31 · Morrisburg, about an hour from Ottawa"
        link={{ href: "https://ottawatourism.ca/en/event-calendar/pumpkinferno", label: "Event details" }}
      >
        It&apos;s a drive, but if you&apos;ve never been, Saturday is the last night this year.
        Thousands of carved pumpkins are lit up and set out in big scenes along the village paths,
        and some of the carving is detailed enough to pass for sculpture.
      </Event>

      <Event title="For the little ones" when="Saturday, Oct 31">
        Two easy ones for Saturday. The Richmond branch of the library has a free drop-in{" "}
        <ExtLink href="https://booking.biblioottawalibrary.ca/en?text=halloween">Halloween craft</ExtLink> at
        10:30 am. And Watson&apos;s Mill in Manotick has a{" "}
        <ExtLink href="https://www.todocanada.ca/halloween-in-ottawa/">Children&apos;s Halloween Spooktacular</ExtLink>{" "}
        with crafts, games, a photo booth and a gentle version of the mill&apos;s haunted maze (no
        one jumps out at you). It&apos;s meant for ages 3 to 8.
      </Event>

      <h2 className="mt-14 font-serif text-2xl text-ink md:text-3xl">After Halloween</h2>
      <p>
        Once the pumpkins are gone, craft fair season starts. The{" "}
        <ExtLink href="https://www.eventbrite.com/e/manotick-artisan-fair-tickets-1999894358863">Manotick Artisan Fair</ExtLink>{" "}
        is next weekend, November 7 and 8. Later in the month there&apos;s the{" "}
        <ExtLink href="https://gnag.ca/gnag-events/craft/">Glebe Craft &amp; Artisan Fair</ExtLink> and the{" "}
        <ExtLink href="https://www.eventbrite.ca/e/2026-hintonburg-artisan-craft-fair-tickets-2002668370005">
          Hintonburg Artisan Craft Fair
        </ExtLink>{" "}
        on November 28. If you&apos;re starting on holiday gifts, those are good places to find
        something made by hand.
      </p>
      <p>
        I got the times and prices from event listings, so check the links before you head out.
        Ottawa Tourism also has a longer{" "}
        <ExtLink href="https://ottawatourism.ca/en/ottawa-insider/halloweekend-in-ottawa">Halloween weekend guide</ExtLink>{" "}
        if you want haunted farms after all.
      </p>
      <p>Happy Halloween!</p>
    </>
  );
}

function Event({
  title,
  when,
  link,
  children,
}: {
  title: string;
  when: string;
  link?: { href: string; label: string };
  children: ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="font-serif text-2xl text-ink md:text-3xl">{title}</h2>
      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-bronze">{when}</p>
      <p className="mt-4">{children}</p>
      {link && (
        <p className="mt-3">
          <ExtLink href={link.href}>
            {link.label}
            <span className="sr-only">: {title}</span> <span aria-hidden>→</span>
          </ExtLink>
        </p>
      )}
    </section>
  );
}
