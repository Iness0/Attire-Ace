import React from 'react';
import { Steps } from 'primereact/steps';


function CheckoutSteps({step1, step2, step3, step4}) {
    const items = [
    {
      label: 'Login',
      command: (event) => {
        if (step1) {
          window.location.href = '/login';
        }
      },
    },
    {
      label: 'Shipping',
      command: (event) => {
        if (step2) {
          window.location.href = '/shipping';
        }
      },
    },
    {
      label: 'Payment',
      command: (event) => {
        if (step3) {
          window.location.href = '/payment';
        }
      },
    },
    {
      label: 'Place Order',
      command: (event) => {
        if (step4) {
          window.location.href = '/placeorder';
        }
      },
    },
  ];

  const activeIndex = step1
    ? step2
      ? step3
        ? step4
          ? 3
          : 2
        : 1
      : 0
    : -1;

    return (
        <div className="mb-4">
      <Steps model={items} activeIndex={activeIndex} readOnly={false} />
            </div>
    )
}

export default CheckoutSteps