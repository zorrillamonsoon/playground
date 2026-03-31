# Wimzyware Architecture Notes

## Development Approach

Local-first development, designed for future AWS deployment. The MVP runs entirely locally with mock data, then incrementally migrates to cloud services.

## MVP Architecture

- **Landing Page** — Plain HTML/CSS/JS, deployed as a static site.
- **App** — React frontend + lightweight local API with mock data layer.

## Future AWS Service Mapping

| Concern              | AWS Service                              |
|----------------------|------------------------------------------|
| Auth                 | Cognito                                  |
| AI                   | Bedrock                                  |
| API                  | API Gateway + Lambda                     |
| Data                 | DynamoDB                                 |
| Assets / Static      | S3 + CloudFront                          |
| Staging Previews     | Isolated S3/CloudFront or Amplify Previews |
| Billing              | Stripe (external)                        |

## Project Types

Each project type has different capabilities, permissions, and pricing:

- **Static Site** — HTML/CSS/JS only, simple deploy pipeline, frontend agents only.
- **Dynamic Site** — Server-rendered or CMS-backed, includes backend agent access.
- **Backend App** — API or service project, no frontend deploy, backend-focused agents.
- **Full Stack Product** — Combined frontend + backend, full agent roster, most complex pipeline.
