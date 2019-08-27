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
  static options = {}

  _addEventListeners() {
    window.addEventListener('resize', this._setHeaderHeight.bind(this));
  }

  _setHeaderHeight() {
    const headerEl = this._element;
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