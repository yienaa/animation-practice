import { fetchHtml } from '../utils/fetch.js';

export async function createGradientBorderElement() {
  try {
    const html = await fetchHtml('./src/gradient-border/gradient-border.html');
    return html;
  } catch {
    return 'Failed to load gradient border';
  }
}