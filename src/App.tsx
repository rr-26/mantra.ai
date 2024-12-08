import { useState, useEffect } from 'react';
import { ChapterList } from './components/ChapterList';
import { MangaViewer } from './components/MangaViewer';
import { Book, Chapter } from './types';
import { BookList } from './components/BookList';
import { apiService } from './api/manga';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const booksData = await apiService.fetchBooks();
      if (booksData.length === 0) {
        setError('No books available');
        return;
      }
      
      setBooks(booksData);
      const firstBook = await apiService.fetchBookDetails(booksData[0].id);
      setSelectedBook(firstBook);
      
      if (firstBook.chapter_ids.length > 0) {
        const firstChapter = await apiService.fetchChapterDetails(firstBook.chapter_ids[0]);
        setCurrentChapter(firstChapter);
      }
    } catch (error) {
      setError('Failed to load initial data. Please try again later.');
      console.error('Initial data load error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookSelect = async (bookId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const bookDetails = await apiService.fetchBookDetails(bookId);
      setSelectedBook(bookDetails);
      
      if (bookDetails.chapter_ids.length > 0) {
        const chapter = await apiService.fetchChapterDetails(bookDetails.chapter_ids[0]);
        setCurrentChapter(chapter);
        setCurrentPage(0);
      }
    } catch (error) {
      setError('Failed to load book. Please try again.');
      console.error('Book load error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChapterSelect = async (chapterId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const chapter = await apiService.fetchChapterDetails(chapterId);
      setCurrentChapter(chapter);
      setCurrentPage(0);
    } catch (error) {
      setError('Failed to load chapter. Please try again.');
      console.error('Chapter load error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentChapter || !selectedBook) return;
  
    try {
      if (currentPage < currentChapter.pages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        const currentChapterIndex = selectedBook.chapter_ids.indexOf(currentChapter.id);
        if (currentChapterIndex < selectedBook.chapter_ids.length - 1) {
          const nextChapter = await apiService.fetchChapterDetails(
            selectedBook.chapter_ids[currentChapterIndex + 1]
          );
          setCurrentChapter(nextChapter);
          setCurrentPage(0);
        }
      }
    } catch (error) {
      setError('Failed to load next chapter. Please try again.');
      console.error('Next page error:', error);
    }
  };

  const handlePrevPage = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentChapter || !selectedBook) return;
  
    try {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else {
        const currentChapterIndex = selectedBook.chapter_ids.indexOf(currentChapter.id);
        if (currentChapterIndex > 0) {
          const prevChapter = await apiService.fetchChapterDetails(
            selectedBook.chapter_ids[currentChapterIndex - 1]
          );
          setCurrentChapter(prevChapter);
          setCurrentPage(prevChapter.pages.length - 1);
        }
      }
    } catch (error) {
      setError('Failed to load previous chapter. Please try again.');
      console.error('Previous page error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button 
            onClick={loadInitialData}
            className="mt-4 px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full max-w-[800px] flex flex-col items-start bg-white">
          <div className="w-full flex flex-col">
            <div className="w-full flex my-4 justify-center gap-1">
              <BookList
                books={books}
                selectedBookId={selectedBook?.id || 0}
                onBookSelect={handleBookSelect}
              />
            </div>
            
            {selectedBook && (
              <div className="w-full flex justify-center mb-4">
                <ChapterList
                  chapterIds={selectedBook.chapter_ids}
                  selectedChapterId={currentChapter?.id || 0}
                  onChapterSelect={handleChapterSelect}
                />
              </div>
            )}
            
            {currentChapter && (
              <div className="w-full">
                <MangaViewer
                  currentChapter={currentChapter}
                  currentPage={currentPage}
                  onNextPage={handleNextPage}
                  onPrevPage={handlePrevPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}