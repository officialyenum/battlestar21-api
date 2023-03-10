import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';
import { IUser } from '../models/User';
import { ICharacter } from '../models/Character';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            Logging.error(err);
            return res.status(422).json({
                message: err
            });
        }
    };
};

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            username: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            username: Joi.string().required()
        })
    },
    character: {
        create: Joi.object<ICharacter>({
            name: Joi.string().required(),
            bio: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required()
        }),
        update: Joi.object<ICharacter>({
            name: Joi.string().required(),
            bio: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required()
        })
    }
};
