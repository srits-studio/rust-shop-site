export interface User {
    steamid: string,
    username: string,
    profile: string,
    avatar: {
        small: string,
        medium: string,
        large: string
    }
}