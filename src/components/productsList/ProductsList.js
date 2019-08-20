const normalizeClassName = classSelector => classSelector.replace('.', '');

/**
 * @module ProductsList
 */
class ProductsList {
  /**
   * @param {HTMLElement} element - The HTMLElement this module is constructed upon
   * @param {Object} options - ConditionerJS's merged options
   */
  constructor(element, options) {
    this._element = element
    this._options = Object.assign(ProductsList.options, options)

    this.load();
  }

  /**
   * Base options
   */
  static options = {
    navSelector: '.products-list-nav',
    navTitleSelector: '.products-list-nav__title',
    navLinksSelector: '.products-list-nav__link',
    navLinksActiveSelector: '.products-list-nav__link--active',
    contentItemsSelector: '.products-list-content__item',
    activeLink: 1
  }

  _addEventListeners() {
    const { navTitle, navLinks } = this._elements;

    navTitle.addEventListener('click', this._toggleNavigation.bind(this));
    navLinks.map(item => item.addEventListener('click', this._onSelectedProduct.bind(this)));
  }

  _toggleNavigation() {
    const { nav } = this._elements;
    const { navSelector } = this._options;

    nav.classList.toggle(`${normalizeClassName(navSelector)}--opened`);
  }

  _onSelectedProduct(evt) {
    evt.preventDefault();
    const selectedProduct = evt.target;
    const selectedProductId = selectedProduct.getAttribute('data-nav-item-id');

    this._setActiveLink(selectedProductId);
    this._setNavActiveLink();
    this._setNavTitle();
    this._toggleContent();
    this._toggleNavigation();
  }

  _setNavActiveLink() {
    const { navLinksSelector, activeLink } = this._options;
    const navLinkActiveEl = this._element.querySelector(`${navLinksSelector}--active`);
    const activeClassSelector = `${normalizeClassName(navLinksSelector)}--active`;
    const navItemSelected = this._element.querySelector(`[data-nav-item-id="${activeLink}"]`);

    if(navLinkActiveEl) navLinkActiveEl.classList.remove(activeClassSelector);
    navItemSelected.classList.add(activeClassSelector);
  }  

  _setActiveLink(productId) {
    this._options.activeLink = productId;
  }

  _setNavTitle() {
    const { activeLink } = this._options;
    const { navTitle } = this._elements;
    const navItemSelected = this._element.querySelector(`[data-nav-item-id="${activeLink}"]`);

    navTitle.textContent = navItemSelected.textContent;
  }

  _toggleContent() {
    const { activeLink } = this._options;
    const { contentItems } = this._elements;
    const contentItemSelected = this._element.querySelector(`[data-content-id="${activeLink}"]`);

    contentItems.map(item => item.classList.remove('active'));
    if(contentItemSelected) contentItemSelected.classList.add('active');
  }

  _cacheElements() {
    this._elements = {
      nav: this._element.querySelector(this._options.navSelector),
      navTitle: this._element.querySelector(this._options.navTitleSelector),
      navLinks: [...this._element.querySelectorAll(this._options.navLinksSelector)],
      contentItems: [...this._element.querySelectorAll(this._options.contentItemsSelector)]
    }
  }

  /**
   * Construct module
   */
  load() {
    this._cacheElements();
    this._addEventListeners();
    this._setNavActiveLink();
    this._setNavTitle();
    this._toggleContent();
  }
}

// Exports
export default ProductsList
