export interface Transaction {
  TRANSACTION_ID: string;
  TRANSACTION_ID_BACK_END: string;
  CUSTOMER_ID: string;
  CHANNEL_NAME: string;
  CUSTOMER_INPUT: string;
  TYPE: string;
  TOTAL_AMOUNT_BE: string | number;
  TOTAL_AMOUNT_SMT: string | number;
  STATUS: string | number;
  PROMO: string | number;
  SMT_ORDER_NUMBER: string;
  SMT_ORDER_STATUS?: string | number;
  SMT_APPROVAL_CODE?: string;
  SMT_ERROR_CODE?: string;
  SMT_DEPOSITED_AMOUNT?: string | number;
  SMT_ORDER_DATE?: string;
  NO_OF_RETRY?: string | number;
  CREATE_DATE?: string;
  UPDATE_DATE?: string;
}









