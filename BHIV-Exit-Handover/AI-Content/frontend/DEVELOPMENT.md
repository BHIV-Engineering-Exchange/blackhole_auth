# Frontend Development Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit http://localhost:3000

### 3. Test with Demo Account
- Username: `demo`
- Password: `demo1234`

## Development Workflow

### Making Changes

1. **Modify Components**: Edit files in `src/components/`
2. **Update Pages**: Edit files in `src/pages/`
3. **Change Styles**: Modify Tailwind classes or `src/index.css`
4. **Hot Reload**: Changes auto-reload in browser

### Adding New Features

1. **Create Component**: Add new file in `src/components/`
2. **Import Component**: Use in pages or other components
3. **Style Component**: Use Tailwind utility classes
4. **Test Component**: Verify in browser

### API Integration

All API calls go through `src/services/api.ts`:

```typescript
import { contentAPI, authAPI } from '../services/api'

// Upload file
const response = await contentAPI.uploadFile(file)

// Login
const token = await authAPI.login({ username, password })
```

## Common Tasks

### Change API URL
Edit `.env`:
```env
VITE_API_URL=http://your-backend-url:port
```

### Add New Route
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`:
```typescript
<Route path="/new-page" element={<NewPage />} />
```

### Add Dark Mode Classes
Use `dark:` prefix:
```html
<div className="bg-white dark:bg-gray-900">
```

### Create Custom Button
```typescript
<button className="btn btn-primary">
  Click Me
</button>
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.ts or:
npm run dev -- --port 3001
```

### API Connection Failed
1. Check backend is running
2. Verify VITE_API_URL in `.env`
3. Check browser console for CORS errors

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

### Build
```bash
npm run build
```

### Preview Build Locally
```bash
npm run preview
```

### Deploy
Upload `dist` folder to your hosting service (Vercel, Netlify, etc.)

### Environment Variables
Set `VITE_API_URL` in your hosting service's environment variables.

## Code Style

### TypeScript
- Use interfaces for props
- Define types for API responses
- Avoid `any` type

### Components
- One component per file
- Props at top of file
- Export as default

### Naming
- Components: PascalCase (`MyComponent.tsx`)
- Functions: camelCase (`handleClick`)
- Constants: UPPER_SNAKE_CASE (`API_URL`)

## Useful Commands

```bash
# Install new package
npm install package-name

# Remove package
npm uninstall package-name

# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Format code (if prettier installed)
npm run format
```

## Need Help?

1. Check README.md for full documentation
2. Review component code in `src/components/`
3. Look at API integration in `src/services/api.ts`
4. Check backend API documentation

Happy coding! 🚀
