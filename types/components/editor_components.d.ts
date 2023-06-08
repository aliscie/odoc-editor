import React from 'react';
interface BaseProps {
    className: string;
    [key: string]: unknown;
}
export declare const Button: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<{
    active: boolean;
    reversed: boolean;
} & BaseProps>, "ref"> & React.RefAttributes<unknown>>;
export declare const Icon: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<BaseProps>, "ref"> & React.RefAttributes<unknown>>;
export declare const Menu: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<BaseProps>, "ref"> & React.RefAttributes<unknown>>;
export declare const Portal: ({ children }: any) => React.ReactPortal | null;
export declare const Toolbar: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<BaseProps>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export {};
