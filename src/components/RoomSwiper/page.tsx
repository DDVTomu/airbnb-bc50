"use client"
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import '../RoomSwiper/roomSwiper.css'
import Image from 'next/image';
export default function RoomSwiper(props:any){

const image = props.image == "string" ?  "/" : props.image
return (
    <Swiper
    modules={[Navigation, Pagination, A11y]}
    spaceBetween={0}
    slidesPerView={1}
    navigation
    loop={true}
    pagination={{ clickable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    className= 'roomSwiper'
  >
    <SwiperSlide><Image src={image} alt="cybersoft airbnb"  layout='fill'/></SwiperSlide>
    <SwiperSlide><Image src={image}  alt="cybersoft airbnb" layout='fill'/></SwiperSlide>
    <SwiperSlide><Image src={image}  alt="cybersoft airbnb" layout='fill'/></SwiperSlide>
  </Swiper>

)
}