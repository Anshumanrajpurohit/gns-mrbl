import { API_BASE_URL } from "@/config/api";

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface EnquiryResponseItem extends EnquiryPayload {
  _id: string;
  contacted: boolean;
  contactedAt?: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalEnquiries: number;
  todayEnquiries: number;
  monthEnquiries: number;
  contactedCount: number;
  pendingCount: number;
}

export interface Last7DayStat {
  date: string;
  count: number;
}

export interface ServiceDistributionItem {
  service: string;
  count: number;
}

export interface ActivityLogItem {
  id: string;
  adminId: string;
  adminUsername?: string;
  action: string;
  entity: string;
  entityId?: string;
  createdAt: string;
}

const handleResponse = async (response: Response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || "Request failed";
    throw new Error(message);
  }
  return data;
};

export const submitEnquiry = async (payload: EnquiryPayload) => {
  const response = await fetch(`${API_BASE_URL}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const loginAdmin = async (credentials: AdminCredentials) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return handleResponse(response);
};

interface FetchEnquiriesParams {
  token: string;
  search?: string;
  contacted?: string;
}

export const fetchEnquiries = async ({ token, search, contacted }: FetchEnquiriesParams) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (contacted) params.append("contacted", contacted);

  const response = await fetch(`${API_BASE_URL}/enquiries?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const updateEnquiryStatus = async (token: string, id: string, contacted: boolean) => {
  const response = await fetch(`${API_BASE_URL}/enquiries/${id}/contacted`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ contacted }),
  });

  return handleResponse(response);
};

export const deleteEnquiry = async (token: string, id: string) => {
  const response = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const fetchAdminStats = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const fetchLast7DaysStats = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/stats/last-7-days`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const fetchServiceDistribution = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/stats/service-distribution`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const fetchActivityLog = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/activity-log`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const fetchTrashEnquiries = async ({ token, search }: { token: string; search?: string }) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  const query = params.toString();

  const response = await fetch(`${API_BASE_URL}/admin/enquiries/trash${query ? `?${query}` : ""}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const restoreEnquiry = async (token: string, id: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/enquiries/${id}/restore`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const fetchNotificationEmail = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/settings/notification-email`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const updateNotificationEmail = async (token: string, email: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/settings/notification-email`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });

  return handleResponse(response);
};
