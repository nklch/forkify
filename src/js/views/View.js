import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parrentElement.querySelectorAll('*'),
    );

    newElements.forEach((nEl, i) => {
      const cEl = currentElements[i];

      if (!nEl.isEqualNode(cEl) && nEl.firstChild?.nodeValue?.trim() !== '') {
        cEl.textContent = nEl.textContent;
      }

      if (!nEl.isEqualNode(cEl))
        Array.from(nEl.attributes).forEach(attr =>
          cEl.setAttribute(attr.name, attr.value),
        );
    });
  }

  _clear() {
    this._parrentElement.innerHTML = '';
  }

  renderSpiner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
    this._clear();
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(msg = this._errMsg) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>`;
    this._clear();
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(msg = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>`;
    this._clear();
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
