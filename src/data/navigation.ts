export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const mainNavItems: NavItem[] = [
  { id: "nav-home", label: "Home", href: "/" },
  { id: "nav-about", label: "About", href: "/about" },
  { id: "nav-courses", label: "Courses", href: "/courses" },
  { id: "nav-careers", label: "Careers", href: "/careers" },
  { id: "nav-contact", label: "Contact", href: "/contact" },
  { id: "nav-faq", label: "Blog", href: "/blog" },
];
