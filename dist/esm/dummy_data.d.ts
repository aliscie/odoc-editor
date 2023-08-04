declare const my_dummies: {
    tag: string;
    id: string;
    children: ({
        id: string;
        children: {
            id: string;
            type: string;
            content: string;
            tag: string;
        }[];
        type?: undefined;
        content?: undefined;
        tag?: undefined;
    } | {
        id: string;
        type: string;
        content: string;
        tag: string;
        children?: undefined;
    } | {
        content: string;
        id: string;
        children?: undefined;
        type?: undefined;
        tag?: undefined;
    })[];
}[];
export default my_dummies;
