import rateLimit from "express-rate-limit";

export const emailRateLimiter = rateLimit({
    windowMs: 1*60*1000,
    max:10,
    message:{
        status: 429,
        message: "Too many email requests. Please try again after a minute"
    }
})