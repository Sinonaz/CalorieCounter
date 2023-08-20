const activityRate = {
  min: 1.2,
  low: 1.375,
  medium: 1.55,
  high: 1.725,
  max: 1.9,
};

const user = new Map();

class CalculateCalories {
  constructor(formElement) {
    this.formElement = formElement;
    this.inputElements = this.formElement.querySelectorAll(`input`);
    this.resetBtnElement = this.formElement.querySelector(`.js-reset`);
    this.submitBtnElement = this.formElement.querySelector(`.js-submit`);
    this.resultBlockElement = document.querySelector(`.js-result`);
    this.caloriesNormalElement = document.getElementById(`calories-norm`);
    this.caloriesMinElement = document.getElementById(`calories-minimal`);
    this.caloriesMaxElement = document.getElementById(`calories-maximal`);

    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onResetBtnClick = this.onResetBtnClick.bind(this);

    this.formElement.addEventListener(`change`, this.onFormChange);
    this.formElement.addEventListener(`submit`, this.onFormSubmit);

    this.#SetInitialUserValues();
  }

  onFormChange(event) {
    this.#setUserData(event.target);

    this.#setActiveBtnStatus(this.submitBtnElement, !this.#isFilledData());
    this.#setActiveBtnStatus(this.resetBtnElement, false);
    this.resetBtnElement.addEventListener(`click`, this.onResetBtnClick, {
      once: true,
    });
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.#showResultBlock();
    this.#updateResultData();
  }

  #showResultBlock() {
    this.resultBlockElement.classList.remove(`counter__result--hidden`);
  }

  #hideResultBlock() {
    this.resultBlockElement.classList.add(`counter__result--hidden`);
  }

  #updateResultData() {
    const coefficient = activityRate[user.get(`activity`)];
    let result;
    switch (user.get(`gender`)) {
      case `female`:
        result =
          (655.1 +
            9.563 * user.get(`weight`) +
            1.85 * user.get(`height`) -
            4.676 * user.get(`age`)) *
          coefficient;
        break;
      case `male`:
        result =
          (66.5 +
            13.75 * user.get(`weight`) +
            5.003 * user.get(`height`) -
            6.775 * user.get(`age`)) *
          coefficient;
        break;
    }

    this.caloriesNormalElement.textContent = Math.round(result);
    this.caloriesMinElement.textContent = Math.round(
      result - (result / 100) * 15
    );
    this.caloriesMaxElement.textContent = Math.round(
      result + (result / 100) * 15
    );
  }

  onResetBtnClick() {
    this.#resetForm();
  }

  #setUserData(input) {
    user.set(input.name, input.value);
  }

  #setActiveBtnStatus(button, boolean) {
    button.disabled = boolean;
  }

  #resetForm() {
    this.formElement.reset();
    this.#setActiveBtnStatus(this.resetBtnElement, true);
    this.#setActiveBtnStatus(this.submitBtnElement, true);
    this.#hideResultBlock();
    this.#SetInitialUserValues();
  }

  #isFilledData() {
    return Array.from(user.values()).every((value) => value);
  }

  #SetInitialUserValues() {
    this.inputElements.forEach((input) => {
      if (input.type === `radio`) {
        if (input.checked) {
          user.set(input.name, input.value);
        }
      } else {
        user.set(input.name, input.value);
      }
    });
  }
}

new CalculateCalories(document.querySelector('.js-form'));
