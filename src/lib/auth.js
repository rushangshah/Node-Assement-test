import jwt from 'jsonwebtoken'
import { omit } from 'lodash';

import { JWT_SECRET, TOKEN_EXPIRY } from './config';

export function generateToken(user) {
    console.log(`user: ${JSON.stringify(user, null, 2)}`);

    let token = jwt.sign(
        {
            data: omit(user, ['password']),
        },
        JWT_SECRET,
        {
            expiresIn: TOKEN_EXPIRY,
            algorithm: 'HS256'
        });

    return token
}

export function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    let result;

    if (token) {
        const options = {
            expiresIn: TOKEN_EXPIRY,
            algorithm: 'HS256'
        };

        try {
            result = jwt.verify(token, JWT_SECRET, options);
            req.decoded = result;
            next();
        }
        catch (err) {
            result = {
                error: `${err.message || err}`,
                status: 401
            };

            res.status(401).send(result);
        }
    }
    else {
        result = {
            error: `Authentication error. Token required.`,
            status: 401
        };

        res.status(401).send(result);
    }
}