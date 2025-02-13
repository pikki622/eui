/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { render } from '../../test/rtl';

import {
  findTestSubject,
  takeMountedSnapshot,
  requiredProps,
} from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiNotificationEvent } from './notification_event';
import { EuiContextMenuPanel, EuiContextMenuItem } from '../context_menu';

describe('EuiNotificationEvent', () => {
  const props = {
    id: 'id',
    type: 'Alert',
    time: '1 min ago',
    title: 'title',
    messages: ['message'],
  };

  shouldRenderCustomStyles(
    <EuiNotificationEvent
      {...props}
      primaryAction="Test"
      onClickPrimaryAction={() => {}}
    />,
    { childProps: ['primaryActionProps'] }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiNotificationEvent {...props} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('multiple messages are rendered', () => {
      const { container } = render(
        <EuiNotificationEvent
          {...props}
          messages={['message 1', 'message 2', 'message 3']}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isRead  is rendered', () => {
      const { container } = render(
        <EuiNotificationEvent {...props} isRead={true} onRead={() => {}} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('severity  is rendered', () => {
      const { container } = render(
        <EuiNotificationEvent {...props} severity="severity" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('badgeColor is rendered', () => {
      const { container } = render(
        <EuiNotificationEvent {...props} badgeColor="warning" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('iconType is rendered', () => {
      const { container } = render(
        <EuiNotificationEvent {...props} iconType="logoCloud" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('headingLevel is rendered', () => {
      const { container } = render(
        <EuiNotificationEvent {...props} headingLevel="h4" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('iconAriaLabel is rendered', () => {
      const { container } = render(
        <EuiNotificationEvent
          {...props}
          iconType="logoCloud"
          iconAriaLabel="my icon aria label"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('primaryAction is rendered', () => {
      const { container } = render(
        <EuiNotificationEvent
          {...props}
          primaryAction="primaryAction label"
          onClickPrimaryAction={() => {}}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('primaryActionProps is rendered', () => {
      const { container } = render(
        <EuiNotificationEvent
          {...props}
          primaryAction="primaryAction"
          primaryActionProps={{ iconType: 'download' }}
          onClickPrimaryAction={() => {}}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('contextMenuItems are rendered', () => {
      const onOpenContextMenu = (id: string) => {
        return [
          <EuiContextMenuItem key="contextMenuItemA">
            Context menu 1 for id: {id}
          </EuiContextMenuItem>,
          <EuiContextMenuItem key="contextMenuItemB">
            Context menu 2 for id: {id}
          </EuiContextMenuItem>,
          <EuiContextMenuItem key="contextMenuItemC">
            Context menu 3 for id: {id}
          </EuiContextMenuItem>,
        ];
      };

      const component = mount(
        <EuiNotificationEvent
          {...props}
          onOpenContextMenu={onOpenContextMenu}
        />
      );

      expect(component.find(EuiContextMenuPanel)).toHaveLength(0);
      findTestSubject(component, 'id-notificationEventMetaButton').simulate(
        'click'
      );
      expect(component.find(EuiContextMenuPanel)).toHaveLength(1);

      expect(
        takeMountedSnapshot(component.find(EuiContextMenuPanel))
      ).toMatchSnapshot();
    });
  });

  describe('behavior', () => {
    it('triggers the onRead callback', () => {
      const onRead = jest.fn();

      const component = mount(
        <EuiNotificationEvent {...props} isRead={true} onRead={onRead} />
      );

      findTestSubject(component, 'id-notificationEventReadButton').simulate(
        'click'
      );

      expect(onRead).toHaveBeenCalledTimes(1);
    });

    it('triggers the onClickPrimaryAction callback', () => {
      const onClickPrimaryAction = jest.fn();

      const component = mount(
        <EuiNotificationEvent
          {...props}
          isRead={true}
          onRead={() => {}}
          onClickPrimaryAction={onClickPrimaryAction}
          primaryAction="primary action label"
        />
      );

      findTestSubject(component, 'id-notificationEventPrimaryAction').simulate(
        'click'
      );

      expect(onClickPrimaryAction).toHaveBeenCalledTimes(1);
    });

    it('triggers the onClickTitle callback', () => {
      const onClickTitle = jest.fn();

      const component = mount(
        <EuiNotificationEvent {...props} onClickTitle={onClickTitle} />
      );

      findTestSubject(component, 'id-notificationEventTitle').simulate('click');

      expect(onClickTitle).toHaveBeenCalledTimes(1);
    });
  });
});
