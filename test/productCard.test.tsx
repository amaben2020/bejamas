import React from 'react';
import renderer from 'react-test-renderer';
import ProductCard from '../components/card/ProductCard';

describe('Item', () => {
  const product = {
    id: 1,

    name: 'Samurai King Resting',
    featured: true,
    bestseller: false,
    price: 5.99,
    categoryName: 'jejeje',
    image: {
      src: 'string',
      width: 1 || 'string',
      height: 2 || 'string',
      layout: 'string',
      placeholder: 'string',
      url: 'https://djdjdjd.djdj',
      size: 3,
      size2: 33,
    },
    value: 23,
    description: 'jdjdjdj',
    filter: function (a: any) {
      return a;
    },
    category: {
      id: 1,
      name: 'Pets',
      published_at: '2021-11-12T13:05:14.800Z',
      created_at: '2021-11-12T13:05:12.531Z',
      updated_at: '2021-11-12T13:05:14.808Z',
    },
    created_at: '2021-11-12T13:04:39.778Z',
    recommendation: 'ff',
    details:
      "So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock. yeah",
  };

  it('renders all properties', () => {
    const onAdd = jest.fn();
    const component = renderer.create(
      <ProductCard onAdd={onAdd} product={product} />
    );
    expect(
      component.root.findAllByProps({ children: 'Samurai King Resting' }).length
    ).toEqual(1);
  });

  it('calls onAdd on button click', () => {
    const onAdd = jest.fn();

    const component = renderer.create(
      <ProductCard product={product} onAdd={onAdd} />
    );

    component.root.findByType('button').props.onClick();

    expect(onAdd).toHaveBeenCalledTimes(1);

    expect(component.root.findAllByType(ProductCard).length).toEqual(1);
  });
});
