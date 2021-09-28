import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Person } from '~/api/tmdb';
import { IsLoading } from '~/shared/types';
import { SocialLink } from './SocialLink';
import { SocialLinksContainer } from './SocialLinksContainer';
import { SocialLinksMap } from './types';

const createSocialLinksMap = (externalIds: Person['external_ids'] | undefined) => {
  if (!externalIds) return null;

  const socialLinksMap: SocialLinksMap = [];

  if (externalIds.facebook_id) {
    socialLinksMap.push({
      id: externalIds.facebook_id,
      href: 'https://www.facebook.com/',
      label: 'facebook',
      icon: FacebookIcon,
    });
  }

  if (externalIds.instagram_id) {
    socialLinksMap.push({
      id: externalIds.instagram_id,
      href: 'https://www.instagram.com/',
      label: 'instagram',
      icon: InstagramIcon,
    });
  }

  if (externalIds.twitter_id) {
    socialLinksMap.push({
      id: externalIds.twitter_id,
      href: 'https://twitter.com/',
      label: 'twitter',
      icon: TwitterIcon,
    });
  }

  return socialLinksMap.length === 0 ? null : socialLinksMap;
};

type Props = {
  externalIds: Person['external_ids'] | undefined;
  isLoading: IsLoading;
};

export const SocialLinks = ({ externalIds, isLoading }: Props) => {
  const socialLinksMap = createSocialLinksMap(externalIds);

  if (!isLoading && !socialLinksMap) return null;

  const socialLinks = isLoading
    ? Array(3)
        .fill('')
        .map((_, index) => {
          return <SocialLink key={index} isLoading={true} />;
        })
    : socialLinksMap!.map(({ id, href, label, icon: Icon }) => {
        return <SocialLink key={href} href={href} id={id} label={label} Icon={Icon} />;
      });

  return <SocialLinksContainer>{socialLinks}</SocialLinksContainer>;
};
