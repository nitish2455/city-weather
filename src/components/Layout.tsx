import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC<{ title: string; children: ReactNode }> = ({ children, title }) => (
  <div className='flex flex-col min-h-screen'>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
     <div><Navbar/></div>
    <main>{children}</main>
    <div className='mt-auto'><Footer/></div>
    
  </div>
);

export default Layout;
