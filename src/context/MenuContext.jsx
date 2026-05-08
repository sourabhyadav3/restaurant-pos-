import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const categoryIconMap = {
  pizza: '🍕',
  burger: '🍔',
  drink: '🥤',
  beverage: '🥤',
  coffee: '☕',
  dessert: '🍰',
  cake: '🍰',
  side: '🍟',
  fry: '🍟',
  salad: '🥗',
  pasta: '🍝',
  chicken: '🍗',
  icecream: '🍨',
  breakfast: '🍳',
  egg: '🍳',
  indian: '🍛',
  curry: '🍛',
  chinese: '🍜',
  noodle: '🍜',
  bakery: '🥐',
  bread: '🥐',
  sandwich: '🥪',
  soup: '🥣',
  steak: '🥩',
  fish: '🐟',
  sushi: '🍣'
};

const initialItems = [
  { 
    id: 1, 
    name: 'Margherita Pizza', 
    category: 'Pizza', 
    price: 299, 
    image: '🍕', 
    description: 'Classic tomato, mozzarella, basil', 
    available: true,
    sizes: [
      { name: "Small", price: 199 },
      { name: "Medium", price: 299 },
      { name: "Large", price: 399 }
    ]
  },
  { 
    id: 2, 
    name: 'Pepperoni Pizza', 
    category: 'Pizza', 
    price: 399, 
    image: '🍕', 
    description: 'Beef pepperoni with extra cheese', 
    available: true,
    sizes: [
      { name: "Small", price: 299 },
      { name: "Medium", price: 399 },
      { name: "Large", price: 499 }
    ]
  },
  { 
    id: 3, 
    name: 'Cheese Burger', 
    category: 'Burgers', 
    price: 189, 
    image: '🍔', 
    description: 'Juicy patty with cheddar', 
    available: true,
    sizes: [
      { name: "Regular", price: 189 },
      { name: "Large", price: 249 }
    ]
  },
  { 
    id: 4, 
    name: 'Chicken Pasta', 
    category: 'Pasta', 
    price: 349, 
    image: '🍝', 
    description: 'Creamy alfredo with grilled chicken', 
    available: true,
    sizes: [
      { name: "Half", price: 199 },
      { name: "Full", price: 349 }
    ]
  },
  { 
    id: 5, 
    name: 'Coca Cola', 
    category: 'Drinks', 
    price: 49, 
    image: '🥤', 
    description: 'Chilled 300ml', 
    available: true,
    sizes: [
      { name: "Small", price: 49 },
      { name: "Medium", price: 79 },
      { name: "Large", price: 99 }
    ]
  },
  { id: 6, name: 'Chocolate Lava', category: 'Desserts', price: 149, image: '🍰', description: 'Molten chocolate center', available: true },
  { id: 7, name: 'Veggie Pizza', category: 'Pizza', price: 329, image: '🍕', description: 'Garden fresh vegetables', available: true },
  { id: 8, name: 'Double Patty Burger', category: 'Burgers', price: 249, image: '🍔', description: 'Double meat, double cheese', available: true },
  { id: 10, name: 'Iced Coffee', category: 'Drinks', price: 129, image: '☕', description: 'Cold brew with milk', available: true },
];

const initialCategories = ['All', 'Pizza', 'Burgers', 'Pasta', 'Sides', 'Drinks', 'Desserts'];

export const MenuProvider = ({ children }) => {
  const [items, setItems] = useState(initialItems);
  const [categoriesList, setCategoriesList] = useState(initialCategories);

  const addItem = (newItem) => {
    const id = Date.now();
    const itemWithId = { ...newItem, id, available: true };
    setItems(prev => [itemWithId, ...prev]);
    
    if (!categoriesList.includes(newItem.category)) {
      setCategoriesList(prev => [...prev, newItem.category]);
    }
  };

  return (
    <MenuContext.Provider value={{ items, categoriesList, addItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
