import { Event, ExtLink, InLink, PostH2 } from "@/components/blog/PostElements";
import { PostProducts } from "@/components/blog/PostProducts";

// Art therapy groups and calm art-making drop-ins in Ottawa and Ontario, winter 2026–27. Dates,
// prices and contacts come from the organizers' own pages, checked on November 1, 2026. Most of
// these programs run every year, so update the dates and keep the same slug.

export default function ArtTherapyOttawa2026() {
  return (
    <>
      <p>
        November in Ottawa gets dark early, and I notice it in my mood every year. What helps me
        most is sitting down with paint for an hour without worrying about how it turns out.
        Sometimes I keep the painting and sometimes I don&apos;t, but I always feel calmer afterwards.
      </p>
      <p>
        You don&apos;t need to be a painter to get that. Ottawa has free art groups for mental
        health, art therapy with trained therapists, and relaxed drop-in sessions where nobody
        grades your work. Here are the ones I found for this winter, plus a few in Toronto.
      </p>

      <PostH2>Art therapy or art for wellbeing?</PostH2>
      <p>
        They&apos;re not quite the same thing. Art therapy is a form of therapy: a trained art
        therapist helps you work through what you&apos;re feeling, using art-making instead of only
        talking. Wellbeing programs are gentler and more casual. You make something in a calm room
        with other people, and that&apos;s the whole point. Both are on this list, and I&apos;ve
        said which is which.
      </p>

      <PostH2>Art groups for mental health</PostH2>

      <Event
        title="Creative Space at the Ottawa Art Gallery"
        when="Weekly, in person and online · Ottawa Art Gallery, 50 Mackenzie King Bridge · Free"
        link={{
          href: "https://oaggao.ca/learn/wellness-and-community-programs/creative-space/",
          label: "About Creative Space",
        }}
      >
        The Ottawa Art Gallery and The Royal Ottawa Mental Health Centre have run this program
        together since 2015. It&apos;s a weekly art and wellness workshop for youth and adults
        living with mental illness, with a different kind of art-making each time. You decide for
        yourself whether it&apos;s for you, and nobody asks you to prove anything. Dates are on the
        gallery&apos;s calendar, and you can email studio@oaggao.ca with questions.
      </Event>

      <Event
        title="Mad Art at The Royal"
        when="Online group for women · Usually Tuesday mornings · Free"
        link={{
          href: "https://theroyal.ca/events/mad-art-virtual-drop-group-women",
          label: "About Mad Art",
        }}
      >
        A free, peer-led online group from The Royal&apos;s Women&apos;s Mental Health Program, for
        women and people who identify as women. You make art and use it to talk about mental
        health. The organizers call it an &ldquo;anti-art&rdquo; group, because skill
        doesn&apos;t matter at all. It runs a few times a year, usually on Tuesdays from 10:30 to
        noon. The next dates weren&apos;t posted when I checked, so call The Royal at
        613-722-6521 to ask when the next one starts.
      </Event>

      <Event
        title="Art Hive at MOCA, Toronto"
        when="Fridays Nov 13, Nov 27 and Dec 11, 5 to 8 pm · MOCA, 158 Sterling Rd, Toronto · Free"
        link={{ href: "https://moca.ca/events/", label: "MOCA events" }}
      >
        If you&apos;re in Toronto, this one is lovely. An art hive is an open studio where anyone
        can come in and make art, and past sessions at the Museum of Contemporary Art were led by
        students from the Toronto Art Therapy Institute. It&apos;s free, all the materials are
        there, and you don&apos;t need to book, but seats go to whoever arrives first. It continues
        into 2027 on January 8, January 22 and February 5.
      </Event>

      <PostH2>Calm art-making drop-ins</PostH2>
      <p>
        These aren&apos;t therapy, but they&apos;re cheap or free, low pressure, and a good way to
        spend a grey afternoon with your hands busy.
      </p>

      <Event
        title="Sketchy Thursdays at the Ottawa Art Gallery"
        when="Thursdays Nov 12, Nov 26 and Dec 3, 6:30 to 8 pm · Ottawa Art Gallery · $5"
        link={{ href: "https://oaggao.ca/calendar/", label: "Gallery calendar" }}
      >
        An evening drawing session in the gallery&apos;s studio for adults, where you pick up a
        technique or two. Five dollars and an hour and a half of quiet drawing after work is hard
        to beat.
      </Event>

      <Event
        title="Creative Sundays at the Ottawa Art Gallery"
        when="Sunday, Nov 15, 10 am to 2 pm · Ottawa Art Gallery · Free"
        link={{ href: "https://oaggao.ca/calendar/", label: "Gallery calendar" }}
      >
        A free drop-in art activity for all ages, so bring the kids or come on your own. The gallery
        itself is always free too, so stay and look around after.
      </Event>

      <Event
        title="Mindful art at the Ottawa Public Library"
        when="Various branches and dates · Free · Registration usually needed"
        link={{ href: "https://booking.biblioottawalibrary.ca/", label: "Library programs" }}
      >
        The library runs small calm art programs through the year, like Zentangle drawing, mandala
        dot painting and mindful painting. There&apos;s a mindful painting session in French at
        the Orléans branch on November 19, but it filled up fast. Search &ldquo;mindful&rdquo; on
        the booking site and sign up as soon as you see one you like.
      </Event>

      <PostH2>Finding an art therapist</PostH2>
      <p>
        If you want one-on-one art therapy, look for someone trained as an art therapist. In
        Canada that usually means the letters RCAT (Registered Canadian Art Therapist) after their
        name. In Ontario, many are also registered psychotherapists, written RP. The{" "}
        <ExtLink href="https://www.canadianarttherapy.org/art-therapist-directory">
          Canadian Art Therapy Association directory
        </ExtLink>{" "}
        lets you search by city. In Ottawa,{" "}
        <ExtLink href="https://www.ottawaarttherapy.ca/">Ottawa Art Therapy</ExtLink> has offices
        in Westboro and Nepean, sees all ages, and doesn&apos;t need a referral. Ask about workplace
        benefits too, since some plans cover it.
      </p>
      <p>
        And if things feel heavy right now, please don&apos;t wait for a group to start. You can
        call or text 988 any time, day or night, to talk to someone.
      </p>

      <PostH2>Making art at home</PostH2>
      <p>
        You don&apos;t need anything fancy to start. A cheap set of watercolours, a pad of paper
        and twenty minutes is enough. Paint the view from your window, or just colours you like.
        Don&apos;t aim for a good painting. Notice how it feels to move the brush.
      </p>
      <p>
        Most of my own paintings come from those quiet hours, especially the night skies and
        water. If you&apos;d like a calm piece to look at on a dark evening, they&apos;re in my{" "}
        <InLink href="/collections/nature-and-sky">Nature &amp; Sky collection</InLink>.
      </p>

      <PostProducts slugs={["northern-lights-reflection", "moonlight-shadows", "peaceful-waterfall-magnet"]} />

      <p>Take care of yourselves this winter.</p>
    </>
  );
}
