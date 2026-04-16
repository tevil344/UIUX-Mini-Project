import React, { useState } from "react";
import { BookOpen, MessageSquare, Trash2, User, X, AlertCircle } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { DEFAULT_USER_PROFILE } from "../../data/mockUsers";
import { COLORS } from "../../constants/ui";

function Input({ label, placeholder, type = "text", defaultValue, value, onChange, error, id }) {
  return (
    <div className="mb-4 text-left">
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/50 dark:bg-slate-700 dark:text-slate-100 ${
          error ? "border-red-400 bg-red-50 dark:bg-red-900/20" : "border-slate-200 dark:border-slate-600"
        }`}
      />
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

function ModalShell({
  title,
  children,
  onSave,
  btnText,
  btnColor = COLORS.primary,
  icon,
  onClose,
}) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="w-full max-w-md animate-fade-in-up overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-800"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-700">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100">
              {title}
            </h3>
          </div>
          <button
            className="text-slate-400 transition-colors hover:text-slate-700 focus:outline-none dark:text-slate-500 dark:hover:text-slate-300"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        <div className="bg-slate-50/50 p-6 dark:bg-slate-800/50">{children}</div>
        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/80">
          <button
            className="text-sm font-bold text-slate-600 transition-colors hover:text-slate-800 focus:outline-none dark:text-slate-300 dark:hover:text-slate-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-xl px-5 py-2 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: btnColor }}
            onClick={onSave}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}

function SubmitAssignmentModal({ onClose }) {
  const { showToast } = useAppContext();
  const [assignmentName, setAssignmentName] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};
    if (!assignmentName.trim()) {
      newErrors.assignmentName = "Assignment name is required.";
    }
    if (!file) {
      newErrors.file = "Please upload a file before submitting.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onClose();
    showToast("Assignment submitted successfully", "ok");
  };

  return (
    <ModalShell
      title="Submit Assignment"
      icon={<BookOpen size={20} className="text-[#4C6EF5]" />}
      btnText="Submit"
      onSave={handleSubmit}
      onClose={onClose}
    >
      <Input
        id="submit-assignment-name"
        label="Assignment Name"
        placeholder="e.g. Assignment 9"
        value={assignmentName}
        onChange={(e) => { setAssignmentName(e.target.value); setErrors(p => ({ ...p, assignmentName: null })); }}
        error={errors.assignmentName}
      />
      <div className="mb-4 text-left">
        <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-300">
          Subject
        </label>
        <select className="w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100">
          {["UI/UX Lab", "Web Development", "Cloud Computing"].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="mb-2 text-left">
        <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-300">
          Upload File
        </label>
        <input
          id="submit-file-upload"
          type="file"
          onChange={(e) => { setFile(e.target.files[0] || null); setErrors(p => ({ ...p, file: null })); }}
          className={`w-full cursor-pointer rounded-lg border px-2 py-1.5 text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[#e8edff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#4C6EF5] dark:text-slate-400 dark:file:bg-[#4C6EF5]/20 ${
            errors.file ? "border-red-400 bg-red-50" : "border-slate-200"
          }`}
        />
        {errors.file && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
            <AlertCircle size={12} /> {errors.file}
          </p>
        )}
      </div>
    </ModalShell>
  );
}

function ProfileModal({ onClose }) {
  const { showToast, user } = useAppContext();
  const [name, setName] = useState(user?.name || DEFAULT_USER_PROFILE.name);
  const [email, setEmail] = useState(user?.email || DEFAULT_USER_PROFILE.email);
  const [errors, setErrors] = useState({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSave = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Full name cannot be empty.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!EMAIL_RE.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onClose();
    showToast("Profile saved successfully", "ok");
  };

  return (
    <ModalShell
      title="Edit Profile"
      icon={<User size={20} className="text-[#4C6EF5]" />}
      btnText="Save Profile"
      onSave={handleSave}
      onClose={onClose}
    >
      <Input
        id="profile-name"
        label="Full Name"
        value={name}
        onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: null })); }}
        error={errors.name}
      />
      <Input
        id="profile-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: null })); }}
        error={errors.email}
      />
    </ModalShell>
  );
}

export default function Modals() {
  const { activeModal, setActiveModal, showToast } = useAppContext();
  const closeModal = () => setActiveModal(null);

  if (activeModal === "submit-modal") {
    return <SubmitAssignmentModal onClose={closeModal} />;
  }

  if (activeModal === "confirm-clear-modal") {
    return (
      <ModalShell
        title="Clear Drafts"
        icon={<Trash2 size={20} className="text-red-500" />}
        btnText="Clear"
        btnColor={COLORS.error}
        onSave={() => {
          closeModal();
          showToast("Drafts cleared successfully", "ok");
        }}
        onClose={closeModal}
      >
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Are you sure you want to clear all your unsaved assignment drafts?
          This action cannot be undone.
        </p>
      </ModalShell>
    );
  }

  if (activeModal === "profile-modal") {
    return <ProfileModal onClose={closeModal} />;
  }

  if (activeModal === "mentor-modal") {
    return (
      <ModalShell
        title="Ask Your Mentor"
        icon={<MessageSquare size={20} className="text-[#4C6EF5]" />}
        btnText="Send"
        onSave={() => {
          closeModal();
          showToast("Message sent successfully", "ok");
        }}
        onClose={closeModal}
      >
        <Input id="mentor-subject" label="Subject" placeholder="e.g. Doubt regarding logic" />
        <div className="mb-4 text-left">
          <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-300">
            Message
          </label>
          <textarea className="h-24 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/50 dark:border-slate-600 dark:bg-slate-700" />
        </div>
      </ModalShell>
    );
  }

  return null;
}
