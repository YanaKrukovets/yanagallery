import { InLink, PostH2 } from "@/components/blog/PostElements";
import { PostProducts } from "@/components/blog/PostProducts";

// Announces that the online Christmas market (the Christmas collection and gift pages) is open,
// with this week's new cards and how to pay and pick up. Written November 6, 2026.

export default function OnlineChristmasMarketOpen() {
  return (
    <>
      <p>
        I love a real Christmas market. The cold hands, the hot cider, the guy selling maple
        fudge who always gives you one more sample than you need. But I also know that a lot of
        people can&apos;t get to Lansdowne on a Saturday, or they get there and it&apos;s
        raining sideways and they go home.
      </p>
      <p>
        So this year I set up my own little market right here on the site. It&apos;s open now,
        and you can shop it in your pyjamas.
      </p>

      <PostH2>What&apos;s on the tables</PostH2>
      <p>
        Think of the <InLink href="/collections/christmas">Christmas collection</InLink> as my
        stall. Everything on it is painted by hand in my studio in Blackburn Hamlet, one card at
        a time. Most cards are $3, and the small square ones are $2.
      </p>
      <p>
        I added three new cards this week. There&apos;s a pink ornament with gold ribbons and
        &ldquo;Joy&rdquo; written across it (it also comes in red, with &ldquo;Happy
        Holidays&rdquo; or a big &ldquo;JOY&rdquo;). There&apos;s a gingerbread man in a red
        scarf, who honestly looks very pleased with himself. And there&apos;s a turquoise tree on
        a pink and purple sky that says &ldquo;Ho-Ho-Ho&rdquo;, which is the loudest card
        I&apos;ve painted this year. It folds, so you get the whole inside for your message.
      </p>

      <PostProducts
        slugs={["pink-christmas-ornament-card", "gingerbread-man-christmas-card", "joyful-christmas-tree-card"]}
      />

      <p>
        The snowy forests, the ink trees, the penguins, the winter bird and the Christmas cat
        are all still there too. Some designs only have a few cards left, and when they&apos;re
        gone I don&apos;t paint the exact same one again.
      </p>
      <p>
        If you&apos;re shopping for someone and not just mailing cards, the{" "}
        <InLink href="/gifts">gifts page</InLink> sorts everything by price. There are
        hand-painted fridge magnets for $15 and small framed paintings for $35, which fit in a
        stocking better than you&apos;d expect.
      </p>

      <PostH2>How paying works right now</PostH2>
      <p>
        Quick heads-up: the card payment on the site is having problems, and I&apos;ve turned
        it off until it&apos;s fixed. You can still put things in your bag and look around.
        Then just <InLink href="/#contact">send me an email</InLink> with what you want, and you
        can pay by Interac e-Transfer or in cash when you pick up. I usually answer the same
        day, unless I&apos;m elbow-deep in paint.
      </p>

      <PostH2>Pickup, delivery and mail</PostH2>
      <p>
        If you live in Blackburn Hamlet, pickup is free and so is delivery. I bring cards to
        Orléans, Kanata, Barrhaven and Gatineau for $10. For the rest of Canada, cards and
        magnets can go in a Lettermail envelope for a few dollars.
      </p>
      <p>
        If your cards have to cross the country, order them in November. Holiday mail gets slow
        in December, and I&apos;d hate for your aunt in Saskatoon to get her card in January.
      </p>

      <PostH2>Can&apos;t decide?</PostH2>
      <p>
        Tell me who it&apos;s for and I&apos;ll help you pick. My grandmother rule: if
        they&apos;ll put it on the fridge, go cute. If they&apos;ll put it on a shelf, go for the
        forest. And if you&apos;re stuck on what to write inside, I wrote up{" "}
        <InLink href="/blog/what-to-write-in-a-christmas-card">80 short card messages</InLink>{" "}
        you can borrow.
      </p>
      <p>
        If you&apos;d still rather wander a market in person, here&apos;s my list of{" "}
        <InLink href="/blog/ottawa-christmas-markets-2026">Ottawa Christmas markets for 2026</InLink>.
        Bring mittens. And thank you for shopping small this year.
      </p>
    </>
  );
}
