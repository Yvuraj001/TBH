"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const OrderPoller = ({ intervalMs = 10000 }) => {
  const router = useRouter();
  const lastCount = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let id;

    const check = async () => {
      if (document.hidden) return; // skip while tab isn't active
      try {
        const res = await fetch("/api/admin/orderCount", {
          cache: "no-store",
          method: "GET"
        });
        const data = await res.json();
        if (cancelled || !data.sucess) return;

        if (lastCount.current !== null && data.count !== lastCount.current) {
          router.refresh();
        }
        lastCount.current = data.count;
      } catch (error) {
        console.log("order poll failed", error.message);
      }
    };

    const start = () => {
      check();
      id = setInterval(check, intervalMs);
    };
    const stop = () => clearInterval(id);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelled = true;
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [intervalMs, router]);

  return null;
};

export default OrderPoller;
