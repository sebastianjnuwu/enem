import { initializeApp, cert } from "firebase-admin/app";

import { getAuth } from "firebase-admin/auth";

initializeApp({
  credential: cert({
  "type": "service_account",
  "project_id": "cookie-brasil",
  "private_key_id": "3082b13d54740b0b03a740b55d953398089e4fff",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCm08cYQJkEnB2E\n/hDBr0093n1FfM+/HA+KN4N+eivI6izjcPVVljXOQhJvZOzLMnxSumi+eqNrwAqL\nCQ7hbFBF2JaYcWXXt+U3MvlSBz8XiKPueaT7fr0FxqtVkVVlJgnajttfX9UYT8ct\nW1OZ07vHGWEs3k3LiOoKrWcrhb2Phlb6eK1OEheBY5iYy7P4K+YHNatYjwCYBVBp\nOkkLs9CPTtOGEvkbNBQZtNLeUA3fBU+y5DU4AyfzqL8pU6Edp7ObPITaPHzwUMPs\nFkOVMp6JwLdHSTLgJgnrWlWUHj2o9SexvXeRieJqUFB8l8IkYkgZwTK1nk/jOk3r\n7LeDQ3lDAgMBAAECggEAAa+dkSgt+QxJhsDj6HaIwE78Ux8fdl375jizZ9bSPyCR\naDxfA7NrQx9gfPxhzEKWsRCt4vxC+eF3TyUTSmyZecCQ8mTK/l10apS696eXwqQg\njADHYxH1KmwclSvNLM2FR06ETGLKjjQC3k7QTyYC/Xsgg/SR3V8P28sZgijC3ALK\nXA81XEEhtIcCUP5yxO+td3xcfYMGg8YuxdFTDiXvIcTGmtXuOucY+xDuwU/UfVG7\nQYR82Ftq6DE+vSrVsOsZz2Uv5bFLepktv6uFND1jayBfq41N1NUL0+0o0wd52VaL\n8jI9Oty4zruihtRzKbMfAOwlbJz75FDdXhzUz4AiOQKBgQDktWno2zvl6wqe0u2+\n0MLyeT60IsKMmQt9O1NggnIxWqMkS4/8hy5l6shLjUk7UWOt5zyVwp7E7tdEOIBW\nBbvIKq+alhOyQIaLE4jhzZbo0jHjuWTm/jRogtmT9rDl1eXiL2lZz4IT36H0WC3s\ny9X8PmiG1jC6hHnWvEQEKELklQKBgQC6vANEdoL69pIcbdVJx8TJGpfDmGrps7kQ\n5G1VvImpoKwOM/3fRIgb47djRsBL3EQApwkDPR4RfJQNJAKAqArRGApKKvY4oFU7\neyuDoLpgW0MFDntGSjh+YAEsvBprONEw3ZpL+K0aoz8zovDbmeM/V77VlItoSjte\ntz94WThYdwKBgQC2ylNyWz4dPWSImbaQSlN07fhyilGJg4xOM8somDliPrmi+Y2D\n3Br2M9aPo8VC1oLfa6/dVeYFKYr9KFdR6VUy3wLof0gQsEeYAi3loqYZQF3FTthZ\nUhRa7zGsc37gwrrvssr1j8a70YGkQ5G47xUAfHSYR7o8aELkoCWQWQlVnQKBgGH0\nvNYOQTl7XTxSlX+FrwI70/8EFpmP8PYejghaxfBY28j7lyKnJatTsmD+vWNOIdIh\nzYWIaxyLOHMIP9PT0xDKxqMPlGgyG2P/gd0j1IE1fpvJc/t0ddw9aoBYEJfMj1hN\n92IBCnWdy0rAIA9i06Xn1rDdop/LyQcvo7jzPK6TAoGALHaJCLgQzZede/KTAl/j\nXXHcnXWCDKaNKxO0aBLPNkaAND0CyST8K0dubvg6it2ZoLlAkCAqs4EsmrLQOgnr\nkgzXXp2VUWDu8bwzSiVH2fWOoSvOOTu72ARFGytxhtkfEQeTHdBJhTFyreJ475ak\nmN0xoCPjXLbQkTi3QShM2eo=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ugoin@cookie-brasil.iam.gserviceaccount.com",
  "client_id": "111788009325159391811",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ugoin%40cookie-brasil.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}),
});

const auth = getAuth();

export { auth };