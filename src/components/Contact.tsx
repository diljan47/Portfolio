"use client";

import { useState } from "react";

export default function ContactComp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mailtoUrl = `mailto:mail@abyditya.space?subject=Portfolio Contact from ${formData.name}&body=From: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = mailtoUrl;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="mb-16 md:mb-32">
      <h2 className="font-mono text-3xl md:text-5xl mb-8 md:mb-12 font-bold">
        [ 002 ]<br />
        Get In Touch
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="space-y-2">
            <label className="font-mono text-sm md:text-base">
              01 What&apos;s Your Name?
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name*"
              required
              className="w-full border-b border-neutral-300 py-2 text-sm md:text-base focus:outline-none font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-sm md:text-base">
              02 What&apos;s Your Mail?
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com *"
              required
              className="w-full border-b border-neutral-300 py-2 text-sm md:text-base focus:outline-none font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-sm md:text-base">
              03 Your Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Content...*"
              required
              className="w-full border-b border-neutral-300 py-2 text-sm md:text-base focus:outline-none font-mono"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="border border-black px-4 md:px-6 py-2 text-sm md:text-base hover:bg-black hover:text-white transition-colors font-mono"
          >
            [ Send Message ]
          </button>
        </form>

        <div className="font-mono text-sm md:text-base ">
          <h2 className="font-semibold">[ CONTACT INFORMATION ]</h2>
          <div className="mt-4 space-y-2 text-neutral-600">
            <p>Trivandrum, Kerala</p>
            <p className="font-normal">{process.env.NEXT_PUBLIC_EMAIL}</p>
          </div>
          <div className="mt-6 md:mt-8 space-y-2">
            <p className="font-semibold">[ MY SOCIALS ]</p>
            <a
              href={process.env.NEXT_PUBLIC_LINKEDIN_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-accent-blue"
            >
              / LinkedIn
            </a>
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-accent-blue"
            >
              / Github
            </a>
            <a
              href={process.env.NEXT_PUBLIC_GOOGLE_DRIVE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-accent-blue"
            >
              / Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
