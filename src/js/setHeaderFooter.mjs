function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

function footerTemplate(info) {
  const mailingAddress = info.addresses?.find(addr => addr.type === "Mailing");
  const voicePhone = info.contacts?.phoneNumbers?.find(phone => phone.type === "Voice");

  if (!mailingAddress && !voicePhone) {
    return "";
  }

  return `<section class="contact-info">
    <h3>Contact Information</h3>
    ${mailingAddress ? `
    <h4>Mailing Address:</h4>
    <p>
      ${mailingAddress.line1 || ""}<br>
      ${mailingAddress.city || ""}, ${mailingAddress.stateCode || ""} ${mailingAddress.postalCode || ""}
    </p>` : ""}
    ${voicePhone ? `
    <h4>Phone:</h4>
    <p><a href="tel:+1${voicePhone.phoneNumber}">${voicePhone.phoneNumber}</a></p>` : ""}
  </section>`;
}

export default function setHeaderFooter(data) {
  if (!data) return;

  const disclaimer = document.querySelector(".disclaimer > a");
  if (disclaimer) {
    disclaimer.href = data.url || "#";
    disclaimer.innerHTML = data.fullName || data.name || "";
  }

  const titleEl = document.querySelector("head > title");
  if (titleEl) {
    titleEl.textContent = data.fullName || data.name || "";
  }

  const heroImage = document.querySelector(".hero-banner img");
  if (heroImage && data.images?.[0]) {
    heroImage.src = data.images[0].url;
    heroImage.alt = data.images[0].altText || data.fullName || "";
  }

  const heroContent = document.querySelector(".hero-banner__content");
  if (heroContent) {
    heroContent.innerHTML = parkInfoTemplate(data);
  }

  const footerEl = document.querySelector("#park-footer");
  if (footerEl) {
    footerEl.innerHTML = footerTemplate(data);
  }
}
