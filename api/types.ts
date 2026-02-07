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

export type User =   {
  row_number: number;
  id: number;
  nome: string;
  email: string;
  telefone: number;
}

export type Users = User[];