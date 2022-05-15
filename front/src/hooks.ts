import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
const theme = 'theme';

export const handle: Handle = async ({ event, resolve }) => {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    event.locals.theme = cookies[theme] || 'dark';

    const response = await resolve(event);

    if (!cookies[theme]) {
        // if this is the first time the user has visited this app,
        // set a cookie so that we recognise them when they return
        response.headers.set(
            'set-cookie',
            cookie.serialize(theme, event.locals.theme, {
                path: '/',
                httpOnly: true
            })
        );
    }

    return response;
};
