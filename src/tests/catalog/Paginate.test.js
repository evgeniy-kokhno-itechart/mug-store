/* eslint-disable no-undef */
import paginate from '../../app/catalog/Paginate';

describe('paginate service', () => {
  const fakeItems = [
    {
      id: 1,
      name: '1',
      description: 'description 1',
    },
    {
      id: 2,
      name: '2',
      description: 'description 2',
    },
    {
      id: 3,
      name: '3',
      description: 'description 3',
    },
    {
      id: 4,
      name: '4',
      description: 'description 4',
    },
    {
      id: 5,
      name: '5',
      description: 'description 5',
    },
  ];

  it('should return items for the 1st page', () => {
    const pageNumber = 1;
    const pageSize = 3;
    const firstPageItems = [...fakeItems];
    firstPageItems.splice(3);
    expect(paginate(fakeItems, pageNumber, pageSize)).toEqual(firstPageItems);
  });

  it('should return items for the 2nd page', () => {
    const pageNumber = 2;
    const pageSize = 3;
    const secondPageItems = [...fakeItems];
    secondPageItems.splice(0, 3);
    expect(paginate(fakeItems, pageNumber, pageSize)).toEqual(secondPageItems);
  });
});
