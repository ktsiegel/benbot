import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [practice, setPractice] = useState([] as string[]);
  const [loading, setLoading] = useState(false);
  const [stroke, setStroke] = useState<string | undefined>(undefined);

  const getNewPractice = () => {
    setLoading(true);
    setPractice([]);
    fetch(`/practice${stroke ? `?stroke=${stroke}` : ""}`)
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

  const options = [
    {
      label: "Backstroke",
      key: "BACKSTROKE",
    },
    {
      label: "Breaststroke",
      key: "BREASTSTROKE",
    },
    {
      label: "Butterfly",
      key: "BUTTERFLY",
    },
    {
      label: "Freestyle",
      key: "FREESTYLE",
    },
    {
      label: "IM",
      key: "IM",
    },
    {
      label: "Kicking",
      key: "KICKING",
    },
    {
      label: "Pulling",
      key: "PULLING",
    },
  ];

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
      <main className="dark:bg-black">
        <div className="grid grid-cols-8 min-h-screen w-screen">
          <div className="flex items-center col-start-2 col-span-6 flex-col py-8">
            <div className="md:flex justify-end w-full py-4">
              <Dropdown
                selected={stroke}
                options={options}
                onClick={(key) => setStroke(key)}
              />
              <div className="md:w-4 max-sm:h-4" />
              <div className="max-sm:w-full">
                <Button
                  label={loading ? "Loading..." : "Generate practice"}
                  onClick={getNewPractice}
                />
              </div>
            </div>
            <div className=" p-4 border rounded border-gray-300 text-gray-700 dark:text-gray-100 h-full w-full mb-4">
              {practice.map((pLine, i) => (
                <p key={`practice-${i}`}>{pLine}</p>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
