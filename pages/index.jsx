import Head from "next/head";
import Image from "next/image";
import react, { useState, useEffect } from "react";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "../components/Character";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [incldueUpperCase, setIncldueUpperCase] = useState(true);
  const [includeNumbers, setIncludesNumbers] = useState(true);
  const [includeSymbols, setIncludesSymbols] = useState(true);
  const [copy, setCopy] = useState(false);

  const handleGeneratePassword = () => {
    const passwordList = lowerCaseLetters;
    const getPassword = "";

    if (incldueUpperCase) {
      passwordList = passwordList + upperCaseLetters;
    }
    if (includeNumbers) {
      passwordList = passwordList + numbers;
    }
    if (includeSymbols) {
      passwordList = passwordList + specialCharacters;
    }

    for (let i = 0; i < passwordLength; i++) {
      let tempPass = Math.floor(Math.random() * passwordList.length);
      getPassword = getPassword + passwordList[tempPass];
    }

    setPassword(getPassword);
    setCopy(false);
  };

  const handleCopyPassword = () => {
    setCopy(true);
    notify("Copied to clipboard", false);
  };

  const notify = (message, err=false) => {
    if(err) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // if possible, please add function to verify passwordLength

  return (
    <div>
      <Head>
        <title>Password Generator</title>
        <meta name="description" content="An app that genrates password" />
        <link rel="icon" href="/favicon.ico" />
        {/* font awesome */}
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        /> */}
      </Head>

      <main className="flex justify-center items-center min-h-screen">
        <div className="container  w-96  py-4">
          <div className="row bg-slate-300 p-4 rounded flex flex-col gap-2   w-full shadow-lg " >
            <h2 className="font-bold text-2xl text-center mb-8">
              Password Generator
            </h2>
            {/* display password */}
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  className="input input-sm w-full"
                  value={password}
                  disabled
                />
                <CopyToClipboard text={password}>
                  <button className="btn btn-sm" onClick={handleCopyPassword}>
                    {copy ? "Copied" : "Copy"}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            {/* password length */}
            <div className="form-control">
              <label htmlFor="password-length" className="label">
                Password Length
              </label>
              <input
                type="number"
                className="input input-sm w-16"
                step="1"
                min="8"
                max="30"
                value={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
              />
            </div>
            {/* include uppercase */}
            <div className="form-control">
              <label htmlFor="include-uppercase" className="label">
                Include Uppercase Letters
              </label>
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={incldueUpperCase}
                onChange={(e) => setIncldueUpperCase(e.target.checked)}
              />
            </div>
            {/* /include numbers */}
            <div className="form-control">
              <label htmlFor="include-numbers" className="label">
                Include Numbers
              </label>
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={includeNumbers}
                onChange={(e) => setIncludesNumbers(e.target.checked)}
              />
            </div>
            {/* include symbols */}
            <div className="form-control">
              <label htmlFor="include-symbols" className="label">
                Include Symbols
              </label>
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={includeSymbols}
                onChange={(e) => setIncludesSymbols(e.target.checked)}
              />
            </div>
            {/* generate passwrd */}
            <button className="btn mt-4" onClick={handleGeneratePassword}>
              Generate Password
            </button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </main>
    </div>
  );
}
