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
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-6 text-2xl font-bold">コストを計算する</h2>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            プリセット
          </label>
          <select
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
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
          <p className="mt-2 text-xs text-slate-500">
            実際の料金は利用するAI APIの公式料金ページで確認してください。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              入力トークン数 / 1回
            </span>
            <input
              type="number"
              min="0"
              value={inputTokens}
              onChange={(event) => setInputTokens(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              出力トークン数 / 1回
            </span>
            <input
              type="number"
              min="0"
              value={outputTokens}
              onChange={(event) => setOutputTokens(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              実行回数 / 日
            </span>
            <input
              type="number"
              min="0"
              value={requestsPerDay}
              onChange={(event) => setRequestsPerDay(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </label>

          <div />

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              入力単価 / 100万トークン
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={inputPrice}
              onChange={(event) => setInputPrice(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              出力単価 / 100万トークン
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={outputPrice}
              onChange={(event) => setOutputPrice(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-6">
        <h2 className="mb-6 text-2xl font-bold">概算結果</h2>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">1回あたり</p>
            <p className="mt-1 text-3xl font-bold text-cyan-300">
              {formatUsd(result.costPerRequest)}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">1日あたり</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {formatUsd(result.dailyCost)}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">1か月あたり</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {formatUsd(result.monthlyCost)}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">1年あたり</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {formatUsd(result.yearlyCost)}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
          <p>内訳</p>
          <p className="mt-2">
            入力: {formatUsd(result.inputCostPerRequest)} / 回
          </p>
          <p>
            出力: {formatUsd(result.outputCostPerRequest)} / 回
          </p>
        </div>
      </section>
    </div>
  );
}
