// =========================================
// LUMINA SUPERHERO WEBSITE - script.js
// =========================================

// Smooth scrolling for navbar links
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Button hover animation for ALL hero buttons
const buttons = document.querySelectorAll(".hero-btn");

buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.08)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
  });
});

// Golden ripple effect when button is clicked
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const circle = document.createElement("span");
    circle.classList.add("ripple");

    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    circle.style.left = x + "px";
    circle.style.top = y + "px";

    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(
  ".section, .power-card, .cta"
);

const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);

// Run once when page loads
revealOnScroll();

// Small welcome message in browser console
console.log("✨ Welcome to Lumina Superhero Help Portal!");

/* ================= CHATBOT ================= */

const chatbot = document.getElementById("chatbot");
const chatToggle = document.getElementById("chat-toggle");
const closeChat = document.getElementById("close-chat");
const chatBody = document.getElementById("chat-body");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const typing = document.getElementById("typing");

// Questions Lumina asks
const questions = [
  "💙 Lovely to meet you! How old are you?",
  "🌍 Thanks! Which city are you from?",
  "📧 What's your email address? I'll only use it for follow-up resources. 🔒",
  "✨ Thank you! Now tell me anything you need help with. I'm here to listen."
];

let step = 0;
let answers = [];

/* ---------- Bot Message with Lumina Avatar ---------- */
function addBotMessage(message) {
  const botDiv = document.createElement("div");
  botDiv.className = "bot-message";

  botDiv.innerHTML = `
    <div class="bot-container">
      <img src="assets/lumina-avatar.png" class="bot-avatar" alt="Lumina">
      <div class="bot-text">${message}</div>
    </div>
  `;

  chatBody.appendChild(botDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/* ---------- Typing Animation ---------- */
function showTyping(nextMessage) {
  typing.style.display = "flex";

  setTimeout(() => {
    typing.style.display = "none";
    addBotMessage(nextMessage);
  }, 1200);
}

/* ---------- Open Chat Automatically ---------- */
window.addEventListener("load", () => {
  chatbot.classList.add("active");

  setTimeout(() => {
    addBotMessage("🌟 Hello! I'm Lumina, Guardian of Hope.");
  }, 800);

  setTimeout(() => {
    addBotMessage("Welcome to my Help Portal. Every voice deserves to be heard.");
  }, 2200);

  setTimeout(() => {
    addBotMessage("💙 Before we begin our rescue mission... What's your name?");
  }, 3800);
});

/* ---------- Open / Close Chat ---------- */
chatToggle.onclick = () => chatbot.classList.add("active");
closeChat.onclick = () => chatbot.classList.remove("active");

/* ---------- Send User Message ---------- */
function sendMessage() {

  const text = userInput.value.trim();
  if (text === "") return;

  // User bubble
  const userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.textContent = text;
  chatBody.appendChild(userDiv);

  chatBody.scrollTop = chatBody.scrollHeight;

  answers.push(text);
  userInput.value = "";

  // Show typing dots
  typing.style.display = "flex";

  setTimeout(() => {

    typing.style.display = "none";

    if (step === 0) {
      addBotMessage(`💙 Lovely to meet you, ${answers[0]}! How old are you?`);
      step++;

    } else if (step === 1) {
      addBotMessage(`🌍 Thanks, ${answers[0]}. Which city are you from?`);
      step++;

    } else if (step === 2) {
      addBotMessage(
        `📧 Great, What's your email address? I'll only use it for follow-up resources. 🔒`
      );
      step++;

    } else if (step === 3) {
      addBotMessage(
        `✨ Thank you, ${answers[0]}! Now tell me anything you need help with. I'm here to listen.`
      );
      step++;

    } else {

      // ⭐ Show progress bar
      showRescueProgress();

      // Wait 3 seconds, then send email
      setTimeout(() => {
        sendHelpRequest({
          name: answers[0],
          age: answers[1],
          location: answers[2],
          email: answers[3],
          problem: answers[4]
        });
      }, 3000);
    }

  }, 1200);
}

/* ---------- Send Button ---------- */
sendBtn.onclick = sendMessage;

/* ---------- Enter Key ---------- */
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// ================= RESCUE PROGRESS BAR =================

function showRescueProgress() {

    const progressDiv = document.createElement("div");
    progressDiv.className = "bot-message";

    progressDiv.innerHTML = `
      <div class="bot-container">
        <img src="assets/lumina-avatar.png" class="bot-avatar" alt="Lumina">
        <div class="bot-text">
          🛡 Connecting to Lumina Headquarters...

          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
        </div>
      </div>
    `;

    chatBody.appendChild(progressDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}
// ===============================
// EMAILJS CONFIGURATION
// ===============================

const SERVICE_ID = "service_l1gyuyu";
const TEMPLATE_ID = "template_gai67t5";
// Success popup elements
const popup = document.getElementById("success-popup");
const popupBtn = document.getElementById("popup-btn");

function showMissionPopup() {
    if (popup) {
        popup.classList.add("active");
    }
}

if (popupBtn) {
    popupBtn.addEventListener("click", () => {
        popup.classList.remove("active");
    });
}
// Send visitor details to your Gmail
function sendHelpRequest(data) {

  emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      user_name: data.name,
      user_age: data.age,
      user_location: data.location,
      user_email: data.email,
      user_problem: data.problem,
      date: new Date().toLocaleString()
    }
  )

  .then((response) => {

    console.log("✅ Email sent successfully!", response);

    // Show popup only if it exists
    if (popup) {
      showMissionPopup();
    }

    // Success message in chatbot
    addBotMessage(
      "💛 Rescue request sent successfully! Lumina Headquarters has received your message. Hope is on the way!"
    );

  })

  .catch((error) => {

    console.error("EmailJS Error:", error);

    addBotMessage(
      "❌ Sorry! Something went wrong while sending your request."
    );

  });

}

// =========================================
// LOADER + MUSIC (WORKS ACROSS PAGES)
// =========================================

const loader = document.getElementById("loader");
const enterPortal = document.getElementById("enter-portal");
const luminaSound = document.getElementById("lumina-sound");

// When page loads
window.addEventListener("load", () => {

    // Skip loader if coming back from another page
    if (sessionStorage.getItem("skipLoader") === "true") {
        loader?.classList.add("loader-hide");
        sessionStorage.removeItem("skipLoader");
    }

    // Resume music if it was already playing
    if (luminaSound && localStorage.getItem("musicPlaying") === "true") {

        const savedTime = parseFloat(localStorage.getItem("musicTime")) || 0;

        luminaSound.loop = true;
        luminaSound.volume = 0.5;
        luminaSound.currentTime = savedTime;

        luminaSound.play().catch(() => {});
    }
});

// Enter Portal starts music
if (enterPortal) {
    enterPortal.addEventListener("click", () => {

        if (luminaSound) {
            luminaSound.loop = true;
            luminaSound.volume = 0.5;

            localStorage.setItem("musicPlaying", "true");

            luminaSound.play().catch(() => {});
        }

        loader?.classList.add("loader-hide");
    });
}

// Save current song position every second
if (luminaSound) {
    setInterval(() => {
        if (!luminaSound.paused) {
            localStorage.setItem("musicTime", luminaSound.currentTime);
        }
    }, 1000);
}
// ================= ANIMATED COUNTERS =================

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.dataset.target;
        const current = +counter.innerText;

        const increment = Math.ceil(target / 80);

        if(current < target){
            counter.innerText = current + increment;
            setTimeout(updateCounter,25);
        }else{
            counter.innerText = target;
        }
    };

    updateCounter();
});
// ==========================================
// FAQ ACCORDION
// ==========================================

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

  question.addEventListener("click", () => {

    const item = question.parentElement;

    item.classList.toggle("active");

    const icon = question.querySelector("span");

    if(item.classList.contains("active")){
      icon.textContent = "➖";
    }else{
      icon.textContent = "➕";
    }

  });

});

// Magical click sparkles
document.addEventListener("click", (e) => {

    for(let i=0;i<10;i++){

        const sparkle=document.createElement("div");
        sparkle.className="click-sparkle";

        sparkle.style.left=e.pageX+"px";
        sparkle.style.top=e.pageY+"px";

        sparkle.style.setProperty("--x",(Math.random()-0.5)*150+"px");
        sparkle.style.setProperty("--y",(Math.random()-0.5)*150+"px");

        document.body.appendChild(sparkle);

        setTimeout(()=>sparkle.remove(),900);

    }

});
// ==========================================
// OPEN LUMINA CHAT FUNCTION
// ==========================================

function openLuminaChat() {

    // Open chatbot
    chatbot.classList.add("active");

    // Focus input after opening
    setTimeout(() => {
        userInput.focus();
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 200);

}

// Open Lumina Chat button (CTA section)
const openChatBtn = document.getElementById("open-chat-btn");
if (openChatBtn) {
    openChatBtn.addEventListener("click", openLuminaChat);
}

// Floating 💬 button
if (chatToggle) {
    chatToggle.addEventListener("click", openLuminaChat);
}

// Close chatbot button
if (closeChat) {
    closeChat.addEventListener("click", () => {
        chatbot.classList.remove("active");
    });
}
// ==========================================
// MAGIC CURSOR GLOW + GLITTER
// ==========================================

// Cursor glow follows mouse
const cursor = document.querySelector(".cursor-glow");

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
}

// Glitter particles when clicking
document.addEventListener("click", (e) => {

    for (let i = 0; i < 12; i++) {

        const sparkle = document.createElement("div");
        sparkle.className = "click-sparkle";

        sparkle.style.left = e.pageX + "px";
        sparkle.style.top = e.pageY + "px";

        sparkle.style.setProperty("--x", (Math.random() - 0.5) * 180 + "px");
        sparkle.style.setProperty("--y", (Math.random() - 0.5) * 180 + "px");

        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 800);
    }
  });
  // ==========================================
// KEEP MUSIC WHEN MOVING TO ANOTHER PAGE
// ==========================================

document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        sessionStorage.setItem("playLuminaMusic", "true");
    });
});
// =========================================
// KEEP MUSIC WHEN NAVIGATING PAGES
// =========================================

document.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        if (luminaSound && !luminaSound.paused) {
            localStorage.setItem("musicPlaying", "true");
            localStorage.setItem("musicTime", luminaSound.currentTime);
        }

        // Skip loader when returning to home
        sessionStorage.setItem("skipLoader", "true");
    });

});
