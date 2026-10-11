# GramaMaa AI — Your Mother & Child Care Companion
### గ్రామీణ మాతా శిశు సంరక్షణ సహచరి

> **"Care for Every Mother. Support for Every Child."**  
> **"ప్రతి తల్లికి సంరక్షణ. ప్రతి బిడ్డకు ఆసరా."**

GramaMaa AI is an AI-assisted maternal and child healthcare support and coordination platform designed specifically for pregnant women, new mothers, infants, and young children in rural and semi-urban India.

The platform streamlines maternal journeys from pregnancy planning and antenatal care through labor, delivery, breastfeeding, postpartum recovery, official Indian Universal Immunization Programme (UIP/NIS) vaccination schedules, child growth monitoring, doctor-prescribed medication adherence, and 24/7 nearby hospital and emergency coordination.

---

## 🌟 Key Features

### 1. Doctor-Prescribed Medication & Daily Adherence Tracker (User Requested Feature)
- **Clinical Prescription Management**: Tracks doctor-prescribed medications (Iron & Folic Acid / IFA, Calcium + Vitamin D3, Folic Acid, Thyroxine, Multivitamins) with dosage amounts, prescribing doctor, and timing slots (Morning 🌅, Afternoon ☀️, Evening 🌇, Night 🌙).
- **Daily Tick (✅ Taken) vs Cross (❌ Missed)**: 1-tap marking for each scheduled dose today. Immediate visual confirmation (green tick checkmark vs red cross alert) to ensure pregnant mothers and caregivers know whether medicines were taken.
- **7-Day Compliance History & Streak**: Shows adherence percentage and past 7 days' daily compliance icons.
- **Doctor Instructions & Clinical Safety**: Highlights critical clinical guidelines, such as taking iron with water at night and keeping a 2-hour gap between Calcium and Iron tablets.

### 2. Nearby Hospitals & Gynecologists Directory (User Requested Feature)
- **Directory & Filters**:
  - Government Primary Health Centres (PHCs) & Community Health Centres (CHCs) with free maternity delivery schemes (Janani Suraksha Yojana, KCR Kit, YSR Aarogyasri, Ayushman Bharat).
  - 24/7 Maternity Hospitals with Level-2/3 NICU, modular labor suites, and blood bank tie-ups.
  - Specialist Gynecologists & Obstetrician clinics.
- **1-Tap Direct Actions**:
  - **Call Facility** (`tel:` link with safety confirmation modal).
  - **Directions** (Opens direct Google Maps navigation in a new tab).
  - **Set as Preferred Hospital** (Syncs with the Emergency SOS dashboard).
- **Emergency Ambulance Shortcuts**: Instant speed-dial links to **108 Medical Ambulance** and **102 Janani Shishu Express**.

### 3. Telugu & English Voice Assistant (Core Feature)
- **Web Speech API (`te-IN` and `en-IN`)**:
  - Real-time speech recognition for Telugu and English.
  - Text-to-Speech (TTS) response playback via `speechSynthesis` with Telugu voice preference.
- **Voice Commands Supported**:
  - *"నా ఈరోజు మందులు ఏవి?"* / *"What are my medicines today?"* -> Opens Daily Medicines.
  - *"దగ్గర్లోని ఆసుపత్రి ఎక్కడ?"* / *"Show nearby hospitals"* -> Opens Nearby Hospitals.
  - *"నా తర్వాతి చెకప్ ఎప్పుడు?"* / *"When is my next checkup?"* -> Opens Appointments.
  - *"నా బిడ్డకు తర్వాతి టీకా ఎప్పుడు?"* / *"Show my baby's vaccine schedule"* -> Opens NIS Vaccines.
  - *"పాలివ్వడంలో సమస్య ఉంది"* / *"I need breastfeeding help"* -> Opens Breastfeeding Guide.
  - *"అత్యవసర సహాయం"* / *"Emergency help"* -> Immediately triggers Emergency SOS screen.
- **Fallback Support**: Text input box with interactive suggestion chips if microphone access is unavailable or unsupported.

### 4. Official Indian Vaccination Scheduler (NIS / UIP)
- **Official Guidance**: Based on the Universal Immunization Programme (UIP), Ministry of Health & Family Welfare (MoHFW), Government of India.
- **Full Timeline**: From birth (BCG, OPV-0, Hep-B) through 6w, 10w, 14w, 9-12m, 16-24m, and 5-6y.
- **Status Badges**: Scheduled, Completed, Overdue, and Needs Verification.
- **Caregiver Confirmation**: Mark doses complete with caregiver / health worker verification.
- **Printable Card**: 1-click printable vaccination summary for clinical visits.

### 5. Labour & Delivery Emergency SOS (112)
- **Instant Speed-Dial**: National Emergency Helpline **112**, Ambulance **108**, Janani Shishu **102**.
- **Trusted Family Contacts**: Store husband, mother, ASHA worker; 1-tap call confirmation.
- **Live GPS Sharing**: Captures device GPS coordinates with user permission and generates a pre-formatted WhatsApp / SMS message for rapid family assistance.
- **Hospital Bag & Birth Checklist**: Interactive printable checklist covering MCP card, Aadhaar, baby swaddles, maternity pads, and clean clothes.
- **Critical Danger Signs**: Immediate clinical guidance for vaginal bleeding, severe continuous abdominal pain, convulsions, or water breaking.

### 6. Child Nutrition & Growth Monitoring
- **Age-Specific Guidelines**: Follows WHO guidelines (0-6 months exclusive breastfeeding; 6-8m mashed soft foods; 9-11m minced foods; 12-24m family foods).
- **Affordable Indian Foods**: Ragi malt, Moong dal khichdi, mashed banana, soft-boiled egg, curd, seasonal fruits.
- **Interactive Growth Curve (Recharts)**: Visualizes child's weight trend (kg) compared against WHO median reference standards.
- **Feeding Diary**: Logs meals and baby digestion reactions.

### 7. Breastfeeding & Maternal Nutrition
- **Latch Guides**: Visual instructions on C-hold, wide open latch, and nose clearance.
- **Common Challenges**: Engorgement relief, nipple soreness care, and feeding frequency advice.
- **Guided Concern Form**: Category, duration, and option to request an ASHA worker home visit.
- **Maternal Diet Planner**: Trimester 1/2/3 and postpartum lactation meal plans with a 1-tap **"Swap Meal"** button for local alternatives.
- **Daily Hydration Tracker**: 1-tap glass counter to maintain 8-10 glasses daily.

### 8. Centralized Appointment Calendar
- Unified view of ANC visits, ultrasound scans, TT injections, and pediatric checkups.
- Add, complete, and delete appointments with in-app reminders.

### 9. Medical Records Organizer
- Store ultrasound scans, blood test reports, and doctor prescription slips.
- Simulated client-side OCR extraction note with clinical review disclaimer.
- Search and filter by category (Ultrasound, Blood Tests, Prescriptions).

### 10. ASHA Health Worker Demonstration Portal
- Demonstration roster of 4 village beneficiaries.
- High-risk flags (Anemia, High BP / Pre-eclampsia, Vaccine Defaulters).
- Medication adherence compliance monitoring.

---

## 🔒 Medical Safety & Non-Diagnostic Guarantee

> [!IMPORTANT]
> GramaMaa AI is an assistive healthcare support and coordination platform. It does not replace a doctor, midwife, or emergency response service.
> - **Never diagnoses diseases** or miscarriages.
> - **Never guarantees fetal health** based on symptoms alone.
> - **Never prescribes medicines** or modifies clinical dosages.
> - **Directs urgent warning signs immediately** to emergency services (112 / 108).
> - **Maintains a persistent safety notice** on every page.

---

## 💻 Technology Stack

- **Frontend**: React 18 with Vite 5
- **Styling**: Tailwind CSS 3.4 with custom soft teal, sage green, and peach accents
- **Icons**: Lucide React
- **Data Visualization**: Recharts 2.15 (interactive growth curves)
- **Voice Engine**: Web Speech API (`webkitSpeechRecognition` & `speechSynthesis`) configured for `te-IN` and `en-IN`
- **Persistence**: Browser `localStorage` (Offline-ready, zero external tracking)
- **Fonts**: Google Fonts (`Inter` and `Noto Sans Telugu` Unicode font stack)

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js version 18.x or 20.x
- npm version 9.x or 10.x

### Installation
1. Clone or navigate to the repository directory:
   ```bash
   cd c:\Users\HP\Desktop\hackathon1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Production Build
To create an optimized production build:
```bash
npm run build
```
The output files will be generated in the `dist/` directory, ready to deploy to Vercel, Netlify, Firebase Hosting, or Cloudflare Pages.

To preview the production build locally:
```bash
npm run preview
```

---

## 🧪 Testing Checklist

- [x] **Language Switching**: Toggle between English and తెలుగు; verify all navigation, buttons, and clinical instructions update seamlessly.
- [x] **Medication Tracking**: Mark Morning/Night doses as ✅ Taken or ❌ Missed; verify adherence progress bar and 7-day compliance history update in real-time.
- [x] **Add Prescription**: Click "Add Prescription", enter a custom medicine and time slot; verify it appears in today's dosage card.
- [x] **Nearby Hospitals**: Filter by Government PHC, Maternity Hospital, and Gynecologists; test "Call" button opens confirmation dialog and "Directions" opens Google Maps.
- [x] **Emergency SOS**: Test 112 speed-dial, trusted contacts calling, and "Get GPS Location" workflow.
- [x] **Vaccination Schedule**: Filter by Completed / Overdue / Upcoming; mark a dose given with caregiver verification.
- [x] **Child Growth Curve**: Switch between Food Guide and Growth Chart; verify Recharts rendering child weight against WHO median.
- [x] **Voice Assistant**: Tap microphone or type a query in Telugu (*"నా ఈరోజు మందులు ఏవి?"*) or English (*"When is my next checkup?"*); verify spoken/written response and automatic page navigation.
- [x] **Offline & Reset**: Refresh browser to verify all records persist in `localStorage`. Go to Profile -> "Reset Demo Data" to restore initial state.

---

## 🌐 Optional AI & Backend Integration (Future Extension)

To integrate a production Large Language Model (e.g., Google Gemini API via a secure backend proxy):

1. **Create a Server-Side Proxy**:
   Create a lightweight backend service (Node.js/Express, Firebase Cloud Functions, or Supabase Edge Functions).
2. **Environment Variables**:
   In your backend `.env` file:
   ```env
   GEMINI_API_KEY=your_secure_api_key_here
   PORT=5000
   ```
   *Never place API keys directly in client-side Vite code (`VITE_...`)*.
3. **Endpoint**:
   Expose an endpoint `/api/voice-query` that applies GramaMaa AI's strict healthcare system prompt (safety rules, non-diagnostic boundaries) before querying the model.

---

## 📄 License
This project is open-source under the MIT License for educational and community maternal healthcare advancement.
