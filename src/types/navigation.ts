export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

export interface NavigationConfig {
  mainNav: NavItem[];
  socialLinks: {
    github: string;
    twitter?: string;
    linkedin: string;
    email: string;
  };
}
