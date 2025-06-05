# Notion Blog Integration Example

This example demonstrates how to use Notion as a CMS for your blog posts using the `react-notion-x` and `notion-client` libraries.

## Features

- Server-side API for fetching Notion content
- Client-side rendering of Notion pages
- Dynamic routes for viewing different Notion pages
- Support for code highlighting, LaTeX equations, and more

## Getting Started

1. Install the required packages:

```bash
npm install react-notion-x notion-client notion-types
```

2. Set up a Notion integration (optional for better API access):
   - Go to https://www.notion.so/my-integrations
   - Create a new integration
   - Get your integration token
   - Share your Notion pages with the integration

3. Make your Notion pages public or use your integration token

4. Use the page ID from your Notion URL to view the page on your site

## How It Works

- `/app/blogtest/page.tsx` - The main index page showing example Notion pages
- `/app/blogtest/[pageId]/page.tsx` - Dynamic route for viewing individual Notion pages
- `/app/blogtest/api/route.ts` - API route for fetching Notion content server-side

## Customization

You can customize the appearance of the Notion content by:

1. Modifying the CSS in your global stylesheet
2. Adding custom components to the NotionRenderer (see the react-notion-x docs)
3. Using the darkMode option to toggle between light and dark themes

## Important Notes

- This is a basic implementation intended as a starting point
- For production use, consider adding caching for API responses
- You might want to add authentication for protected content
- The Notion API has rate limits, so implement proper error handling

## Resources

- [react-notion-x Documentation](https://github.com/NotionX/react-notion-x)
- [Notion API Documentation](https://developers.notion.com/)
- [Notion API Limitations](https://developers.notion.com/reference/errors)

## Examples

To see examples of how to use this integration, check the `/app/blogtest` directory and visit:

- `/blogtest` - Main index page
- `/blogtest/{your-notion-page-id}` - View a specific Notion page 