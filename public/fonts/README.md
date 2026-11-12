# Fonts Directory

Place the following font files in this directory:

1. **Stockport.woff2** - Heading font (Stockport)
2. **Stockport.woff** - Heading font fallback
3. **HelveticaNowMTTextRegular.woff** - Body font (regular weight)
4. **HelveticaNowMTTextBold.woff** - Body font (bold weight)

These fonts are referenced in `src/app/globals.css`.
If font files are not present, the site will gracefully fall back to:
- Headings: Georgia, 'Times New Roman', serif
- Body: 'Helvetica Neue', Helvetica, Arial, sans-serif

