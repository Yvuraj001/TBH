"use client";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MessageToast, SucessToast } from "@/app/components/showToast";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const [isResult, setisResult] = useState(true);
  const searchParams = useSearchParams();
  const utm = searchParams.get("utm");
  const handleForm = async (form) => {
    form.preventDefault();
    const formData = new FormData(form.target);

    const email = formData.get("email");
    const password = formData.get("password");
    const data = { email, password };

    // making request to login
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (result.sucess !== true) {
      setisResult(() => false);
      toast(<MessageToast message={result.msg} />, {
        closeButton: false,
        className: "!bg-transparent !shadow-none !p-0",
        autoClose: 1300,
      });
    }

    if (result.sucess) {
      setisResult(() => true);
      toast(<SucessToast message={result.msg} />, {
        closeButton: false,
        className: "!bg-transparent !shadow-none !p-0",
        autoClose: 1300,
      });

      if (utm) {
        redirect(`/${utm}`);
      }

      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(redirect("/menu"));
        }, 1000);
      });
    }
  };

  if (utm === "orders") {
    toast(<MessageToast message={"Login to track orders"} />, {
      closeButton: false,
      className: "!bg-transparent !shadow-none !p-0",
      autoClose: 1300,
    });
  }
  if (utm === "menu") {
    toast(<MessageToast message={"Login to checkout"} />, {
      closeButton: false,
      className: "!bg-transparent !shadow-none !p-0",
      autoClose: 1300,
    });
  }
  return (
    <main className="min-h-screen bg-[#ffc286] px-4 py-8 sm:px-6 sm:py-12">
      <section className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-black bg-[#f7d9a8] px-5 py-12 shadow-[8px_8px_0_#000] sm:px-10">
        <img
          src="/images/img-webp/tomato.webp"
          alt=""
          className="pointer-events-none absolute -left-10 top-4 w-28 -rotate-12 sm:-left-8 sm:w-40 xl:-top-8"
        />
        <img
          src="/images/img-webp/lettuce.webp"
          alt=""
          className="pointer-events-none absolute -right-12 xl:-right-17 bottom-2 w-32 rotate-12 sm:-right-4 sm:w-48  "
        />

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-6 text-center">
            <p className="font-memories text-sm tracking-[0.24em] text-red-500 uppercase">
              Welcome back, hungry human
            </p>
            <h1 className="mt-2 font-modak text-5xl leading-none text-red-500 [-webkit-text-stroke:4px_white] [paint-order:stroke] sm:text-6xl">
              Log In
            </h1>
            <p className="mt-4 font-semibold text-black/65">
              Your next delicious order is waiting.
            </p>
          </div>

          <div className="rounded-4xl border-2 border-black bg-white p-5 shadow-[6px_6px_0_#000] sm:p-7">
            <form className="space-y-5" onSubmit={handleForm}>
              {/* email input */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-black uppercase"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@tbh.com"
                  className={`w-full rounded-2xl border-2 ${isResult ? "border-black/20" : "border-red-500"} bg-[#fff9f1] px-4 py-3 font-semibold outline-none transition-colors placeholder:text-black/35 ${isResult ? "focus:border-black" : "focus:border-red-500"}`}
                />
              </div>
              {/* password input */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-black uppercase"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your secret sauce"
                  required
                  className={`w-full rounded-2xl border-2 ${isResult ? "border-black/20" : "border-red-500"} bg-[#fff9f1] px-4 py-3 font-semibold outline-none transition-colors placeholder:text-black/35 ${isResult ? "focus:border-black" : "focus:border-red-500"}`}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl border-2 border-black bg-red-500 px-5 py-3.5 text-lg font-black text-white shadow-[4px_4px_0_#000] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              >
                LET&apos;S EAT
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <span className="h-0.5 flex-1 bg-black/10" />
              <span className="font-memories text-sm text-black/45 uppercase">
                or
              </span>
              <span className="h-0.5 flex-1 bg-black/10" />
            </div>

            <p className="text-center font-semibold text-black/65">
              New around here?{" "}
              <Link
                href="/signup"
                className="font-black text-red-500 underline decoration-2 underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>

          <Link
            href="/"
            className="mt-7 block text-center text-sm font-black uppercase underline decoration-2 underline-offset-4"
          >
            Back to TBH
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
