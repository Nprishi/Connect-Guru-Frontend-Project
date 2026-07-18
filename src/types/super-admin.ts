export interface SuperAdminLoginPayload {
  email: string;
  password: string;
  secretKey: string;
}

export interface SuperAdmin {
  id?: string;
  email: string;
  role: "SUPER_ADMIN";
}

export interface SuperAdminAuthResponse {
  accessToken: string;
  refreshToken?: string;
  superAdmin?: SuperAdmin;
}
