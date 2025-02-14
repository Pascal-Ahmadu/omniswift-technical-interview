# omniswift-technical-interview

A comprehensive React-based student management system showcasing modern development practices, Material-UI implementation, and PDF generation capabilities. Built as a technical interview project for Omniswift.

## ⚡ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation
1. Clone the repository
```bash
git clone https://github.com/Pascal-Ahmadu/omniswift-technical-interview.git
cd omniswift-technical-interview
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in the root directory
```env
VITE_API_BASE_URL=your_api_endpoint
```

4. Start development server
```bash
npm run dev
```

## 🚀 Features

### Student Data Management
- Interactive data table with sorting capabilities
- Real-time student data filtering
- Responsive design for all screen sizes
- Loading states and error handling

### PDF Generation
- Download student results as PDF
- Professional PDF formatting
- Custom result template
- High-quality output

### Advanced Filtering
- Multi-criteria filtering system
- Age, State, Level, and Gender filters
- Real-time filter updates
- Toast notifications for user feedback

## 🛠 Tech Stack

### Core Technologies
- React 19
- Vite
- Material-UI v6
- Axios

### PDF Generation
- html2canvas
- jsPDF

### UI/UX
- React-Toastify
- Emotion/Styled Components
- SimpleBar for custom scrollbars

## 📁 Project Structure
```
src/
├── components/
│   ├── StudentTable/
│   ├── filtersForm/
│   └── Layout/
├── hooks/
├── api/
└── theme/
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🌐 API Integration

The application integrates with a backend API providing endpoints for:
- Student data retrieval
- Filtering operations
- Result generation
- PDF downloads

## 🎨 Features Demonstrated

- Custom hooks implementation
- Component composition
- State management
- Error handling
- Loading states
- Responsive design
- API integration
- PDF generation
- Toast notifications

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint-based styling
- Fluid typography
- Adaptive layouts

## 🔍 Error Handling

- Comprehensive error states
- User-friendly error messages
- Loading indicators
- Fallback UI components

## 🚀 Performance Considerations

- Optimized PDF generation
- Efficient data filtering
- Lazy loading where appropriate
- Memoized components

## 📋 Interview Challenge Requirements

- [x] Implement student data management
- [x] Create PDF generation system
- [x] Build filtering mechanism
- [x] Handle errors appropriately
- [x] Ensure responsive design
- [x] Follow best practices
- [x] Maintain clean code structure

## ⚙️ Environment Variables

Required environment variables:
```env
VITE_API_BASE_URL= backend url
```

---

Made with ❤️ for Omniswift Technical Interview
