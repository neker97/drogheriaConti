/* eslint-disable prettier/prettier */
import React from "react";

import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

import { useLanguage } from "../utils/LanguageContext";

const labels = {
  it: {
    opening: "Orari di apertura:",
    phone: "Telefono:",
    map: "Vedi su Google Maps",
  },
  en: {
    opening: "Opening hours:",
    phone: "Phone:",
    map: "See on Google Maps",
  },
};

const Features = () => {
  const { config, lang } = useLanguage();
  const { features } = config;
  const { title, subtitle, description, items } = features;

  const address =
    items.find((item) => item.name.toLowerCase().includes("indirizzo"))
      ?.description || "";
  const opening =
    items.find((item) => item.name.toLowerCase().includes("orari"))
      ?.description || "";
  const phone =
    items.find((item) => item.name.toLowerCase().includes("telefono"))
      ?.description || "";

  const gmapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  const gmapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;

  const currentLabels = lang === "en" ? labels.en : labels.it;

  return (
    <section className="py-16 bg-background" id="features">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            {title}
          </h2>
          <p className="mt-2 text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {subtitle}
          </p>
          <p className="mt-4 max-w-2xl text-2xl text-gray-500 lg:mx-auto">
            {description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info colonna */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <FaClock className="text-primary text-3xl flex-shrink-0" />
                <span className="font-bold text-gray-900 text-2xl">
                  {currentLabels.opening}
                </span>
              </div>
              <span className="ml-10 text-gray-700 text-xl">{opening}</span>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-primary text-3xl flex-shrink-0" />
                <span className="font-bold text-gray-900 text-2xl">
                  {currentLabels.phone}
                </span>
              </div>
              <a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                className="ml-10 text-primary text-xl underline hover:text-secondary transition font-medium"
                style={{ wordBreak: "break-all" }}
              >
                {phone}
              </a>
            </div>
          </div>
          {/* Colonna mappa */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-2">
              <FaMapMarkerAlt className="text-primary text-3xl" />
              <span className="font-bold text-gray-900 text-xl">{address}</span>
              <a
                href={gmapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-primary underline font-semibold hover:text-secondary transition"
                title={currentLabels.map}
              >
                Maps
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-primary/30 w-full h-[40vh] min-h-[250px]">
              <iframe
                title="Mappa Google"
                src={gmapsEmbed}
                width="100%"
                height="100%"
                className="w-full h-full"
                style={{ border: 0, minHeight: "250px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
