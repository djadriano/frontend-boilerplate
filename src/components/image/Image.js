/**
 * @module Image
 */
class Image {
  /**
   * @param {HTMLElement} element - The HTMLElement this module is constructed upon
   * @param {Object} options - ConditionerJS's merged options
   */
  constructor(element, options) {
    this._element = element;
    this._options = {...Image.options, ...options}

    this.init();
  }

  /**
   * Base options
   */
  static options = {
    rootMargin: "100px",
    threshold: 1.0
  }

  _cacheElements() {
    this._elements =  {
      images: [...this._element.querySelectorAll('.lazy')]
    }
  }

  _setObserver() {
    this._observer = new IntersectionObserver(this._lazyLoad.bind(this), this._options);
  }

  _preloadImages() {
    const { images } = this._elements;
    images.map(image => this._observer.observe(image));
  }

  _lazyLoad(images) {
    images.forEach(picture => {
      if (picture.intersectionRatio > 0) {
        const sources = [...picture.target.children];
        const pictureEl = picture.target;

        sources.forEach(source => {
          if (source.hasAttribute("data-srcset")) {
            source.setAttribute("srcset", source.getAttribute('data-srcset'));
          } else {
            source.setAttribute("src", source.getAttribute('data-src'));
          }

          source.addEventListener('load', image => {
            const imageEl = image.target;
            imageEl.closest("picture").classList.remove("lazy-initial");
          }, false);
        });

        this._observer.unobserve(pictureEl);
      };
    });
  }

  /**
   * Construct module
   */
  init() {
    this._cacheElements();
    this._setObserver();
    this._preloadImages();
  }
}

// Exports
export default Image;