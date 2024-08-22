import React, { useEffect, useState } from 'react';
import Header from '../Pages/Header';
import Footer from '../Pages/Footer';
import DetailHero from './DetailHero';
import Detail from './Detail';


export default function BlogDetail() {


  return (
    <>
    <Header/>
    <DetailHero/>
    <Detail/>
    <Footer/>
    </>
  );
}
