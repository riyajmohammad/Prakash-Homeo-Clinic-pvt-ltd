const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("open");
    });
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());

const appointmentDate = document.querySelector("#appointment-date");
if (appointmentDate) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  appointmentDate.min = localToday;
}

const appointmentForm = document.querySelector("#appointment-form");
if (appointmentForm) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formError = document.querySelector("#form-error");
    const formData = new FormData(appointmentForm);
    const mobile = String(formData.get("mobile") || "").trim();

    if (!/^\d{10}$/.test(mobile)) {
      formError.textContent = "Please enter a valid 10-digit mobile number.";
      formError.hidden = false;
      document.querySelector("#patient-mobile").focus();
      return;
    }

    formError.hidden = true;
    const requestedDate = String(formData.get("date"));
    const displayDate = new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(`${requestedDate}T00:00:00`));
    const message = [
      "Hello Prakash Homoeo Clinic, I would like to request an appointment.",
      "",
      `Name: ${String(formData.get("name")).trim()}`,
      `Mobile: +91 ${mobile}`,
      `Reason for consultation: ${String(formData.get("concern")).trim()}`,
      `Preferred date: ${displayDate}`,
      `Preferred time: ${formData.get("time")}`,
      "",
      "Please confirm if this time is available."
    ].join("\n");
    const whatsappUrl = `https://wa.me/917651983263?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
