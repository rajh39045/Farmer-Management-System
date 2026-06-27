import { gsap } from "gsap";

/**
 * Fade Up Animation
 */
export const fadeUpAnimation = (
  selector,
  scope
) => {
  gsap.from(selector, {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
  });
};

/**
 * Fade Left Animation
 */
export const fadeLeftAnimation = (
  selector,
  scope
) => {
  gsap.from(selector, {
    x: -60,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
  });
};

/**
 * Fade Right Animation
 */
export const fadeRightAnimation = (
  selector,
  scope
) => {
  gsap.from(selector, {
    x: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
  });
};

/**
 * Floating Animation
 */
export const floatingAnimation = (
  selector
) => {
  gsap.to(selector, {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "power1.inOut",
  });
};