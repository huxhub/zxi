import media from '../../zxi-source/images.json';
import { HomeView } from '@/features/home';
import { portfolioProjects } from '@/lib/projects';

export const metadata = {
  title: 'Dubai Interior Design, Fit-Out & Turnkey Contractor',
  description: 'Dubai interior design and fit-out specialists for offices, villas, retail, restaurants, hospitality and bespoke joinery. Discover ZXI projects and request a consultation.',
};

export default function Page() {
  const image = id => {
    const item = media.find(item => item.id === id);
    if (!item) throw new Error(`Missing exported ZXI image ${id}`);
    return { src: `/zxi/${item.local_file.replaceAll('\\', '/')}`, width: item.width, height: item.height };
  };
  const projects = portfolioProjects;
  const services = [
    ['Commercial Fitouts', 'Efficient workplaces delivered from plan to handover.', 1348, 'commercial-fitouts'],
    ['Residential Interiors', 'Refined homes built with comfort and precision.', 'residential-interiors-home', 'residential-interiors'],
    ['Turnkey Contracting', 'Engineering precision, authority approvals, and delivery.', 'turnkey-contracting-home', 'turnkey-contracting'],
    ['Custom Furniture', 'Bespoke pieces made for your space.', 'custom-furniture-home', 'custom-furniture'],
    ['Hospitality & Wellness', 'Immersive dining, hospitality, and wellness environments.', 'hospitality-wellness-home', 'hospitality-wellness'],
  ].map(([title, description, id, slug]) => ({
    title,
    description,
    image: {
      'turnkey-contracting-home': { src: '/home/turnkey-contracting-home.png', width: 1024, height: 1536 },
      'custom-furniture-home': { src: '/home/custom-furniture-home-v3.png', width: 1024, height: 1536 },
      'hospitality-wellness-home': { src: '/home/hospitality-wellness-home-v2.png', width: 1024, height: 1536 },
      'residential-interiors-home': { src: '/home/residential-interiors-home.webp', width: 1024, height: 1536 },
    }[id] || image(id),
    slug,
  }));
  const advantages = [
    {
      title: 'Bold ideas, made real',
      description: 'Tailored design and craftsmanship for distinctive spaces.',
      image: { src: '/why-us/why-us-bold-ideas.webp' },
    },
    {
      title: 'Clear process. Reliable delivery',
      description: 'Defined milestones, clear updates, and no surprises.',
      image: { src: '/why-us/why-us-clear-process.webp' },
    },
    {
      title: 'Global vision. Local insight',
      description: 'International standards informed by local UAE expertise.',
      image: { src: '/why-us/why-us-global-vision.webp' },
    },
    {
      title: 'Built on architectural expertise',
      description: 'Engineering precision from concept to completion.',
      image: { src: '/why-us/why-us-architectural-expertise.webp' },
    },
  ];
  const faq = [
    { question: 'What services do you offer?', answer: 'Interior design, fitouts, turnkey contracting, and custom furniture.' },
    { question: 'Do you handle homes and commercial spaces?', answer: 'Yes. We work across residential, workplace, retail, and hospitality projects.' },
    { question: 'Can you manage the full project?', answer: 'Yes. We manage design, approvals, construction, and handover.' },
    { question: 'How do I start?', answer: 'Send an enquiry or call +971 565 499 766.' },
  ];
  const homepageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': 'https://zxi.ae/#webpage', url: 'https://zxi.ae', name: 'Dubai Interior Design, Fit-Out & Turnkey Contractor | ZXI', description: 'Dubai interior design, fit-out and turnkey contracting by ZXI Interiors & Contracting.', inLanguage: 'en-AE', about: { '@id': 'https://zxi.ae/#organization' } },
      { '@type': 'FAQPage', mainEntity: faq.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    ],
  };
  return <>
    <HomeView data={{
    logo: { src: '/zxi_dubailogo_black.svg', width: 220, height: 80 }, hero: image(246), cta: image(245), projects, services, advantages,
    intro: 'Considered interiors for homes, workplaces, and hospitality spaces across the UAE.',
    faq,
  }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }} />
  </>;
}
