interface NavLink {
  path: string;
  label: string;
  isDropdown?: boolean;
  dropdownItems?: Array<{
    path: string;
    label: string;
    onClick?: () => void;
  }>;
}

export const navLinks: NavLink[] = [
  { path: '/', label: 'Discover' },
  { path: '/publications', label: 'Publications' },
  { path: '/login', label: 'Log In' },
  { path: '/signup', label: 'Sign Up' },
  { path: '/collaboration', label: 'Collaboration' },
  { path: '/profile', label: 'Profile' }
];