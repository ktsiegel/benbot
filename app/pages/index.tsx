import Button from "@/components/Button";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [practice, setPractice] = useState("");
  const [loading, setLoading] = useState(false);

  const getNewPractice = () => {
    setLoading(true);
    setPractice("");
    fetch("/practice")
      .then((res) => res.json())
      .then((data) => {
        setPractice(
          data?.practices.length ? data.practices[0] : "No practice found"
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>BenBot</title>
        <meta
          name="description"
          content="Generate your next swim practice, powered by GPT-4"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main>
        <div className="flex items-center justify-center h-screen w-screen flex-col">
          <div className="flex items-center">
            <Button
              label={loading ? "Loading..." : "Generate practice"}
              onClick={getNewPractice}
            />
          </div>
          <div className="mt-8">{practice}</div>
        </div>
      </main>
    </>
  );
}
