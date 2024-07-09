import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { formatISO, fromUnixTime } from 'date-fns';

export const pepperIt = (food, shaker) => {
    const array = shaker.split('');
    const min = Math.min(...array);
    const max = Math.max(...array);
    const pepper =
        food.slice(0, min) +
        getPepper(shaker.slice(0, 4)) +
        food.slice(min, max) +
        getPepper(shaker.slice(4)) +
        food.slice(max);
    return pepper;
};

const getPepper = (arr) => {
    let keys = '';
    for (const digit of arr) {
        if (['0', '6'].includes(digit))
            keys += String.fromCharCode(65 + parseInt(digit));
        else if (['1', '3'].includes(digit))
            keys += String.fromCharCode(113 + parseInt(digit));
        else if (['2', '5'].includes(digit))
            keys += String.fromCharCode(106 + parseInt(digit));
        else if (['4', '9'].includes(digit))
            keys += String.fromCharCode(93 + parseInt(digit));
        else if ('7' === digit) keys += '.';
        else keys += String.fromCharCode(97 + parseInt(digit));
    }
    return keys;
};

export const getCorrectData = ({ value }) => {
    if (!isNaN(parseInt(value))) return formatISO(fromUnixTime(Number(value)))
    return value;
};
export const IS_PUBLIC_KEY = 'isPublic';
export const NonAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Cookies = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return data ? request.cookies?.[data] : request.cookies;
    },
);
