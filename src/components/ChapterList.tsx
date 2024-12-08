interface ChapterListProps {
  chapterIds: number[];
  selectedChapterId: number;
  onChapterSelect: (chapterId: number) => void;
}

export const ChapterList = ({ 
  chapterIds, 
  selectedChapterId, 
  onChapterSelect 
}: ChapterListProps) => {
  return (
    <div className="inline-flex gap-1 justify-center">
      {chapterIds.map((chapterId, index) => (
        <button
          key={chapterId}
          onClick={() => onChapterSelect(chapterId)}
          className={`
            w-8 h-8 
            flex items-center justify-center 
            text-sm 
            border 
            transition-colors
            ${
              selectedChapterId === chapterId
                ? 'bg-teal-700 text-white border-teal-900'
                : 'bg-white hover:bg-gray-100 text-gray-800 border-gray-600'
            }
          `}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};