# Meaningful Ideas — Conscious Parenting Website

A static website for Meaningful Ideas, featuring Non-Coercive, Collaborative Parenting (NCCP) resources, courses, and blog content by Vivek Patel.

## Pages

- **Home** (`index.html`) — Main landing page with philosophy, courses overview, and CTA
- **Courses** (`courses.html`) — Overview of all courses including free and paid options
- **Free Course** (`free-course.html`) — Landing page for "Guiding Without Controlling" free course
- **Maximum Change** (`maximum-change.html`) — Landing page for the "Maximum Change, Minimum Shame" paid course
- **Blog** (`blog.html`) — Blog listing with article previews
- **Blog Articles** (`blog/`) — Individual blog posts
- **Membership** (`membership.html`) — NCCP Empowerment Group membership page
- **Contact** (`contact.html`) — Contact form and social links
- **Legal** — Terms, Privacy, and Cookie policies

## Design

- **Color scheme**: Soothing forest greens, sage, cream, and terracotta
- **Typography**: Lora (serif) for headings, Nunito (sans-serif) for body
- **Fully responsive** with mobile navigation
- **Accessible** with semantic HTML and ARIA labels
- **Animations**: Scroll-reveal effects, floating elements, gradient shifts, shimmer buttons, and interactive card hovers
- **Navbar**: Sticky with backdrop blur, scroll shrink effect, and animated mobile hamburger menu
- **Parallax**: Subtle parallax on the quote section (desktop only)
- **Reduced motion**: Respects `prefers-reduced-motion` accessibility setting

## Testing

The site uses Playwright for end-to-end testing across desktop (1440×900) and mobile (390×844) viewports.

Run tests:
```
npm test
```

Tests verify:
- All 13 pages load without JS errors
- No horizontal overflow on mobile
- Mobile menu toggle works correctly
- Course CTAs link to the correct enrollment pages
- All key sections render on each page

## Deployment

This is a static site — simply deploy the contents to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

## Course Links

- Free Course: https://meaningfulideas.newzenler.com/fp/guiding-without-controlling-free-course
- Paid Course: https://meaningfulideas.newzenler.com/courses/maximum-change/
- Membership: https://www.meaningfulideas.com/courses/meaningful-ideas-membership