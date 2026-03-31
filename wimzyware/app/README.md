# Wimzyware App MVP

A React-based dashboard for managing AI-powered website agents. This MVP provides the UI shell for interacting with specialized agents (Marketing, Design, Copywriting, Frontend Dev, Backend Dev, SEO, Accessibility, QA) to make changes to web projects.

## Quick Start

```bash
npm install
npm run dev
```

The app will open at `http://localhost:3000`.

## Tech Stack

- **React 18** with functional components and hooks
- **Vite** for fast development and bundling
- **CSS** with design tokens (no CSS framework)
- **Montserrat** font via Google Fonts

## Project Structure

```
src/
  main.jsx              # Entry point
  App.jsx               # Root component, state management
  index.css             # Global styles and design tokens
  components/
    layout/             # Dashboard shell, sidebar, main panel, chat
    projects/           # Project selector
    agents/             # Agent list
    changes/            # Change request cards
    staging/            # Staging detail view
  data/                 # Mock data (agents, projects, conversations, CRs)
  services/             # Mock services (AI, project)
  hooks/                # Custom React hooks
```

## Future AWS Integration Points

- **Amazon Bedrock** - AI model calls for agent responses (`services/aiService.js`)
- **DynamoDB** - Project and change request persistence (`services/projectService.js`)
- **API Gateway** - REST API endpoints for all CRUD operations
- **S3** - Static site hosting and asset storage
- **CloudFront** - CDN distribution for deployed sites
- **Lambda** - Serverless compute for change processing and deployment

## Design Tokens

The app uses CSS custom properties defined in `src/index.css` that match the Wimzyware landing page:

- Primary: `#4F46E5` (Indigo)
- Accent: `#10B981` (Emerald)
- Background: `#FAFAFA`
- Surface: `#FFFFFF`
- Text: `#1E1E2E`
- Font: Montserrat

## Features (MVP)

- Three-column dashboard layout (sidebar, main content, chat panel)
- Project selection with type badges (Static Site / Backend App)
- 8 specialized AI agents with availability based on project type
- Change request cards with status badges and confidence scores
- Staging detail view with file list, preview link, and approve/reject actions
- Agent chat panel with mock conversation history
- Human review indicators based on project plan type
