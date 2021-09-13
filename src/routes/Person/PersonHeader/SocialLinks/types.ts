import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

export type SocialLinkItem = {
  id: string;
  href: string;
  icon: OverridableComponent<SvgIconTypeMap>;
};

export type SocialLinksMap = SocialLinkItem[];
