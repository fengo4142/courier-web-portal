import React from 'react';
import { LogoProps } from '../../../interfaces';

const Logo = ({ className, logo }: LogoProps) => <img src={logo} className={className} alt="logo" />;

export default Logo;
