// pages/privacy-policy-en.jsx
import React from "react";
import { useRouter } from "next/router";

export default function PrivacyPolicyEn() {
  const router = useRouter();

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p>
        This website does not collect personal data from users and does not use
        profiling cookies or tracking technologies.
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Third-party services</h2>
      <ul className="list-disc ml-6">
        <li>
          <strong>Google Maps:</strong> The "Where to find us" section includes
          an interactive map via Google Maps. Google may collect data according
          to its own{" "}
          <a
            href="https://policies.google.com/privacy"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          . No data is collected directly by the site owner.
        </li>
        <li>
          <strong>Instagram:</strong> The site contains a link to the store's
          Instagram profile. No data is collected by the site; access to
          Instagram is external and regulated by Instagram’s policies.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-4 mb-2">Contact</h2>
      <p>
        For any information, requests or notifications, please write to:
        <br />
        <a href="mailto:federico.ribaldi97@gmail.com" className="underline">
          federico.ribaldi97@gmail.com
        </a>
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Data controller</h2>
      <p>
        Federico Ribaldi
        <br />
        Email:{" "}
        <a href="mailto:federico.ribaldi97@gmail.com" className="underline">
          federico.ribaldi97@gmail.com
        </a>
      </p>
      <hr className="my-6" />
      <small>Last updated: May 2025</small>
      <div className="mt-8">
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
