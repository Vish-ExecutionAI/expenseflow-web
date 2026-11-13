import { useState } from "react";
import { api } from "./lib/api.js";
import "./styles.css";

export default function App() {
  const [records, setRecords] = useState([]);
  const [section, setSection] = useState("Dashboard");
  async function load(resource) { setSection(resource); setRecords(await api.list(resource)); }
  return <div className="shell"><aside><h1>ExpenseFlow</h1><button onClick={() => { setSection("Dashboard"); setRecords([]); }}>Dashboard</button><button onClick={() => load("transactions")}>Transactions</button>
        <button onClick={() => load("expenses")}>Expenses</button>
        <button onClick={() => load("users")}>Users</button></aside><main><span>Generated application</span><h2>{section}</h2><p>ExpenseFlow</p><pre>{JSON.stringify(records, null, 2)}</pre></main></div>;
}
