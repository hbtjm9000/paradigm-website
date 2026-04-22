import matter from 'gray-matter';
import { marked } from 'marked';

export interface ContentMeta {
  title: string;
  description?: string;
  template?: 'page' | 'landing' | 'post';
  status?: 'published' | 'draft' | 'archived';
  priority?: number;
  author?: string;
  date?: string;
  tags?: string[];
  cta?: 'contact' | 'consultation' | 'none';
  og_image?: string;
  icon?: string;
  slug?: string;
  [key: string]: unknown;
}

export interface Content extends ContentMeta {
  slug: string;
  content: string;
  html?: string;
}

export async function loadMarkdownContent(filePath: string): Promise<Content> {
  try {
    const response = await fetch(filePath);
    const text = await response.text();
    const { data, content } = matter(text);
    
    return {
      ...data,
      slug: filePath.split('/').pop()?.replace('.md', '') || '',
      content,
      html: marked(content) as string,
    };
  } catch (error) {
    console.error(`Error loading content from ${filePath}:`, error);
    throw error;
  }
}

export function getServices(): Content[] {
  const services = [
    {
      title: 'Digital Transformation',
      description: 'Modernize your business with cloud solutions, process automation, and digital workflows tailored for Caribbean businesses.',
      icon: 'digital-transformation',
      slug: 'digital-transformation',
    },
    {
      title: 'AI & IT Consulting',
      description: 'Expert guidance on AI integration, technology strategy, and IT infrastructure for competitive advantage.',
      icon: 'consulting',
      slug: 'consulting',
    },
    {
      title: 'Managed Services',
      description: 'SLA-backed IT support, security monitoring, and proactive maintenance to keep your business running.',
      icon: 'managed-services',
      slug: 'managed-services',
    },
  ];
  
  return services as unknown as Content[];
}
