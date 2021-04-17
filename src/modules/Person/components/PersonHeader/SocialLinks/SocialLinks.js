import SocialLink from './SocialLink';
import SocialLinksContainer from './SocialLinksContainer';

const SocialLinks = ({ socialLinksMap }) => {
  const socialLinks = socialLinksMap.map(({ key, id, href, icon: Icon }) => {
    return <SocialLink key={key} href={href} id={id} Icon={Icon} />;
  });

  return <SocialLinksContainer>{socialLinks}</SocialLinksContainer>;
};

export default SocialLinks;
