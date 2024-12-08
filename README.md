# Manga Reader Application

A modern web application for reading manga online, built with React, TypeScript, and Vite. The application features a clean, responsive interface with support for multiple books and chapters.

## Features

- Browse multiple manga books
- Chapter navigation
- Page-by-page reading
- Responsive design
- Touch/click navigation
- Automatic chapter progression
- Book list and chapter selection

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- REST API Integration

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd manga-reader
```

2. Install dependencies:
```bash
npm install
```

3. Create environment files:

Create a `.env` file in the root directory:
```env
VITE_API_URL=http://52.195.171.228:8080
```

## Development

To start the development server:
```bash
npm run dev
```

The application will start on port 3000: [http://localhost:3000](http://localhost:3000)

## Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
manga-reader/
├── src/
│   ├── components/
│   │   ├── BookList.tsx
│   │   ├── ChapterList.tsx
│   │   └── MangaViewer.tsx
│   ├── services/
│   │   └── api.ts
│   ├── config/
│   │   └── environment.ts
│   ├── types/
│   │   └── index.ts
│   └── App.tsx
├── public/
├── index.html
└── vite.config.ts
```

## API Integration

The application integrates with a backend API with the following endpoints:

- `/books/` - Get all available books
- `/books/{id}/` - Get specific book details
- `/chapters/{id}/` - Get chapter details and pages

## Component Overview

### BookList
- Displays available manga books
- Handles book selection
- Shows currently selected book

### ChapterList
- Shows available chapters for selected book
- Handles chapter navigation
- Indicates current chapter

### MangaViewer
- Displays manga pages
- Handles page navigation
- Supports next/previous page navigation
- Automatic chapter progression

## Configuration

The application uses environment variables for configuration:
- `VITE_API_URL`: API base URL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Error Handling

The application includes comprehensive error handling for:
- Failed API requests
- Network issues
- Loading states
- Invalid data

## Known Issues

- Images may take time to load depending on network speed
- API rate limiting may affect performance

## Future Improvements

- Add image preloading for smoother page transitions
- Implement offline support
- Add user preferences storage
- Improve mobile touch gestures
- Add keyboard navigation support

## License

[Your chosen license]