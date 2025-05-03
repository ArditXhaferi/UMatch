# UMatch Components

This directory contains reusable React components for the UMatch application.

## Navigation Component

The Navigation component provides a consistent navigation bar across the application, including:

- Logo and main navigation links
- User information
- XP points display
- User avatar with dropdown menu

### Usage

```tsx
import Navigation from '@/components/Navigation';

export default function MyPage({ auth, studentProfile }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        auth={auth} 
        studentProfile={studentProfile} 
        currentPage="home" 
      />
      
      {/* Rest of your page content */}
    </div>
  );
}
```

### Props

| Prop | Type | Description | Required |
|------|------|-------------|----------|
| auth | object | User authentication data | Yes |
| studentProfile | object | Student profile data (pass null if no profile) | No |
| currentPage | string | Current active page (values: 'home', 'universities', 'careers', 'other') | No |

### Notes

- The Navigation component handles the highlighting of the active menu item based on the `currentPage` prop.
- If `studentProfile` is provided, the XP and Avatar dropdown will be displayed.
- If no `studentProfile` is provided, only basic navigation is shown. 