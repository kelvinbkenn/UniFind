import React from 'react';
import {
  CreditCard,
  Headphones,
  BookOpen,
  CupSoda,
  KeyRound,
  Briefcase,
  Shirt,
  Package,
  LucideProps
} from 'lucide-react';
import { Category } from '../types';

interface CategoryIconProps extends LucideProps {
  category: Category | string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category, ...props }) => {
  switch (category) {
    case 'id_cards':
      return <CreditCard {...props} />;
    case 'electronics':
      return <Headphones {...props} />;
    case 'books':
      return <BookOpen {...props} />;
    case 'bottles':
      return <CupSoda {...props} />;
    case 'keys_wallets':
      return <KeyRound {...props} />;
    case 'bags':
      return <Briefcase {...props} />;
    case 'clothing':
      return <Shirt {...props} />;
    case 'other':
    default:
      return <Package {...props} />;
  }
};
