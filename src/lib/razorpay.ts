// Helper to dynamically load the Razorpay checkout script safely
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      return resolve(false);
    }

    if ((window as any).Razorpay) {
      return resolve(true);
    }

    const existingScript = document.getElementById('razorpay-checkout-script') as HTMLScriptElement;
    if (existingScript) {
      if ((window as any).Razorpay) {
        return resolve(true);
      }
      existingScript.addEventListener('load', () => resolve(Boolean((window as any).Razorpay)), { once: true });
      existingScript.addEventListener('error', () => resolve(false), { once: true });

      // Fallback check if script finished loading before event listener attached
      let checkCount = 0;
      const poll = setInterval(() => {
        checkCount++;
        if ((window as any).Razorpay) {
          clearInterval(poll);
          resolve(true);
        } else if (checkCount >= 40) {
          clearInterval(poll);
          resolve(false);
        }
      }, 50);
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(Boolean((window as any).Razorpay));
    script.onerror = () => {
      script.remove();
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
