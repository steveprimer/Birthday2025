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
    note: "That day I knew you were special. The laughter, the talks, the magic.",
  },
  {
    date: "March 10, 2023",
    photo: "/memories/laugh-till-cry.jpg",
    caption: "The day we laughed until we cried 😂",
    note: "One of the funniest and most memorable days we’ve shared together.",
  },
  {
    date: "July 4, 2023",
    photo: "/memories/trip-mountains.jpg",
    caption: "Mountain trip getaway 🏞️",
    note: "Nature, you, and me – perfect escape to refresh our souls.",
  },
  // Add more memories...
];

export default function MemoryTimeline() {
  return (
    <section id="timelineSection" className="py-8 bg-transparent">
      <h2 className="text-4xl font-bold text-center mb-12">
        Our Memories Timeline
      </h2>

      <VerticalTimeline lineColor="#fb923c">
        {memories.map(({ date, photo, caption, note }, idx) => (
          <VerticalTimelineElement
            key={idx}
            date={date}
            contentStyle={{
              background: "rgba(255 255 255 / 0.85)",
              color: "#333",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #fb923c" }}
            iconStyle={{ background: "#fb923c", color: "#fff" }}
          >
            <h3 className="text-xl font-semibold mb-2">{caption}</h3>
            <img
              src={photo}
              alt={caption}
              className="rounded-lg mb-3 object-cover w-full max-h-60 hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <p className="text-gray-700">{note}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
      <div
        className="relative bottom-0 left-0 w-full h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(251, 146, 60, 0.9))",
        }}
      />
    </section>
  );
}
