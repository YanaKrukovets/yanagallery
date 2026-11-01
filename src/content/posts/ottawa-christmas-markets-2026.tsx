import { Event, ExtLink, InLink, PostH2 } from "@/components/blog/PostElements";
import { PostProducts } from "@/components/blog/PostProducts";

// Christmas markets in and around Ottawa, 2026. Dates, hours and prices come from organizer
// pages and Ottawa Tourism, checked on November 1, 2026. Update the dates for 2027 and keep the
// same slug, so the page keeps its search ranking.

export default function OttawaChristmasMarkets2026() {
  return (
    <>
      <p>
        Ottawa&apos;s Christmas market season starts on November 20 this year, and I&apos;ve
        already picked the ones I want to get to. Here they are in date order, with where each one
        is, what it costs to get in, and what I&apos;d go looking for. Most of them are free.
      </p>
      <p>
        I checked the dates on the organizers&apos; own pages where I could. Hours do change, so
        click through before you head out, especially if the weather turns.
      </p>

      <Event
        title="Ottawa Christmas Market at Lansdowne"
        when="Weekends, Friday Nov 20 to Sunday Dec 20 · Aberdeen Square, Lansdowne Park · Free"
        link={{ href: "https://www.ottawachristmasmarket.com/", label: "Market website" }}
      >
        This is the big one, and the closest thing Ottawa has to a European Christmas market:
        wooden huts, lights strung over Aberdeen Square, mulled wine and a lot of people in toques.
        It opens Friday, November 20 at 5 pm and runs Friday evenings and all day Saturdays and
        Sundays until December 20. There&apos;s also a New Year&apos;s Eve night on December 31,
        from 6 pm to 1 am. Go on a Friday night if you can. It&apos;s prettiest after dark, and
        usually less crowded than Saturday afternoon.
      </Event>

      <Event
        title="Watson's Mill Christmas Market"
        when="Starts Nov 21 and 22, for three weekends · Watson's Mill, Manotick · By donation"
        link={{ href: "https://www.watsonsmill.com/events", label: "Event details" }}
      >
        If Lansdowne feels like too much, drive out to Manotick. More than 35 vendors set up across
        the old stone mill and the buildings around it, and the village is lovely in December. It
        runs three weekends starting November 21, and you pay what you like at the door.
      </Event>

      <Event
        title="ADAAWE Indigenous Holiday Market"
        when="Saturday, Nov 21"
        link={{
          href: "https://ottawatourism.ca/en/see-and-do/adaawe-indigenous-holiday-market",
          label: "Event details",
        }}
      >
        The ADAAWE Indigenous Business Hub runs this one, with more than 20 local Indigenous
        artists and makers. Last year it was on Somerset Street West in Centretown, so check the
        listing for this year&apos;s address. If you want your gift money to go straight to the
        person who made the thing, start here.
      </Event>

      <Event
        title="HoliYay Craft Market at the National Arts Centre"
        when="Sunday, Nov 22 · from 11 am · National Arts Centre, 1 Elgin St · Free"
        link={{ href: "https://nac-cna.ca/en/event/39803", label: "Event details" }}
      >
        A one-day market of local artists and makers in the NAC&apos;s big glass atrium, right
        downtown. It&apos;s indoors and has a coffee shop, so it&apos;s a good one for a cold or
        slushy day. This is its eighth year.
      </Event>

      <Event
        title="The Museum's Christmas Market"
        when="Thursday, Nov 26 to Sunday, Nov 29 · Canadian Museum of History, 100 Laurier St, Gatineau · Free"
        link={{ href: "https://www.historymuseum.ca/events/christmas-market", label: "Hours and vendors" }}
      >
        Over 100 vendors fill the Grand Hall and the rooms around it, under the big totem poles and
        the windows looking across the river at Parliament. You&apos;ll find ornaments, woodwork,
        glass, jewellery, and a separate food market this year. It&apos;s open 11 am to 8 pm on
        Thursday and Friday and 9 am to 5 pm on the weekend. No ticket needed.
      </Event>

      <PostProducts slugs={["christmas-gnome-postcard", "penguin-christmas-card", "christmas-cat-card"]} />

      <Event
        title="Idle Hands Arts, Craft and Vintage Sale"
        when="Sunday, Nov 29 · allsaints Event Space, Sandy Hill · $5 at the door"
        link={{ href: "https://www.instagram.com/idle_hands_ottawa/", label: "Idle Hands on Instagram" }}
      >
        A smaller sale of art, crafts and vintage finds, in a former church in Sandy Hill. That
        weekend, the{" "}
        <ExtLink href="https://gnag.ca/events/craft/">Glebe Craft &amp; Artisan Fair</ExtLink> and the{" "}
        <ExtLink href="https://www.eventbrite.ca/e/2026-hintonburg-artisan-craft-fair-tickets-2002668370005">
          Hintonburg Artisan Craft Fair
        </ExtLink>{" "}
        are on too, so you could make a day of it.
      </Event>

      <Event
        title="Originals Christmas Craft Sale"
        when="Wednesday, Dec 9 to Sunday, Dec 13 · Cohere Centre, 4899 Uplands Dr · Tickets online"
        link={{ href: "https://originalsshow.ca/", label: "Hours and tickets" }}
      >
        The biggest craft sale of the season, with more than 210 Canadian artisans under one roof.
        It&apos;s open until 9 pm Wednesday to Friday, which helps if you work days, and it&apos;s
        late enough in December to catch anyone still missing from your list. The venue used to be
        the EY Centre, and the Uplands stop on O-Train Line 4 is right there, so you can skip the
        parking.
      </Event>

      <PostH2>What to buy at a Christmas market</PostH2>
      <p>
        Mulled wine first, obviously. For gifts, I look for things that are hard to
        find in a regular store and easy to carry home: ornaments, small paintings, handmade cards,
        soaps, honey, a pair of mitts. Small things travel well and suit almost anyone on your list.
      </p>
      <p>
        Bring cash and a tote bag, since not every table
        takes cards and the line for one can be long. If you love something, buy it, because
        handmade pieces are usually one of a kind and they don&apos;t come back. And ask the maker
        about it. Most of us love talking about how a piece was made, and you get a story to pass
        on with the gift.
      </p>

      <PostH2>Can&apos;t make it to a market?</PostH2>
      <p>
        My studio is open online the whole season. I paint Christmas cards for $3 each, fridge
        magnets for $15 and small framed originals for $35, all by hand here in Ottawa. I wrote
        about them in my{" "}
        <InLink href="/blog/handmade-christmas-gifts-ottawa-2026">handmade Christmas gift guide</InLink>,
        or you can see them all on the <InLink href="/gifts">gifts page</InLink>.
      </p>
      <p>
        Pickup and delivery are free in Blackburn Hamlet. Delivery to Orléans, Kanata, Barrhaven
        and Gatineau is a flat rate, and I ship anywhere in Canada. If you want it before
        Christmas, order by early December.
      </p>

      <PostProducts slugs={["peaceful-waterfall-magnet", "folk-flowers", "midnight-companion"]} />

      <p>Happy market season!</p>
    </>
  );
}
