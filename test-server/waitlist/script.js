// script.js
(() => {
  // REPLACE this with your published Apps Script web app URL (see deploy steps below)
  const SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

  const form = document.getElementById('waitlistForm');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const msg = document.getElementById('msg');
  const toasts = document.getElementById('toasts');

  function showToast(text, kind = 'success') {
    const t = document.createElement('div');
    t.className = 'toast ' + (kind === 'error' ? 'error' : (kind === 'warning' ? 'warning' : 'success'));
    t.textContent = text;
    toasts.appendChild(t);
    setTimeout(() => { t.remove(); }, 4500);
  }

  function setLoading(loading) {
    if (loading) {
      submitBtn.setAttribute('disabled', 'true');
      btnSpinner.style.display = 'inline-block';
      btnText.textContent = 'Joining...';
    } else {
      submitBtn.removeAttribute('disabled');
      btnSpinner.style.display = 'none';
      btnText.textContent = 'Join Waitlist';
    }
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    msg.style.display = 'none';
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();

    if (!name) {
      msg.style.display = 'block';
      msg.textContent = 'Please enter your name.';
      return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      msg.style.display = 'block';
      msg.textContent = 'Please enter a valid email address.';
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(https://script.google.com/macros/s/AKfycbwKaZYS1C_H1jg2AaEw7EVbZ-J_wCOhtdUbf4v5OaGr5-h31VRrD69MzYO125qDFemXDQ/exec, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();

      if (data && data.status === 'success') {
        showToast('You’re on the waitlist — thanks!');
        form.reset();
      } else {
        const err = (data && data.error) ? data.error : 'Unknown server error';
        showToast(`Failed: ${err}`, 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error — try again later', 'error');
    } finally {
      setLoading(false);
    }
  });
})();
