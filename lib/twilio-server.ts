/**
 * Twilio server-side utilities.
 * Never import this from client components — server only.
 */
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER!;

export function getTwilioClient() {
  return twilio(accountSid, authToken);
}

/**
 * Returns the TwiML App SID, creating one if it doesn't exist yet.
 * The app SID is cached in TWILIO_TWIML_APP_SID env var after first run.
 */
export async function getOrCreateTwimlApp(): Promise<string> {
  if (process.env.TWILIO_TWIML_APP_SID) {
    return process.env.TWILIO_TWIML_APP_SID;
  }

  const client = getTwilioClient();
  const appUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/twilio/voice`;

  const app = await client.applications.create({
    friendlyName: 'Resolve Voice App',
    voiceUrl: appUrl,
    voiceMethod: 'POST',
  });

  console.log(`[Twilio] Created TwiML App: ${app.sid} → ${appUrl}`);
  console.log(`[Twilio] Set TWILIO_TWIML_APP_SID=${app.sid} in your env vars.`);

  return app.sid;
}

/**
 * Returns an API Key SID + Secret, creating one if needed.
 * Twilio AccessToken requires an API Key (not the main auth token).
 */
let cachedApiKey: { sid: string; secret: string } | null = null;

async function getOrCreateApiKey(): Promise<{ sid: string; secret: string }> {
  // Use env vars if configured
  if (process.env.TWILIO_API_KEY_SID && process.env.TWILIO_API_KEY_SECRET) {
    return { sid: process.env.TWILIO_API_KEY_SID, secret: process.env.TWILIO_API_KEY_SECRET };
  }
  // Use in-process cache (survives within a single server instance)
  if (cachedApiKey) return cachedApiKey;

  const client = getTwilioClient();
  const key = await client.newKeys.create({ friendlyName: 'Resolve Voice Key' });

  console.log(`[Twilio] Created API Key: ${key.sid}`);
  console.log(`[Twilio] Add to env: TWILIO_API_KEY_SID=${key.sid} TWILIO_API_KEY_SECRET=${key.secret}`);

  cachedApiKey = { sid: key.sid, secret: key.secret };
  return cachedApiKey;
}

/**
 * Generates a short-lived Twilio Access Token for browser-based Voice calls.
 */
export async function generateAccessToken(identity: string): Promise<string> {
  const [appSid, apiKey] = await Promise.all([getOrCreateTwimlApp(), getOrCreateApiKey()]);

  const AccessToken = twilio.jwt.AccessToken;
  const VoiceGrant = AccessToken.VoiceGrant;

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: appSid,
    incomingAllow: false,
  });

  const token = new AccessToken(accountSid, apiKey.sid, apiKey.secret, {
    identity,
    ttl: 3600,
  });

  token.addGrant(voiceGrant);
  return token.toJwt();
}

export { phoneNumber };
