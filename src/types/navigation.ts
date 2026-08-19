export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

export interface NavigationConfig {
  mainNav: NavItem[];
  socialLinks: {
    instagram?: string;
    github: string;
    linkedin: string;
    email: string;
    resume?: string;
  };
}
