import { getCurrentConfig } from '../config/environment';
import { Book, Chapter } from "../types";

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    const config = getCurrentConfig();
    this.baseUrl = config.baseUrl;
    this.timeout = config.timeout;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          `API request failed: ${response.statusText}`,
          response.status,
          errorData
        );
      }

      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async fetchBooks(): Promise<Book[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/books/`);
      return response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      console.error('Error fetching books:', error);
      return [];
    }
  }

  async fetchBookDetails(bookId: number): Promise<Book> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/books/${bookId}/`);
      return response.json();
    } catch (error) {
      console.error(`Error fetching book details for ID ${bookId}:`, error);
      throw error;
    }
  }

  async fetchChapterDetails(chapterId: number): Promise<Chapter> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/chapters/${chapterId}/`);
      return response.json();
    } catch (error) {
      console.error(`Error fetching chapter details for ID ${chapterId}:`, error);
      throw error;
    }
  }
}

export const apiService = new ApiService();