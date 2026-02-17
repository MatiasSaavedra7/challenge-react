import { useEffect, useState } from "react";
import { getJobs } from "../../api/apiClient";
import { JobItem } from "../JobItem/JobItem";
import type { Job, Candidate } from "../../types";
import styles from "./JobList.module.css";

interface JobListProps {
  candidate: Candidate | null;
}

export function JobList({ candidate }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        console.error("Error al obtener los trabajos:", err);
        setError("Error al obtener los trabajos.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Cargando trabajos...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.listContainer}>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
}
