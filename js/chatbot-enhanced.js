/* ══════════════════════════════════════════
   ENHANCED CHATBOT WITH PORTFOLIO CONTEXT
══════════════════════════════════════════ */

const PORTFOLIO_DATA = {
  name: "Muhammad Hassan Akram",
  email: "mhassanakram698@gmail.com",
  phone: "+92 300 785 8987",
  location: "Faisalabad, Pakistan",
  education: {
    degree: "B.Sc (Hons) Food Science & Technology",
    university: "University of Agriculture Faisalabad (UAF)",
    cgpa: "3.60",
    semester: "6th Semester",
    year: "2023-2027"
  },
  certifications: "41+ verified certificates including Meta Certified Digital Marketing Associate",
  experience: [
    { role: "Digital Marketing Expert", company: "YPDC-UAF", period: "May 2024 - Sep 2024", desc: "Managed social media and digital campaigns" },
    { role: "Head Teacher / Principal", company: "Al Falah Grammar High School, Talhar", period: "Aug 2022 - Sep 2023", desc: "Led modernization of academic systems" },
    { role: "YouTube Content Creator", company: "Sani Sports Official & Pakistan Cricket Channel", period: "Prior", desc: "Built and managed cricket channel" }
  ],
  skills: ["Food Science", "Digital Marketing", "AI & Generative AI", "SEO & GEO", "Meta Ads", "Content Strategy", "Excel", "Video Editing", "Prompt Engineering"],
  interests: ["Badminton", "Cricket", "AI", "Food Security", "Community Education"],
  achievements: "UGRAD Scholarship shortlisted, PURE Research Turkey accepted, Climate awareness campaign leader, Honhaar Scholarship, PM Laptop Scheme recipient",
  industrial_visits: "Nishat Sutas Dairy Industry, Cola Next Beverage Factory",
  mission: "Implement AI in food security, digital marketing, and agri-food systems"
};

class EnhancedChatBot {
  constructor() {
    this.chatMessages = [];
    this.isLoading = false;
    this.apiKey = "AQ.Ab8RN6IleFI9oE5HpJuhwPyBcJ1FN9wxlMQggJqFd-V-H8mrUA"; // Placeholder - will be replaced
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendBtn");
    
    sendBtn?.addEventListener("click", () => this.sendMessage());
    chatInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  }

  async sendMessage() {
    const chatInput = document.getElementById("chatInput");
    const message = chatInput?.value.trim();

    if (!message) return;

    this.addMessage(message, "user");
    chatInput.value = "";
    document.getElementById("chatSugs").innerHTML = "";

    this.showTyping();

    try {
      const response = await this.getResponse(message);
      this.removeTyping();
      this.addMessage(response, "bot");
    } catch (error) {
      console.error("Chat error:", error);
      this.removeTyping();
      const fallbackResponse = this.generateFallbackResponse(message);
      this.addMessage(fallbackResponse, "bot");
    }
  }

  async getResponse(userMessage) {
    // First, try to match with portfolio data
    const portfolioResponse = this.matchPortfolioData(userMessage);
    if (portfolioResponse) {
      return portfolioResponse;
    }

    // If API key is valid and not placeholder, try Gemini API
    if (this.apiKey && this.apiKey !== "AQ.Ab8RN6IleFI9oE5HpJuhwPyBcJ1FN9wxlMQggJqFd-V-H8mrUA") {
      try {
        return await this.callGeminiAPI(userMessage);
      } catch (error) {
        console.error("API Error:", error);
      }
    }

    // Fallback response
    return this.generateFallbackResponse(userMessage);
  }

  matchPortfolioData(message) {
    const msg = message.toLowerCase();

    // About Hassan
    if (msg.includes("who") || msg.includes("about") || msg.includes("introduce") || msg.includes("yourself")) {
      return `Hi! 👋 I'm ${PORTFOLIO_DATA.name}, a ${PORTFOLIO_DATA.education.degree} student at ${PORTFOLIO_DATA.education.university}. I'm passionate about AI, digital marketing, and food security. Currently maintaining a CGPA of ${PORTFOLIO_DATA.education.cgpa}. Feel free to ask me about my experience, skills, or projects!`;
    }

    // Contact information
    if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("reach") || msg.includes("call")) {
      return `📧 Email: ${PORTFOLIO_DATA.email}\n📱 Phone: ${PORTFOLIO_DATA.phone}\n📍 Location: ${PORTFOLIO_DATA.location}\nI'm open to collaborations, internships, and research opportunities!`;
    }

    // Education
    if (msg.includes("education") || msg.includes("degree") || msg.includes("university") || msg.includes("cgpa") || msg.includes("uaf")) {
      return `I'm pursuing ${PORTFOLIO_DATA.education.degree} from ${PORTFOLIO_DATA.education.university}. I'm in my ${PORTFOLIO_DATA.education.semester} (Expected graduation: 2027) with a CGPA of ${PORTFOLIO_DATA.education.cgpa}. My focus is on food science, AI applications, and digital marketing.`;
    }

    // Experience
    if (msg.includes("experience") || msg.includes("work") || msg.includes("job") || msg.includes("ypdc") || msg.includes("school") || msg.includes("youtube")) {
      let exp = "My professional experience includes:\n\n";
      PORTFOLIO_DATA.experience.forEach(job => {
        exp += `💼 **${job.role}** at ${job.company}\n(${job.period})\n${job.desc}\n\n`;
      });
      return exp;
    }

    // Skills
    if (msg.includes("skill") || msg.includes("expertise") || msg.includes("what can") || msg.includes("proficient")) {
      return `My key skills include:\n${PORTFOLIO_DATA.skills.map(s => `✓ ${s}`).join("\n")}\n\nI'm also skilled in project management and have 3+ years of professional experience.`;
    }

    // Certifications
    if (msg.includes("certificate") || msg.includes("meta") || msg.includes("certified") || msg.includes("coursera") || msg.includes("training")) {
      return `🎓 I have ${PORTFOLIO_DATA.certifications}. I'm continuously learning with courses from Oxford, IBM, Microsoft, Google, Meta, and other leading institutions. 41+ verified professional certificates!`;
    }

    // Interests/Sports
    if (msg.includes("interest") || msg.includes("hobby") || msg.includes("sport") || msg.includes("badminton") || msg.includes("cricket")) {
      return `🏅 I'm passionate about ${PORTFOLIO_DATA.interests.join(", ")}. I've participated at Tehsil level in badminton and cricket. Sports help me stay disciplined and focused, which I apply to my professional work as well!`;
    }

    // Projects/Industrial Visits
    if (msg.includes("project") || msg.includes("visit") || msg.includes("industrial") || msg.includes("dairy") || msg.includes("cola") || msg.includes("beverage")) {
      return `🏭 As a Food Science student, I've participated in industrial visits to:\n\n🥛 ${PORTFOLIO_DATA.industrial_visits.split(", ")[0]} - Studied dairy processing, pasteurization, HACCP\n🥤 ${PORTFOLIO_DATA.industrial_visits.split(", ")[1]} - Observed beverage manufacturing and QC standards\n\nThese experiences gave me practical knowledge of production processes and food safety!`;
    }

    // Availability/Internship
    if (msg.includes("intern") || msg.includes("available") || msg.includes("hire") || msg.includes("opportunity") || msg.includes("collaboration")) {
      return `✨ I'm open to:\n• Internship opportunities\n• Research collaborations\n• Digital marketing projects\n• AI implementation in food science\n• Community development initiatives\n\nLet's connect at ${PORTFOLIO_DATA.email} to discuss opportunities!`;
    }

    // Mission/Goals
    if (msg.includes("mission") || msg.includes("goal") || msg.includes("future") || msg.includes("passion")) {
      return `🎯 My mission: ${PORTFOLIO_DATA.mission}\n\nI believe AI and digital tools can revolutionize food security and agricultural systems, especially in developing countries like Pakistan.`;
    }

    // Achievements
    if (msg.includes("achievement") || msg.includes("award") || msg.includes("recognition")) {
      return `🏆 Key achievements:\n${PORTFOLIO_DATA.achievements}\n\nI'm also proud of my free education initiative and community service through medical camps!`;
    }

    // General portfolio questions
    if (msg.includes("portfolio") || msg.includes("hassan") || msg.includes("linkedin")) {
      return `📍 You can learn more about me through:\n• This portfolio website\n• LinkedIn: linkedin.com/in/m-hassan-007i\n• Email: ${PORTFOLIO_DATA.email}\n\nWhat would you like to know more about?`;
    }

    return null;
  }

  async callGeminiAPI(userMessage) {
    const context = `You are Hassan Akram's AI portfolio assistant. Hassan is a Food Science student at UAF with CGPA 3.60, Meta Certified Digital Marketing Associate with 41+ certificates. Answer questions about him concisely (under 120 words). Be enthusiastic and professional. Portfolio info: ${JSON.stringify(PORTFOLIO_DATA)}`;

    const requestBody = {
      system_instruction: {
        parts: [{ text: context }]
      },
      contents: [
        {
          parts: [{ text: userMessage }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7
      }
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    throw new Error("No response from API");
  }

  generateFallbackResponse(message) {
    const responses = [
      `That's a great question! I found relevant information about "${message.substring(0, 20)}..." in Hassan's portfolio. Try asking about his education, skills, experience, or certifications!`,
      `I'm here to help! Feel free to ask Hassan about:\n• His background & education\n• Skills & certifications\n• Experience & projects\n• How to contact him\n\nWhat interests you most?`,
      `I appreciate the question! While I may not have specific details, Hassan is always happy to discuss this further. Reach out at ${PORTFOLIO_DATA.email}! 😊`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  addMessage(text, sender) {
    const chatMsgs = document.querySelector(".chat-msgs");
    if (!chatMsgs) return;

    const messageEl = document.createElement("div");
    messageEl.className = `msg ${sender}`;
    messageEl.innerHTML = text.replace(/\n/g, "<br>");
    chatMsgs.appendChild(messageEl);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }

  showTyping() {
    const chatMsgs = document.querySelector(".chat-msgs");
    if (!chatMsgs) return;

    const typingEl = document.createElement("div");
    typingEl.className = "msg bot typing-dots";
    typingEl.innerHTML = '<span></span><span></span><span></span>';
    typingEl.id = "typing-indicator";
    chatMsgs.appendChild(typingEl);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }

  removeTyping() {
    const typingEl = document.getElementById("typing-indicator");
    typingEl?.remove();
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.chatbot = new EnhancedChatBot();
  });
} else {
  window.chatbot = new EnhancedChatBot();
}
