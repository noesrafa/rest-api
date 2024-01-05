import crypto from "crypto";

const SECRET = "RAFA-REST-API";

export const random = () => crypto.randomBytes(128).toString("base64");
export const autentication = (sal: string, contrasena: string) => {
  return crypto
    .createHmac("sha256", [sal, contrasena].join("/"))
    .update(SECRET)
    .digest("hex");
};
