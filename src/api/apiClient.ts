const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCandidate = async (email: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`,
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener la informacion del candidato.");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getJobs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

    if (!response.ok) {
      throw new Error("No se pudo obtener la informacion de los trabajos.");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const applyToJob = async (
  uuid: string,
  jobId: string,
  candidateId: string,
  applicationId: string,
  repoUrl: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid,
        jobId,
        candidateId,
        applicationId,
        repoUrl,
      }),
    });

    if (!response.ok) {
      throw new Error("No se pudo aplicar al trabajo.");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
