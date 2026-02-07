export type UsersResponse = {
  success: boolean;
  data: {
    encrypted: {
      iv: string;
      authTag: string;
      encrypted: string;
    };
    secretKey: string;
    algorithm: string;
  };
};