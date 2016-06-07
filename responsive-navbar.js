(function(rNav, undefined) {
  'use strict';

  function ResponsiveNav() {
    var self = this;

    self.startX = 0;
    self.currentX = 0;

    self.showButtonEl =
      document.querySelector('.js-menu-show');

    self.responsiveNavEl =
      document.querySelector('.js-responsive-nav');

    self.responsiveNavContainer =
      document.querySelector('.js-responsive-nav-container');

    self.showButtonEl
      .addEventListener('click', self.showResponsiveNav.bind(self));

    self.responsiveNavEl
      .addEventListener('click', self.hideResponsiveNav.bind(self));

    self.responsiveNavContainer
      .addEventListener('click', self.ignoreHide);

    document
      .addEventListener('touchstart', self.onTouchStart.bind(self));

    document
      .addEventListener('touchmove', self.onTouchMove.bind(self));

    document
      .addEventListener('touchend', self.onTouchEnd.bind(self));

    self.onTransitionEnd = function() {
      self.responsiveNavEl
        .classList.remove('responsive-nav--animatable');

      self.responsiveNavContainer
        .removeEventListener('transitionend', self.onTransitionEnd);
    };
  }

  ResponsiveNav.prototype.showResponsiveNav = function() {
    this.responsiveNavEl
      .classList.add('responsive-nav--visible', 'responsive-nav--animatable');

    this.responsiveNavEl
      .addEventListener('transitionend', this.onTransitionEnd);
  };

  ResponsiveNav.prototype.hideResponsiveNav = function() {
    this.responsiveNavEl
      .classList.remove('responsive-nav--visible');

    this.responsiveNavEl
      .classList.add('responsive-nav--animatable');

    this.responsiveNavEl
      .addEventListener('transitionend', this.onTransitionEnd);
  };

  ResponsiveNav.prototype.ignoreHide = function(evt) {
    evt.stopPropagation();
  };

  ResponsiveNav.prototype.update = function() {
    if(!this.touchingSideNav) {
      return;
    }

    var translateX;

    if (this.swipeFromLeft) {
      translateX = 20 + Math.min(-20, this.currentX - this.startX -
        this.responsiveNavContainer.getBoundingClientRect().width);
    } else {
      translateX = Math.min(0, this.currentX - this.startX);
    }

    this.responsiveNavContainer.style.transform =
      'translateX(' + translateX + 'px)';

    requestAnimationFrame(this.update.bind(this));
  };

  ResponsiveNav.prototype.onTouchStart = function(evt) {
    if (evt.srcElement.parentElement.className === 'responsive-nav__content') {
      return;
    }

    if (!this.responsiveNavEl.classList.contains('responsive-nav--visible') &&
        evt.touches[0].pageX > 15) {
      return;
    }

    this.startX = evt.touches[0].pageX;
    this.currentX = this.startX;
    this.swipeFromLeft = this.startX < 15 ? true : false;
    this.touchingSideNav = true;

    if (!!this.swipeFromLeft) {
      this.responsiveNavEl
        .classList.add('responsive-nav--visible', 'responsive-nav--animatable');

      this.responsiveNavContainer.style.transform =
        'translateX(-96%)';
    }

    requestAnimationFrame(this.update.bind(this));
  };

  ResponsiveNav.prototype.onTouchMove = function(evt) {
    if (!this.touchingSideNav) {
      return;
    }

    this.currentX = evt.touches[0].pageX;
  };

  ResponsiveNav.prototype.onTouchEnd = function(evt) {
    if (!this.touchingSideNav) {
      return;
    }

    this.touchingSideNav = false;
    var translateX = this.currentX - this.startX;
    this.responsiveNavContainer.style = '';

    if ((!this.swipeFromLeft && translateX < -60) ||
        (!!this.swipeFromLeft && translateX < 60)) {
      this.hideResponsiveNav();
    }

    if (!!this.swipeFromLeft && translateX > 60) {
      this.showResponsiveNav();
    }
  };

  function init() {
    new ResponsiveNav;
  };

  rNav = {
    init: init,
    version: 'ResponsiveNav v.0.0.1'
  };

  window.ResponsiveNav = rNav;
}(window.ResponsiveNav || {}));
