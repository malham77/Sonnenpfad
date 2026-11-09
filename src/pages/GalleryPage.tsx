import React, { useState } from "react";
import { useCms, MediaItem } from "../context/CmsContext";
import { Play, X, MapPin, Maximize2, Video, Camera, Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryPageProps {
  onOpenAdmin: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenAdmin }) => {
  const { gallery } = useCms();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<MediaItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);

  const filterTabs = [
    "All",
    "Videos",
    "Photos",
    "Gorillas",
    "Wildlife",
    "East Africa",
    "Landscapes",
    "Culture",
    "Adventure"
  ];

  const filteredMedia = gallery.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Videos") return item.type === "video";
    if (activeFilter === "Photos") return item.type === "image";
    return item.category.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#171A17] text-[#F7F4EC] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#D99A00]/25 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-[#D99A00]" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#F4B41A]">
                Visual Expeditions
              </span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold text-[#F7F4EC]">
              Moments & Video Reels from East Africa
            </h1>
            <p className="text-xs sm:text-sm text-[#F7F4EC]/75 font-light mt-1">
              Immerse yourself in authentic photography and live field video captured on safari with Sonnenpfad.
            </p>
          </div>

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#073F27] hover:bg-[#0a4d30] text-[#F7F4EC] text-xs font-semibold uppercase tracking-wider border border-[#D99A00] transition-colors cursor-pointer shadow-md shrink-0"
          >
            <Plus className="w-4 h-4 text-[#F4B41A]" />
            <span>Upload Photos & Videos</span>
          </button>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#073F27] border-[#F4B41A] text-[#F4B41A] shadow-md"
                    : "bg-[#101210] border-[#D99A00]/20 text-[#F7F4EC]/70 hover:border-[#D99A00]/60 hover:text-[#F7F4EC]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item, idx) => {
            const isVideo = item.type === "video";
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isVideo) setSelectedVideo(item);
                  else setSelectedPhoto(item);
                }}
                className="group relative h-80 overflow-hidden bg-[#101210] border border-[#D99A00]/25 hover:border-[#D99A00] transition-all cursor-pointer shadow-lg flex flex-col justify-between"
              >
                {/* Media Image / Video Thumbnail */}
                <div className="absolute inset-0">
                  {isVideo ? (
                    <div className="relative w-full h-full bg-black">
                      <img
                        src={item.thumbnailUrl || item.mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80";
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>

                {/* Dark Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101210] via-black/25 to-black/30 group-hover:via-black/15 transition-colors" />

                {/* Top Badges */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <span className="text-[10px] tracking-widest font-semibold uppercase text-[#F4B41A] bg-[#073F27]/90 px-2.5 py-1 border border-[#D99A00]/30 flex items-center gap-1.5">
                    {isVideo ? <Video className="w-3 h-3 text-[#25D366]" /> : <Camera className="w-3 h-3 text-[#D99A00]" />}
                    <span>{isVideo ? "VIDEO" : "PHOTO"}</span>
                  </span>

                  {isVideo && item.videoDuration && (
                    <span className="text-[10px] font-mono text-[#F7F4EC] bg-black/70 px-2 py-0.5 border border-[#D99A00]/20">
                      {item.videoDuration}
                    </span>
                  )}
                </div>

                {/* Center Play Button for Videos */}
                {isVideo && (
                  <div className="relative z-10 self-center">
                    <div className="w-14 h-14 rounded-full bg-[#073F27]/90 text-[#F4B41A] border-2 border-[#D99A00] flex items-center justify-center group-hover:scale-115 transition-transform shadow-2xl">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                )}

                {/* Bottom Caption & Location */}
                <div className="relative z-10 p-5">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#D99A00] mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                  <h4 className="font-editorial text-xl font-bold text-[#F7F4EC] leading-snug group-hover:text-[#F4B41A] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#F7F4EC]/75 font-light line-clamp-1 mt-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-[#171A17] border border-[#D99A00]/40 p-4 sm:p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 sm:top-4 sm:right-4 z-20 w-10 h-10 bg-[#101210] text-[#F7F4EC] hover:text-[#F4B41A] border border-[#D99A00]/40 flex items-center justify-center cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-video w-full bg-black border border-[#D99A00]/20 mb-4 overflow-hidden">
                <video
                  src={selectedVideo.mediaUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#F4B41A] uppercase tracking-wider mb-1">
                    <span>{selectedVideo.category}</span>
                    <span className="text-[#D99A00]">·</span>
                    <MapPin className="w-3 h-3" />
                    <span>{selectedVideo.location}</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F7F4EC]/80 mt-1 font-light">
                    {selectedVideo.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photo Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 z-20 w-11 h-11 bg-[#171A17] text-[#F7F4EC] hover:text-[#F4B41A] border border-[#D99A00]/40 flex items-center justify-center cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.mediaUrl}
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain border border-[#D99A00]/40 shadow-2xl"
              />
              <div className="mt-4 text-center max-w-2xl px-4">
                <div className="flex items-center justify-center gap-2 text-xs text-[#F4B41A] uppercase tracking-wider mb-1">
                  <span>{selectedPhoto.category}</span>
                  <span className="text-[#D99A00]">·</span>
                  <MapPin className="w-3 h-3" />
                  <span>{selectedPhoto.location}</span>
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#F7F4EC]">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F4EC]/80 mt-1 font-light">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
