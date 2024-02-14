class CustomFontSizeBlock {
  constructor({ data, api }) {
    this.data = {
      ...data,
      textSize: data.textSize || 'medium', // Default value for textSize
    };
    this.api = api;
    this.wrapper = null;
    this.textElement = null;
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('custom-font-size-block');

    this.textElement = document.createElement('p');
    this.textElement.innerText = this.data.text;
    this.textElement.style.fontSize = this.getFontSize();

    this.wrapper.appendChild(this.textElement);

    return this.wrapper;
  }

  save() {
    return {
      text: this.textElement.innerText,
      textSize: this.data.textSize,
    };
  }

  validate() {
    // Validate the block data here
  }

  getFontSize() {
    switch (this.data.textSize) {
      case 'small':
        return '12px';
      case 'medium':
        return '16px';
      case 'large':
        return '20px';
      default:
        return '16px';
    }
  }

  updateData(data) {
    this.data = {
      ...this.data,
      ...data,
    };
    this.textElement.style.fontSize = this.getFontSize();
    this.api.blocks.update(this.api.blocks.getCurrentBlockIndex(), {
      data: this.data,
    });
  }
}
  export default CustomFontSizeBlock;
  