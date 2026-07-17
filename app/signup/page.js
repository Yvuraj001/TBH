"use client";
import { redirect, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MessageToast, SucessToast } from "../components/showToast";
import { toast } from "react-toastify";
import { useState } from "react";

const SignupPage = () => {
  const [isResult, setisResult] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const utm = searchParams.get("utm");
  const handleSubmit = async (from) => {
    from.preventDefault();
    const formData = new FormData(from.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const data = { email, password };

    // making post request
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
    let result = await res.json();

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

      setTimeout(() => {
        router.replace(utm ? `/${utm}` : "/menu");
        router.refresh();
      }, 600);
    }
  };
  return (
    <main className="min-h-screen bg-[#ffc286] px-4 py-8 sm:px-6 sm:py-12">
      <section className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-black bg-[#f7d9a8] px-5 py-12 shadow-[8px_8px_0_#000] sm:px-10">
        <img
          src="/images/img-webp/lettuce.webp"
          alt=""
          className="pointer-events-none absolute -left-12 bottom-2 w-32 rotate-78 sm:-left-4 sm:w-48 xl:w-58 xl:-left-11 xl:-bottom-4"
        />
        <img
          src="/images/img-webp/tomato.webp"
          alt=""
          className="pointer-events-none absolute -right-10 top-4 w-28 rotate-12 sm:-right-3 sm:w-40 xl:-right-10"
        />

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-6 text-center">
            <p className="font-memories text-sm tracking-[0.24em] text-red-500 uppercase">
              Fresh account, fresh flavor
            </p>
            <h1 className="mt-2 font-modak text-5xl leading-none text-red-500 [-webkit-text-stroke:4px_white] [paint-order:stroke] sm:text-6xl">
              Sign Up
            </h1>
            <p className="mt-4 font-semibold text-black/65">
              Join TBH and keep your burger cravings close.
            </p>
          </div>

          <div className="rounded-4xl border-2 border-black bg-white p-5 shadow-[6px_6px_0_#000] sm:p-7">
            <form className="space-y-5" onSubmit={handleSubmit}>
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
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-black uppercase"
                >
                  Create password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  placeholder="Make it extra strong"
                  className={`w-full rounded-2xl border-2 ${isResult ? "border-black/20" : "border-red-500"} bg-[#fff9f1] px-4 py-3 font-semibold outline-none transition-colors placeholder:text-black/35 ${isResult ? "focus:border-black" : "focus:border-red-500"}`}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl border-2 border-black bg-red-500 px-5 py-3.5 text-lg font-black text-white shadow-[4px_4px_0_#000] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              >
                JOIN THE PARTY
              </button>
            </form>

            <p className="mt-6 text-center font-semibold text-black/65">
              Already part of the gang?{" "}
              <Link
                href="/login"
                className="font-black text-red-500 underline decoration-2 underline-offset-4"
              >
                Log in instead
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

export default SignupPage;
