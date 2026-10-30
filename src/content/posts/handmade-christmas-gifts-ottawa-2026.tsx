import { ExtLink, InLink, PostH2 } from "@/components/blog/PostElements";
import { PostProducts } from "@/components/blog/PostProducts";

// Holiday gift guide, published October 30, 2026. The craft fair dates come from the listings
// checked for the Halloween post on October 28, 2026.

export default function HandmadeChristmasGiftsOttawa2026() {
  return (
    <>
      <p>
        If you want to give something handmade this year without spending a lot, here are the
        gifts from my studio. Everything below is painted by hand here in Ottawa, nothing is
        printed, and all of it costs less than $40.
      </p>
      <p>
        I&apos;ve sorted them by price, with a few notes on who each one suits. If you want to see
        everything at once, it&apos;s all on the{" "}
        <InLink href="/gifts">handmade gifts</InLink> page.
      </p>

      <PostH2>Under $5: cards that are gifts too</PostH2>
      <p>
        The <InLink href="/products/christmas-gnome-postcard">Christmas Gnome</InLink> postcards are
        painted one at a time in watercolour, so no two gnomes come out quite the same. There are
        two designs, one holding a little love letter and one with &ldquo;Joy&rdquo;. Write your
        message on the back and you have a card people tend to keep, or prop it on a shelf as a
        tiny painting.
      </p>
      <p>
        For someone you love, the <InLink href="/products/together-panda-postcard">Together</InLink>{" "}
        postcards show two pandas under a heart balloon. They come in five versions, from
        &ldquo;Love you&rdquo; to no words at all. They&apos;re $2 each, and they&apos;re lovely
        tucked into a bigger gift.
      </p>

      <PostProducts slugs={["christmas-gnome-postcard", "together-panda-postcard"]} />

      <PostH2>Under $20: stocking stuffers</PostH2>
      <p>
        Each of my fridge magnets is a little landscape, about 3 inches square, painted in oil with my fingers instead of a brush, then
        sealed with a glossy coat. Right now there&apos;s a{" "}
        <InLink href="/products/peaceful-waterfall-magnet">Peaceful Waterfall</InLink> in summer
        blues and greens, and an <InLink href="/products/autumn-waterfall-magnet">Autumn Waterfall</InLink>{" "}
        in reds and golds. They&apos;re $15, small enough for a stocking, and they suit almost
        anyone: teachers, coworkers, a neighbour, the person who has everything.
      </p>

      <PostProducts slugs={["peaceful-waterfall-magnet", "autumn-waterfall-magnet"]} />

      <PostH2>Under $40: a small original to hang</PostH2>
      <p>
        These are my framed pieces. Each one is about 5 inches across, painted in acrylic, sealed
        in glossy epoxy resin and set in a natural wood frame with a rope hanger. They&apos;re all
        $35 and one of a kind, so when one sells, it&apos;s gone for good.
      </p>
      <p>
        For a new home or a hostess gift, try the{" "}
        <InLink href="/collections/folk-florals">folk art florals</InLink>: bright flowers on a
        deep black ground, in a traditional folk art style. They look good in a kitchen and
        cheer up a dark entryway in February.
      </p>
      <p>
        For someone who loves the outdoors, the{" "}
        <InLink href="/collections/nature-and-sky">Nature &amp; Sky</InLink> pieces have northern
        lights, moonlit trees, sunsets and gardens. If they spend their summers at a cottage or
        their winters wishing for one, start here.
      </p>

      <PostProducts slugs={["northern-lights-reflection", "folk-rooster", "moonlight-shadows"]} />

      <PostH2>Getting your gifts in time</PostH2>
      <p>
        If you&apos;re in Ottawa, you can pick up for free in Blackburn Hamlet, and I deliver free
        there too. Anywhere else
        in Canada, orders arrive in 1 to 7 days, and postcards and magnets can go by Lettermail for
        $3 to $5. With holiday mail being slow, I&apos;d order by early December to be safe.
      </p>
      <p>
        If you&apos;d like something made just for one person, like a favourite place or a pet,{" "}
        <InLink href="/#contact">email me</InLink> soon. Commissions take time, and December
        fills up fast.
      </p>

      <PostH2>Handmade gifts at Ottawa craft fairs</PostH2>
      <p>
        Craft fair season is one of my favourite parts of the year, and it&apos;s the best way to
        find gifts made by local artists. The{" "}
        <ExtLink href="https://www.eventbrite.com/e/manotick-artisan-fair-tickets-1999894358863">Manotick Artisan Fair</ExtLink>{" "}
        is on November 7 and 8. Later in the month there&apos;s the{" "}
        <ExtLink href="https://gnag.ca/events/craft/">Glebe Craft &amp; Artisan Fair</ExtLink> and the{" "}
        <ExtLink href="https://www.eventbrite.ca/e/2026-hintonburg-artisan-craft-fair-tickets-2002668370005">
          Hintonburg Artisan Craft Fair
        </ExtLink>{" "}
        on November 28. Check the links for times before you go.
      </p>
      <p>
        Whatever you choose, from me or from another maker, thank you for buying handmade this
        year. It means more to small artists than you might think.
      </p>
    </>
  );
}
