"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageToast, SucessToast } from "@/app/components/showToast";
import { toast } from "react-toastify";

const AdminSignupPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleForm = async (form) => {
    form.preventDefault();
    setLoading(true);
    const formData = new FormData(form.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const secret = formData.get("secret");

    const res = await fetch("/api/admin/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password, secret }),
    });
    const result = await res.json();
    setLoading(false);

    if (result.sucess !== true) {
      toast(<MessageToast message={result.msg} />, {
        closeButton: false,
        className: "!bg-transparent !shadow-none !p-0",
        autoClose: 1300,
      });
      return;
    }

    toast(<SucessToast message={result.msg} />, {
      closeButton: false,
      className: "!bg-transparent !shadow-none !p-0",
      autoClose: 1300,
    });

    setTimeout(() => {
      router.replace("/admin/login");
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#ffc286] px-4 py-8 sm:px-6 sm:py-12">
      <section className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-black bg-[#f7d9a8] px-5 py-12 shadow-[8px_8px_0_#000] sm:px-10">
        <div className="w-full">
          <p className="font-memories text-sm tracking-[0.24em] text-red-500 uppercase text-center">
            The Burger House
          </p>
          <h1 className="mt-2 font-modak text-4xl leading-none text-red-500 [-webkit-text-stroke:5px_white] [paint-order:stroke] text-center sm:text-5xl">
            Create Admin
          </h1>
          <p className="mt-3 text-center text-xs font-semibold text-black/50">
            Requires the admin secret key from your .env file.
          </p>

          <form onSubmit={handleForm} className="mt-8 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Admin email"
              required
              className="w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              name="secret"
              placeholder="Admin secret key"
              required
              className="w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-red-500 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Admin"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminSignupPage;
