import { ExtLink, InLink, PostH2 } from "@/components/blog/PostElements";
import { PostProducts } from "@/components/blog/PostProducts";

// Why hand-painted art feels different from AI images, and what research says about art,
// stress and the brain. Studies are named so readers can look them up. Written November 2026.

export default function HumanMadeArtVsAiArt() {
  return (
    <>
      <p>
        A friend sent me an AI picture last week. A cozy cabin, snow, warm light in the windows. It
        was pretty, and I scrolled past it in about two seconds. That same evening I spent almost
        three hours on one small painting of a frozen lake, and I still keep looking at it.
      </p>
      <p>
        I&apos;ve been thinking about why that is. I&apos;m not against AI. People use it for all
        kinds of useful things. But a picture on a screen and a painting someone made with their
        hands are not the same thing to me, and it turns out science has a few things to say about
        that too.
      </p>

      <PostH2>Your brain cares who made it</PostH2>
      <p>
        In 2009, researchers in London showed people the same abstract images and told them some
        came from a gallery and some were made by a computer. They weren&apos;t lying about the
        pictures themselves, only the labels. People liked the &ldquo;gallery&rdquo; ones more,
        and brain scans showed more activity in the area linked to pleasure and reward (Kirk and
        colleagues, NeuroImage, 2009).
      </p>
      <p>
        Newer studies found the same thing with AI art. In 2023, a group of researchers showed
        people paintings labelled either &ldquo;made by a human&rdquo; or &ldquo;made by AI.&rdquo;
        People liked the human-labelled ones more and found them more meaningful, even when the
        images were exactly the same (Bellaiche and colleagues, 2023). A big reason was effort.
        When we know a person spent hours on something, we value it more. Psychologists call this
        the effort heuristic, and honestly it just sounds like being human.
      </p>
      <p>
        So it&apos;s not only in my head. When you look at a painting and know someone sat there
        mixing that exact blue, you feel something an image from a prompt doesn&apos;t give you.
      </p>

      <PostH2>Art, stress and mental health</PostH2>
      <p>
        In 2019 the World Health Organization reviewed over 900 studies on the arts and health. The{" "}
        <ExtLink href="https://iris.who.int/handle/10665/329834">WHO report</ExtLink> found that
        both making art and enjoying it can help with stress, anxiety, depression and loneliness.
        Not as a cure, but as a real help.
      </p>
      <p>
        Making art is where it gets interesting. In a 2016 study at Drexel University, adults made
        art for 45 minutes, and about three out of four had lower cortisol afterwards. Cortisol is
        the stress hormone. Most of them had no art experience at all, and it worked the same
        (Kaimal and colleagues, 2016).
      </p>
      <p>
        That&apos;s the part AI skips. Typing a sentence and getting a picture in ten seconds is
        fast, but you miss the slow bit: choosing colours, making mistakes, fixing them, getting
        lost in it for an hour. For me that slow bit is the whole point. It&apos;s when my head
        goes quiet.
      </p>

      <PostH2>Small imperfections are good for you</PostH2>
      <p>
        If you look closely at my{" "}
        <InLink href="/products/folk-rooster">Folk Rooster</InLink>, the white dots aren&apos;t all
        the same size. Some are a little rounder, some a little flatter. I put each one there with
        the tip of a brush, and my hand wasn&apos;t perfectly steady every time.
      </p>
      <p>
        I used to worry about that. Now I think it&apos;s why people like it. Hand-painted work has
        texture, tiny brush marks and colours that shift as the light in your room changes. Your
        eyes have something to explore. AI images are often very smooth and very polished, almost
        too perfect, and after a while they start to look alike.
      </p>

      <PostH2>Why it&apos;s better for you as a buyer</PostH2>
      <p>
        When you buy an original painting, you get the only one. Nobody else in the world has that
        exact <InLink href="/products/wildflower-garden">Wildflower Garden</InLink>, because I
        can&apos;t paint it the same way twice even if I try. An AI image can be made again in
        seconds, by anyone, as many times as they like.
      </p>
      <p>A few other things I think matter when you&apos;re choosing art:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          There&apos;s a person behind it. You can write to me, ask how I made it, or ask for
          something similar in your colours.
        </li>
        <li>
          Your money goes to an artist, not a server farm. For small studios like mine, every order
          really does help me keep painting.
        </li>
        <li>
          It&apos;s a real object. Acrylic, resin and wood that you can hold, hang and pass on. It
          doesn&apos;t live in a folder on your phone.
        </li>
        <li>
          It makes a better gift. People can tell when something was made by hand, and it feels
          more personal to give.
        </li>
      </ul>

      <PostH2>And for the soul</PostH2>
      <p>
        This part is harder to prove with a study, so I&apos;ll just tell you how I see it. Every
        painting I make has a bit of my day in it. The northern lights one I painted after a long
        walk by the river. The moon one I painted on a night I couldn&apos;t sleep. When someone
        hangs it in their kitchen, a little of that moment goes with it.
      </p>
      <p>
        I think that&apos;s what we feel when we look at handmade art. Not just colours and shapes,
        but another person saying &ldquo;this is what I saw, and I wanted to share it with
        you.&rdquo; An AI can copy how that looks. It can&apos;t mean it.
      </p>

      <PostH2>Try it yourself</PostH2>
      <p>
        You don&apos;t have to buy anything to feel this. Get some cheap paints and paint something
        badly tonight. Your cortisol will probably thank you. If you&apos;d like to make it a habit,
        I wrote about{" "}
        <InLink href="/blog/art-therapy-ottawa-2026">art groups and calm drop-ins in Ottawa</InLink>{" "}
        this winter.
      </p>
      <p>
        And if you&apos;d like a small piece of handmade calm for your wall, here are a few of mine.
      </p>

      <PostProducts slugs={["folk-rooster", "wildflower-garden", "northern-lights-reflection", "moonlight-shadows"]} />

      <p>Thanks for reading, and for supporting people who make things by hand.</p>
    </>
  );
}
