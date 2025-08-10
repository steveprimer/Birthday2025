import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const memories = [
  {
    date: "March 14, 2024",
    photo: "/memories/first-date.jpg",
    caption: "Our first date ❤️",
    note: "I remember you were acting so mature that day. Look at you now :)",
  },
  {
    date: "March 29, 2024",
    photo: "/memories/first-kiss.jpg",
    caption: "Our first kiss ",
    note: "I remember i was so worried abt whats gonna happen, but you clearly weren't.",
  },
  {
    date: "April 10, 2024",
    photo: "/memories/second-date.jpg",
    caption: "Our second date ",
    note: "You told me things about yourself, I'm glad you're much better now(thanks to me).",
  },
  {
    date: "May 24, 2024",
    photo: "/memories/ily.jpg",
    caption: "Our first ILoveYou ❤️",
    note: "I swear you made me say it. But im glad i did :)",
  },
  {
    date: "July 9, 2024",
    photo: "/memories/museum.jpg",
    caption: "Museum Adventure ",
    note: "All i remember is your Aura Loss from falling.",
  },
  {
    date: "",
    photo: "/memories/diwali-w-u.jpg",
    caption: "Our first Diwali Together",
    note: "We look so happy :)",
  },
  {
    date: "February 5, 2025",
    photo: "/memories/winter-dayout.jpg",
    caption: "My Birthday Winter Dayout",
    note: "You gave me so many gifts, thankyou so much.",
  },
  {
    date: "March 14, 2025",
    photo: "/memories/first-date-recreate.jpg",
    caption: "Recreating Our First Date ❤️",
    note: "Celebrating another year of love and laughter with you by my side.",
  },
];

export default function MemoryTimeline() {
  return (
    <section
      id="timelineSection"
      className="py-8 bg-gradient-to-b from-pink-50 via-pink-100 to-pink-200 "
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-pink-800">
        Our Memories Timeline
      </h2>

      <VerticalTimeline lineColor="#f472b6">
        {memories.map(({ date, photo, caption, note }, idx) => (
          <VerticalTimelineElement
            key={idx}
            date={date}
            contentStyle={{
              background: "rgba(255 240 245 / 0.9)", // light pink with transparency
              color: "#6b2135", // dark pink/maroon text
              boxShadow: "0 6px 18px rgba(219, 39, 119, 0.3)", // subtle pink shadow
            }}
            contentArrowStyle={{ borderRight: "7px solid  #f472b6" }}
            iconStyle={{ background: "#f472b6", color: "#fff" }}
          >
            <h3 className="text-xl font-semibold mb-2 text-pink-700">
              {caption}
            </h3>
            <img
              src={photo}
              alt={caption}
              className="rounded-lg mb-3 object-cover w-full max-h-60 hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <p className="text-pink-800">{note}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>

      <div
        className="relative bottom-0 left-0 w-full h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(244, 114, 182, 0.85))",
        }}
      />
    </section>
  );
}
