const contactImgDiv = document.querySelector(".contact-photo");
const name = document.querySelector(".name");
const position = document.querySelector(".position");
const telephoneContainer = document.querySelector(".telephone");
const emailContainer = document.querySelector(".email");
const mainContainer = document.querySelector("main");
const endBtn = document.querySelector(".btn-send");

fetch("../data.json")
  .then(res => res.json())
  .then(res => {
    fillData(res);
  });

function fillData(data) {
  const contactImg = document.createElement("img");
  const phone = document.createElement("span");
  const email = document.createElement("span");

  contactImg.src = data.image;
  contactImgDiv.appendChild(contactImg);

  name.textContent = data.fullName;
  position.textContent = data.position;

  phone.textContent = data.phone;
  telephoneContainer.appendChild(phone);

  email.textContent = data.email;
  emailContainer.appendChild(email);

  data.sections.forEach(sectionData => {
    fillSections(sectionData);
  });

  endBtn.addEventListener('click', () => {
  const sex = data.sex;
  const subject = 'Приглашение на собеседование';
  
  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear(); 

  let dateNow = ((String(d.length == 1) ? "0" + d : d) + "." + ((String(m.length == 1) ? "0" + m : m) + "." + (y)));

  let bodyMsg;
  if (sex === 'male') {
    bodyMsg = `Уважаемый ${data.fullName}, приглашаем Вас на собеседование в компанию Artezio. 
    ${dateNow}`
  } else {
    bodyMsg = `Уважаемая ${data.fullName}, приглашаем Вас на собеседование в компанию Artezio.
    ${dateNow}`
  }

  window.open(`mailto:${data.email}?subject=${subject}&body=${bodyMsg}`)});

function fillSections(data) {
  const section = document.createElement("section");
  const titleContainer = document.createElement("div");
  const title = document.createElement("h2");
  const arrow = document.createElement("div");

  if (data.isOpen) arrow.className += "icon-arrow-up";
  else arrow.className += "icon-arrow-down";

  titleContainer.className += "section-title-container";

  title.textContent = data.title;

  titleContainer.addEventListener("click", e => {
    const div = e.currentTarget;
    const icon = div.children[1];
    if (icon.className === "icon-arrow-down") {
      icon.className = "icon-arrow-up";
      div.parentElement.children[1].className = "sh show";
    } else {
      icon.className = "icon-arrow-down";
      div.parentElement.children[1].className = "sh hide";
    }
  });

  titleContainer.appendChild(title);
  titleContainer.appendChild(arrow);

  section.appendChild(titleContainer);

  const showHideContainer = document.createElement("div");
  showHideContainer.className += data.isOpen ? "sh show" : "sh hide";

  data.items.forEach(item => {
    fillSectionItems(item, showHideContainer);
  });

  section.appendChild(showHideContainer);

  mainContainer.appendChild(section);
}

function fillSectionItems(item, section) {
  const content = document.createElement("div");
  content.className += "content";

  const contentTitle = document.createElement("h3");
  const contentSubTitle = document.createElement("h4");
  const contentDate = document.createElement("h5");
  contentTitle.className += "content-title";
  contentTitle.textContent = item.title;

  if (item.subTitle) {
    contentSubTitle.className += "content-subtitle";
    contentSubTitle.textContent = item.subTitle;
  }

  if (item.from && item.to) {
    contentDate.className += "content-date";
    contentDate.textContent = `${item.from} - ${item.to}`;
  }

  const listItems = document.createElement("ul");
  if (item.items) {
    item.items.forEach(i => {
      const li = document.createElement("li");
      li.textContent = i;
      listItems.appendChild(li);
    });
  }

  content.appendChild(contentTitle);
  content.appendChild(contentSubTitle);
  content.appendChild(contentDate);
  content.appendChild(listItems);

  section.appendChild(content);
}};