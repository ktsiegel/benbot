import Button from "@/components/Button";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [practice, setPractice] = useState([] as string[]);
  const [loading, setLoading] = useState(false);

  const getNewPractice = () => {
    setLoading(true);
    setPractice([]);
    fetch("/practice")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPractice(
          data?.practiceLines.length
            ? data.practiceLines
            : ["No practice found"]
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
        <div className="grid grid-cols-8 h-screen w-screen">
          <div className="flex items-center col-start-2 col-span-6 flex-col py-8">
            <div className="flex justify-end w-full py-4">
              <Button
                label={loading ? "Loading..." : "Generate practice"}
                onClick={getNewPractice}
              />
            </div>
            <div className=" p-4 border rounded border-gray-300 text-gray-100 h-full w-full mb-4">
              {practice.map((pLine) => (
                <p>{pLine}</p>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
