import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from '../pages/Login';

test('renderiza botão de login', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
});
