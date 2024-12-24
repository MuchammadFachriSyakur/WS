// script.js
// Data pembayaran dalam bentuk array of objects
const payments = [
  {
    image: "../assets/image/payment/noval-20des.jpeg",
    date: "20 Desember 2024",
    price: 15000,
  },
  {
    image: "../assets/image/payment/kem-20des.jpeg",
    date: "20 Desember 2024",
    price: 15000,
  },
  {
    image: "../assets/image/payment/amar-17des.jpeg",
    date: "17 Desember 2024",
    price: 15000,
  },
  {
    image: "../assets/image/payment/amar-8des.jpeg",
    date: "08 Desember 2024",
    price: 15000,
  },
  {
    image: "../assets/image/payment/kem-8des.jpeg",
    date: "08 Desember 2024",
    price: 15000,
  },
];

// Fungsi untuk menampilkan data pembayaran di dalam elemen div.images
function displayPayments(filteredPayments) {
  const imagesContainer = document.querySelector(".content .images");
  imagesContainer.innerHTML = "";

  filteredPayments.forEach((payment) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
       <img src="${payment.image}" alt="Payment Picture" />
       <p class="date">${payment.date}</p>
       <p class="price">Rp ${payment.price.toLocaleString("id-ID")}</p>
      `;

    imagesContainer.appendChild(card);
  });
}

displayPayments(payments);

// Fungsi untuk memfilter berdasarkan tipe filter
// Fungsi untuk memformat tanggal input ke format data
function formatDateToReadable(date) {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
}

// Filter berdasarkan tanggal
function filterPayments(type, criteria) {
  let filteredPayments;

  if (type === "all") {
    filteredPayments = payments;
  } else if (type === "date") {
    const { date } = criteria;
    const formattedDate = formatDateToReadable(date);
    filteredPayments = payments.filter(
      (payment) => payment.date === formattedDate
    );
  } else if (type === "minPrice") {
    const { minPrice } = criteria;
    filteredPayments = payments.filter((payment) => payment.price >= minPrice);
  } else if (type === "dateAndPrice") {
    const { date, minPrice } = criteria;
    const formattedDate = formatDateToReadable(date);
    filteredPayments = payments.filter(
      (payment) => payment.date === formattedDate && payment.price >= minPrice
    );
  } else {
    filteredPayments = payments;
  }

  displayPayments(filteredPayments);
}

const buttonForm = document.getElementById("filterButton");

buttonForm.addEventListener("click", () => {
  openAndCloseForm();
  const date = document.getElementById("dateFilter").value;
  const minPrice =
    parseInt(document.getElementById("minPriceFilter").value) || 0;

  if (date && minPrice > 0) {
    filterPayments("dateAndPrice", { date, minPrice });
  } else if (date) {
    filterPayments("date", { date });
  } else if (minPrice > 0) {
    filterPayments("minPrice", { minPrice });
  }
});

const buttonAll = document.querySelector(".content .buttons_filters .all");

buttonAll.addEventListener("click", () => {
  filterPayments("all", {});
});

const buttonFilter = document.querySelector(
  ".content .buttons_filters .filter"
);
const closeForm = document.querySelector(".wrap_fliters .filter .close");

buttonFilter.addEventListener("click", () => {
  openAndCloseForm();
});

closeForm.addEventListener("click", () => {
  openAndCloseForm();
});

function openAndCloseForm() {
  const form = document.querySelector(".wrap_fliters");

  form.classList.toggle("active");
}
