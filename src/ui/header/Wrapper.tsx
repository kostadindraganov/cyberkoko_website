'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { useWindowScroll } from "react-use";

export default function Wrapper({
	className,
	children,
}: React.ComponentProps<'header'>) {
	const navContainerRef = useRef<HTMLDivElement>(null)
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


  useEffect(() => {
    if (currentScrollY === 0) {
 
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
  
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

	return (
		<div
		ref={navContainerRef}
		className="fixed inset-x-0 top-4 z-250 h-16 border-none transition-all duration-700 sm:inset-x-6"
	>
		<header className="absolute top-1/2 w-full -translate-y-1/2">
			<nav className="flex size-full items-center justify-between p-4">
			{children}
			</nav>
		</header>
	</div>
	)
}
