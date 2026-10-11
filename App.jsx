import React, { useState, useEffect } from 'react';
import { storageService } from './services/storageService';
import { medicationService } from './services/medicationService';
import { authService } from './services/authService';

// Reusable Components
import SafetyNotice from './components/SafetyNotice';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';

// Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Maternal & Child Care Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import MedicationTracker from './pages/MedicationTracker';
import NearbyCare from './pages/NearbyCare';
import EmergencyHelp from './pages/EmergencyHelp';
import PregnancyCare from './pages/PregnancyCare';
import VaccinationSchedule from './pages/VaccinationSchedule';
import ChildNutrition from './pages/ChildNutrition';
import BreastfeedingSupport from './pages/BreastfeedingSupport';
import MaternalNutrition from './pages/MaternalNutrition';
import Appointments from './pages/Appointments';
import MedicalRecords from './pages/MedicalRecords';
import ProfileSettings from './pages/ProfileSettings';
import HealthWorkerDemo from './pages/HealthWorkerDemo';

export default function App() {
  // Device Language Preference
  const [lang, setLang] = useState(() => storageService.getLanguage());

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());
  const [authView, setAuthView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('register') || path.includes('register')) return 'register';
      if (hash.includes('landing') || path.includes('landing')) return 'landing';
    }
    return 'login';
  });

  // Partitioned User Healthcare Data States (isolated per currentUser.id)
  const [profile, setProfile] = useState(() => storageService.getProfile(currentUser?.id));
  const [medications, setMedications] = useState(() => storageService.getMedications(currentUser?.id));
  const [dailyDoses, setDailyDoses] = useState(() => storageService.getDailyDoses(currentUser?.id));
  const [appointments, setAppointments] = useState(() => storageService.getAppointments(currentUser?.id));
  const [records, setRecords] = useState(() => storageService.getMedicalRecords(currentUser?.id));
  const [contacts, setContacts] = useState(() => storageService.getContacts(currentUser?.id));
  const [growthRecords, setGrowthRecords] = useState(() => storageService.getGrowthRecords(currentUser?.id));
  const [preferredHospitalId, setPreferredHospitalId] = useState(() => storageService.getPreferredHospitalId(currentUser?.id));
  const [completedVaccines, setCompletedVaccines] = useState(() => storageService.getCompletedVaccines(currentUser?.id));

  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('login') || path.includes('login')) return 'login';
      if (hash.includes('register') || path.includes('register')) return 'register';
      if (hash.includes('landing') || path.includes('landing')) return 'landing';
      if (hash) return hash;
    }
    return 'dashboard';
  });

  // Re-sync all state when authenticated user changes
  useEffect(() => {
    if (currentUser?.id) {
      setProfile(storageService.getProfile(currentUser.id));
      setMedications(storageService.getMedications(currentUser.id));
      setDailyDoses(storageService.getDailyDoses(currentUser.id));
      setAppointments(storageService.getAppointments(currentUser.id));
      setRecords(storageService.getMedicalRecords(currentUser.id));
      setContacts(storageService.getContacts(currentUser.id));
      setGrowthRecords(storageService.getGrowthRecords(currentUser.id));
      setPreferredHospitalId(storageService.getPreferredHospitalId(currentUser.id));
      setCompletedVaccines(storageService.getCompletedVaccines(currentUser.id));
    }
  }, [currentUser?.id]);

  // Listen to auth state changes from other components or tabs
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Listen to URL hash changes for direct #login, #register, and page links
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'login') {
        setActivePage('login');
        setAuthView('login');
      } else if (hash === 'register') {
        setActivePage('register');
        setAuthView('register');
      } else if (hash === 'landing') {
        setActivePage('landing');
        setAuthView('landing');
      } else if (hash) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  // Sync language changes
  const handleToggleLang = () => {
    const nextLang = lang === "te" ? "en" : "te";
    setLang(nextLang);
    storageService.saveLanguage(nextLang);
  };

  // Auth Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setActivePage("dashboard");
    if (typeof window !== 'undefined') window.location.hash = 'dashboard';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterSuccess = (user) => {
    setCurrentUser(user);
    setActivePage("dashboard");
    if (typeof window !== 'undefined') window.location.hash = 'dashboard';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await authService.signOut();
    setCurrentUser(null);
    setAuthView("login");
    setActivePage("login");
    if (typeof window !== 'undefined') window.location.hash = 'login';

    // Clear sensitive in-memory records
    setProfile({});
    setMedications([]);
    setDailyDoses({});
    setAppointments([]);
    setRecords([]);
    setContacts([]);
    setGrowthRecords([]);
    setCompletedVaccines({});

    // Prevent back-forward navigation cache exposure
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleLoadSampleData = () => {
    if (!currentUser?.id) return;
    storageService.seedSampleDataForUser(currentUser.id);
    setProfile(storageService.getProfile(currentUser.id));
    setMedications(storageService.getMedications(currentUser.id));
    setDailyDoses(storageService.getDailyDoses(currentUser.id));
    setAppointments(storageService.getAppointments(currentUser.id));
    setRecords(storageService.getMedicalRecords(currentUser.id));
    setContacts(storageService.getContacts(currentUser.id));
    setGrowthRecords(storageService.getGrowthRecords(currentUser.id));
    setPreferredHospitalId(storageService.getPreferredHospitalId(currentUser.id));
    setCompletedVaccines(storageService.getCompletedVaccines(currentUser.id));
  };

  // Medication handlers (isolated by currentUser.id)
  const handleUpdateDose = (medId, status) => {
    const updatedDoses = medicationService.updateDoseStatus(medId, status, null, currentUser?.id);
    setDailyDoses({ ...updatedDoses });
  };

  const handleAddPrescription = (newMed) => {
    const updated = [newMed, ...medications];
    setMedications(updated);
    storageService.saveMedications(updated, currentUser?.id);
  };

  const handleDeletePrescription = (medId) => {
    const updated = medications.filter(m => m.id !== medId);
    setMedications(updated);
    storageService.saveMedications(updated, currentUser?.id);
  };

  // Hospital handlers
  const handleSetPreferredHospital = (id) => {
    setPreferredHospitalId(id);
    storageService.savePreferredHospitalId(id, currentUser?.id);
  };

  // Profile handler
  const handleSaveProfile = (newProfile) => {
    setProfile(newProfile);
    storageService.saveProfile(newProfile, currentUser?.id);
  };

  const handleUpdateLmp = (newLmp) => {
    const updated = { ...profile, lmpDate: newLmp };
    setProfile(updated);
    storageService.saveProfile(updated, currentUser?.id);
  };

  // Vaccine handler
  const handleToggleVaccine = (vaccineId, completionData) => {
    const current = { ...completedVaccines };
    if (completionData) {
      current[vaccineId] = completionData;
    } else {
      delete current[vaccineId];
    }
    setCompletedVaccines(current);
    storageService.saveCompletedVaccines(current, currentUser?.id);
  };

  // Appointments handlers
  const handleAddAppointment = (newApt) => {
    const updated = [newApt, ...appointments];
    setAppointments(updated);
    storageService.saveAppointments(updated, currentUser?.id);
  };

  const handleToggleCompleteAppointment = (aptId) => {
    const updated = appointments.map(a => {
      if (a.id === aptId) {
        return {
          ...a,
          status: a.status === "completed" ? "scheduled" : "completed"
        };
      }
      return a;
    });
    setAppointments(updated);
    storageService.saveAppointments(updated, currentUser?.id);
  };

  const handleDeleteAppointment = (aptId) => {
    const updated = appointments.filter(a => a.id !== aptId);
    setAppointments(updated);
    storageService.saveAppointments(updated, currentUser?.id);
  };

  // Medical Record handlers
  const handleAddRecord = (newRec) => {
    const updated = [newRec, ...records];
    setRecords(updated);
    storageService.saveMedicalRecords(updated, currentUser?.id);
  };

  const handleDeleteRecord = (recId) => {
    const updated = records.filter(r => r.id !== recId);
    setRecords(updated);
    storageService.saveMedicalRecords(updated, currentUser?.id);
  };

  // Contacts handlers
  const handleAddContact = (newContact) => {
    const updated = [...contacts, newContact];
    setContacts(updated);
    storageService.saveContacts(updated, currentUser?.id);
  };

  const handleDeleteContact = (contactId) => {
    const updated = contacts.filter(c => c.id !== contactId);
    setContacts(updated);
    storageService.saveContacts(updated, currentUser?.id);
  };

  // Growth handler
  const handleAddGrowthRecord = (newGrowth) => {
    const updated = [...growthRecords, newGrowth];
    setGrowthRecords(updated);
    storageService.saveGrowthRecords(updated, currentUser?.id);
  };

  // Reset demo data handler (isolated to active user)
  const handleResetData = () => {
    storageService.resetAllData(currentUser?.id);
    setProfile(storageService.getProfile(currentUser?.id));
    setMedications(storageService.getMedications(currentUser?.id));
    setDailyDoses(storageService.getDailyDoses(currentUser?.id));
    setAppointments(storageService.getAppointments(currentUser?.id));
    setRecords(storageService.getMedicalRecords(currentUser?.id));
    setContacts(storageService.getContacts(currentUser?.id));
    setGrowthRecords(storageService.getGrowthRecords(currentUser?.id));
    setPreferredHospitalId(storageService.getPreferredHospitalId(currentUser?.id));
    setCompletedVaccines(storageService.getCompletedVaccines(currentUser?.id));
  };

  const handleNavigatePage = (pageId) => {
    setActivePage(pageId);
    if (pageId === 'login' || pageId === 'register' || pageId === 'landing') {
      setAuthView(pageId);
    }
    if (typeof window !== 'undefined') {
      window.location.hash = pageId;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------------------------------------------------
  // STRICT AUTHENTICATION BARRIER:
  // If user is not authenticated, render ONLY Login, Register, or Landing screens.
  // Dashboard, Voice Assistant, and healthcare records are locked out.
  // -------------------------------------------------------------
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <SafetyNotice lang={lang} />
        {/* Full Top Header with Language Toggle, SOS, and Auth Buttons */}
        <Navbar
          profile={{ name: "Guest", stage: "pregnant" }}
          currentUser={null}
          onLogout={handleLogout}
          lang={lang}
          onToggleLang={handleToggleLang}
          onOpenEmergency={() => setActivePage("emergency")}
          onNavigatePage={(p) => {
            if (p === 'register') setAuthView('register');
            else if (p === 'landing') setAuthView('landing');
            else setAuthView('login');
          }}
          activePage={authView}
        />

        <div className="flex-1 flex flex-col justify-center">
          {authView === 'register' ? (
            <RegisterPage
              onRegisterSuccess={handleRegisterSuccess}
              onNavigateToLogin={() => setAuthView('login')}
              lang={lang}
              onToggleLang={handleToggleLang}
            />
          ) : authView === 'landing' ? (
            <div className="max-w-5xl mx-auto p-4 sm:p-6 w-full">
              <LandingPage
                onGetStarted={() => setAuthView('login')}
                onNavigatePage={(p) => {
                  if (p === 'register') setAuthView('register');
                  else setAuthView('login');
                }}
                lang={lang}
              />
            </div>
          ) : (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onNavigateToRegister={() => setAuthView('register')}
              lang={lang}
              onToggleLang={handleToggleLang}
            />
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED MATERNAL DASHBOARD & HEALTHCARE APPLICATION
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Persistent Medical Safety Banner */}
      <SafetyNotice lang={lang} />

      {/* Main Top Header with User Badge & Logout */}
      <Navbar
        profile={profile}
        currentUser={currentUser}
        onLogout={handleLogout}
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenEmergency={() => handleNavigatePage("emergency")}
        onNavigatePage={handleNavigatePage}
        activePage={activePage}
      />

      {/* Application Layout: Desktop Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-20 md:pb-8">
        {/* Desktop Sidebar with User Card & Logout */}
        <Sidebar
          activePage={activePage}
          onNavigatePage={handleNavigatePage}
          lang={lang}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl overflow-hidden">
          {activePage === "login" && (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onNavigateToRegister={() => handleNavigatePage("register")}
              lang={lang}
              onToggleLang={handleToggleLang}
            />
          )}

          {activePage === "register" && (
            <RegisterPage
              onRegisterSuccess={handleRegisterSuccess}
              onNavigateToLogin={() => handleNavigatePage("login")}
              lang={lang}
              onToggleLang={handleToggleLang}
            />
          )}

          {activePage === "landing" && (
            <LandingPage
              onGetStarted={() => handleNavigatePage("dashboard")}
              onNavigatePage={handleNavigatePage}
              lang={lang}
            />
          )}

          {activePage === "dashboard" && (
            <Dashboard
              profile={profile}
              medications={medications}
              dailyDoses={dailyDoses}
              appointments={appointments}
              records={records}
              preferredHospitalId={preferredHospitalId}
              onUpdateDose={handleUpdateDose}
              onNavigatePage={handleNavigatePage}
              onOpenEmergency={() => handleNavigatePage("emergency")}
              lang={lang}
            />
          )}

          {activePage === "medications" && (
            <MedicationTracker
              medications={medications}
              dailyDoses={dailyDoses}
              onUpdateDose={handleUpdateDose}
              onAddPrescription={handleAddPrescription}
              onDeletePrescription={handleDeletePrescription}
              lang={lang}
            />
          )}

          {activePage === "hospitals" && (
            <NearbyCare
              preferredHospitalId={preferredHospitalId}
              onSetPreferredHospital={handleSetPreferredHospital}
              lang={lang}
            />
          )}

          {activePage === "emergency" && (
            <EmergencyHelp
              contacts={contacts}
              onAddContact={handleAddContact}
              onDeleteContact={handleDeleteContact}
              preferredHospitalId={preferredHospitalId}
              lang={lang}
            />
          )}

          {activePage === "pregnancy" && (
            <PregnancyCare
              profile={profile}
              onUpdateLmp={handleUpdateLmp}
              onNavigatePage={handleNavigatePage}
              lang={lang}
            />
          )}

          {activePage === "vaccination" && (
            <VaccinationSchedule
              profile={profile}
              completedVaccines={completedVaccines}
              onToggleVaccine={handleToggleVaccine}
              lang={lang}
            />
          )}

          {activePage === "child-nutrition" && (
            <ChildNutrition
              profile={profile}
              growthRecords={growthRecords}
              onAddGrowthRecord={handleAddGrowthRecord}
              lang={lang}
            />
          )}

          {activePage === "breastfeeding" && (
            <BreastfeedingSupport
              profile={profile}
              lang={lang}
            />
          )}

          {activePage === "maternal-nutrition" && (
            <MaternalNutrition
              profile={profile}
              lang={lang}
            />
          )}

          {activePage === "appointments" && (
            <Appointments
              appointments={appointments}
              onAddAppointment={handleAddAppointment}
              onToggleComplete={handleToggleCompleteAppointment}
              onDeleteAppointment={handleDeleteAppointment}
              lang={lang}
            />
          )}

          {activePage === "records" && (
            <MedicalRecords
              records={records}
              onAddRecord={handleAddRecord}
              onDeleteRecord={handleDeleteRecord}
              lang={lang}
            />
          )}

          {activePage === "profile" && (
            <ProfileSettings
              profile={profile}
              currentUser={currentUser}
              onLogout={handleLogout}
              onLoadSampleData={handleLoadSampleData}
              onSaveProfile={handleSaveProfile}
              onResetData={handleResetData}
              preferredHospitalId={preferredHospitalId}
              onSetPreferredHospital={handleSetPreferredHospital}
              lang={lang}
              onToggleLang={handleToggleLang}
            />
          )}

          {activePage === "asha" && (
            <HealthWorkerDemo
              lang={lang}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activePage={activePage}
        onNavigatePage={handleNavigatePage}
        lang={lang}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

    </div>
  );
}
