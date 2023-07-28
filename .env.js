const production = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'production',
};

const development = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: '9000',
    Meta_WA_accessToken:'EAAN29owG7ecBAN6g2npeZAOiSoc60PK4wnnqUoJrv750oOTZCnK80EJImgGRkEafZB98CahrNVRn1HXaDtvRtwJRZCjF1LiCiv0E5CqiGtP3Yg6XMD6Q0K84ugFmhXQGL5UoOsfGqGfVlL9fybPDEZAnk5yEW3gtIybCL4jw76BEuQ6CtCxI0',
    Meta_WA_SenderPhoneNumberId: '126239180376712',
    Meta_WA_wabaId: '108592552192465',
    Meta_WA_VerifyToken: 'abhi213145',
};

// Extended token 
// EAAN29owG7ecBAN6g2npeZAOiSoc60PK4wnnqUoJrv750oOTZCnK80EJImgGRkEafZB98CahrNVRn1HXaDtvRtwJRZCjF1LiCiv0E5CqiGtP3Yg6XMD6Q0K84ugFmhXQGL5UoOsfGqGfVlL9fybPDEZAnk5yEW3gtIybCL4jw76BEuQ6CtCxI0



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