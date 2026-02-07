import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useUiStore } from '@/stores/uiStore';

import MobileMenu from '@/components/client/MobileMenu';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('MobileMenu', () => {
  const links = [
    { href: '/', label: 'ホーム' },
    { href: '/about', label: 'About' },
  ];

  beforeEach(() => {
    useUiStore.setState({ isMenuOpen: false });
  });

  it('toggles the menu state via Zustand store', async () => {
    const user = userEvent.setup();
    render(<MobileMenu links={links} />);

    const button = screen.getByRole('button', { name: 'メニュー' });
    expect(screen.queryByText('ホーム')).not.toBeInTheDocument();

    await user.click(button);
    expect(screen.getByText('ホーム')).toBeVisible();

    await user.click(button);
    expect(screen.queryByText('ホーム')).not.toBeInTheDocument();
  });
});
