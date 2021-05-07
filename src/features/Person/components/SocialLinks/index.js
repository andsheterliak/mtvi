import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import { checkIfIsData } from '~common/utils/getData';
import personTypes from '~features/Person/personTypes';

import SocialLink from './SocialLink';
import SocialLinksContainer from './SocialLinksContainer';

const createSocialLinksMap = (externalIds) => {
  if (!checkIfIsData(externalIds)) return null;

  const socialLinksMap = [];

  if (externalIds.facebook_id) {
    socialLinksMap.push({
      key: 'facebook_id',
      id: externalIds.facebook_id,
      href: 'https://www.facebook.com/',
      icon: FacebookIcon,
    });
  }

  if (externalIds.instagram_id) {
    socialLinksMap.push({
      key: 'instagram_id',
      id: externalIds.instagram_id,
      href: 'https://www.instagram.com/',
      icon: InstagramIcon,
    });
  }

  if (externalIds.twitter_id) {
    socialLinksMap.push({
      key: 'twitter_id',
      id: externalIds.twitter_id,
      href: 'https://twitter.com/',
      icon: TwitterIcon,
    });
  }

  if (!checkIfIsData(socialLinksMap)) return null;

  return socialLinksMap;
};

const SocialLinks = ({ externalIds }) => {
  const socialLinksMap = createSocialLinksMap(externalIds);

  if (!socialLinksMap) return null;

  const socialLinks = socialLinksMap.map(({ key, id, href, icon: Icon }) => {
    return <SocialLink key={key} href={href} id={id} Icon={Icon} />;
  });

  return <SocialLinksContainer>{socialLinks}</SocialLinksContainer>;
};

SocialLinks.propTypes = {
  externalIds: personTypes.externalIds,
};

export default SocialLinks;
