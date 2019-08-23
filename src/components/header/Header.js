/**
 * @module Header
 */
class Header {
  /**
   * @param {HTMLElement} element - The HTMLElement this module is constructed upon
   * @param {Object} options - ConditionerJS's merged options
   */
  constructor(element, options) {
    this._element = element;
    this._options = {...Header.options, ...options}

    this.init();
  }

  /**
   * Base options
   */
  static options = {
    headerSelector: '.akf-header'
  }

  _addEventListeners() {
    window.addEventListener('resize', this.setHeaderHeight);
  }

  _setHeaderHeight() {
    const { headerSelector } = this._options;
    const headerEl = document.querySelector(headerSelector);
    const root = document.documentElement;

    root.style.setProperty(
      '--header-height',
      `${headerEl.getBoundingClientRect().height}px`
    );
  }

  /**
   * Construct module
   */
  init() {
    this._addEventListeners();
    this._setHeaderHeight();
  }
}

// Exports
export default Header;