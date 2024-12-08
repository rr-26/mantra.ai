import { useState, useEffect, useRef } from 'react';
import { Chapter } from "../types";

interface MangaViewerProps {
  currentChapter: Chapter;
  currentPage: number;
  onNextPage: (e: React.MouseEvent) => void;
  onPrevPage: (e: React.MouseEvent) => void;
}

export const MangaViewer = ({
  currentChapter,
  currentPage,
  onNextPage,
  onPrevPage,
}: MangaViewerProps) => {
  const [imageHeight, setImageHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const windowHeight = window.innerHeight;
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const availableHeight = windowHeight - containerTop - 40;
        setImageHeight(availableHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const currentImage = currentChapter.pages[currentPage].image;
  
  return (
    <div className="w-full flex flex-col items-center" ref={containerRef}>
      <div 
        className="relative w-full max-w-3xl flex justify-center bg-white"
        style={{ height: `${imageHeight}px` }}
      >
        <div className="relative w-full h-full px-4 py-2 flex justify-center">
          <img
            src={currentImage.file}
            alt={`Page ${currentPage + 1}`}
            className="h-full object-contain"
            style={{
              maxWidth: '100%',
              width: 'auto'
            }}
          />
          <div
            className="absolute top-2 left-4 w-1/2 h-[calc(100%-16px)] cursor-pointer"
            onClick={onNextPage}
          />
          <div
            className="absolute top-2 right-4 w-1/2 h-[calc(100%-16px)] cursor-pointer"
            onClick={onPrevPage}
          />
        </div>
      </div>
      <div className="mt-2 mb-2 text-gray-600 text-sm">
        {currentPage + 1} / {currentChapter.pages.length}
      </div>
    </div>
  );
};