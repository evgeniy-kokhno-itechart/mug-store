import React from 'react';
import { PropTypes } from 'prop-types';
import ListGroupItem from './ListGroupItem';

const ListGroup = ({ items, selectedItem, onItemSelect }) => (
  <ul className="list-group">
    {items.map((item, index) => (
      <ListGroupItem key={item.id} item={item} index={index} selectedItem={selectedItem} handleItemSelect={onItemSelect} />
    ))}
  </ul>
);

ListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })).isRequired,
  selectedItem: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  onItemSelect: PropTypes.func.isRequired,
};

ListGroup.defaultProps = {
  selectedItem: null,
};

export default ListGroup;
