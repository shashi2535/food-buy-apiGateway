export const RoutesConstants = {
  SWAGGER: '/swagger-docs',
  HEALTH: '/health',
  BASE_URL: '/v1',
  ROOT: '/',
  SELLER_AUTH: {
    DEFAULT: '/owner',
    LOGIN: '/login',
    SIGNUP: '/signup',
    VERIFY_OTP: '/verifyOtp',
    RESEND_OTP: '/resendOtp',
    VERIFY_TOKEN: '/verify-token',
  },
  USER_AUTH: {
    DEFAULT: 'user',
    LOGIN: 'login',
    SIGNUP: 'signup',
  },
  RESTAURANT: {
    DEFAULT: '/restaurant',
    SAVE_BASIC_DETAILS: '/save-basic-details',
  },
  MISC: {
    DEFAULT: '/misc',
    GET_ENTITY_TYPE: '/get-entity-type'
  },
  NOT_FOUND: '*',
};
