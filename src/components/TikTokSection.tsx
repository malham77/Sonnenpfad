import React, { useState } from "react";
import { Play, ArrowUpRight, Compass, Eye, Heart } from "lucide-react";

export const TikTokSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(2);

  const tiktokPosts = [
    {
      id: "tt-1",
      title: "Mountain Gorilla encounter in misty Bwindi canopy",
      views: "18.4K",
      likes: "2.1K",
      thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      duration: "0:42",
      tag: "#UgandaSafaris #Bwindi"
    },
    {
      id: "tt-2",
      title: "Sunrise game drive with tree-climbing lions in Ishasha",
      views: "34.2K",
      likes: "4.8K",
      thumbnail: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=80",
      duration: "0:58",
      tag: "#QueenElizabeth #Lions"
    },
    {
      id: "tt-3",
      title: "Cruising the Victoria Nile towards the thunderous Murchison Falls",
      views: "52.8K",
      likes: "7.9K",
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      duration: "1:15",
      tag: "#MurchisonFalls #RiverNile",
      isCenter: true
    },
    {
      id: "tt-4",
      title: "Chimpanzee troop calls echoing through Kibale rainforest",
      views: "22.6K",
      likes: "3.4K",
      thumbnail: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&w=600&q=80",
      duration: "0:36",
      tag: "#KibalePrimate #Chimpanzee"
    },
    {
      id: "tt-5",
      title: "Sundowners and campfire under the endless African night sky",
      views: "15.9K",
      likes: "1.9K",
      thumbnail: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
      duration: "0:49",
      tag: "#SafariStories #Sonnenpfad"
    }
  ];

  const profileUrl = "https://www.tiktok.com/@kisacathy1900?_r=1&_t=ZS-9AJFAoC3tqs";

  return (
    <section className="py-20 bg-[#101210] border-t border-[#D99A00]/25 relative overflow-hidden">
      {/* Decorative background sun path glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#073F27]/30 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-[#D99A00]" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#F4B41A]">
              Follow Our Journey
            </span>
            <span className="h-px w-6 bg-[#D99A00]" />
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F4EC] leading-tight mb-3">
            Live from the Ugandan Bush
          </h2>
          <p className="text-xs sm:text-sm text-[#F7F4EC]/75 font-light">
            Follow our field directors and travelers on TikTok at{" "}
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F4B41A] font-semibold underline underline-offset-4 hover:text-[#D99A00]"
            >
              @kisacathy1900
            </a>{" "}
            for authentic daily moments, wildlife sightings, and safari behind-the-scenes.
          </p>
        </div>

        {/* 3D Perspective Reel Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
          {tiktokPosts.map((post, index) => {
            const isSelected = activeIdx === index;
            return (
              <a
                key={post.id}
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveIdx(index)}
                className={`group relative overflow-hidden bg-[#171A17] border transition-all duration-500 flex flex-col justify-between ${
                  isSelected
                    ? "border-[#F4B41A] lg:scale-105 lg:-translate-y-2 shadow-2xl z-20"
                    : "border-[#D99A00]/25 lg:opacity-85 hover:opacity-100"
                } h-96`}
              >
                {/* Thumbnail Image */}
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Vignette / Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101210] via-black/30 to-black/40 group-hover:via-black/20 transition-colors" />

                {/* Top Badge: Account & Duration */}
                <div className="relative z-10 p-4 flex items-center justify-between text-[11px] text-[#F7F4EC]">
                  <span className="font-mono text-[#F4B41A] bg-[#073F27]/80 px-2 py-0.5 border border-[#D99A00]/40">
                    @kisacathy1900
                  </span>
                  <span className="font-mono text-[#F7F4EC]/70">{post.duration}</span>
                </div>

                {/* Center Play Button with subtle pulse */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#073F27]/90 text-[#F4B41A] border border-[#D99A00] flex items-center justify-center transition-transform duration-300 group-hover:scale-115 shadow-lg">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Title & Metrics */}
                <div className="relative z-10 p-4">
                  <div className="text-[10px] text-[#D99A00] uppercase tracking-wider mb-1">
                    {post.tag}
                  </div>
                  <h4 className="font-medium text-xs sm:text-sm text-[#F7F4EC] leading-snug line-clamp-2 mb-2 group-hover:text-[#F4B41A] transition-colors">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-[#F7F4EC]/60 pt-2 border-t border-[#D99A00]/20">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#D99A00]" />
                      {post.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-[#F4B41A]" />
                      {post.likes}
                    </span>
                    <span className="ml-auto text-[#D99A00] group-hover:translate-x-0.5 transition-transform">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Primary Social CTA */}
        <div className="mt-12 text-center">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#073F27] hover:bg-[#0a4d30] text-[#F7F4EC] text-xs font-semibold tracking-[0.2em] uppercase border border-[#D99A00] transition-all duration-300 shadow-xl group cursor-pointer"
          >
            <span>Follow on TikTok</span>
            <span className="text-[#F4B41A] font-bold">@kisacathy1900</span>
            <ArrowUpRight className="w-4 h-4 text-[#F4B41A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
