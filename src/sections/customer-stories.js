import EmblaCarousel from 'embla-carousel';

const postCarouselRootNode = document.querySelector('.post_carousel'),
  postCarouselViewportNode = postCarouselRootNode.querySelector('.post_carousel__viewport');
var options = {
  active: !1,
  breakpoints: {
    '(min-width: 640px)': { active: !0, loop: !0, slidesToScroll: 2, align: 'start', containScroll: 'keepSnaps' },
    '(min-width: 1280px)': { dragFree: !0, loop: !1, slidesToScroll: 1 },
  },
};
const postCarousel = EmblaCarousel(postCarouselRootNode, options);
