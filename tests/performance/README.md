# Performance Testing Guide

## Running Performance Tests

### Option 1: Using Lighthouse CLI (Recommended)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Run Lighthouse in a new terminal:**
   ```bash
   npx lighthouse http://localhost:3000 --view
   ```

   This will:
   - Test performance, accessibility, SEO, and best practices
   - Generate an HTML report
   - Open the report automatically in your browser

3. **For deployed site:**
   ```bash
   npx lighthouse https://your-vercel-url.vercel.app --view
   ```

---

### Option 2: Using Chrome DevTools

1. Open the site in Chrome
2. Press `F12` to open DevTools
3. Go to the **"Lighthouse"** tab
4. Select categories to test:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
5. Click **"Analyze page load"**
6. View the report with scores and recommendations

---

### Option 3: Using the Node Script

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Run the test script (in another terminal):**
   ```bash
   npm run test:performance
   ```

3. **View the report:**
   - Report saved to: `tests/performance/lighthouse-report.html`
   - Open it in your browser

---

## Understanding Lighthouse Scores

### Score Ranges:
- **90-100**: Good (Green)
- **50-89**: Needs Improvement (Orange)
- **0-49**: Poor (Red)

### Categories Tested:

#### 1. **Performance** (Speed & Load Time)
Measures:
- First Contentful Paint
- Largest Contentful Paint
- Time to Interactive
- Speed Index
- Total Blocking Time
- Cumulative Layout Shift

#### 2. **Accessibility**
Checks:
- Color contrast
- ARIA attributes
- Form labels
- Image alt text
- Keyboard navigation

#### 3. **Best Practices**
Validates:
- HTTPS usage
- Console errors
- Image aspect ratios
- Browser compatibility

#### 4. **SEO**
Reviews:
- Meta tags
- Mobile-friendly design
- Structured data
- Link descriptions

---

## Expected Performance Results

### Shutterly Performance Benchmarks:

**Good Scores (Target):**
- Performance: 85-100
- Accessibility: 90-100
- Best Practices: 90-100
- SEO: 85-100

**Common Issues & Fixes:**

1. **Image Size** → Compress images before upload
2. **Unused JavaScript** → Code splitting (future enhancement)
3. **Missing Alt Text** → Add alt attributes to all images
4. **No Service Worker** → PWA enhancement (optional)

---

## Performance Tips

### For Users:
- Upload compressed images (< 5MB)
- Use modern image formats (WebP)
- Clear browser cache if site feels slow

### For Developers:
- Lazy load images
- Minimize bundle size
- Use CDN for static assets
- Enable caching
- Optimize images with next-gen formats

---

## Generating Reports for Professor

### Create a Performance Report:

```bash
# Test local site
npx lighthouse http://localhost:3000 --output html --output-path performance-report.html

# Test deployed site
npx lighthouse https://your-vercel-url.vercel.app --output html --output-path performance-report-production.html
```

Submit the generated HTML file with your assignment!

---

## Troubleshooting

**Server not running?**
- Make sure `npm run dev` is running first

**Lighthouse not found?**
- Install globally: `npm install -g lighthouse`
- Or use npx: `npx lighthouse`

**Port already in use?**
- Change port in vite.config.ts
- Or test the deployed version instead

---

## Additional Tools

### Other Performance Testing Tools:

1. **WebPageTest**: https://www.webpagetest.org
2. **GTmetrix**: https://gtmetrix.com
3. **PageSpeed Insights**: https://pagespeed.web.dev

---

**Last Updated:** November 2025
