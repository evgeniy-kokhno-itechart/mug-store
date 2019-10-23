/* eslint-disable no-undef */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Modal from '../../../app/shared/components/markup/Modal/Modal';

configure({ adapter: new Adapter() });

describe('<Modal />', () => {
  let ModalWrapper;

  beforeEach(() => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    ModalWrapper = shallow(
      <Modal
        title="Test Title"
        text="Test Text"
        textConfirm="Test confirmation text"
        textAbort="Test Abort"
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );
  });

  it('check Modal renders properly with default props', () => {
    expect(ModalWrapper).toMatchSnapshot();
  });
});
