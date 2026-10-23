import React from 'react';
import {renderToString} from 'react-dom/server';
import {routes} from './routes';
export function render(path:string){const Page=routes[path]||routes['/'];return renderToString(<Page/>)}
