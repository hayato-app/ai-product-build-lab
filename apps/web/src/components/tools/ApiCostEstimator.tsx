"use client";

import { useMemo, useState } from "react";

type Preset = {
  name: string;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
};

const presets: Preset[] = [
  {
    name: "Custom",
    inputPricePerMillion: 0,
    outputPricePerMillion: 0,
  },
  {
    name: "Example: low-cost model",
    inputPricePerMillion: 0.15,
    outputPricePerMillion: 0.6,
  },
  {
    name: "Example: standard model",
    inputPricePerMillion: 2.5,
    outputPricePerMillion: 10,
  },
  {
    name: "Example: high-performance model",
    inputPricePerMillion: 15,
    outputPricePerMillion: 60,
  },
];

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
}

function toNumber(value: string) {
  const num = Number(value);
  return Number.isFinite(num) && num >= 0 ? num : 0;
}

export function ApiCostEstimator() {
  const [inputTokens, setInputTokens] = useState("2000");
  const [outputTokens, setOutputTokens] = useState("800");
  const [requestsPerDay, setRequestsPerDay] = useState("100");
  const [inputPrice, setInputPrice] = useState("2.5");
  const [outputPrice, setOutputPrice] = useState("10");

  const result = useMemo(() => {
    const input = toNumber(inputTokens);
    const output = toNumber(outputTokens);
    const dailyRequests = toNumber(requestsPerDay);
    const inputUnitPrice = toNumber(inputPrice);
    const outputUnitPrice = toNumber(outputPrice);

    const inputCostPerRequest = (input / 1_000_000) * inputUnitPrice;
    const outputCostPerRequest = (output / 1_000_000) * outputUnitPrice;
    const costPerRequest = inputCostPerRequest + outputCostPerRequest;

    const dailyCost = costPerRequest * dailyRequests;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = dailyCost * 365;

    return {
      costPerRequest,
      dailyCost,
      monthlyCost,
      yearlyCost,
      inputCostPerRequest,
      outputCostPerRequest,
    };
  }, [inputTokens, outputTokens, requestsPerDay, inputPrice, outputPrice]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-black text-slate-950">コストを計算する</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          モデル料金と利用量を入力すると、概算のAPIコストをすぐに確認できます。
        </p>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-bold text-slate-700">
            プリセット
          </label>
          <select
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
            onChange={(event) => {
              const selected = presets.find((preset) => preset.name === event.target.value);
              if (!selected || selected.name === "Custom") return;

              setInputPrice(String(selected.inputPricePerMillion));
              setOutputPrice(String(selected.outputPricePerMillion));
            }}
            defaultValue="Example: standard model"
          >
            {presets.map((preset) => (
              <option key={preset.name} value={preset.name}>
                {preset.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            実際の料金は利用するAI APIの公式料金ページで確認してください。
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <NumberField
            label="入力トークン数 / 1回"
            value={inputTokens}
            onChange={setInputTokens}
          />
          <NumberField
            label="出力トークン数 / 1回"
            value={outputTokens}
            onChange={setOutputTokens}
          />
          <NumberField
            label="実行回数 / 日"
            value={requestsPerDay}
            onChange={setRequestsPerDay}
          />
          <div />
          <NumberField
            label="入力単価 / 100万トークン"
            value={inputPrice}
            onChange={setInputPrice}
            step="0.01"
          />
          <NumberField
            label="出力単価 / 100万トークン"
            value={outputPrice}
            onChange={setOutputPrice}
            step="0.01"
          />
        </div>
      </section>

      <section className="rounded-3xl border border-blue-100 bg-blue-600 p-6 text-white shadow-lg shadow-blue-100 md:p-8">
        <h2 className="text-2xl font-black">概算結果</h2>

        <div className="mt-6 space-y-4">
          <ResultCard label="1回あたり" value={formatUsd(result.costPerRequest)} strong />
          <ResultCard label="1日あたり" value={formatUsd(result.dailyCost)} />
          <ResultCard label="1か月あたり" value={formatUsd(result.monthlyCost)} />
          <ResultCard label="1年あたり" value={formatUsd(result.yearlyCost)} />
        </div>

        <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-blue-50">
          <p className="font-bold text-white">内訳</p>
          <p className="mt-2">入力: {formatUsd(result.inputCostPerRequest)} / 回</p>
          <p>出力: {formatUsd(result.outputCostPerRequest)} / 回</p>
        </div>
      </section>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step = "1",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function ResultCard({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white p-4 text-slate-950">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className={`mt-1 font-black ${strong ? "text-3xl text-blue-700" : "text-2xl"}`}>
        {value}
      </p>
    </div>
  );
}
