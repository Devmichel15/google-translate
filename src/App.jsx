import { useState, useEffect } from "react";

import translateText from "./utils/api";

function App() {
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ru", name: "Russian" },
    { code: "ar", name: "Arabic" },
    { code: "pt", name: "Portuguese" },
  ];

  const [sourceLang, setSourceLang] = useState("pt");
  const [targetLang, setTargetLang] = useState("en");
  const [translatedText, setTranslatedText] = useState("");
  const [text, setText] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    // Optionally, re-translate if there's text
    if (text.trim()) {
      handleTranslate();
    }
  };

  useEffect(() => {
    handleTranslate();
  }, [text]);

  const handleTranslate = async () => {
    if (!text.trim()) {
      setTranslatedText("");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    console.log("traduzindo...");
    const result = await translateText(text, sourceLang, targetLang);
    console.log(result);
    setTranslatedText(result);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <header className="w-full p-3 text-center shadow-sm mx-auto">
        <h1 className="text-2xl text-[#3c4043] font-semibold">
          Google translate - Michel César
        </h1>
      </header>

      <main className="grow flex items-start justify-center px-4 py-8 ">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="text-sm text-[#3c4043] bg-transparent border-none focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button
              onClick={swapLanguages}
              className="p-2 hover:bg-gray-200 rounded-sm transition-all cursor-pointer outline-none focus:ring-2 focus:ring-gray-300"
            >
              <img src="../public/img_btn.png" className="w-3.5" />
            </button>

            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="text-sm text-[#3c4043] bg-transparent border-none focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="escreva algo..."
                className="w-full h-52 text-lg bg-transparent resize-none outline-none border-none"
              ></textarea>
            </div>

            <div className="p-4 relative bg-gray-200 border-l border-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                {isLoading ? (
                  <div className="animate-spin rounded-full border-2 w-8 h-8 border-t-white border-blue-500 "></div>
                ) : (
                  <p className="text-lg text-[#3c4043]"> {translatedText}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="w-full p-3 text-center text-md text-[#3c4043] shadow-md mx-auto bg-gray-100">
          © {new Date().getFullYear()} Google Translate. All rights reserved. By
          Michel César
        </div>
      </footer>
    </div>
  );
}

export default App;
