import type { ReactNode } from "react";
import { InLink, PostH2 } from "@/components/blog/PostElements";
import { PostProducts } from "@/components/blog/PostProducts";

// Christmas card messages, grouped by who the card is for. Evergreen: update the intro each
// year and keep the slug. There should be 80 messages in total across the lists.

/** One group of messages, shown as quotes in a simple list. */
function Messages({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3 border-l-2 border-gold/60 pl-5">
      {items.map((m, i) => (
        <li key={i}>&ldquo;{m}&rdquo;</li>
      ))}
    </ul>
  );
}

export default function WhatToWriteInAChristmasCard() {
  return (
    <>
      <p>
        Every December I paint a stack of Christmas cards, and every December I sit there with a
        pen and no idea what to write in them. The painting is the easy part for me. The two lines
        on the back take forever.
      </p>
      <p>
        So this year I made myself a list, and I&apos;m sharing it. There are 80 messages here,
        sorted by who you&apos;re writing to. Copy them, change them, mix two together. Nobody will
        know, and the person getting the card will just be happy you thought of them.
      </p>

      <PostH2>A few tips before you start</PostH2>
      <p>
        <strong>Short is fine.</strong> Really. Two warm sentences beat a paragraph you didn&apos;t
        mean. My cards are postcard style, so there&apos;s only room for a few lines anyway, and
        that&apos;s a blessing.
      </p>
      <p>
        <strong>Add one personal thing.</strong> The best trick I know is to take any message below
        and add one line that only fits that person. &ldquo;Can&apos;t wait for your shortbread
        again.&rdquo; &ldquo;Still laughing about the canoe.&rdquo; That one line is what they&apos;ll
        remember.
      </p>
      <p>
        <strong>Write it by hand.</strong> Even if your handwriting is messy. Especially if
        it&apos;s messy. That&apos;s the whole point of a card.
      </p>
      <p>
        <strong>Not sure if they celebrate Christmas?</strong> Use &ldquo;happy holidays&rdquo; or
        &ldquo;season&apos;s greetings.&rdquo; There&apos;s a section for that below too.
      </p>

      <PostH2>For parents</PostH2>
      <Messages
        items={[
          "Merry Christmas, Mom and Dad. Every good Christmas memory I have started with you.",
          "Thank you for always making home feel like home. Love you both, merry Christmas.",
          "I still think your Christmas dinner is the best in the world. Save me a seat.",
          "Merry Christmas to the two people who taught me what this season is really about.",
          "Wishing you a slow, cozy Christmas with your feet up. You've earned it.",
          "No matter how old I get, Christmas still means you. Love you.",
        ]}
      />

      <PostH2>For grandparents</PostH2>
      <Messages
        items={[
          "Merry Christmas, Grandma. Your kitchen will always smell like Christmas to me.",
          "Thank you for all the stories, the cookies and the love. Merry Christmas, Grandpa.",
          "Thinking of you this Christmas and wishing I could give you a big hug in person.",
          "You make every holiday feel special. Wishing you a warm and happy Christmas.",
          "Merry Christmas! I hope this card brightens your windowsill for a few weeks.",
        ]}
      />

      <PostH2>For brothers and sisters</PostH2>
      <Messages
        items={[
          "Merry Christmas to my favourite sibling. Don't tell the others.",
          "Thanks for being my partner in crime since the very first Christmas. Love you.",
          "However far apart we are, Christmas always takes me back to us as kids. Merry Christmas.",
          "Wishing you a Christmas with fewer arguments over board games than usual. Merry Christmas!",
          "You're the best present Mom and Dad ever gave me. Merry Christmas.",
          "Merry Christmas! Let's actually call each other more next year.",
        ]}
      />

      <PostH2>For the whole family</PostH2>
      <Messages
        items={[
          "Merry Christmas to all of you, from all of us. We hope your home is full of warmth this year.",
          "Wishing your family a Christmas full of laughter, good food and long naps.",
          "We're so lucky to have you in our lives. Merry Christmas and happy New Year.",
          "Sending love from our house to yours this Christmas.",
          "May your tree be bright and your table be full. Merry Christmas!",
          "Thinking of you all and wishing you the happiest of holidays.",
        ]}
      />

      <PostH2>For kids</PostH2>
      <Messages
        items={[
          "Merry Christmas! I hear you've been very good this year. Santa told me.",
          "Have the best Christmas ever. Don't eat all the candy canes at once!",
          "Merry Christmas to my favourite little elf.",
          "I hope you find everything you wished for under the tree. Merry Christmas!",
          "Watch the sky on Christmas Eve. You might see a reindeer!",
        ]}
      />

      <PostH2>For your partner</PostH2>
      <Messages
        items={[
          "You're my favourite part of every Christmas. I love you.",
          "All I want for Christmas is more years like this one with you.",
          "Merry Christmas to the person who makes every day feel like a holiday.",
          "Thank you for the warm socks, the hot chocolate and for putting up with my Christmas music. I love you.",
          "Home is wherever you are, especially at Christmas.",
          "Our first Christmas together, and already my favourite one.",
        ]}
      />

      <PostH2>For friends</PostH2>
      <Messages
        items={[
          "Merry Christmas to a friend who feels like family.",
          "This year was better because you were in it. Merry Christmas!",
          "Wishing you a cozy Christmas and a new year full of good surprises.",
          "Let's make time for a long coffee in January. Merry Christmas!",
          "Thank you for always being there, even when I'm a mess. Love you, merry Christmas.",
          "Here's to more laughs, more walks and more late-night talks next year.",
          "I know it's been a hard year. I'm so proud of you. Merry Christmas.",
          "Distance doesn't change a thing. Thinking of you this Christmas.",
        ]}
      />

      <PostProducts slugs={["penguin-christmas-card", "winter-bird-christmas-card", "christmas-cat-card"]} />

      <PostH2>For coworkers</PostH2>
      <p>
        Keep these friendly and simple. You don&apos;t need to be funny or deep, just kind.
      </p>
      <Messages
        items={[
          "Merry Christmas! It's been a pleasure working with you this year.",
          "Thanks for all your help this year. Enjoy a well-deserved break!",
          "Wishing you and your family a happy holiday season.",
          "Merry Christmas! Thanks for making Monday mornings a little easier.",
          "Hope you get some real rest over the holidays. See you in the new year!",
          "Thank you for being such a great team member. Happy holidays!",
          "Enjoy the time off, and don't check your email!",
        ]}
      />

      <PostH2>For your boss</PostH2>
      <Messages
        items={[
          "Thank you for your support this year. Wishing you a merry Christmas and a restful break.",
          "I've learned so much from you this year. Happy holidays!",
          "Wishing you a peaceful holiday season and a great start to the new year.",
          "Thank you for leading our team with so much patience. Merry Christmas.",
        ]}
      />

      <PostH2>For neighbours, teachers and helpers</PostH2>
      <p>
        These are the people who make your year easier and rarely get a thank-you. A card means a
        lot to them.
      </p>
      <Messages
        items={[
          "Merry Christmas, neighbours! We're so glad to live next to you.",
          "Thanks for keeping an eye on our place this year. Wishing you a wonderful Christmas.",
          "Thank you for everything you do for our kids. Enjoy a well-earned break. Merry Christmas!",
          "To our wonderful teacher: thank you for your patience and kindness. Happy holidays!",
          "Thank you for bringing our mail through snow, rain and slush. Merry Christmas!",
          "Thank you for taking such good care of us this year. Wishing you a happy holiday season.",
        ]}
      />

      <PostH2>Funny Christmas card messages</PostH2>
      <Messages
        items={[
          "Merry Christmas! I got you this card. The rest of your present is my company.",
          "Wishing you a Christmas with more cookies than calories.",
          "Have a holly, jolly Christmas, and a very long nap afterwards.",
          "Merry Christmas from my couch to yours.",
          "I tried to be good this year. Santa says it was a solid effort.",
          "May your Wi-Fi be strong and your relatives be kind.",
          "Have a Meowy Christmas! (Yes, the cat made me write that.)",
        ]}
      />

      <PostH2>Religious Christmas messages</PostH2>
      <Messages
        items={[
          "May the peace and joy of Christ's birth fill your home this Christmas.",
          "Wishing you a blessed Christmas and every happiness in the new year.",
          "Praying for you and your family this Christmas. May God bless you all.",
          "May the light of the Christmas star guide you through the new year.",
          "Celebrating the gift of Jesus and grateful for the gift of you. Merry Christmas.",
        ]}
      />

      <PostH2>Happy holidays (when you&apos;re not sure)</PostH2>
      <Messages
        items={[
          "Wishing you peace, warmth and joy this holiday season.",
          "Happy holidays! May the new year bring you lots of good things.",
          "Season's greetings and warm wishes for a bright new year.",
          "Thinking of you this winter and wishing you a cozy season.",
          "May your holidays be full of light, good food and good company.",
        ]}
      />

      <PostH2>For someone who&apos;s missing someone this year</PostH2>
      <p>
        Christmas can be really hard after a loss. You don&apos;t need the perfect words. Saying
        you&apos;re thinking of them is enough.
      </p>
      <Messages
        items={[
          "Thinking of you this Christmas and holding you close in my heart.",
          "I know this season is hard. I'm here, and I'm thinking of you.",
          "Remembering your mom with you this Christmas. She made every holiday brighter.",
          "Sending you love and gentle wishes this season. You're not alone.",
        ]}
      />

      <PostH2>How to sign it</PostH2>
      <p>
        The last line is easy to overthink too. Some sign-offs that work for almost anyone:
        &ldquo;With love,&rdquo; &ldquo;Warmly,&rdquo; &ldquo;Love always,&rdquo; &ldquo;Hugs
        from all of us,&rdquo; &ldquo;Merry everything,&rdquo; &ldquo;Cheers to the new
        year,&rdquo; or just &ldquo;Love,&rdquo; and your name. For a coworker,
        &ldquo;Best wishes&rdquo; or &ldquo;All the best&rdquo; is perfect.
      </p>

      <PostH2>Send them early</PostH2>
      <p>
        Cards get slow in December, so try to get them in the mail by the first or second week of
        the month, especially if they&apos;re going overseas. Canada Post posts its holiday mailing
        dates every year, so check those before you head to the post office.
      </p>
      <p>
        And if you&apos;re still looking for cards, mine are hand-painted with watercolours, one at
        a time, so no two are exactly alike. You can find them with my other{" "}
        <InLink href="/collections/little-gifts">little gifts</InLink>. They also double as tiny
        art once Christmas is over. I know a few people who frame them.
      </p>
      <p>Happy writing, and merry Christmas.</p>
    </>
  );
}
