"use client";

import { useCallback, useEffect, useState } from "react";
import departmentList from "../data/departments.json";

type DepartmentEntry = {
  code: string;
  name: string;
  wikiUrl: string;
};

const departments = departmentList as DepartmentEntry[];
const MAX_INPUT_LENGTH = 3;

const keypadKeys = [
  { digit: "1", letters: "" },
  { digit: "2", letters: "ABC" },
  { digit: "3", letters: "DEF" },
  { digit: "4", letters: "GHI" },
  { digit: "5", letters: "JKL" },
  { digit: "6", letters: "MNO" },
  { digit: "7", letters: "PQRS" },
  { digit: "8", letters: "TUV" },
  { digit: "9", letters: "WXYZ" },
];

const letterExtensions = ["A", "B"];

const buttonClass = (enabled: boolean) =>
  `flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-lg font-semibold text-white transition ${
    enabled
      ? "hover:border-white/40 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      : "cursor-not-allowed opacity-60"
  }`;

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const isSingleDigit = /^[1-9]$/.test(inputValue);
  const paddedInput = isSingleDigit ? inputValue.padStart(2, "0") : inputValue;

  const matchedDepartment = departments.find((department) => {
    if (department.code === inputValue) {
      return true;
    }
    if (isSingleDigit && department.code === paddedInput) {
      return true;
    }
    return false;
  });

  const canAppend = inputValue.length < MAX_INPUT_LENGTH;
  const hasInput = inputValue.length > 0;

  const appendCharacter = useCallback((character: string) => {
    setInputValue((previous) => {
      if (previous.length >= MAX_INPUT_LENGTH) {
        return previous;
      }
      return previous + character;
    });
  }, []);

  const handleDelete = useCallback(() => {
    setInputValue((previous) => previous.slice(0, -1));
  }, []);

  const handleClear = useCallback(() => {
    setInputValue("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const key = event.key.toUpperCase();
      if (event.key === "Backspace") {
        handleDelete();
        event.preventDefault();
        return;
      }

      if (event.key === "Escape") {
        handleClear();
        event.preventDefault();
        return;
      }

      if (/^[0-9]$/.test(event.key)) {
        appendCharacter(event.key);
        event.preventDefault();
        return;
      }

      if (letterExtensions.includes(key)) {
        appendCharacter(key);
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [appendCharacter, handleClear, handleDelete]);

  const inputLabel = inputValue || "—";
  const infoText = matchedDepartment
    ? `${matchedDepartment.name} (${matchedDepartment.code})`
    : hasInput
    ? "Ce numéro ne correspond à aucun département connu."
    : "Tapez un numéro (ex. 68) pour trouver un département.";

  return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-3xl border border-white/10 bg-linear-to-b from-slate-900/80 to-slate-950/60 p-8 shadow-2xl shadow-slate-900/80">
              <header className="space-y-3 text-center">
                  <p className="text-xs uppercase tracking-[0.6em] text-slate-400">Clavier T9</p>
                  <h1 className="text-3xl font-semibold text-white">Trouve ton département</h1>
                  <p className="text-sm text-slate-400">
                      Utilise le pavé T9 pour composer un code (01 à 976) et accéder au département correspondant. Pour
                      2A/2B, ajoute la lettre grâce aux boutons dédiés.
                  </p>
              </header>

              <section className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-center">
                  <p className="text-xs uppercase tracking-[0.45em] text-slate-400">Code en cours</p>
                  <p className="text-5xl font-semibold tracking-[0.35em] text-white">{inputLabel}</p>
                  <p className="text-sm text-slate-300">{infoText}</p>
              </section>

              <section className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                      {keypadKeys.map((key) => (
                          <button
                              key={key.digit}
                              type="button"
                              onClick={() => appendCharacter(key.digit)}
                              disabled={!canAppend}
                              className={buttonClass(canAppend)}
                              aria-label={`Touche ${key.digit}${key.letters ? ` — ${key.letters}` : ""}`}
                          >
                              <span className="text-2xl leading-none">{key.digit}</span>
                              <span className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-300">
                                  {key.letters || "\u00A0"}
                              </span>
                          </button>
                      ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                      <button
                          type="button"
                          onClick={handleClear}
                          disabled={!hasInput}
                          className={buttonClass(hasInput)}
                      >
                          <span className="text-base">Effacer</span>
                      </button>
                      <button
                          type="button"
                          onClick={() => appendCharacter("0")}
                          disabled={!canAppend}
                          className={buttonClass(canAppend)}
                          aria-label="Touche 0"
                      >
                          <span className="text-2xl leading-none">0</span>
                          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-300">+</span>
                      </button>
                      <button
                          type="button"
                          onClick={handleDelete}
                          disabled={!hasInput}
                          className={buttonClass(hasInput)}
                      >
                          <span className="text-base">Suppr</span>
                      </button>
                  </div>

                  <div className="flex flex-col items-center gap-2 text-sm text-slate-400">
                      <p>Ajouter une lettre ? (utile pour 2A / 2B)</p>
                      <div className="flex gap-3">
                          {letterExtensions.map((letter) => (
                              <button
                                  key={letter}
                                  type="button"
                                  onClick={() => appendCharacter(letter)}
                                  disabled={!canAppend}
                                  className={`rounded-2xl border border-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white transition ${
                                      canAppend
                                          ? "hover:border-white/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                          : "cursor-not-allowed opacity-60"
                                  }`}
                              >
                                  {letter}
                              </button>
                          ))}
                      </div>
                  </div>
              </section>

              <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/50 p-6 text-center">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Résultat</p>
                  {matchedDepartment ? (
                      <>
                          <p className="text-lg font-semibold text-white">
                              {matchedDepartment.code} · {matchedDepartment.name}
                          </p>
                          <p className="text-sm text-slate-300">
                              Tu peux visiter l’article Wikipédia correspondant pour approfondir.
                          </p>
                          <a
                              href={matchedDepartment.wikiUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-slate-950 transition hover:bg-slate-100"
                          >
                              Voir sur Wikipédia
                          </a>
                      </>
                  ) : (
                      <p className="text-sm text-slate-300">
                          {hasInput
                              ? "Aucun département ne correspond à ce code."
                              : "Rien pour l’instant — commence par taper un code."}
                      </p>
                  )}
              </section>
          </div>
      </main>
  );
}
