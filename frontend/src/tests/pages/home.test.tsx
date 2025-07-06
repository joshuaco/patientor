import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/home';

test('Render Home page', async () => {
  render(<Home />);
  screen.debug();
});
