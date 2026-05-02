// src/api/challenges.js
// Uses fetch — same pattern as src/api/auth.js
// Vite proxy forwards /api/... → http://localhost:5001/api/...

// ── helper: attach JWT token to protected requests ────────────────────────────
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("meras_token")}`,
});

// ── GET /api/challenges ───────────────────────────────────────────────────────
// Public — no token needed
// Optional filters: { major, difficulty }
export const getChallenges = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.major)      params.append("major", filters.major);
  if (filters.difficulty) params.append("difficulty", filters.difficulty);

  const queryString = params.toString();
  const url = queryString ? `/api/challenges?${queryString}` : `/api/challenges`;

  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch challenges");
  return data.challenges;
};

// ── GET /api/challenges/:id ───────────────────────────────────────────────────
// Public — no token needed
export const getChallengeById = async (id) => {
  const res = await fetch(`/api/challenges/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Challenge not found");
  return data.challenge;
};

// ── GET /api/challenges/guide/:guideId ───────────────────────────────────────
// Guide/admin only — needs token
export const getChallengesByGuide = async (guideId) => {
  const res = await fetch(`/api/challenges/guide/${guideId}`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch guide challenges");
  return data.challenges;
};

// ── POST /api/challenges ──────────────────────────────────────────────────────
// Guide only — needs token
export const createChallenge = async (challengeData) => {
  const res = await fetch("/api/challenges", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(challengeData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create challenge");
  return data.challenge;
};

// ── PUT /api/challenges/:id ───────────────────────────────────────────────────
// Guide only — needs token
export const updateChallenge = async (id, updates) => {
  const res = await fetch(`/api/challenges/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update challenge");
  return data.challenge;
};

// ── DELETE /api/challenges/:id ────────────────────────────────────────────────
// Guide (own) or admin — needs token
export const deleteChallenge = async (id) => {
  const res = await fetch(`/api/challenges/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete challenge");
  return data;
};

// ── POST /api/challenges/:id/complete ────────────────────────────────────────
// Explorer only — needs token
export const completeChallenge = async (id) => {
  const res = await fetch(`/api/challenges/${id}/complete`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to mark complete");
  return data;
};

// ── POST /api/challenges/:id/save ────────────────────────────────────────────
// Explorer only — needs token
export const saveChallenge = async (id) => {
  const res = await fetch(`/api/challenges/${id}/save`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to save challenge");
  return data;
};

// ── DELETE /api/challenges/:id/save ──────────────────────────────────────────
// Explorer only — needs token
export const unsaveChallenge = async (id) => {
  const res = await fetch(`/api/challenges/${id}/save`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to unsave challenge");
  return data;
};

// ── POST /api/challenges/:id/start ───────────────────────────────────────────
// Explorer only — adds to challengesInProgress
export const apiStartChallenge = async (id) => {
  const res = await fetch(`/api/challenges/${id}/start`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to start challenge");
  return data;
};

export const apiGetChallenges    = getChallenges;
export const apiGetChallengeById = getChallengeById;
export const apiCreateChallenge  = createChallenge;
export const apiUpdateChallenge  = updateChallenge;
export const apiDeleteChallenge  = deleteChallenge;
