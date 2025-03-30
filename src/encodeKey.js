function encodeServiceAccountKey(jsonString) {
  // First, parse the JSON string to ensure it's valid
  const parsed = JSON.parse(jsonString);
  // Then stringify it with proper escaping
  return JSON.stringify(parsed);
}

// Example usage
const jsonString = `{
  "type": "service_account",
  "project_id": "steast-hackathon",
  "private_key_id": "015e90152c1689603352a32d709e6b51dfd87b36",
  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCfWYN2bCTVhBSS\\ntV/Art6Aq7lJ+rntTb0z66iP4blwL4NJu2hBLiyhITbynrfFjE35LJ9g5OVV73JA\\nsn1edaZKdgAEhobSw+U1F8uTyQmEAcvMcAwqT1rUuEs9mjOL/DGbxxp3ksVStj3N\\n4BmW+zc2hpiKZXY3O55Zuj8/oMO6sYsYXixHJIPDkOirIwOK+2ONbNiH8uu7l6nl\\njZ6SBo1c0wKOi2pBOFeQOeL49UvHBojq6jrVy8PiS+JrropGO98jD2Ev1YQ5DPCr\\nofjl7n6kRtHR/LhZXnVJz84FkZIIqVTne8By5TYV+dXF3pnM6pCVzdnUhlkNQZhK\\nFrf4u4shAgMBAAECggEAAzv2X/IcTJx0gcZzoz4JXxQyhmQJNQilupw3B3Xoj8nZ\\nwNEwca47Eql8FjA5gPrINF1UU3ZMifzPqqzUwD+OuKaCI+q1FCm3XmdVZvJRd/VE\\ntSlgXdV5faV18CdP54X0CHo3OSO9+d/1YNctEx7rL8ygjk02jogZE9okttO6VUYw\\nBJPXltp+qhz4ZWSKHMTvxujS7T8de/r8TtzU+eeIlLhbENueHQyy6G2DCtTC9Owr\\nUDl5SJzMhVQ6QKuakK8y54tOCoF+ycPOfm33m6MkZy3NqcpWLyWxVrp38OnoTDuD\\n7jLDM3c3ZF0+7abSXWzcsX7x9bR4tQU6NYzs9NwvaQKBgQDXv2S6cKeEMDcjRV3L\\nuggodDk8Xw8koxr2Dvl/6VbiLnSM0ej60BCOZg+m4KpbokV0PrJij3y0fbOYJAEn\\nbNYLQIEJaFtUYNsohsFeKCFafxxfp16ZRIb8QNKZIv3fQQY+5bTmlm5+xERg+jeV\\nJs7le6+0Csk8oyJnIIHzhLjs9QKBgQC9FGwmKiB0gStrUmilKyvFsnloPzTrCN8v\\nXFdmA9hHqgC12R1rwM37DQXuJd3bEPBhOhmYbStVbDaaO8XIaT2eftrkcAfXxwP1\\nlSbHqPfDPtGwgSjCctEHNkDrOo8aU6+ACrBaWLXu/Oepzhsx5JSzeBs8uccq8lR1\\nXfe4mBnJ/QKBgFKCuBs1iltbtTqgBMctVoFiMaGNGVWBq4X/JBxvOPM3oQtaHCgP\\n+sT683F26rAw1y8l60MWbTL5//1nh6l0TkfvW2olpwgWIrrVDo7b+iWKB2ftspgb\\nRSSkBebbIwyG6cSURSMK1SdWGHCeQTOhq+7H5uKMXXn7SeT24bwoPjEhAoGAeNvs\\nAT0eP7otKc2kTCdbNGRPjF4SkkW6e4h36SJ+BdjZ2WMtlinIwDdj2gTkWdnq/Qrp\\nP3BQqaqhAFdCpkb29y+49RnTOY7hrgGnpyoPLQMjf8IfbqN7jzOTrYhh3n8tiBfN\\nAAMCT//iiLzQz0R/9HPKXTeW4pHBgMAOzzSSD3UCgYAFk6pXHLXUNJHrjuCq72M6\\nEvV8Dflfjd2AY7E4hhe03SOcJ7lbn8uLLFAlCs7Gp6Dk1zqwqt3S2ShjabSPCSHH\\nFGT9Jg0Y5FIvoVyL3SgmH3rZeXkHM9UMUEczclgMbHp4tSrLikcuQxqwd77YAHXx\\nj4nM9UmXuMw10tTubVDKTg==\\n-----END PRIVATE KEY-----\\n",
  "client_email": "firebase-adminsdk-fbsvc@steast-hackathon.iam.gserviceaccount.com",
  "client_id": "116499930357487792119",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40steast-hackathon.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}`;

const encodedKey = encodeServiceAccountKey(jsonString);
console.log(encodedKey);
