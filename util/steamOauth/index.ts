import { NextApiRequest } from 'next';
import openid from 'openid';
import publicconfig from '../../public.config';
import config from '../../config';
import axios from "axios";
import { User } from '../../types';

const relyingParty = new openid.RelyingParty(publicconfig.url + "/api/auth", publicconfig.url, true, true, [])

export const getRederictUrl = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
        relyingParty.authenticate(
            "https://steamcommunity.com/openid",
            false,
            (error, authUrl) => {
                if (error) return reject("Authentication failed: " + error);
                if (!authUrl) return reject("Authentication failed.");

                resolve(authUrl);
            }
        );
    });
}

const fetchIdentifier = (steamOpenId: string): Promise<User> => {
    return new Promise(async (resolve, reject) => {
        // Parse steamid from the url
        const steamId = steamOpenId.replace(
            "https://steamcommunity.com/openid/id/",
            ""
        );

        try {
            const response = await axios.get(
                `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.steamApiKey}&steamids=${steamId}`
            );
            const players =
                response.data &&
                response.data.response &&
                response.data.response.players;

            if (players && players.length > 0) {
                // Get the player
                const player = players[0];

                // Return user data
                resolve({
                    steamid: steamId,
                    username: player.personaname,
                    profile: player.profileurl,
                    avatar: {
                        small: player.avatar,
                        medium: player.avatarmedium,
                        large: player.avatarfull
                    }
                });
            } else {
                reject("No players found for the given SteamID.");
            }
        } catch (error: any) {
            reject("Steam server error: " + error.message);
        }
    });
}

export const auth = async (req: NextApiRequest): Promise<User> => {
    return new Promise((resolve, reject) => {
        // Verify assertion
        relyingParty.verifyAssertion(req, async (error, result) => {
            if (error) return reject(error.message);
            if (!result || !result.authenticated)
                return reject("Failed to authenticate user.");
            if (
                !/^https?:\/\/steamcommunity\.com\/openid\/id\/\d+$/.test(
                    result.claimedIdentifier as string
                )
            )
                return reject("Claimed identity is not valid.");

            try {
                const user = await fetchIdentifier(result.claimedIdentifier as string);
                return resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    });
}