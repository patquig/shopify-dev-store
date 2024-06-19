// function getFocusableElements(container) {
//   return Array.from(
//     container.querySelectorAll(
//       "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe",
//     ),
//   );
// }

// document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
//   summary.setAttribute('role', 'button');
//   summary.setAttribute('aria-expanded', summary.parentNode.hasAttribute('open'));

//   if (summary.nextElementSibling.getAttribute('id')) {
//     summary.setAttribute('aria-controls', summary.nextElementSibling.id);
//   }

//   summary.addEventListener('click', (event) => {
//     event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
//   });

//   if (summary.closest('header-drawer')) return;
//   summary.parentElement.addEventListener('keyup', onKeyUpEscape);
// });

// const trapFocusHandlers = {};

// function trapFocus(container, elementToFocus = container) {
//   var elements = getFocusableElements(container);
//   var first = elements[0];
//   var last = elements[elements.length - 1];

//   removeTrapFocus();

//   trapFocusHandlers.focusin = (event) => {
//     if (event.target !== container && event.target !== last && event.target !== first) return;

//     document.addEventListener('keydown', trapFocusHandlers.keydown);
//   };

//   trapFocusHandlers.focusout = function () {
//     document.removeEventListener('keydown', trapFocusHandlers.keydown);
//   };

//   trapFocusHandlers.keydown = function (event) {
//     if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
//     // On the last focusable element and tab forward, focus the first element.
//     if (event.target === last && !event.shiftKey) {
//       event.preventDefault();
//       first.focus();
//     }

//     //  On the first focusable element and tab backward, focus the last element.
//     if ((event.target === container || event.target === first) && event.shiftKey) {
//       event.preventDefault();
//       last.focus();
//     }
//   };

//   document.addEventListener('focusout', trapFocusHandlers.focusout);
//   document.addEventListener('focusin', trapFocusHandlers.focusin);

//   elementToFocus.focus();
// }

// // Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
// try {
//   document.querySelector(':focus-visible');
// } catch (e) {
//   focusVisiblePolyfill();
// }

// function focusVisiblePolyfill() {
//   const navKeys = [
//     'ARROWUP',
//     'ARROWDOWN',
//     'ARROWLEFT',
//     'ARROWRIGHT',
//     'TAB',
//     'ENTER',
//     'SPACE',
//     'ESCAPE',
//     'HOME',
//     'END',
//     'PAGEUP',
//     'PAGEDOWN',
//   ];
//   let currentFocusedElement = null;
//   let mouseClick = null;

//   window.addEventListener('keydown', (event) => {
//     if (navKeys.includes(event.code.toUpperCase())) {
//       mouseClick = false;
//     }
//   });

//   window.addEventListener('mousedown', (event) => {
//     mouseClick = true;
//   });

//   window.addEventListener(
//     'focus',
//     () => {
//       if (currentFocusedElement) currentFocusedElement.classList.remove('focused');

//       if (mouseClick) return;

//       currentFocusedElement = document.activeElement;
//       currentFocusedElement.classList.add('focused');
//     },
//     true,
//   );
// }

// function pauseAllMedia() {
//   document.querySelectorAll('.js-youtube').forEach((video) => {
//     video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
//   });
//   document.querySelectorAll('.js-vimeo').forEach((video) => {
//     video.contentWindow.postMessage('{"method":"pause"}', '*');
//   });
// }

// function removeTrapFocus(elementToFocus = null) {
//   document.removeEventListener('focusin', trapFocusHandlers.focusin);
//   document.removeEventListener('focusout', trapFocusHandlers.focusout);
//   document.removeEventListener('keydown', trapFocusHandlers.keydown);

//   if (elementToFocus) elementToFocus.focus();
// }

// function onKeyUpEscape(event) {
//   if (event.code.toUpperCase() !== 'ESCAPE') return;

//   const openDetailsElement = event.target.closest('details[open]');
//   if (!openDetailsElement) return;

//   const summaryElement = openDetailsElement.querySelector('summary');
//   openDetailsElement.removeAttribute('open');
//   summaryElement.setAttribute('aria-expanded', false);
//   summaryElement.focus();
// }

// class QuantityInput extends HTMLElement {
//   constructor() {
//     super();
//     this.input = this.querySelector('input');
//     this.changeEvent = new Event('change', { bubbles: true });

//     this.querySelectorAll('button').forEach((button) =>
//       button.addEventListener('click', this.onButtonClick.bind(this)),
//     );
//   }

//   onButtonClick(event) {
//     event.preventDefault();
//     const previousValue = this.input.value;

//     event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
//     if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
//   }
// }

// customElements.define('quantity-input', QuantityInput);

// function debounce(fn, wait) {
//   let t;
//   return (...args) => {
//     clearTimeout(t);
//     t = setTimeout(() => fn.apply(this, args), wait);
//   };
// }

// function fetchConfig(type = 'json') {
//   return {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: `application/${type}`,
//     },
//   };
// }

// /*
//  * Shopify Common JS
//  *
//  */
// if (typeof window.Shopify == 'undefined') {
//   window.Shopify = {};
// }

// Shopify.bind = function (fn, scope) {
//   return function () {
//     return fn.apply(scope, arguments);
//   };
// };

// Shopify.setSelectorByValue = function (selector, value) {
//   for (var i = 0, count = selector.options.length; i < count; i++) {
//     var option = selector.options[i];
//     if (value == option.value || value == option.innerHTML) {
//       selector.selectedIndex = i;
//       return i;
//     }
//   }
// };

// Shopify.addListener = function (target, eventName, callback) {
//   target.addEventListener
//     ? target.addEventListener(eventName, callback, false)
//     : target.attachEvent('on' + eventName, callback);
// };

// Shopify.postLink = function (path, options) {
//   options = options || {};
//   var method = options['method'] || 'post';
//   var params = options['parameters'] || {};

//   var form = document.createElement('form');
//   form.setAttribute('method', method);
//   form.setAttribute('action', path);

//   for (var key in params) {
//     var hiddenField = document.createElement('input');
//     hiddenField.setAttribute('type', 'hidden');
//     hiddenField.setAttribute('name', key);
//     hiddenField.setAttribute('value', params[key]);
//     form.appendChild(hiddenField);
//   }
//   document.body.appendChild(form);
//   form.submit();
//   document.body.removeChild(form);
// };

// Shopify.CountryProvinceSelector = function (country_domid, province_domid, options) {
//   this.countryEl = document.getElementById(country_domid);
//   this.provinceEl = document.getElementById(province_domid);
//   this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);

//   Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler, this));

//   this.initCountry();
//   this.initProvince();
// };

// Shopify.CountryProvinceSelector.prototype = {
//   initCountry: function () {
//     var value = this.countryEl.getAttribute('data-default');
//     Shopify.setSelectorByValue(this.countryEl, value);
//     this.countryHandler();
//   },

//   initProvince: function () {
//     var value = this.provinceEl.getAttribute('data-default');
//     if (value && this.provinceEl.options.length > 0) {
//       Shopify.setSelectorByValue(this.provinceEl, value);
//     }
//   },

//   countryHandler: function (e) {
//     var opt = this.countryEl.options[this.countryEl.selectedIndex];
//     var raw = opt.getAttribute('data-provinces');
//     var provinces = JSON.parse(raw);

//     this.clearOptions(this.provinceEl);
//     if (provinces && provinces.length == 0) {
//       this.provinceContainer.style.display = 'none';
//     } else {
//       for (var i = 0; i < provinces.length; i++) {
//         var opt = document.createElement('option');
//         opt.value = provinces[i][0];
//         opt.innerHTML = provinces[i][1];
//         this.provinceEl.appendChild(opt);
//       }

//       this.provinceContainer.style.display = '';
//     }
//   },

//   clearOptions: function (selector) {
//     while (selector.firstChild) {
//       selector.removeChild(selector.firstChild);
//     }
//   },

//   setOptions: function (selector, values) {
//     for (var i = 0, count = values.length; i < values.length; i++) {
//       var opt = document.createElement('option');
//       opt.value = values[i];
//       opt.innerHTML = values[i];
//       selector.appendChild(opt);
//     }
//   },
// };

// class DeferredMedia extends HTMLElement {
//   constructor() {
//     super();
//     const poster = this.querySelector('[id^="Deferred-Poster-"]');
//     if (!poster) return;
//     poster.addEventListener('click', this.loadContent.bind(this));
//   }

//   loadContent(focus = true) {
//     window.pauseAllMedia();
//     if (!this.getAttribute('loaded')) {
//       const content = document.createElement('div');
//       content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

//       this.setAttribute('loaded', true);
//       const deferredElement = this.appendChild(content.querySelector('video, model-viewer, iframe'));
//       if (focus) deferredElement.focus();
//     }
//   }
// }

// customElements.define('deferred-media', DeferredMedia);

// class VariantSelects extends HTMLElement {
//   constructor() {
//     super();
//     this.addEventListener('change', this.onVariantChange);
//   }

//   onVariantChange() {
//     this.updateOptions();
//     this.updateMasterId();
//     this.toggleAddButton(true, '', false);
//     this.removeErrorMessage();

//     if (!this.currentVariant) {
//       this.toggleAddButton(true, '', true);
//       this.setUnavailable();
//     } else {
//       this.updateURL();
//       this.updateVariantInput();
//       this.renderProductInfo();
//       this.updateProductCarousel();
//       this.updateShareUrl();
//     }

//     productCarousel.scrollTo(0);
//   }

//   updateOptions() {
//     this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
//   }

//   updateMasterId() {
//     this.currentVariant = this.getVariantData().find((variant) => {
//       return !variant.options
//         .map((option, index) => {
//           return this.options[index] === option;
//         })
//         .includes(false);
//     });
//   }

//   updateURL() {
//     if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
//     window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
//   }

//   updateShareUrl() {
//     const shareButton = document.getElementById(`Share-${this.dataset.section}`);
//     if (!shareButton || !shareButton.updateUrl) return;
//     shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
//   }

//   updateVariantInput() {
//     const productForms = document.querySelectorAll(
//       `#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`,
//     );
//     productForms.forEach((productForm) => {
//       const input = productForm.querySelector('input[name="id"]');
//       input.value = this.currentVariant.id;
//       input.dispatchEvent(new Event('change', { bubbles: true }));
//     });
//   }

//   removeErrorMessage() {
//     const section = this.closest('section');
//     if (!section) return;

//     const productForm = section.querySelector('product-form');
//     if (productForm) productForm.handleErrorMessage();
//   }

//   renderProductInfo() {
//     fetch(
//       `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${
//         this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section
//       }`,
//     )
//       .then((response) => response.text())
//       .then((responseText) => {
//         // Update price info
//         const html = new DOMParser().parseFromString(responseText, 'text/html');
//         const destination = document.getElementById(`price-${this.dataset.section}`);
//         const source = html.getElementById(
//           `price-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`,
//         );
//         if (source && destination) destination.innerHTML = source.innerHTML;

//         // Update availability info
//         const destinationAvailability = document.getElementById(`availability-info-${this.dataset.section}`);
//         const sourceAvailability = html.getElementById(
//           `availability-info-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`,
//         );
//         if (sourceAvailability && destinationAvailability)
//           destinationAvailability.innerHTML = sourceAvailability.innerHTML;

//         // Update stock notification form and re-attach listener
//         const destinationStockNotification = document.getElementById(`stock-notification-${this.dataset.section}`);
//         const sourceStockNotification = html.getElementById(
//           `stock-notification-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`,
//         );
//         if (sourceStockNotification && destinationStockNotification)
//           destinationStockNotification.innerHTML = sourceStockNotification.innerHTML;

//         attachStockFormSubmitListener();

//         // Update sale tag
//         const destinationSaleTag = document.getElementById(`sale-tag-${this.dataset.section}`);
//         const sourceSaleTag = html.getElementById(
//           `sale-tag-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`,
//         );
//         if (sourceSaleTag && destinationSaleTag) destinationSaleTag.innerHTML = sourceSaleTag.innerHTML;

//         // Other price stuff
//         const price = document.getElementById(`price-${this.dataset.section}`);

//         if (price) price.classList.remove('visibility-hidden');
//         this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
//       });
//   }

//   updateProductCarousel() {
//     document.querySelectorAll('.tb-product-carousel-featured').forEach((featuredMedia) => {
//       const variantId = featuredMedia.dataset.variantId;
//       if (variantId == this.currentVariant.id) {
//         featuredMedia.classList.remove('tb-hidden');
//       } else {
//         featuredMedia.classList.add('tb-hidden');
//       }
//     });
//   }

//   toggleAddButton(disable = true, text, modifyClass = true) {
//     const productForm = document.getElementById(`product-form-${this.dataset.section}`);
//     if (!productForm) return;
//     const addButton = productForm.querySelector('[name="add"]');
//     const addButtonText = productForm.querySelector('[name="add"] > span');
//     if (!addButton) return;

//     // Disable and hide button
//     if (disable) {
//       addButton.setAttribute('disabled', 'disabled');
//       addButton.classList.add('tw-hidden');
//       if (text) addButtonText.textContent = text;
//     } else {
//       addButton.removeAttribute('disabled');
//       addButton.classList.remove('tw-hidden');
//       addButtonText.textContent = window.variantStrings.addToCart;
//     }

//     if (!modifyClass) return;
//   }

//   setUnavailable() {
//     const button = document.getElementById(`product-form-${this.dataset.section}`);
//     const addButton = button.querySelector('[name="add"]');
//     const addButtonText = button.querySelector('[name="add"] > span');
//     const price = document.getElementById(`price-${this.dataset.section}`);
//     if (!addButton) return;
//     addButtonText.textContent = window.variantStrings.unavailable;
//     if (price) price.classList.add('visibility-hidden');
//   }

//   getVariantData() {
//     this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
//     return this.variantData;
//   }
// }

// customElements.define('variant-selects', VariantSelects);

// class VariantRadios extends VariantSelects {
//   constructor() {
//     super();
//   }

//   updateOptions() {
//     const fieldsets = Array.from(this.querySelectorAll('fieldset'));
//     this.options = fieldsets.map((fieldset) => {
//       return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
//     });
//   }
// }

// customElements.define('variant-radios', VariantRadios);

// // ------> TENTBOX

// // Header menu

// const bodyObscure = document.querySelector('#tb_body_obscure');
// const pageObscure = document.querySelector('#tb_page_obscure');
// const menuDesktop = document.querySelectorAll('[id^="tb_header_menu_desktop_hover_"]');
// const openMenuMobile = document.querySelector('#tb_header_menu_mobile_open');
// const closeMenuMobile = document.querySelector('#tb_header_menu_mobile_close');
// const mobileMenuDrawer = document.querySelector('#tb_header_menu_mobile_drawer');
// const openSearch = document.querySelector('#tb_header_menu_search_open');
// const closeSearch = document.querySelector('#tb_header_menu_search_close');
// const cancelSearch = document.querySelector('#tb_header_menu_search_cancel');
// const searchModal = document.querySelector('#tb_header_menu_search_modal');
// const searchInput = document.querySelector('#tb_search_input');

// function showBodyObscure(show) {
//   if (show == true) {
//     bodyObscure.classList.remove('tw-invisible', 'tw-opacity-0');
//   } else if (show == false) {
//     bodyObscure.classList.add('tw-invisible', 'tw-opacity-0');
//   }
// }

// function showPageObscure(show) {
//   if (show == true) {
//     pageObscure.classList.remove('tw-invisible', 'tw-opacity-0');
//     showBodyObscure(false);
//     showMobileDrawer(false);
//     showSearchModal(false);
//   } else if (show == false) {
//     pageObscure.classList.add('tw-invisible', 'tw-opacity-0');
//   }
// }

// function allowPageScroll(scroll) {
//   if (scroll == false) {
//     document.body.classList.add('tb-overflow-hidden');
//   } else if (scroll == true) {
//     document.body.classList.remove('tb-overflow-hidden');
//   }
// }

// function showMobileDrawer(show) {
//   if (show == true) {
//     mobileMenuDrawer.classList.remove('-tw-translate-x-[102%]');
//     openMenuMobile.classList.add('tb-hidden');
//     closeMenuMobile.classList.remove('tb-hidden');
//   } else if (show == false) {
//     mobileMenuDrawer.classList.add('-tw-translate-x-[102%]');
//     openMenuMobile.classList.remove('tb-hidden');
//     closeMenuMobile.classList.add('tb-hidden');
//   }
// }

// function showSearchModal(show) {
//   if (show == true) {
//     searchModal.classList.remove('tb-hidden');
//     openSearch.classList.add('tb-hidden');
//     closeSearch.classList.remove('tb-hidden');
//   } else if (show == false) {
//     searchModal.classList.add('tb-hidden');
//     openSearch.classList.remove('tb-hidden');
//     closeSearch.classList.add('tb-hidden');
//   }
// }

// bodyObscure.addEventListener('click', () => {
//   showBodyObscure(false);
//   allowPageScroll(true);
//   showMobileDrawer(false);
//   showSearchModal(false);
// });

// menuDesktop.forEach((menuDesktop) => {
//   const menuDesktopDrawer = menuDesktop.querySelector('[id^="tb_header_menu_desktop_drawer_"]');
//   const screenWidth = window.innerWidth;
//   const positionDiff = screenWidth - menuDesktopDrawer.getBoundingClientRect().right;

//   if (positionDiff < 0) {
//     menuDesktopDrawer.style.left = `${positionDiff - 20}px`;
//   }

//   menuDesktop.addEventListener('mouseover', () => {
//     menuDesktopDrawer.classList.remove('tw-invisible', 'tw-opacity-0');
//     showBodyObscure(true);
//     showSearchModal(false);
//   });
//   menuDesktop.addEventListener('mouseleave', () => {
//     menuDesktopDrawer.classList.add('tw-invisible', 'tw-opacity-0');
//     showBodyObscure(false);
//   });
// });

// openMenuMobile.addEventListener('click', () => {
//   showMobileDrawer(true);
//   showSearchModal(false);
//   allowPageScroll(false);
//   showBodyObscure(true);
// });

// closeMenuMobile.addEventListener('click', () => {
//   showMobileDrawer(false);
//   allowPageScroll(true);
//   showBodyObscure(false);
// });

// openSearch.addEventListener('click', () => {
//   showSearchModal(true);
//   showMobileDrawer(false);
//   allowPageScroll(false);
//   showBodyObscure(true);
//   searchInput.focus();
// });

// closeSearch.addEventListener('click', () => {
//   showSearchModal(false);
//   allowPageScroll(true);
//   showBodyObscure(false);
// });

// cancelSearch.addEventListener('click', () => {
//   showSearchModal(false);
//   allowPageScroll(true);
//   showBodyObscure(false);
// });

// // Autoplay video

// const mdViewport = window.matchMedia('(min-width: 768px)');
// const minDownload = 1; // Medium speed 3g

// const autoplayVideo = document.querySelectorAll('[id^="tb_autoplay_video_"]').forEach((autoplayVideo) => {
//   function resizeVideo(mdViewport) {
//     // default to mobile video source and poster
//     let src = autoplayVideo.dataset.mobileSrc;
//     let poster = autoplayVideo.dataset.mobilePoster;
//     if (mdViewport.matches) {
//       // override to desktopfor >md screens
//       src = autoplayVideo.dataset.desktopSrc;
//       poster = autoplayVideo.dataset.desktopPoster;
//     }
//     let downlink = minDownload;
//     try {
//       downlink = navigator.connection.downlink;
//     } catch (e) {
//       console.log(`Unable to determine downlink`);
//     }
//     if (autoplayVideo.src !== src) {
//       // only override values if they differ
//       if (downlink >= minDownload) {
//         autoplayVideo.src = src;
//         console.log(`Detected bandwidth (${downlink}Mbps) greater than threshold (${minDownload}Mbps) - showing video`);
//       } else {
//         console.log(`Not showing video due to low bandwidth`);
//       }
//       autoplayVideo.poster = poster;
//     }
//   }
//   mdViewport.addListener(resizeVideo);
//   resizeVideo(mdViewport);
// });
