import { useRouter } from "next/router";
import React from "react";
export default function PrivacyPolicyIt() {
  const router = useRouter();

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p>
        Questo sito web non raccoglie dati personali degli utenti e non utilizza
        cookie di profilazione o tecnologie di tracciamento.
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">
        Servizi di terze parti
      </h2>
      <ul className="list-disc ml-6">
        <li>
          <strong>Google Maps:</strong> Nella sezione "Dove ci trovi" è
          incorporata una mappa interattiva tramite Google Maps. Google può
          raccogliere dati secondo la propria{" "}
          <a
            href="https://policies.google.com/privacy"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          . Nessun dato viene raccolto direttamente dal titolare del sito.
        </li>
        <li>
          <strong>Instagram:</strong> Il sito contiene un collegamento al
          profilo Instagram del negozio. Nessun dato viene raccolto dal sito;
          l'accesso a Instagram è esterno e regolato dalle politiche di
          Instagram.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-4 mb-2">Contatti</h2>
      <p>
        Per qualsiasi informazione, richiesta o segnalazione, puoi scrivere a:
        <br />
        <a href="mailto:federico.ribaldi97@gmail.com" className="underline">
          federico.ribaldi97@gmail.com
        </a>
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">
        Titolare del trattamento
      </h2>
      <p>
        Federico Ribaldi
        <br />
        Email:{" "}
        <a href="mailto:federico.ribaldi97@gmail.com" className="underline">
          federico.ribaldi97@gmail.com
        </a>
      </p>
      <hr className="my-6" />
      <small>Ultimo aggiornamento: maggio 2025</small>
      <div className="mt-8">
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
          onClick={() => router.push("/")}
        >
          Torna alla Home
        </button>
      </div>
    </main>
  );
}
