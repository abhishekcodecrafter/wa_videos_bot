const production = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'production',
};

const development = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: '9000',
    Meta_WA_accessToken:'Your Meta Access Token',
    Meta_WA_SenderPhoneNumberId: 'Your Bussines WA Phone Number ID From App ',
    Meta_WA_wabaId: 'Your Bussines WA Bussiness ID From App',
    Meta_WA_VerifyToken: 'Typein A random Security Code',
};

const fallback = {
    ...process.env,
    NODE_ENV: undefined,
};

module.exports = (environment) => {
    console.log(`Execution environment selected is: "${environment}"`);
    if (environment === 'production') {
        return production;
    } else if (environment === 'development') {
        return development;
    } else {
        return fallback;
    }
};
