
const envConfig = {
    baseApi: process.env.NEXT_PUBLIC_BASE_API,
    PAYMENT_PK:process.env.NEXT_VITE_PAYMENT_PK,
    NEXT_PUBLIC_ELEVENLABS_API_KEY:process.env.ELEVENLABS_API_KEY,
NEXT_PUBLIC_DID_API_KEY:process.env.DID_API_KEY
,
};

export default envConfig;