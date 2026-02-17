import React, { useState } from "react";
import { applyToJob } from "../../api/apiClient";
import type { Job, Candidate } from "../../types";
import styles from "./JobItem.module.css";

interface JobItemProps {
  job: Job;
  candidate: Candidate | null;
}

export function JobItem({ job, candidate }: JobItemProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Funcion para enviar la postulacion al backend
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!candidate || !repoUrl) return;

    setLoading(true);
    setMessage(null);

    try {
      await applyToJob(
        candidate.uuid,
        job.id,
        candidate.candidateId,
        candidate.applicationId,
        repoUrl,
      );
      setMessage({ type: "success", text: "Postulacion enviada con exito!" });
      setRepoUrl(""); // Limpiar el input luego de enviar la postulacion
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Error al enviar la postulacion.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{job.title}</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="url"
          placeholder="Ingresar URL del repositorio"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          required
          className={styles.input}
        />
        <button
          type="submit"
          disabled={loading || !candidate}
          className={styles.button}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
      {message && (
        <p
          className={message.type === "success" ? styles.success : styles.error}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
