const donateCircles = document.querySelectorAll(".donate-circle");
const donateAmounts = document.querySelectorAll(".donate-amount");
const anotherAmount = document.querySelector(".another-amount");

function limitKeypress(event, value, maxLength) {
  if (value != undefined && value.toString().length >= maxLength) {
    event.preventDefault();
  }
}

function chooseDonateAmount(position) {
  donateCircles.forEach((circle) => circle.classList.remove("circle-active"));
  donateAmounts.forEach((amount) => amount.classList.remove("amount-active"));

  if (position !== undefined) {
    donateCircles[position].classList.add("circle-active");
    donateAmounts[position].classList.add("amount-active");

    const currentAmountValue = donateAmounts[position].textContent.slice(1);
    anotherAmount.value = currentAmountValue;
  }
}

function onClickDonateCircle(event) {
  const position = Array.from(donateCircles).indexOf(event.currentTarget);
  chooseDonateAmount(position);
}

function onInputDonateAmount(event) {
  const currentAmountText = '$' + event.currentTarget.value;

  for (let i = 0; i < donateAmounts.length; i++) {
    if (donateAmounts[i].textContent === currentAmountText) {
      chooseDonateAmount(i);
      return;
    }
  }
  chooseDonateAmount(undefined);
}

donateCircles.forEach((circle) => circle.addEventListener("click", onClickDonateCircle));
anotherAmount.addEventListener("input", onInputDonateAmount);