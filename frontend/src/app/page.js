import media from '../../zxi-source/images.json';
import { HomeView } from '@/features/home';
import { portfolioProjects } from '@/lib/projects';

export default function Page() {
  const image = id => {
    const item = media.find(item => item.id === id);
    if (!item) throw new Error(`Missing exported ZXI image ${id}`);
    return { src: `/zxi/${item.local_file.replaceAll('\\', '/')}`, width: item.width, height: item.height };
  };
  const projects = portfolioProjects;
  const services = [
    ['Commercial Fitouts', 'Efficient workplaces delivered from plan to handover.', 1348, 'commercial-fitouts'],
    ['Residential Interiors', 'Refined homes built with comfort and precision.', 246, 'residential-interiors'],
    ['Turnkey Contracting', 'Engineering precision, authority approvals, and delivery.', 1389, 'turnkey-contracting'],
    ['Custom Furniture', 'Bespoke pieces made for your space.', 1618, 'custom-furniture'],
  ].map(([title, description, id, slug]) => ({ title, description, image: image(id), slug }));
  const advantages = [
    {
      title: 'Bold ideas, made real',
      description: 'Tailored design and craftsmanship for distinctive spaces.',
      image: { src: '/zxi/assets/1744-living-5.webp' },
    },
    {
      title: 'Clear process. Reliable delivery',
      description: 'Defined milestones, clear updates, and no surprises.',
      image: { src: '/why-work-with-us.png' },
    },
    {
      title: 'Global vision. Local insight',
      description: 'International standards informed by local UAE expertise.',
      image: { src: '/zxi/assets/2625-samsara-dubai-interior-fitout.webp' },
    },
    {
      title: 'Built on architectural expertise',
      description: 'Engineering precision from concept to completion.',
      image: { src: '/zxi/assets/2646-zxi-residential-kitchen-design-dubai.webp' },
    },
  ];
  return <HomeView data={{
    logo: { src: '/zxi-ae-logo.png', width: 220, height: 80 }, hero: image(246), cta: image(245), projects, services, advantages,
    intro: 'Considered interiors for homes, workplaces, and hospitality spaces across the UAE.',
    faq: [
      { question: 'What services do you offer?', answer: 'Interior design, fitouts, turnkey contracting, and custom furniture.' },
      { question: 'Do you handle homes and commercial spaces?', answer: 'Yes. We work across residential, workplace, retail, and hospitality projects.' },
      { question: 'Can you manage the full project?', answer: 'Yes. We manage design, approvals, construction, and handover.' },
      { question: 'How do I start?', answer: 'Send an enquiry or call +971 565 499 766.' },
    ],
  }} />;
}
