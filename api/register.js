import { cert, initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

const serviceAccount = {
  "type": "service_account",
  "project_id": "project1-5ecc4",
  "private_key_id": "e706905ac44a7661bba99fcf2bbcfd93d1016d87",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCR/pk4UFGvuOGW\nxiPWkNf215yn4AsawTPYlX3fleWZeLL0xlSLSPShdo88FNaxIIpOtBn6RkyZS2Sk\nHTDsriqIA+OlzBivyZxawHmsuel4kg7wBGECkt76cJacto+Un9RKHWyh0QlYxRiM\nWosrD129uZ5nfLbTeGARPrSe6gVIbarvcV1y5PIpIWjRulmmxcWyDHvo0Zyis93P\nCg72prl/S3/i+KHfMvOMJFNgdXCH4KF/y1rJmqtquaiZb1XsKi3n1iiAyahOeRuP\nBS37TcxxQZ6KmK8o7SvidmKHyae8vTugp9VvwHefUlYUPBiR1brDTsUubZQPIjqK\n6Ig73ZUHAgMBAAECggEAHQHutKM0z8rWu8vro/7MgkWt4SchXbQElqSBSZLxdzBl\nsj/T3Ybl4Ez7wa7MR45VHLUpMjKUlqLFwNvx9BzY44SOT0uBni/bSqbSpjCcRHIU\n2LiuA8Jl3nHPYxzc42VsWzuEcZRknIgwy/ZTj38ym3dNk3dSpirVP6frYGXUHeMr\naYDZCnK4EFEsatyh3WZyYX6Zrsy8aYvWsSRXM+HglhSBb8Ran2RVNo62o7NeKQM/\nPyAcAvA/uMvYUgSFVBmPOlMjHC/GIR5g0p9Y97LOTeFFSj4DTaFJZjsOEMEpQJLk\ncZXrUGLxqQcMLnWzHEunG6s3Mu4X/dWXqknUbT5VVQKBgQDNy7fDGweijW2ni476\nHjOxCngHXz0elBf9eXgk+T+JtqWTqItoZ2yGGNt+EkbHvpzk7fiyPBrm1O/poFvu\nDCcEdDt5E3IhtiFTlSyGw7yfx4jKU59+Q3MHiI2OcQOGOeJiXQt+hVSqEdq/XtqW\nay+wk3lTxQoxzM2kYg6qQBrRnQKBgQC1nDHzD+KHyQ16SCn2iiqxsry5jhp4QHsZ\nR3usCZcvyNzSiY+6xnvlK7lrxfggM75to1e0EAZxtVc5s7CPMTgmAOlie24v8lhk\nSnzH/TEY1RmPx1vaT9W3fBlItvAVs2lmyRp4CVTAO9DhHuW4GPhT553yLjJYESFQ\nVxTGAcMB8wKBgHPr8NMiAqb5626ZGiyhnpR3RS1B5He5C9pn9dk93SCBlbsbEYv5\n1hOjJOBbAyu4n0AFHDWpza2A/LMo9R+eEMxdfLKy1XNP2G3wdWhkEXgfOVpeyFSj\nQcRYkwRNfKK7MF4f8z2NdSdnb0Sk9ZQNRIu+RnV9ZESxDJUv9vrHqVOxAoGAVOr4\nICMpVTyZZLghhvoMBJMC0/CyR9A+vw9BsKu7WcieGIPiBP+SJxJO3SnwX35SaImc\nFMH5gWm9o2l2AT6OdpauijIUz66NzjdWKV0me+oIzcX2GRqDYAxS9kEz+bGuczVN\nfxs92bUecmU0HOTwGKuQmxEm0S8RWLOfLwbb3CkCgYBS7UxJqHKawxah98M+HP+k\nYvnnIsPQt5T7N3uvSsY88Q0vt0C74Ze/FVrnEiNWXIJFsiKdHXLuPmPfjeqEhayF\nc2RPpZVxOySkSo6BNVBW3dQxUm8/qaVgaYmvp7kiKtp1ei701+9iZ6xQG/pKxOD4\njwMifktyyMn0qW/qaKIQXA==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@project1-5ecc4.iam.gserviceaccount.com",
  "client_id": "113005973480823517153",
};

let app;
if (!global._firebaseAdmin) {
  global._firebaseAdmin = initializeApp({
    credential: cert(serviceAccount),
    databaseURL: "https://project1-5ecc4-default-rtdb.firebaseio.com",
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST allowed" });

  try {
    const db = getDatabase();
    const ref = db.ref("registrations");

    await ref.push({
      ...req.body,
      timestamp: new Date().toISOString()
    });

    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
}
