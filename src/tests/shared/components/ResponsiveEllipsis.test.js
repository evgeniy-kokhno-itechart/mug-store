/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ResponsiveEllipsis from '../../../app/shared/components/markup/ResponsiveEllipsis';

configure({ adapter: new Adapter() });

describe('<ResponsiveEllipsis />', () => {
  let ResponsiveEllipsisWrapper;

  beforeEach(() => {
    ResponsiveEllipsisWrapper = shallow(<ResponsiveEllipsis />);
  });

  it('renders properly with default props', () => {
    expect(ResponsiveEllipsisWrapper).toMatchSnapshot();
  });

  it('renders properly with text provided', () => {
    ResponsiveEllipsisWrapper.setProps({ text: 'Lorem ipsum dolor sit amet' });
    expect(ResponsiveEllipsisWrapper).toMatchSnapshot();
  });

  it('renders properly with long text and maxLine provided', () => {
    ResponsiveEllipsisWrapper.setProps({
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum justo sit amet suscipit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus magna lacus, egestas vitae urna sed, pulvinar blandit sem. Donec ultrices dolor at neque convallis, ut fringilla quam tincidunt.',
      maxLine: '2',
    });
    expect(ResponsiveEllipsisWrapper).toMatchSnapshot();
  });

  it('renders properly with text and ellipsis provided', () => {
    ResponsiveEllipsisWrapper.setProps({ text: 'Lorem ipsum dolor sit amet', ellipsis: '***' });
    expect(ResponsiveEllipsisWrapper).toMatchSnapshot();
  });

  it('renders properly with text and basedOn words provided', () => {
    ResponsiveEllipsisWrapper.setProps({ text: 'Lorem ipsum dolor sit amet', basedOn: 'words' });
    expect(ResponsiveEllipsisWrapper).toMatchSnapshot();
  });

  it('renders properly with text and basedOn letters provided', () => {
    ResponsiveEllipsisWrapper.setProps({ text: 'Lorem ipsum dolor sit amet', basedOn: 'letters' });
    expect(ResponsiveEllipsisWrapper).toMatchSnapshot();
  });
});
