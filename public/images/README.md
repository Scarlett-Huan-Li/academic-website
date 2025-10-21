# Image Management Guide

This guide explains how to add and manage images on your academic website.

## Folder Structure

```
public/images/
├── profile/          # Your personal photos (headshots, professional photos)
├── publications/     # Figures, charts, and images from your publications
└── research/         # Research-related images (lab photos, fieldwork, equipment)
```

## How to Add Images

### Step 1: Prepare Your Images

**Recommended Image Specifications:**
- **Profile Photo**: 400x400px to 800x800px, JPEG or PNG
- **Publication Figures**: Original size, maintain aspect ratio
- **Research Photos**: Max 1920px width for web performance

**Optimization Tips:**
- Use JPEG for photos (smaller file size)
- Use PNG for diagrams, charts, screenshots (better quality)
- Compress images before uploading (use tools like TinyPNG.com)
- Keep individual images under 500KB when possible

### Step 2: Upload Images to Correct Folder

1. **For Profile Photo:**
   - Place in `public/images/profile/`
   - Recommended name: `profile.jpg` or `headshot.jpg`

2. **For Publication Figures:**
   - Place in `public/images/publications/`
   - Use descriptive names: `lake-temperature-analysis-2024.png`

3. **For Research Photos:**
   - Place in `public/images/research/`
   - Use descriptive names: `fieldwork-balaton-2023.jpg`

### Step 3: Reference Images in Your Pages

**In Astro files (.astro), use the path from the public folder:**

```html
<!-- Profile photo -->
<img src="/images/profile/profile.jpg" alt="Huan Li" />

<!-- Publication figure -->
<img src="/images/publications/figure-1-snow-depth.png" alt="Snow depth analysis" />

<!-- Research photo -->
<img src="/images/research/balaton-fieldwork.jpg" alt="Fieldwork at Lake Balaton" />
```

**Important:** Always start paths with `/` (from public root), not `../`

## Examples by Page

### Homepage / About Section
- Add your professional headshot
- File: `public/images/profile/profile.jpg`
- Usage: See `src/pages/index.astro`

### Publications Page
- Add figures from your papers
- Files: `public/images/publications/paper-name-fig1.png`
- Usage: See `src/pages/publications.astro`

### Research Page
- Add photos of your research activities
- Files: `public/images/research/project-name.jpg`
- Usage: See `src/pages/research.astro`

## Image Best Practices

1. **Alt Text**: Always provide descriptive alt text for accessibility
   ```html
   <img src="/images/profile/profile.jpg" alt="Dr. Huan Li at Lake Balaton" />
   ```

2. **Responsive Images**: Images automatically scale to fit containers with CSS

3. **File Naming**:
   - Use lowercase
   - Use hyphens instead of spaces
   - Be descriptive: `lake-balaton-temperature-2024.jpg`
   - NOT: `IMG_1234.jpg` or `Photo 1.jpg`

4. **Copyright**: Only use images you have rights to use

## Quick Start Checklist

- [ ] Prepare and optimize your images
- [ ] Upload to appropriate folder in `public/images/`
- [ ] Note the exact filename
- [ ] Add `<img>` tag to your page with correct path
- [ ] Include descriptive alt text
- [ ] Test locally: `npm run dev`
- [ ] Build and deploy: `npm run build`

## Need Help?

- Image not showing? Check:
  1. Path starts with `/images/...`
  2. Filename matches exactly (case-sensitive)
  3. Image file is in `public/images/` folder
  4. You rebuilt the site after adding images

## Advanced: Using Astro's Image Component

For better performance, you can use Astro's built-in image optimization:

```astro
---
import { Image } from 'astro:assets';
import profilePhoto from '../assets/profile.jpg'; // Note: assets folder, not public
---

<Image src={profilePhoto} alt="Huan Li" width={400} height={400} />
```

This automatically optimizes images, but requires images in `src/assets/` instead of `public/`.
