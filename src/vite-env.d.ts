/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend base URL. Leave unset to run on mock data. */
  readonly VITE_API_URL?: string;
  readonly VITE_CONTACT_PHONE?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_WHATSAPP_MESSAGE?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_ADDRESS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
