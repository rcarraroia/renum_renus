import React from 'react';
import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const RenumLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 text-lg font-bold tracking-tight text-[#4e4ea8] dark:text-[#0ca7d2]">
      <Zap className="h-6 w-6" />
      <span>Renum Tech Agency</span>
    </Link>
  );
};

export default RenumLogo;