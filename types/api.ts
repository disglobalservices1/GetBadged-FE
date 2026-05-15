export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: {
    requestId?: string;
    pagination?: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
    details?: Record<string, unknown>;
  };
  meta?: {
    requestId?: string;
  };
};
