import { useState } from "react";
import { JobList } from "./components/JobList/JobList";
import { getCandidate } from "./api/apiClient";
import type { Candidate } from "./types";
import "./App.css";

function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Funcion para obtener datos del candidato por email
  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getCandidate(email);
      if (data) {
        setCandidate(data);
      } else {
        setError("Candidato no encontrado.");
      }
    } catch (err: any) {
      setError("Error al obtener el candidato.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Jobs</h1>
        {candidate ? (
          <div className="user-info">
            <p>
              Hola, {candidate.firstName} {candidate.lastName}
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Ingresar"}
            </button>
            {error && <p className="error-msg">{error}</p>}
          </form>
        )}
      </header>

      <main>
        <JobList candidate={candidate} />
      </main>

      <footer>
        <p>Matias Saavedra</p>
        <div>
          <a href="https://github.com/MatiasSaavedra7" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/saavedramatias/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
