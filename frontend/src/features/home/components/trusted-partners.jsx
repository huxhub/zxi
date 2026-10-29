import './home-sections.css';
import Image from 'next/image';

const PARTNERS = [
  { name: 'Braschi', image: '/partners/braschi.webp' },
  { name: 'DAMAC', image: '/partners/damac.webp' },
  { name: 'Guinness World Records', image: '/partners/guinness-world.webp' },
  { name: 'Plymarc', image: '/partners/plymarc.webp' },
  { name: 'Prestige Group', image: '/partners/prestige-group.webp' },
  { name: 'Sobha Realty', image: '/partners/sobha.webp' },
  { name: 'Tritvam', image: '/partners/tritvam.webp' },
  { name: 'Wahat Al Zaweya', image: '/partners/wahat-al-zaweya.webp' },
  { name: 'Lulie Fisher Design Studio', image: '/partners/lulie-fisher.webp' },
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
                  <Image src={partner.image} alt={isDuplicate ? '' : partner.name} fill sizes="(max-width: 767px) 160px, 220px" />
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
