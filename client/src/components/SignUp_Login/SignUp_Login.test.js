/* eslint-disable react/jsx-pascal-case */
import { render, screen } from '@testing-library/react';
import SignUp_Login from './SignUp_Login';
import { MemoryRouter } from 'react-router-dom';

test("on initial render, sign in button should be disabled'", () => {
  render(
    <MemoryRouter>
      <SignUp_Login />
    </MemoryRouter>
  );
  expect(screen.getByText('Create account')).toBeDisabled();
  expect(screen.getByText('Log in')).toBeDisabled();
});
