import { normalizeClassName } from 'utils/general';

/**
 * @module ProductsList
 */
class ProductsList {
  /**
   * @param {HTMLElement} element - The HTMLElement this module is constructed upon
   * @param {Object} options - ConditionerJS's merged options
   */
  constructor(element, options) {
    this._element = element;
    this._options = {...ProductsList.options, ...options}

    this.init();
  }

  /**
   * Base options
   */
  static options = {
    navSelector: '.products-list-nav',
    navTitleSelector: '.products-list-nav__title',
    navListSelector: '.products-list-nav__items',
    navLinksSelector: '.products-list-nav__link',
    navLinksActiveSelector: '.products-list-nav__link--active',
    contentItemsSelector: '.products-list-content__item'
  }

  _state = {
    activeLink: 1
  }

  _addEventListeners() {
    const { navTitle, navList } = this._elements;

    navTitle.addEventListener('click', this._toggleNavigation.bind(this));

    navList.addEventListener('click', evt => {
      if(evt.target.getAttribute('href')) this._onSelectedProduct(evt);
    });
  }

  _toggleNavigation() {
    const { nav } = this._elements;
    const { navSelector } = this._options;

    nav.classList.toggle(`${normalizeClassName(navSelector)}--opened`);
  }

  _onSelectedProduct(evt) {
    const selectedProduct = evt.target;
    const selectedProductId = selectedProduct.getAttribute('data-nav-item-id');

    this._setActiveLink(selectedProductId);
    this._setNavActiveLink();
    this._setNavTitle();
    this._toggleContent();
    this._toggleNavigation();

    evt.preventDefault();
  }

  _setNavActiveLink() {
    const { navLinksSelector } = this._options;
    const { activeLink } = this._state;
    const navLinkActiveEl = this._element.querySelector(`${navLinksSelector}--active`);
    const activeClassSelector = `${normalizeClassName(navLinksSelector)}--active`;
    const navItemSelected = this._element.querySelector(`[data-nav-item-id="${activeLink}"]`);

    if(navLinkActiveEl) navLinkActiveEl.classList.remove(activeClassSelector);
    navItemSelected.classList.add(activeClassSelector);
  }  

  _setActiveLink(productId) {
    this._state.activeLink = productId;
  }

  _setNavTitle() {
    const { activeLink } = this._state;
    const { navTitle } = this._elements;
    const navItemSelected = this._element.querySelector(`[data-nav-item-id="${activeLink}"]`);

    navTitle.textContent = navItemSelected.textContent;
  }

  _toggleContent() {
    const { activeLink } = this._state;
    const { contentItems } = this._elements;
    const contentItemSelected = this._element.querySelector(`[data-content-id="${activeLink}"]`);

    contentItems.map(item => item.classList.remove('active'));
    if(contentItemSelected) contentItemSelected.classList.add('active');
  }

  _cacheElements() {
    this._elements = {
      nav: this._element.querySelector(this._options.navSelector),
      navTitle: this._element.querySelector(this._options.navTitleSelector),
      navList: this._element.querySelector(this._options.navListSelector),
      navLinks: [...this._element.querySelectorAll(this._options.navLinksSelector)],
      contentItems: [...this._element.querySelectorAll(this._options.contentItemsSelector)]
    }
  }

  _setInitialValues() {
    const { defaultActive } = this._options;
    
    this._setActiveLink(defaultActive);
    this._setNavActiveLink();
    this._setNavTitle();
    this._toggleContent();
  }

  /**
   * Construct module
   */
  init() {
    this._cacheElements();
    this._addEventListeners();
    this._setInitialValues();
  }
}

// Exports
export default ProductsList
