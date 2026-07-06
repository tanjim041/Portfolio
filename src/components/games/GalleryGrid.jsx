import { memo, useState } from "react";
import { X, ZoomIn } from "lucide-react";

const GalleryGrid = memo(function GalleryGrid({ gallery }) {
  const [selectedImg, setSelectedImg] = useState(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((imgUrl, index) => (
          <div
            key={index}
            onClick={() => setSelectedImg(imgUrl)}
            className="aspect-video rounded-xl overflow-hidden relative cursor-pointer group border border-border bg-card"
          >
            {/* Blur overlay on hover */}
            <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
              <span className="p-2.5 rounded-full bg-accent-primary/20 text-accent-primary border border-accent-primary/30">
                <ZoomIn className="w-5 h-5" />
              </span>
            </div>

            <img
              src={imgUrl}
              alt={`Gameplay Moment ${index + 1}`}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-card hover:bg-secondary text-text-main hover:text-accent-primary transition-colors border border-border"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-5xl max-h-[80vh] overflow-hidden rounded-xl border border-border relative bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImg}
              alt="Expanded gameplay view"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default GalleryGrid;
