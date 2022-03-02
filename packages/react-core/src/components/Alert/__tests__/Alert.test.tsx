import * as React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';

import { Alert, AlertVariant } from '../Alert';
import { AlertActionLink } from '../AlertActionLink';
import { AlertActionCloseButton } from '../AlertActionCloseButton';
import { UsersIcon } from '@patternfly/react-icons';

test('default Alert variant is default', () => {
  const view = mount(<Alert title="this is a test">Alert testing</Alert>);
  expect(
    view
      .find('Alert')
      .childAt(0)
      .prop('className')
  ).toContain('pf-c-alert');
});

Object.values(AlertVariant).forEach(variant => {
  describe(`Alert - ${variant}`, () => {
    test('Description', () => {
      const view = render(
        <Alert variant={variant} title="">
          Some alert
        </Alert>
      );
      expect(view.container).toMatchSnapshot();
    });

    test('Title', () => {
      const view = render(
        <Alert variant={variant} title="Some title">
          Some alert
        </Alert>
      );
      expect(view.container).toMatchSnapshot();
    });

    test('Heading level', () => {
      const view = render(
        <Alert variant={variant} title="Some title" titleHeadingLevel="h1">
          Some alert
        </Alert>
      );
      expect(view.container).toMatchSnapshot();
    });

    test('Action Link', () => {
      const view = render(
        <Alert variant={variant} actionLinks={[<AlertActionLink key={'action-1'}>test</AlertActionLink>]} title="">
          Some alert
        </Alert>
      );
      expect(view.container).toMatchSnapshot();
    });

    test('Action Close Button', () => {
      const onClose = jest.fn();
      const view = mount(
        <Alert
          variant={variant}
          actionClose={<AlertActionCloseButton aria-label="Close" onClose={onClose} />}
          title={`Sample ${variant} alert`}
        >
          Some alert
        </Alert>
      );
      expect(view).toMatchSnapshot();
      view.find('button[aria-label="Close"]').simulate('click');
      expect(onClose).toHaveBeenCalled();
    });

    test('Action and Title', () => {
      const view = render(
        <Alert variant={variant} actionLinks={[<AlertActionLink key={'action-1'}>test</AlertActionLink>]} title="Some title">
          Some alert
        </Alert>
      );
      expect(view.container).toMatchSnapshot();
    });

    test('Custom aria label', () => {
      const view = render(
        <Alert
          variant={variant}
          aria-label={`Custom aria label for ${variant}`}
          actionLinks={[<AlertActionLink key={'action-1'}>test</AlertActionLink>]}
          title="Some title"
        >
          Some alert
        </Alert>
      );
      expect(view.container).toMatchSnapshot();
    });

    test('inline variation', () => {
      const view = render(
        <Alert variant={variant} isInline title="Some title">
          Some alert
        </Alert>
      );
      expect(view.container).toMatchSnapshot();
    });

    test('expandable variation', () => {
      const view = render(
        <Alert variant={variant} title="Some title" isExpandable>
          <p>Success alert description. This should tell the user more information about the alert.</p>
        </Alert>
      )
      expect(view.container).toMatchSnapshot();
    })

    test('expandable variation description hidden', () => {
      const wrapper = mount(
        <Alert variant={variant} title="Some title" isExpandable>
          <p>Success alert description. This should tell the user more information about the alert.</p>
        </Alert>
      )
      const descriptionExists = wrapper.find('.pf-c-alert__description').exists();
      expect(descriptionExists).toBeFalsy();
    })

    test('Toast alerts match snapsnot', () => {
      const view = render(
        <Alert isLiveRegion={true} variant={variant} aria-label={`${variant} toast alert`} title="Some title">
          Some toast alert
        </Alert>
      );
      expect(view.container).toMatchSnapshot();
    });

    test('Toast alerts contain default live region', () => {
      const wrapper = mount(
        <Alert isLiveRegion={true} variant={variant} aria-label={`${variant} toast alert`} title="Some title">
          Some toast alert
        </Alert>
      );
      const liveRegion = wrapper.find({ 'aria-live': 'polite' }).length;
      expect(liveRegion).toBe(1);
    });

    test('Toast alert live regions are not atomic', () => {
      const wrapper = mount(
        <Alert isLiveRegion={true} variant={variant} aria-label={`${variant} toast alert`} title="Some title">
          Some toast alert
        </Alert>
      );
      expect(wrapper.find('.pf-c-alert').prop('aria-atomic')).toBe('false');
    });

    test('Non-toast alerts can have custom live region settings', () => {
      const wrapper = mount(
        <Alert
          aria-live="assertive"
          aria-relevant="all"
          aria-atomic="true"
          variant={variant}
          aria-label={`${variant} toast alert`}
          title="Some title"
        >
          Some noisy alert
        </Alert>
      );
      const alert = wrapper.find(Alert);

      expect(alert.prop('aria-live')).toBe('assertive');
      expect(alert.prop('aria-relevant')).toBe('all');
      expect(alert.prop('aria-atomic')).toBe('true');
    });

    test('Custom icon', () => {
      const view = render(
        <Alert
          customIcon={<UsersIcon />}
          variant={variant}
          aria-label={`${variant} custom icon alert`}
          title="custom icon alert title"
        >
          Some noisy alert
        </Alert>
      );
      expect(view.container).toMatchSnapshot();
    });
  });
});


test('Alert truncate title', () => {
  const view = mount(<Alert truncateTitle={1} title="this is a test">Alert testing</Alert>);
  expect(
    view
      .find('h4')
      .prop('className')
  ).toContain('pf-m-truncate');
});
