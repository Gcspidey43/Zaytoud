# Zaytoud - Pakistan's First Perfumed Hair Serum

This is a Next.js application for Zaytoud, Pakistan's first premium perfumed hair serum with natural oils and therapeutic scents.

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- Prisma (for database handling)
- shadcn/ui components

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

If you need to set up environment variables, create a `.env.local` file in the root directory and add your variables:

```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Deployment to Cloudflare Pages

This project is configured for deployment to Cloudflare Pages through GitHub integration. Follow these steps:

1. **Connect your GitHub repository** to Cloudflare Pages
2. **Set build configuration:**
   - Build command: `npm run cf-build`
   - Root directory: `/`
3. **Environment variables (if needed):**
   - NODE_VERSION: `20`

The project includes:
- `_routes.json` - for defining edge routing rules
- `wrangler.toml` - Cloudflare Workers configuration
- Additional build scripts in package.json optimized for Cloudflare Pages

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## Deployed on Cloudflare Pages

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/)