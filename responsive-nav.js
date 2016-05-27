'use strict';

function ResponsiveNav() {
  this.showButtonEl = document.querySelector('.js-menu-show');
  this.hideButtonEl = document.querySelector('.js-menu-hide');
  this.responsiveNavEl = document.querySelector('.js-responsive-nav');

  this.showButtonEl.addEventListener('click', this.showResponsiveNav.bind(this));
  this.hideButtonEl.addEventListener('click', this.hideResponsiveNav.bind(this));

  console.log('Responsive Nav ready');
}

ResponsiveNav.prototype.showResponsiveNav = function() {
  this.responsiveNavEl.classList.add('responsive-nav--visible');
};

ResponsiveNav.prototype.hideResponsiveNav = function() {
  this.responsiveNavEl.classList.remove('responsive-nav--visible');
};

new ResponsiveNav();
