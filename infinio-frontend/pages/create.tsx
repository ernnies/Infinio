import { useState, useEffect } from "react";
import DragDropBuilder from "../components/DragDropBuilder";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import Shepherd from "shepherd.js"; // For interactive tutorials
import PDFDocument from "pdfkit"; // For PDF reporting (npm install pdfkit)
import fs from "fs"; // Note: Use server-side for file generation in backend

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const actions = ["Buy Token", "Sell Token", "Set Price Trigger", "Stake", "Unstake"];

export default function Create() {
  const [workflow, setWorkflow] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [collaboratorId, setCollaboratorId] = useState("");
  const [workflows, setWorkflows] = useState<{ name: string; steps: string[] }[]>([{ name: "Default", steps: [] }]);
  const [activeWorkflow, setActiveWorkflow] = useState("Default");
  const [undoStack, setUndoStack] = useState<string[][]>([]);
  const [redoStack, setRedoStack] = useState<string[][]>([]);
  const [marketData, setMarketData] = useState({ "Token A": 1000, "Token B": 1500 });
  const [simulationResult, setSimulationResult] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "flowchart">("list");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [communityWorkflows, setCommunityWorkflows] = useState<string[][]>([["Buy Token", "Set Price Trigger (1000)"]]);
  const [performanceData, setPerformanceData] = useState({ successRate: 0.85, averageYield: 0.12 });
  const [schedule, setSchedule] = useState<string>("");
  const [errorRecovery, setErrorRecovery] = useState<"retry" | "skip" | null>(null);
  const [customAction, setCustomAction] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [voiceCommand, setVoiceCommand] = useState("");
  const [exportedCode, setExportedCode] = useState<string | null>(null);
  const [securityChecklist, setSecurityChecklist] = useState({
    reentrancyCheck: false,
    inputValidation: false,
  });
  const [progress, setProgress] = useState(0);
  const [tourActive, setTourActive] = useState(false);
  const [rootHash, setRootHash] = useState<string | null>(null);
  const [sustainabilityScore, setSustainabilityScore] = useState<number>(0); // For Sustainability Metrics
  const [learningProgress, setLearningProgress] = useState<{ [key: string]: boolean }>({}); // For Gamified Learning

  const handleSave = async () => {
    const saveData = { name: activeWorkflow, steps: workflow, timestamp: new Date().toISOString() };
    setProgress(0);
    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflow: saveData }),
      });
      const result = await response.json();
      if (result.rootHash) {
        setRootHash(result.rootHash);
        alert(`Workflow saved to 0G Storage! Root Hash: ${result.rootHash}`);
        setHistory([...history, `Saved to 0G: ${result.txHash || 'Transaction pending'}`]);
        updateWorkflows();
      }
      setProgress(100);
    } catch (error) {
      alert(`Save error: ${(error as Error).message}`);
      setProgress(0);
    } finally {
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleExport = async () => {
    if (!rootHash) {
      alert("No workflow saved yet. Please save a workflow first.");
      return;
    }
    setProgress(0);
    try {
      const response = await fetch(`http://localhost:3001/api/download/${rootHash}`);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'workflow.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setProgress(100);
    } catch (error) {
      alert(`Export error: ${(error as Error).message}`);
      setProgress(0);
    } finally {
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleReport = async () => {
    setProgress(0);
    try {
      const response = await fetch('http://localhost:3001/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflow, performanceData }),
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'workflow-report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setProgress(100);
    } catch (error) {
      alert(`Report error: ${(error as Error).message}`);
      setProgress(0);
    } finally {
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const updateSustainability = () => {
    const score = workflow.length * 10 - (marketData["Token A"] / 100); // Mock calculation
    setSustainabilityScore(Math.max(0, Math.min(100, score)));
  };

  const completeChallenge = (challenge: string) => {
    setLearningProgress((prev) => ({ ...prev, [challenge]: true }));
    alert(`Completed ${challenge}! Earned 10 tokens.`);
  };

  // Existing functions (applyTemplate, startCollaboration, etc.) remain unchanged
  const applyTemplate = (templateName: string) => {
    const templates = {
      "Basic Trading": ["Buy Token", "Set Price Trigger", "Sell Token"],
      "Yield Farming": ["Set Price Trigger", "Buy Token", "Stake"],
    };
    setWorkflow(templates[templateName as keyof typeof templates] || []);
    updateWorkflows();
  };

  const startCollaboration = () => {
    if (collaboratorId) {
      alert(`Collaboration started with ID: ${collaboratorId}`);
    }
  };

  const simulateWorkflow = () => {
    setProgress(0);
    const interval = setInterval(() => setProgress((p) => Math.min(p + 20, 80)), 500);
    setTimeout(() => {
      clearInterval(interval);
      const profit = workflow.length * 100 + (Math.random() - 0.5) * 50;
      setSimulationResult(profit > 0 ? profit : 0);
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
    }, 2000);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack.pop()!;
      setRedoStack([...redoStack, workflow]);
      setWorkflow(lastState);
      updateWorkflows();
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop()!;
      setUndoStack([...undoStack, workflow]);
      setWorkflow(nextState);
      updateWorkflows();
    }
  };

  const updateWorkflows = () => {
    setWorkflows(workflows.map((w) => (w.name === activeWorkflow ? { ...w, steps: workflow } : w)));
    setUndoStack([...undoStack, workflow]);
    updateSustainability(); // Update sustainability on workflow change
  };

  const switchWorkflow = (name: string) => {
    const selected = workflows.find((w) => w.name === name);
    if (selected) {
      setWorkflow(selected.steps);
      setActiveWorkflow(name);
    }
  };

  const addWorkflow = () => {
    const name = prompt("Enter workflow name") || `Workflow ${workflows.length + 1}`;
    setWorkflows([...workflows, { name, steps: [] }]);
    setActiveWorkflow(name);
    setWorkflow([]);
  };

  const importCommunityWorkflow = (index: number) => {
    setWorkflow([...communityWorkflows[index]]);
    updateWorkflows();
  };

  const addCustomAction = () => {
    if (customAction) {
      setWorkflow([...workflow, customAction]);
      setCustomAction("");
      updateWorkflows();
    }
  };

  const startTour = () => {
    const tour = new Shepherd.Tour({
      defaultStepOptions: { classes: "shadow-md bg-purple-100", scrollTo: true },
      useModalOverlay: true,
    });
    tour.addStep({
      id: "intro",
      text: "Welcome to C0mrad! Drag actions from the left to build your workflow.",
      attachTo: { element: ".actions-panel", on: "bottom" },
      buttons: [{ text: "Next", action: tour.next }],
    });
    tour.addStep({
      id: "canvas",
      text: "Drop actions here to create your workflow. Click to customize.",
      attachTo: { element: ".canvas-panel", on: "top" },
      buttons: [{ text: "Finish", action: tour.complete }],
    });
    tour.start();
    setTourActive(true);
  };

  const exportToCode = () => {
    const code = `contract C0mradWorkflow {\n  function execute() public {\n    ${workflow
      .map((action) => `// ${action.replace("(", " with ").replace(")", "")}`)
      .join("\n    ")}\n  }\n}`;
    setExportedCode(code);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleVoiceCommand = () => {
    if (voiceCommand.toLowerCase().includes("add")) {
      const action = voiceCommand.split("add")[1].trim();
      if (actions.includes(action)) setWorkflow([...workflow, action]);
    }
    setVoiceCommand("");
  };

  const previewTransaction = () => {
    const gasFee = workflow.length * 0.01;
    alert(`Estimated gas fee: ${gasFee} ETH`);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (workflow.length > 0) {
      timer = setTimeout(() => {
        setHistory([...history, `Updated at ${new Date().toISOString()}: ${workflow.join(" -> ")}`]);
        setMarketData((prev) => ({
          ...prev,
          "Token A": prev["Token A"] + (Math.random() - 0.5) * 10,
        }));
        setSuggestions(
          workflow.includes("Stake") ? ["Add Unstake for safety"] : ["Consider adding Stake"]
        );
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [workflow, history]);

  const chartData = {
    labels: ["Success Rate", "Average Yield"],
    datasets: [
      {
        label: "Performance (%)",
        data: [performanceData.successRate * 100, performanceData.averageYield * 100],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
    ],
  };

  return (
    <div
      className={`min-h-screen text-gray-800 font-sans ${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gradient-to-br from-gray-50 via-white to-blue-50"} touch-pan-y`}
      onTouchMove={(e) => {
        if (e.touches.length === 2) {
          const canvas = document.querySelector(".canvas-panel");
          if (canvas) canvas.style.transform = "scale(1.2)";
        } else if (e.touches.length === 1 && e.touches[0].clientX < 50) {
          setWorkflow(workflow.slice(1));
        }
      }}
      onTouchEnd={() => {
        const canvas = document.querySelector(".canvas-panel");
        if (canvas) canvas.style.transform = "scale(1)";
      }}
    >
      <header className={`bg-white shadow-md py-4 ${theme === "dark" ? "bg-gray-800" : ""}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-700">Create Your DeFi Workflow</h1>
          <div className="space-x-2">
            <select
              onChange={(e) => applyTemplate(e.target.value)}
              className={`p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "text-gray-700"}`}
            >
              <option value="">Select Template</option>
              <option value="Basic Trading">Basic Trading</option>
              <option value="Yield Farming">Yield Farming</option>
            </select>
            <select
              onChange={(e) => switchWorkflow(e.target.value)}
              value={activeWorkflow}
              className={`p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "text-gray-700"}`}
            >
              {workflows.map((w) => (
                <option key={w.name} value={w.name}>{w.name}</option>
              ))}
            </select>
            <button onClick={addWorkflow} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              New Workflow
            </button>
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save
            </button>
            <button onClick={handleExport} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
              Export
            </button>
            <button onClick={handleReport} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
              Generate Report
            </button>
            <input
              type="text"
              value={collaboratorId}
              onChange={(e) => setCollaboratorId(e.target.value)}
              placeholder="Enter Collaborator ID"
              className={`p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "text-gray-700"}`}
            />
            <button
              onClick={startCollaboration}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={!collaboratorId}
            >
              Collaborate
            </button>
            <button onClick={simulateWorkflow} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Simulate
            </button>
            <button
              onClick={undo}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              disabled={undoStack.length === 0}
            >
              Undo
            </button>
            <button
              onClick={redo}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              disabled={redoStack.length === 0}
            >
              Redo
            </button>
            <button
              onClick={previewTransaction}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Preview Transaction
            </button>
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="Schedule (e.g., 10:00 AM)"
              className={`p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "text-gray-700"}`}
            />
            <select
              value={errorRecovery || ""}
              onChange={(e) => setErrorRecovery(e.target.value as "retry" | "skip" | null)}
              className={`p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "text-gray-700"}`}
            >
              <option value="">Error Recovery</option>
              <option value="retry">Retry</option>
              <option value="skip">Skip</option>
            </select>
            <input
              type="text"
              value={customAction}
              onChange={(e) => setCustomAction(e.target.value)}
              placeholder="Custom Action"
              className={`p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "text-gray-700"}`}
            />
            <button
              onClick={addCustomAction}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Add Custom
            </button>
            <button onClick={startTour} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
              Start Tour
            </button>
            <button onClick={toggleTheme} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              Toggle Theme
            </button>
            <input
              type="text"
              value={voiceCommand}
              onChange={(e) => setVoiceCommand(e.target.value)}
              onBlur={handleVoiceCommand}
              placeholder="Voice Command (e.g., add Buy Token)"
              className={`p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "text-gray-700"}`}
            />
            <button
              onClick={exportToCode}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Export to Code
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Instructions</h2>
          <p className="text-base text-gray-700">
            Build, schedule, and customize your DeFi workflow with advanced tools. Use
            templates, collaborate, and ensure security with audits.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <DragDropBuilder workflow={workflow} setWorkflow={setWorkflow} marketData={marketData} />
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Workflow Preview</h2>
                <div className="flex items-center justify-center mb-4">
                  <button
                    onClick={() => setViewMode(viewMode === "list" ? "flowchart" : "list")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Toggle {viewMode === "list" ? "Flowchart" : "List"} View
                  </button>
                </div>
                {viewMode === "list" ? (
                  <p className="text-base text-gray-700">
                    {workflow.length > 0
                      ? `Current workflow: ${workflow.join(" -> ")}`
                      : "Add actions to see a preview."}
                  </p>
                ) : (
                  <div className="text-base text-gray-700 canvas-panel">
                    {workflow.map((item, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <span className="bg-blue-100 p-2 rounded">{item}</span>
                        {index < workflow.length - 1 && <span className="mx-2">→</span>}
                      </div>
                    ))}
                  </div>
                )}
                {suggestions.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-md font-semibold text-green-700">Suggestions</h3>
                    <ul className="text-sm text-gray-700 list-disc pl-5">
                      {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
                {simulationResult !== null && (
                  <p className="mt-4 text-base text-green-700">
                    Simulation Result: ${simulationResult.toFixed(2)} profit
                  </p>
                )}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">History Log</h2>
                <ul className="text-base text-gray-700 list-disc pl-6 space-y-2 max-h-40 overflow-y-auto">
                  {history.map((log, index) => <li key={index}>{log}</li>)}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Community Workflows</h2>
                <ul className="text-base text-gray-700 list-disc pl-6 space-y-2">
                  {communityWorkflows.map((wf, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:text-blue-600"
                      onClick={() => importCommunityWorkflow(index)}
                    >
                      {wf.join(" -> ")}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Performance Analytics</h2>
                <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                <p className="text-sm text-gray-700 mt-2">
                  Success Rate: {(performanceData.successRate * 100).toFixed(1)}% | Average Yield:{" "}
                  {(performanceData.averageYield * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Security Audit Checklist</h2>
                <ul className="text-base text-gray-700 list-disc pl-6 space-y-2">
                  <li>
                    Reentrancy Check{" "}
                    <input
                      type="checkbox"
                      checked={securityChecklist.reentrancyCheck}
                      onChange={(e) =>
                        setSecurityChecklist({ ...securityChecklist, reentrancyCheck: e.target.checked })
                      }
                    />
                  </li>
                  <li>
                    Input Validation{" "}
                    <input
                      type="checkbox"
                      checked={securityChecklist.inputValidation}
                      onChange={(e) =>
                        setSecurityChecklist({ ...securityChecklist, inputValidation: e.target.checked })
                      }
                    />
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Sustainability Metrics</h2>
                <p className="text-base text-gray-700">Score: {sustainabilityScore}/100</p>
                <button
                  onClick={updateSustainability}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
                >
                  Recalculate
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Learning Challenges</h2>
                <ul className="text-base text-gray-700 list-disc pl-6 space-y-2">
                  {["Build a Trading Workflow", "Simulate a Yield Farm"].map((challenge) => (
                    <li key={challenge}>
                      {challenge}{" "}
                      {!learningProgress[challenge] && (
                        <button
                          onClick={() => completeChallenge(challenge)}
                          className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                        >
                          Complete
                        </button>
                      )}
                      {learningProgress[challenge] && <span className="text-green-600">Completed!</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {progress > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Progress</h2>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm text-gray-700 mt-2">{progress}%</p>
              </div>
            )}
            {exportedCode && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Exported Code</h2>
                <pre className="text-base text-gray-700 overflow-x-auto">{exportedCode}</pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}