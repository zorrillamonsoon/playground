export const mockConversations = {
  marketing: [
    { id: 'm1', role: 'user', content: 'Can you help me craft a campaign for the spring bakery promotion?' },
    { id: 'm2', role: 'agent', content: 'Absolutely! I suggest a "Fresh Start Spring" theme. We can highlight seasonal pastries, offer a 15% early-bird discount, and run it across social + email. Want me to draft the messaging?' },
    { id: 'm3', role: 'user', content: 'Yes, focus on the email campaign first.' },
    { id: 'm4', role: 'agent', content: 'Here\'s the email outline:\n\nSubject: "Spring Has Sprung at Sunrise Bakery"\n\n1. Hero image of seasonal pastries\n2. Intro copy about new spring menu\n3. CTA: Order online with code SPRING15\n4. Footer with social links\n\nShall I generate the full copy?' },
  ],
  design: [
    { id: 'd1', role: 'user', content: 'The hero section feels outdated. Can you suggest a refresh?' },
    { id: 'd2', role: 'agent', content: 'I recommend a full-bleed hero image with an overlay gradient, large Montserrat heading, and a prominent CTA button. The current layout uses too much whitespace above the fold. Want me to create a change request?' },
    { id: 'd3', role: 'user', content: 'Go for it. Keep the warm color palette.' },
    { id: 'd4', role: 'agent', content: 'Done! I\'ve created change request "Update hero banner image" with the new design. It uses warm amber tones (#F59E0B) paired with your brand colors. Confidence score: 95%. Ready for staging review.' },
  ],
  copywriting: [
    { id: 'c1', role: 'user', content: 'The About page copy is too corporate. Make it more personal.' },
    { id: 'c2', role: 'agent', content: 'I\'ll rewrite it with a warm, first-person narrative. Something like: "We started Sunrise Bakery in our kitchen with a single sourdough recipe and a dream..." Want that tone?' },
    { id: 'c3', role: 'user', content: 'Perfect. Also mention the community involvement.' },
    { id: 'c4', role: 'agent', content: 'Updated! I\'ve woven in community touchpoints -- the farmers market origins, local ingredient sourcing, and the annual charity bake sale. The new copy is in staging for your review.' },
  ],
  frontend: [
    { id: 'f1', role: 'user', content: 'The dashboard cards need a redesign. They look flat.' },
    { id: 'f2', role: 'agent', content: 'I\'ll add subtle shadows, rounded corners (12px), and a hover lift effect. I\'ll also add status indicator dots and micro-animations. Should I keep the current grid layout?' },
    { id: 'f3', role: 'user', content: 'Yes, but make it responsive -- 3 columns on desktop, 1 on mobile.' },
    { id: 'f4', role: 'agent', content: 'Change request created: "Redesign dashboard cards". I\'ve updated DashboardCard.jsx with the new styles and added CSS Grid with responsive breakpoints. Confidence: 91%.' },
  ],
  backend: [
    { id: 'b1', role: 'user', content: 'We need user authentication for the SaaS app.' },
    { id: 'b2', role: 'agent', content: 'I\'ll set up JWT-based auth with login/register endpoints, password hashing with bcrypt, and middleware for protected routes. Should I include refresh token rotation?' },
    { id: 'b3', role: 'user', content: 'Yes, and add rate limiting on the auth endpoints.' },
    { id: 'b4', role: 'agent', content: 'Auth flow is drafted with 4 files changed. Includes rate limiting (5 attempts/15min), refresh token rotation, and secure HTTP-only cookies. Confidence: 72% -- flagged for human review due to security sensitivity.' },
  ],
  seo: [
    { id: 's1', role: 'user', content: 'My portfolio site isn\'t showing up in search results.' },
    { id: 's2', role: 'agent', content: 'I see several issues: missing meta descriptions, no Open Graph tags, and the title tags are generic. I\'ll add proper SEO metadata to all pages. Should I also generate a sitemap.xml?' },
    { id: 's3', role: 'user', content: 'Yes please, and add structured data too.' },
    { id: 's4', role: 'agent', content: 'All done! Added meta descriptions, OG tags, JSON-LD structured data for portfolio items, and a sitemap.xml. Confidence: 97%. This should significantly improve your search visibility.' },
  ],
  accessibility: [
    { id: 'a1', role: 'user', content: 'Can you audit the site for accessibility issues?' },
    { id: 'a2', role: 'agent', content: 'Running WCAG 2.1 AA audit... Found 12 issues:\n- 4 missing alt texts\n- 3 low contrast ratios\n- 2 missing form labels\n- 2 keyboard navigation gaps\n- 1 missing skip link\n\nWant me to fix these?' },
    { id: 'a3', role: 'user', content: 'Fix all of them.' },
    { id: 'a4', role: 'agent', content: 'All 12 issues addressed. Added descriptive alt texts, increased contrast ratios to 4.5:1+, added proper ARIA labels, fixed tab order, and added a skip-to-content link. Your site now passes WCAG 2.1 AA.' },
  ],
  qa: [
    { id: 'q1', role: 'user', content: 'Run a quality check on the latest changes.' },
    { id: 'q2', role: 'agent', content: 'QA report for recent changes:\n\n- Hero banner: PASS (all breakpoints tested)\n- About page copy: PASS (no broken links)\n- Auth flow: NEEDS REVIEW (edge case in token refresh)\n- Dashboard cards: PASS (responsive grid works)\n\nOne issue needs attention.' },
    { id: 'q3', role: 'user', content: 'What\'s the token refresh issue?' },
    { id: 'q4', role: 'agent', content: 'When a refresh token expires during an active session, the user gets a 500 error instead of a graceful redirect to login. I recommend adding a try-catch in the middleware and returning a 401 with a redirect hint. Want me to flag this as a bug?' },
  ],
};
