import { AuthTokenType } from 'src/common/enums/authToken';

export interface CreateToken {
  userId: string;
  type: AuthTokenType;
  ttl?: number;
}

export interface DatabaseToken {
  userId: string;
  type: AuthTokenType;
  token: string;
}

export interface RevokeToken {
  userId: string;
  type: AuthTokenType;
}

export interface TokenResponse {
  token: string;
}
