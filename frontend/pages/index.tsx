'use client';

import React from "react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>SME Finance Manager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-blue-50 text-gray-900">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SME Finance</h1>
          <nav className="space-x-4">
            <a href="#" className="text-blue-500 hover:underline">Dashboard</a>
            <a href="#" className="text-blue-500 hover:underline">Accounts</a>
            <a href="#" className="text-blue-500 hover:underline">Invoices</a>
          </nav>
        </header>

        <section className="p-8">
          <h2 className="text-xl font-semibold mb-4">Welcome to your SME accounting assistant</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="text-lg font-medium text-blue-700">Connect Wise</h3>
              <p className="text-sm text-gray-600">Securely link your Wise account to track income and expenses.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="text-lg font-medium text-blue-700">Import Gmail Invoices</h3>
              <p className="text-sm text-gray-600">Fetch invoice emails and match them with your financial data.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="text-lg font-medium text-blue-700">Transaction Overview</h3>
              <p className="text-sm text-gray-600">Classify and review all your transactions with smart categories.</p>
            </div>
          </div>
        </section>

        <footer className="bg-white text-center p-4 text-sm text-gray-500 border-t">
          &copy; 2025 SME Finance. All rights reserved.
        </footer>
      </main>
    </>
  );
}
