
import "../css/Home.css";
import { getParkData } from "./parkService.mjs";

// Template Functions
function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

function introTemplate(info) {
  return `<h1>${info.fullName}</h1>
  <p>${info.description}</p>`;
}

function mediaCardTemplate(info) {
  return `<a href="${info.link}" class="media-card">
    <img src="${info.image}" alt="" />
    <h3>${info.name}</h3>
    <p>${info.description}</p>
  </a>`;
}

function footerTemplate(info) {
  const mailingAddress = info.addresses.find(addr => addr.type === "Mailing");
  const voicePhone = info.contacts.phoneNumbers.find(phone => phone.type === "Voice");
  
  return `<section class="contact-info">
    <h3>Contact Information</h3>
    <h4>Mailing Address:</h4>
    <p>
      ${mailingAddress.line1}<br>
      ${mailingAddress.city}, ${mailingAddress.stateCode} ${mailingAddress.postalCode}
    </p>
    <h4>Phone:</h4>
    <p><a href="tel:+1${voicePhone.phoneNumber}">${voicePhone.phoneNumber}</a></p>
  </section>`;
}

// Setter Functions
function setHeaderInfo(data) {
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = data.url;
  disclaimer.innerHTML = data.fullName;

  document.querySelector("head > title").textContent = data.fullName;

  const heroImage = document.querySelector(".hero-banner img");
  heroImage.src = data.images[0].url;
  heroImage.alt = data.images[0].altText;

  document.querySelector(".hero-banner__content").innerHTML = parkInfoTemplate(data);
}

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = introTemplate(data);
}

function setParkInfoLinks(links) {
  const infoEl = document.querySelector(".info");
  const html = links.map(mediaCardTemplate);
  infoEl.innerHTML = html.join("");
}

function setFooter(data) {
  const footerEl = document.querySelector("#park-footer");
  footerEl.innerHTML = footerTemplate(data);
}

// Data
const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    description:
      "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    description: "Learn about the visitor centers in the park."
  }
];

// Get info links with updated images
export function getInfoLinks(data) {
  // Why index + 2 below? no real reason. we don't want index 0 since that is the one we used for the banner...I decided to skip an image.
  const withUpdatedImages = parkInfoLinks.map((item, index) => {
    const imageIndex = index + 2;
    item.image = (data && data[imageIndex] ? data[imageIndex].url : (data && data[0] ? data[0].url : ""));
    return item;
  });
  return withUpdatedImages;
}

// Initialize
async function init() {
  const parkData = await getParkData();
  const parkInfoLinks = getInfoLinks(parkData.images);

  setHeaderInfo(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(parkInfoLinks);
  setFooter(parkData);
}

init();