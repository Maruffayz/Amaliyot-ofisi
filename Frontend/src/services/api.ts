/**
 * API Service for Backend Communication
 * This file handles all HTTP requests to the FastAPI backend
 */

const API_BASE_URL = "http://localhost:8000/api/v1";

// ============== Auth Requests ==============

export async function registerUser(email: string, username: string, password: string, fullName?: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password, full_name: fullName }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Registration failed");
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to fetch user");

    return await response.json();
  } catch (error) {
    console.error("Get current user error:", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("access_token");
}

// ============== Helper Function ==============

function getAuthHeaders() {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// ============== Intern Requests ==============

export async function getInterns() {
  try {
    const response = await fetch(`${API_BASE_URL}/interns/`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch interns");
    return await response.json();
  } catch (error) {
    console.error("Get interns error:", error);
    throw error;
  }
}

export async function getIntern(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/interns/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch intern");
    return await response.json();
  } catch (error) {
    console.error("Get intern error:", error);
    throw error;
  }
}

export async function createIntern(internData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/interns/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(internData),
    });
    if (!response.ok) throw new Error("Failed to create intern");
    return await response.json();
  } catch (error) {
    console.error("Create intern error:", error);
    throw error;
  }
}

export async function updateIntern(id: number, internData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/interns/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(internData),
    });
    if (!response.ok) throw new Error("Failed to update intern");
    return await response.json();
  } catch (error) {
    console.error("Update intern error:", error);
    throw error;
  }
}

export async function deleteIntern(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/interns/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete intern");
  } catch (error) {
    console.error("Delete intern error:", error);
    throw error;
  }
}

// ============== Volunteer Requests ==============

export async function getVolunteers() {
  try {
    const response = await fetch(`${API_BASE_URL}/volunteers/`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch volunteers");
    return await response.json();
  } catch (error) {
    console.error("Get volunteers error:", error);
    throw error;
  }
}

export async function getVolunteer(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/volunteers/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch volunteer");
    return await response.json();
  } catch (error) {
    console.error("Get volunteer error:", error);
    throw error;
  }
}

export async function createVolunteer(volunteerData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/volunteers/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(volunteerData),
    });
    if (!response.ok) throw new Error("Failed to create volunteer");
    return await response.json();
  } catch (error) {
    console.error("Create volunteer error:", error);
    throw error;
  }
}

export async function updateVolunteer(id: number, volunteerData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/volunteers/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(volunteerData),
    });
    if (!response.ok) throw new Error("Failed to update volunteer");
    return await response.json();
  } catch (error) {
    console.error("Update volunteer error:", error);
    throw error;
  }
}

export async function deleteVolunteer(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/volunteers/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete volunteer");
  } catch (error) {
    console.error("Delete volunteer error:", error);
    throw error;
  }
}

// ============== Supervisor Requests ==============

export async function getSupervisors() {
  try {
    const response = await fetch(`${API_BASE_URL}/supervisors/`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch supervisors");
    return await response.json();
  } catch (error) {
    console.error("Get supervisors error:", error);
    throw error;
  }
}

export async function getSupervisor(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/supervisors/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch supervisor");
    return await response.json();
  } catch (error) {
    console.error("Get supervisor error:", error);
    throw error;
  }
}

export async function createSupervisor(supervisorData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/supervisors/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(supervisorData),
    });
    if (!response.ok) throw new Error("Failed to create supervisor");
    return await response.json();
  } catch (error) {
    console.error("Create supervisor error:", error);
    throw error;
  }
}

export async function updateSupervisor(id: number, supervisorData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/supervisors/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(supervisorData),
    });
    if (!response.ok) throw new Error("Failed to update supervisor");
    return await response.json();
  } catch (error) {
    console.error("Update supervisor error:", error);
    throw error;
  }
}

export async function deleteSupervisor(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/supervisors/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete supervisor");
  } catch (error) {
    console.error("Delete supervisor error:", error);
    throw error;
  }
}

// ============== Mentor Requests ==============

export async function getMentors() {
  try {
    const response = await fetch(`${API_BASE_URL}/mentors/`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch mentors");
    return await response.json();
  } catch (error) {
    console.error("Get mentors error:", error);
    throw error;
  }
}

export async function getMentor(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/mentors/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch mentor");
    return await response.json();
  } catch (error) {
    console.error("Get mentor error:", error);
    throw error;
  }
}

export async function createMentor(mentorData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/mentors/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(mentorData),
    });
    if (!response.ok) throw new Error("Failed to create mentor");
    return await response.json();
  } catch (error) {
    console.error("Create mentor error:", error);
    throw error;
  }
}

export async function updateMentor(id: number, mentorData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/mentors/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(mentorData),
    });
    if (!response.ok) throw new Error("Failed to update mentor");
    return await response.json();
  } catch (error) {
    console.error("Update mentor error:", error);
    throw error;
  }
}

export async function deleteMentor(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/mentors/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete mentor");
  } catch (error) {
    console.error("Delete mentor error:", error);
    throw error;
  }
}
