import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

test('Renders without children', () => {
  render(
    <div data-testid="badge">
      <Badge />
    </div>
  );
  expect(screen.getByTestId('badge').firstChild).toBeVisible();
});

test('Renders children', () => {
  render(<Badge>Test</Badge>);
  expect(screen.getByText('Test')).toBeVisible();
});

test('Renders with class name pf-c-badge', () => {
  render(<Badge>Test</Badge>);
  expect(screen.getByText('Test')).toHaveClass('pf-c-badge');
});

test('Renders with class name pf-m-unread by default', () => {
  render(<Badge>Test</Badge>);
  expect(screen.getByText('Test')).toHaveClass('pf-m-unread');
});

test('Renders with class name pf-m-read when isRead prop is true', () => {
  render(<Badge isRead={true}>Test</Badge>);
  expect(screen.getByText('Test')).toHaveClass('pf-m-read');
});

test('Renders with custom class name when className prop is provided', () => {
  render(<Badge className="custom-class">Test</Badge>);
  expect(screen.getByText('Test')).toHaveClass('custom-class');
});

test('Renders with inherited element props spread to the component', () => {
  render(<Badge aria-label="Test label">Test</Badge>);
  expect(screen.getByText('Test')).toHaveAccessibleName('Test label');
});

test('Matches the snapshot', () => {
  const { asFragment } = render(<Badge>Test</Badge>);
  expect(asFragment()).toMatchSnapshot();
});
