import './home-sections.css';
import Image from 'next/image';

const PARTNERS = [
  { name: 'DAMAC', image: '/partners/damac.webp', scale: 1.22 },
  { name: 'Sobha Realty', image: '/partners/sobha.webp', scale: 1.18 },
  { name: 'Plug Media', image: '/partners/plug-media.webp', scale: 1.18 },
  { name: 'Braschi', image: '/partners/braschi.webp' },
  { name: 'Ikigai Studio', image: '/partners/ikigai.webp', scale: 1.14 },
  { name: 'Samsara Tribe', image: '/partners/samsara-tribe.webp', scale: 1.2 },
  { name: 'Gemma Fine Jewelry', image: '/partners/gemma.webp' },
  { name: 'NÓRA', image: '/partners/nora.webp', scale: 1.25 },
  { name: 'The Bread Basket', image: '/partners/bread-basket.webp' },
  { name: 'Calicut Notebook', image: '/partners/calicut-notebook.webp', scale: 1.75 },
  { name: 'Prestige Group', image: '/partners/prestige-group.webp', scale: 1.12 },
  { name: 'Guinness World Records', image: '/partners/guinness-world.webp', scale: 1.08 },
  { name: 'Lulie Fisher Design Studio', image: '/partners/lulie-fisher.webp', scale: 1.12 },
  { name: 'Wahat Al Zaweya', image: '/partners/wahat-al-zaweya.webp', scale: 1.12 },
  { name: 'Tritvam', image: '/partners/tritvam.webp', scale: 1.5 },
];

export function TrustedPartners() {
  return (
    <section className="trusted-partners" aria-labelledby="trusted-partners-heading">
      <div className="trusted-partners__heading">
        <div>
          <p className="trusted-partners__eyebrow">Trusted partners</p>
          <h2 id="trusted-partners-heading">Trusted by leaders.</h2>
        </div>
        <p className="trusted-partners__intro">The brands and teams we have worked alongside.</p>
      </div>
      <div className="trusted-partners__viewport">
        <div className="trusted-partners__rail">
          {[false, true].map((isDuplicate) => (
            <div className="trusted-partners__set" role={isDuplicate ? undefined : 'list'} aria-hidden={isDuplicate || undefined} key={String(isDuplicate)}>
              {PARTNERS.map((partner) => (
                <div className="trusted-partners__logo" role={isDuplicate ? undefined : 'listitem'} key={partner.name}>
                  <Image
                    src={partner.image}
                    alt={isDuplicate ? '' : partner.name}
                    fill
                    sizes="(max-width: 767px) 160px, 220px"
                    style={{ '--partner-logo-scale': partner.scale || 1 }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedPartners;
